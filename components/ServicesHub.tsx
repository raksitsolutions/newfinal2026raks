
import React from 'react';
import { SERVICES, renderIcon } from '../constants';
import { ArrowLeft, ArrowRight, Shield, Zap, Sparkles, Globe, MessageCircle } from 'lucide-react';

interface ServicesHubProps {
  onSelectService: (id: string) => void;
  onBack: () => void;
}

const ServicesHub: React.FC<ServicesHubProps> = ({ onSelectService, onBack }) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-blue text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-white/20 rounded-full blur-[150px] -mr-96 -mt-96"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-white/20 rounded-full blur-[120px] -ml-48 -mb-48"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button 
            onClick={onBack}
            className="inline-flex items-center text-brand-white/80 font-bold mb-8 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-7xl font-extrabold mb-8 leading-tight">
              Our Digital <br />
              <span className="text-brand-white">Expertise Hub.</span>
            </h1>
            <p className="text-xl text-brand-white/80 leading-relaxed mb-10">
              From Search Engine Dominance to High-Performance Cloud Hosting, we provide the full spectrum of IT solutions to help your Telangana business lead the digital frontier.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm">
                <Sparkles className="w-4 h-4 text-blue-400 mr-2" /> AI-Driven Strategies
              </div>
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm">
                <Shield className="w-4 h-4 text-green-400 mr-2" /> Security-First Code
              </div>
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm">
                <Globe className="w-4 h-4 text-yellow-400 mr-2" /> Local Market Focus
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className="group relative bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full -mr-16 -mt-16 group-hover:bg-brand-blue transition-colors duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-brand-blue rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-brand-blue/10 group-hover:scale-110 transition-transform">
                  {renderIcon(service.icon, "w-8 h-8")}
                </div>
                
                <h3 className="text-2xl font-black text-brand-ash mb-4 group-hover:text-brand-blue transition-colors">{service.title}</h3>
                <p className="text-brand-ash/60 leading-relaxed mb-8">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-10">
                  {service.seo.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center text-xs font-bold text-brand-ash/40 uppercase tracking-tight">
                      <Zap className="w-3 h-3 text-brand-blue mr-2" /> {feat}
                    </div>
                  ))}
                </div>

                <div className="flex items-center text-brand-blue font-black uppercase text-xs tracking-widest group-hover:gap-2 transition-all">
                  Deep Dive into Solution <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-white py-24 border-y border-brand-ash/10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-brand-ash mb-6">Need a custom digital strategy?</h2>
          <p className="text-lg text-brand-ash/60 mb-10 max-w-2xl mx-auto">
            Our experts in Warangal and Hanamkonda are ready to build a roadmap for your brand's digital success.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => {
                const contactEl = document.getElementById('contact');
                if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-brand-blue text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-brand-blue/90 transition-all shadow-xl"
            >
              Start Your Project Consultation
            </button>
            <a 
              href="https://wa.me/919010591950"
              target="_blank"
              className="bg-green-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-green-700 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              Consult on WhatsApp <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesHub;
