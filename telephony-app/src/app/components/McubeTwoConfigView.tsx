import React, { useState } from 'react';
import InboundConfigTab from './InboundConfigTab';

interface McubeTwoConfigViewProps {
  configData?: any;
  agentNumber?: string;
}

export default function McubeTwoConfigView({ configData, agentNumber }: McubeTwoConfigViewProps) {
  const [activeTab, setActiveTab] = useState('outbound');
  const [isUserConfigOpen, setIsUserConfigOpen] = useState(false);
  const [isFieldMappingOpen, setIsFieldMappingOpen] = useState(false);

  const isCampaign = activeTab === 'campaign';

  return (
    <div className="bg-white border rounded-lg shadow-sm font-sans text-sm relative h-[800px] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-gray-800 tracking-wide text-lg">Mcubesoftphone</span>
        </div>
        <div className="space-x-2">
          <button className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50">Virtual Numbers</button>
          <button
            className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50"
            onClick={() => setIsUserConfigOpen(true)}
          >
            User Config
          </button>
          <button className="text-blue-600 border border-blue-600 px-2 py-1 rounded hover:bg-blue-50">↓</button>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="flex-1 overflow-auto bg-gray-50/50 flex flex-col min-w-0">
        {/* Vendor Portal Native Header & Tabs */}
        <div className="bg-white pt-4 px-6 border-b shrink-0">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-5 h-5 text-gray-800 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span className="font-bold text-gray-800 text-lg">Mcubesoftphone</span>
          </div>
          
          <div className="flex space-x-6 text-sm font-medium text-gray-400">
            <div 
              className={`pb-2 cursor-pointer ${activeTab === 'outbound' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-gray-600'}`}
              onClick={() => setActiveTab('outbound')}
            >Outbound Config</div>
            <div 
              className={`pb-2 cursor-pointer ${activeTab === 'inbound' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-gray-600'}`}
              onClick={() => setActiveTab('inbound')}
            >Inbound Config</div>
            <div 
              className={`pb-2 cursor-pointer ${activeTab === 'campaign' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-gray-600'}`}
              onClick={() => setActiveTab('campaign')}
            >Campaign Dialer</div>
            <div className="pb-2 cursor-pointer hover:text-gray-600">Call Log API</div>
            <div className="pb-2 cursor-pointer hover:text-gray-600">Additional Config</div>
          </div>
        </div>

        {activeTab === 'inbound' && <InboundConfigTab />}

        {(activeTab === 'outbound' || activeTab === 'campaign') && (
        <div className="p-8">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{isCampaign ? 'Campaign Calling' : 'Outbound Config'}</h2>
                <p className="text-sm text-gray-500">{isCampaign ? 'Configure Campaign Calling' : 'Configure outbound calling'}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg></button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="text-gray-700">{isCampaign ? 'Enable Campaign Dialer User Configuration' : 'Enable Outbound User Configuration'}</span>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle1" checked readOnly className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" style={{ right: 0, borderColor: '#3b82f6' }}/>
                  <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-6 rounded-full bg-blue-500 cursor-pointer"></label>
                </div>
              </div>

              <div className="flex items-center justify-between mb-8">
                <span className="text-gray-700">{isCampaign ? 'Enable all mobile type field for campaign calling' : 'Enable select forms'}<span className="text-gray-400 ml-1">ⓘ</span></span>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle2" readOnly className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" style={{ right: '1.5rem', borderColor: '#e5e7eb' }}/>
                  <label htmlFor="toggle2" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-200 cursor-pointer"></label>
                </div>
              </div>

              {!isCampaign && (
                <div className="flex items-center justify-between mb-8">
                  <span className="text-gray-700">International Calling<span className="text-gray-400 ml-1">ⓘ</span></span>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" id="toggle3" readOnly className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" style={{ right: '1.5rem', borderColor: '#e5e7eb' }}/>
                    <label htmlFor="toggle3" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-200 cursor-pointer"></label>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Request Configuration</h3>
                
                <div className="flex items-center mt-4">
                  <div className="w-1/3">
                    <span className="text-gray-700">Request Method <span className="text-gray-400">ⓘ</span></span>
                  </div>
                  <div className="flex-1 flex space-x-2">
                    <button className="px-4 py-1.5 rounded bg-gray-100 text-gray-700">Get</button>
                    <button className="px-4 py-1.5 rounded bg-blue-500 text-white shadow">Post</button>
                  </div>
                </div>

                {!isCampaign && (
                  <div className="flex items-center mt-4">
                    <div className="w-1/3">
                      <span className="text-gray-700">Click to call API <span className="text-red-500">*</span></span>
                    </div>
                    <div className="flex-1 flex space-x-2 items-center">
                      <input type="text" className="flex-1 border rounded-md p-2 bg-white text-gray-800" value={configData?.url || "http://mcube.vmc.in/api/outboundcall"} readOnly />
                    </div>
                  </div>
                )}

                {isCampaign && (
                  <>
                    <div className="flex items-center mt-4">
                      <div className="w-1/3">
                        <span className="text-gray-700">Campaign Dialer URL <span className="text-red-500">*</span></span>
                      </div>
                      <div className="flex-1 flex space-x-2 items-center">
                        <input type="text" className="flex-1 border rounded-md p-2 bg-white text-gray-800" value={configData?.campaignUrl || "https://config.mcube.com/Restmcube-api/campaign"} readOnly />
                      </div>
                    </div>
                    {configData?.campaignLists && configData.campaignLists.length > 0 ? (
                      configData.campaignLists.map((list: any, idx: number) => (
                        <div className="flex items-center mt-4" key={idx}>
                          <div className="w-1/3">
                            {idx === 0 && <span className="text-gray-700">Campaign List <span className="text-red-500">*</span></span>}
                          </div>
                          <div className="flex-1 flex space-x-4 items-center">
                            <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-800" value={list.id} readOnly />
                            <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-800" value={list.label} readOnly />
                            <button className="text-red-500 bg-red-50 rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center mt-4">
                        <div className="w-1/3">
                          <span className="text-gray-700">Campaign List <span className="text-red-500">*</span></span>
                        </div>
                        <div className="flex-1 flex space-x-4 items-center">
                          <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-800" value="6" readOnly />
                          <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-800" value="Aditya_Autodialer" readOnly />
                          <button className="text-red-500 bg-red-50 rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Request Parameter</h3>
                
                <div className="flex items-center mt-4">
                  <div className="w-1/3">
                    <span className="text-gray-700">Add User Specific Value <span className="text-gray-400">ⓘ</span></span>
                  </div>
                  <div className="flex-1 flex space-x-4 items-center">
                    <input type="text" className="w-1/2 border rounded-md p-2 bg-white" value="agent_number" readOnly />
                    <select className="w-1/2 border rounded-md p-2 bg-white text-gray-700 outline-none">
                      <option>Agent Number</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <div className="w-1/3">
                    <span className="text-gray-700">Add Lead Specific Value <span className="text-gray-400">ⓘ</span></span>
                  </div>
                  <div className="flex-1 flex space-x-4 items-center">
                    <input type="text" className="w-1/2 border rounded-md p-2 bg-white" value="custnumber" readOnly />
                    <select className="w-1/2 border rounded-md p-2 bg-white text-gray-700 outline-none">
                      <option>Applicant Mobile No</option>
                    </select>
                    <button className="text-blue-500 bg-blue-50 rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
                  </div>
                </div>

                {isCampaign ? (
                  <>
                    <div className="flex items-center mt-4">
                      <div className="w-1/3">
                        <span className="text-gray-700">Add other parameter(s)</span>
                      </div>
                      <div className="flex-1 flex space-x-4 items-center">
                        <input type="text" className="w-1/2 border rounded-md p-2 bg-white" value="campaign_id" readOnly />
                        <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-800 font-mono truncate" value={configData?.campaignLists ? configData.campaignLists.map((l: any) => l.id).join(',') : "6,8"} readOnly />
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-1/3"></div>
                      <div className="flex-1 flex space-x-4 items-center">
                        <input type="text" className="w-1/2 border rounded-md p-2 bg-white" value="campaign_type" readOnly />
                        <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-800 font-mono truncate" value={configData?.campaignType || "1"} readOnly />
                        <div className="flex space-x-2">
                          <button className="text-red-500 bg-red-50 rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                          <button className="text-blue-500 bg-blue-50 rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center mt-4">
                    <div className="w-1/3">
                      <span className="text-gray-700">Add other parameter(s)</span>
                    </div>
                    <div className="flex-1 flex space-x-4 items-center">
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white" value="refurl" readOnly />
                      <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-800 font-mono truncate" value={configData?.refUrl || "1"} readOnly />
                      <div className="flex space-x-2">
                        <button className="text-red-500 bg-red-50 rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                        <button className="text-blue-500 bg-blue-50 rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center mt-4">
                  <div className="w-1/3">
                    <span className="text-gray-700">Header(s)</span>
                  </div>
                  <div className="flex-1 flex space-x-4 items-center">
                    <input type="text" className="w-1/2 border rounded-md p-2 bg-white" value="Authorization" readOnly />
                    <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-800 font-mono truncate" value={configData?.authorization || "Authorization"} readOnly />
                    <button className="text-blue-500 bg-blue-50 rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Response Configuration</h3>
                
                <div className="flex items-center mt-4">
                  <div className="w-1/3">
                    <span className="text-gray-700">Response Type</span>
                  </div>
                  <div className="flex-1 flex space-x-4 items-center">
                    <select className="w-1/2 border rounded-md p-2 bg-white text-gray-700 outline-none">
                      <option>Json</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <div className="w-1/3">
                    <span className="text-gray-700">Response Matching Type</span>
                  </div>
                  <div className="flex-1 flex space-x-4 items-center">
                    <select className="w-1/2 border rounded-md p-2 bg-white text-gray-700 outline-none">
                      <option>Key/Value</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <div className="w-1/3">
                    <span className="text-gray-700">Response Parameter</span>
                  </div>
                  <div className="flex-1 flex space-x-4 items-center">
                    <input type="text" className="w-1/2 border rounded-md p-2 bg-white" value="status" readOnly />
                    <input type="text" className="w-1/2 border rounded-md p-2 bg-white" value={isCampaign ? "true" : "success"} readOnly />
                    <button className="text-blue-500 bg-blue-50 rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-6">
                <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                  Test Request
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
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
                  <th className="p-3 border-b font-medium">Name</th>
                  <th className="p-3 border-b font-medium">Email</th>
                  <th className="p-3 border-b font-medium w-1/3">Agent Number</th>
                </tr>
              </thead>
              <tbody>
                {/* Demo Row */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-3 text-gray-800">Demo Agent</td>
                  <td className="p-3 text-gray-800">demo.agent@example.com</td>
                  <td className="p-3">
                    <input type="text" className="w-full bg-gray-50 border-0 rounded px-3 py-1.5 text-gray-600 outline-none" value={agentNumber || "9684707548"} readOnly />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Field Mapping Modal Overlay (on top of User Config) */}
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
                  <input type="text" className="border rounded p-2 text-gray-700" value="Agent Number" readOnly />
                  <span className="text-xs text-gray-400">Enter Label</span>
                </div>
                <div className="flex flex-col space-y-1 w-1/3">
                  <input type="text" className="border rounded p-2 text-gray-700" value="agent_number" readOnly />
                  <span className="text-xs text-gray-400">Enter Key</span>
                </div>
                <div className="flex flex-col space-y-1 w-1/4">
                  <div className="border rounded p-2 flex justify-between items-center text-gray-700 bg-white">
                    <span>Integer</span>
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
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
