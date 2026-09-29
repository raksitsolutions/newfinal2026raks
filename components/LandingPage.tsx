
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle, 
  MapPin, 
  Sparkles, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  Globe, 
  Zap,
  Target,
  Layers,
  ShieldCheck,
  BarChart3
} from 'lucide-react';
import { SERVICES, INDUSTRIES, TELANGANA_CITIES, renderIcon } from '../constants';
import { Route, FAQItem } from '../types';

interface LandingPageProps {
  route: Route;
  onBack: () => void;
}

const FAQAccordion: React.FC<{ faqs: FAQItem[] }> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border border-brand-ash/10 rounded-2xl overflow-hidden bg-white shadow-sm transition-all hover:border-brand-blue/30">
          <button 
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between p-6 text-left"
          >
            <span className="font-bold text-brand-ash text-lg leading-tight pr-4">{faq.question}</span>
            {openIndex === idx ? <ChevronUp className="w-5 h-5 text-brand-blue flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-brand-ash/40 flex-shrink-0" />}
          </button>
          {openIndex === idx && (
            <div className="px-6 pb-6 pt-0 animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-slate-600 leading-relaxed text-base">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const WhatsAppCTA: React.FC<{ text: string, subtext?: string }> = ({ text, subtext }) => (
  <div className="bg-gradient-to-br from-brand-blue/5 to-white border-2 border-brand-blue/10 rounded-[2.5rem] p-8 md:p-12 my-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-brand-blue/5">
    <div className="max-w-md text-center md:text-left">
      <h4 className="text-2xl font-black text-brand-ash mb-2">{text}</h4>
      <p className="text-brand-ash/60 font-medium">{subtext || "Chat instantly with our experts in Warangal & Hanamkonda. We are online and ready to help."}</p>
    </div>
    <a 
      href="https://wa.me/919010591950?text=Hello%20RAKS%20IT%20SOLUTIONS,%20I'm%20on%20your%20landing%20page%20and%20want%20to%20consult%20about%20my%20business%20in%20Warangal." 
      target="_blank"
      className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center gap-3 shadow-xl hover:-translate-y-1 active:scale-95"
    >
      Start WhatsApp Chat <Send className="w-5 h-5" />
    </a>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ route, onBack }) => {
  let data: any = null;

  if (route.type === 'service') {
    data = SERVICES.find(x => x.id === route.id);
  } else if (route.type === 'industry') {
    data = INDUSTRIES.find(x => x.id === route.id);
  } else if (route.type === 'location') {
    data = TELANGANA_CITIES.find(x => x.city.toLowerCase() === route.id?.toLowerCase());
  }

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-white flex-col gap-6">
      <h2 className="text-3xl font-black text-brand-ash tracking-tighter">Route Not Found</h2>
      <button onClick={onBack} className="bg-brand-blue text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest">Return to Home</button>
    </div>
  );

  const seo = data.seo;
  const title = data.title || data.name || data.city;
  const locationName = route.type === 'location' ? data.city : "Warangal & Hanamkonda";

  return (
    <div className="bg-brand-white min-h-screen pb-32">
      {/* Header / Hero */}
      <div className="bg-brand-blue text-white py-32 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-10 left-10 w-96 h-96 bg-brand-white/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-brand-white/20 rounded-full blur-[150px]"></div>
          <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-white opacity-10" />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center text-brand-white/80 font-black uppercase text-xs tracking-widest mb-10 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </motion.button>
          
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-widest mb-8"
            >
              <MapPin className="w-3 h-3 mr-2" /> Serving {locationName} & All Major Districts of Telangana
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black mb-8 leading-[1] tracking-tight"
            >
              {seo.h1}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-brand-white/80 leading-relaxed max-w-3xl font-medium"
            >
              {seo.metaDescription}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 flex flex-wrap gap-6"
            >
               <a 
                href="https://wa.me/919010591950" 
                className="bg-green-600 text-white px-12 py-6 rounded-3xl font-black text-xl flex items-center gap-3 shadow-2xl shadow-green-900/40 hover:bg-green-700 transition-all hover:-translate-y-1"
               >
                 Consult for {title} (+91 90105 91950)
               </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-2xl max-w-none text-brand-ash/80 space-y-12 seo-content-rich"
            >
              <div dangerouslySetInnerHTML={{ __html: seo.body }} />
              
              <div className="mt-16 border-l-8 border-brand-blue pl-10 py-4 italic text-3xl font-black text-brand-ash bg-brand-blue/5 rounded-r-[3rem]">
                "Our mission is to empower the local business ecosystem of {locationName} with global-standard technology that drives real ROI."
              </div>

              <div className="mt-20 space-y-8">
                <h2 className="text-5xl font-black text-brand-ash tracking-tighter">Localized Market Insights for {locationName}</h2>
                <p className="text-xl leading-relaxed">
                  In the rapidly evolving digital landscape of <strong>{locationName}</strong>, businesses are facing unprecedented competition. Whether you are searching for the <strong>best SEO agency in Warangal</strong>, a <strong>manufacturing unit in Kazipet</strong>, or the <strong>top web development company in Hanamkonda</strong>, your digital footprint is your most valuable asset. At RAKS IT SOLUTIONS, we understand the regional search patterns, linguistic preferences, and consumer behavior that define the Telangana market.
                </p>
                <p className="text-xl leading-relaxed">
                  Our data shows that over 85% of consumers in the Tri-City area search for services on their mobile devices before making a purchase. This makes <strong>Mobile-First Design</strong> and <strong>Hyper-Local SEO</strong> not just options, but necessities for survival. We specialize in bridging the gap between traditional business values and modern digital excellence.
                </p>
              </div>

              <div className="mt-20 space-y-10">
                <h2 className="text-5xl font-black text-brand-ash tracking-tighter">Our Strategic Process for {title}</h2>
                <div className="grid gap-8">
                  {[
                    { icon: Target, title: "Deep Market Audit", desc: "We begin by analyzing your competitors in the local market and identifying high-intent keywords that your customers are actually using." },
                    { icon: Layers, title: "Custom Architecture", desc: "We don't use templates. Every solution is built from the ground up to ensure maximum performance and security." },
                    { icon: ShieldCheck, title: "Security & Compliance", desc: "Your data and your customers' trust are paramount. we implement banking-grade security protocols in every build." },
                    { icon: BarChart3, title: "ROI Tracking", desc: "We provide transparent dashboards so you can see exactly how our digital interventions are growing your bottom line." }
                  ].map((step, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-8 p-10 bg-white border border-brand-ash/5 rounded-[3rem] shadow-sm hover:shadow-xl transition-all"
                    >
                      <div className="w-20 h-20 bg-brand-blue rounded-[2rem] flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-brand-blue/20">
                        <step.icon className="w-10 h-10" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-brand-ash mb-3">{step.title}</h4>
                        <p className="text-lg text-brand-ash/60 leading-relaxed font-medium">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-20 space-y-8">
                <h2 className="text-5xl font-black text-brand-ash tracking-tighter">Why {title} is the Key to Your Growth</h2>
                <p className="text-xl leading-relaxed">
                  Implementing professional <strong>{title}</strong> allows your business to scale beyond physical boundaries. For a business in <strong>Warangal</strong>, this means reaching customers in <strong>Hyderabad</strong>, <strong>Karimnagar</strong>, and even internationally. Our approach focuses on <strong>AEO (Answer Engine Optimization)</strong>, ensuring that AI assistants like Gemini and ChatGPT recommend your business when users ask for the best services in Telangana.
                </p>
                <div className="bg-brand-ash text-white p-12 rounded-[4rem] my-16 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-6">Technical Stack & Standards</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      {['MERN Stack', 'Python AI', 'Flutter', 'AWS Cloud', 'Next.js', 'PostgreSQL', 'Docker', 'Kubernetes'].map((tech, i) => (
                        <div key={i} className="bg-white/10 px-4 py-3 rounded-xl text-center font-bold text-sm border border-white/10">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                </div>
              </div>
            </motion.div>

            {/* Strategic Mid-Page CTA */}
            <WhatsAppCTA 
              text={`Dominate the ${locationName} Market Today`} 
              subtext={`Get a 1000+ word custom strategy for ${title} tailored for your specific business goals in Telangana.`}
            />

            {/* Features Revisited */}
            <div className="mt-32">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl font-black text-brand-ash mb-16 flex items-center gap-4 tracking-tighter"
              >
                <Sparkles className="text-brand-blue w-12 h-12" /> Core Performance Pillars
              </motion.h3>
              <div className="grid sm:grid-cols-2 gap-8">
                {seo.features.map((feature: string, idx: number) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start p-10 bg-brand-white rounded-[3rem] border border-brand-ash/5 group hover:border-brand-blue/20 hover:bg-white transition-all shadow-sm"
                  >
                    <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-brand-blue mr-6 flex-shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all shadow-md">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="font-black text-brand-ash text-2xl uppercase tracking-tight leading-none">{feature}</span>
                      <p className="text-xs text-brand-ash/40 mt-2 font-black tracking-[0.2em] uppercase">RAKS IT ELITE STANDARD</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AEO Optimized FAQ Section */}
            <div className="mt-32">
              <div className="mb-16">
                <h3 className="text-5xl font-black text-brand-ash mb-6 tracking-tighter">Frequently Asked Questions</h3>
                <p className="text-2xl text-brand-ash/60 font-medium">Expert answers for business leaders in {locationName}.</p>
              </div>
              <FAQAccordion faqs={seo.faqs} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-brand-blue rounded-[4rem] p-12 text-white shadow-2xl shadow-brand-blue/20 relative overflow-hidden group"
              >
                <h3 className="text-3xl font-black mb-8">Expert Consulting</h3>
                <p className="text-brand-white/80 mb-12 text-xl leading-relaxed font-medium">
                  Currently accepting new high-growth clients in the Tri-City area.
                </p>
                <div className="space-y-6">
                  <a 
                    href="https://wa.me/919010591950"
                    className="w-full bg-white text-brand-blue font-black py-6 rounded-3xl hover:bg-brand-white/90 transition-all shadow-xl flex items-center justify-center gap-4 text-xl"
                  >
                    <MessageCircle className="w-7 h-7 text-green-600" /> WhatsApp Direct
                  </a>
                  <button 
                    onClick={() => {
                      const contactEl = document.getElementById('contact');
                      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-white/10 border border-white/20 text-white font-black py-6 rounded-3xl hover:bg-white/20 transition-all text-lg"
                  >
                    Request a Proposal
                  </button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-brand-white rounded-[3rem] p-12 border border-brand-ash/10"
              >
                <h4 className="font-black text-brand-ash mb-8 flex items-center gap-3 text-lg uppercase tracking-widest">
                   <MapPin className="text-brand-blue w-6 h-6" /> Regional Hubs
                </h4>
                <div className="space-y-4">
                  {TELANGANA_CITIES.map((city, idx) => (
                    <div key={`${city.city}-${idx}`} className="flex items-center justify-between bg-white p-5 rounded-2xl shadow-sm hover:border-brand-blue/20 border border-transparent transition-all group">
                      <span className="font-black text-brand-ash text-lg">{city.city}</span>
                      <span className="text-[10px] font-black text-brand-blue uppercase bg-brand-blue/5 px-3 py-1 rounded-full group-hover:bg-brand-blue group-hover:text-white transition-all">Active</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Final Bottom CTA */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-brand-ash py-32 mx-6 rounded-[5rem] text-center text-white relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto relative z-10 px-6">
          <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter leading-none">Lead the <span className="text-brand-blue">Market</span> in {locationName}</h2>
          <p className="text-2xl text-brand-white/60 mb-16 font-medium max-w-2xl mx-auto leading-relaxed">Join 200+ businesses who scaled their revenue by 40% with RAKS IT SOLUTIONS.</p>
          <a 
            href="https://wa.me/919010591950" 
            className="inline-flex items-center gap-6 bg-brand-blue hover:bg-brand-blue/90 text-white px-16 py-8 rounded-[2.5rem] font-black text-2xl transition-all shadow-2xl hover:-translate-y-2 active:scale-95"
          >
            Claim Your Free Strategy Session <Zap className="w-8 h-8" />
          </a>
        </div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;
