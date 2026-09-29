
import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Award } from 'lucide-react';

interface HomeAboutSectionProps {
  onReadMore: () => void;
}

const HomeAboutSection: React.FC<HomeAboutSectionProps> = ({ onReadMore }) => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl opacity-50"></div>
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" 
              alt="RAKS IT SOLUTIONS Team" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/40 to-transparent"></div>
          </div>
          
          {/* Experience Badge */}
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl z-20 border border-brand-ash/10 max-w-[200px]">
            <div className="text-brand-blue font-black text-3xl mb-1 tracking-tighter">100%</div>
            <p className="text-brand-ash/60 text-[10px] font-bold uppercase tracking-widest leading-tight">Project Success & Client Growth</p>
          </div>
        </div>

        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/5 text-brand-blue text-[10px] font-black uppercase tracking-widest mb-6 border border-brand-blue/10">
            Experience full of ideas
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-brand-ash mb-8 leading-[1.1] tracking-tight">
            We are the Architects of <span className="text-brand-blue">Digital Growth</span> in Telangana.
          </h2>
          <p className="text-lg text-brand-ash/80 mb-10 leading-relaxed">
            Founded in Hanamkonda with a vision to revolutionize the regional tech landscape, RAKS IT SOLUTIONS has evolved into a premier software hub. We blend deep local market insights with global coding standards to deliver products that don't just look good—they perform.
          </p>

          <div className="space-y-6 mb-12">
            {[
              { icon: ShieldCheck, title: "Trust & Integrity", text: "Transparent communication and realistic timelines are our hallmark." },
              { icon: Zap, title: "Agile Innovation", text: "We adapt to the latest tech trends like AI and Web3 to keep you ahead." },
              { icon: Award, title: "Excellence Driven", text: "Quality is not an option; it's the foundation of every line of code we write." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-blue/5 rounded-xl flex items-center justify-center text-brand-blue flex-shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-brand-ash text-base leading-none mb-2">{item.title}</h4>
                  <p className="text-sm text-brand-ash/60">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={onReadMore}
            className="group flex items-center gap-3 bg-brand-ash text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-brand-blue transition-all shadow-xl hover:shadow-brand-blue/20"
          >
            Discover Our Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutSection;
