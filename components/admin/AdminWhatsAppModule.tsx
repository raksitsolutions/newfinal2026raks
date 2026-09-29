import React, { useState } from 'react';
import { WhatsAppSettings } from '../../types';
import { adminStore } from '../../services/adminStore';
import { 
  MessageCircle, Check, Send, Phone, Clock, Eye, 
  ExternalLink, Sparkles, RotateCcw 
} from 'lucide-react';

interface AdminWhatsAppModuleProps {
  onRefresh: () => void;
}

const AdminWhatsAppModule: React.FC<AdminWhatsAppModuleProps> = ({ onRefresh }) => {
  const [wa, setWa] = useState<WhatsAppSettings>(() => adminStore.getWhatsApp());
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.updateWhatsApp(wa);
    setSaved(true);
    onRefresh();
    setTimeout(() => setSaved(false), 3000);
  };

  const handleTestLink = () => {
    const cleanNum = wa.phoneNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNum}?text=${encodeURIComponent(wa.defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Banner */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-2">
            <MessageCircle className="w-3.5 h-3.5" /> Instant Messaging
          </div>
          <h2 className="text-xl font-bold text-white">WhatsApp Chat & Widget Controls</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure direct WhatsApp lead routing, customize automated greetings, and toggle the floating widget.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold animate-in fade-in">
            <Check className="w-4 h-4" /> WhatsApp Settings Updated!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Phone & Messaging Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-400" /> WhatsApp Number & Default Greeting
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Inquiries will be routed directly to this verified business number.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                wa.floatingButtonVisible
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-800 text-slate-500 border-slate-700'
              }`}>
                {wa.floatingButtonVisible ? 'Widget Visible' : 'Widget Hidden'}
              </span>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={wa.floatingButtonVisible}
                  onChange={(e) => setWa({ ...wa, floatingButtonVisible: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                WhatsApp Phone Number (with Country Code) *
              </label>
              <input
                type="text"
                required
                value={wa.phoneNumber}
                onChange={(e) => setWa({ ...wa, phoneNumber: e.target.value })}
                placeholder="919010591950"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Do not include '+' or spaces (e.g. 919010591950 for India).
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Button Position on Screen
              </label>
              <select
                value={wa.buttonPosition}
                onChange={(e) => setWa({ ...wa, buttonPosition: e.target.value as 'right' | 'left' })}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="right">Bottom Right Corner (Default)</option>
                <option value="left">Bottom Left Corner</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
              Default Pre-Filled Inquiry Message *
            </label>
            <textarea
              rows={3}
              required
              value={wa.defaultMessage}
              onChange={(e) => setWa({ ...wa, defaultMessage: e.target.value })}
              placeholder="Hello RAKS IT SOLUTIONS, I'm interested in your services."
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Floating Button Hover Label
              </label>
              <input
                type="text"
                value={wa.hoverText}
                onChange={(e) => setWa({ ...wa, hoverText: e.target.value })}
                placeholder="Chat on WhatsApp"
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Online Availability Status Text
              </label>
              <input
                type="text"
                value={wa.agentStatus}
                onChange={(e) => setWa({ ...wa, agentStatus: e.target.value })}
                placeholder="Online • Fast Response"
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>
          </div>
        </div>

        {/* Live Widget Preview & Test */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Eye className="w-4 h-4 text-green-400" /> Interactive Widget Preview
            </h3>

            <button
              type="button"
              onClick={handleTestLink}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600/20 text-green-400 hover:bg-green-600/30 border border-green-500/30 rounded-lg text-xs font-bold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Test Open WhatsApp
            </button>
          </div>

          <div className="p-8 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between min-h-[120px] relative overflow-hidden">
            <div className="space-y-1">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                <span>{wa.agentStatus || 'Online • Fast Response'}</span>
              </div>
              <div className="text-xs text-slate-400 max-w-sm">
                Message: "{wa.defaultMessage}"
              </div>
            </div>

            {/* Mock Floating Button */}
            <div className="flex items-center gap-2 bg-green-600 text-white p-3.5 rounded-full shadow-2xl hover:bg-green-700 cursor-pointer transition-all">
              <span className="text-xs font-bold px-2 whitespace-nowrap">{wa.hoverText}</span>
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="submit"
            className="px-8 py-3.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-green-600/30 transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Save WhatsApp Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminWhatsAppModule;
