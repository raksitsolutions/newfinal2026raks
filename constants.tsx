
import React from 'react';
import { 
  Monitor, Code, Palette, Megaphone, Smartphone, Server, Building2, Stethoscope, 
  GraduationCap, ShoppingCart, Factory, Globe, ShieldCheck, Cloud, Database, 
  BarChart3, Lock, Wrench, Search, Users, Layout, Share2, MousePointer2, 
  MapPin, PenTool, HardDrive, Zap, Award, BookOpen, Newspaper, Laptop, 
  Truck, Banknote, Plane, UtensilsCrossed, Car, HeartHandshake, Briefcase, Scale, Heart
} from 'lucide-react';
import { Service, Industry, LocationInfo, BlogPost, CaseStudy, Testimonial } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cosmetic-factory',
    title: 'Digital Transformation for Cosmetic Manufacturing',
    client: 'Cosmetic Factory',
    category: 'Manufacturing',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
    growth: '35% Sales Increase',
    description: 'Redesigning the digital presence for a leading cosmetic factory to reach B2B and B2C markets.',
    strategies: ['Website Redesign', 'Meta Ads', 'SEO Optimization', 'AI Chatbots'],
    pros: ['High brand visibility', 'Direct customer engagement', 'Streamlined ordering'],
    cons: ['Initial high ad spend', 'Complex inventory sync'],
    implementation: 'We implemented a modern e-commerce platform integrated with AI-driven customer support and targeted Meta ads to boost local and national sales.'
  },
  {
    id: 'ramakrishna-hospital',
    title: 'Healthcare Reach Expansion',
    client: 'Ramakrishna Hospital',
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    growth: '25% Appointment Growth',
    description: 'Improving patient reach and appointment bookings through medical SEO and social media.',
    strategies: ['Medical SEO', 'Social Media Management', 'Google Ads', 'Patient Portal'],
    pros: ['Trust building', 'Easy booking', 'Local dominance'],
    cons: ['Strict medical compliance', 'Slow organic growth'],
    implementation: 'Focused on local SEO for specific medical terms and launched a series of educational social media campaigns to establish authority.'
  },
  {
    id: 'sphoorthi-interiors',
    title: 'Visual Storytelling for Interior Design',
    client: 'Sphoorthi Interiors',
    category: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
    growth: '40% Lead Increase',
    description: 'Showcasing premium interior designs through high-quality visuals and targeted ads.',
    strategies: ['Portfolio Website', 'Instagram Marketing', 'Meta Ads', 'AI Image Enhancement'],
    pros: ['Stunning visual appeal', 'High-quality leads', 'Brand premiumization'],
    cons: ['High dependency on visual content', 'Long sales cycle'],
    implementation: 'Created a visually-driven portfolio site and used Meta ads to target high-net-worth individuals interested in home renovation.'
  },
  {
    id: 'mother-teresa-school',
    title: 'Educational Enrollment Boost',
    client: 'St. Mother Teresa High School',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1523050335102-c32509b40d44?auto=format&fit=crop&q=80&w=800',
    growth: '30% Enrollment Growth',
    description: 'Digital branding and enrollment funnels for a premier educational institution.',
    strategies: ['School Portal', 'Facebook Ads', 'Local SEO', 'Video Tours'],
    pros: ['Better parent engagement', 'Streamlined admissions', 'Strong local brand'],
    cons: ['Seasonal demand', 'High competition'],
    implementation: 'Developed a comprehensive school portal and ran targeted local ads during the admission season to showcase campus life.'
  },
  {
    id: 'asr-skill-hub',
    title: 'Skill Development Platform Growth',
    client: 'ASR Skill Hub',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    growth: '38% Student Increase',
    description: 'Scaling a skill development center through digital marketing and LMS integration.',
    strategies: ['LMS Development', 'LinkedIn Marketing', 'Google Search Ads', 'AI Course Recs'],
    pros: ['Automated learning', 'Wide reach', 'Data-driven insights'],
    cons: ['Content maintenance', 'Technical learning curve'],
    implementation: 'Built a custom LMS and used professional networking platforms to reach students looking for career advancement.'
  },
  {
    id: 'srikrishna-youtube',
    title: 'YouTube Channel Optimization',
    client: 'Srikrishna Karnamrutham',
    category: 'Media',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800',
    growth: '45% Subscriber Growth',
    description: 'Optimizing a spiritual YouTube channel for better reach and engagement.',
    strategies: ['Video SEO', 'Social Media Cross-Promotion', 'Thumbnail Design', 'AI Scripting'],
    pros: ['Viral potential', 'Global audience', 'High engagement'],
    cons: ['Algorithm dependency', 'Constant content creation'],
    implementation: 'Applied advanced video SEO techniques and redesigned thumbnails to improve click-through rates significantly.'
  },
  {
    id: 'chakravarthy-hospitals',
    title: 'Multi-Specialty Hospital Digital Presence',
    client: 'Chakravarthy Hospitals',
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1586773860418-d3b9a8ec8c77?auto=format&fit=crop&q=80&w=800',
    growth: '28% Patient Inflow',
    description: 'Comprehensive digital strategy for a multi-specialty hospital chain.',
    strategies: ['Enterprise Website', 'Local SEO', 'Meta Ads', 'AI Appointment Bot'],
    pros: ['Centralized management', 'Improved patient trust', 'Efficient support'],
    cons: ['Complex data migration', 'Ongoing maintenance'],
    implementation: 'Launched a multi-lingual website and an AI-powered chatbot to handle initial patient inquiries and bookings.'
  },
  {
    id: 'vrindavan-resort',
    title: 'Hospitality & Tourism Growth',
    client: 'Vrindavan Farm Stay Resort',
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    growth: '42% Booking Increase',
    description: 'Promoting a luxury farm stay through immersive digital experiences.',
    strategies: ['Booking Engine', 'Influencer Marketing', 'Meta Ads', '360 Virtual Tour'],
    pros: ['Direct bookings', 'High brand desire', 'Immersive experience'],
    cons: ['Weather dependency', 'High seasonal peaks'],
    implementation: 'Integrated a direct booking engine and used high-quality video content to showcase the resort experience on social media.'
  },
  {
    id: 'spring-consultancy',
    title: 'B2B Lead Gen for Consultancy',
    client: 'Spring Consultancy',
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=800',
    growth: '32% Client Growth',
    description: 'Establishing authority and generating B2B leads for a financial consultancy.',
    strategies: ['Corporate Website', 'LinkedIn Ads', 'SEO Content', 'Email Automation'],
    pros: ['Professional authority', 'Qualified leads', 'Automated nurturing'],
    cons: ['Long conversion time', 'Niche audience'],
    implementation: 'Focused on high-value content marketing and LinkedIn ads to reach decision-makers in the corporate sector.'
  },
  {
    id: 'study-overseas',
    title: 'International Education Marketing',
    client: 'Study Overseas',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1523240715639-99f811c81592?auto=format&fit=crop&q=80&w=800',
    growth: '36% Application Increase',
    description: 'Helping students achieve their global education dreams through digital guidance.',
    strategies: ['Inquiry Portal', 'Google Search Ads', 'Social Media Branding', 'AI Counselor'],
    pros: ['High intent leads', 'Global reach', 'Trust building'],
    cons: ['Complex visa regulations', 'High ad competition'],
    implementation: 'Launched targeted search campaigns for study abroad terms and implemented an AI counselor to answer common student queries.'
  },
  {
    id: 'yatrika-travel',
    title: 'Travel & Tour Package Scaling',
    client: 'Yatrika India Tour Travel',
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800',
    growth: '40% Tour Bookings',
    description: 'Scaling a travel agency through custom tour packages and digital ads.',
    strategies: ['E-commerce Travel Site', 'Meta Ads', 'SEO Strategy', 'Customer Reviews'],
    pros: ['Package customization', 'Direct sales', 'Social proof'],
    cons: ['Price sensitivity', 'Logistics coordination'],
    implementation: 'Developed a user-friendly site for browsing and booking tour packages, supported by aggressive Meta ad campaigns.'
  },
  {
    id: 'queen-boutique',
    title: 'Fashion Boutique Digital Expansion',
    client: 'Queen Fashion Boutique',
    category: 'Ecommerce',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800',
    growth: '34% Sales Growth',
    description: 'Bringing a local boutique to the national stage through e-commerce.',
    strategies: ['Shopify Store', 'Instagram Shopping', 'Meta Ads', 'AI Fashion Assistant'],
    pros: ['National reach', 'Visual brand growth', '24/7 sales'],
    cons: ['Return management', 'High competition'],
    implementation: 'Launched a Shopify store integrated with Instagram shopping and used Meta ads to target fashion-conscious audiences.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Ramakrishna',
    role: 'Managing Director',
    company: 'Ramakrishna Hospital',
    content: 'RAKS IT SOLUTIONS transformed our digital presence. Our patient appointments have grown by 25% since we started our SEO and social media journey with them.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '2',
    name: 'Srinivas Rao',
    role: 'Founder',
    company: 'Sphoorthi Interiors',
    content: 'The visual storytelling they provided for our interior design projects was exceptional. We saw a 40% increase in high-quality leads within just a few months.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '3',
    name: 'Anitha Reddy',
    role: 'Owner',
    company: 'Queen Fashion Boutique',
    content: 'Scaling from a local shop to a national brand seemed impossible until RAKS IT stepped in. Our online sales have been phenomenal.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
  }
];

