import React from 'react';

export default function InboundConfigTab() {
  return (
    <div className="p-6">
      <div className="bg-white border rounded-md shadow-sm p-6">
        <div className="flex justify-between items-start border-b pb-4 mb-6">
          <div className="space-y-1 w-full">
            <h3 className="font-bold text-gray-800 text-lg">Inbound Calling</h3>
            <p className="text-sm text-gray-500">Configure Inbound Calling and Lead Allocation during Inbound Call</p>
          </div>
          <button className="p-1 text-blue-500 rounded-full border border-blue-500 hover:bg-blue-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Enable Inbound Configuration */}
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <span className="text-gray-700 text-sm">Enable Inbound Configuration</span>
            </div>
            <div className="flex-1 flex justify-end pr-10">
              <div className="w-10 h-5 bg-blue-500 rounded-full flex items-center p-1 cursor-pointer">
                <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md transform translate-x-4"></div>
              </div>
            </div>
          </div>

          {/* Auto-assign inbound calling lead/opportunity to user */}
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <span className="text-gray-700 text-sm">Auto-assign inbound calling lead/opportunity to user</span>
            </div>
            <div className="flex-1 flex justify-end pr-10">
              <div className="w-10 h-5 bg-blue-500 rounded-full flex items-center p-1 cursor-pointer">
                <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md transform translate-x-4"></div>
              </div>
            </div>
          </div>

          {/* Enable all mobile type field for inbound calling */}
          <div className="flex items-center justify-between">
            <div className="w-1/2 flex items-center space-x-1">
              <span className="text-gray-700 text-sm">Enable all mobile type field for inbound calling</span>
              <span className="text-gray-400 text-xs">ⓘ</span>
            </div>
            <div className="flex-1 flex justify-end pr-10">
              <div className="w-10 h-5 bg-gray-300 rounded-full flex items-center p-1 cursor-pointer">
                <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 shadow-md">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
