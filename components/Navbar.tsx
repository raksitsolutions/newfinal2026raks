import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronDown, MapPin, Grid, Briefcase, Info, 
  Home, BookOpen, Laptop, Smartphone, TrendingUp, MessageCircle, 
  Sparkles, HelpCircle, Shield, Phone, ExternalLink 
} from 'lucide-react';
import { AppSection, Route, NavigationMenuItem } from '../types';
import { TELANGANA_CITIES, SERVICES, INDUSTRIES, renderIcon } from '../constants';
import BrandLogo from './BrandLogo';
import { adminStore } from '../services/adminStore';

interface NavbarProps {
  activeSection: AppSection;
  onNavigate: (section: AppSection) => void;
  onSetRoute: (route: Route) => void;
  onOpenAI: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onSetRoute, onOpenAI }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'locations' | 'services' | 'industries' | null>(null);
  const [menuItems, setMenuItems] = useState<NavigationMenuItem[]>(() => adminStore.getNavigationMenus());
  const [waSettings, setWaSettings] = useState(() => adminStore.getWhatsApp());

  useEffect(() => {
    const unsub = adminStore.subscribe(() => {
      setMenuItems(adminStore.getNavigationMenus());
      setWaSettings(adminStore.getWhatsApp());
    });
    return () => unsub();
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  // Active header menus ordered
  const headerMenus = menuItems
    .filter(m => m.isActive && m.showInHeader)
    .sort((a, b) => a.order - b.order);

  const handleMenuClick = (item: NavigationMenuItem) => {
    closeMenu();
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

  const cleanPhone = waSettings.phoneNumber.replace(/[^0-9]/g, '');

  return (
    <nav className="sticky top-0 z-50 bg-brand-white/95 backdrop-blur-md border-b border-brand-ash/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Brand Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group py-1" 
            onClick={() => { onSetRoute({ type: 'home' }); closeMenu(); }}
          >
            <BrandLogo className="h-10 sm:h-12 w-auto transition-transform group-hover:scale-[1.02]" variant="dark" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-5">
            {/* Dynamic items from Admin navigation menus */}
            {headerMenus.map((item) => {
              // Special case: Services Dropdown
              if (item.routeType === 'services-hub') {
                return (
                  <div key={item.id} className="relative">
                    <button 
                      className="flex items-center text-[11px] font-black text-brand-ash hover:text-brand-blue transition-colors py-8 uppercase tracking-widest"
                      onMouseEnter={() => setActiveDropdown('services')}
                      onMouseLeave={() => setActiveDropdown(null)}
                      onClick={() => handleMenuClick(item)}
                    >
                      {item.label} <ChevronDown className="ml-1 w-3 h-3" />
                    </button>
                    <div 
                      onMouseEnter={() => setActiveDropdown('services')}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className={`absolute top-[90%] left-[-100%] w-[550px] bg-brand-white shadow-2xl rounded-3xl border border-brand-ash/10 overflow-hidden transition-all grid grid-cols-2 gap-2 p-4 ${
                        activeDropdown === 'services' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
                      }`}
                    >
                      <button
                        onClick={() => { onSetRoute({ type: 'services-hub' }); closeMenu(); }}
                        className="col-span-2 flex items-center gap-3 p-3 mb-2 rounded-xl bg-brand-blue/10 text-brand-blue font-black uppercase text-[10px] hover:bg-brand-blue/20 transition-all"
                      >
                        <Grid className="w-4 h-4" /> View All Services
                      </button>
                      {SERVICES.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => { onSetRoute({ type: 'service', id: s.id }); closeMenu(); }}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-blue/5 text-left transition-all group"
                        >
                          <div className="w-8 h-8 bg-brand-blue/10 text-brand-blue rounded-lg flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all">
                            {renderIcon(s.icon, "w-4 h-4")}
                          </div>
                          <span className="text-[10px] font-black text-brand-ash uppercase tracking-tight">{s.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }

              // Special case: Industries Dropdown
              if (item.routeType === 'industries-hub') {
                return (
                  <div key={item.id} className="relative">
                    <button 
                      className="flex items-center text-[11px] font-black text-brand-ash hover:text-brand-blue transition-colors py-8 uppercase tracking-widest"
                      onMouseEnter={() => setActiveDropdown('industries')}
                      onMouseLeave={() => setActiveDropdown(null)}
                      onClick={() => handleMenuClick(item)}
                    >
                      {item.label} <ChevronDown className="ml-1 w-3 h-3" />
                    </button>
                    <div 
                      onMouseEnter={() => setActiveDropdown('industries')}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className={`absolute top-[90%] left-[-50%] w-64 bg-brand-white shadow-2xl rounded-3xl border border-brand-ash/10 overflow-hidden transition-all p-2 ${
                        activeDropdown === 'industries' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
                      }`}
                    >
                      <button
                        onClick={() => { onSetRoute({ type: 'industries-hub' }); closeMenu(); }}
                        className="w-full flex items-center gap-3 p-3 mb-2 rounded-xl bg-brand-blue/10 text-brand-blue font-black uppercase text-[10px] hover:bg-brand-blue/20 transition-all"
                      >
                        <Briefcase className="w-4 h-4" /> All Industries
                      </button>
                      {INDUSTRIES.map((ind) => (
                        <button
                          key={ind.id}
                          onClick={() => { onSetRoute({ type: 'industry', id: ind.id }); closeMenu(); }}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-brand-blue/5 text-left transition-all"
                        >
                          <span className="text-[10px] font-black text-brand-ash uppercase">{ind.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }

              // Admin Portal Link styling
              if (item.routeType === 'admin') {
                return (
                  <button 
                    key={item.id}
                    onClick={() => handleMenuClick(item)} 
                    className="text-[10px] font-black text-slate-500 hover:text-brand-blue transition-all uppercase tracking-wider flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 hover:border-brand-blue/40 hover:bg-brand-blue/5"
                    title="Staff Admin Login Portal"
                  >
                    <Shield className="w-3 h-3 text-brand-blue" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              // Standard Navigation Link
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item)}
                  className="text-[11px] font-black text-brand-ash hover:text-brand-blue transition-colors uppercase tracking-widest flex items-center gap-1.5 whitespace-nowrap"
                >
                  {item.label}
                </button>
              );
            })}

            {/* Locations Dropdown always accessible */}
            <div className="relative">
              <button 
                className="flex items-center text-[11px] font-black text-brand-ash hover:text-brand-blue transition-colors py-8 uppercase tracking-widest"
                onMouseEnter={() => setActiveDropdown('locations')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                Locations <ChevronDown className="ml-1 w-3 h-3" />
              </button>
              <div 
                onMouseEnter={() => setActiveDropdown('locations')}
                onMouseLeave={() => setActiveDropdown(null)}
                className={`absolute top-[90%] left-[-50%] w-64 bg-brand-white shadow-2xl rounded-3xl border border-brand-ash/10 overflow-hidden transition-all p-2 max-h-[400px] overflow-y-auto ${
                  activeDropdown === 'locations' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
                }`}
              >
                {TELANGANA_CITIES.map((city) => (
                  <button
                    key={`${city.city}-${city.region}`}
                    onClick={() => { onSetRoute({ type: 'location', id: city.city }); closeMenu(); }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-brand-blue/5 text-left transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                    <span className="text-[10px] font-black text-brand-ash uppercase">{city.city}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => {
                const contactEl = document.getElementById('contact');
                if (contactEl) {
                  contactEl.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onSetRoute({ type: 'contact-page' });
                }
              }}
              className="bg-brand-blue text-white px-5 py-2.5 rounded-full text-[10px] font-black shadow-lg hover:bg-brand-blue/90 transition-all uppercase whitespace-nowrap"
            >
              Get Started
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-brand-ash p-2">
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen border-t' : 'max-h-0'}`}>
        <div className="px-6 py-8 space-y-3 bg-brand-white max-h-[90vh] overflow-y-auto">
          {headerMenus.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className="w-full text-left font-black text-brand-ash uppercase text-xs tracking-widest py-2.5 flex items-center justify-between border-b border-slate-100"
            >
              <span>{item.label}</span>
              {item.routeType === 'admin' && <Shield className="w-4 h-4 text-brand-blue" />}
            </button>
          ))}

          <div className="py-2">
            <p className="text-[10px] font-black text-brand-ash/40 uppercase tracking-widest mb-2">Our Locations</p>
            <div className="grid grid-cols-2 gap-2">
              {TELANGANA_CITIES.slice(0, 6).map((city) => (
                <button 
                  key={`${city.city}-mobile`}
                  onClick={() => { onSetRoute({ type: 'location', id: city.city }); closeMenu(); }}
                  className="text-left text-[10px] font-bold text-brand-ash hover:text-brand-blue py-1"
                >
                  • {city.city}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => { onOpenAI(); closeMenu(); }} className="w-full bg-brand-blue text-white p-4 rounded-2xl font-black flex items-center justify-center gap-3 uppercase text-xs mt-3">
            <Sparkles className="w-4 h-4" /> AI Consultant
          </button>

          <a 
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(waSettings.defaultMessage)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-green-600 text-white p-4 rounded-2xl font-black flex items-center justify-center gap-3 uppercase text-xs mt-2"
          >
            WhatsApp Us <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
