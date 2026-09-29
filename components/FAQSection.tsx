import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Code2, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  Check, 
  MessageCircle, 
  Send, 
  Sparkles,
  ThumbsUp,
  X
} from 'lucide-react';
import { Route } from '../types';

export interface FAQ {
  id: string;
  category: 'software' | 'marketing' | 'pricing' | 'support';
  categoryLabel: string;
  question: string;
  answer: string;
  keyPoints?: string[];
  readTime: string;
}

const FAQS_DATA: FAQ[] = [
  // Software Development Questions
  {
    id: 'software-services',
    category: 'software',
    categoryLabel: 'Software Engineering',
    question: 'What custom software development services does RAKS IT SOLUTIONS provide?',
    answer: 'We provide end-to-end custom software engineering tailored to your operational workflows rather than generic off-the-shelf templates. Our core engineering solutions encompass modern web applications, high-performance cross-platform and native mobile apps (iOS & Android), bespoke ERP and CRM business portals, secure RESTful and GraphQL API backends, and cloud infrastructure architecture on AWS and Google Cloud.',
    keyPoints: [
      'Custom Web Platforms (React, Next.js, Node.js, TypeScript)',
      'Cross-Platform Mobile Apps (Flutter, React Native)',
      'Enterprise Management Portals, ERP & Automated CRM Systems',
      'Scalable Database Engineering & Cloud Deployments (PostgreSQL, Docker, AWS)'
    ],
    readTime: '2 min read'
  },
  {
    id: 'software-timeline',
    category: 'software',
    categoryLabel: 'Software Engineering',
    question: 'How long does it take to develop a custom software application or mobile app?',
    answer: 'Development timelines depend on feature complexity, system integrations, and compliance requirements. We execute in agile two-week sprint cycles with live demonstration milestones so you test tangible features as they are built.',
    keyPoints: [
      'Discovery & Prototyping: 1 to 2 weeks for UI/UX wireframes and architecture specs',
      'Minimum Viable Product (MVP): Typically 4 to 8 weeks to functional launch',
      'Mid-tier Business Applications: 8 to 14 weeks for full feature sets',
      'Complex Enterprise Systems: 3 to 6 months phased in progressive sprint releases'
    ],
    readTime: '2 min read'
  },
  {
    id: 'code-ip-ownership',
    category: 'software',
    categoryLabel: 'Software Engineering',
    question: 'Do we retain 100% intellectual property (IP) and source code ownership?',
    answer: 'Yes, absolutely. Upon final project settlement, your company receives 100% perpetual ownership of all intellectual property, source code, database architectures, graphics, and technical documentation. We transfer complete repository access (GitHub/GitLab) with zero vendor lock-in, zero recurrent proprietary software royalties, and strict non-disclosure protections.',
    keyPoints: [
      'Full repository transfer with commit history and documentation',
      'Zero proprietary vendor lock-in or recurring per-seat code licensing fees',
      'Full confidentiality backed by comprehensive Mutual Non-Disclosure Agreements (NDAs)'
    ],
    readTime: '1 min read'
  },
  {
    id: 'legacy-modernization',
    category: 'software',
    categoryLabel: 'Software Engineering',
    question: 'Can you modernize, refactor, or take over an existing legacy software system?',
    answer: 'Yes. A large percentage of our engineering engagements involve auditing and upgrading existing systems. We conduct a comprehensive code health, database, and security audit, identify performance bottlenecks or technical debt, and engineer a staged migration plan to modernize legacy applications with zero operational downtime for your business.',
    keyPoints: [
      'Thorough static code analysis, database profiling, and vulnerability audit',
      'Microservice decoupling and API bridge development for legacy databases',
      'Zero-downtime database and server migration to modern cloud hosting'
    ],
    readTime: '2 min read'
  },
  {
    id: 'software-qa-testing',
    category: 'support',
    categoryLabel: 'Quality & Support',
    question: 'How do you guarantee software quality, security, and post-launch stability?',
    answer: 'Quality assurance is embedded into every development phase. We run continuous integration with automated unit tests, end-to-end user journey verifications, and cross-browser and mobile device compatibility checks. Every build adheres to OWASP security principles, data encryption standards, and includes a complimentary 90-day post-launch warranty covering bug resolutions.',
    keyPoints: [
      'Automated unit, integration, and user-acceptance testing (UAT)',
      'OWASP Top 10 security compliance and encrypted data transmission',
      'Included 90-day post-launch warranty with dedicated defect triage',
      'Optional Service Level Agreements (SLAs) for continuous monitoring and updates'
    ],
    readTime: '2 min read'
  },

  // Digital Marketing Questions
  {
    id: 'marketing-services',
    category: 'marketing',
    categoryLabel: 'Digital Marketing',
    question: 'What digital marketing services do you offer for growing businesses?',
    answer: 'We provide full-funnel digital growth marketing engineered to drive verified sales pipeline and qualified customer inquiries. Our services include hyper-local and multi-regional Search Engine Optimization (SEO), high-intent Google Ads (Search, Display, Performance Max), Meta Ads (Facebook & Instagram), B2B LinkedIn campaigns, Answer Engine Optimization (AEO) for AI search tools, and conversion-focused landing page development.',
    keyPoints: [
      'Hyper-Local SEO & Google Business Profile dominance across Telangana',
      'High-Conversion Pay-Per-Click (PPC) Management on Google Ads',
      'Precision Meta (Instagram & Facebook) Ad targeting for B2C & B2B brands',
      'Next-Gen Answer Engine Optimization (AEO) for Gemini and ChatGPT recommendations'
    ],
    readTime: '2 min read'
  },
  {
    id: 'marketing-roi-timeline',
    category: 'marketing',
    categoryLabel: 'Digital Marketing',
    question: 'How quickly can our business expect measurable leads and positive ROI?',
    answer: 'Timelines vary by marketing channel. Paid advertising funnels generate qualified calls, WhatsApp inquiries, and form submissions within the first 7 to 14 days of campaign launch. For organic Search Engine Optimization (SEO), foundational technical fixes and local map optimizations generate ranking surges within 30 to 60 days, with exponential inbound lead compounding across months 3 through 6.',
    keyPoints: [
      'PPC & Paid Social: Immediate inbound lead flow within 7 to 14 days',
      'Local Map Pack & On-Page SEO: Measurable traction within 30 to 60 days',
      'Organic Domain Authority & Broad Keyword Ranking: Compounding ROI over 3 to 6 months',
      'Weekly attribution tracking so every rupee spent is accounted for'
    ],
    readTime: '2 min read'
  },
  {
    id: 'local-seo-telangana',
    category: 'marketing',
    categoryLabel: 'Digital Marketing',
    question: 'What makes your local SEO approach in Warangal, Hanamkonda, and Telangana unique?',
    answer: 'Over 85% of commercial service inquiries in Telangana originate on mobile devices with high-intent localized search phrasing. We specialize in regional search dynamics, mapping bilingual search patterns (English and Telugu commercial queries), optimizing Google Business Profiles for the top 3 map-pack positions, and acquiring authoritative citations across regional Telangana trade directories.',
    keyPoints: [
      'Dominance in Google Maps 3-pack for high-converting regional searches',
      'Localized citation building and structured schema markup for Tri-City businesses',
      'Bilingual keyword mapping capturing real regional customer query phrasing',
      'Geo-targeted landing pages designed for high mobile conversion rates'
    ],
    readTime: '2 min read'
  },
  {
    id: 'marketing-reporting',
    category: 'marketing',
    categoryLabel: 'Digital Marketing',
    question: 'How do you track campaign performance, and what metrics are reported?',
    answer: 'We eliminate vanity metrics like impression counts and focus exclusively on commercial outcomes: qualified lead inquiries, cost per customer acquisition (CPA), conversion rates, and pipeline revenue. Every client receives access to a real-time live performance dashboard alongside scheduled bi-weekly strategy reviews with our digital marketing directors.',
    keyPoints: [
      '24/7 transparent analytics dashboard connected directly to Google Analytics 4',
      'Call and WhatsApp inquiry conversion attribution tracking',
      'Clear breakdown of cost per lead (CPL) and return on ad spend (ROAS)',
      'Actionable bi-weekly strategy calls with ongoing budget optimization'
    ],
    readTime: '2 min read'
  },

  // Pricing & Engagement Questions
  {
    id: 'pricing-structure',
    category: 'pricing',
    categoryLabel: 'Pricing & Contracts',
    question: 'How are your software and digital marketing projects priced?',
    answer: 'We prioritize clarity with milestone-based, transparent pricing and zero unexpected fees. Custom software projects are structured around fixed-scope delivery milestones so you only release payments against verified deliverables. Digital marketing campaigns operate on transparent monthly retainers tailored to your target lead volume, ad budget, and competitive landscape.',
    keyPoints: [
      'Software builds: Staged milestone schedule (25% kickoff, 25% architecture, 25% beta testing, 25% final deployment)',
      'Digital Marketing: Flexible monthly retainers with no lock-in contracts',
      'Clear line-item proposals detailing every single feature, sprint, and deliverable',
      'No surprise maintenance invoices or hidden charges'
    ],
    readTime: '2 min read'
  },
  {
    id: 'onboarding-process',
    category: 'pricing',
    categoryLabel: 'Pricing & Contracts',
    question: 'How quickly can we kick off, and what does the onboarding process look like?',
    answer: 'Getting started is seamless and typically completed within 24 to 48 hours. After an initial 30-minute discovery consultation, our solutions architects analyze your requirements and present a formal technical scope or digital marketing roadmap. Once the agreement and initial milestone are confirmed, we set up your dedicated project workspace and commence sprint planning.',
    keyPoints: [
      'Step 1: Free 30-minute discovery call to evaluate goals and technical stack',
      'Step 2: Custom scope proposal and sprint roadmap delivered within 48 hours',
      'Step 3: Kickoff with a dedicated project manager and direct communication channels'
    ],
    readTime: '1 min read'
  }
];

