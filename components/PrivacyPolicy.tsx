
import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, Eye, Lock, Database } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Privacy <span className="text-brand-blue">Policy</span></h1>
          <p className="text-xl text-brand-white/60 max-w-2xl font-medium">Your privacy is our priority. Learn how we handle your data with transparency and security.</p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="prose prose-lg max-w-none text-brand-ash/80 space-y-12">
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-brand-ash m-0">1. Information We Collect</h2>
            </div>
            <p>
              We collect information that you provide directly to us, such as when you fill out a contact form, request a quote, or communicate with us via WhatsApp. This may include your name, email address, phone number, and business details.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
                <Database className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-brand-ash m-0">2. How We Use Your Data</h2>
            </div>
            <p>
              We use the collected data to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Send you project updates and marketing communications (with your consent)</li>
              <li>Improve our website performance and user experience</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-brand-ash m-0">3. Data Security</h2>
            </div>
            <p>
              We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-brand-ash m-0">4. Third-Party Sharing</h2>
            </div>
            <p>
              We do not sell or rent your personal data to third parties. We may share information with trusted service providers who assist us in operating our business, provided they agree to keep this information confidential.
            </p>
          </section>

          <section className="bg-brand-blue/5 p-10 rounded-[2.5rem] border border-brand-blue/10">
            <h2 className="text-2xl font-black text-brand-ash mb-4">5. Cookies</h2>
            <p className="text-sm leading-relaxed">
              Our website uses cookies to enhance your browsing experience and analyze site traffic. You can choose to disable cookies through your browser settings, though some features of the site may not function properly.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-brand-ash mb-6">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <strong>privacy@raksitsolutions.com</strong> or via our contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
