import React, { useState } from 'react';
import InboundConfigTab from './InboundConfigTab';

interface TatatelConfigViewProps {
  url: string;
  authorization: string;
  agentNumber?: string;
}

export default function TatatelConfigView({
  url,
  authorization,
  agentNumber,
}: TatatelConfigViewProps) {
  const [activeTab, setActiveTab] = useState('outbound');
  const [isUserConfigOpen, setIsUserConfigOpen] = useState(false);
  const [isFieldMappingOpen, setIsFieldMappingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const ctcUrl = url || '';
  const effectiveAuth = authorization || '';
  const effectiveAgentNumber = agentNumber || '+919684707548';
  const effectiveAgentNo = agentNumber
    ? (agentNumber.startsWith('+91')
        ? '0' + agentNumber.slice(3)
        : agentNumber.startsWith('0')
        ? agentNumber
        : '0' + agentNumber)
    : '09684707548';

  // Demo user data
  const demoUsers = [
    {
      name: 'Demo Agent',
      email: 'demo.agent@example.com',
      agentNumber: effectiveAgentNumber,
      agentNo: effectiveAgentNo,
    },
  ];

  const filteredUsers = demoUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white border rounded-lg shadow-sm font-sans text-sm relative h-[800px] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b bg-white">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-gray-800 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span className="font-bold text-gray-800 tracking-wide text-lg">Tatatel</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 text-xs font-medium">
            Virtual Numbers
          </button>
          <button
            className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 text-xs font-medium"
            onClick={() => setIsUserConfigOpen(true)}
          >
            User Config
          </button>
          <button className="text-blue-600 border border-blue-600 px-2 py-1 rounded hover:bg-blue-50 text-xs font-medium flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex space-x-6 px-6 pt-3 text-gray-500 border-b font-medium text-sm bg-white shrink-0">
        <div
          className={`pb-2 cursor-pointer transition-colors ${
            activeTab === 'outbound' ? 'border-b-2 border-blue-600 text-gray-800 font-semibold' : 'hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('outbound')}
        >
          Outbound Config
        </div>
        <div
          className={`pb-2 cursor-pointer transition-colors ${
            activeTab === 'inbound' ? 'border-b-2 border-blue-600 text-gray-800 font-semibold' : 'hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('inbound')}
        >
          Inbound Config
        </div>
        <div
          className={`pb-2 cursor-pointer transition-colors ${
            activeTab === 'callLog' ? 'border-b-2 border-blue-600 text-gray-800 font-semibold' : 'hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('callLog')}
        >
          Call Log API
        </div>
        <div className="pb-2 hover:text-gray-700 cursor-pointer">Additional Config</div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-gray-50/40">
        {/* Outbound Config Tab */}
        {activeTab === 'outbound' && (
          <div className="p-6">
            <div className="bg-white border rounded-lg shadow-sm p-6 space-y-8">
              {/* Enable Outbound Configuration Header */}
              <div className="border-b pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800 text-base">Enable Outbound Configuration</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Configure the Click to Call API for Outbound Calling</p>
                    <div className="h-0.5 w-12 bg-blue-600 mt-2"></div>
                  </div>
                  <button className="p-1 text-blue-500 rounded-full border border-blue-400 hover:bg-blue-50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                  </button>
                </div>

                {/* Toggles */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 w-1/3">
                      <span className="text-gray-700 text-sm">Enable Outbound Configuration</span>
                      <span className="text-gray-400 text-xs">ⓘ</span>
                    </div>
                    <div className="flex-1">
                      <div className="w-10 h-5 bg-blue-500 rounded-full flex items-center p-1 cursor-pointer">
                        <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md transform translate-x-4"></div>
                      </div>
                    </div>
                    <button className="bg-[#22c55e] text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-green-600 flex items-center space-x-1 shadow-sm">
                      <span>📞 Make a Test Call</span>
                    </button>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center space-x-2 w-1/3">
                      <span className="text-gray-700 text-sm">Enable Virtual Number Filtering</span>
                      <span className="text-gray-400 text-xs">ⓘ</span>
                    </div>
                    <div className="flex-1">
                      <div className="w-10 h-5 bg-gray-300 rounded-full flex items-center p-1 cursor-pointer">
                        <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Request Configuration */}
              <div className="space-y-4 border-b pb-6">
                <h4 className="font-bold text-gray-800 text-sm">Request Configuration</h4>

                <div className="flex items-center mt-2">
                  <div className="flex items-center space-x-2 w-1/3">
                    <span className="text-gray-700">Request Method</span>
                    <span className="text-gray-400 text-xs">ⓘ</span>
                  </div>
                  <div className="flex-1 flex border rounded-md overflow-hidden bg-gray-50 w-fit">
                    <button className="px-4 py-1.5 border-r text-gray-600 w-20 text-xs">Get</button>
                    <button className="px-4 py-1.5 bg-blue-600 text-white font-medium w-20 text-xs">Post</button>
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <div className="w-1/3">
                    <span className="text-gray-700">
                      Click To Call (c2c) API URL <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      className="w-full border rounded-md p-2 bg-gray-50 text-gray-800 text-xs"
                      value={ctcUrl}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Request Parameter */}
              <div className="space-y-4 border-b pb-6">
                <h4 className="font-bold text-gray-800 text-sm">Request Parameter</h4>

                {/* Add User Specific Value (agent_number -> Agent Number) */}
                <div className="flex items-center mt-2">
                  <div className="flex items-center space-x-2 w-1/3">
                    <span className="text-gray-700">Add User Specific Value</span>
                    <span className="text-red-500">*</span>
                    <span className="text-gray-400 text-xs">ⓘ</span>
                  </div>
                  <div className="flex-1 flex space-x-4">
                    <input
                      type="text"
                      className="w-1/2 border rounded-md p-2 bg-white text-gray-800 text-xs"
                      value="agent_number"
                      readOnly
                    />
                    <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-xs">
                      <span>Agent Number</span>
                      <span className="text-gray-400">▼</span>
                    </div>
                  </div>
                </div>

                {/* Add User Specific Value (agent_no -> Agent No) */}
                <div className="flex items-center mt-4">
                  <div className="flex items-center space-x-2 w-1/3">
                    <span className="text-gray-700">Add User Specific Value</span>
                    <span className="text-red-500">*</span>
                    <span className="text-gray-400 text-xs">ⓘ</span>
                  </div>
                  <div className="flex-1 flex space-x-4">
                    <input
                      type="text"
                      className="w-1/2 border rounded-md p-2 bg-white text-gray-800 text-xs"
                      value="agent_no"
                      readOnly
                    />
                    <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-xs">
                      <span>Agent No</span>
                      <span className="text-gray-400">▼</span>
                    </div>
                  </div>
                </div>

                {/* Add Lead Specific Value */}
                <div className="flex items-start mt-4">
                  <div className="flex items-center space-x-2 w-1/3 pt-2">
                    <span className="text-gray-700">Add Lead Specific Value</span>
                    <span className="text-red-500">*</span>
                    <span className="text-gray-400 text-xs">ⓘ</span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex space-x-4 items-center">
                      <input
                        type="text"
                        className="w-1/2 border rounded-md p-2 bg-white text-gray-800 text-xs"
                        value="destination_number"
                        readOnly
                      />
                      <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-xs">
                        <span>Applicant Mobile No</span>
                        <span className="text-gray-400">▼</span>
                      </div>
                    </div>

                    <div className="flex space-x-4 items-center">
                      <input
                        type="text"
                        className="w-1/2 border rounded-md p-2 bg-white text-gray-800 text-xs"
                        value="npf_id"
                        readOnly
                      />
                      <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-xs">
                        <span>Lead ID</span>
                        <span className="text-gray-400">▼</span>
                      </div>
                      <div className="flex items-center space-x-1 pl-1">
                        <button className="text-red-500 bg-red-50 rounded-full p-1 border border-red-200">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                          </svg>
                        </button>
                        <button className="text-blue-500 bg-blue-50 rounded-full p-1 border border-blue-200">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add other parameter(s) */}
                <div className="flex items-start mt-4">
                  <div className="w-1/3 pt-2">
                    <span className="text-gray-700">Add other parameter(s)</span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex space-x-4 items-center">
                      <input
                        type="text"
                        className="w-1/2 border rounded-md p-2 bg-white text-gray-800 text-xs"
                        value="async"
                        readOnly
                      />
                      <input
                        type="text"
                        className="w-1/2 border rounded-md p-2 bg-white text-gray-800 text-xs font-medium"
                        value="1"
                        readOnly
                      />
                      <div className="flex items-center pl-1">
                        <button className="text-blue-500 bg-blue-50 rounded-full p-1 border border-blue-200">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Header(s) */}
                <div className="flex items-start mt-4">
                  <div className="w-1/3 pt-2">
                    <span className="text-gray-700">Header(s)</span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex space-x-4 items-center">
                      <input
                        type="text"
                        className="w-1/2 border rounded-md p-2 bg-white text-gray-800 text-xs"
                        value="Authorization"
                        readOnly
                      />
                      <input
                        type="text"
                        className="w-1/2 border rounded-md p-2 bg-white text-gray-800 text-xs font-mono"
                        value={effectiveAuth}
                        readOnly
                      />
                    </div>

                    <div className="flex space-x-4 items-center">
                      <input
                        type="text"
                        className="w-1/2 border rounded-md p-2 bg-white text-gray-400 text-xs"
                        placeholder="Enter Key"
                        readOnly
                      />
                      <input
                        type="text"
                        className="w-1/2 border rounded-md p-2 bg-white text-gray-400 text-xs"
                        placeholder="Enter Value"
                        readOnly
                      />
                      <div className="flex items-center space-x-1 pl-1">
                        <button className="text-red-500 bg-red-50 rounded-full p-1 border border-red-200">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                          </svg>
                        </button>
                        <button className="text-blue-500 bg-blue-50 rounded-full p-1 border border-blue-200">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Configuration */}
              <div className="space-y-4">
                <h4 className="font-bold text-gray-800 text-sm">Response Configuration</h4>

                <div className="flex items-center mt-2">
                  <div className="w-1/3">
                    <span className="text-gray-700">Response Type</span>
                  </div>
                  <div className="flex-1">
                    <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-xs">
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
                    <div className="w-1/2 border rounded-md p-2 bg-white text-gray-700 flex justify-between items-center cursor-not-allowed text-xs">
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
                    <input
                      type="text"
                      className="w-1/2 border rounded-md p-2 bg-white text-gray-800 text-xs"
                      value="message"
                      readOnly
                    />
                    <input
                      type="text"
                      className="w-1/2 border rounded-md p-2 bg-white text-gray-800 text-xs"
                      value="Originate successfully queued"
                      readOnly
                    />
                    <button className="text-blue-500 bg-blue-50 rounded-full p-1 border border-blue-200">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>


                <div className="flex items-center mt-4">
                  <div className="w-1/3">
                    <span className="text-gray-700">International Calling Enable</span>
                  </div>
                  <div className="flex-1">
                    <div className="w-10 h-5 bg-gray-300 rounded-full flex items-center p-1 cursor-pointer">
                      <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md"></div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 shadow-sm font-medium text-xs">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inbound Config Tab */}
        {activeTab === 'inbound' && <InboundConfigTab />}

        {/* Call Log API Tab */}
        {activeTab === 'callLog' && (
          <div className="p-6">
            <div className="bg-white border rounded-md shadow-sm p-6 text-gray-500 text-sm">
              <p>Call Log API configuration for Tatatel</p>
            </div>
          </div>
        )}
      </div>

      {/* User Config Modal Overlay */}
      {isUserConfigOpen && (
        <div className="absolute inset-0 bg-white z-20 flex flex-col">
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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex justify-end items-center px-4 py-2 border-b bg-white space-x-2">
            <div className="flex border rounded overflow-hidden">
              <input
                type="text"
                placeholder="Search by Name & Email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1.5 text-xs w-64 outline-none"
              />
              <button className="bg-white px-2 text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-gray-100 px-2 text-gray-500 border-l"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              )}
            </div>
            <button
              className="text-blue-600 border border-blue-500 hover:bg-blue-50 px-3 py-1.5 rounded flex items-center space-x-1 text-xs font-medium"
              onClick={() => setIsFieldMappingOpen(true)}
            >
              <span className="text-base leading-none">+</span>
              <span>Field Mapping</span>
            </button>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100/80 text-gray-700 text-xs font-semibold">
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Email</th>
                  <th className="p-3 border-b w-1/4">Agent Number</th>
                  <th className="p-3 border-b w-1/4">Agent No</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {filteredUsers.map((user, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-gray-800 font-medium">{user.name}</td>
                    <td className="p-3 text-gray-600">{user.email}</td>
                    <td className="p-3">
                      <input
                        type="text"
                        className="w-full bg-gray-50 border rounded px-3 py-1.5 text-gray-700 outline-none text-xs"
                        placeholder="Agent Number"
                        value={user.agentNumber}
                        readOnly
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        className="w-full bg-gray-50 border rounded px-3 py-1.5 text-gray-700 outline-none text-xs"
                        placeholder="Agent No"
                        value={user.agentNo}
                        readOnly
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex justify-end items-center px-4 py-2 border-t text-xs text-gray-500 space-x-4 bg-gray-50/50">
            <div className="flex items-center space-x-1">
              <span>Show Rows</span>
              <span className="border rounded px-2 py-0.5 bg-white text-gray-700">10 ▾</span>
            </div>
            <div>
              <span>Go to 1 of 5</span>
            </div>
            <div className="flex items-center space-x-1">
              <button className="border rounded p-1 hover:bg-gray-100 text-gray-400 cursor-not-allowed">
                &lt;
              </button>
              <button className="border rounded p-1 hover:bg-gray-100 text-gray-700">
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Field Mapping Modal Overlay (Define Parameter(s) For User) */}
      {isFieldMappingOpen && (
        <div className="absolute inset-0 bg-black/40 z-30 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-5 py-3.5 border-b bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-800">Define Parameter(s) For User</h2>
              <button
                className="text-gray-500 hover:text-gray-800 p-1"
                onClick={() => setIsFieldMappingOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-1">
                <span className="text-gray-700 text-sm font-semibold">Request Parameter</span>
                <span className="text-gray-400 text-xs">ⓘ</span>
              </div>

              {/* Parameter 1: Agent Number */}
              <div className="flex items-start space-x-3">
                <div className="flex flex-col space-y-1 w-1/3">
                  <input
                    type="text"
                    className="border rounded p-2 text-gray-800 text-xs bg-white"
                    value="Agent Number"
                    readOnly
                  />
                  <span className="text-[11px] text-gray-400">Enter Label</span>
                </div>
                <div className="flex flex-col space-y-1 w-1/3">
                  <input
                    type="text"
                    className="border rounded p-2 text-gray-800 text-xs bg-white"
                    value="agent_number"
                    readOnly
                  />
                  <span className="text-[11px] text-gray-400">Enter Key</span>
                </div>
                <div className="flex flex-col space-y-1 w-1/3">
                  <div className="border rounded p-2 flex justify-between items-center text-gray-700 bg-white text-xs">
                    <span>string</span>
                    <span className="text-gray-400 text-xs">▼</span>
                  </div>
                  <span className="text-[11px] text-gray-400">Select data type</span>
                </div>
              </div>

              {/* Parameter 2: Agent No */}
              <div className="flex items-start space-x-3">
                <div className="flex flex-col space-y-1 w-1/3">
                  <input
                    type="text"
                    className="border rounded p-2 text-gray-800 text-xs bg-white"
                    value="Agent No"
                    readOnly
                  />
                  <span className="text-[11px] text-gray-400">Enter Label</span>
                </div>
                <div className="flex flex-col space-y-1 w-1/3">
                  <input
                    type="text"
                    className="border rounded p-2 text-gray-800 text-xs bg-white"
                    value="agent_no"
                    readOnly
                  />
                  <span className="text-[11px] text-gray-400">Enter Key</span>
                </div>
                <div className="flex flex-col space-y-1 w-1/3">
                  <div className="border rounded p-2 flex justify-between items-center text-gray-700 bg-white text-xs">
                    <span>string</span>
                    <span className="text-gray-400 text-xs">▼</span>
                  </div>
                  <span className="text-[11px] text-gray-400">Select data type</span>
                </div>
                <div className="pt-1 flex items-center space-x-1">
                  <button className="text-red-500 bg-red-50 rounded-full p-1 border border-red-200">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                    </svg>
                  </button>
                  <button className="text-blue-500 bg-blue-50 rounded-full p-1 border border-blue-200">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
                    </svg>
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
