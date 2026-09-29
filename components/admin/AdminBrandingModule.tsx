import React, { useState } from 'react';
import { BrandingSettings } from '../../types';
import { adminStore } from '../../services/adminStore';
import BrandLogo from '../BrandLogo';
import { 
  Palette, Upload, Trash2, RotateCcw, Check, Sparkles, 
  Eye, Image as ImageIcon, ShieldCheck, Heart, Layout, Globe 
} from 'lucide-react';

interface AdminBrandingModuleProps {
  onRefresh: () => void;
}

const COLOR_PRESETS = [
  { name: 'Official RAKS Navy', primary: '#14387f', accent: '#2563eb', dark: '#0f172a' },
  { name: 'Enterprise Indigo', primary: '#1e1b4b', accent: '#4f46e5', dark: '#09090b' },
  { name: 'Modern Sapphire', primary: '#0369a1', accent: '#0284c7', dark: '#082f49' },
  { name: 'Cyber Teal', primary: '#0f766e', accent: '#0d9488', dark: '#042f2e' },
  { name: 'Royal Amethyst', primary: '#581c87', accent: '#7e22ce', dark: '#1e1035' }
];

const AdminBrandingModule: React.FC<AdminBrandingModuleProps> = ({ onRefresh }) => {
  const [branding, setBranding] = useState<BrandingSettings>(() => adminStore.getBranding());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, isWhite: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image file size should be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (isWhite) {
        setBranding(prev => ({ ...prev, logoWhiteUrl: result }));
      } else {
        setBranding(prev => ({ ...prev, logoUrl: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setBranding(prev => ({ ...prev, faviconUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.updateBranding(branding);
    setSavedSuccess(true);
    onRefresh();
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetToDefaultLogo = () => {
    if (window.confirm("Revert to the official vector RAKS IT SOLUTIONS logo?")) {
      const updated = adminStore.updateBranding({ logoUrl: '', logoWhiteUrl: '' });
      setBranding(updated);
      onRefresh();
    }
  };

  const handleResetFavicon = () => {
    if (window.confirm("Revert to the default RAKS favicon icon?")) {
      const updated = adminStore.updateBranding({ faviconUrl: '/raks-icon.svg' });
      setBranding(updated);
      onRefresh();
    }
  };

  const applyColorPreset = (preset: typeof COLOR_PRESETS[0]) => {
    setBranding(prev => ({
      ...prev,
      primaryColor: preset.primary,
      accentColor: preset.accent,
      darkColor: preset.dark
    }));
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Banner */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Palette className="w-3.5 h-3.5" /> Brand Identity & Aesthetics
          </div>
          <h2 className="text-xl font-bold text-white">Branding, Logo & Footer Studio</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Upload custom logos, update favicon, customize brand colors, and edit footer copyrights & attributions.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold animate-in fade-in">
            <Check className="w-4 h-4" /> Changes Applied Live!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* LOGO & FAVICON SECTION */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-400" /> Website Logo & Favicon
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Upload custom PNG/SVG files or provide direct image URLs.</p>
            </div>
            {(branding.logoUrl || branding.logoWhiteUrl) && (
              <button
                type="button"
                onClick={handleResetToDefaultLogo}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Revert to Official Vector SVG
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Primary Logo (Light Backgrounds) */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase">
                Primary Logo (Light Backgrounds)
              </label>

              {/* Logo Preview on Light BG */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 flex items-center justify-center min-h-[100px] relative group">
                <BrandLogo variant="dark" className="h-10 max-w-[280px]" />
                <span className="absolute bottom-2 right-2 text-[10px] text-slate-400 font-mono">Live Preview (Light)</span>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex-1 cursor-pointer">
                  <span className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-colors">
                    <Upload className="w-4 h-4" /> Upload New Logo (PNG/SVG)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(e, false)}
                    className="hidden"
                  />
                </label>

                {branding.logoUrl && (
                  <button
                    type="button"
                    onClick={() => setBranding(prev => ({ ...prev, logoUrl: '' }))}
                    className="p-2.5 text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700"
                    title="Delete custom upload"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div>
                <input
                  type="text"
                  value={branding.logoUrl || ''}
                  onChange={(e) => setBranding({ ...branding, logoUrl: e.target.value })}
                  placeholder="Or paste image URL (https://...)"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 font-mono"
                />
              </div>
            </div>

            {/* Dark Mode Logo (For Dark Footers & Headers) */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase">
                White/Contrast Logo (Dark Backgrounds)
              </label>

              {/* Logo Preview on Dark BG */}
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center min-h-[100px] relative group">
                <BrandLogo variant="light" className="h-10 max-w-[280px]" />
                <span className="absolute bottom-2 right-2 text-[10px] text-slate-500 font-mono">Live Preview (Dark)</span>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex-1 cursor-pointer">
                  <span className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-colors">
                    <Upload className="w-4 h-4" /> Upload White Variant
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(e, true)}
                    className="hidden"
                  />
                </label>

                {branding.logoWhiteUrl && (
                  <button
                    type="button"
                    onClick={() => setBranding(prev => ({ ...prev, logoWhiteUrl: '' }))}
                    className="p-2.5 text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700"
                    title="Delete white variant"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div>
                <input
                  type="text"
                  value={branding.logoWhiteUrl || ''}
                  onChange={(e) => setBranding({ ...branding, logoWhiteUrl: e.target.value })}
                  placeholder="Or paste white logo URL..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Favicon Settings */}
          <div className="pt-6 border-t border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase">
                  Website Browser Tab Favicon
                </label>
                <p className="text-xs text-slate-400">Updates the browser tab icon in real time.</p>
              </div>
              {branding.faviconUrl !== '/raks-icon.svg' && (
                <button
                  type="button"
                  onClick={handleResetFavicon}
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Revert Favicon
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-14 h-14 bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center p-2.5 flex-shrink-0">
                <img
                  src={branding.faviconUrl || '/raks-icon.svg'}
                  alt="Favicon Preview"
                  className="w-8 h-8 object-contain"
                />
              </div>

              <div className="flex-1 w-full space-y-2">
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer">
                    <span className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-colors">
                      <Upload className="w-3.5 h-3.5" /> Upload Favicon (.ico, .png, .svg)
                    </span>
                    <input
                      type="file"
                      accept=".ico,.png,.svg,image/*"
                      onChange={handleFaviconUpload}
                      className="hidden"
                    />
                  </label>

                  <input
                    type="text"
                    value={branding.faviconUrl || ''}
                    onChange={(e) => setBranding({ ...branding, faviconUrl: e.target.value })}
                    placeholder="/raks-icon.svg or URL"
                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BRAND COLORS CHOOSE OPTION */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-blue-400" /> Branding Colors Selection
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Choose your company's primary corporate color, button accents, and dark surface palette.
            </p>
          </div>

          {/* Quick Presets */}
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Color Palette Presets
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {COLOR_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applyColorPreset(p)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    branding.primaryColor === p.primary
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-800 bg-slate-800/40 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: p.primary }}></span>
                    <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: p.accent }}></span>
                    <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: p.dark }}></span>
                  </div>
                  <div className="text-xs font-bold text-white truncate">{p.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Color Pickers */}
          <div className="grid sm:grid-cols-3 gap-6 pt-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                Primary Brand Blue
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={branding.primaryColor || '#14387f'}
                  onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                  className="w-12 h-12 rounded-xl border-2 border-slate-700 bg-slate-800 cursor-pointer p-1"
                />
                <input
                  type="text"
                  value={branding.primaryColor || '#14387f'}
                  onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                  className="flex-1 px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                Accent / Button Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={branding.accentColor || '#2563eb'}
                  onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
                  className="w-12 h-12 rounded-xl border-2 border-slate-700 bg-slate-800 cursor-pointer p-1"
                />
                <input
                  type="text"
                  value={branding.accentColor || '#2563eb'}
                  onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
                  className="flex-1 px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                Dark Surface / Ash Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={branding.darkColor || '#0f172a'}
                  onChange={(e) => setBranding({ ...branding, darkColor: e.target.value })}
                  className="w-12 h-12 rounded-xl border-2 border-slate-700 bg-slate-800 cursor-pointer p-1"
                />
                <input
                  type="text"
                  value={branding.darkColor || '#0f172a'}
                  onChange={(e) => setBranding({ ...branding, darkColor: e.target.value })}
                  className="flex-1 px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm uppercase"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER DESIGN & ATTRIBUTION MODULE */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layout className="w-5 h-5 text-blue-400" /> Footer Design & Attribution Content
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize copyright declaration, developed-by credits, and agency description across the site footer.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                Copyright Notice Text
              </label>
              <input
                type="text"
                value={branding.copyrightText}
                onChange={(e) => setBranding({ ...branding, copyrightText: e.target.value })}
                placeholder="© 2026 RAKS IT SOLUTIONS. All rights reserved."
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Displayed on the bottom left of the public website footer.
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300 uppercase">
                  Developed By Attribution Text
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-blue-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={branding.showDevelopedBy}
                    onChange={(e) => setBranding({ ...branding, showDevelopedBy: e.target.checked })}
                    className="rounded border-slate-700 text-brand-blue focus:ring-brand-blue"
                  />
                  <span>Show Attribution</span>
                </label>
              </div>

              <input
                type="text"
                value={branding.developedByText}
                onChange={(e) => setBranding({ ...branding, developedByText: e.target.value })}
                placeholder="Developed by RAKS IT SOLUTIONS"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Credits link or agency watermark on the bottom right.
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
              Footer Agency Bio / Tagline Description
            </label>
            <textarea
              rows={3}
              value={branding.footerDescription}
              onChange={(e) => setBranding({ ...branding, footerDescription: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          {/* Live Footer Preview */}
          <div className="pt-4 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              Footer Output Live Preview
            </span>
            <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <BrandLogo variant="light" className="h-7" />
                <span className="text-xs text-slate-400 italic">"Experience full of ideas"</span>
              </div>
              <p className="text-xs text-slate-400 max-w-xl">{branding.footerDescription}</p>
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
                <div>{branding.copyrightText}</div>
                {branding.showDevelopedBy && (
                  <div className="text-blue-400 font-semibold flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    <span>{branding.developedByText}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="submit"
            className="px-8 py-3.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/30 transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Save & Apply Branding Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBrandingModule;
