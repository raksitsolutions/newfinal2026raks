import React from 'react';
import { CustomPage } from '../types';
import { ArrowLeft, CheckCircle2, MessageCircle, Send, Sparkles, Globe } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface CustomPageViewProps {
  page: CustomPage;
  onBack: () => void;
}

const CustomPageView: React.FC<CustomPageViewProps> = ({ page, onBack }) => {
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Header */}
      <div className="bg-brand-ash text-white py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center text-brand-blue font-black uppercase text-xs tracking-widest mb-8 hover:text-brand-blue/80 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-blue text-xs font-black uppercase tracking-wider mb-6">
            <Globe className="w-3.5 h-3.5" /> Official RAKS IT SOLUTIONS Page
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl">
            {page.title}
          </h1>

          {page.subtitle && (
            <p className="text-xl md:text-2xl text-brand-white/70 max-w-3xl font-medium leading-relaxed">
              {page.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 mt-16">
        {/* Key Features Highlights */}
        {page.features && page.features.length > 0 && (
          <div className="mb-14 p-8 bg-brand-blue/5 border-2 border-brand-blue/10 rounded-3xl">
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-blue mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Key Highlights & Deliverables
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {page.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-brand-ash font-medium text-sm leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rich Page Body */}
        <div 
          className="prose prose-lg md:prose-xl prose-slate max-w-none text-brand-ash/80 leading-relaxed font-sans"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />

        {/* Custom Call to Action */}
        <div className="mt-20 p-10 md:p-14 bg-brand-ash rounded-3xl text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-lg">
            <div className="mb-4">
              <BrandLogo variant="light" className="h-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black mb-2">Connect With Our Team</h3>
            <p className="text-brand-white/70 text-sm">
              Our specialists in Warangal, Hanamkonda, and Hyderabad are here to assist with any questions about {page.title}.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a
              href={page.ctaLink || "https://wa.me/919010591950"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 text-center whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5" /> {page.ctaText || "Chat on WhatsApp"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPageView;
