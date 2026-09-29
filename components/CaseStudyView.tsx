
import React from 'react';
import { CaseStudy } from '../types';
import { ArrowLeft, TrendingUp, CheckCircle2, XCircle, Zap, Target, Lightbulb, MessageCircle } from 'lucide-react';

interface CaseStudyViewProps {
  study: CaseStudy;
  onBack: () => void;
}

const CaseStudyView: React.FC<CaseStudyViewProps> = ({ study, onBack }) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-brand-ash">
        <img 
          src={study.image} 
          alt={study.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ash via-brand-ash/60 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <button 
            onClick={onBack}
            className="inline-flex items-center text-white/80 font-bold mb-8 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Case Studies
          </button>
          
          <div className="max-w-4xl">
            <span className="inline-block bg-brand-blue text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 shadow-xl">
              {study.category} • {study.growth}
            </span>
            <h1 className="text-5xl sm:text-7xl font-black text-white mb-8 leading-tight">
              {study.title}
            </h1>
            <p className="text-2xl text-brand-white/80 font-medium max-w-2xl leading-relaxed">
              {study.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <div>
              <h2 className="text-3xl font-black text-brand-ash mb-8 flex items-center">
                <Lightbulb className="w-8 h-8 text-brand-blue mr-4" /> The Challenge & Implementation
              </h2>
              <p className="text-xl text-brand-ash/80 leading-relaxed">
                {study.implementation}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-emerald-50 p-10 rounded-[2rem] border border-emerald-100">
                <h3 className="text-xl font-black text-emerald-900 mb-6 flex items-center">
                  <CheckCircle2 className="w-6 h-6 mr-3" /> Key Pros
                </h3>
                <ul className="space-y-4">
                  {study.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start text-emerald-800 font-medium">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50 p-10 rounded-[2rem] border border-rose-100">
                <h3 className="text-xl font-black text-rose-900 mb-6 flex items-center">
                  <XCircle className="w-6 h-6 mr-3" /> Challenges (Cons)
                </h3>
                <ul className="space-y-4">
                  {study.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start text-rose-800 font-medium">
                      <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            <div className="bg-brand-ash text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <h3 className="text-2xl font-black mb-8 flex items-center">
                <Zap className="w-6 h-6 text-brand-blue mr-3" /> Strategies
              </h3>
              <div className="space-y-4">
                {study.strategies.map((strategy, idx) => (
                  <div key={idx} className="flex items-center bg-brand-white/5 p-4 rounded-2xl border border-brand-white/10">
                    <Target className="w-5 h-5 text-brand-blue mr-4" />
                    <span className="font-bold text-brand-white">{strategy}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-blue text-white p-10 rounded-[3rem] shadow-2xl text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-6" />
              <h3 className="text-3xl font-black mb-2">{study.growth}</h3>
              <p className="text-brand-white/60 font-bold uppercase tracking-widest text-xs">Growth Achieved</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-ash/5 py-24 border-t border-brand-ash/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-brand-ash mb-8">Ready for similar growth?</h2>
          <p className="text-xl text-brand-ash/80 mb-12">
            Let's discuss how we can implement these strategies for your business in Warangal or Hanamkonda.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => {
                const contactEl = document.getElementById('contact');
                if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-brand-blue text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-blue/90 transition-all shadow-xl"
            >
              Start Your Project
            </button>
            <a 
              href="https://wa.me/919010591950"
              target="_blank"
              className="bg-green-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              Consult on WhatsApp <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyView;
