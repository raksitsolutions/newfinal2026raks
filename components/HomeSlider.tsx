
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { SLIDER_ITEMS } from '../constants';

const HomeSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDER_ITEMS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % SLIDER_ITEMS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + SLIDER_ITEMS.length) % SLIDER_ITEMS.length);

  return (
    <div className="relative h-[600px] md:h-[750px] w-full overflow-hidden">
      {SLIDER_ITEMS.map((item, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-linear scale-110"
            style={{ backgroundImage: `url(${item.image})`, transform: index === current ? 'scale(1)' : 'scale(1.1)' }}
          >
            <div className="absolute inset-0 bg-brand-ash/60 backdrop-blur-[2px]"></div>
          </div>
          
          <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start text-white">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/30 border border-brand-blue/50 text-brand-white text-xs font-bold uppercase tracking-widest mb-6 animate-bounce">
              RAKS IT SOLUTIONS
            </span>
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight max-w-3xl transform transition-all duration-700 translate-y-0 opacity-100">
              {item.title}
            </h2>
            <p className="text-xl md:text-2xl text-brand-white/80 mb-10 max-w-2xl">
              {item.subtitle}
            </p>
            <button className="bg-brand-blue hover:bg-brand-blue/90 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-2xl flex items-center gap-2 group">
              {item.cta} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button 
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {SLIDER_ITEMS.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${i === current ? 'w-10 bg-brand-blue' : 'w-4 bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
