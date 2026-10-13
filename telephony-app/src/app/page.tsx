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
import SrKnowlarityConfigView from './components/SrKnowlarityConfigView';
import TatatelConfigView from './components/TatatelConfigView';
import AcefoneConfigView from './components/AcefoneConfigView';
import TelephonyReferenceConsole from './components/TelephonyReferenceConsole';
import { useTheme, ThemeToggle } from './components/ThemeContext';
import VaaniLogo from './components/VaaniLogo';

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
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
  const isValidUrl = (urlString: string) => { try { return Boolean(new URL(urlString)); } catch (e) { return false; } };
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
  const [knowlarityUrl, setKnowlarityUrl] = useState('');
  const [knowlarityKNumber, setKnowlarityKNumber] = useState('');
  const [knowlarityAuth, setKnowlarityAuth] = useState('');
  const [knowlarityApiKey, setKnowlarityApiKey] = useState('');
  const [knowlarityLiveStreamUrl, setKnowlarityLiveStreamUrl] = useState('');
  const [tatatelUrl, setTatatelUrl] = useState('');
  const [tatatelAuth, setTatatelAuth] = useState('');
  const [acefoneUrl, setAcefoneUrl] = useState('');
  const [acefoneAuth, setAcefoneAuth] = useState('');
  const [appMode, setAppMode] = useState<'hub' | 'config' | 'guide'>('hub');
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
      if (!isValidUrl(telecmiUrl)) {
        setError('Click To Call API URL must be a valid URL.');
        return;
      }
      if (/\s/.test(telecmiSecret)) {
        setError('Secret Key must not contain any spaces.');
        return;
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
          url: telecmiUrl
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
      if (!isValidUrl(sparcUrl)) {
        setError('Click To Call API URL must be a valid URL.');
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
        if (!isValidUrl(smartPingCcCtcUrl)) {
          setError('Click To Call API URL must be a valid URL.');
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
        if (!isValidUrl(smartPingCcCampaignUrl)) {
          setError('Campaign Dialer URL must be a valid URL.');
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
      if (!isValidUrl(smartpingCtcUrl)) {
        setError('Click To Call API URL must be a valid URL.');
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
      if (!isValidUrl(myoperatorCtcUrl)) {
        setError('Click To Call API URL must be a valid URL.');
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
        if (!isValidUrl(ozonetelCtcUrl)) {
          setError('Click To Call API URL must be a valid URL.');
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
        if (!isValidUrl(ozonetelCampaignUrl)) {
          setError('Campaign Dialer URL must be a valid URL.');
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
      if (!isValidUrl(mcubeCtcUrl)) {
        setError('Click To Call API URL must be a valid URL.');
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
        if (!isValidUrl(mcubeTwoCtcUrl)) {
          setError('Click To Call API URL must be a valid URL.');
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
        if (!isValidUrl(mcubeTwoCampaignUrl)) {
          setError('Campaign Dialer URL must be a valid URL.');
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

    if (vendor === 'SR Knowlarity') {
      if (!knowlarityUrl.trim() || !knowlarityKNumber.trim() || !knowlarityAuth.trim() || !knowlarityApiKey.trim() || !knowlarityLiveStreamUrl.trim()) {
        setError('Please provide Click to Call API URL, k_number, Authorization, x-api key, and Live Streaming API URL for SR Knowlarity.');
        return;
      }
      if (/\s/.test(knowlarityUrl)) {
        setError('Click To Call API URL must not contain any spaces.');
        return;
      }
      if (!isValidUrl(knowlarityUrl)) {
        setError('Click To Call API URL must be a valid URL.');
        return;
      }
      if (/\s/.test(knowlarityLiveStreamUrl)) {
        setError('Live Streaming API URL must not contain any spaces.');
        return;
      }
      if (!isValidUrl(knowlarityLiveStreamUrl)) {
        setError('Live Streaming API URL must be a valid URL.');
        return;
      }
      if (/\s/.test(knowlarityAuth)) {
        setError('Authorization must not contain any spaces.');
        return;
      }
      if (/\s/.test(knowlarityApiKey)) {
        setError('x-api key must not contain any spaces.');
        return;
      }

      setError('');
      setLoading(true);
      setConfigData({
        vendor: 'SR Knowlarity',
        data: {
          url: knowlarityUrl,
          kNumber: knowlarityKNumber,
          authorization: knowlarityAuth,
          apiKey: knowlarityApiKey,
          streamingAuthKey: knowlarityAuth,
          liveStreamingUrl: knowlarityLiveStreamUrl
        },
        agentNumber: agentNumber.trim() || '+918860606663'
      });
      setLoading(false);
      return;
    }

    if (vendor === 'Tatatel') {
      if (!tatatelUrl.trim() || !tatatelAuth.trim()) {
        setError('Please provide Click to Call API URL and Authorization for Tatatel.');
        return;
      }
      if (/\s/.test(tatatelUrl)) {
        setError('Click To Call API URL must not contain any spaces.');
        return;
      }
      if (!isValidUrl(tatatelUrl)) {
        setError('Click To Call API URL must be a valid URL.');
        return;
      }
      if (/\s/.test(tatatelAuth)) {
        setError('Authorization must not contain any spaces.');
        return;
      }

      setError('');
      setLoading(true);
      setConfigData({
        vendor: 'Tatatel',
        data: {
          url: tatatelUrl,
          authorization: tatatelAuth,
        },
        agentNumber: agentNumber.trim() || '+919684707548'
      });
      setLoading(false);
      return;
    }

    if (vendor === 'Acefone') {
      if (!acefoneUrl.trim() || !acefoneAuth.trim()) {
        setError('Please provide Click to Call API URL and Authorization for Acefone.');
        return;
      }
      if (/\s/.test(acefoneUrl)) {
        setError('Click To Call API URL must not contain any spaces.');
        return;
      }
      if (!isValidUrl(acefoneUrl)) {
        setError('Click To Call API URL must be a valid URL.');
        return;
      }
      if (/\s/.test(acefoneAuth)) {
        setError('Authorization must not contain any spaces.');
        return;
      }

      setError('');
      setLoading(true);
      setConfigData({
        vendor: 'Acefone',
        data: {
          url: acefoneUrl,
          authorization: acefoneAuth,
        },
        agentNumber: agentNumber.trim() || '+919411557979'
      });
      setLoading(false);
      return;
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

  if (appMode === 'guide') {
    return (
      <TelephonyReferenceConsole
        onBackToHome={() => setAppMode('hub')}
        onOpenConfigAgent={() => setAppMode('config')}
      />
    );
  }

  if (appMode === 'hub') {
    return (
      <div className={`min-h-screen flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden font-sans transition-colors duration-200 ${isDark ? 'bg-[#0A0E1A] text-slate-100' : 'bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50/30 text-slate-900'
        }`}>
        {/* Ambient background glow for executive elegance */}
        <div className={`absolute top-[-10%] left-[15%] w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-300 ${isDark ? 'bg-blue-600/10' : 'bg-blue-400/10'
          }`} />
        <div className={`absolute bottom-[-10%] right-[15%] w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-300 ${isDark ? 'bg-teal-500/10' : 'bg-teal-400/10'
          }`} />

        {/* Top Branding */}
        <div className={`max-w-6xl mx-auto w-full flex items-center justify-between pb-6 border-b relative z-10 ${isDark ? 'border-[#222E4E]' : 'border-slate-200'
          }`}>
          <div className="flex items-center space-x-3.5">
            <VaaniLogo size="md" onClick={() => setAppMode('hub')} className="cursor-pointer" />
          </div>

          <div className="flex items-center space-x-3">
            <div className={`hidden sm:flex items-center space-x-2 text-xs px-3.5 py-1.5 rounded-full border ${isDark ? 'bg-[#111728] border-[#222E4E] text-slate-300' : 'bg-white border-slate-200 text-slate-600 shadow-2xs'
              }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All 11+ vendors active</span>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto w-full my-auto py-10 relative z-10 text-center space-y-4">
          <div className="flex justify-center mb-4">
            <VaaniLogo size="lg" onClick={() => setAppMode('hub')} className="cursor-pointer" />
          </div>
          <div className="flex justify-center mb-2">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${isDark ? 'bg-blue-950/70 border-blue-500/40 text-blue-300' : 'bg-blue-50 border-blue-200/80 text-blue-700'
              }`}>
              <span>✦</span>
              <span>Enterprise Telephony Automation &amp; Intelligence Platform</span>
            </div>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight ${isDark ? 'text-white' : 'text-slate-900'
            }`}>
            Telephony Config Agent &amp; Reference Guide
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
            Vaani unifies telephony configuration generation across 11+ cloud vendors with deep architectural guidance, and comprehensive troubleshooting docs.
          </p>

          {/* Two Boxes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 pt-6 max-w-4xl mx-auto text-left">

            {/* Box 1: Config Agent */}
            <div
              onClick={() => setAppMode('config')}
              className={`group relative rounded-3xl p-7 transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden border ${isDark
                ? 'bg-[#111728]/95 hover:bg-[#151D33] border-[#222E4E] hover:border-blue-500/70 shadow-2xl hover:shadow-blue-500/10'
                : 'bg-white hover:bg-slate-50/50 border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-xl'
                }`}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

              <div>
                <div className="mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl group-hover:scale-105 transition-transform border ${isDark ? 'bg-blue-950/80 border-blue-500/40 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'
                    }`}>
                    ⚡
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors ${isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                  Telephony Config Agent
                </h3>
                <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                  Generate visual admin configurations for all supported vendors (TeleCMI, Ozonetel, MCUBE, SmartPing, SR Knowlarity, Tatatel, Acefone &amp; more).
                </p>

                <div className={`space-y-2 border-t pt-4 ${isDark ? 'border-[#1E2942]' : 'border-slate-100'}`}>
                  <div className={`flex items-center text-xs space-x-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="text-blue-500 font-bold">✓</span>
                    <span>11+ Telephony Vendors supported</span>
                  </div>
                  <div className={`flex items-center text-xs space-x-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="text-blue-500 font-bold">✓</span>
                    <span>Interactive visual UI replica with real fields</span>
                  </div>
                  <div className={`flex items-center text-xs space-x-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="text-blue-500 font-bold">✓</span>
                    <span>Demo Agent user config &amp; field mapping</span>
                  </div>
                </div>
              </div>

              <div className="mt-7 pt-2">
                <button
                  className="w-full py-3.5 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg"
                >
                  <span>Launch Config Agent</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>

            {/* Box 2: Telephony Guide */}
            <div
              onClick={() => setAppMode('guide')}
              className={`group relative rounded-3xl p-7 transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden border ${isDark
                ? 'bg-[#111728]/95 hover:bg-[#151D33] border-[#222E4E] hover:border-teal-500/70 shadow-2xl hover:shadow-teal-500/10'
                : 'bg-white hover:bg-slate-50/50 border-slate-200 hover:border-teal-600 shadow-sm hover:shadow-xl'
                }`}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500"></div>

              <div>
                <div className="mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl group-hover:scale-105 transition-transform border ${isDark ? 'bg-teal-950/80 border-teal-500/40 text-teal-400' : 'bg-teal-50 border-teal-100 text-teal-700'
                    }`}>
                    📖
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-2 group-hover:text-teal-500 transition-colors ${isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                  Telephony Guide &amp; Docs
                </h3>
                <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                  Explore comprehensive documentation on Meritto telephony architecture, the 5 integrated APIs, call flows, and 17 case-by-case debugging solutions.
                </p>

                <div className={`space-y-2 border-t pt-4 ${isDark ? 'border-[#1E2942]' : 'border-slate-100'}`}>
                  <div className={`flex items-center text-xs space-x-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="text-teal-500 font-bold">✓</span>
                    <span>17 Case-by-case troubleshooting scenarios</span>
                  </div>
                  <div className={`flex items-center text-xs space-x-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="text-teal-500 font-bold">✓</span>
                    <span>Inbound, Outbound &amp; Campaign call flows</span>
                  </div>
                  <div className={`flex items-center text-xs space-x-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="text-teal-500 font-bold">✓</span>
                    <span>Live search engine across all error codes &amp; vendors</span>
                  </div>
                </div>
              </div>

              <div className="mt-7 pt-2">
                <button
                  className="w-full py-3.5 px-5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg"
                >
                  <span>Open Telephony Guide</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className={`max-w-6xl mx-auto w-full pt-6 border-t text-center text-xs relative z-10 ${isDark ? 'border-[#222E4E] text-slate-500' : 'border-slate-200 text-slate-500'
          }`}>
          Meritto Telephony Suite — Reference Console &amp; Automation Portal
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 sm:p-8 font-sans transition-colors duration-200 ${isDark ? 'bg-[#0A0E1A] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
      }`}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header with Back to Hub button, Guide Switcher & Theme Selector */}
        <div className={`flex items-center justify-between pb-4 border-b ${isDark ? 'border-[#222E4E]' : 'border-slate-200'
          }`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAppMode('hub')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all group ${isDark
                ? 'bg-[#111728] border-[#222E4E] text-slate-300 hover:bg-[#161F38] hover:text-white'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-2xs'
                }`}
            >
              <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
              <span>Back to Main Hub</span>
            </button>
            <div className={`hidden sm:block h-5 w-px ${isDark ? 'bg-[#222E4E]' : 'bg-slate-300'}`} />
            <div className="hidden sm:block">
              <VaaniLogo size="sm" showSubtitle={false} onClick={() => setAppMode('hub')} className="cursor-pointer" />
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className={`hidden sm:inline ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Need telephony documentation or guides?
            </span>
            <button
              onClick={() => setAppMode('guide')}
              className={`px-3.5 py-2 rounded-xl border font-semibold flex items-center gap-1.5 transition-all ${isDark
                ? 'bg-[#111728] border-teal-500/30 text-teal-400 hover:bg-[#161F38]'
                : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                }`}
            >
              <span>Open Reference Guide</span>
              <span>↗</span>
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${isDark ? 'bg-blue-950/70 border-blue-500/40 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Vaani · Automation Engine
          </div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'
            }`}>
            Vaani Config Agent
          </h1>
          <p className={`text-xs sm:text-sm max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
            Select your vendor, provide required API endpoints &amp; tokens, and generate visual admin panel configurations instantly.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Input Section (Left Side) */}
          <div
            id="config-agent-form"
            className={`w-full lg:w-1/3 p-5 sm:p-6 rounded-2xl border space-y-5 flex flex-col transition-all ${isDark
              ? 'bg-[#111728] border-[#222E4E] shadow-2xl shadow-black/40'
              : 'bg-white border-slate-200 shadow-xs'
              }`}
          >
            <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-[#222E4E]' : 'border-slate-200'
              }`}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <h2 className={`text-xs font-bold tracking-wider uppercase font-mono ${isDark ? 'text-slate-200' : 'text-slate-900'
                  }`}>
                  Vendor Credentials
                </h2>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded border ${isDark ? 'text-slate-400 bg-[#161F38] border-[#253254]' : 'text-slate-500 bg-slate-100 border-slate-200'
                }`}>
                Parameters
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold">Select Vendor</label>
              <select
                className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-medium cursor-pointer shadow-2xs"
                value={vendor}
                onChange={(e) => {
                  setVendor(e.target.value);
                  setCurlCommand('');
                  setCampaignDetails('');
                  setKnowlarityUrl('');
                  setKnowlarityKNumber('');
                  setKnowlarityAuth('');
                  setKnowlarityApiKey('');
                  setKnowlarityLiveStreamUrl('');
                  setTatatelUrl('');
                  setTatatelAuth('');
                  setAcefoneUrl('');
                  setAcefoneAuth('');
                  setConfigData(null);
                  setError('');
                }}
              >
                <option value="Telecmi">Telecmi</option>
                <option value="Smartping Sparc">Smartping Sparc</option>
                <option value="SmartPing_CC">SmartPing_CC (Hybrid)</option>
                <option value="Smartping">Smartping (Hardphone)</option>
                <option value="Myoperator">Myoperator</option>
                <option value="Ozonetel">Ozonetel</option>
                <option value="MCUBE Classic">MCUBE Classic (Hardphone)</option>
                <option value="MCUBE 2.0">MCUBE 2.0 (Hybrid)</option>
                <option value="SR Knowlarity">SR Knowlarity</option>
                <option value="Tatatel">Tatatel</option>
                <option value="Acefone">Acefone</option>
                <option value="Other">Other (cURL / Raw)</option>
              </select>
            </div>

            {vendor === 'Telecmi' ? (
              <>
                <div className="space-y-1.5 flex-grow">
                  <label className="block text-xs font-semibold text-slate-700">Click To Call (CTC) API URL</label>
                  <input
                    type="text"
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="https://rest.telecmi.com/v2/external/click2call"
                    value={telecmiUrl}
                    onChange={(e) => setTelecmiUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5 flex-grow">
                  <label className="block text-xs font-semibold text-slate-700">Secret Key</label>
                  <input
                    type="text"
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="Enter Secret Key"
                    value={telecmiSecret}
                    onChange={(e) => setTelecmiSecret(e.target.value)}
                  />
                </div>

              </>
            ) : vendor === 'Smartping Sparc' ? (
              <>
                <div className="space-y-1.5 flex-grow">
                  <label className="block text-xs font-semibold text-slate-700">Click To Call (CTC) API URL</label>
                  <input
                    type="text"
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="https://ccs.sparc.smartping.io/crm-integration/api/v1/phoneBridge/clickToCall"
                    value={sparcUrl}
                    onChange={(e) => setSparcUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5 flex-grow">
                  <label className="block text-xs font-semibold text-slate-700">Authorization Key</label>
                  <input
                    type="text"
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="Enter Authorization Key"
                    value={sparcAuthKey}
                    onChange={(e) => setSparcAuthKey(e.target.value)}
                  />
                </div>
              </>
            ) : vendor === 'SmartPing_CC' ? (
              <>
                <div className="space-y-4 pt-1">
                  <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${smartPingCcConfigType === 'Outbound' ? 'bg-white text-blue-600 shadow-2xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'}`}
                      onClick={() => setSmartPingCcConfigType('Outbound')}
                    >
                      Outbound Configuration
                    </button>
                    <button
                      type="button"
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${smartPingCcConfigType === 'Campaign' ? 'bg-white text-blue-600 shadow-2xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'}`}
                      onClick={() => setSmartPingCcConfigType('Campaign')}
                    >
                      Campaign Dialer
                    </button>
                  </div>

                  {smartPingCcConfigType === 'Outbound' && (
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Click To Call API URL</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="https://testsss.smartpingcc.io/cc/api/v1/clicktocall"
                          value={smartPingCcCtcUrl}
                          onChange={(e) => setSmartPingCcCtcUrl(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Token</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="Enter Token"
                          value={smartPingCcToken}
                          onChange={(e) => setSmartPingCcToken(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Location ID</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="Enter Location ID"
                          value={smartPingCcLocationId}
                          onChange={(e) => setSmartPingCcLocationId(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {smartPingCcConfigType === 'Campaign' && (
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Campaign Dialer URL</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="https://testsss.smartpingcc.io/cc/api/v1/contacts"
                          value={smartPingCcCampaignUrl}
                          onChange={(e) => setSmartPingCcCampaignUrl(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Campaign List (Comma separated for multiple)</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="e.g. uuid-1, uuid-2"
                          value={smartPingCcCampaignList}
                          onChange={(e) => setSmartPingCcCampaignList(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Token</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="Enter Token"
                          value={smartPingCcToken}
                          onChange={(e) => setSmartPingCcToken(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Location ID</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="Enter Location ID"
                          value={smartPingCcLocationId}
                          onChange={(e) => setSmartPingCcLocationId(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Queue Name</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
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
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">Click To Call API</label>
                  <input
                    type="text"
                    value={smartpingCtcUrl}
                    onChange={(e) => setSmartpingCtcUrl(e.target.value)}
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="https://ccs1.smartpingcc.io/v2/clickToCall/para"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">user_id</label>
                  <input
                    type="text"
                    value={smartpingUserId}
                    onChange={(e) => setSmartpingUserId(e.target.value)}
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="24119920"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">token</label>
                  <input
                    type="text"
                    value={smartpingToken}
                    onChange={(e) => setSmartpingToken(e.target.value)}
                    className={`w-full p-2.5 sm:p-3 bg-white border rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs ${hasSpace(smartpingToken) ? 'border-red-500 focus:ring-red-100' : 'border-slate-300'}`}
                    placeholder="8nTBWvEeloCCpPBOC8zB"
                  />
                  {hasSpace(smartpingToken) && (
                    <p className="mt-1 text-xs text-red-600 font-medium">
                      token should not contain any space
                    </p>
                  )}
                </div>
              </>
            ) : vendor === 'Myoperator' ? (
              <>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">Click to Call API</label>
                  <input
                    type="text"
                    value={myoperatorCtcUrl}
                    onChange={(e) => setMyoperatorCtcUrl(e.target.value)}
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="https://obd-api.myoperator.co/obd-api-v1"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">company_id</label>
                  <input
                    type="text"
                    value={myoperatorCompanyId}
                    onChange={(e) => setMyoperatorCompanyId(e.target.value)}
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="652e442d829f386"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">secret_token</label>
                  <input
                    type="text"
                    value={myoperatorSecretToken}
                    onChange={(e) => setMyoperatorSecretToken(e.target.value)}
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="3f73dc57a85dd035..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">type</label>
                  <input
                    type="text"
                    value={myoperatorType}
                    onChange={(e) => setMyoperatorType(e.target.value)}
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="1"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">public_ivr_id</label>
                  <input
                    type="text"
                    value={myoperatorPublicIvrId}
                    onChange={(e) => setMyoperatorPublicIvrId(e.target.value)}
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="659ce435e9563507"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">x-api-key</label>
                  <input
                    type="text"
                    value={myoperatorApiKey}
                    onChange={(e) => setMyoperatorApiKey(e.target.value)}
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="oomfKA3l2K6TCJY..."
                  />
                </div>
              </>
            ) : vendor === 'Ozonetel' ? (
              <>
                <div className="space-y-4 pt-1">
                  <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${ozonetelConfigType === 'Outbound' ? 'bg-white text-blue-600 shadow-2xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'}`}
                      onClick={() => setOzonetelConfigType('Outbound')}
                    >
                      Outbound Configuration
                    </button>
                    <button
                      type="button"
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${ozonetelConfigType === 'Campaign' ? 'bg-white text-blue-600 shadow-2xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'}`}
                      onClick={() => setOzonetelConfigType('Campaign')}
                    >
                      Campaign Dialer
                    </button>
                  </div>

                  {ozonetelConfigType === 'Outbound' && (
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Click To Call API URL</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="https://in1-ccaas-api.ozonetel.com/ca_apis/AgentManualDial"
                          value={ozonetelCtcUrl}
                          onChange={(e) => setOzonetelCtcUrl(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">API Key</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="Enter API Key"
                          value={ozonetelApiKey}
                          onChange={(e) => setOzonetelApiKey(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">User Name</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="e.g. studyiq_career247"
                          value={ozonetelUserName}
                          onChange={(e) => setOzonetelUserName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Agent ID</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="e.g. surya.gupta@adda2"
                          value={ozonetelAgentId}
                          onChange={(e) => setOzonetelAgentId(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Campaign Name</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="e.g. Axis_PBRM_Outbound"
                          value={ozonetelCampaignName}
                          onChange={(e) => setOzonetelCampaignName(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {ozonetelConfigType === 'Campaign' && (
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Campaign Dialer URL</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="e.g. https://in1-ccaas-api.ozonetel.com/cloudAgentRestAPI/index.php/AddCampaignBulkDataV4/..."
                          value={ozonetelCampaignUrl}
                          onChange={(e) => setOzonetelCampaignUrl(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Campaign List</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="e.g. Test_Offline,test-demo,Working-Leads"
                          value={ozonetelCampaignList}
                          onChange={(e) => setOzonetelCampaignList(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">API Key</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="Enter API Key"
                          value={ozonetelApiKey}
                          onChange={(e) => setOzonetelApiKey(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">User Name</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="e.g. npf_universal"
                          value={ozonetelUserName}
                          onChange={(e) => setOzonetelUserName(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : vendor === 'MCUBE Classic' ? (
              <>
                <div className="space-y-3 flex-grow">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">Click To Call API URL</label>
                    <input
                      type="text"
                      className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                      placeholder="e.g. http://mcube.vmc.in/api/outboundcall"
                      value={mcubeCtcUrl}
                      onChange={(e) => setMcubeCtcUrl(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">API Key</label>
                    <input
                      type="text"
                      className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                      placeholder="Enter API Key"
                      value={mcubeApiKey}
                      onChange={(e) => setMcubeApiKey(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : vendor === 'MCUBE 2.0' ? (
              <>
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 mb-2">
                  <button
                    type="button"
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${mcubeTwoConfigType === 'Outbound' ? 'bg-white text-blue-600 shadow-2xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'}`}
                    onClick={() => setMcubeTwoConfigType('Outbound')}
                  >
                    Outbound Config
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${mcubeTwoConfigType === 'Campaign' ? 'bg-white text-blue-600 shadow-2xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'}`}
                    onClick={() => setMcubeTwoConfigType('Campaign')}
                  >
                    Campaign Config
                  </button>
                </div>

                <div className="space-y-3 flex-grow">
                  {mcubeTwoConfigType === 'Outbound' && (
                    <>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Click To Call API URL</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="e.g. http://mcube.vmc.in/api/outboundcall"
                          value={mcubeTwoCtcUrl}
                          onChange={(e) => setMcubeTwoCtcUrl(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Authorization</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="Enter Authorization"
                          value={mcubeTwoAuth}
                          onChange={(e) => setMcubeTwoAuth(e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {mcubeTwoConfigType === 'Campaign' && (
                    <>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Campaign Dialer URL</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="e.g. https://config.mcube.com/Restmcube-api/campaign"
                          value={mcubeTwoCampaignUrl}
                          onChange={(e) => setMcubeTwoCampaignUrl(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Campaign List (id:label, id:label)</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="e.g. 6:Aditya_Autodialer, 8:Chandra_Autodialer"
                          value={mcubeTwoCampaignList}
                          onChange={(e) => setMcubeTwoCampaignList(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Campaign type</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="e.g. 1"
                          value={mcubeTwoCampaignType}
                          onChange={(e) => setMcubeTwoCampaignType(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">Authorization</label>
                        <input
                          type="text"
                          className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                          placeholder="Enter Authorization"
                          value={mcubeTwoAuth}
                          onChange={(e) => setMcubeTwoAuth(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : vendor === 'SR Knowlarity' ? (
              <>
                <div className="space-y-1.5 flex-grow">
                  <label className="block text-xs font-semibold text-slate-700">Click To Call (c2c) API URL <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="https://kpi.knowlarity.com/Basic/v1/account/call/makecall"
                    value={knowlarityUrl}
                    onChange={(e) => setKnowlarityUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5 flex-grow">
                  <label className="block text-xs font-semibold text-slate-700">k_number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="e.g. 18002746969"
                    value={knowlarityKNumber}
                    onChange={(e) => setKnowlarityKNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5 flex-grow">
                  <label className="block text-xs font-semibold text-slate-700">Authorization <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="Enter Authorization token"
                    value={knowlarityAuth}
                    onChange={(e) => setKnowlarityAuth(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5 flex-grow">
                  <label className="block text-xs font-semibold text-slate-700">x-api key <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="Enter x-api key"
                    value={knowlarityApiKey}
                    onChange={(e) => setKnowlarityApiKey(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5 flex-grow">
                  <label className="block text-xs font-semibold text-slate-700">Live Streaming API URL <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="https://konnectprodstream3.knowlarity.com:8200/update-stream/..."
                    value={knowlarityLiveStreamUrl}
                    onChange={(e) => setKnowlarityLiveStreamUrl(e.target.value)}
                  />
                </div>
              </>
            ) : vendor === 'Tatatel' ? (
              <>
                <div className="space-y-1.5 flex-grow">
                  <label className="block text-xs font-semibold text-slate-700">Click To Call (c2c) API URL <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="https://api-smartflo.tatateleservices.com/v1/click_to_call"
                    value={tatatelUrl}
                    onChange={(e) => setTatatelUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5 flex-grow">
                  <label className="block text-xs font-semibold text-slate-700">Authorization <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="Enter Authorization token"
                    value={tatatelAuth}
                    onChange={(e) => setTatatelAuth(e.target.value)}
                  />
                </div>
              </>
            ) : vendor === 'Acefone' ? (
              <>
                <div className="space-y-1.5 flex-grow">
                  <label className="block text-xs font-semibold text-slate-700">Click To Call (c2c) API URL <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="https://api.acefone.in/v1/click_to_call"
                    value={acefoneUrl}
                    onChange={(e) => setAcefoneUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5 flex-grow">
                  <label className="block text-xs font-semibold text-slate-700">Authorization <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                    placeholder="Enter Authorization token"
                    value={acefoneAuth}
                    onChange={(e) => setAcefoneAuth(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <div className="space-y-1.5 flex-grow">
                <label className="block text-xs font-semibold text-slate-700">cURL Command</label>
                <textarea
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl font-mono text-xs text-slate-900 placeholder-slate-400 h-48 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-2xs"
                  placeholder="curl --location 'https://rest.telecmi.com/v2/external/click2call' ..."
                  value={curlCommand}
                  onChange={(e) => setCurlCommand(e.target.value)}
                />
              </div>
            )}

            {vendor === 'Other' && (
              <div className="space-y-1.5 flex-grow">
                <label className="block text-xs font-semibold text-slate-700">Campaign Details</label>
                <textarea
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl font-mono text-xs text-slate-900 placeholder-slate-400 h-32 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-2xs"
                  placeholder={"Campaign Dialer URL- ...\nCall List ID- ...\nLocation ID- ...\nToken ID- ...\nqueue_name- ..."}
                  value={campaignDetails}
                  onChange={(e) => setCampaignDetails(e.target.value)}
                />
              </div>
            )}

            {vendor === 'Myoperator' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Sample User ID
                </label>
                <input
                  type="text"
                  className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                  placeholder="e.g. 684fd9dc6100c268"
                  value={myoperatorUserId}
                  onChange={(e) => setMyoperatorUserId(e.target.value)}
                />
              </div>
            )}

            {vendor !== 'Ozonetel' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  {vendor === 'Smartping' ? 'Sample Agent ID' : 'Sample Agent Number'}
                </label>
                <input
                  type="text"
                  className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                  placeholder={
                    vendor === 'Smartping'
                      ? 'e.g. 24615'
                      : vendor === 'Acefone'
                        ? 'e.g. +919411557979'
                        : 'e.g. 9684707548'
                  }
                  value={agentNumber}
                  onChange={(e) => setAgentNumber(e.target.value)}
                />
              </div>
            )}

            {vendor === 'Smartping Sparc' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">Sample Display Number</label>
                <input
                  type="text"
                  className="w-full p-2.5 sm:p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-xs font-mono shadow-2xs"
                  placeholder="e.g. 911725629685"
                  value={displayNumber}
                  onChange={(e) => setDisplayNumber(e.target.value)}
                />
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex justify-center items-center gap-2 text-xs tracking-wider uppercase cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing Configuration...</span>
                </>
              ) : (
                <>
                  <span>Generate Visual Config</span>
                  <span>⚡</span>
                </>
              )}
            </button>

            {error && (
              <div className={`p-3.5 rounded-xl text-xs font-medium flex items-start gap-2 border ${isDark ? 'bg-red-950/40 border-red-500/40 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                <span className="text-sm">⚠️</span>
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Output Section (Right Side) */}
          <div className={`w-full lg:w-2/3 rounded-2xl border flex flex-col overflow-hidden transition-all ${isDark
            ? 'bg-[#111728] border-[#222E4E] shadow-2xl shadow-black/40'
            : 'bg-white border-slate-200 shadow-sm'
            }`}>
            <div className={`px-4 sm:px-5 py-3.5 border-b flex flex-wrap items-center justify-between gap-3 ${isDark ? 'border-[#222E4E] bg-[#0E1424]' : 'border-slate-200 bg-slate-50/80'
              }`}>
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0"></span>
                    <h2 className={`text-sm font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Visual Admin Configuration
                    </h2>
                  </div>
                  <p className={`text-xs mt-0.5 truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Live Meritto admin portal simulation — configure your settings exactly as shown.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-md border ${isDark ? 'bg-[#161F38] border-[#253254] text-cyan-300' : 'bg-white border-slate-200 text-slate-600 shadow-2xs'
                  }`}>
                  <span className="text-[10px] opacity-70">🔒</span>
                  <span>meritto://admin/{vendor.toLowerCase().replace(/\s+/g, '-')}</span>
                </span>
                <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${isDark ? 'bg-blue-950/80 border-blue-500/40 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-700'
                  }`}>
                  Portal Preview
                </span>
              </div>
            </div>

            <div className={`flex-1 overflow-auto p-4 sm:p-6 relative rounded-b-2xl min-h-[550px] transition-colors ${isDark ? 'bg-[#070B14]' : 'bg-slate-100/70'
              }`}>
              {configData ? (
                <div
                  id="admin-portal-simulation"
                  className={`rounded-xl overflow-hidden transition-all ${isDark ? 'shadow-2xl border border-[#222E4E]' : 'shadow-md border border-slate-200'
                    }`}
                >
                  {configData.vendor === 'Telecmi' ? (
                    <TelecmiConfigView
                      secret={configData.data.secret}
                      agentNumber={configData.agentNumber}
                      url={configData.data.url}
                    />
                  ) : configData.vendor === 'Smartping Sparc' ? (
                    <SmartpingSparcConfigView authorization={configData.data.authorization} agentNumber={configData.agentNumber} displayNumber={configData.displayNumber} url={configData.data.url} />
                  ) : configData.vendor === 'Smartping' ? (
                    <SmartpingConfigView configData={configData.data} agentNumber={configData.agentNumber} />
                  ) : configData.vendor === 'Myoperator' ? (
                    <MyoperatorConfigView configData={configData.data} agentNumber={configData.agentNumber} userId={configData.userId} />
                  ) : configData.vendor === 'SmartPing_CC' ? (
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
                  ) : configData.vendor === 'Ozonetel' ? (
                    <OzonetelConfigView configData={configData.data} />
                  ) : configData.vendor === 'MCUBE Classic' ? (
                    <McubeConfigView configData={configData.data} agentNumber={configData.agentNumber} />
                  ) : configData.vendor === 'MCUBE 2.0' ? (
                    <McubeTwoConfigView configData={configData.data} agentNumber={configData.agentNumber} />
                  ) : configData.vendor === 'SR Knowlarity' ? (
                    <SrKnowlarityConfigView
                      url={configData.data.url}
                      kNumber={configData.data.kNumber}
                      authorization={configData.data.authorization}
                      apiKey={configData.data.apiKey}
                      streamingAuthKey={configData.data.streamingAuthKey}
                      liveStreamingUrl={configData.data.liveStreamingUrl}
                      agentNumber={configData.agentNumber}
                    />
                  ) : configData.vendor === 'Tatatel' ? (
                    <TatatelConfigView
                      url={configData.data.url}
                      authorization={configData.data.authorization}
                      agentNumber={configData.agentNumber}
                    />
                  ) : configData.vendor === 'Acefone' ? (
                    <AcefoneConfigView
                      url={configData.data.url}
                      authorization={configData.data.authorization}
                      agentNumber={configData.agentNumber}
                    />
                  ) : null}
                </div>
              ) : (
                <div className="h-full min-h-[450px] flex flex-col items-center justify-center text-center space-y-4 py-16">
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-2xs ${isDark ? 'bg-[#111728] border-[#222E4E] text-slate-400' : 'bg-white border-slate-200 text-slate-400'
                    }`}>
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3 className={`text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      No Visual Configuration Generated Yet
                    </h3>
                    <p className={`text-xs max-w-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Select a vendor and provide credentials on the left, then click <span className="text-blue-500 font-medium">&quot;Generate Visual Config&quot;</span> to render the Meritto setup preview.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className={`pt-6 border-t text-center text-xs flex items-center justify-center gap-2 ${isDark ? 'border-[#222E4E] text-slate-500' : 'border-slate-200 text-slate-500'
          }`}>
          <span>Vaani — Telephony Integration Hub</span>
          <span>•</span>
          <span>Meritto Internal Telephony Suite</span>
        </div>
      </div>
    </div>
  );
}
