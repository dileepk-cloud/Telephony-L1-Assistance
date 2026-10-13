export interface TelephonySearchItem {
  id: string;
  category: 'Troubleshooting Case' | 'Error Message' | 'Core Concept' | 'API & Architecture' | 'Checklist' | 'Vendor Guide';
  title: string;
  tabId: string;
  tabLabel: string;
  keywords: string[];
  summary: string;
  details?: string[];
  fixOrAction?: string;
}

export const TELEPHONY_KNOWLEDGE_INDEX: TelephonySearchItem[] = [
  // 6 Checklist Items
  {
    id: 'chk-1',
    category: 'Checklist',
    title: 'Click-to-Call icon not visible',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['click to call', 'icon', 'c2c', 'not visible', 'missing', 'permission'],
    summary: 'Verify user telephony config is set up correctly (new vs. old config screens differ). Confirm user has the correct permission template for Click-to-Call under User Access Control.',
    fixOrAction: 'Check Settings → Permissions → search "call" and ensure Click-to-Call permission is granted.'
  },
  {
    id: 'chk-2',
    category: 'Checklist',
    title: 'Outbound call recording missing',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['recording', 'outbound', 'missing', 'audio', 'call back', 'counsellorId', 'userId'],
    summary: 'Confirm the callback details request was received from the vendor. Check that counsellorId and userId exist in processedData in Telephony API Logs.',
    fixOrAction: 'Inspect Reports & Analytics → Tracker → Telephony API Logs → search number → check Call Back Details API.'
  },
  {
    id: 'chk-3',
    category: 'Checklist',
    title: 'Missed call icon not visible',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['missed call', 'icon', 'not visible', 'permission', 'template'],
    summary: 'Confirm the user has the permission template assigned for the missed-call feature.',
    fixOrAction: 'Grant missed call permissions under User Access Control.'
  },
  {
    id: 'chk-4',
    category: 'Checklist',
    title: 'Call notification popup not visible',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['notification', 'pop-up', 'popup', 'not visible', 'missing', 'screen', 'callback notification'],
    summary: 'Confirm the callback notification request was received by Meritto. Check counsellorId/userId in processedData.',
    fixOrAction: 'Verify vendor Notification URL configuration and inspect Telephony API Logs for Call Notification requests.'
  },
  {
    id: 'chk-5',
    category: 'Checklist',
    title: 'Inbound recording missing',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['inbound', 'recording', 'missing', 'audio', 'call notification', 'callback details'],
    summary: 'Confirm call notification was received first, then callback details received. Check counsellorId/userId in processedData.',
    fixOrAction: 'Verify both Call Notification and Callback Details requests were pushed by the vendor.'
  },
  {
    id: 'chk-6',
    category: 'Checklist',
    title: 'Call log parameters missing entirely',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['parameters missing', 'call log', 'exists column', 'unique call id', 'call id'],
    summary: 'If counsellorId/userId exist but issues persist, check for an "exists" column in Callback Details API. If present, vendor must send a unique call ID per call.',
    fixOrAction: 'Ensure vendor provides a unique call identifier in their callback payload.'
  },

  // 17 Troubleshooting Cases
  {
    id: 'case-1',
    category: 'Troubleshooting Case',
    title: 'Case 1: Inbound call not assigned to counselor (Get Counsellor API returns 0)',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['case 1', 'inbound', 'not assigned', 'get counsellor', 'returns 0', 'sticky agent', 'owner'],
    summary: 'Get Counselor API returns 0 when the call cannot be routed to an assigned counselor.',
    details: [
      'Is the counselor active in the system?',
      'Configured under Extensions → Telephony → User Config?',
      'Is the correct applicant number being passed by the vendor?',
      'Does the lead currently have an assigned owner?'
    ],
    fixOrAction: 'Verify the lead has an assigned counselor in Meritto and that counselor exists in Telephony User Config.'
  },
  {
    id: 'case-2',
    category: 'Troubleshooting Case',
    title: 'Case 2: Inbound call diverted to different counselor despite assigned owner',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['case 2', 'diverted', 'wrong counselor', 'assigned owner', 'sticky agent', 'round robin'],
    summary: 'Inbound calls divert to someone else when the assigned owner is missing in config or missed the call.',
    details: [
      'Is the assigned owner configured in User Config?',
      'Was the call missed by the owner first?',
      'Is the vendor passing correct agent details in the Call Notification request?'
    ],
    fixOrAction: 'Check if owner is configured in User Config. If owner missed the call, vendor fallback routing took over.'
  },
  {
    id: 'case-3',
    category: 'Troubleshooting Case',
    title: 'Case 3: IVR call records not updating on the lead\'s timeline',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['case 3', 'ivr', 'timeline', 'records not updating', 'userId 678', 'counsellorId 0', 'prefix', 'suffix'],
    summary: 'IVR activity fails to reflect on student timeline due to missing callback or formatting issues.',
    details: [
      'Check Telephony API logs for Callback requests at that timestamp.',
      'If Inbound: was it missed by the lead (vendor will not pass counselor details)?',
      'Correct counselor number format (prefix/suffix e.g. 0 or +91)?',
      'Are counsellorId and userId present in final response?',
      'Note: userId = 678 is a hardcoded test-outbound-call value.',
      'Note: counsellorId = 0 means counselor is not configured in Telephony User Config.'
    ],
    fixOrAction: 'Map counselor in User Config and verify phone number prefix formatting matches vendor output.'
  },
  {
    id: 'case-4',
    category: 'Troubleshooting Case',
    title: 'Case 4: Inbound calls from fresh leads missing "Campaign Medium" (DID) value',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['case 4', 'campaign medium', 'did', 'virtual number', 'fresh lead', 'blank did_no'],
    summary: 'Campaign Medium is not captured when the Call Notification is missing or did_no is blank.',
    details: [
      'Was the Call Notification request received on the first call?',
      'Was did_no passed correctly by the vendor (blank = not captured)?'
    ],
    fixOrAction: 'Ensure vendor sends did_no parameter in the first Call Notification request.'
  },
  {
    id: 'case-5',
    category: 'Troubleshooting Case',
    title: 'Case 5: Lead created with the DID number itself (Mobile App)',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['case 5', 'did number', 'mobile app', 'wrong lead', 'delayed notification'],
    summary: 'Vendor\'s Call Notification request was delayed, causing the popup to show the DID before updating to actual student number.',
    fixOrAction: 'Delete the wrongly-created DID lead to stop the recurring notification.'
  },
  {
    id: 'case-6',
    category: 'Troubleshooting Case',
    title: 'Case 6: Counselor not getting Call Notification popup',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['case 6', 'popup', 'pop-up', 'not appearing', 'status:0', 'status:1', 'notification url'],
    summary: 'Call notification popup fails to show when vendor request fails or returns status:0.',
    details: [
      'Was the request sent by the vendor (check API logs)?',
      'Are counselor details correct in the request?',
      'Is the Notification URL configured correctly on the vendor portal?',
      'Did vendor push return status:1? status:0 indicates a parameter error on their end.'
    ],
    fixOrAction: 'Inspect vendor notification URL settings. If status:0 returned, fix parameter mismatch with vendor.'
  },
  {
    id: 'case-7',
    category: 'Troubleshooting Case',
    title: 'Case 7: Lead not created in CRM from inbound call',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['case 7', 'lead not created', 'inbound', 'crm', 'endpoint', 'number format'],
    summary: 'New leads are not auto-created when inbound callback requests are missing or phone format is invalid.',
    details: [
      'Was Call Notification or Callback received in API logs?',
      'Are the correct Meritto endpoints configured with the vendor?',
      'Is the lead/applicant phone number in valid format?'
    ],
    fixOrAction: 'Verify Meritto Call Notification and Callback Details webhook URLs in vendor dashboard.'
  },
  {
    id: 'case-8',
    category: 'Troubleshooting Case',
    title: 'Case 8: Inbound missed call count not updating',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['case 8', 'missed call', 'count', 'triggeredinboundmissedcallactivity', 'lead manager'],
    summary: 'Missed calls only increment in Lead Manager if missed by counselor, not when missed by lead.',
    details: [
      'Was Callback request received?',
      'Check triggeredinboundmissedcallactivity header = 1 for missed.',
      'Counselor details null = missed by the lead, not agent — will NOT count in Lead Manager.'
    ],
    fixOrAction: 'Only counselor-missed calls (where counselor details exist) update Lead Manager counts.'
  },
  {
    id: 'case-9',
    category: 'Troubleshooting Case',
    title: 'Case 9: Call activity wrongly logged in timeline (Duplicate Callbacks)',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['case 9', 'wrong status', 'duplicate callback', 'first callback', 'missed vs connected'],
    summary: 'Only the FIRST callback received is processed. A wrong first callback overrides a later correct one.',
    details: [
      'Multiple Callback requests for the same call?',
      'Was correct call status passed (missed/failed vs. connected)?',
      'Meritto processes only the FIRST callback received — a wrong first callback overrides later ones.'
    ],
    fixOrAction: 'Ensure vendor sends only one final callback once the call has fully concluded.'
  },
  {
    id: 'case-10',
    category: 'Troubleshooting Case',
    title: 'Case 10: Lead not assigned to a counselor on inbound missed calls',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['case 10', 'missed call', 'lead assignment', 'first open', 'unassigned'],
    summary: 'Inbound missed call lead assignment goes to whichever counselor first opens the Missed Call Notification.',
    fixOrAction: 'If no counselor opens the notification, the lead stays unassigned.'
  },
  {
    id: 'case-11',
    category: 'Troubleshooting Case',
    title: 'Case 11: Call data not syncing to User Productivity Dashboard',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['case 11', 'productivity', 'dashboard', 'sync', 'counselor id', '1 hour delay'],
    summary: 'Productivity reports require counselor ID and may take up to 1 hour to refresh.',
    details: [
      'Is correct date filter selected?',
      'Are Callback requests present in Telephony API logs?',
      'Is counselor id present in final response?',
      'Reports can take up to ~1 hour to refresh.'
    ],
    fixOrAction: 'Verify counselor ID mapping in User Config and allow up to 1 hour for dashboard cache refresh.'
  },
  {
    id: 'case-12',
    category: 'Troubleshooting Case',
    title: 'Case 12: Call recording URL missing from timeline',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['case 12', 'recording url', 'missing', 'audio', 'triggeredinboundmissedcallactivity'],
    summary: 'No recording exists if the call was missed (triggeredinboundmissedcallactivity = 1).',
    fixOrAction: 'Check triggeredinboundmissedcallactivity. If 1 (missed), no recording exists.'
  },
  {
    id: 'case-13',
    category: 'Troubleshooting Case',
    title: 'Case 13: Lead\'s number not verified despite answered inbound call',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['case 13', 'number verified', 'auto verify', 'profile edit'],
    summary: 'Merely answering an inbound call does not auto-verify student number. Counselor must open profile, edit, and save.',
    fixOrAction: 'Counselor must open the student profile and click Save to confirm phone verification.'
  },
  {
    id: 'case-14',
    category: 'Troubleshooting Case',
    title: 'Case 14: Timeline not updated (Lead has duplicate accounts Primary/Alternate)',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['case 14', 'duplicate accounts', 'primary', 'alternate', 'new configuration', 'old configuration'],
    summary: 'Multi-account lead timelines only sync on New Telephony Configuration. Old Configuration does not support this.',
    fixOrAction: 'Migrate institute to New Telephony Configuration.'
  },
  {
    id: 'case-15',
    category: 'Troubleshooting Case',
    title: 'Cases 15–17: Click-to-Call icon, missed-call icon, or call notification not visible',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['case 15', 'case 16', 'case 17', 'icons not visible', 'permissions'],
    summary: 'Check permission templates under User Access Control and verify callback notification requests in logs.',
    fixOrAction: 'Grant telephony permissions and verify vendor notification webhook setup.'
  },

  // 8 Error Messages
  {
    id: 'err-1',
    category: 'Error Message',
    title: 'Error: Invalid Vendor',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['invalid vendor', 'error', 'manage institute', 'cloud telephony'],
    summary: 'The telephony vendor is not configured or enabled for this institute.',
    fixOrAction: 'Configure vendor under Manage Institute → Cloud Telephony Configurations.'
  },
  {
    id: 'err-2',
    category: 'Error Message',
    title: 'Error: Agent Details Not Found',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['agent details not found', 'counselor number', 'mapping', 'agent list'],
    summary: 'Counselor mobile number in Meritto is not mapped in vendor\'s agent list.',
    fixOrAction: 'Ensure counselor mobile number is mapped identically on both Meritto and vendor portals.'
  },
  {
    id: 'err-3',
    category: 'Error Message',
    title: 'Error: Status=0, Error=503',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['status=0', '503', 'error=503', 'error 503', '503 error', 'http 503', 'click to call api failure', 'c2c failure'],
    summary: 'Vendor\'s Click-to-Call API is failing or rejecting requests.',
    fixOrAction: 'Escalate to the telephony vendor support team.'
  },
  {
    id: 'err-4',
    category: 'Error Message',
    title: 'Error: Executive Number is under NDNC',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['ndnc', 'dnd', 'do not disturb', 'executive number', 'registry'],
    summary: 'Student or counselor mobile number is registered on Do-Not-Disturb (NDNC) registry.',
    fixOrAction: 'Retest with a different student phone number, or test using a different counselor login.'
  },
  {
    id: 'err-5',
    category: 'Error Message',
    title: 'Error: SR Number is Expired',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['sr number is expired', 'knowlarity', 'super receptionist', 'renewal', 'recharge'],
    summary: 'Knowlarity (Super Receptionist) account subscription has lapsed.',
    fixOrAction: 'College administration team needs to renew/recharge the Knowlarity account.'
  },
  {
    id: 'err-6',
    category: 'Error Message',
    title: 'Error: Agent already in the call',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['agent already in the call', 'busy', 'on call', 'line engaged'],
    summary: 'Vendor reports that the counselor is already engaged on another active call.',
    fixOrAction: 'Wait for current call to disconnect, or verify agent channel status with vendor.'
  },
  {
    id: 'err-7',
    category: 'Error Message',
    title: 'Error: MCUBE 503 Service Unavailable',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['mcube 503', '503 service unavailable', 'connection refused', 'mcube outage', 'error 503', '503 error', 'http 503'],
    summary: 'MCUBE vendor-side server outage or connection refused.',
    fixOrAction: 'Escalate directly to MCUBE support team.'
  },
  {
    id: 'err-8',
    category: 'Error Message',
    title: 'Error: Missing Authentication Token (Knowlarity)',
    tabId: 'troubleshooting',
    tabLabel: 'Troubleshooting',
    keywords: ['missing authentication token', 'knowlarity', 'authorization header', 'post method'],
    summary: 'Authorization header token was not sent in the Click-to-Call request.',
    fixOrAction: 'Configure the "Authorization" header key and POST request method in Telephony Extension.'
  },

  // Core Concepts
  {
    id: 'cnc-1',
    category: 'Core Concept',
    title: 'Inbound vs Outbound vs Campaign Calling',
    tabId: 'overview',
    tabLabel: 'Overview',
    keywords: ['inbound', 'outbound', 'campaign', 'progressive', 'predictive', 'did', 'flow'],
    summary: 'Inbound = lead dials DID to counselor. Outbound = counselor clicks Call to lead (C2C). Campaign = automated dialer calls list of leads.',
    details: [
      'Progressive Dialing: connects to counselor first, then dials lead.',
      'Predictive Dialing: connects to lead first, then routes to available counselor.',
      'In-App Calling: calls placed via Meritto Mobile App without telephony vendor.'
    ]
  },
  {
    id: 'cnc-2',
    category: 'Core Concept',
    title: 'Virtual Numbers (DID) & Aliases Filtering',
    tabId: 'overview',
    tabLabel: 'Overview',
    keywords: ['did', 'virtual numbers', 'alias', 'filtering', 'lead manager', 'workflow', 'campaign mapping'],
    summary: 'Configuring Virtual Numbers (DID) + Aliases makes the DID filterable across Activity Timeline, Lead Manager, Opportunity Manager, and Marketing Automation.',
    fixOrAction: 'Configure under Extensions → Telephony → Vendor → Virtual Numbers.'
  },
  {
    id: 'cnc-3',
    category: 'Core Concept',
    title: 'Multi-Vendor Telephony & Failover Rules',
    tabId: 'overview',
    tabLabel: 'Overview',
    keywords: ['multi vendor', 'failover', 'multiple vendors', 'redundancy', 'routing'],
    summary: 'Assign different vendors to different flows (Inbound, Outbound, Campaign). If one vendor is down, calls reroute to alternate configured vendor.',
    fixOrAction: 'A single-vendor setup only allows one vendor per flow. Multi-vendor must be explicitly enabled.'
  },
  {
    id: 'cnc-4',
    category: 'Core Concept',
    title: 'Cross-Vendor Limitations (What Meritto Telephony Cannot Do)',
    tabId: 'overview',
    tabLabel: 'Overview',
    keywords: ['limitations', 'cannot do', 'duplicate callback', 'sticky agent fallback', 'first callback rule'],
    summary: 'Calls are executed and routed entirely by the vendor. Meritto tracks, logs, and notifies. Meritto only processes the FIRST callback received per call.',
    details: [
      'Vendor must send correctly formatted counsellorId/userId for reports and timeline to sync.',
      'Duplicate callbacks: Meritto processes only the FIRST callback received.',
      'Sticky-agent routing is optional and vendor-implemented.'
    ]
  },

  // APIs
  {
    id: 'api-1',
    category: 'API & Architecture',
    title: 'The 5 Core Telephony APIs',
    tabId: 'overview',
    tabLabel: 'Overview',
    keywords: ['5 apis', 'get counselor', 'call routing', 'call notification', 'call log', 'click to call', 'campaign notification'],
    summary: '1. Get Counselor / Call Routing API (Sticky Agent). 2. Call Notification / Pop-up API. 3. Call Log / Callback Details API. 4. Click-to-Call (Outbound) API. 5. Campaign Notification / Callback API.',
    details: [
      'Get Counselor: Tells vendor which counselor owns a lead.',
      'Call Notification: Triggers screen pop-up before call is answered.',
      'Call Log Details: Vendor pushes duration, recording, outcome when call ends.'
    ]
  },

  // Vendors
  {
    id: 'vnd-ozonetel',
    category: 'Vendor Guide',
    title: 'Ozonetel (Click-to-Call & Campaign)',
    tabId: 'ozonetel',
    tabLabel: 'Ozonetel',
    keywords: ['ozonetel', 'c2c', 'campaign', 'api key', 'username', 'agent pin', 'agent id'],
    summary: 'Requires API Key, Username, Inbound/Outbound campaign names, DID number, Agent Number/PIN/ID, and mode (Online/Offline).'
  },
  {
    id: 'vnd-mcube',
    category: 'Vendor Guide',
    title: 'MCUBE Softphone Integration',
    tabId: 'mcube',
    tabLabel: 'MCUBE',
    keywords: ['mcube', 'softphone', 'restmcube', 'exenumber', 'custnumber', 'refid', 'refurl', 'bearer token'],
    summary: 'Requires C2C URL (config.mcube.com/Restmcube-api/campaign), exenumber -> Agent Number, custnumber -> Applicant Mobile No, refid -> Lead ID, refurl. Default parameter type is string.'
  },
  {
    id: 'vnd-smartping',
    category: 'Vendor Guide',
    title: 'SmartPing (Hardphone & Campaign Dialing)',
    tabId: 'smartping-hard',
    tabLabel: 'SmartPing',
    keywords: ['smartping', 'hardphone', 'campaign', 'token', 'user id', 'location_id', 'agent-wise'],
    summary: 'Hardphone uses User ID + Token with Integer/String parameter types. Campaign mode supports either Agent-wise or Non-Agent-wise push.'
  },
  {
    id: 'vnd-knowlarity',
    category: 'Vendor Guide',
    title: 'Knowlarity (Streaming API / BRIDGE & CDR Events)',
    tabId: 'knowlarity',
    tabLabel: 'Knowlarity',
    keywords: ['knowlarity', 'streaming api', 'bridge event', 'cdr event', 'x-api-key', 'k_number', 'caller_id'],
    summary: 'Uses Streaming API: BRIDGE event triggers popup upon counselor connection; CDR event logs duration and recording upon disconnect.'
  },
  {
    id: 'vnd-telecmi',
    category: 'Vendor Guide',
    title: 'TeleCMI (Connle Desktop Softphone & Follow-Me)',
    tabId: 'telecmi',
    tabLabel: 'TeleCMI',
    keywords: ['telecmi', 'connle', 'follow me', 'secret', 'user_id', 'to', 'custom', 'international calling'],
    summary: 'Requires Secret key, user_id -> Agent Number (Integer default), to -> Applicant Mobile No, custom -> Lead ID. Softphone runs via Connle app; hardphone requires Follow me enabled.'
  },
  {
    id: 'vnd-myoperator',
    category: 'Vendor Guide',
    title: 'MyOperator (Dual User Parameters & Fallback Routing)',
    tabId: 'myoperator',
    tabLabel: 'MyOperator',
    keywords: ['myoperator', 'secret token', 'public ivr id', 'agent_number', 'user_id', 'number', 'reference_id'],
    summary: 'Requires secret_token, type, public_ivr_id, company_id, and BOTH agent_number and user_id mapped in user-specific values.'
  },
  {
    id: 'vnd-tatatel',
    category: 'Vendor Guide',
    title: 'Tatatel (Tata Tele Services - Smartflo)',
    tabId: 'tatatel',
    tabLabel: 'Tatatel',
    keywords: ['tatatel', 'smartflo', 'tata', 'authorization', 'agent_number', 'agent_no', 'destination_number', 'npf_id', 'async=1'],
    summary: 'Outbound C2C via Smartflo API with Authorization bearer token. Maps agent_number, agent_no, destination_number, npf_id, async=1.'
  },
  {
    id: 'vnd-acefone',
    category: 'Vendor Guide',
    title: 'Acefone (Click-to-Call Configuration)',
    tabId: 'acefone',
    tabLabel: 'Acefone',
    keywords: ['acefone', 'c2c', 'authorization', 'agent_number', 'destination_number', 'lead_id', 'Originate successfully queued'],
    summary: 'Outbound C2C with Authorization header, application/json content-type & accept headers, agent_number -> Agent Number (string), destination_number, and lead_id.'
  }
];
