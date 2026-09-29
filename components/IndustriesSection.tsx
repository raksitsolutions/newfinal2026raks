
import React from 'react';
import { INDUSTRIES } from '../constants';

interface IndustriesSectionProps {
  onSelectIndustry: (id: string) => void;
}

const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onSelectIndustry }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <h2 className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-3">Industries</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-ash">Tailored for Your Sector</h3>
        </div>
        <p className="mt-4 md:mt-0 text-brand-ash/80 max-w-md">
          We don't just build software; we solve industry-specific challenges with domain-centric engineering across Telangana.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {INDUSTRIES.map((industry) => (
          <div 
            key={industry.id} 
            onClick={() => onSelectIndustry(industry.id)}
            className="relative group rounded-3xl overflow-hidden shadow-lg h-64 cursor-pointer"
          >
            <img 
              src={industry.image} 
              alt={industry.name} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ash via-brand-ash/40 to-transparent"></div>
            <div className="absolute bottom-0 p-6">
              <h4 className="text-xl font-bold text-white mb-2">{industry.name}</h4>
              <p className="text-brand-white/80 text-sm">{industry.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustriesSection;