interface FAQSectionProps {
  onSetRoute?: (route: Route) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({ onSetRoute }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['software-services', 'marketing-services']));
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Questions', count: FAQS_DATA.length },
    { id: 'software', label: 'Software Engineering', count: FAQS_DATA.filter(f => f.category === 'software').length },
    { id: 'marketing', label: 'Digital Marketing & SEO', count: FAQS_DATA.filter(f => f.category === 'marketing').length },
    { id: 'pricing', label: 'Pricing & Delivery', count: FAQS_DATA.filter(f => f.category === 'pricing').length },
    { id: 'support', label: 'Security & Quality', count: FAQS_DATA.filter(f => f.category === 'support').length }
  ];

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch = 
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.keyPoints && item.keyPoints.some(kp => kp.toLowerCase().includes(q))) ||
        item.categoryLabel.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    const allFilteredIds = new Set(filteredFaqs.map(f => f.id));
    setOpenIds(allFilteredIds);
  };

  const handleCollapseAll = () => {
    setOpenIds(new Set());
  };

  const markHelpful = (id: string, isHelpful: boolean) => {
    setHelpfulFeedback(prev => ({ ...prev, [id]: isHelpful }));
  };

  const scrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else if (onSetRoute) {
      onSetRoute({ type: 'contact-page' });
    }
  };

  return (
    <section id="faq" className="py-24 bg-brand-white relative overflow-hidden border-t border-brand-ash/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand-blue uppercase tracking-widest mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Client Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-ash tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-brand-ash/70 leading-relaxed font-medium">
            Clear, honest answers about our custom software engineering, local SEO dominance, project timelines, and transparent pricing models.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-10 max-w-4xl mx-auto space-y-6">
          
          {/* Live Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-brand-ash/40">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g., code ownership, timelines, SEO ROI, pricing)..."
              className="w-full pl-12 pr-12 py-4 bg-white border border-brand-ash/20 rounded-2xl text-brand-ash font-medium text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-ash/40 hover:text-brand-ash transition-colors"
                title="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Interactive Category Segmented Control */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-brand-ash/5 rounded-2xl border border-brand-ash/10">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                      isActive 
                        ? 'bg-brand-blue text-white shadow-md' 
                        : 'text-brand-ash hover:text-brand-blue hover:bg-white/60'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] tabular-nums font-semibold px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-white/20 text-white' : 'bg-brand-ash/10 text-brand-ash/70'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions (Expand / Collapse All) */}
            <div className="flex items-center gap-3 text-xs font-bold text-brand-ash/60">
              <button 
                onClick={handleExpandAll}
                className="hover:text-brand-blue transition-colors px-2 py-1"
              >
                Expand all
              </button>
              <span className="text-brand-ash/30">|</span>
              <button 
                onClick={handleCollapseAll}
                className="hover:text-brand-blue transition-colors px-2 py-1"
              >
                Collapse all
              </button>
            </div>
          </div>
        </div>

        {/* Accordion Questions List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-brand-ash/10 shadow-sm">
              <HelpCircle className="w-12 h-12 text-brand-ash/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brand-ash mb-2">No matching questions found</h3>
              <p className="text-brand-ash/70 mb-6 max-w-md mx-auto text-sm">
                We couldn't find an answer matching "{searchQuery}". You can clear your search or speak directly with our engineering and marketing leads.
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setSearchQuery('')}
                  className="bg-brand-ash/10 text-brand-ash hover:bg-brand-ash/20 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Clear Search
                </button>
                <a 
                  href="https://wa.me/919010591950?text=Hello%20RAKS%20IT%20SOLUTIONS,%20I%20have%20a%20question%20regarding%20your%20services." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-brand-blue text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-blue/90 transition-colors inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Ask on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIds.has(faq.id);
              const feedback = helpfulFeedback[faq.id];

              return (
                <div 
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'border-brand-blue/40 shadow-md ring-1 ring-brand-blue/10' 
                      : 'border-brand-ash/10 hover:border-brand-blue/20 hover:shadow-sm'
                  }`}
                >
                  {/* Accordion Trigger Button */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  >
                    <div className="pr-6 space-y-1.5 flex-1">
                      {/* Zero-Pill Clean Typographic Metadata */}
                      <div className="flex items-center gap-2 text-xs font-semibold text-brand-ash/60">
                        <span className="text-brand-blue font-bold">{faq.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{faq.readTime}</span>
                      </div>
                      <h3 className={`text-lg sm:text-xl font-bold transition-colors ${
                        isOpen ? 'text-brand-blue' : 'text-brand-ash hover:text-brand-blue'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>
                    
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-brand-blue text-white rotate-180' : 'bg-brand-ash/5 text-brand-ash/60'
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {/* Accordion Content Panel */}
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 border-t border-brand-ash/5 animate-in fade-in duration-200">
                      <div className="pt-4 space-y-4">
                        <p className="text-brand-ash/85 leading-relaxed text-base font-normal">
                          {faq.answer}
                        </p>

                        {/* Bulleted Highlights (if available) */}
                        {faq.keyPoints && faq.keyPoints.length > 0 && (
                          <div className="bg-brand-ash/5 rounded-xl p-4 sm:p-5 mt-4 space-y-2.5">
                            <h4 className="text-xs font-black uppercase tracking-wider text-brand-ash/70 flex items-center gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-brand-blue" /> Key Takeaways
                            </h4>
                            <ul className="space-y-2">
                              {faq.keyPoints.map((point, ptIdx) => (
                                <li key={ptIdx} className="flex items-start text-sm text-brand-ash font-medium">
                                  <Check className="w-4 h-4 text-emerald-600 mr-2.5 flex-shrink-0 mt-0.5" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Accordion Footer: Feedback interaction */}
                        <div className="pt-4 mt-4 border-t border-brand-ash/10 flex flex-wrap items-center justify-between text-xs text-brand-ash/60 gap-3">
                          <span className="font-medium">Was this answer helpful?</span>
                          <div className="flex items-center gap-2">
                            {feedback === undefined ? (
                              <>
                                <button 
                                  onClick={() => markHelpful(faq.id, true)}
                                  className="px-3 py-1 rounded-lg border border-brand-ash/20 hover:border-brand-blue hover:text-brand-blue transition-colors flex items-center gap-1.5"
                                >
                                  <ThumbsUp className="w-3 h-3" /> Yes
                                </button>
                                <button 
                                  onClick={() => markHelpful(faq.id, false)}
                                  className="px-3 py-1 rounded-lg border border-brand-ash/20 hover:border-red-400 hover:text-red-600 transition-colors"
                                >
                                  No
                                </button>
                              </>
                            ) : (
                              <span className="text-emerald-700 font-bold flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" /> Thank you for your feedback!
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Direct Support & Discovery CTA */}
        <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-br from-brand-ash to-slate-900 text-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left max-w-lg">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue bg-white px-3 py-1 rounded-full mb-4">
                <Clock className="w-3.5 h-3.5 text-brand-blue" />
                <span>Fast 24-Hour Response</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                Have a specific question about your project?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Our principal software architects and digital strategists in Warangal & Hyderabad are ready to evaluate your requirements with zero obligation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <a 
                href="https://wa.me/919010591950?text=Hello%20RAKS%20IT%20SOLUTIONS,%20I'd%20like%20to%20discuss%20a%20project%20inquiry." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-green-600 hover:bg-green-700 text-white font-black text-sm px-6 py-4 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
              <button 
                onClick={scrollToContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white text-slate-900 hover:bg-brand-white font-black text-sm px-6 py-4 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 whitespace-nowrap"
              >
                <span>Request Proposal</span>
                <Send className="w-4 h-4 text-brand-blue" />
              </button>
            </div>
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
