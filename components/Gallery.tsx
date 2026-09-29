
import React, { useState } from 'react';
import { ArrowLeft, Camera, Maximize2, MessageCircle } from 'lucide-react';
import { GALLERY_IMAGES } from '../constants';

interface GalleryProps {
  onBack: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ onBack }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(GALLERY_IMAGES.map(img => img.category))];

  const filteredImages = filter === 'All' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === filter);

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-brand-ash py-24 text-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <button 
            onClick={onBack}
            className="flex items-center text-brand-blue font-bold mb-8 mx-auto hover:text-brand-blue/80 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          <h1 className="text-5xl font-black mb-6">Our Visual Journey</h1>
          <p className="text-xl text-brand-white/60 max-w-2xl mx-auto">
            Take a glimpse into the life at RAKS IT SOLUTIONS - where innovation meets passion.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10">
        <div className="bg-white rounded-[2rem] shadow-2xl p-8 border border-brand-ash/10 mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-xl font-bold transition-all ${
                  filter === cat 
                    ? 'bg-brand-blue text-white shadow-lg' 
                    : 'bg-brand-ash/5 text-brand-ash/60 hover:bg-brand-ash/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((img, i) => (
            <div key={i} className="group relative rounded-3xl overflow-hidden shadow-xl aspect-square cursor-pointer">
              <img 
                src={img.url + "?auto=format&fit=crop&q=80&w=800"} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ash via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                <span className="text-brand-blue text-xs font-black uppercase mb-2">{img.category}</span>
                <h3 className="text-white text-xl font-bold mb-4">{img.title}</h3>
                <div className="flex items-center text-white/70 text-sm">
                  <Maximize2 className="w-4 h-4 mr-2" /> View Fullscreen
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery CTA */}
        <div className="mt-24 bg-brand-ash rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-6">Want to see your brand here?</h2>
            <p className="text-brand-white/60 text-lg mb-10 max-w-2xl mx-auto">
              We help businesses in Warangal and Hanamkonda create stunning visual identities and digital products.
            </p>
            <a 
              href="https://wa.me/919010591950"
              target="_blank"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl"
            >
              Start Your Visual Journey <MessageCircle className="w-6 h-6" />
            </a>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
