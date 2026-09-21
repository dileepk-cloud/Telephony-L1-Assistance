"use client";

import React, { useState } from 'react';
import InboundConfigTab from './InboundConfigTab';

interface OzonetelConfigViewProps {
  configData: {
    configType?: string;
    clickToCallUrl?: string;
    campaignUrl?: string;
    campaignList?: string;
    apiKey: string;
    userName: string;
    agentId?: string;
    campaignName?: string;
    mode?: string;
  };
}

export default function OzonetelConfigView({ configData }: OzonetelConfigViewProps) {
  const [activeTab, setActiveTab] = useState<'outbound' | 'inbound' | 'campaign' | 'callLog' | 'additional'>(configData.configType === 'Campaign' ? 'campaign' : 'outbound');
  const [isUserConfigOpen, setIsUserConfigOpen] = useState(false);
  const [isFieldMappingOpen, setIsFieldMappingOpen] = useState(false);

  React.useEffect(() => {
    setActiveTab(configData.configType === 'Campaign' ? 'campaign' : 'outbound');
  }, [configData.configType]);

  const { clickToCallUrl, apiKey, userName, agentId, campaignName, mode, campaignUrl, campaignList } = configData;

  const userIdentifierKey = mode === 'PhoneManualDial' ? 'phoneName' : 'agentID';
  const customerIdentifierKey = mode === 'PhoneManualDial' ? 'custNumber' : 'customerNumber';
  const campaignIdentifierValue = mode === 'PhoneManualDial' ? 'Inbound Campaign ID' : 'campaignName';

  return (
    <div className="bg-white border rounded-lg shadow-sm font-sans text-sm relative h-[800px] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b sticky top-0 z-10">
        <div className="flex items-center space-x-2 text-xl font-semibold text-gray-800">
          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </button>
          <span>Ozonetel</span>
        </div>
        <div className="space-x-2">
          <button className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50">Virtual Numbers</button>
          <button 
            className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50"
            onClick={() => setIsUserConfigOpen(true)}
          >
            User Config
          </button>
          <button className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50">
            <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 px-6 bg-white border-b text-sm font-medium">
        <button 
          className={`py-3 outline-none ${activeTab === 'outbound' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('outbound')}
        >
          Outbound Config
        </button>
        <button 
          className={`py-3 outline-none ${activeTab === 'inbound' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('inbound')}
        >
          Inbound Config
        </button>
        <button 
          className={`py-3 outline-none ${activeTab === 'campaign' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('campaign')}
        >
          Campaign Dialer
        </button>
        <button 
          className={`py-3 outline-none ${activeTab === 'callLog' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('callLog')}
        >
          Call Log API
        </button>
        <button 
          className={`py-3 outline-none ${activeTab === 'additional' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('additional')}
        >
          Additional Config
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        
        {activeTab === 'outbound' && (
          <div className="p-6">
            <div className="bg-white border rounded-lg shadow-sm">
              <div className="p-6 space-y-8">
                


                {/* Enable Section */}
                <div className="flex justify-between items-start border-b pb-6">
                  <div className="space-y-4 w-full">
                    <h3 className="font-bold text-gray-800">Enable Outbound Configuration</h3>
                    <p className="text-xs text-gray-500 -mt-3 mb-2">Configure the Click to Call API for Outbound Calling</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 w-1/3">
                        <span className="text-gray-700 text-sm">Enable Outbound Configuration</span>
                        <span className="text-gray-400 text-xs">ⓘ</span>
                      </div>
                      <div className="flex-1">
                        <div className="w-10 h-5 bg-blue-500 rounded-full flex items-center p-1">
                          <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md transform translate-x-4"></div>
                        </div>
                      </div>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center space-x-1 shadow-sm">
                        <span>📞 Make a Test Call</span>
                      </button>
                    </div>
                    
                    <div className="flex items-center mt-2">
                      <div className="flex items-center space-x-2 w-1/3">
                        <span className="text-gray-700 text-sm">Enable Virtual Number Filtering</span>
                        <span className="text-gray-400 text-xs">ⓘ</span>
                      </div>
                      <div className="flex-1">
                        <div className="w-10 h-5 bg-gray-300 rounded-full flex items-center p-1">
                          <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Request Configuration */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-bold text-gray-800">Request Configuration</h3>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex items-center space-x-2 w-1/3">
                      <span className="text-gray-700 text-sm">Request Method</span>
                      <span className="text-gray-400 text-xs">ⓘ</span>
                    </div>
                    <div className="flex-1 flex border rounded-md overflow-hidden bg-gray-50 w-32 flex-none">
                      <button className="px-4 py-1.5 border-r text-gray-600 w-16 text-sm">Get</button>
                      <button className="px-4 py-1.5 bg-blue-500 text-white font-medium w-16 text-sm">Post</button>
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="w-1/3">
                      <span className="text-gray-700 text-sm">Click To Call (C2C) API URL <span className="text-red-500">*</span></span>
                    </div>
                    <div className="flex-1">
                      <input type="text" className="w-full border rounded-md p-2 bg-white text-gray-700 text-sm" value={clickToCallUrl || "https://in1-ccaas-api.ozonetel.com/ca_apis/AgentManualDial"} readOnly />
                    </div>
                  </div>
                </div>

                {/* Request Parameter */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-bold text-gray-800">Request Parameter</h3>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex items-center space-x-2 w-1/3">
                      <span className="text-gray-700 text-sm">Add User Specific Value <span className="text-red-500">*</span></span>
                      <span className="text-gray-400 text-xs">ⓘ</span>
                    </div>
                    <div className="flex-1 flex space-x-4">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value={userIdentifierKey} readOnly />
                      <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-sm">
                        <span>Agent ID</span>
                        <span className="text-gray-400 text-xs">▼</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="flex items-center space-x-2 w-1/3">
                      <span className="text-gray-700 text-sm">Add User Specific Value <span className="text-red-500">*</span></span>
                      <span className="text-gray-400 text-xs">ⓘ</span>
                    </div>
                    <div className="flex-1 flex space-x-4">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="campaignName" readOnly />
                      <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-sm">
                        <span>{campaignIdentifierValue}</span>
                        <span className="text-gray-400 text-xs">▼</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="flex items-center space-x-2 w-1/3">
                      <span className="text-gray-700 text-sm">Add Lead Specific Value <span className="text-red-500">*</span></span>
                      <span className="text-gray-400 text-xs">ⓘ</span>
                    </div>
                    <div className="flex-1 flex space-x-4">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value={customerIdentifierKey} readOnly />
                      <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-sm">
                        <span>Applicant Mobile No</span>
                        <span className="text-gray-400 text-xs">▼</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-6">
                    <div className="w-1/3">
                      <span className="text-gray-700 text-sm">Add other parameter(s)</span>
                    </div>
                    <div className="flex-1 flex space-x-4 items-center">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="uui" readOnly />
                      <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-sm">
                        <span>Lead ID</span>
                        <span className="text-gray-400 text-xs">▼</span>
                      </div>
                      <div className="flex space-x-1 flex-none w-16">
                        <button className="text-red-500 bg-red-50 rounded-full p-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                        <button className="text-blue-500 bg-blue-50 rounded-full p-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-3">
                    <div className="w-1/3"></div>
                    <div className="flex-1 flex space-x-4 items-center">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="userName" readOnly />
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value={userName || "studyiq_career247"} readOnly />
                      <div className="flex space-x-1 flex-none w-16">
                        <button className="text-red-500 bg-red-50 rounded-full p-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                      </div>
                    </div>
                  </div>

                  {mode === 'PhoneManualDial' && (
                    <div className="flex items-center mt-3">
                      <div className="w-1/3"></div>
                      <div className="flex-1 flex space-x-4 items-center">
                        <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="checkStatus" readOnly />
                        <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="true" readOnly />
                        <div className="flex space-x-1 flex-none w-16">
                          <button className="text-red-500 bg-red-50 rounded-full p-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center mt-3">
                    <div className="w-1/3"></div>
                    <div className="flex-1 flex space-x-4 items-center">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="UCID" readOnly />
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="true" readOnly />
                      <div className="flex space-x-1 flex-none w-16">
                        <button className="text-red-500 bg-red-50 rounded-full p-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                      </div>
                    </div>
                  </div>



                  <div className="flex items-center mt-6">
                    <div className="w-1/3">
                      <span className="text-gray-700 text-sm">Header(s)</span>
                    </div>
                    <div className="flex-1 flex space-x-4 items-center">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="Content-Type" readOnly />
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="application/json" readOnly />
                      <div className="flex space-x-1 flex-none w-16">
                        <button className="text-red-500 bg-red-50 rounded-full p-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-3">
                    <div className="w-1/3"></div>
                    <div className="flex-1 flex space-x-4 items-center">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="accept" readOnly />
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="application/json" readOnly />
                      <div className="flex space-x-1 flex-none w-16">
                        <button className="text-red-500 bg-red-50 rounded-full p-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                        <button className="text-blue-500 bg-blue-50 rounded-full p-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-3">
                    <div className="w-1/3"></div>
                    <div className="flex-1 flex space-x-4 items-center">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="apiKey" readOnly />
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm font-mono truncate" value={apiKey} readOnly />
                      <div className="flex space-x-1 flex-none w-16">
                        <button className="text-red-500 bg-red-50 rounded-full p-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                        <button className="text-blue-500 bg-blue-50 rounded-full p-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Configuration */}
                <div className="space-y-4 pt-6 border-t pb-8">
                  <h3 className="font-bold text-gray-800">Response Configuration</h3>
                  
                  <div className="flex items-center mt-2">
                    <div className="w-1/3">
                      <span className="text-gray-700 text-sm">Response Type</span>
                    </div>
                    <div className="flex-1">
                      <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-sm">
                        <span>Json</span>
                        <span className="text-gray-400 text-xs">▼</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="w-1/3">
                      <span className="text-gray-700 text-sm">Response Matching Type</span>
                    </div>
                    <div className="flex-1">
                      <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-sm">
                        <span>Key/Value</span>
                        <span className="text-gray-400 text-xs">▼</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="w-1/3">
                      <span className="text-gray-700 text-sm">Response Parameter</span>
                    </div>
                    <div className="flex-1 flex space-x-4 items-center">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="status" readOnly />
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value={mode === 'PhoneManualDial' ? 'queued' : 'queued successfully'} readOnly />
                      <div className="flex space-x-1 flex-none w-16">
                        <button className="text-blue-500 bg-blue-50 rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <div className="w-1/3">
                      <span className="text-gray-700 text-sm">Select Forms</span>
                    </div>
                    <div className="flex-1">
                      <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-sm">
                        <span>Application Form</span>
                        <span className="text-gray-400 text-xs">▼</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="w-1/3">
                      <span className="text-gray-700 text-sm">International Calling Enable</span>
                    </div>
                    <div className="flex-1">
                      <div className="w-10 h-5 bg-gray-300 rounded-full flex items-center p-1">
                        <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md"></div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inbound' && <InboundConfigTab />}
        {activeTab === 'campaign' && (
          <div className="p-6">
            <div className="bg-white border rounded-lg shadow-sm">
              <div className="p-6 space-y-8">
                
                {/* Enable Section */}
                <div className="flex justify-between items-start border-b pb-6">
                  <div className="space-y-4 w-full">
                    <h3 className="font-bold text-gray-800 mb-4">Campaign Calling <br/><span className="text-xs text-gray-500 font-normal">Configure Campaign Calling</span></h3>
                    
                    <div className="flex items-center">
                      <div className="flex items-center space-x-2 w-1/3">
                        <span className="text-gray-700 text-sm">Enable Campaign Dialer User Configuration</span>
                      </div>
                      <div className="flex-1">
                        <div className="w-10 h-5 bg-blue-500 rounded-full flex items-center p-1">
                          <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md transform translate-x-4"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-2">
                      <div className="flex items-center space-x-2 w-1/3">
                        <span className="text-gray-700 text-sm">Enable all mobile type field for campaign calling</span>
                        <span className="text-gray-400 text-xs">ⓘ</span>
                      </div>
                      <div className="flex-1">
                        <div className="w-10 h-5 bg-gray-300 rounded-full flex items-center p-1">
                          <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Request Configuration */}
                <div className="space-y-4 pt-2 border-b pb-6">
                  <h3 className="font-bold text-gray-800">Request Configuration</h3>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex items-center space-x-2 w-1/3">
                      <span className="text-gray-700 text-sm">Request Method</span>
                      <span className="text-gray-400 text-xs">ⓘ</span>
                    </div>
                    <div className="flex-1 flex border rounded-md overflow-hidden bg-gray-50 w-32 flex-none">
                      <button className="px-4 py-1.5 border-r text-gray-600 w-16 text-sm">Get</button>
                      <button className="px-4 py-1.5 bg-blue-500 text-white font-medium w-16 text-sm">Post</button>
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="w-1/3">
                      <span className="text-gray-700 text-sm">Campaign Dialer URL <span className="text-red-500">*</span></span>
                    </div>
                    <div className="flex-1">
                      <input type="text" className="w-full border rounded-md p-2 bg-white text-gray-700 text-sm" value={campaignUrl || "https://in1-ccaas-api.ozonetel.com/cloudAgentRestAPI/index.php/AddCampaignBulkDataV4/addBulkData/format/json"} readOnly />
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <div className="w-1/3 flex items-center space-x-2">
                      <span className="text-gray-700 text-sm">Use V4 API endpoint</span>
                      <span className="text-gray-400 text-xs">ⓘ</span>
                    </div>
                    <div className="flex-1">
                      <div className="w-10 h-5 bg-blue-500 rounded-full flex items-center p-1">
                        <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md transform translate-x-4"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="w-1/3">
                      <span className="text-gray-700 text-sm">Campaign List <span className="text-red-500">*</span></span>
                    </div>
                    <div className="flex-1">
                      <input type="text" className="w-full border rounded-md p-2 bg-white text-gray-700 text-sm" value={campaignList || "Test_Offline,test-demo,Working-Leads"} readOnly />
                    </div>
                  </div>
                </div>

                {/* Request Parameter */}
                <div className="space-y-4 pt-4 border-b pb-6">
                  <h3 className="font-bold text-gray-800">Request Parameter</h3>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex items-center space-x-2 w-1/3">
                      <span className="text-gray-700 text-sm">Add User Specific Value <span className="text-gray-400 text-xs">ⓘ</span></span>
                    </div>
                    <div className="flex-1 flex space-x-4">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="agentNumber" readOnly />
                      <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-sm">
                        <span>Agent ID</span>
                        <span className="text-gray-400 text-xs">▼</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-3">
                    <div className="flex items-center space-x-2 w-1/3">
                      <span className="text-gray-700 text-sm">Add User Specific Value <span className="text-gray-400 text-xs">ⓘ</span></span>
                    </div>
                    <div className="flex-1 flex space-x-4">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="Enter Key Name" readOnly />
                      <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-sm">
                        <span>Select Option</span>
                        <span className="text-gray-400 text-xs">▼</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="flex items-center space-x-2 w-1/3">
                      <span className="text-gray-700 text-sm">Add Lead Specific Value <span className="text-gray-400 text-xs">ⓘ</span></span>
                    </div>
                    <div className="flex-1 flex space-x-4">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="PhoneNumber" readOnly />
                      <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-sm">
                        <span>Applicant Mobile No</span>
                        <span className="text-gray-400 text-xs">▼</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-3">
                    <div className="w-1/3"></div>
                    <div className="flex-1 flex space-x-4 items-center">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="Name" readOnly />
                      <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-sm">
                        <span>Lead ID</span>
                        <span className="text-gray-400 text-xs">▼</span>
                      </div>
                      <div className="flex space-x-1 flex-none w-16">
                        <button className="text-red-500 bg-red-50 rounded-full p-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                        <button className="text-blue-500 bg-blue-50 rounded-full p-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-6">
                    <div className="w-1/3">
                      <span className="text-gray-700 text-sm">Add other parameter(s)</span>
                    </div>
                    <div className="flex-1 flex space-x-4 items-center">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="api_key" readOnly />
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm font-mono truncate" value={apiKey} readOnly />
                      <div className="flex space-x-1 flex-none w-16">
                        <button className="text-red-500 bg-red-50 rounded-full p-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-3">
                    <div className="w-1/3"></div>
                    <div className="flex-1 flex space-x-4 items-center">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="userName" readOnly />
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value={userName || "npf_universal"} readOnly />
                      <div className="flex space-x-1 flex-none w-16">
                        <button className="text-red-500 bg-red-50 rounded-full p-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-3">
                    <div className="w-1/3"></div>
                    <div className="flex-1 flex space-x-4 items-center">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="checkDuplicate" readOnly />
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="true" readOnly />
                      <div className="flex space-x-1 flex-none w-16">
                        <button className="text-red-500 bg-red-50 rounded-full p-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-3">
                    <div className="w-1/3"></div>
                    <div className="flex-1 flex space-x-4 items-center">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="action" readOnly />
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="start" readOnly />
                      <div className="flex space-x-1 flex-none w-16">
                        <button className="text-red-500 bg-red-50 rounded-full p-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                        <button className="text-blue-500 bg-blue-50 rounded-full p-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-6">
                    <div className="w-1/3">
                      <span className="text-gray-700 text-sm">Header(s)</span>
                    </div>
                    <div className="flex-1 flex space-x-4 items-center">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" placeholder="Enter Key" />
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" placeholder="Enter Value" />
                      <div className="flex space-x-1 flex-none w-16">
                        <button className="text-blue-500 bg-blue-50 rounded-full p-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Configuration */}
                <div className="space-y-4 pt-4 pb-6 border-b">
                  <h3 className="font-bold text-gray-800">Response Configuration</h3>
                  
                  <div className="flex items-center mt-2">
                    <div className="w-1/3">
                      <span className="text-gray-700 text-sm">Response Type</span>
                    </div>
                    <div className="flex-1">
                      <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-sm">
                        <span>Json</span>
                        <span className="text-gray-400 text-xs">▼</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="w-1/3">
                      <span className="text-gray-700 text-sm">Response Matching Type</span>
                    </div>
                    <div className="flex-1">
                      <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-sm">
                        <span>Key/Value</span>
                        <span className="text-gray-400 text-xs">▼</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="w-1/3">
                      <span className="text-gray-700 text-sm">Response Parameter</span>
                    </div>
                    <div className="flex-1 flex space-x-4 items-center">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="status" readOnly />
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-700 text-sm" value="success" readOnly />
                      <div className="flex space-x-1 flex-none w-16">
                        <button className="text-blue-500 bg-blue-50 rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lead Allocation Configuration */}
                <div className="space-y-4 pt-4 pb-8">
                  <h3 className="font-bold text-gray-800">Lead Allocation Configuration</h3>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex items-center space-x-2 w-1/3">
                      <span className="text-gray-700 text-sm">Assign Lead/Opportunity To Owner</span>
                      <span className="text-gray-400 text-xs">ⓘ</span>
                    </div>
                    <div className="flex-1">
                      <div className="w-10 h-5 bg-gray-300 rounded-full flex items-center p-1">
                        <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <div className="flex items-center space-x-2 w-1/3">
                      <span className="text-gray-700 text-sm">Assign Lead/Opportunity To Another Owner</span>
                      <span className="text-gray-400 text-xs">ⓘ</span>
                    </div>
                    <div className="flex-1">
                      <div className="w-10 h-5 bg-gray-300 rounded-full flex items-center p-1">
                        <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="w-1/3">
                      <span className="text-gray-700 text-sm">Enable Agent Wise Campaign data push</span>
                    </div>
                    <div className="flex-1">
                      <div className="w-10 h-5 bg-blue-500 rounded-full flex items-center p-1">
                        <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md transform translate-x-4"></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="absolute bottom-4 right-6 pointer-events-none">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md shadow-md pointer-events-auto">Save</button>
      </div>

      {/* User Config Modal Overlay */}
      {isUserConfigOpen && (
        <div className="absolute inset-0 bg-white z-10 flex flex-col">
          {/* Modal Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50/50">
            <div className="flex items-baseline space-x-2">
              <h2 className="text-lg font-bold text-gray-800">User Config</h2>
              <span className="text-xs text-gray-500">- Configure user information</span>
            </div>
            <button 
              className="text-gray-500 hover:text-gray-800 p-1"
              onClick={() => setIsUserConfigOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex justify-end items-center px-4 py-2 border-b bg-white space-x-2">
            <div className="flex border rounded overflow-hidden">
              <input type="text" placeholder="Search by Name & Email" className="px-3 py-1.5 text-sm w-64 outline-none" />
              <button className="bg-white px-2 text-gray-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
              <button className="bg-gray-100 px-2 text-gray-500 border-l"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            </div>
            <button 
              className="text-blue-500 border border-blue-400 hover:bg-blue-50 px-3 py-1.5 rounded flex items-center space-x-1"
              onClick={() => setIsFieldMappingOpen(true)}
            >
              <span className="text-lg leading-none">+</span>
              <span>Field Mapping</span>
            </button>
            <button className="text-blue-500 border border-blue-400 hover:bg-blue-50 px-3 py-1.5 rounded flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <span>Mark as Default</span>
            </button>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200/60 text-gray-700">
                  <th className="p-3 w-10 border-b">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="p-3 border-b font-medium w-1/4">Name</th>
                  <th className="p-3 border-b font-medium w-1/4">Email</th>
                  <th className="p-3 border-b font-medium w-1/4">Agent ID</th>
                  <th className="p-3 border-b font-medium w-1/4">CampaignName</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></td>

                  <td className="p-3 text-gray-800 text-sm">Demo Agent</td>
                  <td className="p-3 text-gray-800 text-sm">demo.agent@example.com</td>
                  <td className="p-3">
                    <input type="text" className="w-full bg-gray-50 border-0 rounded px-3 py-1.5 text-gray-500 outline-none text-sm" value={agentId || "demo.agent"} readOnly />
                  </td>
                  <td className="p-3">
                    <input type="text" className="w-full bg-gray-50 border-0 rounded px-3 py-1.5 text-gray-500 outline-none text-sm" value={campaignName || "demo_campaign"} readOnly />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Field Mapping Modal Overlay */}
      {isFieldMappingOpen && (
        <div className="absolute inset-0 bg-black/30 z-20 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">Define Parameter(s) For User</h2>
              <button 
                className="text-gray-500 hover:text-gray-800 p-1"
                onClick={() => setIsFieldMappingOpen(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-2 h-[400px]">
              <div className="flex items-center space-x-1 mb-2">
                <span className="text-gray-700">Request Parameter</span>
                <span className="text-gray-400 text-xs">ⓘ</span>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex flex-col space-y-1 w-1/3">
                  <input type="text" className="border rounded p-2 text-gray-700" value="Agent ID" readOnly />
                  <span className="text-xs text-gray-400">Enter Label</span>
                </div>
                <div className="flex flex-col space-y-1 w-1/3">
                  <input type="text" className="border rounded p-2 text-gray-700" value="agent_id" readOnly />
                  <span className="text-xs text-gray-400">Enter Key</span>
                </div>
                <div className="flex flex-col space-y-1 w-1/4">
                  <div className="border rounded p-2 flex justify-between items-center text-gray-700 bg-white">
                    <span>string</span>
                    <span className="text-gray-400 text-xs">▼</span>
                  </div>
                  <span className="text-xs text-gray-400">Select data type</span>
                </div>
                <div className="pt-2">
                  <button className="text-blue-500 bg-blue-50 rounded-full p-1 border border-blue-100">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
                  </button>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex flex-col space-y-1 w-1/3">
                  <input type="text" className="border rounded p-2 text-gray-700" value="campaignName" readOnly />
                </div>
                <div className="flex flex-col space-y-1 w-1/3">
                  <input type="text" className="border rounded p-2 text-gray-700" value="campaignName" readOnly />
                </div>
                <div className="flex flex-col space-y-1 w-1/4">
                  <div className="border rounded p-2 flex justify-between items-center text-gray-700 bg-white">
                    <span>string</span>
                    <span className="text-gray-400 text-xs">▼</span>
                  </div>
                </div>
                <div className="pt-2 flex space-x-1">
                  <button className="text-red-500 bg-red-50 p-1 border border-red-100 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4"></path></svg>
                  </button>
                  <button className="text-blue-500 bg-blue-50 p-1 border border-blue-100 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
