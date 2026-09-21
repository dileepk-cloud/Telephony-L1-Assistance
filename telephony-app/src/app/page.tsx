'use client';

import { useState } from 'react';
import TelecmiConfigView from './components/TelecmiConfigView';
import SmartpingSparcConfigView from './components/SmartpingSparcConfigView';
import SmartPingCCConfigView from './components/SmartPingCCConfigView';
import OzonetelConfigView from './components/OzonetelConfigView';
import McubeConfigView from './components/McubeConfigView';
import McubeTwoConfigView from './components/McubeTwoConfigView';
import SmartpingConfigView from './components/SmartpingConfigView';
import MyoperatorConfigView from './components/MyoperatorConfigView';

export default function Home() {
  const [vendor, setVendor] = useState('Telecmi');
  const [curlCommand, setCurlCommand] = useState('');
  const [telecmiUrl, setTelecmiUrl] = useState('');
  const [telecmiSecret, setTelecmiSecret] = useState('');
  const [telecmiIntlEnable, setTelecmiIntlEnable] = useState(false);
  const [telecmiIntlKey, setTelecmiIntlKey] = useState('');
  const [telecmiIntlValue, setTelecmiIntlValue] = useState('');
  const [sparcUrl, setSparcUrl] = useState('');
  const [sparcAuthKey, setSparcAuthKey] = useState('');
  const [smartPingCcCtcUrl, setSmartPingCcCtcUrl] = useState('');
  const [smartPingCcToken, setSmartPingCcToken] = useState('');
  const [smartPingCcLocationId, setSmartPingCcLocationId] = useState('');
  const [smartPingCcConfigType, setSmartPingCcConfigType] = useState('Outbound');
  const [smartPingCcCampaignUrl, setSmartPingCcCampaignUrl] = useState('');
  const [smartPingCcCampaignList, setSmartPingCcCampaignList] = useState('');
  const [smartPingCcQueueName, setSmartPingCcQueueName] = useState('');
  const [ozonetelConfigType, setOzonetelConfigType] = useState('Outbound');
  const [ozonetelCampaignUrl, setOzonetelCampaignUrl] = useState('');
  const [ozonetelCampaignList, setOzonetelCampaignList] = useState('');
  const [mcubeCtcUrl, setMcubeCtcUrl] = useState('');
  const [mcubeApiKey, setMcubeApiKey] = useState('');
  const [smartpingCtcUrl, setSmartpingCtcUrl] = useState('');
  const [smartpingUserId, setSmartpingUserId] = useState('');
  const [smartpingToken, setSmartpingToken] = useState('');

  const [myoperatorCtcUrl, setMyoperatorCtcUrl] = useState('');
  const [myoperatorCompanyId, setMyoperatorCompanyId] = useState('');
  const [myoperatorSecretToken, setMyoperatorSecretToken] = useState('');
  const [myoperatorType, setMyoperatorType] = useState('1');
  const [myoperatorPublicIvrId, setMyoperatorPublicIvrId] = useState('');
  const [myoperatorApiKey, setMyoperatorApiKey] = useState('');
  const [myoperatorUserId, setMyoperatorUserId] = useState('');

  const hasSpace = (str: string) => /\s/.test(str);
  const [mcubeTwoConfigType, setMcubeTwoConfigType] = useState('Outbound');
  const [mcubeTwoCtcUrl, setMcubeTwoCtcUrl] = useState('');
  const [mcubeTwoAuth, setMcubeTwoAuth] = useState('');
  const [mcubeTwoCampaignUrl, setMcubeTwoCampaignUrl] = useState('');
  const [mcubeTwoCampaignList, setMcubeTwoCampaignList] = useState('');
  const [mcubeTwoCampaignType, setMcubeTwoCampaignType] = useState('');
  const [ozonetelCtcUrl, setOzonetelCtcUrl] = useState('');
  const [ozonetelApiKey, setOzonetelApiKey] = useState('');
  const [ozonetelUserName, setOzonetelUserName] = useState('');
  const [ozonetelAgentId, setOzonetelAgentId] = useState('');
  const [ozonetelCampaignName, setOzonetelCampaignName] = useState('');
  const [campaignDetails, setCampaignDetails] = useState('');
  const [agentNumber, setAgentNumber] = useState('');
  const [displayNumber, setDisplayNumber] = useState('');
  const [configData, setConfigData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (vendor === 'Telecmi') {
      if (!telecmiUrl.trim() || !telecmiSecret.trim()) {
        setError('Please provide both URL and Secret Key for Telecmi.');
        return;
      }
      if (/\s/.test(telecmiUrl)) {
        setError('Click To Call API URL must not contain any spaces.');
        return;
      }
      if (/\s/.test(telecmiSecret)) {
        setError('Secret Key must not contain any spaces.');
        return;
      }
      if (telecmiIntlEnable) {
        if (!telecmiIntlKey.trim()) {
          setError('Please provide International Calling Key for Telecmi.');
          return;
        }
        if (/\s/.test(telecmiIntlKey)) {
          setError('International Calling Key must not contain any spaces.');
          return;
        }
      }
      if (!agentNumber.trim()) {
        setError('Please provide Sample Agent Number.');
        return;
      }

      setError('');
      setLoading(true);
      setConfigData({
        vendor: 'Telecmi',
        data: {
          secret: telecmiSecret,
          url: telecmiUrl,
          intlEnable: telecmiIntlEnable,
          intlKey: telecmiIntlKey,
          intlValue: telecmiIntlValue
        },
        agentNumber
      });
      setLoading(false);
      return;
    }

    if (vendor === 'Smartping Sparc') {
      if (!sparcUrl.trim() || !sparcAuthKey.trim()) {
        setError('Please provide both URL and Authorization Key for Smartping Sparc.');
        return;
      }
      if (/\s/.test(sparcUrl)) {
        setError('Click To Call API URL must not contain any spaces.');
        return;
      }
      if (/\s/.test(sparcAuthKey)) {
        setError('Authorization Key must not contain any spaces.');
        return;
      }
      if (!agentNumber.trim() || !displayNumber.trim()) {
        setError('Please provide Sample Agent Number and Display Number.');
        return;
      }

      setError('');
      setLoading(true);
      setConfigData({
        vendor: 'Smartping Sparc',
        data: {
          authorization: sparcAuthKey,
          url: sparcUrl
        },
        agentNumber,
        displayNumber
      });
      setLoading(false);
      return;
    }

    if (vendor === 'SmartPing_CC') {
      if (smartPingCcConfigType === 'Outbound') {
        if (!smartPingCcCtcUrl.trim() || !smartPingCcToken.trim() || !smartPingCcLocationId.trim()) {
          setError('Please provide Click To Call API, Token, and Location ID for SmartPing_CC Outbound Config.');
          return;
        }
        if (/\s/.test(smartPingCcCtcUrl)) {
          setError('Click To Call API URL must not contain any spaces.');
          return;
        }
        if (/\s/.test(smartPingCcToken)) {
          setError('Token must not contain any spaces.');
          return;
        }
      } else {
        if (!smartPingCcCampaignUrl.trim() || !smartPingCcCampaignList.trim() || !smartPingCcQueueName.trim()) {
          setError('Please provide Campaign Dialer URL, Campaign List, and Queue Name for SmartPing_CC Campaign Dialer.');
          return;
        }
        if (/\s/.test(smartPingCcCampaignUrl)) {
          setError('Campaign Dialer URL must not contain any spaces.');
          return;
        }
        if (/\s/.test(smartPingCcToken)) {
          setError('Token must not contain any spaces.');
          return;
        }
      }

      if (!agentNumber.trim()) {
        setError('Please provide Sample Agent Number.');
        return;
      }

      setError('');
      setLoading(true);

      const campaignLists = smartPingCcConfigType === 'Campaign' ? smartPingCcCampaignList.split(',').map(s => s.trim()).filter(Boolean) : [];

      setConfigData({
        vendor: 'SmartPing_CC',
        data: {
          configType: smartPingCcConfigType,
          clickToCallUrl: smartPingCcConfigType === 'Outbound' ? smartPingCcCtcUrl : '',
          clickToCallToken: smartPingCcConfigType === 'Outbound' ? smartPingCcToken : '',
          clickToCallLocation: smartPingCcConfigType === 'Outbound' ? smartPingCcLocationId : '',
          campaignDialerUrl: smartPingCcConfigType === 'Campaign' ? smartPingCcCampaignUrl : '',
          campaignLists: campaignLists,
          campaignToken: smartPingCcConfigType === 'Campaign' ? smartPingCcToken : '',
          campaignLocation: smartPingCcConfigType === 'Campaign' ? smartPingCcLocationId : '',
          queueName: smartPingCcConfigType === 'Campaign' ? smartPingCcQueueName : ''
        },
        agentNumber
      });
      setLoading(false);
      return;
    }

    if (vendor === 'Smartping') {
      if (!smartpingCtcUrl.trim() || !smartpingUserId.trim() || !smartpingToken.trim()) {
        setError('Please provide Click to Call API URL, user_id, and token for Smartping.');
        return;
      }
      if (/\s/.test(smartpingCtcUrl)) {
        setError('Click To Call API URL must not contain any spaces.');
        return;
      }
      if (/\s/.test(smartpingToken)) {
        setError('Token must not contain any spaces.');
        return;
      }

      setError('');
      setLoading(true);

      setConfigData({
        vendor: 'Smartping',
        data: {
          url: smartpingCtcUrl,
          userId: smartpingUserId,
          token: smartpingToken
        }
      });
      setLoading(false);
      return;
    }

    if (vendor === 'Myoperator') {
      if (!myoperatorCtcUrl.trim() || !myoperatorCompanyId.trim() || !myoperatorSecretToken.trim() || !myoperatorType.trim() || !myoperatorPublicIvrId.trim() || !myoperatorApiKey.trim()) {
        setError('Please provide Click to Call API URL, company_id, secret_token, type, public_ivr_id, and x-api-key for Myoperator.');
        return;
      }
      if (/\s/.test(myoperatorCtcUrl) || /\s/.test(myoperatorCompanyId) || /\s/.test(myoperatorSecretToken) || /\s/.test(myoperatorType) || /\s/.test(myoperatorPublicIvrId) || /\s/.test(myoperatorApiKey)) {
        setError('Fields must not contain any spaces.');
        return;
      }

      setError('');
      setLoading(true);

      setConfigData({
        vendor: 'Myoperator',
        data: {
          url: myoperatorCtcUrl,
          companyId: myoperatorCompanyId,
          secretToken: myoperatorSecretToken,
          type: myoperatorType,
          publicIvrId: myoperatorPublicIvrId,
          apiKey: myoperatorApiKey
        },
        agentNumber,
        userId: myoperatorUserId
      });
      setLoading(false);
      return;
    }

    if (vendor === 'Ozonetel') {
      if (ozonetelConfigType === 'Outbound') {
        if (!ozonetelCtcUrl.trim() || !ozonetelApiKey.trim() || !ozonetelUserName.trim() || !ozonetelAgentId.trim() || !ozonetelCampaignName.trim()) {
          setError('Please provide Click to Call API URL, API Key, User Name, Agent ID, and Campaign Name for Ozonetel.');
          return;
        }
        if (/\s/.test(ozonetelCtcUrl)) {
          setError('Click To Call API URL must not contain any spaces.');
          return;
        }
        if (/\s/.test(ozonetelApiKey)) {
          setError('API Key must not contain any spaces.');
          return;
        }

        setError('');
        setLoading(true);

        setConfigData({
          vendor: 'Ozonetel',
          data: {
            configType: 'Outbound',
            clickToCallUrl: ozonetelCtcUrl,
            apiKey: ozonetelApiKey,
            userName: ozonetelUserName,
            agentId: ozonetelAgentId,
            campaignName: ozonetelCampaignName,
            mode: ozonetelCtcUrl.includes('PhoneManualDial') ? 'PhoneManualDial' : 'AgentManualDial'
          }
        });
      } else {
        if (!ozonetelCampaignUrl.trim() || !ozonetelCampaignList.trim() || !ozonetelApiKey.trim() || !ozonetelUserName.trim()) {
          setError('Please provide Campaign Dialer URL, Campaign List, API Key, and User Name for Ozonetel Campaign.');
          return;
        }
        if (/\s/.test(ozonetelCampaignUrl)) {
          setError('Campaign Dialer URL must not contain any spaces.');
          return;
        }
        if (/\s/.test(ozonetelApiKey)) {
          setError('API Key must not contain any spaces.');
          return;
        }

        setError('');
        setLoading(true);

        setConfigData({
          vendor: 'Ozonetel',
          data: {
            configType: 'Campaign',
            campaignUrl: ozonetelCampaignUrl,
            campaignList: ozonetelCampaignList,
            apiKey: ozonetelApiKey,
            userName: ozonetelUserName,
          }
        });
      }
      setLoading(false);
      return;
    }

    if (vendor === 'MCUBE Classic') {
      if (!mcubeCtcUrl.trim() || !mcubeApiKey.trim()) {
        setError('Please provide Click to Call API URL and API Key for Mcube Classic.');
        return;
      }
      if (/\s/.test(mcubeCtcUrl)) {
        setError('Click To Call API URL must not contain any spaces.');
        return;
      }
      if (/\s/.test(mcubeApiKey)) {
        setError('API Key must not contain any spaces.');
        return;
      }
      if (!agentNumber.trim()) {
        setError('Please provide Sample Agent Number.');
        return;
      }

      setError('');
      setLoading(true);

      setConfigData({
        vendor: 'MCUBE Classic',
        data: {
          url: mcubeCtcUrl,
          apiKey: mcubeApiKey
        },
        agentNumber
      });
      setLoading(false);
      return;
    }

    if (vendor === 'MCUBE 2.0') {
      if (mcubeTwoConfigType === 'Outbound') {
        if (!mcubeTwoCtcUrl.trim() || !mcubeTwoAuth.trim()) {
          setError('Please provide Click to Call API URL and Authorization for Mcube 2.0.');
          return;
        }
        if (/\s/.test(mcubeTwoCtcUrl)) {
          setError('Click To Call API URL must not contain any spaces.');
          return;
        }
        if (/\s/.test(mcubeTwoAuth)) {
          setError('Authorization must not contain any spaces.');
          return;
        }
        if (!agentNumber.trim()) {
          setError('Please provide Sample Agent Number.');
          return;
        }

        setError('');
        setLoading(true);

        setConfigData({
          vendor: 'MCUBE 2.0',
          data: {
            configType: 'Outbound',
            url: mcubeTwoCtcUrl,
            refUrl: '1',
            authorization: mcubeTwoAuth
          },
          agentNumber
        });
        setLoading(false);
        return;
      } else if (mcubeTwoConfigType === 'Campaign') {
        if (!mcubeTwoCampaignUrl.trim() || !mcubeTwoCampaignList.trim() || !mcubeTwoCampaignType.trim() || !mcubeTwoAuth.trim()) {
          setError('Please provide Campaign Dialer URL, Campaign List, Campaign type, and Authorization.');
          return;
        }
        if (/\s/.test(mcubeTwoCampaignUrl)) {
          setError('Campaign Dialer URL must not contain any spaces.');
          return;
        }
        if (/\s/.test(mcubeTwoAuth)) {
          setError('Authorization must not contain any spaces.');
          return;
        }
        if (!agentNumber.trim()) {
          setError('Please provide Sample Agent Number.');
          return;
        }

        // parse campaign lists
        const listPairs = mcubeTwoCampaignList.split(',').map(s => s.trim()).filter(Boolean);
        const parsedLists = listPairs.map(pair => {
          const [id, label] = pair.split(':').map(s => s.trim());
          return { id, label: label || '' };
        });

        setError('');
        setLoading(true);

        setConfigData({
          vendor: 'MCUBE 2.0',
          data: {
            configType: 'Campaign',
            campaignUrl: mcubeTwoCampaignUrl,
            campaignLists: parsedLists,
            campaignType: mcubeTwoCampaignType,
            authorization: mcubeTwoAuth
          },
          agentNumber
        });
        setLoading(false);
        return;
      }
    }

    if (!curlCommand.trim()) {
      setError('Please paste a cURL command.');
      return;
    }

    setError('');
    setLoading(true);
    setConfigData(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendor, curlCommand, campaignDetails }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || 'An error occurred.');
      } else if (data.success) {
        setConfigData({ ...data, agentNumber, displayNumber });
      } else {
        // Fallback for warnings
        setError(data.result || 'Unknown response from server.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-blue-600">📞 Telephony Config Agent</h1>
          <p className="text-gray-600">Generate visual outbound call configurations instantly.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Input Section (Left Side) */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6 flex flex-col">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Select Vendor</label>
              <select
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                value={vendor}
                onChange={(e) => {
                  setVendor(e.target.value);
                  setCurlCommand('');
                  setCampaignDetails('');
                  setConfigData(null);
                  setError('');
                }}
              >
                <option value="Telecmi">Telecmi</option>
                <option value="Smartping Sparc">Smartping Sparc</option>
                <option value="SmartPing_CC">SmartPing_CC</option>
                <option value="Smartping">Smartping</option>
                <option value="Myoperator">Myoperator</option>
                <option value="Ozonetel">Ozonetel</option>
                <option value="MCUBE Classic">MCUBE Classic</option>
                <option value="MCUBE 2.0">MCUBE 2.0</option>
                <option value="Other">Other (Coming Soon)</option>
              </select>
            </div>

            {vendor === 'Telecmi' ? (
              <>
                <div className="space-y-2 flex-grow">
                  <label className="block text-sm font-semibold text-gray-700">Click To Call (CTC) API URL</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="https://rest.telecmi.com/v2/external/click2call"
                    value={telecmiUrl}
                    onChange={(e) => setTelecmiUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2 flex-grow">
                  <label className="block text-sm font-semibold text-gray-700">Secret Key</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter Secret Key"
                    value={telecmiSecret}
                    onChange={(e) => setTelecmiSecret(e.target.value)}
                  />
                </div>
                <div className="space-y-2 flex-grow">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={telecmiIntlEnable}
                      onChange={(e) => setTelecmiIntlEnable(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Enable International Calling</span>
                  </label>
                </div>
                {telecmiIntlEnable && (
                  <>
                    <div className="space-y-2 flex-grow">
                      <label className="block text-sm font-semibold text-gray-700">International Calling Key</label>
                      <input
                        type="text"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Enter Key"
                        value={telecmiIntlKey}
                        onChange={(e) => setTelecmiIntlKey(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 flex-grow">
                      <label className="block text-sm font-semibold text-gray-700">International Calling Value Encode</label>
                      <input
                        type="text"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Enter Value Encode"
                        value={telecmiIntlValue}
                        onChange={(e) => setTelecmiIntlValue(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </>
            ) : vendor === 'Smartping Sparc' ? (
              <>
                <div className="space-y-2 flex-grow">
                  <label className="block text-sm font-semibold text-gray-700">Click To Call (CTC) API URL</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="https://ccs.sparc.smartping.io/crm-integration/api/v1/phoneBridge/clickToCall"
                    value={sparcUrl}
                    onChange={(e) => setSparcUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2 flex-grow">
                  <label className="block text-sm font-semibold text-gray-700">Authorization Key</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter Authorization Key"
                    value={sparcAuthKey}
                    onChange={(e) => setSparcAuthKey(e.target.value)}
                  />
                </div>
              </>
            ) : vendor === 'SmartPing_CC' ? (
              <>
                <div className="space-y-4 pt-2">
                  <div className="flex space-x-4 mb-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="configType"
                        value="Outbound"
                        checked={smartPingCcConfigType === 'Outbound'}
                        onChange={(e) => setSmartPingCcConfigType(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-semibold text-gray-700">Outbound Configuration</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="configType"
                        value="Campaign"
                        checked={smartPingCcConfigType === 'Campaign'}
                        onChange={(e) => setSmartPingCcConfigType(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-semibold text-gray-700">Campaign Dialer</span>
                    </label>
                  </div>

                  {smartPingCcConfigType === 'Outbound' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Click To Call API URL</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="https://testsss.smartpingcc.io/cc/api/v1/clicktocall"
                          value={smartPingCcCtcUrl}
                          onChange={(e) => setSmartPingCcCtcUrl(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Token</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="Enter Token"
                          value={smartPingCcToken}
                          onChange={(e) => setSmartPingCcToken(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Location ID</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="Enter Location ID"
                          value={smartPingCcLocationId}
                          onChange={(e) => setSmartPingCcLocationId(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {smartPingCcConfigType === 'Campaign' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Campaign Dialer URL</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="https://testsss.smartpingcc.io/cc/api/v1/contacts"
                          value={smartPingCcCampaignUrl}
                          onChange={(e) => setSmartPingCcCampaignUrl(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Campaign List (Comma separated for multiple)</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="e.g. uuid-1, uuid-2"
                          value={smartPingCcCampaignList}
                          onChange={(e) => setSmartPingCcCampaignList(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Token</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="Enter Token"
                          value={smartPingCcToken}
                          onChange={(e) => setSmartPingCcToken(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Location ID</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="Enter Location ID"
                          value={smartPingCcLocationId}
                          onChange={(e) => setSmartPingCcLocationId(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Queue Name</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="e.g. test_college"
                          value={smartPingCcQueueName}
                          onChange={(e) => setSmartPingCcQueueName(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : vendor === 'Smartping' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Click To Call API</label>
                  <input
                    type="text"
                    value={smartpingCtcUrl}
                    onChange={(e) => setSmartpingCtcUrl(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="https://ccs1.smartpingcc.io/v2/clickToCall/para"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">user_id</label>
                  <input
                    type="text"
                    value={smartpingUserId}
                    onChange={(e) => setSmartpingUserId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="24119920"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">token</label>
                  <input
                    type="text"
                    value={smartpingToken}
                    onChange={(e) => setSmartpingToken(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md ${hasSpace(smartpingToken) ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                      }`}
                    placeholder="8nTBWvEeloCCpPBOC8zB"
                  />
                  {hasSpace(smartpingToken) && (
                    <p className="mt-1 text-xs text-red-500">
                      token should not contain any space
                    </p>
                  )}
                </div>
              </>
            ) : vendor === 'Myoperator' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Click to Call API</label>
                  <input
                    type="text"
                    value={myoperatorCtcUrl}
                    onChange={(e) => setMyoperatorCtcUrl(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="https://obd-api.myoperator.co/obd-api-v1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">company_id</label>
                  <input
                    type="text"
                    value={myoperatorCompanyId}
                    onChange={(e) => setMyoperatorCompanyId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="652e442d829f386"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">secret_token</label>
                  <input
                    type="text"
                    value={myoperatorSecretToken}
                    onChange={(e) => setMyoperatorSecretToken(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="3f73dc57a85dd035..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">type</label>
                  <input
                    type="text"
                    value={myoperatorType}
                    onChange={(e) => setMyoperatorType(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">public_ivr_id</label>
                  <input
                    type="text"
                    value={myoperatorPublicIvrId}
                    onChange={(e) => setMyoperatorPublicIvrId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="659ce435e9563507"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">x-api-key</label>
                  <input
                    type="text"
                    value={myoperatorApiKey}
                    onChange={(e) => setMyoperatorApiKey(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="oomfKA3l2K6TCJY..."
                  />
                </div>
              </>
            ) : vendor === 'Ozonetel' ? (
              <>
                <div className="space-y-4 pt-2">
                  <div className="flex space-x-4 mb-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="ozonetelConfigType"
                        value="Outbound"
                        checked={ozonetelConfigType === 'Outbound'}
                        onChange={(e) => setOzonetelConfigType(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-semibold text-gray-700">Outbound Configuration</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="ozonetelConfigType"
                        value="Campaign"
                        checked={ozonetelConfigType === 'Campaign'}
                        onChange={(e) => setOzonetelConfigType(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-semibold text-gray-700">Campaign Dialer</span>
                    </label>
                  </div>

                  {ozonetelConfigType === 'Outbound' && (
                    <>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Click To Call API URL</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="https://in1-ccaas-api.ozonetel.com/ca_apis/AgentManualDial"
                          value={ozonetelCtcUrl}
                          onChange={(e) => setOzonetelCtcUrl(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">API Key</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="Enter API Key"
                          value={ozonetelApiKey}
                          onChange={(e) => setOzonetelApiKey(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">User Name</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="e.g. studyiq_career247"
                          value={ozonetelUserName}
                          onChange={(e) => setOzonetelUserName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Agent ID</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="e.g. surya.gupta@adda2"
                          value={ozonetelAgentId}
                          onChange={(e) => setOzonetelAgentId(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Campaign Name</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="e.g. Axis_PBRM_Outbound"
                          value={ozonetelCampaignName}
                          onChange={(e) => setOzonetelCampaignName(e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {ozonetelConfigType === 'Campaign' && (
                    <>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Campaign Dialer URL</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="e.g. https://in1-ccaas-api.ozonetel.com/cloudAgentRestAPI/index.php/AddCampaignBulkDataV4/..."
                          value={ozonetelCampaignUrl}
                          onChange={(e) => setOzonetelCampaignUrl(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Campaign List</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="e.g. Test_Offline,test-demo,Working-Leads"
                          value={ozonetelCampaignList}
                          onChange={(e) => setOzonetelCampaignList(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">API Key</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="Enter API Key"
                          value={ozonetelApiKey}
                          onChange={(e) => setOzonetelApiKey(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">User Name</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="e.g. npf_universal"
                          value={ozonetelUserName}
                          onChange={(e) => setOzonetelUserName(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : vendor === 'MCUBE Classic' ? (
              <>
                <div className="space-y-4 flex-grow">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Click To Call API URL</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="e.g. http://mcube.vmc.in/api/outboundcall"
                      value={mcubeCtcUrl}
                      onChange={(e) => setMcubeCtcUrl(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">API Key</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Enter API Key"
                      value={mcubeApiKey}
                      onChange={(e) => setMcubeApiKey(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : vendor === 'MCUBE 2.0' ? (
              <>
                <div className="flex bg-gray-100 p-1 rounded-xl mb-4">
                  <button
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${mcubeTwoConfigType === 'Outbound' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setMcubeTwoConfigType('Outbound')}
                  >
                    Outbound Config
                  </button>
                  <button
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${mcubeTwoConfigType === 'Campaign' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setMcubeTwoConfigType('Campaign')}
                  >
                    Campaign Config
                  </button>
                </div>

                <div className="space-y-4 flex-grow">
                  {mcubeTwoConfigType === 'Outbound' && (
                    <>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Click To Call API URL</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="e.g. http://mcube.vmc.in/api/outboundcall"
                          value={mcubeTwoCtcUrl}
                          onChange={(e) => setMcubeTwoCtcUrl(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Authorization</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="Enter Authorization"
                          value={mcubeTwoAuth}
                          onChange={(e) => setMcubeTwoAuth(e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {mcubeTwoConfigType === 'Campaign' && (
                    <>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Campaign Dialer URL</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="e.g. https://config.mcube.com/Restmcube-api/campaign"
                          value={mcubeTwoCampaignUrl}
                          onChange={(e) => setMcubeTwoCampaignUrl(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Campaign List (id:label, id:label)</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="e.g. 6:Aditya_Autodialer, 8:Chandra_Autodialer"
                          value={mcubeTwoCampaignList}
                          onChange={(e) => setMcubeTwoCampaignList(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Campaign type</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="e.g. 1"
                          value={mcubeTwoCampaignType}
                          onChange={(e) => setMcubeTwoCampaignType(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Authorization</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="Enter Authorization"
                          value={mcubeTwoAuth}
                          onChange={(e) => setMcubeTwoAuth(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-2 flex-grow">
                <label className="block text-sm font-semibold text-gray-700">cURL Command</label>
                <textarea
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs h-48 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="curl --location 'https://rest.telecmi.com/v2/external/click2call' ..."
                  value={curlCommand}
                  onChange={(e) => setCurlCommand(e.target.value)}
                />
              </div>
            )}

            {vendor === 'Other' && (
              <div className="space-y-2 flex-grow">
                <label className="block text-sm font-semibold text-gray-700">Campaign Details</label>
                <textarea
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Campaign Dialer URL- ...\nCall List ID- ...\nLocation ID- ...\nToken ID- ...\nqueue_name- ..."
                  value={campaignDetails}
                  onChange={(e) => setCampaignDetails(e.target.value)}
                />
              </div>
            )}

            {vendor === 'Myoperator' && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Sample User ID
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="e.g. 684fd9dc6100c268"
                  value={myoperatorUserId}
                  onChange={(e) => setMyoperatorUserId(e.target.value)}
                />
              </div>
            )}

            {vendor !== 'Ozonetel' && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {vendor === 'Smartping' ? 'Sample Agent ID' : 'Sample Agent Number'}
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder={vendor === 'Smartping' ? 'e.g. 24615' : 'e.g. 9684707548'}
                  value={agentNumber}
                  onChange={(e) => setAgentNumber(e.target.value)}
                />
              </div>
            )}

            {vendor === 'Smartping Sparc' && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Sample Display Number</label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="e.g. 911725629685"
                  value={displayNumber}
                  onChange={(e) => setDisplayNumber(e.target.value)}
                />
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-xl shadow-md transition-all flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Generate Visual Config"
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}
          </div>

          {/* Output Section (Right Side) */}
          <div className="w-full lg:w-2/3 bg-white p-0 rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">Visual Output Configuration</h2>
              <p className="text-xs text-gray-500">Configure your vendor portal exactly as shown below.</p>
            </div>

            <div className="flex-1 bg-gray-100 overflow-auto p-4 relative">
              {configData && configData.vendor === 'Telecmi' ? (
                <TelecmiConfigView 
                  secret={configData.data.secret} 
                  agentNumber={configData.agentNumber} 
                  url={configData.data.url} 
                  intlEnable={configData.data.intlEnable}
                  intlKey={configData.data.intlKey}
                  intlValue={configData.data.intlValue}
                />
              ) : configData && configData.vendor === 'Smartping Sparc' ? (
                <SmartpingSparcConfigView authorization={configData.data.authorization} agentNumber={configData.agentNumber} displayNumber={configData.displayNumber} url={configData.data.url} />
              ) : configData && configData.vendor === 'Smartping' ? (
                <SmartpingConfigView configData={configData.data} agentNumber={configData.agentNumber} />
              ) : configData && configData.vendor === 'Myoperator' ? (
                <MyoperatorConfigView configData={configData.data} agentNumber={configData.agentNumber} userId={configData.userId} />
              ) : configData && configData.vendor === 'SmartPing_CC' ? (
                <SmartPingCCConfigView
                  configType={configData.data.configType}
                  clickToCallUrl={configData.data.clickToCallUrl}
                  clickToCallToken={configData.data.clickToCallToken}
                  clickToCallLocationId={configData.data.clickToCallLocation}
                  campaignDialerUrl={configData.data.campaignDialerUrl}
                  campaignLists={configData.data.campaignLists}
                  campaignLocationId={configData.data.campaignLocation}
                  campaignTokenId={configData.data.campaignToken}
                  queueName={configData.data.queueName}
                  agentNumber={configData.agentNumber}
                />
              ) : configData && configData.vendor === 'Ozonetel' ? (
                <OzonetelConfigView configData={configData.data} />
              ) : configData && configData.vendor === 'MCUBE Classic' ? (
                <McubeConfigView configData={configData.data} agentNumber={configData.agentNumber} />
              ) : configData && configData.vendor === 'MCUBE 2.0' ? (
                <McubeTwoConfigView configData={configData.data} agentNumber={configData.agentNumber} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 py-20">
                  <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  <p>Visual configuration will appear here</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