export const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c', title: 'Our Modern Workspace', category: 'Office' },
  { url: 'https://images.unsplash.com/photo-1522071823991-b9671f9d7f1f', title: 'Team Collaboration', category: 'Team' },
  { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978', title: 'Strategic Planning Session', category: 'Meeting' },
  { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', title: 'Data Analytics Review', category: 'Tech' },
];

export const SLIDER_ITEMS = [
  {
    title: "Global Standards, Local Expertise",
    subtitle: "From Warangal to the World",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920",
    cta: "Explore Solutions"
  },
  {
    title: "The King of SEO in Telangana",
    subtitle: "Rank #1 on Google in 90 Days",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1920",
    cta: "Dominate Search"
  }
];

export const SERVICES: Service[] = [
  {
    id: 'seo',
    title: 'SEO Services',
    description: 'Data-driven Search Engine Optimization to help you rank #1 in Warangal.',
    icon: 'Search',
    path: '/services/seo',
    seo: {
      metaTitle: "Best SEO Agency in Warangal & Hanamkonda - Rank #1 Guaranteed",
      metaDescription: "Boost your organic traffic with RAKS IT SOLUTIONS, the best SEO company in Warangal. Expert keyword research, local SEO, and AI search optimization for Telangana businesses.",
      h1: "Top-Rated Professional SEO in Warangal & Hanamkonda",
      body: `<div class="space-y-8">
        <section>
          <h2 class="text-4xl font-black text-slate-900 mb-6 tracking-tighter">Why SEO is the Lifeblood of Warangal Businesses</h2>
          <p class="text-xl text-slate-600 leading-relaxed mb-6">
            In the rapidly evolving digital landscape of <strong>Warangal and Hanamkonda</strong>, your business's visibility is directly tied to your search engine ranking. RAKS IT SOLUTIONS offers a comprehensive, data-driven SEO strategy that ensures your website doesn't just exist—it dominates. As the premier <strong>SEO agency in Telangana</strong>, we understand that local businesses need more than just generic traffic; they need high-intent visitors who are ready to convert.
          </p>
          <p class="text-xl text-slate-600 leading-relaxed mb-6">
            Our approach to <strong>Search Engine Optimization in Warangal</strong> is built on three pillars: Technical Excellence, Content Authority, and Local Relevance. We dive deep into the search patterns of the Tri-City area (Warangal, Hanamkonda, Kazipet) to identify the exact keywords your potential customers are using. Whether they are searching for "best hospitals in Hanamkonda" or "top interior designers in Warangal," we ensure your brand is the first one they see.
          </p>
        </section>

        <section class="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
          <h3 class="text-3xl font-black text-blue-900 mb-4">Our 90-Day SEO Dominance Roadmap</h3>
          <p class="text-lg text-blue-800 mb-6 font-medium">We don't believe in "quick fixes." We believe in sustainable growth that keeps you at the top for years, not weeks.</p>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0">
            <li class="flex items-start gap-3 bg-white p-6 rounded-2xl shadow-sm">
              <span class="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</span>
              <div>
                <p class="font-black text-slate-900">Deep Audit & Keyword Discovery</p>
                <p class="text-sm text-slate-500">We analyze your current standing and find the "Gold Mine" keywords in the Telangana market.</p>
              </div>
            </li>
            <li class="flex items-start gap-3 bg-white p-6 rounded-2xl shadow-sm">
              <span class="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</span>
              <div>
                <p class="font-black text-slate-900">On-Page & Technical Fortification</p>
                <p class="text-sm text-slate-500">We optimize your site architecture, speed, and meta-data for maximum Google crawlability.</p>
              </div>
            </li>
            <li class="flex items-start gap-3 bg-white p-6 rounded-2xl shadow-sm">
              <span class="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</span>
              <div>
                <p class="font-black text-slate-900">Local Authority Building</p>
                <p class="text-sm text-slate-500">We secure high-quality backlinks and local citations that signal trust to search engines.</p>
              </div>
            </li>
            <li class="flex items-start gap-3 bg-white p-6 rounded-2xl shadow-sm">
              <span class="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</span>
              <div>
                <p class="font-black text-slate-900">AEO & AI Search Integration</p>
                <p class="text-sm text-slate-500">We optimize your content for AI assistants like Gemini, ensuring you are the "Answer" to every query.</p>
              </div>
            </li>
          </ul>
        </section>

        <section>
          <h3 class="text-3xl font-black text-slate-900 mb-6">Local SEO: Capturing the Tri-City Market</h3>
          <p class="text-xl text-slate-600 leading-relaxed mb-6">
            For businesses in <strong>Kazipet and Hanamkonda</strong>, local SEO is the difference between a thriving storefront and an empty one. Our specialized <strong>GMB (Google My Business) optimization</strong> services ensure that when someone searches for services "near me," your business appears in the coveted "Map Pack." We manage your reviews, optimize your business description with local landmarks, and ensure your NAP (Name, Address, Phone) consistency across the web.
          </p>
          <p class="text-xl text-slate-600 leading-relaxed">
            By partnering with RAKS IT SOLUTIONS, you are choosing the <strong>best SEO company in Warangal</strong>. We provide monthly transparent reporting, showing you exactly how your rankings have improved and how many new leads have been generated through our organic efforts.
          </p>
        </section>
      </div>`,
      features: ["Advanced Keyword Research", "Backlink Building", "Technical SEO Audits", "GMB Management"],
      faqs: [{ question: "How long to rank in Warangal?", answer: "Typically 3-4 months for local keywords." }]
    }
  },
  {
    id: 'local-seo',
    title: 'Local SEO & GMB',
    description: 'Dominate local search results and optimize your Google Business Profile.',
    icon: 'MapPin',
    path: '/services/local-seo',
    seo: {
      metaTitle: "Local SEO & Google My Business Optimization in Warangal",
      metaDescription: "Rank #1 in Google Maps. Expert GMB optimization and local SEO services in Hanamkonda & Warangal by RAKS IT SOLUTIONS.",
      h1: "Local SEO & Google Business Profile Optimization in Telangana",
      body: `<div class="space-y-8">
        <section>
          <h2 class="text-4xl font-black text-slate-900 mb-6 tracking-tighter">Mastering Local Search in Hanamkonda & Warangal</h2>
          <p class="text-xl text-slate-600 leading-relaxed mb-6">
            Local search is the most powerful tool for small and medium businesses in <strong>Warangal and Hanamkonda</strong>. When a potential customer in Kazipet searches for a service you provide, you need to be the first result they see on Google Maps. RAKS IT SOLUTIONS specializes in <strong>Local SEO</strong> strategies that drive physical foot traffic and direct phone calls to your business.
          </p>
          <p class="text-xl text-slate-600 leading-relaxed mb-6">
            Our <strong>Google My Business (GMB) optimization</strong> service is second to none in Telangana. We don't just set up your profile; we optimize it for maximum conversion. This includes professional photography of your location, strategic keyword placement in your business description, and a proactive review management strategy that builds trust with local customers.
          </p>
        </section>

        <section class="bg-green-50 p-10 rounded-[3rem] border border-green-100">
          <h3 class="text-3xl font-black text-green-900 mb-6">Our Local SEO Checklist for Tri-City Success</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="bg-green-600 text-white p-2 rounded-lg h-fit"><CheckCircle2 className="w-5 h-5" /></div>
              <div>
                <p className="font-black text-slate-900">GMB Audit & Optimization</p>
                <p className="text-slate-600">Complete overhaul of your Google Business Profile for higher visibility.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-green-600 text-white p-2 rounded-lg h-fit"><CheckCircle2 className="w-5 h-5" /></div>
              <div>
                <p className="font-black text-slate-900">Local Citation Building</p>
                <p className="text-slate-600">Listing your business in high-authority local directories across Telangana.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-green-600 text-white p-2 rounded-lg h-fit"><CheckCircle2 className="w-5 h-5" /></div>
              <div>
                <p className="font-black text-slate-900">Review Strategy</p>
                <p className="text-slate-600">Implementing systems to gather positive reviews from your happy customers.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-green-600 text-white p-2 rounded-lg h-fit"><CheckCircle2 className="w-5 h-5" /></div>
              <div>
                <p className="font-black text-slate-900">Local Content Creation</p>
                <p className="text-slate-600">Writing blog posts and updates that mention local events and landmarks.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 class="text-3xl font-black text-slate-900 mb-6">Local SEO vs. Global SEO</h3>
          <p class="text-xl text-slate-600 leading-relaxed mb-6">
            While global SEO focuses on broad keywords, <strong>Local SEO in Warangal</strong> focuses on "near me" and city-specific queries. We understand the nuances of the <strong>Hanamkonda</strong> market and how to leverage local search intent to beat your competitors. Whether you run a retail store, a clinic, or a consultancy, our local SEO services are designed to make you the local leader.
          </p>
        </section>
      </div>`,
      features: ["GMB Profile Setup", "Local Citation Building", "Review Management", "Map Pack Ranking"],
      faqs: [{ question: "What is GMB?", answer: "Google My Business (now Google Business Profile) is your digital storefront on Google Maps." }]
    }
  },
  {
    id: 'web-design',
    title: 'Web Design',
    description: 'Stunning, user-centric designs that capture your brand essence.',
    icon: 'Palette',
    path: '/services/web-design',
    seo: {
      metaTitle: "Best Web Design in Warangal & Hanamkonda - Creative UX/UI Lab",
      metaDescription: "Get the best web design services in Telangana. We create modern, responsive, and high-converting websites for businesses in Hanamkonda, Warangal, and beyond.",
      h1: "Premier Web Design & Creative Services in Hanamkonda",
      body: `<div class="space-y-8">
        <section>
          <h2 class="text-4xl font-black text-slate-900 mb-6 tracking-tighter">Creative Web Design That Converts in Telangana</h2>
          <p class="text-xl text-slate-600 leading-relaxed mb-6">
            Your website is often the first interaction a customer has with your brand in <strong>Warangal or Hanamkonda</strong>. At RAKS IT SOLUTIONS, we don't just design websites; we craft digital experiences. Our <strong>web design services in Telangana</strong> are focused on creating visually stunning, user-centric interfaces that guide your visitors toward conversion.
          </p>
          <p class="text-xl text-slate-600 leading-relaxed mb-6">
            We believe in "Design with Purpose." Every element on your site—from the color palette to the typography—is chosen to reflect your brand's identity and resonate with your local audience. Whether you are a startup in <strong>Kazipet</strong> or an established hospital in <strong>Hanamkonda</strong>, we ensure your website stands out in a crowded digital marketplace.
          </p>
        </section>

        <section class="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
          <h3 class="text-3xl font-black text-indigo-900 mb-6">Our Design Philosophy</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-3xl shadow-sm">
              <div class="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg"><Layout className="w-6 h-6" /></div>
              <p class="font-black text-slate-900 mb-2">User-Centric UX</p>
              <p class="text-sm text-slate-500">We prioritize the user's journey, making navigation intuitive and seamless.</p>
            </div>
            <div class="bg-white p-8 rounded-3xl shadow-sm">
              <div class="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg"><Smartphone className="w-6 h-6" /></div>
              <p class="font-black text-slate-900 mb-2">Mobile-First</p>
              <p class="text-sm text-slate-500">With 80% of local traffic on mobile, we ensure your site looks perfect on every screen.</p>
            </div>
            <div class="bg-white p-8 rounded-3xl shadow-sm">
              <div class="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg"><Zap className="w-6 h-6" /></div>
              <p class="font-black text-slate-900 mb-2">Conversion Focused</p>
              <p class="text-sm text-slate-500">Strategic CTAs and layout optimization to drive more leads and sales.</p>
            </div>
          </div>
        </section>

        <section>
          <h3 class="text-3xl font-black text-slate-900 mb-6">The Best Web Designers in Warangal</h3>
          <p class="text-xl text-slate-600 leading-relaxed mb-6">
            Our team of expert designers in <strong>Hanamkonda</strong> stays ahead of global design trends while maintaining a deep understanding of local aesthetic preferences. We use tools like Figma and Adobe Creative Suite to create high-fidelity prototypes before we even start coding. This ensures that you are 100% satisfied with the look and feel of your new digital home.
          </p>
        </section>
      </div>`,
      features: ["Mobile-First Design", "UX/UI Strategy", "Brand Integration"],
      faqs: [{ question: "Do you design for mobile?", answer: "Yes, 100% of our designs are mobile-responsive." }]
    }
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'High-performance, secure, and scalable web applications.',
    icon: 'Code',
    path: '/services/web-dev',
    seo: {
      metaTitle: "Web Development Company in Hanamkonda - RAKS IT",
      metaDescription: "Full-stack development in Telangana. Expert developers in Warangal for MERN and Python.",
      h1: "Custom Web Development in Hanamkonda & Warangal",
      body: `<div class="space-y-8">
        <section>
          <h2 class="text-4xl font-black text-slate-900 mb-6 tracking-tighter">High-Performance Web Development in Warangal</h2>
          <p class="text-xl text-slate-600 leading-relaxed mb-6">
            In today's competitive market, a slow or buggy website is a liability. RAKS IT SOLUTIONS provides enterprise-grade <strong>web development services in Warangal and Hanamkonda</strong>. We specialize in building fast, secure, and scalable web applications that serve as the backbone of your digital business.
          </p>
          <p class="text-xl text-slate-600 leading-relaxed mb-6">
            Our development team in <strong>Telangana</strong> is proficient in the latest technologies, including the <strong>MERN stack (MongoDB, Express, React, Node.js)</strong>, Python, and robust e-commerce platforms. Whether you need a simple corporate site or a complex custom web portal for your <strong>Kazipet</strong>-based industry, we have the technical expertise to deliver.
          </p>
        </section>

        <section class="bg-slate-900 p-12 rounded-[4rem] text-white overflow-hidden relative">
          <div class="relative z-10">
            <h3 class="text-3xl font-black mb-8">Our Technical Stack</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div class="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                <p class="text-blue-400 font-black mb-2">Frontend</p>
                <p class="text-sm text-slate-300">React.js, Next.js, Tailwind CSS</p>
              </div>
              <div class="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                <p class="text-blue-400 font-black mb-2">Backend</p>
                <p class="text-sm text-slate-300">Node.js, Express, Python (FastAPI)</p>
              </div>
              <div class="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                <p class="text-blue-400 font-black mb-2">Database</p>
                <p class="text-sm text-slate-300">MongoDB, PostgreSQL, Firebase</p>
              </div>
              <div class="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                <p class="text-blue-400 font-black mb-2">Cloud</p>
                <p class="text-sm text-slate-300">AWS, Azure, Google Cloud</p>
              </div>
            </div>
          </div>
          <div class="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -z-0"></div>
        </section>

        <section>
          <h3 class="text-3xl font-black text-slate-900 mb-6">Why RAKS IT is the Best Web Development Company in Hanamkonda</h3>
          <p class="text-xl text-slate-600 leading-relaxed mb-6">
            We don't just write code; we solve business problems. Our <strong>web development process in Warangal</strong> includes rigorous testing for security, performance, and cross-browser compatibility. We ensure that your site is optimized for speed, which is a critical factor for both user experience and SEO.
          </p>
          <p class="text-xl text-slate-600 leading-relaxed">
            From <strong>e-commerce development</strong> to custom <strong>SaaS applications</strong>, RAKS IT SOLUTIONS is the trusted partner for businesses across Telangana looking for reliable and innovative web solutions.
          </p>
        </section>
      </div>`,
      features: ["MERN Stack", "E-commerce Solutions", "API Integration"],
      faqs: [{ question: "Which tech stack?", answer: "React, Node, Python, and Flutter." }]
    }
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Compelling visual content for social media and print.',
    icon: 'PenTool',
    path: '/services/graphic-design',
    seo: {
      metaTitle: "Graphic Design Agency in Warangal - Logos & Flyers",
      metaDescription: "Professional graphics for businesses in Hanamkonda. Creative logo and social media design.",
      h1: "Creative Graphic Design Solutions in Warangal",
      body: `<p>Stand out in the Warangal market with high-quality visual storytelling.</p>`,
      features: ["Logo Design", "Social Media Graphics", "Print Design"],
      faqs: [{ question: "Can I get a logo?", answer: "Yes, we specialize in iconic brand marks." }]
    }
  },
  {
    id: 'branding',
    title: 'Branding',
    description: 'Defining your unique voice and presence in the market.',
    icon: 'Award',
    path: '/services/branding',
    seo: {
      metaTitle: "Branding Services in Hanamkonda - RAKS IT SOLUTIONS",
      metaDescription: "Build a strong brand identity in Telangana. Expert positioning for Warangal businesses.",
      h1: "Strategic Branding & Identity in Hanamkonda",
      body: `<p>Building brands that resonate with the local Telangana audience while scaling globally.</p>`,
      features: ["Brand Guidelines", "Positioning", "Market Research"],
      faqs: [{ question: "What is branding?", answer: "It's the emotional connection your customers have with your business." }]
    }
  },
  {
    id: 'web-hosting',
    title: 'Web Hosting',
    description: 'Reliable, secure, and fast hosting solutions.',
    icon: 'HardDrive',
    path: '/services/web-hosting',
    seo: {
      metaTitle: "Secure Web Hosting in Warangal - SSD Fast Servers",
      metaDescription: "Local web hosting in Telangana with 99.9% uptime. Best support in Hanamkonda.",
      h1: "High-Speed Web Hosting in Warangal & Hanamkonda",
      body: `<p>Experience lighting-fast loading times with our Telangana-based server support.</p>`,
      features: ["Free SSL", "99.9% Uptime", "Local Support"],
      faqs: [{ question: "Do you offer domains?", answer: "Yes, we handle end-to-end domain and hosting setup." }]
    }
  },
  {
    id: 'mobile-app',
    title: 'App Development',
    description: 'Native and cross-platform mobile apps for Android and iOS.',
    icon: 'Smartphone',
    path: '/services/mobile-app',
    seo: {
      metaTitle: "App Development in Warangal - Android & iOS Experts",
      metaDescription: "Build mobile apps in Hanamkonda. Expert Flutter and React Native developers in Telangana.",
      h1: "Custom Mobile App Development in Warangal",
      body: `<div class="space-y-8">
        <section>
          <h2 class="text-4xl font-black text-slate-900 mb-6 tracking-tighter">Innovative Mobile App Development in Hanamkonda</h2>
          <p class="text-xl text-slate-600 leading-relaxed mb-6">
            The future is mobile, and RAKS IT SOLUTIONS is here to help you lead the way. We provide high-end <strong>mobile app development services in Warangal and Hanamkonda</strong>, creating native and cross-platform applications that offer seamless user experiences. Whether you need an app for Android, iOS, or both, our team in <strong>Telangana</strong> has the skills to bring your vision to life.
          </p>
          <p class="text-xl text-slate-600 leading-relaxed mb-6">
            We specialize in <strong>Flutter development</strong> and <strong>React Native</strong>, allowing us to build high-performance apps with a single codebase. This means faster time-to-market and lower development costs for your business in <strong>Kazipet</strong>. From initial concept and UI/UX design to deployment and maintenance, we handle the entire app lifecycle.
          </p>
        </section>

        <section class="bg-blue-900 p-12 rounded-[4rem] text-white overflow-hidden relative">
          <div class="relative z-10">
            <h3 class="text-3xl font-black mb-8">Our App Development Process</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                <div class="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg"><PenTool className="w-6 h-6" /></div>
                <p class="text-xl font-black mb-2">Discovery & UI/UX</p>
                <p class="text-sm text-slate-300">We define your app's goals and create a stunning, intuitive design.</p>
              </div>
              <div class="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                <div class="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg"><Code className="w-6 h-6" /></div>
                <p class="text-xl font-black mb-2">Agile Development</p>
                <p class="text-sm text-slate-300">We build your app in sprints, ensuring transparency and quality at every step.</p>
              </div>
              <div class="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                <div class="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg"><Rocket className="w-6 h-6" /></div>
                <p class="text-xl font-black mb-2">Launch & Support</p>
                <p class="text-sm text-slate-300">We handle App Store and Play Store submissions and provide ongoing support.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 class="text-3xl font-black text-slate-900 mb-6">Why Choose RAKS IT for App Development in Warangal?</h3>
          <p class="text-xl text-slate-600 leading-relaxed mb-6">
            We don't just build apps; we build businesses. Our <strong>app development strategy in Telangana</strong> includes a deep focus on user engagement and retention. We integrate advanced features like real-time notifications, secure payment gateways, and AI-driven recommendations to make your app a powerful tool for growth.
          </p>
          <p class="text-xl text-slate-600 leading-relaxed">
            Whether you're looking to build a delivery app for <strong>Hanamkonda</strong>, a healthcare app for <strong>Warangal</strong>, or a global SaaS mobile platform, RAKS IT SOLUTIONS is your premier development partner.
          </p>
        </section>
      </div>`,
      features: ["Flutter Development", "React Native", "App Store SEO"],
      faqs: [{ question: "Android or iOS?", answer: "We do both using high-performance cross-platform tech." }]
    }
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: '360-degree digital marketing solutions to scale your business.',
    icon: 'Megaphone',
    path: '/services/digital-marketing',
    seo: {
      metaTitle: "Digital Marketing Agency in Telangana - RAKS IT SOLUTIONS",
      metaDescription: "Comprehensive digital marketing services in Warangal, Hanamkonda & Hyderabad. Social media, PPC, and content marketing.",
      h1: "Results-Driven Digital Marketing in Telangana",
      body: `<div class="space-y-8">
        <section>
          <h2 class="text-4xl font-black text-slate-900 mb-6 tracking-tighter">360-Degree Digital Marketing Excellence in Warangal</h2>
          <p class="text-xl text-slate-600 leading-relaxed mb-6">
            In the digital age, being seen is just the beginning. Being remembered and chosen is what matters. RAKS IT SOLUTIONS is a leading <strong>digital marketing agency in Telangana</strong>, providing comprehensive strategies that drive brand awareness, engagement, and sales for businesses in <strong>Warangal and Hanamkonda</strong>.
          </p>
          <p class="text-xl text-slate-600 leading-relaxed mb-6">
            Our <strong>digital marketing services in Hanamkonda</strong> cover everything from <strong>Social Media Marketing (SMM)</strong> and <strong>Pay-Per-Click (PPC)</strong> advertising to content strategy and email marketing. We leverage data-driven insights to create campaigns that resonate with your target audience in <strong>Kazipet</strong> and beyond.
          </p>
        </section>

        <section class="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
          <h3 class="text-3xl font-black text-blue-900 mb-8">Our Multi-Channel Marketing Approach</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="flex gap-6 p-6 bg-white rounded-3xl shadow-sm border border-blue-100">
              <div class="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"><Share2 className="w-8 h-8" /></div>
              <div>
                <p class="text-2xl font-black text-slate-900 mb-2">Social Media Marketing</p>
                <p class="text-slate-500 font-medium">Building vibrant communities on Instagram, Facebook, and LinkedIn for Telangana brands.</p>
              </div>
            </div>
            <div class="flex gap-6 p-6 bg-white rounded-3xl shadow-sm border border-blue-100">
              <div class="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"><MousePointer2 className="w-8 h-8" /></div>
              <div>
                <p class="text-2xl font-black text-slate-900 mb-2">PPC & Google Ads</p>
                <p class="text-slate-500 font-medium">Driving immediate, high-intent traffic to your website with optimized search and display ads.</p>
              </div>
            </div>
            <div class="flex gap-6 p-6 bg-white rounded-3xl shadow-sm border border-blue-100">
              <div class="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"><PenTool className="w-8 h-8" /></div>
              <div>
                <p class="text-2xl font-black text-slate-900 mb-2">Content Marketing</p>
                <p class="text-slate-500 font-medium">Establishing your brand as an authority with high-value blog posts, videos, and infographics.</p>
              </div>
            </div>
            <div class="flex gap-6 p-6 bg-white rounded-3xl shadow-sm border border-blue-100">
              <div class="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"><Megaphone className="w-8 h-8" /></div>
              <div>
                <p class="text-2xl font-black text-slate-900 mb-2">Email Marketing</p>
                <p class="text-slate-500 font-medium">Nurturing leads and driving repeat business with personalized email automation.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 class="text-3xl font-black text-slate-900 mb-6">Why RAKS IT is the Best Digital Marketing Agency in Hanamkonda</h3>
          <p class="text-xl text-slate-600 leading-relaxed mb-6">
            We don't believe in vanity metrics like "likes" or "follows." We focus on the metrics that matter: <strong>ROI, conversion rates, and customer acquisition costs</strong>. Our team in <strong>Warangal</strong> provides transparent, real-time reporting so you can see exactly how your marketing budget is working for you.
          </p>
          <p class="text-xl text-slate-600 leading-relaxed">
            Partner with RAKS IT SOLUTIONS and experience the power of a truly integrated <strong>digital marketing strategy in Telangana</strong>. We help you dominate your local market and scale your brand to new heights.
          </p>
        </section>
      </div>`,
      features: ["Social Media Marketing", "PPC Campaigns", "Email Marketing", "Content Strategy"],
      faqs: [{ question: "Do you handle Meta ads?", answer: "Yes, we specialize in high-ROI Meta and Google ads." }]
    }
  },
  {
    id: 'content-writing',
    title: 'Content Writing',
    description: 'SEO-optimized content that engages and converts your audience.',
    icon: 'PenTool',
    path: '/services/content-writing',
    seo: {
      metaTitle: "SEO Content Writing Services in Warangal - RAKS IT",
      metaDescription: "Professional content writing in Telangana. Blog posts, website copy, and technical writing for Hanamkonda businesses.",
      h1: "High-Quality SEO Content Writing in Warangal",
      body: `<p>Words that sell. We craft compelling content tailored for the Telangana market.</p>`,
      features: ["Blog Writing", "Website Copywriting", "Technical Writing", "SEO Optimization"],
      faqs: [{ question: "Is the content SEO-friendly?", answer: "Yes, every piece is optimized for target keywords." }]
    }
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    description: 'Secure and scalable cloud infrastructure for your business.',
    icon: 'Cloud',
    path: '/services/cloud-solutions',
    seo: {
      metaTitle: "Cloud Computing Services in Telangana - AWS & Azure",
      metaDescription: "Cloud migration and management in Warangal. Secure your data with RAKS IT cloud solutions.",
      h1: "Scalable Cloud Solutions in Warangal & Hanamkonda",
      body: `<p>Modernize your business infrastructure with our expert cloud services in Telangana.</p>`,
      features: ["Cloud Migration", "Managed Services", "Serverless Architecture", "Data Security"],
      faqs: [{ question: "Which platforms do you support?", answer: "We work with AWS, Azure, and Google Cloud." }]
    }
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Protecting your digital assets with advanced security protocols.',
    icon: 'ShieldCheck',
    path: '/services/cybersecurity',
    seo: {
      metaTitle: "Cybersecurity Services in Warangal - Data Protection",
      metaDescription: "Secure your business from cyber threats in Telangana. Expert security audits and protection in Hanamkonda.",
      h1: "Advanced Cybersecurity Solutions in Warangal",
      body: `<p>We safeguard your business data with enterprise-grade security measures tailored for the Telangana market.</p>`,
      features: ["Security Audits", "Threat Detection", "Data Encryption", "Compliance Management"],
      faqs: [{ question: "Do you offer security audits?", answer: "Yes, we perform comprehensive vulnerability assessments." }]
    }
  }
];

export const INDUSTRIES: Industry[] = [
  { 
    id: 'healthcare', name: 'Healthcare', description: 'Patient management and medical SEO for clinics and multispecialty hospitals.', 
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    seo: {
      metaTitle: "Best Healthcare Marketing in Warangal - Medical SEO Experts",
      metaDescription: "Grow your hospital or clinic in Hanamkonda with the best medical SEO, digital marketing, and custom patient engagement platforms in Telangana.",
      h1: "Top Healthcare & Medical Digital Tech in Warangal",
      body: `<p>We empower healthcare providers in Telangana with secure, compliant, and visible digital platforms.</p>`,
      features: ["Telemedicine Portals", "Patient Record Mgmt", "Medical SEO", "Hospital Branding"],
      faqs: [{ question: "Is it HIPAA compliant?", answer: "Yes, all our healthcare builds prioritize data privacy and security." }]
    }
  },
  { 
    id: 'ecommerce', name: 'E-commerce & Retail', description: 'Direct-to-consumer online stores with local logistics integration.', 
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
    seo: {
      metaTitle: "E-commerce Website Development in Warangal - Shopify & Custom",
      metaDescription: "Scale your Hanamkonda retail store nationally. Expert e-commerce development in Telangana.",
      h1: "Retail & E-commerce Hub for Warangal Entrepreneurs",
      body: `<p>Transforming local Hanamkonda shops into national brands with high-converting online stores.</p>`,
      features: ["Custom Checkout", "Inventory Sync", "Mobile Shopping Apps", "Payment Trust"],
      faqs: [{ question: "Can you handle high traffic?", answer: "Our cloud-native stores are built to handle thousands of concurrent users." }]
    }
  },
  { 
    id: 'real-estate', name: 'Real Estate & Construction', description: 'NRI targeting and automated lead generation for developers.', 
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    seo: {
      metaTitle: "Real Estate Marketing in Hanamkonda - Plot Sales Lead Gen",
      metaDescription: "Sell properties in Warangal faster with NRI-focused digital marketing and 3D tours.",
      h1: "Strategic Real Estate Tech in Warangal",
      body: `<p>We bridge the gap between Telangana builders and global property investors.</p>`,
      features: ["NRI Ad Campaigns", "360 Virtual Tours", "CRM Integration", "Plot Booking Apps"],
      faqs: [{ question: "How do you find NRI buyers?", answer: "We use geo-fencing and behavioral targeting in diaspora-rich global cities." }]
    }
  },
  { 
    id: 'education', name: 'Education & EdTech', description: 'Enrollment funnels and LMS platforms for institutional growth.', 
    image: 'https://images.unsplash.com/photo-1523050335102-c32509b40d44?auto=format&fit=crop&q=80&w=800',
    seo: {
      metaTitle: "Digital Marketing for Schools in Warangal - Admissions Growth",
      metaDescription: "Increase enrollment for your Hanamkonda institution with targeted branding and student portals.",
      h1: "EdTech & Institutional Branding in Hanamkonda",
      body: `<p>Empowering the educational heart of Telangana with modern student engagement tools.</p>`,
      features: ["Admissions CRM", "Virtual Classrooms", "Institute Portals", "Reputation Mgmt"],
      faqs: [{ question: "Can you automate admissions?", answer: "Yes, we build end-to-end inquiry-to-enrollment funnels." }]
    }
  },
  { 
    id: 'logistics', name: 'Logistics & Supply Chain', description: 'Real-time tracking and fleet optimization for transport hubs.', 
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    seo: {
      metaTitle: "Logistics Software Development in Warangal - Fleet Tracking",
      metaDescription: "Streamline your Hanamkonda transport business with custom ERP and tracking software.",
      h1: "Logistics & Transport Solutions in Telangana",
      body: `<p>Bringing visibility and efficiency to the supply chains of North Telangana.</p>`,
      features: ["Live Fleet Tracking", "Driver Apps", "Warehouse Dashboards", "Route Optimization"],
      faqs: [{ question: "Does it work offline?", answer: "Our mobile apps support offline data caching for remote transit areas." }]
    }
  },
  { 
    id: 'finance', name: 'Finance & FinTech', description: 'Secure payment gateways and micro-lending platforms.', 
    image: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=800',
    seo: {
      metaTitle: "FinTech App Development in Hanamkonda - Secure Banking",
      metaDescription: "Build trust with secure financial software for Warangal-based fintech startups.",
      h1: "Banking & Finance Engineering in Warangal",
      body: `<p>We build the secure backbone for financial innovation in the Tri-City area.</p>`,
      features: ["Secure APIs", "Digital Wallets", "Loan Management", "Fraud Detection"],
      faqs: [{ question: "Is my data safe?", answer: "We use banking-grade 256-bit encryption and multi-factor authentication." }]
    }
  },
  { 
    id: 'manufacturing', name: 'Manufacturing & Industrial', description: 'Industrial IoT and ERP solutions for factory automation.', 
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    seo: {
      metaTitle: "Manufacturing ERP Software in Warangal - Industry 4.0",
      metaDescription: "Modernize your Hanamkonda factory with real-time data monitoring and inventory software.",
      h1: "Industrial Innovation in North Telangana",
      body: `<p>Optimizing production lines for Warangal's growing industrial sector.</p>`,
      features: ["IoT Integration", "Supply Chain ERP", "Maintenance Prediction", "Cost Dashboards"],
      faqs: [{ question: "Can it integrate with old machines?", answer: "Yes, we use legacy-bridge IoT sensors to pull data from any hardware." }]
    }
  },
  { 
    id: 'food', name: 'Food & Hospitality', description: 'Restaurant ordering systems and loyalty apps for local brands.', 
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    seo: {
      metaTitle: "Restaurant Ordering Apps in Hanamkonda - Food-Tech",
      metaDescription: "Beat the aggregators. Launch your own online ordering system in Warangal.",
      h1: "Food-Tech & Hospitality in Warangal",
      body: `<p>Direct customer connection for the vibrant food scene of Hanamkonda.</p>`,
      features: ["Custom Delivery Apps", "Table QR Ordering", "Loyalty Programs", "Kitchen Dashboards"],
      faqs: [{ question: "Why not just use Zomato?", answer: "Owning your data and avoiding 30% commissions is the key to profitability." }]
    }
  },
  { 
    id: 'automotive', name: 'Automotive', description: 'Dealer management and spare parts e-commerce platforms.', 
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    seo: {
      metaTitle: "Automotive Dealer Software in Warangal - Service Booking",
      metaDescription: "Grow your showroom in Hanamkonda with expert digital marketing and inventory software.",
      h1: "Automotive Digital Solutions in Telangana",
      body: `<p>Driving sales for car and bike dealers across Warangal.</p>`,
      features: ["Inventory Mgmt", "Service Booking", "Parts E-com", "Lead Tracking"],
      faqs: [{ question: "Do you handle ads?", answer: "Yes, we run high-intent search ads for service and sales." }]
    }
  },
  { 
    id: 'legal', name: 'Legal & Professional', description: 'Practice management and digital presence for firms.', 
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    seo: {
      metaTitle: "Website Design for Law Firms in Warangal - Professional SEO",
      metaDescription: "Build authority for your Hanamkonda law practice with professional web design.",
      h1: "Professional Services Marketing in Warangal",
      body: `<p>Establishing digital trust for legal and consulting experts in Telangana.</p>`,
      features: ["Case Management", "Client Portals", "Reputation SEO", "Digital Consultations"],
      faqs: [{ question: "Can you help with reviews?", answer: "We set up ethical systems to build your firm's online rating." }]
    }
  },
  { 
    id: 'nonprofit', name: 'Non-Profit & NGOs', description: 'Donation platforms and awareness campaigns for social impact.', 
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
    seo: {
      metaTitle: "NGO Website Development in Warangal - Donation Gateways",
      metaDescription: "Amplify your social impact in Telangana with professional NGO websites and campaigns.",
      h1: "Digital Impact for Warangal Social Causes",
      body: `<p>Helping Telangana's NGOs reach more donors and volunteers globally.</p>`,
      features: ["Donation Portals", "Volunteer Mgmt", "Impact Dashboards", "Social Media Campaigns"],
      faqs: [{ question: "Do you offer discounts?", answer: "Yes, we have special subsidized pricing for verified social causes in Warangal." }]
    }
  },
  { 
    id: 'travel', name: 'Travel & Tourism', description: 'Booking engines for hotels and regional tour operators.', 
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
    seo: {
      metaTitle: "Tourism Website Design in Warangal - Hotel Booking",
      metaDescription: "Promote Warangal's heritage globally. Booking software for Telangana tour operators.",
      h1: "Tourism & Hospitality Tech in Telangana",
      body: `<p>Showcasing the beauty of Warangal to the world through high-performance booking engines.</p>`,
      features: ["Itinerary Builders", "Booking Engines", "Review Integration", "Local SEO"],
      faqs: [{ question: "Do you integrate with OTAs?", answer: "Yes, we can sync your local site with major platforms like Booking.com." }]
    }
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'digital-marketing-warangal-2026',
    title: "The Future of Digital Marketing in Warangal for 2026",
    excerpt: "Discover the trends that will dominate Hanamkonda's business landscape next year.",
    category: "Marketing",
    date: "Jan 10, 2026",
    author: "RAKS IT Editorial",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    content: `<p>The Warangal business market is evolving rapidly. In 2026, AI-driven local search will be the #1 growth factor for Hanamkonda startups.</p>`,
    seo: {
      metaTitle: "Digital Marketing Trends in Warangal 2026",
      metaDescription: "Stay ahead in Hanamkonda. Expert marketing trends for Telangana businesses in 2026.",
      h1: "Warangal's 2026 Digital Marketing Roadmap",
      body: `<p>Learn how local businesses in Telangana can use AI to beat global competitors.</p>`,
      features: ["AI Personalization", "Hyper-Local SEO", "Voice Search Optimization"],
      faqs: [{ question: "Is SEO dead?", answer: "No, it's becoming Answer Engine Optimization (AEO)." }]
    }
  },
  {
    id: 'web-design-warangal-tips',
    title: "5 Web Design Tips to Boost Hanamkonda Sales",
    excerpt: "Simple UX changes that double your local conversion rate.",
    category: "Design",
    date: "Feb 05, 2026",
    author: "RAKS IT Team",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800",
    content: `<p>Your website is your digital shop in Hanamkonda. Make it welcoming with these design principles.</p>`,
    seo: {
      metaTitle: "Web Design Tips for Hanamkonda Businesses",
      metaDescription: "Convert more visitors in Warangal. Expert UI/UX advice for Telangana entrepreneurs.",
      h1: "Boost Sales in Hanamkonda with Better Web Design",
      body: `<p>Visual hierarchy and loading speed are key for Warangal mobile users.</p>`,
      features: ["Mobile Optimization", "Call-to-Action Strategy", "Trust Signals"],
      faqs: [{ question: "Why is speed important?", answer: "Users in Warangal often have variable data speeds; fast sites win." }]
    }
  },
  {
    id: 'seo-hanamkonda-guide',
    title: "Mastering Local SEO in Hanamkonda and Warangal",
    excerpt: "A step-by-step guide to ranking #1 in the Tri-City map pack.",
    category: "SEO",
    date: "Feb 20, 2026",
    author: "SEO Lead",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&q=80&w=800",
    content: `<p>Ranking on the Google Map Pack is the easiest way to get customers in Warangal today.</p>`,
    seo: {
      metaTitle: "Local SEO Guide for Hanamkonda & Warangal",
      metaDescription: "Step-by-step map ranking guide for Telangana businesses. Dominate Warangal search.",
      h1: "The Ultimate Warangal Local SEO Guide",
      body: `<p>Optimize your GMB and get more calls from Hanamkonda residents.</p>`,
      features: ["Google My Business", "Local Citations", "Review Management"],
      faqs: [{ question: "Do I need an office?", answer: "Yes, a Hanamkonda address is vital for map rankings." }]
    }
  },
  {
    id: 'app-development-telangana',
    title: "Why Your Warangal Business Needs a Mobile App in 2026",
    excerpt: "Transitioning from a website to a customer loyalty app.",
    category: "Tech",
    date: "Mar 12, 2026",
    author: "App Lead",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    content: `<p>Direct customer engagement via mobile apps is the new standard in Warangal retail.</p>`,
    seo: {
      metaTitle: "Mobile App Strategy for Warangal Businesses",
      metaDescription: "Build customer loyalty in Hanamkonda with custom mobile apps. Expert Telangana dev advice.",
      h1: "Mobile App Dominance for Warangal Brands",
      body: `<p>Push notifications are 10x more effective than emails for Hanamkonda shoppers.</p>`,
      features: ["Push Notifications", "Loyalty Programs", "Offline Access"],
      faqs: [{ question: "Is it expensive?", answer: "We offer scalable solutions for Hanamkonda startups." }]
    }
  },
  {
    id: 'ecommerce-growth-hanamkonda',
    title: "How to Scale Your Hanamkonda Shop to a National Brand",
    excerpt: "Using e-commerce to sell Warangal products across India.",
    category: "Business",
    date: "Apr 01, 2026",
    author: "E-com Strategist",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    content: `<p>Warangal's unique products deserve a national audience. E-commerce is the bridge.</p>`,
    seo: {
      metaTitle: "E-commerce Growth Strategy in Hanamkonda",
      metaDescription: "Scale your Telangana business. National e-commerce tips for Warangal entrepreneurs.",
      h1: "National Scaling for Hanamkonda E-commerce",
      body: `<p>Logistics and digital ads are the engines of national growth for Telangana brands.</p>`,
      features: ["National Shipping", "Ad Scalability", "Payment Trust"],
      faqs: [{ question: "Can I sell on Amazon?", answer: "Yes, we help with marketplace integration too." }]
    }
  },
  {
    id: 'branding-identity-warangal',
    title: "Building an Iconic Brand Identity in Warangal",
    excerpt: "The psychology of colors and fonts for the Telangana market.",
    category: "Branding",
    date: "May 15, 2026",
    author: "Creative Director",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
    content: `<p>A strong brand identity makes your Hanamkonda business memorable and premium.</p>`,
    seo: {
      metaTitle: "Branding Strategy in Warangal - RAKS IT",
      metaDescription: "Position your brand in Hanamkonda. Expert visual identity tips for Telangana.",
      h1: "Crafting a Warangal Brand Identity",
      body: `<p>Consistency across social media and your shop in Hanamkonda builds trust.</p>`,
      features: ["Brand Voice", "Visual Assets", "Market Fit"],
      faqs: [{ question: "How long to brand?", answer: "A deep branding session takes 2-4 weeks." }]
    }
  },
  {
    id: 'real-estate-nri-marketing',
    title: "Targeting NRIs for Your Warangal Property Projects",
    excerpt: "The digital secrets to selling Warangal real estate globally.",
    category: "Real Estate",
    date: "Jun 02, 2026",
    author: "Ad Expert",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    content: `<p>NRIs are looking for investment opportunities in Hanamkonda. Here is how to reach them.</p>`,
    seo: {
      metaTitle: "NRI Marketing for Warangal Real Estate",
      metaDescription: "Sell property in Hanamkonda to global buyers. Expert NRI ad strategy in Telangana.",
      h1: "Global Property Marketing in Warangal",
      body: `<p>Use geo-targeted ads in the US and UK to sell Hanamkonda ventures.</p>`,
      features: ["Geo-Targeting", "Virtual Tours", "Trust Video"],
      faqs: [{ question: "Do NRIs buy online?", answer: "Yes, with proper documentation and virtual trust." }]
    }
  },
  {
    id: 'hospital-seo-telangana',
    title: "Improving Patient Reach for Warangal Hospitals",
    excerpt: "How medical SEO saves lives and grows clinics in Hanamkonda.",
    category: "Healthcare",
    date: "Jul 10, 2026",
    author: "Medical SEO",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    content: `<p>Patients search for doctors in Hanamkonda on their phones first. Are you visible?</p>`,
    seo: {
      metaTitle: "Hospital SEO Strategy in Warangal",
      metaDescription: "Get more patient appointments in Hanamkonda. Expert healthcare marketing in Telangana.",
      h1: "Digital Healthcare Marketing in Warangal",
      body: `<p>Manage your reputation and rank for urgent terms in Hanamkonda.</p>`,
      features: ["Patient Reviews", "Zocdoc Ads", "Local Medical SEO"],
      faqs: [{ question: "Is it ethical?", answer: "Yes, providing accurate medical information is a service." }]
    }
  },
  {
    id: 'school-enrollment-hanamkonda',
    title: "Increasing School Enrollments in Hanamkonda via Digital Ads",
    excerpt: "The 2026 roadmap for educational institutions in Warangal.",
    category: "Education",
    date: "Aug 05, 2026",
    author: "Enrollment Expert",
    image: "https://images.unsplash.com/photo-1523050335102-c32509b40d44?auto=format&fit=crop&q=80&w=800",
    content: `<p>Parents in Warangal use social media to judge schools. Your digital presence is your brochure.</p>`,
    seo: {
      metaTitle: "School Enrollment Ads in Warangal - RAKS IT",
      metaDescription: "Grow your school in Hanamkonda. Expert admissions marketing in Telangana.",
      h1: "Educational Enrollment Success in Hanamkonda",
      body: `<p>Showcase your campus and toppers to Hanamkonda parents via targeted Meta ads.</p>`,
      features: ["Admission Funnels", "Campus Tours", "Lead Tracking"],
      faqs: [{ question: "When to start ads?", answer: "Admissions ads should start 4 months prior to session." }]
    }
  },
  {
    id: 'ai-adoption-telangana-small-biz',
    title: "How Small Businesses in Warangal Can Use AI Today",
    excerpt: "Free and affordable AI tools for Hanamkonda shop owners.",
    category: "AI",
    date: "Sep 20, 2026",
    author: "AI Consultant",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    content: `<p>AI is not just for big tech. Hanamkonda shopkeepers can use it to automate replies and billing.</p>`,
    seo: {
      metaTitle: "AI Tools for Warangal Small Business",
      metaDescription: "Automate your Hanamkonda shop. Practical AI advice for Telangana entrepreneurs.",
      h1: "AI for Small Business in Hanamkonda & Warangal",
      body: `<p>Use ChatGPT for customer service and AI for accounting in Warangal.</p>`,
      features: ["AI Chatbots", "Smart Inventory", "Auto-Billing"],
      faqs: [{ question: "Is AI hard to learn?", answer: "No, many tools are as simple as WhatsApp." }]
    }
  }
];

export const TELANGANA_CITIES: LocationInfo[] = [
  { 
    city: "Warangal", region: "Tri-City", description: "The historic heart of Telangana and our primary hub.",
    seo: {
      metaTitle: "Best IT Company in Warangal - Top Web Development & SEO Services",
      metaDescription: "RAKS IT SOLUTIONS is the #1 software company in Warangal. Expert web development, SEO, and digital marketing for local businesses in Hanamkonda & Warangal.",
      h1: "Top-Rated Software & SEO Agency in Warangal",
      body: `<p class="mb-6">Warangal is emerging as a major IT destination. We provide global-standard software services right here in your neighborhood, helping local brands scale globally.</p>`,
      features: ["Best SEO in Warangal", "Top Web Developers", "Local Business Growth"],
      faqs: [{ question: "Where is your office?", answer: "In the Tri-City junction area." }]
    }
  },
  { 
    city: "Hanamkonda", region: "Tri-City", description: "The educational and commercial center of the tri-city.",
    seo: {
      metaTitle: "Best SEO & Web Design in Hanamkonda - Grow Your Business Online",
      metaDescription: "Looking for the best digital marketing and web development in Hanamkonda? RAKS IT SOLUTIONS helps you rank #1 on Google and boost sales.",
      h1: "Best Web Development & SEO Agency in Hanamkonda",
      body: `<p class="mb-6">Hanamkonda is the commercial pulse of North Telangana. We provide specialized digital strategies for local retail and services.</p>`,
      features: ["Hanamkonda SEO Experts", "Custom Web Portals", "GMB Optimization"],
      faqs: [{ question: "Do you serve schools?", answer: "Yes, we have specialized enrollment strategies for educational institutions." }]
    }
  },
  { 
    city: "Hyderabad", region: "Capital", description: "The global IT hub and capital of Telangana.",
    seo: {
      metaTitle: "Leading Software Development Company in Hyderabad - RAKS IT",
      metaDescription: "Scale your brand with the best IT services in Hyderabad. From custom web development to enterprise SEO, we deliver results for global brands.",
      h1: "Enterprise Software & SEO Solutions in Hyderabad",
      body: `<p class="mb-6">We serve the vibrant tech ecosystem of Hyderabad with cutting-edge software solutions and advanced AI integration.</p>`,
      features: ["Enterprise Web Dev", "High-ROI Digital Marketing", "AI-Powered Solutions"],
      faqs: [{ question: "Do you have a Hyderabad office?", answer: "We have a dedicated team and remote infrastructure serving the Hyderabad region." }]
    }
  },
  { 
    city: "Karimnagar", region: "North Telangana", description: "A rapidly growing industrial and educational hub in North Telangana.",
    seo: {
      metaTitle: "Best Web Design & SEO Services in Karimnagar - RAKS IT",
      metaDescription: "Grow your business in Karimnagar with the best web design and SEO services. We help local industries and educational institutions dominate search results.",
      h1: "Top Web Development & SEO Agency in Karimnagar",
      body: `<p class="mb-6">Empowering Karimnagar's businesses with modern digital tools and advanced SEO strategies to capture the North Telangana market.</p>`,
      features: ["Best Local SEO in Karimnagar", "Business Website Design", "Digital Marketing"],
      faqs: [{ question: "How can you help my Karimnagar business?", answer: "We specialize in hyper-local SEO to get your business ranked #1 for city-specific searches." }]
    }
  },
  { 
    city: "Nizamabad", region: "North Telangana", description: "A major commercial center in North Telangana with high growth potential.",
    seo: {
      metaTitle: "Best Software Services in Nizamabad - Top Web & App Development",
      metaDescription: "Professional IT solutions for Nizamabad businesses. Get the best web development, mobile apps, and digital marketing from RAKS IT SOLUTIONS.",
      h1: "Leading Web Development & Tech Partner in Nizamabad",
      body: `<p class="mb-6">Driving digital growth for Nizamabad's commercial, retail, and agricultural sectors with robust software solutions.</p>`,
      features: ["Top Web Developers in Nizamabad", "Custom E-commerce", "High-Performance Apps"],
      faqs: [{ question: "Do you work with local startups?", answer: "Yes, we provide end-to-end tech support for Nizamabad's budding startup ecosystem." }]
    }
  },
  { 
    city: "Khammam", region: "East Telangana", description: "A key commercial and transport hub in East Telangana.",
    seo: {
      metaTitle: "Best Digital Marketing & Web Development in Khammam - RAKS IT",
      metaDescription: "Boost your Khammam business with the best SEO and web development services. RAKS IT SOLUTIONS is the top-rated IT company in East Telangana.",
      h1: "Top SEO & Digital Growth Agency in Khammam",
      body: `<p class="mb-6">Providing high-performance digital solutions and strategic marketing for Khammam's diverse and growing business landscape.</p>`,
      features: ["Rank #1 in Khammam", "Modern Business Websites", "Social Media Mastery"],
      faqs: [{ question: "Why choose RAKS IT for Khammam?", answer: "We combine local market insights with global digital standards to deliver measurable ROI." }]
    }
  },
  { 
    city: "Nalgonda", region: "South Telangana", description: "A growing district with significant industrial and commercial potential.",
    seo: {
      metaTitle: "Best Web Design & SEO in Nalgonda - Local Business Experts",
      metaDescription: "Professional IT services in Nalgonda. We provide the best web development and digital marketing to help local businesses grow online.",
      h1: "Top Web & SEO Solutions for Nalgonda",
      body: `<p class="mb-6">Helping Nalgonda's businesses transition to a digital-first model with ease and professional support.</p>`,
      features: ["Nalgonda Business Growth", "Affordable Web Design", "Local SEO Experts"],
      faqs: [{ question: "Do you offer training?", answer: "Yes, we provide digital asset management training for all our Nalgonda clients." }]
    }
  },
  { 
    city: "Mahbubnagar", region: "South Telangana", description: "A major district in South Telangana with rising tech interest.",
    seo: {
      metaTitle: "Software Company in Mahbubnagar - Web & SEO Experts",
      metaDescription: "Best IT services in Mahbubnagar. We build websites and rank them on Google for local success.",
      h1: "Tech Innovation in Mahbubnagar",
      body: `<p class="mb-6">Bringing world-class software development to the heart of Mahbubnagar.</p>`,
      features: ["Custom Web Apps", "SEO Strategy", "Mobile-First Design"],
      faqs: [{ question: "How long does a website take?", answer: "Usually 2-4 weeks depending on complexity." }]
    }
  },
  { 
    city: "Siddipet", region: "Central Telangana", description: "A model district with rapid urban development.",
    seo: {
      metaTitle: "Web Development in Siddipet - RAKS IT SOLUTIONS",
      metaDescription: "Modern IT solutions for Siddipet's growing businesses. Web design, SEO, and more.",
      h1: "Digital Excellence in Siddipet",
      body: `<p class="mb-6">Supporting Siddipet's vision of a digital-first district with our tech expertise.</p>`,
      features: ["Smart City Solutions", "Business Portals", "Local SEO"],
      faqs: [{ question: "Do you work with government projects?", answer: "We are open to collaborating on public digital initiatives." }]
    }
  },
  { 
    city: "Adilabad", region: "North Telangana", description: "A key district in North Telangana with diverse business needs.",
    seo: {
      metaTitle: "Web Design & SEO in Adilabad - RAKS IT SOLUTIONS",
      metaDescription: "Professional IT services in Adilabad. Web development and digital marketing for local growth.",
      h1: "Digital Transformation in Adilabad",
      body: `<p class="mb-6">Empowering Adilabad's businesses with modern digital tools and strategies.</p>`,
      features: ["Local SEO", "Responsive Web Design", "Digital Branding"],
      faqs: [{ question: "How can you help my Adilabad business?", answer: "We specialize in local SEO to get you more customers." }]
    }
  },
  { 
    city: "Sangareddy", region: "West Telangana", description: "An industrial and educational hub near Hyderabad.",
    seo: {
      metaTitle: "IT Services in Sangareddy - Web & App Development",
      metaDescription: "Expert software development in Sangareddy. We help local industries go digital.",
      h1: "Industrial Digitalization in Sangareddy",
      body: `<p class="mb-6">Providing specialized IT solutions for Sangareddy's industrial and residential sectors.</p>`,
      features: ["ERP Solutions", "Industrial SEO", "Web Portals"],
      faqs: [{ question: "Do you serve Patancheru?", answer: "Yes, we cover all industrial areas in Sangareddy district." }]
    }
  },
  { 
    city: "Medak", region: "Central Telangana", description: "A historic district with growing commercial activity.",
    seo: {
      metaTitle: "Web Design & SEO in Medak - RAKS IT SOLUTIONS",
      metaDescription: "Professional web services in Medak. Grow your local business with our expert digital strategies.",
      h1: "Digital Growth for Medak Businesses",
      body: `<p class="mb-6">Helping Medak's businesses reach a wider audience through effective digital marketing.</p>`,
      features: ["Business Websites", "Local SEO", "Social Media"],
      faqs: [{ question: "Can you help with tourism sites?", answer: "Yes, we specialize in heritage and tourism marketing." }]
    }
  },
  { 
    city: "Jagtial", region: "North Telangana", description: "A key commercial center in North Telangana.",
    seo: {
      metaTitle: "Software Services in Jagtial - Web & App Dev",
      metaDescription: "Professional IT solutions for Jagtial businesses. Expert web development and digital marketing.",
      h1: "Leading Tech Partner in Jagtial",
      body: `<p class="mb-6">Driving digital growth for Jagtial's commercial and agricultural sectors.</p>`,
      features: ["Custom Software", "E-commerce Solutions", "Mobile Apps"],
      faqs: [{ question: "Do you work with local startups?", answer: "Yes, we love supporting Jagtial's startup scene." }]
    }
  },
  { 
    city: "Mancherial", region: "North Telangana", description: "An industrial hub in North Telangana.",
    seo: {
      metaTitle: "Web Design & SEO in Mancherial - RAKS IT SOLUTIONS",
      metaDescription: "Professional IT services in Mancherial. Web development and digital marketing for local growth.",
      h1: "Digital Transformation in Mancherial",
      body: `<p class="mb-6">Empowering Mancherial's businesses with modern digital tools and strategies.</p>`,
      features: ["Local SEO", "Responsive Web Design", "Digital Branding"],
      faqs: [{ question: "How can you help my Mancherial business?", answer: "We specialize in local SEO to get you more customers." }]
    }
  },
  { 
    city: "Kamareddy", region: "North Telangana", description: "A growing commercial center in North Telangana.",
    seo: {
      metaTitle: "Software Services in Kamareddy - Web & App Dev",
      metaDescription: "Professional IT solutions for Kamareddy businesses. Expert web development and digital marketing.",
      h1: "Leading Tech Partner in Kamareddy",
      body: `<p class="mb-6">Driving digital growth for Kamareddy's commercial and agricultural sectors.</p>`,
      features: ["Custom Software", "E-commerce Solutions", "Mobile Apps"],
      faqs: [{ question: "Do you work with local startups?", answer: "Yes, we love supporting Kamareddy's startup scene." }]
    }
  },
  { 
    city: "Peddapalli", region: "North Telangana", description: "An industrial hub in North Telangana.",
    seo: {
      metaTitle: "Web Design & SEO in Peddapalli - RAKS IT SOLUTIONS",
      metaDescription: "Professional IT services in Peddapalli. Web development and digital marketing for local growth.",
      h1: "Digital Transformation in Peddapalli",
      body: `<p class="mb-6">Empowering Peddapalli's businesses with modern digital tools and strategies.</p>`,
      features: ["Local SEO", "Responsive Web Design", "Digital Branding"],
      faqs: [{ question: "How can you help my Peddapalli business?", answer: "We specialize in local SEO to get you more customers." }]
    }
  },
  { 
    city: "Suryapet", region: "South Telangana", description: "A major commercial center in South Telangana.",
    seo: {
      metaTitle: "Software Services in Suryapet - Web & App Dev",
      metaDescription: "Professional IT solutions for Suryapet businesses. Expert web development and digital marketing.",
      h1: "Leading Tech Partner in Suryapet",
      body: `<p class="mb-6">Driving digital growth for Suryapet's commercial and agricultural sectors.</p>`,
      features: ["Custom Software", "E-commerce Solutions", "Mobile Apps"],
      faqs: [{ question: "Do you work with local startups?", answer: "Yes, we love supporting Suryapet's startup scene." }]
    }
  },
  { 
    city: "Vikarabad", region: "West Telangana", description: "A growing district with significant tourism and agricultural potential.",
    seo: {
      metaTitle: "Web Design & SEO in Vikarabad - RAKS IT SOLUTIONS",
      metaDescription: "Professional IT services in Vikarabad. Web development and digital marketing for local growth.",
      h1: "Empowering Vikarabad's Digital Future",
      body: `<p class="mb-6">Helping Vikarabad's businesses transition to the digital era with ease.</p>`,
      features: ["Affordable Web Dev", "Local SEO", "Digital Consultations"],
      faqs: [{ question: "Do you offer training?", answer: "We provide basic digital literacy training for our clients." }]
    }
  },
  { 
    city: "Wanaparthy", region: "South Telangana", description: "A historic district with growing commercial activity.",
    seo: {
      metaTitle: "Web Design & SEO in Wanaparthy - RAKS IT SOLUTIONS",
      metaDescription: "Professional web services in Wanaparthy. Grow your local business with our expert digital strategies.",
      h1: "Digital Growth for Wanaparthy Businesses",
      body: `<p class="mb-6">Helping Wanaparthy's businesses reach a wider audience through effective digital marketing.</p>`,
      features: ["Business Websites", "Local SEO", "Social Media"],
      faqs: [{ question: "Can you help with tourism sites?", answer: "Yes, we specialize in heritage and tourism marketing." }]
    }
  },
  { 
    city: "Kazipet", region: "Tri-City", description: "A major railway and industrial hub in the Tri-City area.",
    seo: {
      metaTitle: "IT Services in Kazipet - Web Development & SEO",
      metaDescription: "RAKS IT SOLUTIONS provides expert software and digital marketing in Kazipet. Best IT company for local industries.",
      h1: "Digital Innovation in Kazipet Hub",
      body: `<p class="mb-6">Kazipet is a vital part of the Tri-City economy. We provide specialized IT solutions for its industrial and commercial sectors.</p>`,
      features: ["Industrial IT", "Local SEO", "E-commerce"],
      faqs: [{ question: "Do you serve the railway sector?", answer: "We provide digital solutions for logistics and related businesses." }]
    }
  }
];

export const renderIcon = (name: string, className?: string) => {
  const icons: Record<string, any> = {
    Monitor, Code, Palette, Megaphone, Smartphone, Server, Building2, Stethoscope, 
    GraduationCap, ShoppingCart, Factory, Globe, ShieldCheck, Cloud, Database, 
    BarChart3, Lock, Wrench, Search, Users, Layout, Share2, MousePointer2, 
    MapPin, PenTool, HardDrive, Zap, Award, BookOpen, Newspaper, Laptop, Truck,
    Banknote, Plane, UtensilsCrossed, Car, HeartHandshake, Briefcase, Scale, Heart
  };
  const IconComp = icons[name] || Code;
  return <IconComp className={className} />;
};
