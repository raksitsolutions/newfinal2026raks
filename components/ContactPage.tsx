
import React from 'react';
import { ArrowLeft, MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import ContactSection from './ContactSection';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="bg-brand-ash py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center text-brand-blue font-bold mb-8 hover:text-brand-blue/80 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Let's Start a <span className="text-brand-blue">Conversation</span>.
          </h1>
          <p className="text-xl text-brand-white/60 max-w-2xl">
            Whether you're in Warangal, Hanamkonda, or anywhere in the world, our team is ready to scale your business.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-brand-ash/5">
              <div className="w-12 h-12 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-ash mb-2">Our Tri-City Hub</h3>
              <p className="text-brand-ash/60 mb-6 leading-relaxed">
                Plot #45, Diamond Block, <br />
                Subedari, Hanamkonda, <br />
                Warangal, Telangana - 506001
              </p>
              <a href="#" className="text-brand-blue font-bold flex items-center gap-1 hover:underline">
                Open in Maps <Send className="w-3 h-3" />
              </a>
            </div>

            <div className="bg-brand-blue p-8 rounded-[2rem] shadow-2xl text-white">
              <div className="w-12 h-12 bg-brand-white/10 rounded-2xl flex items-center justify-center text-white mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Business Hours</h3>
              <p className="text-brand-white/60 mb-2">Monday - Friday: 9 AM - 7 PM</p>
              <p className="text-brand-white/60">Saturday: 10 AM - 4 PM</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-brand-ash/5">
              <div className="bg-brand-ash/5 p-8 border-b border-brand-ash/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center text-white">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-black text-brand-ash">Send an Inquiry</h2>
                </div>
                <span className="text-xs font-bold text-brand-ash/40 uppercase tracking-widest">We respond within 24h</span>
              </div>
              <div className="bg-white p-2">
                <div className="bg-brand-ash rounded-[2.5rem] p-10 text-white">
                   <ContactSection />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
