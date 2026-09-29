
import React from 'react';
import { MapPin, Globe } from 'lucide-react';
import { TELANGANA_CITIES } from '../constants';

interface LocationsSectionProps {
  onSelectLocation: (city: string) => void;
}

const LocationsSection: React.FC<LocationsSectionProps> = ({ onSelectLocation }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-3">Local Presence</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-ash mb-6">Serving across the heart of Telangana</h3>
          <p className="text-lg text-brand-ash/80 mb-10 leading-relaxed">
            While our roots are deep in <span className="font-bold text-brand-ash">Warangal and Hanamkonda</span>, our reach extends to every major city in Telangana. We provide IT solutions that resonate with the regional business landscape.
          </p>
          
          <div className="bg-brand-blue rounded-3xl p-8 text-white relative overflow-hidden">
            <Globe className="absolute -bottom-10 -right-10 w-48 h-48 text-white/10" />
            <h4 className="text-2xl font-bold mb-4 relative z-10">Local Support, Global Scale</h4>
            <p className="text-brand-white/80 mb-6 relative z-10">
              Need on-site consulting in Karimnagar or a digital strategy session in Hyderabad? We've got you covered.
            </p>
            <button className="bg-white text-brand-blue px-6 py-3 rounded-xl font-bold hover:bg-brand-blue/5 transition-colors relative z-10">
              Contact Your Local Branch
            </button>
          </div>
        </div>

        <div className="bg-brand-ash/5 rounded-3xl p-8 border border-brand-ash/10">
          <h4 className="text-xl font-bold text-brand-ash mb-6 flex items-center">
            <MapPin className="text-brand-blue mr-2" /> Our Service Coverage
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            {TELANGANA_CITIES.map((city, idx) => (
              <div 
                key={`${city.city}-${idx}`} 
                onClick={() => onSelectLocation(city.city)}
                className="bg-white p-4 rounded-xl border border-brand-ash/20 hover:border-brand-blue/40 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-brand-ash group-hover:text-brand-blue transition-colors">
                    {city.city}
                  </span>
                  <span className="text-[10px] font-bold bg-brand-ash/10 px-2 py-0.5 rounded-full text-brand-ash/60 uppercase tracking-tighter">
                    {city.region}
                  </span>
                </div>
                <p className="text-xs text-brand-ash/60 leading-relaxed">
                  {city.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-brand-ash/20 text-center text-brand-ash/60 text-sm italic">
            Expanding to more towns every month...
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsSection;
