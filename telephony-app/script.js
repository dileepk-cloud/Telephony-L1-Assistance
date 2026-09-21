const fs = require('fs');

const files = fs.readdirSync('./src/app/components').filter(f => f.endsWith('ConfigView.tsx') && f !== 'MyoperatorConfigView.tsx' && f !== 'OzonetelConfigView.tsx' && f !== 'SmartPingCCConfigView.tsx');

files.forEach(file => {
  let content = fs.readFileSync(`./src/app/components/${file}`, 'utf-8');
  
  if (!content.includes('import InboundConfigTab')) {
    content = content.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport InboundConfigTab from './InboundConfigTab';");
  }
  
  if (!content.includes('const [activeTab, setActiveTab]')) {
    content = content.replace("const [isUserConfigOpen", "const [activeTab, setActiveTab] = useState('outbound');\n  const [isUserConfigOpen");
  }

  const oldTabsRegex = /\{\/\* Tabs \*\/\}\s*<div className="flex space-x-6 px-6 pt-3 text-gray-500 border-b font-medium">\s*<div className="pb-2 border-b-2 border-blue-600 text-gray-800">Outbound Config<\/div>\s*<div className="pb-2 hover:text-gray-700 cursor-pointer">Inbound Config<\/div>\s*<div className="pb-2 hover:text-gray-700 cursor-pointer">Call Log API<\/div>\s*<div className="pb-2 hover:text-gray-700 cursor-pointer">Additional Config<\/div>\s*<\/div>/;

  const newTabs = `{/* Tabs */}
          <div className="flex space-x-6 px-6 pt-3 text-gray-500 border-b font-medium">
            <div 
              className={\`pb-2 cursor-pointer \${activeTab === 'outbound' ? 'border-b-2 border-blue-600 text-gray-800' : 'hover:text-gray-700'}\`}
              onClick={() => setActiveTab('outbound')}
            >Outbound Config</div>
            <div 
              className={\`pb-2 cursor-pointer \${activeTab === 'inbound' ? 'border-b-2 border-blue-600 text-gray-800' : 'hover:text-gray-700'}\`}
              onClick={() => setActiveTab('inbound')}
            >Inbound Config</div>
            <div className="pb-2 hover:text-gray-700 cursor-pointer">Call Log API</div>
            <div className="pb-2 hover:text-gray-700 cursor-pointer">Additional Config</div>
          </div>`;

  content = content.replace(oldTabsRegex, newTabs);
  
  const outboundStart = `<div className="p-6 space-y-8">`;
  const newOutboundStart = `{activeTab === 'inbound' && <InboundConfigTab />}\n\n          {activeTab === 'outbound' && (\n          <div className="p-6 space-y-8">`;
  
  // only replace the first occurrence (which is the main outer one)
  content = content.replace(outboundStart, newOutboundStart);
  
  const endBlockRegex = /<\/div>\s*<\/div>\s*\{\/\* User Config Modal Overlay \*\/\}/;
  const newEndBlock = `</div>\n          )}\n        </div>\n\n      {/* User Config Modal Overlay */}`;
  
  content = content.replace(endBlockRegex, newEndBlock);

  fs.writeFileSync(`./src/app/components/${file}`, content);
  console.log(`Processed ${file}`);
});
