
import React from 'react';
import { CASE_STUDIES } from '../constants';
import { ArrowLeft, ArrowRight, TrendingUp, CheckCircle2, MessageCircle } from 'lucide-react';

interface CaseStudiesHubProps {
  onSelectCaseStudy: (id: string) => void;
  onBack: () => void;
}

const CaseStudiesHub: React.FC<CaseStudiesHubProps> = ({ onSelectCaseStudy, onBack }) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-ash text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue rounded-full blur-[150px] -mr-96 -mt-96"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-blue rounded-full blur-[120px] -ml-48 -mb-48"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button 
            onClick={onBack}
            className="inline-flex items-center text-brand-blue font-bold mb-8 hover:text-brand-blue/80 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-7xl font-extrabold mb-8 leading-tight">
              Success <br />
              <span className="text-brand-blue">Stories.</span>
            </h1>
            <p className="text-xl text-brand-white/60 leading-relaxed mb-10">
              Explore how we've helped businesses across Telangana and beyond achieve 20% to 40% growth through strategic digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {CASE_STUDIES.map((study) => (
            <div 
              key={study.id}
              onClick={() => onSelectCaseStudy(study.id)}
              className="group relative bg-white rounded-[3rem] border border-brand-ash/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={study.image} 
                  alt={study.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 right-6 bg-brand-blue text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  {study.growth}
                </div>
              </div>
              
              <div className="p-10 flex flex-col flex-grow">
                <span className="text-brand-blue font-black uppercase text-[10px] tracking-widest mb-3">{study.category}</span>
                <h3 className="text-2xl font-black text-brand-ash mb-4 group-hover:text-brand-blue transition-colors">{study.client}</h3>
                <p className="text-brand-ash/60 leading-relaxed mb-8 line-clamp-3">
                  {study.description}
                </p>
                
                <div className="mt-auto flex items-center text-brand-blue font-black uppercase text-xs tracking-widest group-hover:gap-2 transition-all">
                  View Case Study <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-brand-ash/5 py-24 border-y border-brand-ash/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <p className="text-5xl font-black text-brand-blue mb-2">200+</p>
              <p className="text-brand-ash/60 font-bold uppercase tracking-widest text-sm">Projects Delivered</p>
            </div>
            <div>
              <p className="text-5xl font-black text-brand-blue mb-2">30%</p>
              <p className="text-brand-ash/60 font-bold uppercase tracking-widest text-sm">Avg. Sales Growth</p>
            </div>
            <div>
              <p className="text-5xl font-black text-brand-blue mb-2">98%</p>
              <p className="text-brand-ash/60 font-bold uppercase tracking-widest text-sm">Client Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Case Studies CTA */}
        <div className="mt-24 max-w-5xl mx-auto px-4 text-center">
          <div className="bg-brand-ash rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
            <h2 className="text-4xl font-black mb-6">Ready to be our next success story?</h2>
            <p className="text-brand-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Join the 200+ businesses in Telangana that have scaled their sales by 20% to 40% with our digital strategies.
            </p>
            <a 
              href="https://wa.me/919010591950"
              target="_blank"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl"
            >
              Start Your Growth Journey <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesHub;
