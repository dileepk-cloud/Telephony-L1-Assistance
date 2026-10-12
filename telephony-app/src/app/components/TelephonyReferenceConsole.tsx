'use client';

import React, { useState } from 'react';
import '../reference-console.css';
import { TELEPHONY_KNOWLEDGE_INDEX, TelephonySearchItem } from '../data/telephonyKnowledgeBase';
import { useTheme, ThemeToggle } from './ThemeContext';
import VaaniLogo from './VaaniLogo';

interface TelephonyReferenceConsoleProps {
  onBackToHome?: () => void;
  onOpenConfigAgent?: () => void;
  onBackToGenerator?: () => void;
}

export default function TelephonyReferenceConsole({ 
  onBackToHome,
  onOpenConfigAgent,
  onBackToGenerator 
}: TelephonyReferenceConsoleProps) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredResults = TELEPHONY_KNOWLEDGE_INDEX.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      (item.fixOrAction && item.fixOrAction.toLowerCase().includes(q)) ||
      item.keywords.some((k) => k.toLowerCase().includes(q)) ||
      (item.details && item.details.some((d) => d.toLowerCase().includes(q)));
    return matchesCategory && matchesQuery;
  });

  const tabs = [
    { id: 'overview', label: 'Overview', group: 'General', accent: 'acc-teal' },
    { id: 'troubleshooting', label: 'Troubleshooting', group: 'General', accent: 'acc-teal' },
    { id: 'ozonetel', label: 'Ozonetel', tag: 'C2C', group: 'Vendors', accent: 'acc-amber' },
    { id: 'ozonetel-campaign', label: 'Ozonetel', tag: 'CAMPAIGN', group: 'Vendors', accent: 'acc-amber' },
    { id: 'mcube', label: 'MCUBE', tag: 'SOFTPHONE', group: 'Vendors', accent: 'acc-violet' },
    { id: 'smartping-hard', label: 'SmartPing', tag: 'HARD', group: 'Vendors', accent: 'acc-rose' },
    { id: 'smartping-campaign', label: 'SmartPing', tag: 'CAMPAIGN', group: 'Vendors', accent: 'acc-rose' },
    { id: 'knowlarity', label: 'Knowlarity', tag: 'NEW', group: 'Vendors', accent: 'acc-sky' },
    { id: 'telecmi', label: 'TeleCMI', group: 'Vendors', accent: 'acc-leaf' },
    { id: 'myoperator', label: 'MyOperator', group: 'Vendors', accent: 'acc-coral' },
    { id: 'tatatel', label: 'Tatatel', tag: 'SMARTFLO', group: 'Vendors', accent: 'acc-sky' },
    { id: 'acefone', label: 'Acefone', tag: 'C2C', group: 'Vendors', accent: 'acc-teal' },
  ];

  return (
    <div className={`ref-console-wrapper theme-${theme}`} data-theme={theme}>
      {/* Mobile Tabbar */}
      <div className="ref-mobile-tabbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'active' : ''}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label} {tab.tag ? `(${tab.tag})` : ''}
          </button>
        ))}
      </div>

      <div className="ref-console-app">
        {/* Sidebar */}
        <nav className="ref-sidebar">
          <div className="ref-brand">
            <div
              className="mb-2 cursor-pointer transition-transform hover:scale-105 active:scale-95 inline-block"
              onClick={onBackToHome || onBackToGenerator}
              title="Return to Main Hub"
            >
              <VaaniLogo size="sm" showSubtitle={false} onClick={onBackToHome || onBackToGenerator} />
            </div>
            <div className="ref-brand-sub">Telephony Reference &amp; Docs</div>
            <div className="flex flex-col gap-2 mt-4">
              {(onBackToHome || onBackToGenerator) && (
                <button
                  onClick={onBackToHome || onBackToGenerator}
                  className="w-full py-2.5 px-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 active:scale-[0.98] border border-blue-400/40 group"
                  title="Return to Main Hub"
                >
                  <span className="text-sm group-hover:-translate-x-0.5 transition-transform">←</span>
                  <span>Back to Main Hub</span>
                </button>
              )}
              {onOpenConfigAgent && (
                <button
                  onClick={onOpenConfigAgent}
                  className="w-full py-2 px-3 bg-[var(--ref-card-hi)] hover:bg-[var(--ref-card)] border border-[var(--ref-border)] text-[var(--ref-text)] hover:text-blue-500 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>⚡</span> Launch Config Agent
                </button>
              )}
            </div>
          </div>

          <div className="ref-nav-group-label">General</div>
          <button
            className={`ref-tab-btn acc-teal ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="ref-tab-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
            </span>
            Overview
          </button>

          <button
            className={`ref-tab-btn acc-teal ${activeTab === 'troubleshooting' ? 'active' : ''}`}
            onClick={() => setActiveTab('troubleshooting')}
          >
            <span className="ref-tab-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
                <path d="M12 8v5" />
                <circle cx="12" cy="16" r="0.6" fill="currentColor" />
              </svg>
            </span>
            Troubleshooting
          </button>

          <div className="ref-nav-group-label">Vendors</div>
          <button
            className={`ref-tab-btn acc-amber ${activeTab === 'ozonetel' ? 'active' : ''}`}
            onClick={() => setActiveTab('ozonetel')}
          >
            <span className="ref-tab-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4l4 8-2 2a12 12 0 008 8l2-2 8 4" />
              </svg>
            </span>
            Ozonetel<span className="ref-vendor-tag">C2C</span>
          </button>

          <button
            className={`ref-tab-btn acc-amber ${activeTab === 'ozonetel-campaign' ? 'active' : ''}`}
            onClick={() => setActiveTab('ozonetel-campaign')}
          >
            <span className="ref-tab-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 11a8 8 0 0116 0" />
                <path d="M7 11a5 5 0 0110 0" />
                <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </span>
            Ozonetel<span className="ref-vendor-tag">CAMPAIGN</span>
          </button>

          <button
            className={`ref-tab-btn acc-violet ${activeTab === 'mcube' ? 'active' : ''}`}
            onClick={() => setActiveTab('mcube')}
          >
            <span className="ref-tab-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="3" width="14" height="18" rx="2" />
                <path d="M9 7h6M9 17h.01" />
              </svg>
            </span>
            MCUBE<span className="ref-vendor-tag">SOFTPHONE</span>
          </button>

          <button
            className={`ref-tab-btn acc-rose ${activeTab === 'smartping-hard' ? 'active' : ''}`}
            onClick={() => setActiveTab('smartping-hard')}
          >
            <span className="ref-tab-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9V7a2 2 0 012-2h8a2 2 0 012 2v2" />
                <rect x="4" y="9" width="16" height="11" rx="2" />
              </svg>
            </span>
            SmartPing<span className="ref-vendor-tag">HARD</span>
          </button>

          <button
            className={`ref-tab-btn acc-rose ${activeTab === 'smartping-campaign' ? 'active' : ''}`}
            onClick={() => setActiveTab('smartping-campaign')}
          >
            <span className="ref-tab-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 11a8 8 0 0116 0" />
                <path d="M7 11a5 5 0 0110 0" />
                <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </span>
            SmartPing<span className="ref-vendor-tag">CAMPAIGN</span>
          </button>

          <button
            className={`ref-tab-btn acc-sky ${activeTab === 'knowlarity' ? 'active' : ''}`}
            onClick={() => setActiveTab('knowlarity')}
          >
            <span className="ref-tab-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0122 16.92z" />
              </svg>
            </span>
            Knowlarity<span className="ref-vendor-tag">NEW</span>
          </button>

          <button
            className={`ref-tab-btn acc-leaf ${activeTab === 'telecmi' ? 'active' : ''}`}
            onClick={() => setActiveTab('telecmi')}
          >
            <span className="ref-tab-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <path d="M9 18h6M8 6h8M8 10h8" />
              </svg>
            </span>
            TeleCMI
          </button>

          <button
            className={`ref-tab-btn acc-coral ${activeTab === 'myoperator' ? 'active' : ''}`}
            onClick={() => setActiveTab('myoperator')}
          >
            <span className="ref-tab-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4l4 8-2 2a12 12 0 008 8l2-2 8 4" />
                <circle cx="18" cy="6" r="2" />
              </svg>
            </span>
            MyOperator
          </button>

          <button
            className={`ref-tab-btn acc-sky ${activeTab === 'tatatel' ? 'active' : ''}`}
            onClick={() => setActiveTab('tatatel')}
          >
            <span className="ref-tab-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0122 16.92z" />
              </svg>
            </span>
            Tatatel<span className="ref-vendor-tag">SMARTFLO</span>
          </button>

          <button
            className={`ref-tab-btn acc-teal ${activeTab === 'acefone' ? 'active' : ''}`}
            onClick={() => setActiveTab('acefone')}
          >
            <span className="ref-tab-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            Acefone<span className="ref-vendor-tag">C2C</span>
          </button>
        </nav>

        {/* Main Content */}
        <main className="ref-main">
          {/* Top Header with Breadcrumbs & Theme Switcher */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--ref-border)]">
            <div className="flex items-center gap-2 text-xs text-[var(--ref-text-dim)]">
              <span
                onClick={onBackToHome || onBackToGenerator}
                className="font-semibold text-[var(--ref-text)] hover:text-blue-500 cursor-pointer transition-colors"
                title="Return to Main Hub"
              >
                VAANI
              </span>
              <span>/</span>
              <span>Docs</span>
              <span>/</span>
              <span className="capitalize">{activeTab.replace('-', ' ')}</span>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </div>

          {/* Universal Telephony Search Header */}
          <div className="mb-8 pb-6 border-b border-[var(--ref-border)]">
            <div className="relative flex items-center">
              <span className="absolute left-4 text-[var(--ref-text-faint)] pointer-events-none text-base">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any query, error code, case or vendor (e.g., 503, Case 3, recording, NDNC, pop-up, DID)..."
                className="w-full bg-[var(--ref-card)] border border-[var(--ref-border)] focus:border-blue-500 rounded-2xl py-3.5 pl-12 pr-24 text-sm text-[var(--ref-text)] placeholder-[var(--ref-text-faint)] outline-none shadow-sm focus:ring-2 focus:ring-blue-500/20 transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-semibold px-2.5 py-1 bg-[var(--ref-card-hi)] hover:opacity-80 text-[var(--ref-text)] rounded-lg transition-colors border border-[var(--ref-border)]"
                >
                  Clear ✕
                </button>
              )}
            </div>

            {/* Quick Topic Chips */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
              <span className="text-[var(--ref-text-faint)] font-medium mr-1">Popular searches:</span>
              {[
                'Error 503',
                'Case 3 (IVR timeline)',
                'NDNC',
                'Recording missing',
                'Popup not appearing',
                'Sticky Agent',
                'BRIDGE event',
                'Virtual Numbers (DID)',
              ].map((queryText) => (
                <button
                  key={queryText}
                  onClick={() => setSearchQuery(queryText)}
                  className="px-2.5 py-1 rounded-full bg-[var(--ref-card)] hover:bg-[var(--ref-card-hi)] border border-[var(--ref-border)] text-[var(--ref-text-dim)] hover:text-[var(--ref-text)] transition-all text-[11px] shadow-2xs"
                >
                  {queryText}
                </button>
              ))}
            </div>
          </div>

          {searchQuery.trim() ? (
            /* Search Results View */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--ref-border)]">
                <div>
                  <h2 className="text-xl font-bold text-[var(--ref-text)] flex items-center gap-2">
                    Search Results
                    <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-500 border border-blue-500/30">
                      {filteredResults.length} found
                    </span>
                  </h2>
                  <p className="text-xs text-[var(--ref-text-dim)] mt-0.5">
                    Showing matches for &quot;<strong>{searchQuery}</strong>&quot;
                  </p>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {['All', 'Troubleshooting Case', 'Error Message', 'Checklist', 'API & Architecture', 'Vendor Guide'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-blue-600 text-white font-semibold shadow-xs'
                          : 'bg-[var(--ref-card)] text-[var(--ref-text-dim)] hover:bg-[var(--ref-card-hi)] border border-[var(--ref-border)]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredResults.length === 0 ? (
                <div className="py-16 text-center bg-[var(--ref-card)] border border-[var(--ref-border)] rounded-2xl p-8 space-y-3 shadow-xs">
                  <div className="text-4xl">🔍</div>
                  <h3 className="text-lg font-bold text-[var(--ref-text)]">No direct matches found</h3>
                  <p className="text-sm text-[var(--ref-text-dim)] max-w-md mx-auto">
                    We couldn&apos;t find any articles matching &quot;{searchQuery}&quot;. Try searching for &quot;503&quot;, &quot;Case 1&quot;, &quot;popup&quot;, &quot;recording&quot;, &quot;counsellor&quot;, or select one of the popular search chips above.
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-2 px-4 py-2 bg-[var(--ref-card-hi)] hover:opacity-80 text-[var(--ref-text)] rounded-xl text-xs font-medium transition-colors border border-[var(--ref-border)]"
                  >
                    View All Documentation
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredResults.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[var(--ref-card)] border border-[var(--ref-border)] hover:border-blue-500 rounded-2xl p-5 transition-all space-y-3 shadow-xs"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border ${
                              item.category === 'Troubleshooting Case'
                                ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                                : item.category === 'Error Message'
                                ? 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30'
                                : item.category === 'Checklist'
                                ? 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30'
                                : item.category === 'API & Architecture'
                                ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30'
                                : 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
                            }`}
                          >
                            {item.category}
                          </span>
                          <span className="text-xs text-[var(--ref-text-faint)]">in {item.tabLabel}</span>
                        </div>

                        <button
                          onClick={() => {
                            setActiveTab(item.tabId);
                            setSearchQuery('');
                          }}
                          className="text-xs text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1 shrink-0"
                        >
                          <span>Open full section</span>
                          <span>→</span>
                        </button>
                      </div>

                      <h3 className="text-base font-bold text-[var(--ref-text)] tracking-tight">
                        {item.title}
                      </h3>

                      <p className="text-xs text-[var(--ref-text-dim)] leading-relaxed">
                        {item.summary}
                      </p>

                      {item.details && item.details.length > 0 && (
                        <div className="bg-[var(--ref-card-hi)] rounded-xl p-3 border border-[var(--ref-border)]">
                          <span className="text-[11px] font-semibold text-[var(--ref-text)] block mb-1.5">Verification Checklist:</span>
                          <ul className="text-xs text-[var(--ref-text-dim)] space-y-1 list-disc pl-4">
                            {item.details.map((d, idx) => (
                              <li key={idx}>{d}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.fixOrAction && (
                        <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Fix:</span>
                          <span>{item.fixOrAction}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* ============ OVERVIEW ============ */}
              {activeTab === 'overview' && (
            <section>
              <div className="ref-eyebrow" style={{ color: 'var(--ref-teal)' }}>01 · GENERAL</div>
              <h1 className="ref-page-title">Telephony — Overview</h1>
              <div className="ref-title-rule" style={{ background: 'var(--ref-teal)' }}></div>
              <p className="ref-page-desc">
                How calling works inside Meritto CRM, the APIs every vendor plugs into, what filters/reporting the module unlocks, and the limits that hold true no matter which vendor you&apos;re on.
              </p>

              <h2 className="ref-section-title">
                <span className="ref-dot" style={{ background: 'var(--ref-teal)' }}></span>Core concepts
              </h2>
              <table className="compact">
                <thead>
                  <tr><th>Term</th><th>Meaning</th></tr>
                </thead>
                <tbody>
                  <tr><td className="key-col">Inbound Call</td><td>Call initiated by a lead to a counselor</td></tr>
                  <tr><td className="key-col">Outbound Call</td><td>Call initiated by a counselor to a lead (Click-to-Call)</td></tr>
                  <tr><td className="key-col">Campaign Call</td><td>Automated outbound call to a targeted lead list — no manual dialing</td></tr>
                  <tr><td className="key-col">Progressive Dialing</td><td>Connects to the counselor first, then dials the lead</td></tr>
                  <tr><td className="key-col">Predictive Dialing</td><td>Connects to the lead first, then routes to an available counselor</td></tr>
                  <tr><td className="key-col">In-App Calling</td><td>Calls placed via the Meritto Mobile App — no telephony vendor required</td></tr>
                  <tr><td className="key-col">Hardphone / Softphone</td><td>Physical device vs. web-based dialer (WebRTC embedded, or browser pop-up)</td></tr>
                  <tr><td className="key-col">Multi-Vendor Telephony</td><td>Multiple vendors configured for different call flows, for failover or load distribution</td></tr>
                </tbody>
              </table>

              <h2 className="ref-section-title">
                <span className="ref-dot" style={{ background: 'var(--ref-teal)' }}></span>Call flows at a glance
              </h2>
              <h3 className="ref-sub-title">Inbound</h3>
              <div className="ref-flow-diagram">
                <div className="ref-flow-box"><div className="ref-fb-label">01</div><div className="ref-fb-title">Lead dials DID</div></div>
                <div className="ref-flow-arrow">→</div>
                <div className="ref-flow-box"><div className="ref-fb-label">02</div><div className="ref-fb-title">Vendor routes via Get Counselor API</div></div>
                <div className="ref-flow-arrow">→</div>
                <div className="ref-flow-box"><div className="ref-fb-label">03</div><div className="ref-fb-title">Pop-up fires on counselor screen</div></div>
                <div className="ref-flow-arrow">→</div>
                <div className="ref-flow-box"><div className="ref-fb-label">04</div><div className="ref-fb-title">Call Log API logs outcome</div></div>
              </div>

              <h3 className="ref-sub-title">Outbound</h3>
              <div className="ref-flow-diagram">
                <div className="ref-flow-box"><div className="ref-fb-label">01</div><div className="ref-fb-title">Counselor clicks Call</div></div>
                <div className="ref-flow-arrow">→</div>
                <div className="ref-flow-box"><div className="ref-fb-label">02</div><div className="ref-fb-title">Click-to-Call API dials lead</div></div>
                <div className="ref-flow-arrow">→</div>
                <div className="ref-flow-box"><div className="ref-fb-label">03</div><div className="ref-fb-title">Vendor connects the call</div></div>
                <div className="ref-flow-arrow">→</div>
                <div className="ref-flow-box"><div className="ref-fb-label">04</div><div className="ref-fb-title">Call Log API logs outcome</div></div>
              </div>

              <h3 className="ref-sub-title">Campaign</h3>
              <div className="ref-flow-diagram">
                <div className="ref-flow-box"><div className="ref-fb-label">01</div><div className="ref-fb-title">Filtered leads pushed to campaign</div></div>
                <div className="ref-flow-arrow">→</div>
                <div className="ref-flow-box"><div className="ref-fb-label">02</div><div className="ref-fb-title">Vendor auto-dials the list</div></div>
                <div className="ref-flow-arrow">→</div>
                <div className="ref-flow-box"><div className="ref-fb-label">03</div><div className="ref-fb-title">Connected call → pop-up to agent</div></div>
                <div className="ref-flow-arrow">→</div>
                <div className="ref-flow-box"><div className="ref-fb-label">04</div><div className="ref-fb-title">Call Log API logs outcome</div></div>
              </div>

              <h2 className="ref-section-title">
                <span className="ref-dot" style={{ background: 'var(--ref-teal)' }}></span>The five APIs every vendor integrates
              </h2>
              <div className="ref-grid-2">
                <div className="ref-api-card">
                  <span className="ref-api-name">Get Counselor / Call Routing API</span>
                  <p>Tells the vendor which counselor owns a lead — powers &quot;sticky agent&quot; routing. Optional.</p>
                </div>
                <div className="ref-api-card">
                  <span className="ref-api-name">Call Notification / Pop-Up API</span>
                  <p>Triggers the on-screen pop-up with lead details the moment a call is routed to a counselor.</p>
                </div>
                <div className="ref-api-card">
                  <span className="ref-api-name">Call Log / Callback Details API</span>
                  <p>Vendor pushes outcome, duration, and recording once the call ends.</p>
                </div>
                <div className="ref-api-card">
                  <span className="ref-api-name">Click-to-Call (Outbound) API</span>
                  <p>Meritto tells the vendor to dial the lead when a counselor clicks Call.</p>
                </div>
                <div className="ref-api-card">
                  <span className="ref-api-name">Campaign Notification / Callback API</span>
                  <p>Same pop-up + logging pattern, applied to auto-dialed campaign calls.</p>
                </div>
              </div>

              <h2 className="ref-section-title">
                <span className="ref-dot" style={{ background: 'var(--ref-teal)' }}></span>Filters &amp; reporting
              </h2>
              <h3 className="ref-sub-title">Virtual Numbers → what filtering unlocks</h3>
              <p>Configuring <strong>Virtual Numbers (DID) + Aliases</strong> per vendor <span className="mono">(Extensions → Telephony → Vendor → Virtual Numbers)</span> makes the DID/alias filterable across:</p>
              <ul>
                <li>Activity Timeline</li>
                <li>Lead Manager filters</li>
                <li>Opportunity Manager filters</li>
                <li>Workflow / Marketing Automation rules</li>
                <li>Primary Registration Campaign mapping (alias becomes the campaign name for telephony-sourced leads)</li>
              </ul>
              <div className="ref-callout can">
                <div className="ref-callout-title">✓ Works even without DID selection</div>
                <p>This works regardless of whether the vendor supports choosing a DID on outbound — as long as the vendor sends the virtual number back in the callback payload, and it exactly matches what&apos;s configured in Meritto.</p>
              </div>
              <div className="ref-callout note">
                <div className="ref-callout-title">Optional — DID Selection for Click-to-Call</div>
                <p>If the vendor&apos;s outbound API can accept a DID/campaign identifier, agents can be prompted to pick a Virtual Number before placing a call. Requires: Virtual Numbers already configured → Outbound C2C already working → vendor&apos;s API confirmed to accept a DID parameter → &quot;Enable Virtual Number Filtering&quot; toggle on, with the payload key mapped (e.g. <code>did_no</code>) → optionally assign specific numbers per user in User Config.</p>
              </div>

              <h3 className="ref-sub-title">Telephony Report Builder filters</h3>
              <ul>
                <li>Any <strong>Lead or Telephony field</strong> can be used as a Metric, Row/Column, or Filter</li>
                <li>Max <strong>3 fields in Rows</strong> and <strong>3 fields in Columns</strong> at once</li>
                <li>Custom metrics are built and filtered the same way as any other report type</li>
              </ul>

              <h2 className="ref-section-title">
                <span className="ref-dot" style={{ background: 'var(--ref-teal)' }}></span>Multi-vendor telephony
              </h2>
              <table className="compact">
                <tbody>
                  <tr><td className="key-col" style={{ width: '160px' }}>What it does</td><td>Assign different vendors to different call flows (Inbound / Outbound / Campaign) — including multiple vendors on the <em>same</em> flow</td></tr>
                  <tr><td className="key-col">Use it when</td><td>You need vendor failover, region-specific vendors for cost, different vendors per campaign, or specialized teams on different vendors</td></tr>
                  <tr><td className="key-col">Failover</td><td>If one vendor is down, calls can reroute to an alternate configured vendor</td></tr>
                </tbody>
              </table>
              <div className="ref-callout cant">
                <div className="ref-callout-title">✕ Single-vendor limit</div>
                <p>A single-vendor setup allows only <strong>one vendor per flow</strong>. Running more than one vendor concurrently on the same flow requires Multi-Vendor to be explicitly configured.</p>
              </div>

              <h2 className="ref-section-title">
                <span className="ref-dot" style={{ background: 'var(--ref-teal)' }}></span>Cross-vendor limitations
              </h2>
              <div className="ref-callout cant">
                <div className="ref-callout-title">✕ What Meritto telephony cannot do</div>
                <ul>
                  <li>Calls are <strong>executed and routed entirely by the vendor</strong> — Meritto tracks, logs, and notifies; it doesn&apos;t control the actual call leg.</li>
                  <li>If the vendor doesn&apos;t send correctly-formatted <code>counsellorId</code>/<code>userId</code>, the productivity report, timeline, and pop-up cannot populate — this is fully vendor-dependent.</li>
                  <li>A missed call only counts in Lead Manager if it was missed by the <strong>counselor</strong> — an inbound call the lead itself never answers isn&apos;t logged the same way.</li>
                  <li>Multi-account lead timelines (same number under Primary/Alternate/Dynamic) only sync on <strong>New Telephony Configuration</strong> — Old Configuration doesn&apos;t support this.</li>
                  <li>DID Selection on outbound only works if the <strong>vendor&apos;s own API</strong> accepts a DID parameter — Meritto can&apos;t force it.</li>
                  <li>Virtual Number filtering breaks (Alias = &quot;NA&quot;) if the vendor&apos;s callback value doesn&apos;t <strong>exactly match</strong> what&apos;s configured.</li>
                  <li>Sticky-agent routing is optional and vendor-implemented — if a vendor skips it, their own fallback logic (round robin, priority, etc.) takes over.</li>
                  <li>Duplicate callbacks for the same call: Meritto only processes the <strong>first one received</strong> — a wrong first callback can leave an incorrect &quot;missed&quot; status even if the call later connects.</li>
                </ul>
              </div>
            </section>
          )}

          {/* ============ TROUBLESHOOTING ============ */}
          {activeTab === 'troubleshooting' && (
            <section>
              <div className="ref-eyebrow" style={{ color: 'var(--ref-teal)' }}>02 · GENERAL</div>
              <h1 className="ref-page-title">Troubleshooting</h1>
              <div className="ref-title-rule" style={{ background: 'var(--ref-teal)' }}></div>
              <p className="ref-page-desc">
                Quick checklist for icon/pop-up/recording issues, the full case-by-case debugging list, and known error messages with fixes.
              </p>

              <div className="ref-grid-3" style={{ margin: '22px 0 6px 0' }}>
                <div className="ref-stat-card"><div className="ref-stat-num" style={{ color: 'var(--ref-teal)' }}>6</div><div className="ref-stat-label">Quick-checklist symptoms</div></div>
                <div className="ref-stat-card"><div className="ref-stat-num" style={{ color: 'var(--ref-amber)' }}>17</div><div className="ref-stat-label">Detailed debugging cases</div></div>
                <div className="ref-stat-card"><div className="ref-stat-num" style={{ color: 'var(--ref-red)' }}>8</div><div className="ref-stat-label">Known error messages</div></div>
              </div>

              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-teal)' }}></span>Quick checklist</h2>
              <table>
                <thead>
                  <tr><th style={{ width: '230px' }}>Symptom</th><th>Checklist</th></tr>
                </thead>
                <tbody>
                  <tr><td className="key-col">Click-to-Call icon not visible</td><td>Verify the user&apos;s telephony config is set up correctly (new vs. old config screens differ). Confirm the user has the correct permission template for Click-to-Call.</td></tr>
                  <tr><td className="key-col">Outbound call recording missing</td><td>Confirm the callback details request was received from the vendor. Check <code>counsellorId</code> and <code>userId</code> exist in processedData.</td></tr>
                  <tr><td className="key-col">Missed call icon not visible</td><td>Confirm the user has the permission template for the missed-call feature.</td></tr>
                  <tr><td className="key-col">Call notification not visible</td><td>Confirm the callback notification request was received. Check <code>counsellorId</code>/<code>userId</code> in processedData.</td></tr>
                  <tr><td className="key-col">Inbound recording missing</td><td>Confirm call notification received, then callback details received. Check <code>counsellorId</code>/<code>userId</code> in processedData.</td></tr>
                  <tr><td className="key-col">Call log parameters missing entirely</td><td>If <code>counsellorId</code>/<code>userId</code> exist but issues persist, check for an &quot;exists&quot; column in the Callback Details API — if present, the vendor must send a unique call ID per call (naming convention varies by vendor).</td></tr>
                </tbody>
              </table>

              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-amber)' }}></span>Case-by-case debugging (17 cases)</h2>
              <div className="ref-case-item"><span className="ref-case-num">CASE 1</span><div className="ref-case-title">Inbound call not assigned to counselor (Get Counsellor API returns 0)</div><ul><li>Is the counselor active in the system?</li><li>Configured under Extensions → Telephony → User Config?</li><li>Is the correct applicant number being passed by the vendor?</li><li>Does the lead currently have an assigned owner?</li></ul></div>
              <div className="ref-case-item"><span className="ref-case-num">CASE 2</span><div className="ref-case-title">Inbound call diverted to a different counselor despite an assigned owner</div><ul><li>Is the assigned owner configured in User Config?</li><li>Was the call missed by the owner first?</li><li>Is the vendor passing correct agent details in the Call Notification request?</li></ul></div>
              <div className="ref-case-item"><span className="ref-case-num">CASE 3</span><div className="ref-case-title">IVR call records not updating on the lead&apos;s timeline</div><ul><li>Check Telephony API logs for Callback requests at that time.</li><li>If Inbound: was it missed by the lead (vendor won&apos;t pass counselor details)?</li><li>Correct counselor number format (prefix/suffix)?</li><li>Are <code>counsellorId</code> and <code>userId</code> present in the final response?</li><li><code>userId = 678</code> is a hardcoded test-outbound-call value.</li><li><code>counsellorId = 0</code> means the counselor isn&apos;t configured in Telephony User Config.</li></ul></div>
              <div className="ref-case-item"><span className="ref-case-num">CASE 4</span><div className="ref-case-title">Inbound calls from fresh leads missing &quot;Campaign Medium&quot; (DID) value</div><ul><li>Was the Call Notification request received on the first call?</li><li>Was <code>did_no</code> passed correctly (blank = not captured)?</li></ul></div>
              <div className="ref-case-item"><span className="ref-case-num">CASE 5</span><div className="ref-case-title">Lead created with the DID number itself (Mobile App)</div><ul><li>Vendor&apos;s Call Notification request was delayed — the popup showed the DID before updating to the lead&apos;s actual number.</li><li>Delete the wrongly-created DID lead to stop the recurring notification.</li></ul></div>
              <div className="ref-case-item"><span className="ref-case-num">CASE 6</span><div className="ref-case-title">Counselor not getting Call Notification popup</div><ul><li>Was the request sent by the vendor (check API logs)?</li><li>Correct counselor details in the request?</li><li>Is the Notification URL configured correctly on the vendor&apos;s panel?</li><li>Did the vendor&apos;s push return <code>status:1</code>? <code>status:0</code> means a parameter error on their end.</li></ul></div>
              <div className="ref-case-item"><span className="ref-case-num">CASE 7</span><div className="ref-case-title">Lead not created in CRM from inbound call</div><ul><li>Was Call Notification/Callback received (check logs)?</li><li>Are the correct endpoints configured with the vendor?</li><li>Is the lead/applicant number in the correct format?</li></ul></div>
              <div className="ref-case-item"><span className="ref-case-num">CASE 8</span><div className="ref-case-title">Inbound missed call count not updating</div><ul><li>Was the Callback request received?</li><li>Check <code>triggeredinboundmissedcallactivity</code> header = 1 for missed.</li><li>Counselor details null = missed by the lead, not the agent — won&apos;t count in Lead Manager.</li></ul></div>
              <div className="ref-case-item"><span className="ref-case-num">CASE 9</span><div className="ref-case-title">Call activity wrongly logged in timeline</div><ul><li>Multiple Callback requests for the same call?</li><li>Correct call status passed (missed/failed vs. connected)?</li><li>Only the <strong>first</strong> Callback received is processed — a wrong first callback overrides a later correct one.</li></ul></div>
              <div className="ref-case-item"><span className="ref-case-num">CASE 10</span><div className="ref-case-title">Lead not assigned to a counselor on inbound missed calls</div><ul><li>Was the Call Notification request received with a user ID in the final response?</li><li>Assignment goes to whichever counselor first opens the Missed Call Notification — if none do, the lead stays unassigned.</li></ul></div>
              <div className="ref-case-item"><span className="ref-case-num">CASE 11</span><div className="ref-case-title">Call data not syncing to the User Productivity Dashboard</div><ul><li>Correct date filter selected?</li><li>Callback requests present in logs?</li><li><code>counselor id</code> present in the final response (if not, see Case 3)?</li><li>Reports can take up to ~1 hour to refresh.</li></ul></div>
              <div className="ref-case-item"><span className="ref-case-num">CASE 12</span><div className="ref-case-title">Call recording URL missing from timeline</div><ul><li>Callback request present?</li><li>Check <code>triggeredinboundmissedcallactivity</code> — if 1 (missed), no recording exists.</li></ul></div>
              <div className="ref-case-item"><span className="ref-case-num">CASE 13</span><div className="ref-case-title">Lead&apos;s number not verified despite an answered inbound call</div><ul><li>Verification only happens if the counselor opens the lead profile, edits, and saves — merely answering does not auto-verify.</li></ul></div>
              <div className="ref-case-item"><span className="ref-case-num">CASE 14</span><div className="ref-case-title">Timeline not updated (lead has duplicate accounts — Primary/Alternate)</div><ul><li>Only works on <strong>New Telephony Configuration</strong> — Old Configuration doesn&apos;t support this even with correct profile editing.</li></ul></div>
              <div className="ref-case-item"><span className="ref-case-num">CASES 15–17</span><div className="ref-case-title">Click-to-Call icon / missed-call icon / call notification not visible</div><ul><li>Same permission-template and callback-verification checks as the Quick Checklist above.</li></ul></div>

              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-red)' }}></span>Known error messages</h2>
              <table>
                <thead>
                  <tr><th style={{ width: '260px' }}>Error</th><th>Meaning</th><th>Fix</th></tr>
                </thead>
                <tbody>
                  <tr><td className="ref-error-row-code">Invalid Vendor</td><td>Telephony vendor isn&apos;t configured</td><td>Configure under Manage Institute → Cloud Telephony Configurations</td></tr>
                  <tr><td className="ref-error-row-code">Agent Details Not Found</td><td>Counselor&apos;s mobile number in Meritto isn&apos;t mapped in the vendor&apos;s agent list</td><td>Ask the college team to map counselor numbers on both platforms</td></tr>
                  <tr><td className="ref-error-row-code">Status=0, Error=503</td><td>Vendor&apos;s Click-to-Call API is failing</td><td>Escalate to the telephony vendor</td></tr>
                  <tr><td className="ref-error-row-code">Executive Number is under NDNC</td><td>Student or counselor number is on the Do-Not-Disturb registry</td><td>Retest with a different student number, then a different counselor login if it persists</td></tr>
                  <tr><td className="ref-error-row-code">SR Number is Expired</td><td>Knowlarity (Super Receptionist) account subscription lapsed</td><td>College team needs to recharge/renew the account</td></tr>
                  <tr><td className="ref-error-row-code">Agent already in the call</td><td>Counselor dialing outbound is already on another call</td><td>Vendor-reported — verify with vendor why</td></tr>
                  <tr><td className="ref-error-row-code">MCUBE 503 Service Unavailable</td><td>Vendor-side outage/issue</td><td>Escalate to MCUBE</td></tr>
                  <tr><td className="ref-error-row-code">Missing Authentication Token (Knowlarity)</td><td>Authorization header not sent in the Click-to-Call request</td><td>Configure the &quot;Authorization&quot; key + POST method in the Telephony Extension</td></tr>
                </tbody>
              </table>

              <div className="ref-callout note">
                <div className="ref-callout-title">Log-checking path for silent failures</div>
                <p>For &quot;icon not updating&quot;, &quot;pop-up not appearing&quot;, or &quot;report not updating&quot; symptoms with no clear error message: <span className="mono">Reports &amp; Analytics → Tracker → Telephony API Logs → filter Institute / Vendor / Date → search the number → inspect Request / Processed Data / Final Response</span> for the relevant API (Call Notification for pop-ups, Call Back Details for reports/recordings).</p>
              </div>
            </section>
          )}

          {/* ============ OZONETEL C2C ============ */}
          {activeTab === 'ozonetel' && (
            <section>
              <div className="ref-eyebrow" style={{ color: 'var(--ref-amber)' }}>03 · VENDOR</div>
              <div className="ref-vendor-hero">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div className="ref-vendor-icon-lg" style={{ background: 'var(--ref-amber-glow)', color: 'var(--ref-amber)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l4 8-2 2a12 12 0 008 8l2-2 8 4" /></svg>
                  </div>
                  <div>
                    <h1 className="ref-page-title" style={{ marginBottom: 0 }}>Ozonetel — Click-to-Call &amp; Inbound</h1>
                    <div className="ref-title-rule" style={{ background: 'var(--ref-amber)' }}></div>
                  </div>
                </div>
                <div className="badges"><span className="ref-badge b-out">OUTBOUND</span><span className="ref-badge b-in">INBOUND</span><span className="ref-badge b-sticky">STICKY-AGENT</span></div>
              </div>
              <p className="ref-page-desc">One-click outbound dialing plus inbound lead creation, pop-ups, and optional assigned-counselor routing.</p>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-amber)' }}></span>What it enables</h2>
              <ul>
                <li>One-click outbound dialing from Lead Manager / Application Manager</li>
                <li>Inbound: auto-creates a new lead for unknown numbers; pop-up with student details before pickup</li>
                <li>Call logs sync to counselor productivity report, student timeline, campaign manager, telephony logs</li>
                <li>Optional sticky-agent routing of inbound calls from existing leads to their assigned counselor (via Get Counselor API)</li>
              </ul>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-amber)' }}></span>Prerequisites</h2>
              <table className="compact">
                <tbody>
                  <tr><td className="key-col">List of Inbound Campaigns</td><td>Campaign names on Ozonetel</td></tr>
                  <tr><td className="key-col">List of Outbound C2C Campaigns</td><td>Campaign names on Ozonetel</td></tr>
                  <tr><td className="key-col">DID Number</td><td>Virtual number for incoming/outgoing</td></tr>
                  <tr><td className="key-col">Ozonetel User Name</td><td>Account username</td></tr>
                  <tr><td className="key-col">API Key</td><td>Authentication key</td></tr>
                  <tr><td className="key-col">Agent Number, PIN, ID</td><td>Per counselor</td></tr>
                  <tr><td className="key-col">Ozonetel Mode</td><td>Online / Offline</td></tr>
                </tbody>
              </table>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-amber)' }}></span>Configuration steps</h2>
              <ol className="ref-flow-steps" style={{ '--accent-color': 'var(--ref-amber)' } as any}>
                <li>Manage Institute → Cloud Telephony Configuration → select Ozonetel, add API Key + Username</li>
                <li>Enable App Calling and/or Cloud Calling as needed</li>
                <li>Outbound: add campaigns, enable outbound, select which Application Forms get Click-to-Call (leave blank = Lead Manager only)</li>
                <li>Inbound: add campaigns, enable inbound, choose whether re-assignment is allowed if a different counselor answers</li>
                <li>Per-counselor: set Telephony Partner, Mode, Inbound/Outbound campaigns, Agent ID/Number/PIN</li>
                <li>QA test with a live login, then grant permissions (Permissions → search &quot;call&quot;)</li>
              </ol>
            </section>
          )}

          {/* ============ OZONETEL CAMPAIGN ============ */}
          {activeTab === 'ozonetel-campaign' && (
            <section>
              <div className="ref-eyebrow" style={{ color: 'var(--ref-amber)' }}>03 · VENDOR</div>
              <div className="ref-vendor-hero">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div className="ref-vendor-icon-lg" style={{ background: 'var(--ref-amber-glow)', color: 'var(--ref-amber)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 11a8 8 0 0116 0" /><path d="M7 11a5 5 0 0110 0" /><circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" /></svg>
                  </div>
                  <div>
                    <h1 className="ref-page-title" style={{ marginBottom: 0 }}>Ozonetel — Automated Campaign Calling</h1>
                    <div className="ref-title-rule" style={{ background: 'var(--ref-amber)' }}></div>
                  </div>
                </div>
                <div className="badges"><span className="ref-badge b-camp">CAMPAIGN</span><span className="ref-badge b-camp">AUTO-DIAL</span></div>
              </div>
              <p className="ref-page-desc">Push a lead&apos;s number straight into an Ozonetel outbound auto-dial campaign, in one click.</p>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-amber)' }}></span>What it enables</h2>
              <ul>
                <li>Push a lead&apos;s primary number into an Ozonetel outbound auto-dial campaign from Lead/Application Manager</li>
                <li>Call logs sync back to productivity report, timeline, campaign manager, telephony logs</li>
              </ul>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-amber)' }}></span>Configuration steps</h2>
              <ol className="ref-flow-steps" style={{ '--accent-color': 'var(--ref-amber)' } as any}>
                <li>Settings → Extension → Telephony → Ozonetel → Manage</li>
                <li>Enable campaign config, POST method, add Campaign Dialer URL, add comma-separated campaign list</li>
                <li>Map &quot;campaign name&quot; as a user-specific value and &quot;customer number&quot; as a lead-specific value</li>
                <li>Add <code>api_key</code>, <code>username</code>, <code>format=JSON</code>, <code>ozonetelMode</code> as other parameters</li>
                <li>Optional: enable &quot;Agent Wise Campaign Data push&quot; if agent details should be pushed with each dial</li>
              </ol>
            </section>
          )}

          {/* ============ MCUBE ============ */}
          {activeTab === 'mcube' && (
            <section>
              <div className="ref-eyebrow" style={{ color: 'var(--ref-violet)' }}>03 · VENDOR</div>
              <div className="ref-vendor-hero">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div className="ref-vendor-icon-lg" style={{ background: 'var(--ref-violet-glow)', color: 'var(--ref-violet)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 7h6M9 17h.01" /></svg>
                  </div>
                  <div>
                    <h1 className="ref-page-title" style={{ marginBottom: 0 }}>MCUBE Softphone</h1>
                    <div className="ref-title-rule" style={{ background: 'var(--ref-violet)' }}></div>
                  </div>
                </div>
                <div className="badges"><span className="ref-badge b-out">OUTBOUND</span><span className="ref-badge b-in">INBOUND</span><span className="ref-badge b-sticky">STICKY-AGENT</span></div>
              </div>
              <p className="ref-page-desc">Outbound Click-to-Call plus inbound lead creation with optional sticky-agent routing.</p>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-violet)' }}></span>Prerequisites</h2>
              <table className="compact">
                <tbody>
                  <tr><td className="key-col">Click-to-Call (C2C) API URL</td><td><span className="mono">config.mcube.com/Restmcube-api/campaign</span> or <span className="mono">mcube.vmc.in/api/outboundcall</span></td></tr>
                  <tr><td className="key-col">Authorization / API Key</td><td>Provided by MCUBE</td></tr>
                </tbody>
              </table>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-violet)' }}></span>Configuration steps</h2>
              <ol className="ref-flow-steps" style={{ '--accent-color': 'var(--ref-violet)' } as any}>
                <li>Manage Account → Extension → enable Telephony Connector</li>
                <li>Outbound: POST method, enter C2C URL; map <code>exenumber</code> → Agent Number, <code>custnumber</code> → Applicant Mobile No, <code>refid</code> → Lead ID; add <code>refurl</code>; header <code>Authorization: Bearer &lt;api-key&gt;</code></li>
                <li>Inbound: enable and select mobile-type fields</li>
                <li>User Config: map Agent Number — <strong>default parameter type is string</strong> for MCUBE</li>
              </ol>
            </section>
          )}

          {/* ============ SMARTPING HARDPHONE ============ */}
          {activeTab === 'smartping-hard' && (
            <section>
              <div className="ref-eyebrow" style={{ color: 'var(--ref-rose)' }}>03 · VENDOR</div>
              <div className="ref-vendor-hero">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div className="ref-vendor-icon-lg" style={{ background: 'var(--ref-rose-glow)', color: 'var(--ref-rose)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9V7a2 2 0 012-2h8a2 2 0 012 2v2" /><rect x="4" y="9" width="16" height="11" rx="2" /></svg>
                  </div>
                  <div>
                    <h1 className="ref-page-title" style={{ marginBottom: 0 }}>SmartPing — Hardphone</h1>
                    <div className="ref-title-rule" style={{ background: 'var(--ref-rose)' }}></div>
                  </div>
                </div>
                <div className="badges"><span className="ref-badge b-out">OUTBOUND</span><span className="ref-badge b-in">INBOUND</span><span className="ref-badge b-sticky">STICKY-AGENT</span></div>
              </div>
              <p className="ref-page-desc">Outbound Click-to-Call plus inbound lead creation on physical/hardphone devices.</p>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-rose)' }}></span>Prerequisites</h2>
              <ul>
                <li>From SmartPing: Click-to-Call API doc, User ID, Token, <code>fromType</code>, <code>toType</code>, DID number, Agent mobile numbers</li>
              </ul>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-rose)' }}></span>Configuration steps</h2>
              <ol className="ref-flow-steps" style={{ '--accent-color': 'var(--ref-rose)' } as any}>
                <li>Enable Telephony Connector (Manage Account → Extension)</li>
                <li>Outbound: POST method, configure request/response keys, add UserID + Token</li>
                <li>Inbound: enable mobile-type fields</li>
                <li>User Config: map Agent ID against username/email — <strong>Integer</strong> for phone numbers, <strong>String</strong> for User IDs</li>
              </ol>
            </section>
          )}

          {/* ============ SMARTPING CAMPAIGN ============ */}
          {activeTab === 'smartping-campaign' && (
            <section>
              <div className="ref-eyebrow" style={{ color: 'var(--ref-rose)' }}>03 · VENDOR</div>
              <div className="ref-vendor-hero">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div className="ref-vendor-icon-lg" style={{ background: 'var(--ref-rose-glow)', color: 'var(--ref-rose)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 11a8 8 0 0116 0" /><path d="M7 11a5 5 0 0110 0" /><circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" /></svg>
                  </div>
                  <div>
                    <h1 className="ref-page-title" style={{ marginBottom: 0 }}>SmartPing — Campaign Dialing</h1>
                    <div className="ref-title-rule" style={{ background: 'var(--ref-rose)' }}></div>
                  </div>
                </div>
                <div className="badges"><span className="ref-badge b-camp">CAMPAIGN</span><span className="ref-badge b-camp">AUTO-DIAL</span></div>
              </div>
              <p className="ref-page-desc">Push leads into a SmartPing outbound auto-dial call list, agent-wise or non-agent-wise.</p>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-rose)' }}></span>Configuration steps</h2>
              <ol className="ref-flow-steps" style={{ '--accent-color': 'var(--ref-rose)' } as any}>
                <li>Settings → Extension → Telephony → SmartPing Softphone → Manage → Campaign Dialer tab</li>
                <li>POST method, Campaign Dialer URL, campaign list with alias per Campaign ID, additional params (<code>token</code>, <code>location_id</code>, etc.)</li>
                <li>User Config → Field Mapping → map agent details</li>
                <li>Toggle Agent-wise vs. Non-Agent-wise push as needed (only one can run at a time)</li>
              </ol>
            </section>
          )}

          {/* ============ KNOWLARITY ============ */}
          {activeTab === 'knowlarity' && (
            <section>
              <div className="ref-eyebrow" style={{ color: 'var(--ref-sky)' }}>03 · VENDOR</div>
              <div className="ref-vendor-hero">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div className="ref-vendor-icon-lg" style={{ background: 'var(--ref-sky-glow)', color: 'var(--ref-sky)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0122 16.92z" /></svg>
                  </div>
                  <div>
                    <h1 className="ref-page-title" style={{ marginBottom: 0 }}>Knowlarity — Vendor Configuration (New)</h1>
                    <div className="ref-title-rule" style={{ background: 'var(--ref-sky)' }}></div>
                  </div>
                </div>
                <div className="badges"><span className="ref-badge b-out">OUTBOUND</span><span className="ref-badge b-in">INBOUND</span><span className="ref-badge b-sticky">STICKY-AGENT</span></div>
              </div>
              <p className="ref-page-desc">One-click outbound dialing plus inbound lead creation, driven by Knowlarity&apos;s Streaming API (BRIDGE and CDR events) rather than a per-call synchronous callback.</p>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-sky)' }}></span>Prerequisites</h2>
              <table className="compact">
                <tbody>
                  <tr><td className="key-col">Click-to-Call (C2C) API URL</td><td><span className="mono">https://kpi.knowlarity.com/Basic/v1/account/call/makecall</span></td></tr>
                  <tr><td className="key-col">x-api-key</td><td>Provided by Knowlarity (passed in header)</td></tr>
                  <tr><td className="key-col">Streaming API Key / Authorization</td><td>Provided by Knowlarity (passed in header)</td></tr>
                  <tr><td className="key-col">k_number</td><td>Provided by Knowlarity (passed in body)</td></tr>
                </tbody>
              </table>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-sky)' }}></span>Configuration steps</h2>
              <ol className="ref-flow-steps" style={{ '--accent-color': 'var(--ref-sky)' } as any}>
                <li>Outbound: POST method, Click-to-Call URL</li>
                <li>User-specific: <code>agent_number</code> → Agent Number</li>
                <li>Lead-specific: <code>customer_number</code> → Applicant Mobile No, <code>npfID</code> → Lead ID</li>
                <li>Other params: <code>caller_id</code>, <code>k_number</code></li>
                <li>Headers: <code>Content-Type: application/json</code>, <code>x-api-key</code>, <code>Authorization</code>, <code>Accept: application/json</code></li>
                <li>Call Log API: Live Streaming API with Authorization Key</li>
              </ol>
            </section>
          )}

          {/* ============ TELECMI ============ */}
          {activeTab === 'telecmi' && (
            <section>
              <div className="ref-eyebrow" style={{ color: 'var(--ref-leaf)' }}>03 · VENDOR</div>
              <div className="ref-vendor-hero">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div className="ref-vendor-icon-lg" style={{ background: 'var(--ref-leaf-glow)', color: 'var(--ref-leaf)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 18h6M8 6h8M8 10h8" /></svg>
                  </div>
                  <div>
                    <h1 className="ref-page-title" style={{ marginBottom: 0 }}>TeleCMI</h1>
                    <div className="ref-title-rule" style={{ background: 'var(--ref-leaf)' }}></div>
                  </div>
                </div>
                <div className="badges"><span className="ref-badge b-out">OUTBOUND</span><span className="ref-badge b-in">INBOUND</span><span className="ref-badge b-sticky">STICKY-AGENT</span></div>
              </div>
              <p className="ref-page-desc">Outbound Click-to-Call plus inbound lead creation, with a separate desktop softphone app (&quot;Connle&quot;) for web-based calling.</p>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-leaf)' }}></span>Prerequisites</h2>
              <table className="compact">
                <tbody>
                  <tr><td className="key-col">Click-to-Call (C2C) API URL</td><td><span className="mono">https://rest.telecmi.com/v2/external/click2call</span></td></tr>
                  <tr><td className="key-col">Secret</td><td>Provided by TeleCMI</td></tr>
                </tbody>
              </table>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-leaf)' }}></span>Configuration steps</h2>
              <ol className="ref-flow-steps" style={{ '--accent-color': 'var(--ref-leaf)' } as any}>
                <li>Outbound: POST method, C2C URL</li>
                <li>User-specific: <code>user_id</code> → Agent Number</li>
                <li>Lead-specific: <code>to</code> → Applicant Mobile No, <code>custom</code> → Lead ID</li>
                <li>Other params: <code>secret</code> (secret key)</li>
                <li>Response Configuration: <code>msg</code> = &quot;Call initiated&quot;; enable International Calling</li>
                <li>User Config: map Agent Number — <strong>default parameter type is Integer</strong> for TeleCMI</li>
              </ol>
            </section>
          )}

          {/* ============ MYOPERATOR ============ */}
          {activeTab === 'myoperator' && (
            <section>
              <div className="ref-eyebrow" style={{ color: 'var(--ref-coral)' }}>03 · VENDOR</div>
              <div className="ref-vendor-hero">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div className="ref-vendor-icon-lg" style={{ background: 'var(--ref-coral-glow)', color: 'var(--ref-coral)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l4 8-2 2a12 12 0 008 8l2-2 8 4" /><circle cx="18" cy="6" r="2" /></svg>
                  </div>
                  <div>
                    <h1 className="ref-page-title" style={{ marginBottom: 0 }}>MyOperator</h1>
                    <div className="ref-title-rule" style={{ background: 'var(--ref-coral)' }}></div>
                  </div>
                </div>
                <div className="badges"><span className="ref-badge b-out">OUTBOUND</span><span className="ref-badge b-in">INBOUND</span><span className="ref-badge b-sticky">STICKY-AGENT</span></div>
              </div>
              <p className="ref-page-desc">Outbound Click-to-Call plus inbound lead creation, with vendor-side fallback routing logic (round robin, priority) when sticky-agent isn&apos;t used.</p>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-coral)' }}></span>Prerequisites</h2>
              <table className="compact">
                <tbody>
                  <tr><td className="key-col">Click-to-Call API URL</td><td><span className="mono">https://obd-api.myoperator.co/obd-api-v1</span></td></tr>
                  <tr><td className="key-col">Secret Token / Type / Public IVR ID</td><td>Provided by MyOperator</td></tr>
                  <tr><td className="key-col">x-api-key</td><td>Passed in headers</td></tr>
                </tbody>
              </table>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-coral)' }}></span>Configuration steps</h2>
              <ol className="ref-flow-steps" style={{ '--accent-color': 'var(--ref-coral)' } as any}>
                <li>Outbound: POST method, Click-to-Call URL</li>
                <li>User-specific: <code>agent_number</code> → Agent Number, <code>user_id</code> → User ID</li>
                <li>Lead-specific: <code>number</code> → Applicant Mobile No, <code>reference_id</code> → Lead ID</li>
                <li>Other params: <code>company_id</code>, <code>secret_token</code>, <code>type</code>, <code>public_ivr_id</code></li>
                <li>Headers: <code>Content-Type: application/json</code>, <code>x-api-key</code></li>
                <li>Response Configuration: <code>status</code> = &quot;success&quot;</li>
              </ol>
            </section>
          )}

          {/* ============ TATATEL ============ */}
          {activeTab === 'tatatel' && (
            <section>
              <div className="ref-eyebrow" style={{ color: 'var(--ref-sky)' }}>03 · VENDOR</div>
              <div className="ref-vendor-hero">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div className="ref-vendor-icon-lg" style={{ background: 'var(--ref-sky-glow)', color: 'var(--ref-sky)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0122 16.92z" /></svg>
                  </div>
                  <div>
                    <h1 className="ref-page-title" style={{ marginBottom: 0 }}>Tatatel (Tata Tele Services - Smartflo)</h1>
                    <div className="ref-title-rule" style={{ background: 'var(--ref-sky)' }}></div>
                  </div>
                </div>
                <div className="badges"><span className="ref-badge b-out">OUTBOUND</span><span className="ref-badge b-in">INBOUND</span></div>
              </div>
              <p className="ref-page-desc">Tata Smartflo cloud telephony integration for outbound Click-to-Call and lead management.</p>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-sky)' }}></span>Prerequisites</h2>
              <table className="compact">
                <tbody>
                  <tr><td className="key-col">Click-to-Call API URL</td><td><span className="mono">https://api-smartflo.tatateleservices.com/v1/click_to_call</span></td></tr>
                  <tr><td className="key-col">Authorization</td><td>Bearer token provided by Tata Tele Business Services</td></tr>
                </tbody>
              </table>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-sky)' }}></span>Parameters Mapped</h2>
              <ul>
                <li>User Specific: <code>agent_number</code> → Agent Number, <code>agent_no</code> → Agent No</li>
                <li>Lead Specific: <code>destination_number</code> → Applicant Mobile No, <code>npf_id</code> → Lead ID</li>
                <li>Other Parameters: <code>async</code> = <code>1</code></li>
                <li>Headers: <code>Authorization</code></li>
                <li>Response Configuration: Type = JSON, <code>message</code> = &quot;Originate successfully queued&quot;</li>
              </ul>
            </section>
          )}

          {/* ============ ACEFONE ============ */}
          {activeTab === 'acefone' && (
            <section>
              <div className="ref-eyebrow" style={{ color: 'var(--ref-teal)' }}>03 · VENDOR</div>
              <div className="ref-vendor-hero">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div className="ref-vendor-icon-lg" style={{ background: 'var(--ref-teal-glow)', color: 'var(--ref-teal)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h1 className="ref-page-title" style={{ marginBottom: 0 }}>Acefone — Click-to-Call</h1>
                    <div className="ref-title-rule" style={{ background: 'var(--ref-teal)' }}></div>
                  </div>
                </div>
                <div className="badges"><span className="ref-badge b-out">OUTBOUND</span><span className="ref-badge b-in">INBOUND</span></div>
              </div>
              <p className="ref-page-desc">Acefone cloud communication outbound Click-to-Call API configuration.</p>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-teal)' }}></span>Prerequisites</h2>
              <table className="compact">
                <tbody>
                  <tr><td className="key-col">Click-to-Call API URL</td><td><span className="mono">https://api.acefone.in/v1/click_to_call</span></td></tr>
                  <tr><td className="key-col">Authorization</td><td>JWT / Auth Token provided by Acefone portal</td></tr>
                </tbody>
              </table>
              <h2 className="ref-section-title"><span className="ref-dot" style={{ background: 'var(--ref-teal)' }}></span>Parameters Mapped</h2>
              <ul>
                <li>User Specific: <code>agent_number</code> → Agent Number (string)</li>
                <li>Lead Specific: <code>destination_number</code> → Applicant Mobile No, <code>lead_id</code> → Lead ID</li>
                <li>Headers: <code>Authorization</code>, <code>content-type: application/json</code>, <code>accept: application/json</code></li>
                <li>Response Configuration: Type = JSON, <code>message</code> = &quot;Originate successfully queued&quot;, Select Forms = Select Here</li>
              </ul>
            </section>
          )}
          </>
          )}

          <div className="ref-footer-note">
            Compiled from the Meritto Help Center telephony articles (help.meritto.com/portal/en/kb), plus live verified vendor configurations. Reference only — always confirm against the live portal before making config changes.
          </div>
        </main>
      </div>
    </div>
  );
}
