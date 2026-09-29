
import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Map, Globe, Laptop, Building2, MapPin, Newspaper, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { SERVICES, INDUSTRIES, TELANGANA_CITIES, BLOG_POSTS } from '../constants';

interface SitemapProps {
  onBack: () => void;
  onSetRoute: (route: any) => void;
}

const Sitemap: React.FC<SitemapProps> = ({ onBack, onSetRoute }) => {
  return (
    <div className="bg-white min-h-screen pb-32">
      <div className="bg-brand-ash text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center text-brand-blue font-black uppercase text-xs tracking-widest mb-10 hover:text-brand-blue/80 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Site <span className="text-brand-blue">Map</span></h1>
          <p className="text-xl text-brand-white/60 max-w-2xl font-medium">A comprehensive directory of all pages and resources on RAKS IT SOLUTIONS.</p>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <Map className="w-full h-full text-brand-blue" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          {/* Main Pages */}
          <section>
            <h2 className="text-2xl font-black text-brand-ash mb-8 flex items-center gap-3">
              <Globe className="text-brand-blue w-6 h-6" /> Main Navigation
            </h2>
            <ul className="space-y-4">
              {[
                { name: 'Home', route: { type: 'home' } },
                { name: 'About Us', route: { type: 'about' } },
                { name: 'Services Hub', route: { type: 'services-hub' } },
                { name: 'Industries Hub', route: { type: 'industries-hub' } },
                { name: 'Blog Hub', route: { type: 'blog-hub' } },
                { name: 'Gallery', route: { type: 'gallery' } },
                { name: 'Contact Us', route: { type: 'contact-page' } },
                { name: 'Logo Generator', route: { type: 'logo-generator' } },
                { name: 'Image AI Generator', route: { type: 'image-ai' } },
                { name: 'Case Studies', route: { type: 'case-studies' } },
                { name: 'Frequently Asked Questions (FAQ)', route: { type: 'home' } },
                { name: 'Terms & Conditions', route: { type: 'terms' } },
                { name: 'Privacy Policy', route: { type: 'privacy' } },
              ].map((link, i) => (
                <li key={i}>
                  <button 
                    onClick={() => onSetRoute(link.route)}
                    className="text-brand-ash/80 hover:text-brand-blue font-bold transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-ash/30 rounded-full group-hover:bg-brand-blue transition-colors"></span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-2xl font-black text-brand-ash mb-8 flex items-center gap-3">
              <Laptop className="text-brand-blue w-6 h-6" /> Services
            </h2>
            <ul className="space-y-4">
              {SERVICES.map((service, i) => (
                <li key={i}>
                  <button 
                    onClick={() => onSetRoute({ type: 'service', id: service.id })}
                    className="text-brand-ash/80 hover:text-brand-blue font-bold transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-ash/30 rounded-full group-hover:bg-brand-blue transition-colors"></span>
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Industries */}
          <section>
            <h2 className="text-2xl font-black text-brand-ash mb-8 flex items-center gap-3">
              <Building2 className="text-brand-blue w-6 h-6" /> Industries
            </h2>
            <ul className="space-y-4">
              {INDUSTRIES.map((industry, i) => (
                <li key={i}>
                  <button 
                    onClick={() => onSetRoute({ type: 'industry', id: industry.id })}
                    className="text-brand-ash/80 hover:text-brand-blue font-bold transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-ash/30 rounded-full group-hover:bg-brand-blue transition-colors"></span>
                    {industry.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Locations */}
          <section className="lg:col-span-2">
            <h2 className="text-2xl font-black text-brand-ash mb-8 flex items-center gap-3">
              <MapPin className="text-brand-blue w-6 h-6" /> Locations (Telangana)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {TELANGANA_CITIES.map((city, i) => (
                <button 
                  key={i}
                  onClick={() => onSetRoute({ type: 'location', id: city.city })}
                  className="text-left text-brand-ash/80 hover:text-brand-blue font-bold transition-colors flex items-center gap-2 group bg-brand-ash/5 p-3 rounded-xl border border-transparent hover:border-brand-blue/40 hover:bg-white"
                >
                  <span className="w-1.5 h-1.5 bg-brand-ash/30 rounded-full group-hover:bg-brand-blue transition-colors"></span>
                  {city.city}
                </button>
              ))}
            </div>
          </section>

          {/* Blog Posts */}
          <section>
            <h2 className="text-2xl font-black text-brand-ash mb-8 flex items-center gap-3">
              <Newspaper className="text-brand-blue w-6 h-6" /> Recent Articles
            </h2>
            <ul className="space-y-4">
              {BLOG_POSTS.map((post, i) => (
                <li key={i}>
                  <button 
                    onClick={() => onSetRoute({ type: 'blog-post', id: post.id })}
                    className="text-brand-ash/80 hover:text-brand-blue font-bold transition-colors flex items-center gap-2 group text-left"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-ash/30 rounded-full group-hover:bg-brand-blue transition-colors flex-shrink-0"></span>
                    {post.title}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
