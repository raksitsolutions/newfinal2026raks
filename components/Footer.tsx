
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Heart, MessageCircle, Send } from 'lucide-react';
import { AppSection, Route } from '../types';
import { TELANGANA_CITIES, SERVICES } from '../constants';

interface FooterProps {
  onNavigate: (section: AppSection) => void;
  onSetRoute: (route: Route) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onSetRoute }) => {
  return (
    <footer className="bg-brand-ash text-brand-white/80 pt-20 pb-10 border-t border-brand-ash/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center text-white mb-6">
              <div className="w-8 h-8 bg-brand-blue rounded-md flex items-center justify-center font-bold text-lg mr-2">R</div>
              <span className="text-xl font-bold">RAKS IT SOLUTIONS</span>
            </div>
            <p className="max-w-xs mb-8">
              Leading the digital revolution in Telangana. Providing world-class software and marketing solutions from Warangal to the global stage.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-brand-blue/20 rounded-full flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 bg-brand-blue/20 rounded-full flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 bg-brand-blue/20 rounded-full flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 bg-brand-blue/20 rounded-full flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Explore Hub</h4>
            <ul className="space-y-4">
              <li><button onClick={() => onSetRoute({ type: 'home' })} className="hover:text-brand-blue transition-colors">Home</button></li>
              <li><button onClick={() => onSetRoute({ type: 'about' })} className="hover:text-brand-blue transition-colors">About Us</button></li>
              <li><button onClick={() => onSetRoute({ type: 'services-hub' })} className="hover:text-brand-blue transition-colors">Services Hub</button></li>
              <li><button onClick={() => onSetRoute({ type: 'industries-hub' })} className="hover:text-brand-blue transition-colors">Industries</button></li>
              <li><button onClick={() => onSetRoute({ type: 'image-ai' })} className="hover:text-brand-blue transition-colors">Image AI Generator</button></li>
              <li><button onClick={() => onSetRoute({ type: 'logo-generator' })} className="hover:text-brand-blue transition-colors">Logo Generator</button></li>
              <li><button onClick={() => onSetRoute({ type: 'case-studies' })} className="hover:text-brand-blue transition-colors">Case Studies</button></li>
              <li><button onClick={() => onSetRoute({ type: 'blog-hub' })} className="hover:text-brand-blue transition-colors">Blog</button></li>
              <li>
                <button 
                  onClick={() => {
                    onSetRoute({ type: 'home' });
                    setTimeout(() => {
                      const el = document.getElementById('faq');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }} 
                  className="hover:text-brand-blue transition-colors"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Local Offices</h4>
            <ul className="space-y-4 text-sm">
              {TELANGANA_CITIES.slice(0, 10).map((c, idx) => (
                <li key={`${c.city}-${idx}`}><button onClick={() => onSetRoute({ type: 'location', id: c.city })} className="hover:text-brand-blue transition-colors text-left">{c.city}, Telangana</button></li>
              ))}
              <li><button onClick={() => onSetRoute({ type: 'sitemap' })} className="text-brand-blue font-bold hover:underline">View All Locations</button></li>
            </ul>
          </div>

          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
              <MessageCircle className="text-green-500 w-4 h-4" /> WhatsApp Chat
            </h4>
            <p className="text-sm mb-6 text-slate-300">Start an instant project consultation with our experts via WhatsApp.</p>
            <a 
              href="https://wa.me/919010591950?text=Hello%20RAKS%20IT%20SOLUTIONS,%20I'm%20interested%20in%20your%20services." 
              target="_blank" 
              className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl font-black transition-all shadow-xl hover:-translate-y-1"
            >
              Chat on WhatsApp <Send className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pt-10 border-t border-brand-ash/20 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4 md:mb-0">
            <p>© 2026 RAKS IT SOLUTIONS. All rights reserved.</p>
            <button onClick={() => onSetRoute({ type: 'terms' })} className="hover:text-brand-blue transition-colors">Terms</button>
            <button onClick={() => onSetRoute({ type: 'privacy' })} className="hover:text-brand-blue transition-colors">Privacy</button>
            <button onClick={() => onSetRoute({ type: 'sitemap' })} className="hover:text-brand-blue transition-colors">Sitemap</button>
          </div>
          <div className="flex items-center">
            Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> in Warangal, Telangana
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
