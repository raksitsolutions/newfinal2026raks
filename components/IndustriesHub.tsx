
import React from 'react';
import { INDUSTRIES } from '../constants';
import { ArrowLeft, ArrowRight, Shield, Zap, TrendingUp, Globe, CheckCircle2, Star, Target, Layers } from 'lucide-react';

interface IndustriesHubProps {
  onSelectIndustry: (id: string) => void;
  onBack: () => void;
}

const IndustriesHub: React.FC<IndustriesHubProps> = ({ onSelectIndustry, onBack }) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Landing Section */}
      <section className="relative bg-brand-ash text-white pt-40 pb-32 overflow-hidden">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-ash/80 via-brand-ash to-brand-ash"></div>
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[150px] -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px] translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <button 
            onClick={onBack}
            className="inline-flex items-center text-brand-white/80 font-black uppercase text-xs tracking-[0.2em] mb-12 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Return to Main Hub
          </button>
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1] tracking-tight">
              Best Sector-Specific <br /><span className="text-brand-blue">Digital Growth.</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-white/60 leading-relaxed mb-12 max-w-3xl mx-auto font-medium">
              We translate complex business challenges into elegant digital products. From <strong>Hospital Management Systems in Warangal</strong> to <strong>Educational Tech in Hanamkonda</strong>, we lead the Telangana market.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white/5 border border-white/10 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-bold tracking-tight">Domain Specialized</span>
              </div>
              <div className="bg-white/5 border border-white/10 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-bold tracking-tight">Compliance Ready</span>
              </div>
              <div className="bg-white/5 border border-white/10 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-sm font-bold tracking-tight">Growth Focused</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global & Local Track Record Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: "Industries Transformed", value: "12+" },
              { label: "Successful Deployments", value: "200+" },
              { label: "Data-Secure Builds", value: "100%" },
              { label: "Market-Leading ROI", value: "10X" }
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 rounded-3xl bg-brand-white border border-brand-ash/5 group hover:border-brand-blue/20 transition-all">
                <p className="text-4xl font-black text-brand-ash mb-2 group-hover:text-brand-blue transition-colors">{stat.value}</p>
                <p className="text-xs font-bold text-brand-ash/40 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Industry Grid */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-xs font-black text-brand-blue uppercase tracking-[0.3em] mb-4">Our Vertical Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-black text-brand-ash leading-tight">
              Tailored Engineering for the Core of Telangana.
            </h3>
          </div>
          <p className="text-lg text-brand-ash/60 max-w-md font-medium">
            Generic code doesn't win markets. We build deep, vertical-specific integrations that solve the real-world problems of Hanamkonda & Warangal entrepreneurs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDUSTRIES.map((industry) => (
            <div 
              key={industry.id}
              onClick={() => onSelectIndustry(industry.id)}
              className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            >
              {/* Image Container with high quality overlays */}
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={industry.image} 
                  alt={industry.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-[0.1em] px-4 py-2 rounded-full">
                    {industry.name}
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                   <h4 className="text-2xl font-black text-white leading-tight mb-1">{industry.name}</h4>
                   <div className="w-12 h-1.5 bg-blue-500 rounded-full group-hover:w-24 transition-all duration-500"></div>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-brand-ash/60 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                  {industry.description}
                </p>
                
                <div className="space-y-3 mb-10">
                  {industry.seo.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center text-xs font-bold text-brand-ash uppercase tracking-tight">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue mr-3 flex-shrink-0" /> {feat}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-brand-ash/5">
                   <span className="text-[10px] font-black text-brand-ash/40 uppercase tracking-widest">Explore Vertical</span>
                   <div className="w-10 h-10 bg-brand-white rounded-xl flex items-center justify-center text-brand-ash group-hover:bg-brand-blue group-hover:text-white transition-all">
                      <ArrowRight className="w-5 h-5" />
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="bg-brand-ash py-32 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                How We Approach <br />
                <span className="text-brand-blue">New Frontiers.</span>
              </h2>
              <div className="space-y-10">
                {[
                  { icon: Target, title: "Immersion & Audit", desc: "We study your industry's specific pain points in the local Telangana market before writing a single line of code." },
                  { icon: Layers, title: "Modular Architecture", desc: "Our solutions are built with high-scalability modules that grow as your customer base in Warangal expands." },
                  { icon: Globe, title: "Regional Relevance", desc: "Every product is optimized for the linguistic and cultural nuances of the Telugu business diaspora." }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="w-14 h-14 bg-brand-blue/20 border border-brand-blue/30 rounded-2xl flex items-center justify-center text-brand-blue flex-shrink-0 shadow-lg shadow-brand-blue/10">
                      <step.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                      <p className="text-brand-white/60 leading-relaxed font-medium">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 rounded-[3rem] overflow-hidden border-[12px] border-white/5 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
                  alt="Industrial Tech" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-600 rounded-full blur-[100px] opacity-40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & CTA Section */}
      <section className="py-32 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-20">
          <Star className="w-12 h-12 text-yellow-500 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-black text-brand-ash mb-8 leading-tight">
            Ready to lead your industry <br />in North Telangana?
          </h2>
          <p className="text-xl text-brand-ash/60 max-w-2xl mx-auto font-medium">
            Join the elite group of 200+ businesses in Warangal and Hanamkonda that scaled using RAKS IT SOLUTIONS vertical expertise.
          </p>
        </div>
        
        <div className="bg-brand-blue rounded-[4rem] p-12 md:p-20 text-white shadow-2xl shadow-brand-blue/20 relative overflow-hidden group">
          <Globe className="absolute -top-10 -right-10 w-64 h-64 text-white/10 group-hover:scale-110 transition-transform duration-1000" />
          <h3 className="text-3xl font-black mb-8 relative z-10">Start Your Industry Audit Today</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
            <button 
              onClick={() => {
                const contactEl = document.getElementById('contact');
                if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-brand-blue px-12 py-5 rounded-2xl font-black text-xl hover:bg-brand-white/90 transition-all shadow-xl hover:-translate-y-1"
            >
              Get Custom Proposal
            </button>
            <a 
              href="https://wa.me/919010591950"
              className="bg-brand-blue/50 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-brand-blue transition-all flex items-center justify-center gap-3 border border-white/20"
            >
              Consult via WhatsApp <Zap className="w-5 h-5 text-yellow-400" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustriesHub;
