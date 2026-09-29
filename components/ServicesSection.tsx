
import React from 'react';
import { SERVICES, renderIcon } from '../constants';

interface ServicesSectionProps {
  onSelectService: (id: string) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-3">Our Expertise</h2>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-ash">Comprehensive Software Services</h3>
        <p className="mt-4 text-lg text-brand-ash/80 max-w-2xl mx-auto">
          We offer a full suite of digital solutions tailored to bridge the gap between your ideas and reality in the Telangana market.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service) => (
          <div 
            key={service.id} 
            onClick={() => onSelectService(service.id)}
            className="group p-8 bg-white border border-brand-ash/10 rounded-3xl shadow-sm hover:shadow-xl hover:border-brand-blue/20 transition-all duration-300 relative overflow-hidden cursor-pointer"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-blue/5 rounded-full transition-transform group-hover:scale-[3] duration-500 -z-0"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-brand-blue rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-brand-blue/10 group-hover:bg-brand-blue/90 transition-colors">
                {renderIcon(service.icon, "w-8 h-8")}
              </div>
              <h4 className="text-xl font-bold text-brand-ash mb-3 group-hover:text-brand-blue transition-colors">{service.title}</h4>
              <p className="text-brand-ash/80 leading-relaxed mb-6">
                {service.description}
              </p>
              <button className="text-sm font-bold text-brand-blue flex items-center hover:gap-2 transition-all">
                Explore Solution <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
