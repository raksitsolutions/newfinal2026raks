
import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, Scale, FileText, Clock } from 'lucide-react';

interface TermsAndConditionsProps {
  onBack: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-brand-ash text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center text-brand-blue font-black uppercase text-xs tracking-widest mb-10 hover:text-brand-blue/80 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Terms & <span className="text-brand-blue">Conditions</span></h1>
          <p className="text-xl text-brand-white/60 max-w-2xl font-medium">Last Updated: March 12, 2026. Please read these terms carefully before using our services.</p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="prose prose-lg max-w-none text-brand-ash/80 space-y-12">
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-brand-ash m-0">1. Acceptance of Terms</h2>
            </div>
            <p>
              By accessing and using the website and services of RAKS IT SOLUTIONS ("Company", "we", "us", or "our"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
                <Scale className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-brand-ash m-0">2. Services Provided</h2>
            </div>
            <p>
              RAKS IT SOLUTIONS provides software development, SEO, digital marketing, and consulting services. The specific scope of work for any project will be defined in a separate Service Agreement or Statement of Work (SOW).
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-brand-ash m-0">3. Intellectual Property</h2>
            </div>
            <p>
              All content, trademarks, logos, and intellectual property on this website are the property of RAKS IT SOLUTIONS. For client projects, intellectual property rights are transferred upon full payment, as specified in individual contracts.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-brand-ash m-0">4. Payment Terms</h2>
            </div>
            <p>
              Payments for services are due according to the schedule outlined in the project agreement. We reserve the right to suspend services if payments are not made on time. All fees are non-refundable unless otherwise stated in writing.
            </p>
          </section>

          <section className="bg-brand-ash/5 p-10 rounded-[2.5rem] border border-brand-ash/10">
            <h2 className="text-2xl font-black text-brand-ash mb-4">5. Limitation of Liability</h2>
            <p className="text-sm leading-relaxed">
              RAKS IT SOLUTIONS shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services. We do not guarantee specific search engine rankings as these are subject to third-party algorithms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-brand-ash mb-6">6. Governing Law</h2>
            <p>
              These terms are governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts in Warangal, Telangana.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
