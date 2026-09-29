import React, { useState } from 'react';
import { ContactDetailsSettings } from '../../types';
import { adminStore } from '../../services/adminStore';
import { 
  Phone, Mail, MapPin, Clock, Check, Globe, 
  ExternalLink, Sparkles, Building2, Send 
} from 'lucide-react';

interface AdminContactModuleProps {
  onRefresh: () => void;
}

const AdminContactModule: React.FC<AdminContactModuleProps> = ({ onRefresh }) => {
  const [contact, setContact] = useState<ContactDetailsSettings>(() => adminStore.getContactDetails());
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.updateContactDetails(contact);
    setSaved(true);
    onRefresh();
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Banner */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5" /> Corporate Address & Phone
          </div>
          <h2 className="text-xl font-bold text-white">Company Contact Details & Hours</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Update phone numbers, official email addresses, physical office address, and business operating hours.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold animate-in fade-in">
            <Check className="w-4 h-4" /> Contact Info Updated!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Phone & Email Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-400" /> Official Phone Numbers & Email Addresses
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">These will be rendered across the website header, footer, and contact page.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Primary Phone Number *
              </label>
              <input
                type="text"
                required
                value={contact.phonePrimary}
                onChange={(e) => setContact({ ...contact, phonePrimary: e.target.value })}
                placeholder="+91 90105 91950"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Secondary / Helpline Number
              </label>
              <input
                type="text"
                value={contact.phoneSecondary}
                onChange={(e) => setContact({ ...contact, phoneSecondary: e.target.value })}
                placeholder="+91 98480 12345"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Primary General Email *
              </label>
              <input
                type="email"
                required
                value={contact.emailPrimary}
                onChange={(e) => setContact({ ...contact, emailPrimary: e.target.value })}
                placeholder="hello@raksitsolutions.com"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Customer Support Email
              </label>
              <input
                type="email"
                value={contact.emailSupport}
                onChange={(e) => setContact({ ...contact, emailSupport: e.target.value })}
                placeholder="support@raksitsolutions.com"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
          </div>
        </div>

        {/* Physical Office Address & Maps */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-400" /> Physical Headquarters & Office Address
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Tri-city hub address in Warangal & Hanamkonda, Telangana.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Address Line 1 (Building / Plot / Street)
              </label>
              <input
                type="text"
                value={contact.addressLine1}
                onChange={(e) => setContact({ ...contact, addressLine1: e.target.value })}
                placeholder="Plot #45, Diamond Block, Subedari"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Address Line 2 (City / State / Pincode)
              </label>
              <input
                type="text"
                value={contact.addressLine2}
                onChange={(e) => setContact({ ...contact, addressLine2: e.target.value })}
                placeholder="Hanamkonda, Warangal, Telangana - 506001"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Business Operating Hours
                </label>
                <input
                  type="text"
                  value={contact.businessHours}
                  onChange={(e) => setContact({ ...contact, businessHours: e.target.value })}
                  placeholder="Mon - Fri: 9 AM - 7 PM, Sat: 10 AM - 4 PM"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Google Maps Location Link
                </label>
                <input
                  type="url"
                  value={contact.mapsUrl}
                  onChange={(e) => setContact({ ...contact, mapsUrl: e.target.value })}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue font-mono text-xs"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 p-4 bg-slate-800/40 rounded-xl border border-slate-800">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={contact.showInContactPage}
                  onChange={(e) => setContact({ ...contact, showInContactPage: e.target.checked })}
                  className="rounded border-slate-700 text-brand-blue focus:ring-brand-blue"
                />
                <span>Display on /contact-us page</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={contact.showInFooter}
                  onChange={(e) => setContact({ ...contact, showInFooter: e.target.checked })}
                  className="rounded border-slate-700 text-brand-blue focus:ring-brand-blue"
                />
                <span>Display in Website Footer</span>
              </label>
            </div>
          </div>
        </div>

        {/* Live Output Preview */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Contact Information Live Card Preview
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-xs text-blue-400 font-bold uppercase mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> Call Lines
              </div>
              <div className="text-sm font-bold text-white">{contact.phonePrimary}</div>
              <div className="text-xs text-slate-400">{contact.phoneSecondary}</div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-xs text-emerald-400 font-bold uppercase mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Official Inquiries
              </div>
              <div className="text-sm font-bold text-white truncate">{contact.emailPrimary}</div>
              <div className="text-xs text-slate-400 truncate">{contact.emailSupport}</div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-xs text-purple-400 font-bold uppercase mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Office Hours
              </div>
              <div className="text-xs font-bold text-white">{contact.businessHours}</div>
              <div className="text-[11px] text-slate-400 truncate">{contact.addressLine1}</div>
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
            <span>Save Contact Information</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminContactModule;
