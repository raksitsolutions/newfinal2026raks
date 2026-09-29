
import React from 'react';
import { ArrowLeft, Users, Target, Shield, Rocket, Heart, Award, CheckCircle2, Star, Briefcase, Send, MessageCircle, Globe, Zap, Sparkles, ShieldCheck, BarChart3, Laptop, Smartphone, Search, Code, Palette, Megaphone } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutUsProps {
  onBack: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Landing Section */}
      <section className="relative bg-brand-ash text-white py-32 md:py-48 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Office Environment"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ash via-brand-ash/80 to-transparent"></div>
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center text-brand-blue font-black text-xs uppercase tracking-widest mb-10 hover:text-brand-blue/80 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </motion.button>
          
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-5 py-2 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-blue text-xs font-black uppercase tracking-widest mb-8"
            >
              The RAKS IT SOLUTIONS Legacy
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black mb-10 leading-[1] tracking-tighter"
            >
              Defining the <span className="text-brand-blue">Digital Frontier</span> of Telangana.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-brand-white/80 leading-relaxed mb-12 max-w-3xl font-medium"
            >
              We are a collective of visionary engineers, creative designers, and strategic growth hackers dedicated to transforming the business landscape of Warangal, Hanamkonda, and the entire Telangana region.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6"
            >
              <a href="https://wa.me/919010591950" className="bg-green-600 text-white px-10 py-5 rounded-3xl font-black text-xl flex items-center gap-3 hover:bg-green-700 transition-all shadow-2xl hover:-translate-y-1">
                <MessageCircle className="w-6 h-6" /> Chat with Founders
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Deep Content Section */}
      <section className="py-32 max-w-5xl mx-auto px-6 prose prose-2xl prose-slate prose-headings:font-black prose-headings:text-brand-ash prose-headings:tracking-tighter">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Our Origin: A Vision for North Telangana</h2>
          <p className="text-xl leading-relaxed">
            In the heart of <strong>Hanamkonda</strong>, a vision was born to bridge the gap between local enterprise and global technology. RAKS IT SOLUTIONS isn't just a software company; we are your strategic digital partners. Since our inception, we've focused on one core metric: <strong>Your Growth.</strong>
          </p>
          <p className="text-xl leading-relaxed">
            Our journey began when our founders noticed that businesses in North Telangana were being underserved by generic agencies from larger metros. There was a desperate need for high-performance <strong>SEO</strong>, secure <strong>web architecture</strong>, and <strong>AI-driven marketing</strong> that actually understands the regional landscape of <strong>Warangal</strong>, <strong>Hanamkonda</strong>, and <strong>Kazipet</strong>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3>Our Core Philosophy: CODE. GROWTH. IMPACT.</h3>
          <p className="text-xl leading-relaxed">
            Every line of code we write is optimized for search engines and user experience. We believe that a website is more than just a digital brochure—it is a 24/7 salesperson. That is why our "SEO-First" approach is integrated into our entire development lifecycle.
          </p>
          <p className="text-xl leading-relaxed">
            We don't just build websites; we build business engines. Our team in Warangal works tirelessly to ensure that your digital presence is not only beautiful but also functional, secure, and highly visible. We leverage the latest in <strong>AEO (Answer Engine Optimization)</strong> to ensure your brand is the first choice for AI assistants like Gemini and ChatGPT.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-brand-blue rounded-[4rem] p-16 text-white not-prose my-24 shadow-2xl shadow-brand-blue/20"
        >
          <h4 className="text-4xl font-black mb-6 tracking-tighter">Why choose a local agency in Warangal?</h4>
          <p className="text-brand-white/80 text-xl mb-12 font-medium">We understand the specific challenges of the Telangana market. We know the local festivals, the local search trends, and the local customer psychology that drives conversions in Hanamkonda.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-start gap-6">
               <div className="bg-white/10 p-4 rounded-2xl shadow-inner"><CheckCircle2 className="text-white w-8 h-8" /></div>
               <div>
                 <p className="text-2xl font-black">Local Support</p>
                 <p className="text-lg text-brand-white/80">On-site visits in Hanamkonda and Warangal anytime you need us.</p>
               </div>
            </div>
            <div className="flex items-start gap-6">
               <div className="bg-white/10 p-4 rounded-2xl shadow-inner"><CheckCircle2 className="text-white w-8 h-8" /></div>
               <div>
                 <p className="text-2xl font-black">Regional ROI</p>
                 <p className="text-lg text-brand-white/80">Strategies specifically optimized for the North Telangana economy.</p>
               </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3>Our Mission & Vision</h3>
          <p className="text-xl leading-relaxed">
            <strong>Our Mission:</strong> To democratize high-end technology for small and medium enterprises in Telangana, enabling them to compete on a global stage through superior digital craftsmanship.
          </p>
          <p className="text-xl leading-relaxed">
            <strong>Our Vision:</strong> To establish Warangal as a premier IT hub in India, known for innovation, technical excellence, and ethical digital growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3>Pillars of Our Success</h3>
          <div className="grid gap-10 not-prose mt-12">
            {[
              { icon: Code, title: "Technical Dominance", desc: "We use the MERN stack, Python AI, and Flutter for robust, scalable application builds that never fail." },
              { icon: Search, title: "SEO & AEO Authority", desc: "We don't just 'do' SEO; we dominate the first page for high-intent keywords and AI search results." },
              { icon: Palette, title: "User-Centric Design", desc: "Our UI/UX team ensures that your visitors stay longer, engage more, and convert faster into loyal customers." }
            ].map((pillar, i) => (
              <div key={i} className="flex gap-8 p-10 bg-brand-ash/5 rounded-[3rem] border border-brand-ash/10 hover:bg-white hover:shadow-xl transition-all group">
                <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center text-brand-blue shadow-md group-hover:bg-brand-blue group-hover:text-white transition-all">
                  <pillar.icon className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-brand-ash mb-2">{pillar.title}</h4>
                  <p className="text-lg text-brand-ash/60 font-medium leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <h3>Our Impact in Telangana</h3>
          <p className="text-xl leading-relaxed">
            Over the years, RAKS IT SOLUTIONS has become a cornerstone of the digital economy in <strong>Warangal</strong>. We have helped over 200 businesses scale their operations, resulting in a combined revenue growth of over 40% for our clients. From local hospitals in <strong>Hanamkonda</strong> to manufacturing plants in <strong>Kazipet</strong>, our influence is visible in every sector.
          </p>
          <p className="text-xl leading-relaxed">
            We are committed to nurturing local talent. Our internship programs and workshops have trained dozens of young engineers from local institutions like NIT Warangal and SR University, preparing them for the global tech workforce.
          </p>
        </motion.div>
      </section>

      {/* AEO FAQ Section for About Page */}
      <section className="py-32 bg-brand-ash/5 border-y border-brand-ash/10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black text-brand-ash mb-16 text-center tracking-tighter"
          >
            About RAKS IT SOLUTIONS: FAQs
          </motion.h3>
          <div className="space-y-8">
            {[
              { q: "How many clients has RAKS IT SOLUTIONS served?", a: "We have successfully delivered over 200+ projects across Telangana, ranging from small local business websites to complex enterprise software solutions and AI-driven platforms." },
              { q: "Can I visit your office in Hanamkonda?", a: "Yes! We encourage local entrepreneurs to visit our Tri-City hub for face-to-face strategic sessions. We are located near the main commercial junction. Please contact us at +91 90105 91950 to schedule a visit." },
              { q: "Do you only work with Telangana businesses?", a: "While our heart is in Warangal, we serve clients globally. However, we offer specialized localized strategies for businesses within the Telangana region." },
              { q: "What makes RAKS IT different from other agencies?", a: "Our 'SEO-First' philosophy, deep local market understanding, and commitment to using enterprise-grade technology for every project, regardless of size." }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-[3rem] shadow-sm border border-brand-ash/10 hover:border-brand-blue/40 transition-all"
              >
                <p className="font-black text-brand-ash mb-4 text-2xl tracking-tight leading-tight">{faq.q}</p>
                <p className="text-brand-ash/80 text-lg leading-relaxed font-medium">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-blue rounded-[5rem] p-16 md:p-32 text-white text-center relative overflow-hidden shadow-2xl shadow-brand-blue/20"
        >
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black mb-12 leading-[1] tracking-tighter">Work with the Best <br />in Telangana.</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <a 
                href="https://wa.me/919010591950"
                className="bg-white text-brand-blue px-16 py-6 rounded-3xl font-black text-2xl hover:bg-brand-blue/5 transition-all shadow-xl hover:-translate-y-2 active:scale-95"
              >
                Join Our Success
              </a>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <Sparkles className="absolute top-10 left-10 w-32 h-32 text-white animate-pulse" />
            <Zap className="absolute bottom-10 right-10 w-32 h-32 text-white animate-bounce" />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;
