
import React from 'react';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import TypingAnimation from './TypingAnimation';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenAI: () => void;
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenAI, onExplore }) => {
  const typingWords = [
    "Web Development",
    "SEO Dominance",
    "Digital Marketing",
    "App Development",
    "Graphic Design",
    "Brand Identity"
  ];

  return (
    <div className="relative pt-20 pb-32 overflow-hidden">
      {/* Background patterns */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -z-10"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-3xl -z-10"
        ></motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 lg:mb-0"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-brand-blue text-xs font-bold mb-6 tracking-wide uppercase shadow-sm">
              🚀 #1 Software & Digital Hub in Telangana
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-brand-ash leading-[1.1] mb-6 tracking-tighter">
              Empowering Businesses with <br />
              <TypingAnimation words={typingWords} className="text-brand-blue" />
            </h1>
            <p className="text-xl text-brand-ash/80 mb-10 max-w-xl leading-relaxed font-medium">
              RAKS IT SOLUTIONS delivers world-class technology and results-driven digital marketing. From Warangal & Hanamkonda to the global market, we help you dominate the digital curve.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={onOpenAI}
                className="px-8 py-5 bg-brand-blue text-white rounded-2xl font-black text-lg shadow-2xl shadow-brand-blue/20 hover:bg-brand-blue/90 hover:translate-y-[-4px] transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                Talk to AI Consultant <ArrowRight className="w-5 h-5" />
              </button>
              <a 
                href="https://wa.me/919010591950"
                target="_blank"
                className="px-8 py-5 bg-green-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-green-200 hover:bg-green-700 hover:translate-y-[-4px] transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                WhatsApp Us <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                "Local Tech Support",
                "SEO & Ads Expertise",
                "Industrial Lead Gen",
                "Premium UI/UX"
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="flex items-center text-brand-ash text-base font-bold"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /> {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border border-brand-ash/10">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
                alt="Digital Marketing and Tech Analytics" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/40 to-transparent"></div>
              
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-8 left-8 right-8 bg-brand-white/95 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-2xl flex items-center justify-between"
              >
                <div>
                  <p className="text-brand-ash/60 text-xs font-black uppercase mb-1 tracking-widest">Growth Focus</p>
                  <p className="text-3xl font-black text-brand-blue tracking-tighter">ROI Driven</p>
                </div>
                <div className="h-12 w-[1px] bg-brand-ash/20 mx-6"></div>
                <div>
                  <p className="text-brand-ash/60 text-xs font-black uppercase mb-1 tracking-widest">Local Experts</p>
                  <p className="text-3xl font-black text-brand-blue tracking-tighter">30+ Cities</p>
                </div>
              </motion.div>
            </div>
            
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
