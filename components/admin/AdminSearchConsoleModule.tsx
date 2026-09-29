import React, { useState } from 'react';
import { AnalyticsSettings } from '../../types';
import { adminStore } from '../../services/adminStore';
import { 
  Search, Check, Trash2, Edit3, Globe, ExternalLink, 
  ShieldCheck, AlertCircle, Copy, CheckCircle2, RotateCcw, 
  Terminal, Sparkles 
} from 'lucide-react';

interface AdminSearchConsoleModuleProps {
  onRefresh: () => void;
}

const AdminSearchConsoleModule: React.FC<AdminSearchConsoleModuleProps> = ({ onRefresh }) => {
  const [analytics, setAnalytics] = useState<AnalyticsSettings>(() => adminStore.getAnalytics());
  const [tagInput, setTagInput] = useState(analytics.searchConsoleTag || '');
  const [isEnabled, setIsEnabled] = useState(analytics.searchConsoleEnabled ?? true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.updateAnalytics({
      searchConsoleTag: tagInput.trim(),
      searchConsoleEnabled: isEnabled
    });
    setAnalytics(adminStore.getAnalytics());
    showToast('Search Console verification updated and injected into site <head>!');
    onRefresh();
  };

  const handleDeleteTag = () => {
    if (window.confirm('Are you sure you want to delete and clear the Search Console verification tag?')) {
      setTagInput('');
      adminStore.updateAnalytics({
        searchConsoleTag: '',
        searchConsoleEnabled: false
      });
      setIsEnabled(false);
      setAnalytics(adminStore.getAnalytics());
      showToast('Search Console verification tag deleted.');
      onRefresh();
    }
  };

  const handleToggleActive = () => {
    const nextState = !isEnabled;
    setIsEnabled(nextState);
    adminStore.updateAnalytics({
      searchConsoleEnabled: nextState
    });
    setAnalytics(adminStore.getAnalytics());
    showToast(`Search Console verification is now ${nextState ? 'Active' : 'Inactive'}.`);
    onRefresh();
  };

  const cleanTag = tagInput.replace(/^google-site-verification=/, '').replace(/^<meta[^>]*content=["']([^"']*)["'][^>]*>/i, '$1');

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Banner */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Search className="w-3.5 h-3.5" /> Google Search Console
          </div>
          <h2 className="text-xl font-bold text-white">Google Search Console Verification Module</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage site ownership verification meta tags, monitor crawl indexing, and submit sitemaps.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <span>Open Google Search Console</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* Main Settings Card */}
      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" /> HTML Meta Tag Ownership Verification
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Paste your Google verification token. When Active, this is automatically rendered in the document &lt;head&gt;.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
              isEnabled && tagInput
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}>
              {isEnabled && tagInput ? 'Active & Injected' : 'Inactive'}
            </span>

            <button
              type="button"
              onClick={handleToggleActive}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                isEnabled
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {isEnabled ? 'Status: Active' : 'Status: Inactive'}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
              HTML Verification Meta Tag Content / Token
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {tagInput && (
                <button
                  type="button"
                  onClick={handleDeleteTag}
                  className="p-3 text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-red-500/10 border border-slate-700 rounded-xl transition-colors"
                  title="Delete / Clear Verification Tag"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
            <span className="text-[11px] text-slate-500 mt-1.5 block">
              You can paste the entire tag `<meta name="google-site-verification" content="..." />` or just the `google-site-verification=...` key.
            </span>
          </div>

          {/* Live Code Preview */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-blue-400" /> Injected HTML Snippet Preview
            </div>
            {cleanTag ? (
              <pre className="text-xs font-mono text-emerald-400 bg-slate-900/80 p-3 rounded-lg overflow-x-auto">
                {`<meta name="google-site-verification" content="${cleanTag}" />`}
              </pre>
            ) : (
              <div className="text-xs text-slate-500 italic p-2">
                No verification token entered yet. Enter a token above and click Save.
              </div>
            )}
          </div>

          {/* Quick Guide */}
          <div className="p-4 bg-blue-950/20 border border-blue-900/40 rounded-xl space-y-2 text-xs text-slate-300">
            <strong className="text-white block font-bold">Step-by-step Verification Guide:</strong>
            <ol className="list-decimal pl-4 space-y-1 text-slate-400">
              <li>Log in to <strong className="text-slate-200">Google Search Console</strong> and select or add property <strong className="text-slate-200">https://raksitsolutions.com</strong>.</li>
              <li>Choose the <strong className="text-slate-200">HTML tag</strong> verification method.</li>
              <li>Copy the meta tag and paste it into the field above.</li>
              <li>Click <strong className="text-slate-200">"Save & Update Verification"</strong>.</li>
              <li>Return to Google Search Console and click <strong className="text-slate-200">Verify</strong>.</li>
            </ol>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-500">
            Changes take effect immediately on all public pages.
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-blue/30 transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Save & Update Verification
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminSearchConsoleModule;
