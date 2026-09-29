import React, { useState, useEffect } from 'react';
import { 
  Facebook, Twitter, Instagram, Linkedin, Youtube, Github, 
  Heart, MessageCircle, Send, Shield, Phone, Mail, MapPin 
} from 'lucide-react';
import { AppSection, Route, NavigationMenuItem, SocialLink, BrandingSettings, WhatsAppSettings, ContactDetailsSettings } from '../types';
import { TELANGANA_CITIES } from '../constants';
import BrandLogo from './BrandLogo';
import { adminStore } from '../services/adminStore';

interface FooterProps {
  onNavigate: (section: AppSection) => void;
  onSetRoute: (route: Route) => void;
}

const SOCIAL_ICON_MAP: Record<string, any> = {
  'facebook': Facebook,
  'twitter': Twitter,
  'twitter / x': Twitter,
  'instagram': Instagram,
  'linkedin': Linkedin,
  'youtube': Youtube,
  'github': Github
};

const Footer: React.FC<FooterProps> = ({ onNavigate, onSetRoute }) => {
  const [branding, setBranding] = useState<BrandingSettings>(() => adminStore.getBranding());
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => adminStore.getSocialLinks());
  const [menus, setMenus] = useState<NavigationMenuItem[]>(() => adminStore.getNavigationMenus());
  const [whatsapp, setWhatsapp] = useState<WhatsAppSettings>(() => adminStore.getWhatsApp());
  const [contact, setContact] = useState<ContactDetailsSettings>(() => adminStore.getContactDetails());

  useEffect(() => {
    const unsub = adminStore.subscribe(() => {
      setBranding(adminStore.getBranding());
      setSocialLinks(adminStore.getSocialLinks());
      setMenus(adminStore.getNavigationMenus());
      setWhatsapp(adminStore.getWhatsApp());
      setContact(adminStore.getContactDetails());
    });
    return () => unsub();
  }, []);

  const activeFooterMenus = menus
    .filter(m => m.isActive && m.showInFooter)
    .sort((a, b) => a.order - b.order);

  const exploreMenus = activeFooterMenus.filter(m => m.category === 'Explore Hub' || !m.category);
  const legalMenus = activeFooterMenus.filter(m => m.category === 'Legal');

  const activeSocials = socialLinks.filter(s => s.isActive && s.showInFooter);
  const cleanPhone = whatsapp.phoneNumber.replace(/[^0-9]/g, '');

  const handleMenuClick = (item: NavigationMenuItem) => {
    if (item.externalUrl) {
      window.open(item.externalUrl, item.target || '_blank');
      return;
    }

    if (item.routeType === 'home' && item.label.toLowerCase().includes('faq')) {
      onSetRoute({ type: 'home' });
      setTimeout(() => {
        const el = document.getElementById('faq');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    onSetRoute({
      type: item.routeType,
      id: item.routeId
    });
  };

  return (
    <footer className="bg-brand-ash text-brand-white/80 pt-20 pb-10 border-t border-brand-ash/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand & Bio */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center text-white mb-6">
              <BrandLogo className="h-11 sm:h-12 w-auto" variant="light" />
            </div>

            <p className="max-w-sm mb-6 text-sm text-slate-300 leading-relaxed">
              {branding.footerDescription || "Leading the digital revolution in Telangana. Providing world-class software and marketing solutions from Warangal to the global stage."}
            </p>

            {contact.showInFooter && (
              <div className="space-y-2 mb-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>{contact.phonePrimary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>{contact.emailPrimary}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>{contact.addressLine1}, {contact.addressLine2}</span>
                </div>
              </div>
            )}

            {/* Dynamic Social Links */}
            <div className="flex flex-wrap gap-2.5">
              {activeSocials.map((soc) => {
                const Icon = SOCIAL_ICON_MAP[soc.platform.toLowerCase()] || GlobeIcon;
                return (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    title={`${soc.platform} (${soc.handle})`}
                    className="w-9 h-9 bg-brand-blue/20 rounded-full flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all text-slate-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore Hub Dynamic Menus */}
          <div>
            <h4 className="text-white font-bold mb-6">Explore Hub</h4>
            <ul className="space-y-3.5 text-sm">
              {exploreMenus.map((m) => (
                <li key={m.id}>
                  <button
                    onClick={() => handleMenuClick(m)}
                    className="hover:text-brand-blue transition-colors text-left flex items-center gap-1.5"
                  >
                    {m.routeType === 'admin' && <Shield className="w-3 h-3 text-blue-400" />}
                    <span>{m.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Local Offices */}
          <div>
            <h4 className="text-white font-bold mb-6">Local Offices</h4>
            <ul className="space-y-3 text-sm">
              {TELANGANA_CITIES.slice(0, 8).map((c, idx) => (
                <li key={`${c.city}-${idx}`}>
                  <button
                    onClick={() => onSetRoute({ type: 'location', id: c.city })}
                    className="hover:text-brand-blue transition-colors text-left text-slate-300"
                  >
                    {c.city}, Telangana
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onSetRoute({ type: 'sitemap' })}
                  className="text-brand-blue font-bold hover:underline"
                >
                  View All Locations →
                </button>
              </li>
            </ul>
          </div>

          {/* WhatsApp Chat Box */}
          <div className="bg-white/5 p-7 rounded-[2rem] border border-white/10 flex flex-col justify-between">
            <div>
              <h4 className="text-white font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                <MessageCircle className="text-green-500 w-4 h-4" /> WhatsApp Consultation
              </h4>
              <p className="text-xs mb-6 text-slate-300 leading-relaxed">
                Connect directly with our Telangana solutions architect via WhatsApp for project estimates.
              </p>
            </div>

            <a 
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsapp.defaultMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3.5 rounded-xl font-bold text-xs transition-all shadow-xl hover:-translate-y-0.5"
            >
              Chat on WhatsApp <Send className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Developed By Bar */}
        <div className="pt-8 border-t border-brand-ash/20 flex flex-col md:flex-row justify-between items-center text-xs gap-4 text-slate-400">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-6">
            <span>{branding.copyrightText || "© 2026 RAKS IT SOLUTIONS. All rights reserved."}</span>

            {/* Legal Links */}
            {legalMenus.map((leg) => (
              <button
                key={leg.id}
                onClick={() => handleMenuClick(leg)}
                className="hover:text-brand-blue transition-colors"
              >
                {leg.label}
              </button>
            ))}

            <button onClick={() => onSetRoute({ type: 'terms' })} className="hover:text-brand-blue transition-colors">Terms</button>
            <button onClick={() => onSetRoute({ type: 'privacy' })} className="hover:text-brand-blue transition-colors">Privacy</button>
            <button onClick={() => onSetRoute({ type: 'sitemap' })} className="hover:text-brand-blue transition-colors">Sitemap</button>
            <button onClick={() => onSetRoute({ type: 'admin' })} className="hover:text-brand-blue transition-colors text-slate-400">Admin Login</button>
          </div>

          {/* Developed By Attribution */}
          {branding.showDevelopedBy && (
            <div className="flex items-center text-slate-400 font-medium">
              <span>{branding.developedByText || "Developed by Raks IT Solutions"}</span>
              <Heart className="w-3.5 h-3.5 text-red-500 mx-1.5 fill-red-500" />
              <span>Warangal, Telangana</span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

export default Footer;
