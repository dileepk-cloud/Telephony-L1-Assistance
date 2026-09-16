import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { vendor, curlCommand, campaignDetails } = await request.json();

    if (!vendor || !curlCommand) {
      return NextResponse.json(
        { error: 'Vendor and cURL command are required.' },
        { status: 400 }
      );
    }

    if (vendor === 'Telecmi') {
      const curlStr = curlCommand as string;
      
      // Check URL
      if (!curlStr.includes('https://rest.telecmi.com/v2/external/click2call')) {
        return NextResponse.json(
          { error: "The cURL does not contain the expected URL (https://rest.telecmi.com/v2/external/click2call)." },
          { status: 400 }
        );
      }

      // Extract JSON data payload
      let dataPayload = "";
      const dataMatch = curlStr.match(/--data\s+'([^']+)'/);
      if (dataMatch && dataMatch[1]) {
        dataPayload = dataMatch[1];
      } else {
        const dataMatchDouble = curlStr.match(/--data\s+"([^"]+)"/);
        if (dataMatchDouble && dataMatchDouble[1]) {
          dataPayload = dataMatchDouble[1];
        } else {
          const braceMatch = curlStr.match(/\{[\s\S]*\}/);
          if (braceMatch) {
            dataPayload = braceMatch[0];
          }
        }
      }

      // Clean up comments from the JSON payload before parsing
      let cleanJson = dataPayload.replace(/\/\/.*$/gm, '');

      try {
        const parsedData = JSON.parse(cleanJson);
        const missingFields = [];
        if (!parsedData.user_id) missingFields.push('user_id');
        if (!parsedData.to) missingFields.push('to');
        if (!parsedData.custom) missingFields.push('custom');
        if (!parsedData.secret) missingFields.push('secret');

        if (missingFields.length > 0) {
          return NextResponse.json(
            { error: `The provided cURL is missing the following required fields for Telecmi: ${missingFields.join(', ')}` },
            { status: 400 }
          );
        }

        // Return structured data for the React component
        return NextResponse.json({
          success: true,
          vendor: 'Telecmi',
          data: {
            secret: parsedData.secret
          }
        });

      } catch (e) {
        return NextResponse.json(
          { error: "Failed to parse the JSON data in the cURL command. Please ensure it is correctly formatted." },
          { status: 400 }
        );
      }
    } else if (vendor === 'Smartping Sparc') {
      const curlStr = curlCommand as string;
      
      // Check URL
      if (!curlStr.includes('https://ccs.sparc.smartping.io/crm-integration/api/v1/phoneBridge/clickToCall')) {
        return NextResponse.json(
          { error: "The cURL does not contain the expected URL (https://ccs.sparc.smartping.io/crm-integration/api/v1/phoneBridge/clickToCall)." },
          { status: 400 }
        );
      }

      // Extract Authorization header
      let authorization = "";
      const authMatch = curlStr.match(/--header\s+['"]Authorization:\s*([^'"]+)['"]/i) || 
                        curlStr.match(/-H\s+['"]Authorization:\s*([^'"]+)['"]/i);
      
      if (authMatch && authMatch[1]) {
        authorization = authMatch[1];
      } else {
        return NextResponse.json(
          { error: "The provided cURL is missing the Authorization header." },
          { status: 400 }
        );
      }

      // We just need the Authorization token for this visual view
      return NextResponse.json({
        success: true,
        vendor: 'Smartping Sparc',
        data: {
          authorization
        }
      });
    } else if (vendor === 'SmartPing_CC') {
      const curlStr = curlCommand as string;
      const campaignStr = campaignDetails as string || '';
      
      // Parse token and location_id from the cURL
      let clickToCallToken = "";
      let clickToCallLocationId = "";
      let clickToCallUrl = "";
      
      const urlMatch = curlStr.match(/--location\s+['"]([^'"]+)['"]/i) || curlStr.match(/curl\s+['"]([^'"]+)['"]/i);
      if (urlMatch) {
        clickToCallUrl = urlMatch[1];
      }

      const dataMatch = curlStr.match(/--data\s+'({[^']+})'/);
      if (dataMatch && dataMatch[1]) {
        try {
          const payload = JSON.parse(dataMatch[1]);
          clickToCallToken = payload.token || "";
          clickToCallLocationId = payload.location_id || "";
        } catch(e) {
          console.error("Failed to parse SmartPing_CC JSON");
        }
      }

      // Parse campaign details
      const extractValue = (regex: RegExp) => {
        const match = campaignStr.match(regex);
        return match ? match[1].trim() : "";
      };

      const campaignDialerUrl = extractValue(/(?:Campaign\s+Dialer\s+URL)["']?\s*[-:]\s*["']?([^"',\r\n]+)/i);
      const campaignListId = extractValue(/(?:Call\s+List\s+ID|Campaign\s+List)["']?\s*[-:]\s*["']?([^"',\r\n]+)/i);
      const campaignLocationId = extractValue(/(?:Location\s+ID|location_id)["']?\s*[-:]\s*["']?([^"',\r\n]+)/i);
      const campaignTokenId = extractValue(/(?:Token\s+ID|token)["']?\s*[-:]\s*["']?([^"',\r\n]+)/i);
      const queueName = extractValue(/queue_name["']?\s*[-:]\s*["']?([^"',\r\n]+)/i);

      return NextResponse.json({
        success: true,
        vendor: 'SmartPing_CC',
        data: {
          clickToCallUrl,
          clickToCallToken,
          clickToCallLocationId,
          campaignDialerUrl,
          campaignListId,
          campaignLocationId,
          campaignTokenId,
          queueName
        }
      });
    } else if (vendor === 'Ozonetel') {
      const curlStr = curlCommand as string;

      let clickToCallUrl = "";
      const urlMatch = curlStr.match(/--location\s+['"]([^'"]+)['"]/i) || curlStr.match(/curl\s+['"]([^'"]+)['"]/i);
      if (urlMatch) {
        clickToCallUrl = urlMatch[1];
      }

      let apiKey = "";
      const apiKeyMatch = curlStr.match(/--header\s+['"](apiKey|api_key):\s*([^'"]+)['"]/i);
      if (apiKeyMatch && apiKeyMatch[2]) {
        apiKey = apiKeyMatch[2];
      }

      let dataPayload = "";
      const dataMatch = curlStr.match(/--data-raw\s+'({[^']+})'/);
      if (dataMatch && dataMatch[1]) {
        dataPayload = dataMatch[1];
      }

      let mode = 'PhoneManualDial';
      if (clickToCallUrl.includes('AgentManualDial')) {
        mode = 'AgentManualDial';
      }

      return NextResponse.json({
        success: true,
        vendor: 'Ozonetel',
        data: {
          clickToCallUrl,
          apiKey,
          mode
        }
      });
    }

    return NextResponse.json(
      { error: "Vendor not supported yet." },
      { status: 400 }
    );

  } catch (error: any) {
    console.error('Error generating configuration:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}
