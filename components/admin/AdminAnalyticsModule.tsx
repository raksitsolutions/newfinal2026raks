import React, { useState } from 'react';
import { AnalyticsSettings } from '../../types';
import { adminStore } from '../../services/adminStore';
import { 
  BarChart3, Search, Check, ShieldCheck, Code, 
  ExternalLink, Trash2, RotateCcw, AlertCircle, Sparkles 
} from 'lucide-react';

interface AdminAnalyticsModuleProps {
  onRefresh: () => void;
}

const AdminAnalyticsModule: React.FC<AdminAnalyticsModuleProps> = ({ onRefresh }) => {
  const [analytics, setAnalytics] = useState<AnalyticsSettings>(() => adminStore.getAnalytics());
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.updateAnalytics(analytics);
    setSaved(true);
    onRefresh();
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Banner */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <BarChart3 className="w-3.5 h-3.5" /> Performance & Analytics
          </div>
          <h2 className="text-xl font-bold text-white">Google Analytics & Search Console</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure Google Analytics 4 (GA4), verify Google Search Console ownership, and manage tracking scripts.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold animate-in fade-in">
            <Check className="w-4 h-4" /> Tracking Updated!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* GOOGLE ANALYTICS 4 (GA4) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-400" /> Google Analytics 4 (GA4)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Track visitors, page views, and conversion rates across Telangana.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                analytics.ga4Enabled
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-800 text-slate-500 border-slate-700'
              }`}>
                {analytics.ga4Enabled ? 'Active' : 'Inactive'}
              </span>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics.ga4Enabled}
                  onChange={(e) => setAnalytics({ ...analytics, ga4Enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                GA4 Measurement ID (e.g. G-XXXXXXXXXX)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={analytics.ga4MeasurementId}
                  onChange={(e) => setAnalytics({ ...analytics, ga4MeasurementId: e.target.value })}
                  placeholder="G-XXXXXXXXXX"
                  className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                {analytics.ga4MeasurementId && (
                  <button
                    type="button"
                    onClick={() => setAnalytics({ ...analytics, ga4MeasurementId: '' })}
                    className="p-2.5 text-slate-400 hover:text-red-400 bg-slate-800 border border-slate-700 rounded-xl"
                    title="Clear ID"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
              <strong className="text-slate-200 block">How to find your GA4 ID:</strong>
              <p>Go to your Google Analytics admin panel › Property Settings › Data Streams › Select Web Stream › Copy the "Measurement ID".</p>
            </div>
          </div>
        </div>

        {/* GOOGLE SEARCH CONSOLE */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-400" /> Google Search Console Verification
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Verify site ownership in Google Search Console to monitor search indexing and rankings.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                analytics.searchConsoleEnabled
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-800 text-slate-500 border-slate-700'
              }`}>
                {analytics.searchConsoleEnabled ? 'Active' : 'Inactive'}
              </span>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics.searchConsoleEnabled}
                  onChange={(e) => setAnalytics({ ...analytics, searchConsoleEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                HTML Verification Meta Tag Content
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={analytics.searchConsoleTag}
                  onChange={(e) => setAnalytics({ ...analytics, searchConsoleTag: e.target.value })}
                  placeholder="google-site-verification=XXXXXXXXXXXXXXXXXXXXX"
                  className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {analytics.searchConsoleTag && (
                  <button
                    type="button"
                    onClick={() => setAnalytics({ ...analytics, searchConsoleTag: '' })}
                    className="p-2.5 text-slate-400 hover:text-red-400 bg-slate-800 border border-slate-700 rounded-xl"
                    title="Clear tag"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
              <strong className="text-slate-200 block">Verification Method:</strong>
              <p>In Search Console, choose "HTML tag" verification method. Paste either the full meta tag or just the verification code token.</p>
            </div>
          </div>
        </div>

        {/* GOOGLE TAG MANAGER (GTM) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-400" /> Google Tag Manager (GTM)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Deploy advanced marketing tags without modifying source code.</p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                analytics.gtmEnabled
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-800 text-slate-500 border-slate-700'
              }`}>
                {analytics.gtmEnabled ? 'Active' : 'Inactive'}
              </span>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics.gtmEnabled}
                  onChange={(e) => setAnalytics({ ...analytics, gtmEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
              GTM Container ID (e.g. GTM-XXXXXXX)
            </label>
            <input
              type="text"
              value={analytics.gtmContainerId}
              onChange={(e) => setAnalytics({ ...analytics, gtmContainerId: e.target.value })}
              placeholder="GTM-XXXXXXX"
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* CUSTOM HEAD TRACKING SCRIPTS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-400" /> Custom Head Scripts (Meta Pixel, Hotjar, Clarity)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Insert any custom tracking snippets or third-party pixel codes.
            </p>
          </div>

          <textarea
            rows={5}
            value={analytics.customHeadScript || ''}
            onChange={(e) => setAnalytics({ ...analytics, customHeadScript: e.target.value })}
            placeholder="<!-- Add Meta Pixel / Clarity Script here -->"
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Save CTA */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="submit"
            className="px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-amber-600/30 transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Save Tracking & Analytics</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAnalyticsModule;
