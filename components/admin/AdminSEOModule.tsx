import React, { useState } from 'react';
import { SEOSettings } from '../../types';
import { adminStore } from '../../services/adminStore';
import { 
  Globe, Search, Check, Sparkles, FileCode, Shield, 
  ExternalLink, Share2, Eye, RotateCcw, AlertCircle 
} from 'lucide-react';

interface AdminSEOModuleProps {
  onRefresh: () => void;
}

const AdminSEOModule: React.FC<AdminSEOModuleProps> = ({ onRefresh }) => {
  const [seo, setSeo] = useState<SEOSettings>(() => adminStore.getSEO());
  const [saved, setSaved] = useState(false);
  const [activePreview, setActivePreview] = useState<'google' | 'social'>('google');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.updateSEO(seo);
    setSaved(true);
    onRefresh();
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset SEO settings to recommended defaults for Telangana?")) {
      const reset = adminStore.updateSEO({
        metaTitle: 'RAKS IT SOLUTIONS | Premier Software & SEO Agency in Telangana',
        metaDescription: 'Expert Web Development, SEO, and Digital Marketing hub in Warangal, Hanamkonda & Hyderabad.',
        metaKeywords: 'Web Development Warangal, SEO Telangana, Software Company Hyderabad, App Development Hanamkonda',
        ogImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
        canonicalUrl: 'https://raksitsolutions.com',
        robotsIndex: true,
        robotsFollow: true,
        schemaEnabled: true
      });
      setSeo(reset);
      onRefresh();
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Globe className="w-3.5 h-3.5" /> Search Engine Optimization
          </div>
          <h2 className="text-xl font-bold text-white">SEO & Social Meta Configuration</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure global meta tags, OpenGraph sharing cards, robots indexing directives, and Schema.org structured data.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Defaults
          </button>

          {saved && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold">
              <Check className="w-4 h-4" /> SEO Saved!
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Core Meta Tags */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-emerald-400" /> Core Search Engine Meta Tags
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              These tags appear on Google search results and browser title bars.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-300 uppercase">
                  Global Meta Title *
                </label>
                <span className={`text-[11px] font-mono ${seo.metaTitle.length > 60 ? 'text-amber-400' : 'text-slate-500'}`}>
                  {seo.metaTitle.length} / 60 characters recommended
                </span>
              </div>
              <input
                type="text"
                required
                value={seo.metaTitle}
                onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
                placeholder="RAKS IT SOLUTIONS | Premier Software & SEO Agency in Telangana"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-300 uppercase">
                  Meta Description *
                </label>
                <span className={`text-[11px] font-mono ${seo.metaDescription.length > 160 ? 'text-amber-400' : 'text-slate-500'}`}>
                  {seo.metaDescription.length} / 160 characters recommended
                </span>
              </div>
              <textarea
                rows={3}
                required
                value={seo.metaDescription}
                onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
                placeholder="High-performing web development and digital marketing..."
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  value={seo.metaKeywords}
                  onChange={(e) => setSeo({ ...seo, metaKeywords: e.target.value })}
                  placeholder="Web Dev Warangal, SEO Telangana, Software Company"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Canonical URL
                </label>
                <input
                  type="url"
                  value={seo.canonicalUrl}
                  onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
                  placeholder="https://raksitsolutions.com"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Social Share Image (Open Graph / Twitter Card)
              </label>
              <input
                type="text"
                value={seo.ogImage}
                onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* ROBOTS & INDEXING DIRECTIVES */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" /> Search Engine Crawler Directives (Robots)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Control how Google, Bing, and web bots index your pages.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">Googlebot Indexing (index)</div>
                <div className="text-xs text-slate-400">Allow search engines to index this site in Google search.</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={seo.robotsIndex}
                  onChange={(e) => setSeo({ ...seo, robotsIndex: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">Follow Page Links (follow)</div>
                <div className="text-xs text-slate-400">Allow crawlers to follow hyperlinks on your pages.</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={seo.robotsFollow}
                  onChange={(e) => setSeo({ ...seo, robotsFollow: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* SCHEMA.ORG STRUCTURED DATA */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-purple-400" /> Schema.org Structured Data (JSON-LD)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Enables rich snippet cards on Google search results.</p>
            </div>
            <label className="flex items-center gap-2 text-xs font-semibold text-purple-400 cursor-pointer">
              <input
                type="checkbox"
                checked={seo.schemaEnabled}
                onChange={(e) => setSeo({ ...seo, schemaEnabled: e.target.checked })}
                className="rounded border-slate-700 text-purple-600 focus:ring-purple-600"
              />
              <span>Enable JSON-LD</span>
            </label>
          </div>

          {seo.schemaEnabled && (
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                Custom Schema.org JSON-LD Payload
              </label>
              <textarea
                rows={8}
                value={seo.customSchemaJson || ''}
                onChange={(e) => setSeo({ ...seo, customSchemaJson: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}
        </div>

        {/* LIVE SEARCH RESULT PREVIEW */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-400" /> Google SERP Snippet Preview
            </h3>
            <div className="flex gap-1 p-1 bg-slate-800 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setActivePreview('google')}
                className={`px-3 py-1 rounded-md font-semibold ${activePreview === 'google' ? 'bg-brand-blue text-white' : 'text-slate-400'}`}
              >
                Google Search
              </button>
              <button
                type="button"
                onClick={() => setActivePreview('social')}
                className={`px-3 py-1 rounded-md font-semibold ${activePreview === 'social' ? 'bg-brand-blue text-white' : 'text-slate-400'}`}
              >
                Social Share Card
              </button>
            </div>
          </div>

          {activePreview === 'google' ? (
            <div className="p-5 bg-white rounded-2xl border border-slate-200 text-left max-w-xl">
              <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">R</span>
                <span className="text-slate-700 font-medium">raksitsolutions.com</span>
                <span className="text-slate-400">› telangana › warangal</span>
              </div>
              <h4 className="text-lg font-semibold text-blue-700 hover:underline cursor-pointer leading-snug line-clamp-1">
                {seo.metaTitle || 'RAKS IT SOLUTIONS | Premier Software & SEO Agency in Telangana'}
              </h4>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                {seo.metaDescription || 'Expert Web Development, SEO, and Digital Marketing hub in Warangal, Hanamkonda & Hyderabad.'}
              </p>
            </div>
          ) : (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden max-w-md">
              <img
                src={seo.ogImage}
                alt="OG Preview"
                className="w-full h-44 object-cover"
              />
              <div className="p-4 space-y-1">
                <div className="text-[10px] font-mono text-slate-500 uppercase">raksitsolutions.com</div>
                <div className="text-sm font-bold text-white line-clamp-1">{seo.metaTitle}</div>
                <div className="text-xs text-slate-400 line-clamp-2">{seo.metaDescription}</div>
              </div>
            </div>
          )}
        </div>

        {/* Save CTA */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="submit"
            className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Save SEO Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSEOModule;
