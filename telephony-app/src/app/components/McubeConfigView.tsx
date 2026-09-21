import React, { useState } from 'react';
import InboundConfigTab from './InboundConfigTab';

interface McubeConfigViewProps {
  configData?: any;
  agentNumber?: string;
}

export default function McubeConfigView({ configData, agentNumber }: McubeConfigViewProps) {
  const [activeTab, setActiveTab] = useState('outbound');
  const [isUserConfigOpen, setIsUserConfigOpen] = useState(false);
  const [isFieldMappingOpen, setIsFieldMappingOpen] = useState(false);

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
      <div className="flex-1 overflow-auto">
        {/* Tabs */}
          <div className="flex space-x-6 px-6 pt-3 text-gray-500 border-b font-medium">
            <div 
              className={`pb-2 cursor-pointer ${activeTab === 'outbound' ? 'border-b-2 border-blue-600 text-gray-800' : 'hover:text-gray-700'}`}
              onClick={() => setActiveTab('outbound')}
            >Outbound Config</div>
            <div 
              className={`pb-2 cursor-pointer ${activeTab === 'inbound' ? 'border-b-2 border-blue-600 text-gray-800' : 'hover:text-gray-700'}`}
              onClick={() => setActiveTab('inbound')}
            >Inbound Config</div>
            <div className="pb-2 hover:text-gray-700 cursor-pointer">Call Log API</div>
            <div className="pb-2 hover:text-gray-700 cursor-pointer">Additional Config</div>
          </div>

        {activeTab === 'inbound' && <InboundConfigTab />}

          {activeTab === 'outbound' && (
          <div className="p-6 space-y-8">

          {/* Enable Section */}
          <div className="flex justify-between items-start border-b pb-6">
            <div className="space-y-4 w-full">
              <h3 className="font-bold text-gray-800">Enable Outbound Configuration</h3>
              <p className="text-xs text-gray-500 -mt-3 mb-2">Configure the Click to Call API for Outbound Calling</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 w-1/3">
                  <span className="text-gray-700">Enable Outbound Configuration</span>
                  <span className="text-gray-400">ⓘ</span>
                </div>
                <div className="flex-1">
                  <div className="w-10 h-5 bg-blue-500 rounded-full flex items-center p-1">
                    <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md transform translate-x-4"></div>
                  </div>
                </div>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center space-x-2">
                  <span>📞 Make a Test Call</span>
                </button>
              </div>

              <div className="flex items-center">
                <div className="flex items-center space-x-2 w-1/3">
                  <span className="text-gray-700">Enable Virtual Number Filtering</span>
                  <span className="text-gray-400">ⓘ</span>
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
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800">Request Configuration</h3>

            <div className="flex items-center mt-2">
              <div className="flex items-center space-x-2 w-1/3">
                <span className="text-gray-700">Request Method</span>
                <span className="text-gray-400">ⓘ</span>
              </div>
              <div className="flex-1 flex border rounded-md overflow-hidden bg-gray-50">
                <button className="px-4 py-1.5 border-r text-gray-600 w-24">Get</button>
                <button className="px-4 py-1.5 bg-blue-500 text-white font-medium w-24">Post</button>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <div className="w-1/3">
                <span className="text-gray-700">Click To Call (CTC) API URL <span className="text-red-500">*</span></span>
              </div>
              <div className="flex-1">
                <input type="text" className="w-full border rounded-md p-2 bg-gray-50 text-gray-800" value={configData?.clickToCallUrl || "http://api.mcube.com/Restmcube-api/outbound-calls"} readOnly />
              </div>
            </div>
          </div>

          {/* Request Parameter */}
          <div className="space-y-4 pt-4">
            <h3 className="font-bold text-gray-800">Request Parameter</h3>

            <div className="flex items-center mt-2">
              <div className="flex items-center space-x-2 w-1/3">
                <span className="text-gray-700">Add User Specific Value</span>
                <span className="text-gray-400">ⓘ</span>
              </div>
              <div className="flex-1 flex space-x-4">
                <input type="text" className="w-1/2 border rounded-md p-2 bg-white" value="exenumber" readOnly />
                <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed">
                  <span>Agent Number</span>
                  <span className="text-gray-400">▼</span>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <div className="flex items-center space-x-2 w-1/3">
                <span className="text-gray-700">Add Lead Specific Value</span>
                <span className="text-gray-400">ⓘ</span>
              </div>
              <div className="flex-1 flex space-x-4 items-center">
                <input type="text" className="w-1/2 border rounded-md p-2 bg-white" value="custnumber" readOnly />
                <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed">
                  <span>Applicant Mobile No</span>
                  <span className="text-gray-400">▼</span>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <div className="w-1/3"></div>
              <div className="flex-1 flex space-x-4 items-center">
                <input type="text" className="w-1/2 border rounded-md p-2 bg-white" value="refid" readOnly />
                <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed">
                  <span>Lead ID</span>
                  <span className="text-gray-400">▼</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-red-500 bg-red-50 rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                  <button className="text-blue-500 bg-blue-50 rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <div className="w-1/3"></div>
              <div className="flex-1 flex space-x-4 items-center">
                <input type="text" className="w-1/2 border rounded-md p-2 bg-white" value="url" readOnly />
                <input type="text" className="w-1/2 border rounded-md p-2 bg-white" value="1" readOnly />
                <div className="flex space-x-2">
                  <button className="text-red-500 bg-red-50 rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                  <button className="text-blue-500 bg-blue-50 rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <div className="w-1/3">
                <span className="text-gray-700">Add other parameter(s)</span>
              </div>
              <div className="flex-1 flex space-x-4 items-center">
                <input type="text" className="w-1/2 border rounded-md p-2 bg-white" value="apikey" readOnly />
                <input type="text" className="w-1/2 border rounded-md p-2 bg-white text-gray-800 font-mono truncate" value={configData?.apiKey || "e28bd91b14bee1293b0c65f225218efd"} readOnly />
                <button className="text-blue-500 bg-blue-50 rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
              </div>
            </div>
          </div>

          {/* Headers */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center">
              <div className="w-1/3">
                <span className="text-gray-700">Header(s)</span>
              </div>
              <div className="flex-1 flex space-x-4 items-center">
                <input type="text" className="w-1/2 border rounded-md p-2 bg-white" placeholder="Enter Key" />
                <input type="text" className="w-1/2 border rounded-md p-2 bg-white" placeholder="Enter Value" />
                <button className="text-blue-500 bg-blue-50 rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
              </div>
            </div>
          </div>

          {/* Response Configuration */}
          <div className="space-y-4 pt-6 pb-8">
            <h3 className="font-bold text-gray-800">Response Configuration</h3>

            <div className="flex items-center mt-2">
              <div className="w-1/3">
                <span className="text-gray-700">Response Type</span>
              </div>
              <div className="flex-1">
                <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed">
                  <span>Json</span>
                  <span className="text-gray-400">▼</span>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <div className="w-1/3">
                <span className="text-gray-700">Response Matching Type</span>
              </div>
              <div className="flex-1">
                <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed">
                  <span>Key/Value</span>
                  <span className="text-gray-400">▼</span>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <div className="w-1/3">
                <span className="text-gray-700">Response Parameter</span>
              </div>
              <div className="flex-1 flex space-x-4 items-center">
                <input type="text" className="w-1/2 border rounded-md p-2 bg-white" value="msg" readOnly />
                <input type="text" className="w-1/2 border rounded-md p-2 bg-white" value="success" readOnly />
                <button className="text-blue-500 bg-blue-50 rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <div className="w-1/3">
                <span className="text-gray-700">Select Forms</span>
              </div>
              <div className="flex-1">
                <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed">
                  <span>5 Selected</span>
                  <span className="text-gray-400">▼</span>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <div className="w-1/3">
                <span className="text-gray-700">International Calling Enable</span>
              </div>
              <div className="flex-1">
                <div className="w-10 h-5 bg-gray-300 rounded-full flex items-center p-1">
                  <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md"></div>
                </div>
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
                    <input type="text" className="w-full bg-gray-50 border-0 rounded px-3 py-1.5 text-gray-600 outline-none" value={agentNumber} readOnly />
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
