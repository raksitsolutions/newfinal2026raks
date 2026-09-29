import React, { useState, useEffect } from 'react';
import { ArrowLeft, Map, Globe, Laptop, Building2, MapPin, Newspaper, FileText, ExternalLink } from 'lucide-react';
import { SERVICES, INDUSTRIES, TELANGANA_CITIES } from '../constants';
import { adminStore } from '../services/adminStore';
import { SitemapItem, CustomPage, BlogPost } from '../types';

interface SitemapProps {
  onBack: () => void;
  onSetRoute: (route: any) => void;
}

const Sitemap: React.FC<SitemapProps> = ({ onBack, onSetRoute }) => {
  const [sitemapItems, setSitemapItems] = useState<SitemapItem[]>(() => adminStore.getSitemapItems());
  const [customPages, setCustomPages] = useState<CustomPage[]>(() => adminStore.getPages());
  const [blogs, setBlogs] = useState<BlogPost[]>(() => adminStore.getBlogs());

  useEffect(() => {
    const unsub = adminStore.subscribe(() => {
      setSitemapItems(adminStore.getSitemapItems());
      setCustomPages(adminStore.getPages());
      setBlogs(adminStore.getBlogs());
    });
    return () => unsub();
  }, []);

  const activeSitemap = sitemapItems.filter(i => i.isActive && i.showInSitemapPage);
  const activeCustomPages = customPages.filter(p => p.status === 'Published');
  const activeBlogs = blogs.filter(b => b.status === 'Published' || !b.status);

  return (
    <div className="bg-white min-h-screen pb-32 font-sans">
      <div className="bg-brand-ash text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center text-brand-blue font-black uppercase text-xs tracking-widest mb-10 hover:text-brand-blue/80 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Site <span className="text-brand-blue">Map</span></h1>
          <p className="text-xl text-brand-white/60 max-w-2xl font-medium">
            A comprehensive directory of all verified pages, services, custom content, and locations on RAKS IT SOLUTIONS.
          </p>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <Map className="w-full h-full text-brand-blue" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          {/* Main Navigation from Admin Sitemap Directory */}
          <section>
            <h2 className="text-2xl font-black text-brand-ash mb-8 flex items-center gap-3">
              <Globe className="text-brand-blue w-6 h-6" /> Managed Sitemap URLs
            </h2>
            <ul className="space-y-4">
              {activeSitemap.map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => {
                      if (item.url === '/' || item.url === '/home') onSetRoute({ type: 'home' });
                      else if (item.url === '/about-us') onSetRoute({ type: 'about' });
                      else if (item.url === '/services') onSetRoute({ type: 'services-hub' });
                      else if (item.url === '/industries') onSetRoute({ type: 'industries-hub' });
                      else if (item.url === '/blog') onSetRoute({ type: 'blog-hub' });
                      else if (item.url === '/contact') onSetRoute({ type: 'contact-page' });
                      else if (item.url === '/case-studies') onSetRoute({ type: 'case-studies' });
                      else if (item.url === '/terms') onSetRoute({ type: 'terms' });
                      else if (item.url === '/privacy') onSetRoute({ type: 'privacy' });
                      else if (item.url.startsWith('/page/')) onSetRoute({ type: 'custom-page', id: item.url.replace('/page/', '') });
                      else if (item.url.startsWith('http')) window.open(item.url, '_blank');
                      else onSetRoute({ type: 'home' });
                    }}
                    className="text-brand-ash/80 hover:text-brand-blue font-bold transition-colors flex items-center gap-2 group text-left"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-ash/30 rounded-full group-hover:bg-brand-blue transition-colors flex-shrink-0"></span>
                    <span className="flex-1">{item.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{item.priority}</span>
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
                    className="text-brand-ash/80 hover:text-brand-blue font-bold transition-colors flex items-center gap-2 group text-left"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-ash/30 rounded-full group-hover:bg-brand-blue transition-colors flex-shrink-0"></span>
                    <span>{service.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Custom CMS Pages */}
          {activeCustomPages.length > 0 && (
            <section>
              <h2 className="text-2xl font-black text-brand-ash mb-8 flex items-center gap-3">
                <FileText className="text-brand-blue w-6 h-6" /> Custom Pages (CMS)
              </h2>
              <ul className="space-y-4">
                {activeCustomPages.map((page) => (
                  <li key={page.id}>
                    <button 
                      onClick={() => onSetRoute({ type: 'custom-page', id: page.slug })}
                      className="text-brand-ash/80 hover:text-brand-blue font-bold transition-colors flex items-center gap-2 group text-left"
                    >
                      <span className="w-1.5 h-1.5 bg-brand-blue rounded-full group-hover:scale-125 transition-transform flex-shrink-0"></span>
                      <span>{page.title}</span>
                      <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono">/page/{page.slug}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

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
                    className="text-brand-ash/80 hover:text-brand-blue font-bold transition-colors flex items-center gap-2 group text-left"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-ash/30 rounded-full group-hover:bg-brand-blue transition-colors flex-shrink-0"></span>
                    <span>{industry.name}</span>
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
                  <span>{city.city}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Blog Articles */}
          <section>
            <h2 className="text-2xl font-black text-brand-ash mb-8 flex items-center gap-3">
              <Newspaper className="text-brand-blue w-6 h-6" /> Recent Articles ({activeBlogs.length})
            </h2>
            <ul className="space-y-4">
              {activeBlogs.map((post) => (
                <li key={post.id}>
                  <button 
                    onClick={() => onSetRoute({ type: 'blog-post', id: post.id })}
                    className="text-brand-ash/80 hover:text-brand-blue font-bold transition-colors flex items-center gap-2 group text-left"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-ash/30 rounded-full group-hover:bg-brand-blue transition-colors flex-shrink-0"></span>
                    <span className="line-clamp-1">{post.title}</span>
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
