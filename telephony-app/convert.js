const fs = require('fs');
let c = fs.readFileSync('src/app/components/McubeTwoConfigView.tsx', 'utf8');

c = c.replace("  const isCampaign = configData?.configType === 'Campaign';", 
"  const isCampaign = activeTab === 'campaign';");

c = c.replace(
`      {/* Main Form Content */}
      <div className="flex-1 bg-gray-50/50 flex flex-col min-w-0 overflow-y-auto">
        <div className="p-8">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{isCampaign ? 'Campaign Calling' : 'Outbound Config'}</h2>
                <p className="text-sm text-gray-500">{isCampaign ? 'Configure Campaign Calling' : 'Configure outbound calling'}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg></button>
            </div>
            
            <div className="p-6">`,
`      {/* Main Form Content */}
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
              className={\`pb-2 cursor-pointer \${activeTab === 'outbound' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-gray-600'}\`}
              onClick={() => setActiveTab('outbound')}
            >Outbound Config</div>
            <div 
              className={\`pb-2 cursor-pointer \${activeTab === 'inbound' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-gray-600'}\`}
              onClick={() => setActiveTab('inbound')}
            >Inbound Config</div>
            <div 
              className={\`pb-2 cursor-pointer \${activeTab === 'campaign' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-gray-600'}\`}
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
            
            <div className="p-6">`
);

c = c.replace(
`              <div className="flex items-center mt-6">
                <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                  Test Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>`,
`              <div className="flex items-center mt-6">
                <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                  Test Request
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>`
);

fs.writeFileSync('src/app/components/McubeTwoConfigView.tsx', c);
console.log('Replaced successfully');
