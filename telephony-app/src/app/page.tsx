'use client';

import { useState } from 'react';
import TelecmiConfigView from './components/TelecmiConfigView';
import SmartpingSparcConfigView from './components/SmartpingSparcConfigView';
import SmartPingCCConfigView from './components/SmartPingCCConfigView';
import OzonetelConfigView from './components/OzonetelConfigView';

export default function Home() {
  const [vendor, setVendor] = useState('Telecmi');
  const [curlCommand, setCurlCommand] = useState('');
  const [campaignDetails, setCampaignDetails] = useState('');
  const [agentNumber, setAgentNumber] = useState('');
  const [displayNumber, setDisplayNumber] = useState('');
  const [configData, setConfigData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
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
                onChange={(e) => setVendor(e.target.value)}
              >
                <option value="Telecmi">Telecmi</option>
                <option value="Smartping Sparc">Smartping Sparc</option>
                <option value="SmartPing_CC">SmartPing_CC</option>
                <option value="Ozonetel">Ozonetel</option>
                <option value="Other">Other (Coming Soon)</option>
              </select>
            </div>

            <div className="space-y-2 flex-grow">
              <label className="block text-sm font-semibold text-gray-700">cURL Command</label>
              <textarea 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs h-48 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="curl --location 'https://rest.telecmi.com/v2/external/click2call' ..."
                value={curlCommand}
                onChange={(e) => setCurlCommand(e.target.value)}
              />
            </div>
            
            {vendor === 'SmartPing_CC' && (
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

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Sample Agent Number</label>
              <input 
                type="text"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="e.g. 5001_33336577"
                value={agentNumber} 
                onChange={(e) => setAgentNumber(e.target.value)}
              />
            </div>

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
                <TelecmiConfigView secret={configData.data.secret} agentNumber={configData.agentNumber} />
              ) : configData && configData.vendor === 'Smartping Sparc' ? (
                <SmartpingSparcConfigView authorization={configData.data.authorization} agentNumber={configData.agentNumber} displayNumber={configData.displayNumber} />
              ) : configData && configData.vendor === 'SmartPing_CC' ? (
                <SmartPingCCConfigView 
                  clickToCallUrl={configData.data.clickToCallUrl}
                  clickToCallToken={configData.data.clickToCallToken} 
                  clickToCallLocationId={configData.data.clickToCallLocationId}
                  campaignDialerUrl={configData.data.campaignDialerUrl}
                  campaignListId={configData.data.campaignListId}
                  campaignLocationId={configData.data.campaignLocationId}
                  campaignTokenId={configData.data.campaignTokenId}
                  queueName={configData.data.queueName}
                  agentNumber={configData.agentNumber}
                />
              ) : configData && configData.vendor === 'Ozonetel' ? (
                <OzonetelConfigView configData={configData.data} />
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
