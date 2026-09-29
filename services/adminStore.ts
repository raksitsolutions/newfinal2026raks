import { 
  AdminUser, Enquiry, CustomPage, BlogPost, Testimonial, FAQ,
  BrandingSettings, SEOSettings, SocialLink, AnalyticsSettings,
  WhatsAppSettings, ContactDetailsSettings, SitemapItem, NavigationMenuItem 
} from '../types';
import { BLOG_POSTS, TESTIMONIALS } from '../constants';

const STORAGE_KEYS = {
  USERS: 'raks_admin_users_v1',
  AUTH: 'raks_admin_auth_v1',
  ENQUIRIES: 'raks_enquiries_v1',
  BLOGS: 'raks_blogs_v1',
  PAGES: 'raks_custom_pages_v1',
  TESTIMONIALS: 'raks_testimonials_v1',
  FAQS: 'raks_faqs_v1',
  BRANDING: 'raks_branding_v1',
  SEO: 'raks_seo_v1',
  SOCIAL: 'raks_social_v1',
  ANALYTICS: 'raks_analytics_v1',
  WHATSAPP: 'raks_whatsapp_v1',
  CONTACT: 'raks_contact_v1',
  SITEMAP: 'raks_sitemap_v1',
  MENUS: 'raks_menus_v1'
};

// Initial Seed Data
const DEFAULT_USERS: AdminUser[] = [
  {
    id: 'user-1',
    name: 'RAKS Super Admin',
    email: 'admin@raksitsolutions.com',
    password: 'admin@raks2026',
    role: 'Super Admin',
    status: 'Active',
    createdAt: '2026-01-15T09:00:00Z',
    lastLogin: new Date().toISOString()
  },
  {
    id: 'user-2',
    name: 'Praveen Rao',
    email: 'content@raksitsolutions.com',
    password: 'content@raks2026',
    role: 'Editor',
    status: 'Active',
    createdAt: '2026-02-01T11:30:00Z',
    lastLogin: '2026-09-28T14:20:00Z'
  },
  {
    id: 'user-3',
    name: 'Sneha Reddy',
    email: 'support@raksitsolutions.com',
    password: 'support@raks2026',
    role: 'Support',
    status: 'Active',
    createdAt: '2026-02-15T10:15:00Z',
    lastLogin: '2026-09-29T08:00:00Z'
  }
];

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-101',
    name: 'K. Rajeshwar Rao',
    email: 'rajeshwar.rao@kakatiyatech.in',
    phone: '+91 98480 12345',
    location: 'Warangal',
    service: 'Custom Web & ERP Application',
    message: 'We operate an agro-processing supply chain in Warangal and need a cloud-based inventory management portal with mobile access for our field reps.',
    source: 'Hero Quote Request',
    status: 'New',
    notes: 'Urgent inquiry, requested a call before 4 PM.',
    createdAt: '2026-09-29T08:15:00Z'
  },
  {
    id: 'enq-102',
    name: 'Dr. S. Harika',
    email: 'harika.s@sunshineclinic.org',
    phone: '+91 94401 67890',
    location: 'Hanamkonda',
    service: 'Healthcare Website & Local SEO',
    message: 'Looking to build an appointment booking portal for our pediatric center in Subedari, Hanamkonda with Google Maps optimization.',
    source: 'Contact Page Form',
    status: 'Contacted',
    notes: 'Introductory proposal sent via WhatsApp. Follow up on Thursday.',
    createdAt: '2026-09-28T14:45:00Z'
  },
  {
    id: 'enq-103',
    name: 'Venkatesh Goud',
    email: 'venkat@goudlogistics.com',
    phone: '+91 91000 54321',
    location: 'Hyderabad',
    service: 'Mobile App Development (Flutter)',
    message: 'Need a cross-platform fleet tracking app for 80 trucks across Telangana and Andhra Pradesh.',
    source: 'Website Contact Form',
    status: 'In Progress',
    notes: 'Technical specification document in review with engineering lead.',
    createdAt: '2026-09-27T11:20:00Z'
  },
  {
    id: 'enq-104',
    name: 'Ananya Sharma',
    email: 'ananya@suryapetjewels.com',
    phone: '+91 97000 88990',
    location: 'Suryapet',
    service: 'E-commerce & Digital Marketing',
    message: 'Want to launch an online jewelry catalogue with payment gateway and Instagram advertising.',
    source: 'Services Hub Enquiry',
    status: 'Closed',
    notes: 'Contract signed. Project kickoff scheduled for Oct 1st.',
    createdAt: '2026-09-25T16:10:00Z'
  }
];

const INITIAL_PAGES: CustomPage[] = [
  {
    id: 'page-1',
    slug: 'careers',
    title: 'Careers at RAKS IT SOLUTIONS',
    subtitle: 'Build the future of technology right from Warangal, Hyderabad, and across Telangana.',
    metaTitle: 'Careers | Join RAKS IT SOLUTIONS Telangana',
    metaDescription: 'Explore open engineering, design, and digital marketing positions at RAKS IT SOLUTIONS in Warangal and Hyderabad.',
    content: `
      <h2>Why Work With RAKS IT SOLUTIONS?</h2>
      <p>We are Telangana's fastest-growing technology agency, engineering modern digital solutions for enterprises, healthcare leaders, institutions, and high-growth brands. We foster an environment of continuous learning, cutting-edge tech stacks, and tangible regional impact.</p>
      
      <h3>Current Open Positions</h3>
      <ul>
        <li><strong>Senior Full-Stack Engineer (React & Node.js)</strong> — Warangal / Hybrid • 3+ Yrs Exp</li>
        <li><strong>Cross-Platform Mobile App Developer (Flutter/React Native)</strong> — Hyderabad / Warangal • 2+ Yrs Exp</li>
        <li><strong>Technical SEO & Performance Specialist</strong> — Warangal • 2+ Yrs Exp</li>
        <li><strong>UI/UX Product Designer (Figma)</strong> — Remote / Warangal • 1+ Yrs Exp</li>
      </ul>

      <h3>Perks & Benefits</h3>
      <p>Competitive salary packages, flexible hybrid work arrangements, paid continuous certification allowances, top-tier hardware setups, and vibrant project bonuses.</p>
    `,
    features: [
      'Top-tier engineering culture & modern tech stacks',
      'Direct client-facing project ownership',
      'Rapid career growth & meritocratic appraisals',
      'Health insurance & wellness stipends'
    ],
    ctaText: 'Apply via WhatsApp HR',
    ctaLink: 'https://wa.me/919010591950?text=Hello%20RAKS%20HR,%20I%20am%20interested%20in%20career%20opportunities.',
    showInNav: true,
    showInFooter: true,
    status: 'Published',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'page-2',
    slug: 'it-consulting',
    title: 'Enterprise IT Consulting & Cloud Modernization',
    subtitle: 'Architecting scalable cloud architectures, cybersecurity compliance, and workflow automation.',
    metaTitle: 'Enterprise IT Consulting Telangana | RAKS IT SOLUTIONS',
    metaDescription: 'Strategic IT advisory, cloud migration, legacy modernization, and DevOps engineering across Telangana.',
    content: `
      <h2>Strategic Technology Advisory for Growing Enterprises</h2>
      <p>Navigating technology decisions requires deep architectural foresight. RAKS IT SOLUTIONS partners with founders, CTOs, and executive leaders to evaluate software health, migrate to cost-optimized cloud architectures, and implement robust digital transformation roadmaps.</p>

      <h3>Key Consulting Verticals</h3>
      <ul>
        <li><strong>Cloud Infrastructure & DevOps:</strong> Migrating on-premise infrastructure to AWS and Google Cloud with automated CI/CD pipelines.</li>
        <li><strong>Legacy System Refactoring:</strong> Deconstructing outdated monoliths into performant, containerized microservices.</li>
        <li><strong>Data Security & Compliance:</strong> Auditing databases, endpoints, and access tokens for enterprise-grade protection.</li>
        <li><strong>Tech Stack Advisory:</strong> Helping businesses choose the most cost-effective and scalable tools without vendor lock-in.</li>
      </ul>
    `,
    features: [
      'Comprehensive architecture audits with zero downtime',
      'Up to 40% cloud infrastructure cost optimization',
      'Full technical documentation & team training',
      'Dedicated solution architects on call'
    ],
    ctaText: 'Schedule Advisory Call',
    ctaLink: 'https://wa.me/919010591950?text=Hello%20RAKS,%20I%20would%20like%20to%20schedule%20an%20IT%20consulting%20session.',
    showInNav: false,
    showInFooter: true,
    status: 'Published',
    createdAt: '2026-04-10T14:00:00Z',
    updatedAt: '2026-09-15T09:30:00Z'
  }
];

const INITIAL_FAQS: FAQ[] = [
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
    id: 'seo-rankings',
    category: 'marketing',
    categoryLabel: 'Digital Marketing & SEO',
    question: 'How do you guarantee and measure search engine ranking improvements across Telangana?',
    answer: 'We employ strictly white-hat, technical, and local algorithmic SEO aligned with Google Core Algorithm guidelines. Our strategy combines schema markup, semantic entity optimization, Core Web Vitals acceleration (sub-second load speeds), high-authority regional backlinks, and hyper-targeted Telangana location pages (Warangal, Hanamkonda, Hyderabad, Karimnagar).',
    keyPoints: [
      'Hyper-localized keyword mapping across Telangana districts',
      'Targeted Google Business Profile (GBP) 3-pack map dominance',
      'Core Web Vitals optimization achieving 95+ PageSpeed scores',
      'Transparent bi-weekly Google Search Console and conversion reporting'
    ],
    readTime: '2 min read'
  },
  {
    id: 'support-maintenance',
    category: 'support',
    categoryLabel: 'Technical Support & SLA',
    question: 'What ongoing maintenance and post-launch technical support do you guarantee?',
    answer: 'Every engagement includes a minimum 60-day post-launch warranty period covering bug fixes and performance tuning. Following that, we offer enterprise SLA maintenance retainers including 24/7 uptime monitoring, automated database backups, security patch updates, and dedicated monthly development hours.',
    keyPoints: [
      'Guaranteed 60-day zero-cost defect warranty on all delivered code',
      'Tiered SLA support packages with sub-2-hour emergency response times',
      'Continuous security patch management and dependency updates'
    ],
    readTime: '1 min read'
  },
  {
    id: 'pricing-structure',
    category: 'pricing',
    categoryLabel: 'Pricing & Engagements',
    question: 'How are development and marketing projects priced at RAKS IT SOLUTIONS?',
    answer: 'We provide transparent milestone-based fixed price contracts for projects with clear scopes, or agile time-and-materials / dedicated developer retainers for scaling startups and enterprises needing flexible iteration. You will never encounter hidden server charges or surprise scope creep fees.',
    keyPoints: [
      'Fixed-price milestone disbursements tied to verified deliverables',
      'Flexible dedicated monthly developer retainers with daily standups',
      'Itemized transparent quotations with zero hidden surprises'
    ],
    readTime: '2 min read'
  }
];

const DEFAULT_BRANDING: BrandingSettings = {
  logoUrl: '',
  logoWhiteUrl: '',
  faviconUrl: '/raks-icon.svg',
  siteName: 'RAKS IT SOLUTIONS',
  tagline: '— EXPERIENCE FULL OF IDEAS —',
  primaryColor: '#14387f',
  accentColor: '#2563eb',
  darkColor: '#0f172a',
  copyrightText: '© 2026 RAKS IT SOLUTIONS. All rights reserved.',
  developedByText: 'Developed by RAKS IT SOLUTIONS',
  showDevelopedBy: true,
  footerDescription: "Telangana's premier technology agency specializing in high-performance web development, mobile applications, and strategic digital marketing in Warangal, Hanamkonda & Hyderabad."
};

const DEFAULT_SEO: SEOSettings = {
  metaTitle: 'RAKS IT SOLUTIONS | Premier Software & SEO Agency in Telangana',
  metaDescription: 'Expert Web Development, SEO, and Digital Marketing hub in Warangal, Hanamkonda & Hyderabad.',
  metaKeywords: 'Web Development Warangal, SEO Telangana, Software Company Hyderabad, App Development Hanamkonda',
  ogImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
  canonicalUrl: 'https://raksitsolutions.com',
  robotsIndex: true,
  robotsFollow: true,
  schemaEnabled: true,
  customSchemaJson: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "RAKS IT SOLUTIONS",
    "url": "https://raksitsolutions.com",
    "telephone": "+919010591950",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot #45, Diamond Block, Subedari",
      "addressLocality": "Hanamkonda, Warangal",
      "addressRegion": "Telangana",
      "postalCode": "506001",
      "addressCountry": "IN"
    }
  }, null, 2)
};

const DEFAULT_SOCIAL: SocialLink[] = [
  { id: 'soc-1', platform: 'Facebook', url: 'https://facebook.com/raksitsolutions', handle: '@raksitsolutions', isActive: true, showInNavbar: true, showInFooter: true },
  { id: 'soc-2', platform: 'Twitter / X', url: 'https://twitter.com/raksitsolutions', handle: '@raksitsolutions', isActive: true, showInNavbar: true, showInFooter: true },
  { id: 'soc-3', platform: 'Instagram', url: 'https://instagram.com/raksitsolutions', handle: '@raksitsolutions', isActive: true, showInNavbar: true, showInFooter: true },
  { id: 'soc-4', platform: 'LinkedIn', url: 'https://linkedin.com/company/raksitsolutions', handle: 'raksitsolutions', isActive: true, showInNavbar: true, showInFooter: true },
  { id: 'soc-5', platform: 'YouTube', url: 'https://youtube.com/@raksitsolutions', handle: '@raksitsolutions', isActive: true, showInNavbar: false, showInFooter: true },
  { id: 'soc-6', platform: 'GitHub', url: 'https://github.com/raksitsolutions', handle: 'raksitsolutions', isActive: true, showInNavbar: false, showInFooter: true }
];

const DEFAULT_ANALYTICS: AnalyticsSettings = {
  ga4MeasurementId: 'G-RAKS2026TECH',
  ga4Enabled: true,
  searchConsoleTag: 'google-site-verification=raks_telangana_premier_tech_hub_2026',
  searchConsoleEnabled: true,
  gtmContainerId: 'GTM-RAKS99',
  gtmEnabled: false,
  customHeadScript: ''
};

const DEFAULT_WHATSAPP: WhatsAppSettings = {
  phoneNumber: '919010591950',
  defaultMessage: "Hello RAKS IT SOLUTIONS, I'm interested in your services.",
  floatingButtonVisible: true,
  buttonPosition: 'right',
  hoverText: 'Chat on WhatsApp',
  agentStatus: 'Online • Fast Response',
  hoursText: '9:00 AM - 7:00 PM'
};

const DEFAULT_CONTACT: ContactDetailsSettings = {
  phonePrimary: '+91 90105 91950',
  phoneSecondary: '+91 98480 12345',
  emailPrimary: 'hello@raksitsolutions.com',
  emailSupport: 'support@raksitsolutions.com',
  addressLine1: 'Plot #45, Diamond Block, Subedari',
  addressLine2: 'Hanamkonda, Warangal, Telangana - 506001',
  businessHours: 'Mon - Fri: 9 AM - 7 PM, Sat: 10 AM - 4 PM',
  mapsUrl: 'https://maps.google.com/?q=Hanamkonda,Warangal',
  showInContactPage: true,
  showInFooter: true
};

const DEFAULT_SITEMAP_ITEMS: SitemapItem[] = [
  { id: 'sm-1', url: '/', name: 'Home Page', priority: '1.0', changeFreq: 'daily', isActive: true, showInSitemapPage: true, lastModified: '2026-09-29' },
  { id: 'sm-2', url: '/about-us', name: 'About Us', priority: '0.8', changeFreq: 'weekly', isActive: true, showInSitemapPage: true, lastModified: '2026-09-28' },
  { id: 'sm-3', url: '/services', name: 'Services Hub', priority: '0.9', changeFreq: 'weekly', isActive: true, showInSitemapPage: true, lastModified: '2026-09-28' },
  { id: 'sm-4', url: '/industries', name: 'Industries Hub', priority: '0.8', changeFreq: 'weekly', isActive: true, showInSitemapPage: true, lastModified: '2026-09-27' },
  { id: 'sm-5', url: '/case-studies', name: 'Client Case Studies', priority: '0.8', changeFreq: 'weekly', isActive: true, showInSitemapPage: true, lastModified: '2026-09-26' },
  { id: 'sm-6', url: '/blog', name: 'Tech Insights & Blog', priority: '0.9', changeFreq: 'daily', isActive: true, showInSitemapPage: true, lastModified: '2026-09-29' },
  { id: 'sm-7', url: '/contact-us', name: 'Contact Us', priority: '0.8', changeFreq: 'weekly', isActive: true, showInSitemapPage: true, lastModified: '2026-09-29' },
  { id: 'sm-8', url: '/logo-generator', name: 'Logo Generator', priority: '0.7', changeFreq: 'monthly', isActive: true, showInSitemapPage: true, lastModified: '2026-09-20' },
  { id: 'sm-9', url: '/terms-and-conditions', name: 'Terms and Conditions', priority: '0.3', changeFreq: 'monthly', isActive: true, showInSitemapPage: true, lastModified: '2026-09-01' },
  { id: 'sm-10', url: '/privacy-policy', name: 'Privacy Policy', priority: '0.3', changeFreq: 'monthly', isActive: true, showInSitemapPage: true, lastModified: '2026-09-01' },
  { id: 'sm-11', url: '/sitemap', name: 'HTML Sitemap Directory', priority: '0.5', changeFreq: 'weekly', isActive: true, showInSitemapPage: true, lastModified: '2026-09-29' }
];

const DEFAULT_MENUS: NavigationMenuItem[] = [
  { id: 'menu-1', label: 'Home', routeType: 'home', order: 1, isActive: true, showInHeader: true, showInFooter: true, category: 'Explore Hub' },
  { id: 'menu-2', label: 'About Us', routeType: 'about', order: 2, isActive: true, showInHeader: true, showInFooter: true, category: 'Explore Hub' },
  { id: 'menu-3', label: 'Services', routeType: 'services-hub', order: 3, isActive: true, showInHeader: true, showInFooter: true, category: 'Explore Hub' },
  { id: 'menu-4', label: 'Industries', routeType: 'industries-hub', order: 4, isActive: true, showInHeader: true, showInFooter: true, category: 'Explore Hub' },
  { id: 'menu-5', label: 'Locations', routeType: 'home', order: 5, isActive: true, showInHeader: true, showInFooter: false },
  { id: 'menu-6', label: 'Blog', routeType: 'blog-hub', order: 6, isActive: true, showInHeader: true, showInFooter: true, category: 'Explore Hub' },
  { id: 'menu-7', label: 'Case Studies', routeType: 'case-studies', order: 7, isActive: true, showInHeader: true, showInFooter: true, category: 'Explore Hub' },
  { id: 'menu-8', label: 'FAQs', routeType: 'home', order: 8, isActive: true, showInHeader: true, showInFooter: true, category: 'Explore Hub' },
  { id: 'menu-9', label: 'Contact Us', routeType: 'contact-page', order: 9, isActive: true, showInHeader: true, showInFooter: true, category: 'Explore Hub' },
  { id: 'menu-10', label: 'Logo Generator', routeType: 'logo-generator', order: 10, isActive: true, showInHeader: false, showInFooter: true, category: 'Explore Hub' },
  { id: 'menu-11', label: 'Terms & Conditions', routeType: 'terms', order: 11, isActive: true, showInHeader: false, showInFooter: true, category: 'Legal' },
  { id: 'menu-12', label: 'Privacy Policy', routeType: 'privacy', order: 12, isActive: true, showInHeader: false, showInFooter: true, category: 'Legal' },
  { id: 'menu-13', label: 'Sitemap', routeType: 'sitemap', order: 13, isActive: true, showInHeader: false, showInFooter: true, category: 'Legal' }
];

class AdminStore {
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.initStore();
  }

  private initStore() {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ENQUIRIES)) {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(INITIAL_ENQUIRIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BLOGS)) {
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(BLOG_POSTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PAGES)) {
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(INITIAL_PAGES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(TESTIMONIALS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.FAQS)) {
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(INITIAL_FAQS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BRANDING)) {
      localStorage.setItem(STORAGE_KEYS.BRANDING, JSON.stringify(DEFAULT_BRANDING));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SEO)) {
      localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(DEFAULT_SEO));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SOCIAL)) {
      localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(DEFAULT_SOCIAL));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ANALYTICS)) {
      localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(DEFAULT_ANALYTICS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.WHATSAPP)) {
      localStorage.setItem(STORAGE_KEYS.WHATSAPP, JSON.stringify(DEFAULT_WHATSAPP));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CONTACT)) {
      localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(DEFAULT_CONTACT));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SITEMAP)) {
      localStorage.setItem(STORAGE_KEYS.SITEMAP, JSON.stringify(DEFAULT_SITEMAP_ITEMS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MENUS)) {
      localStorage.setItem(STORAGE_KEYS.MENUS, JSON.stringify(DEFAULT_MENUS));
    }
    this.applyDynamicDOM();
  }

  public applyDynamicDOM() {
    if (typeof window === 'undefined') return;

    try {
      const branding = this.getBranding();
      if (branding.faviconUrl) {
        let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.head.appendChild(link);
        }
        link.href = branding.faviconUrl;
      }

      if (branding.primaryColor) {
        document.documentElement.style.setProperty('--brand-blue', branding.primaryColor);
      }
      if (branding.accentColor) {
        document.documentElement.style.setProperty('--brand-blue-accent', branding.accentColor);
      }

      // Search Console meta tag
      const analytics = this.getAnalytics();
      if (analytics.searchConsoleEnabled && analytics.searchConsoleTag) {
        let scMeta = document.querySelector('meta[name="google-site-verification"]');
        if (!scMeta) {
          scMeta = document.createElement('meta');
          scMeta.setAttribute('name', 'google-site-verification');
          document.head.appendChild(scMeta);
        }
        const cleanTag = analytics.searchConsoleTag.replace(/^google-site-verification=/, '');
        scMeta.setAttribute('content', cleanTag);
      }
    } catch (e) {
      console.warn('Error applying dynamic DOM settings', e);
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(fn => fn());
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('raks_data_changed'));
    }
  }

  // --- AUTHENTICATION ---
  public getCurrentUser(): AdminUser | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.AUTH);
    return data ? JSON.parse(data) : null;
  }

  public login(email: string, pass: string): { success: boolean; message?: string; user?: AdminUser } {
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

    if (!user) {
      return { success: false, message: 'Invalid credentials. User email not found.' };
    }

    if (user.status === 'Suspended') {
      return { success: false, message: 'This account has been suspended by an administrator.' };
    }

    if (user.password !== pass) {
      return { success: false, message: 'Incorrect password. Please verify and try again.' };
    }

    const updatedUser = { ...user, lastLogin: new Date().toISOString() };
    this.updateUser(user.id, { lastLogin: updatedUser.lastLogin });
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(updatedUser));
    this.notify();
    return { success: true, user: updatedUser };
  }

  public logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
    this.notify();
  }

  // --- USERS & ACCESS SHARING ---
  public getUsers(): AdminUser[] {
    if (typeof window === 'undefined') return DEFAULT_USERS;
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : DEFAULT_USERS;
  }

  public createUser(user: Omit<AdminUser, 'id' | 'createdAt'>): AdminUser {
    const users = this.getUsers();
    const newUser: AdminUser = {
      ...user,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    users.unshift(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    this.notify();
    return newUser;
  }

  public updateUser(id: string, updates: Partial<AdminUser>): boolean {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return false;

    users[idx] = { ...users[idx], ...updates };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Update active session if it's the current user
    const cur = this.getCurrentUser();
    if (cur && cur.id === id) {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(users[idx]));
    }

    this.notify();
    return true;
  }

  public deleteUser(id: string): boolean {
    let users = this.getUsers();
    if (users.length <= 1) return false; // Prevent deleting last remaining admin
    users = users.filter(u => u.id !== id);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    this.notify();
    return true;
  }

  // --- ENQUIRIES / CONTACT SUBMISSIONS ---
  public getEnquiries(): Enquiry[] {
    if (typeof window === 'undefined') return INITIAL_ENQUIRIES;
    const data = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    return data ? JSON.parse(data) : INITIAL_ENQUIRIES;
  }

  public addEnquiry(data: Omit<Enquiry, 'id' | 'createdAt' | 'status'> & { status?: Enquiry['status'] }): Enquiry {
    const enquiries = this.getEnquiries();
    const newEnquiry: Enquiry = {
      ...data,
      id: `enq-${Date.now()}`,
      status: data.status || 'New',
      createdAt: new Date().toISOString()
    };
    enquiries.unshift(newEnquiry);
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    this.notify();
    return newEnquiry;
  }

  public updateEnquiry(id: string, updates: Partial<Enquiry>): boolean {
    const enquiries = this.getEnquiries();
    const idx = enquiries.findIndex(e => e.id === id);
    if (idx === -1) return false;
    enquiries[idx] = { ...enquiries[idx], ...updates };
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    this.notify();
    return true;
  }

  public deleteEnquiry(id: string): boolean {
    let enquiries = this.getEnquiries();
    enquiries = enquiries.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    this.notify();
    return true;
  }

  // --- BLOGS ---
  public getBlogs(): BlogPost[] {
    if (typeof window === 'undefined') return BLOG_POSTS;
    const data = localStorage.getItem(STORAGE_KEYS.BLOGS);
    return data ? JSON.parse(data) : BLOG_POSTS;
  }

  public getBlogById(id: string): BlogPost | undefined {
    return this.getBlogs().find(b => b.id === id);
  }

  public createBlog(post: BlogPost): BlogPost {
    const blogs = this.getBlogs();
    blogs.unshift(post);
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
    this.notify();
    return post;
  }

  public updateBlog(id: string, updates: Partial<BlogPost>): boolean {
    const blogs = this.getBlogs();
    const idx = blogs.findIndex(b => b.id === id);
    if (idx === -1) return false;
    blogs[idx] = { ...blogs[idx], ...updates };
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
    this.notify();
    return true;
  }

  public deleteBlog(id: string): boolean {
    let blogs = this.getBlogs();
    blogs = blogs.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
    this.notify();
    return true;
  }

  // --- CUSTOM PAGES ---
  public getPages(): CustomPage[] {
    if (typeof window === 'undefined') return INITIAL_PAGES;
    const data = localStorage.getItem(STORAGE_KEYS.PAGES);
    return data ? JSON.parse(data) : INITIAL_PAGES;
  }

  public getPageBySlug(slug: string): CustomPage | undefined {
    return this.getPages().find(p => p.slug.toLowerCase() === slug.toLowerCase());
  }

  public createPage(page: Omit<CustomPage, 'id' | 'createdAt' | 'updatedAt'>): CustomPage {
    const pages = this.getPages();
    const newPage: CustomPage = {
      ...page,
      id: `page-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    pages.unshift(newPage);
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(pages));
    this.notify();
    return newPage;
  }

  public updatePage(id: string, updates: Partial<CustomPage>): boolean {
    const pages = this.getPages();
    const idx = pages.findIndex(p => p.id === id);
    if (idx === -1) return false;
    pages[idx] = { ...pages[idx], ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(pages));
    this.notify();
    return true;
  }

  public deletePage(id: string): boolean {
    let pages = this.getPages();
    pages = pages.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(pages));
    this.notify();
    return true;
  }

  // --- TESTIMONIALS ---
  public getTestimonials(): Testimonial[] {
    if (typeof window === 'undefined') return TESTIMONIALS;
    const data = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    return data ? JSON.parse(data) : TESTIMONIALS;
  }

  public createTestimonial(data: Omit<Testimonial, 'id'>): Testimonial {
    const items = this.getTestimonials();
    const newItem: Testimonial = {
      ...data,
      id: `test-${Date.now()}`
    };
    items.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(items));
    this.notify();
    return newItem;
  }

  public updateTestimonial(id: string, updates: Partial<Testimonial>): boolean {
    const items = this.getTestimonials();
    const idx = items.findIndex(t => t.id === id);
    if (idx === -1) return false;
    items[idx] = { ...items[idx], ...updates };
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(items));
    this.notify();
    return true;
  }

  public deleteTestimonial(id: string): boolean {
    let items = this.getTestimonials();
    items = items.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(items));
    this.notify();
    return true;
  }

  // --- FAQS ---
  public getFAQs(): FAQ[] {
    if (typeof window === 'undefined') return INITIAL_FAQS;
    const data = localStorage.getItem(STORAGE_KEYS.FAQS);
    return data ? JSON.parse(data) : INITIAL_FAQS;
  }

  public createFAQ(data: Omit<FAQ, 'id'>): FAQ {
    const items = this.getFAQs();
    const newItem: FAQ = {
      ...data,
      id: `faq-${Date.now()}`
    };
    items.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(items));
    this.notify();
    return newItem;
  }

  public updateFAQ(id: string, updates: Partial<FAQ>): boolean {
    const items = this.getFAQs();
    const idx = items.findIndex(f => f.id === id);
    if (idx === -1) return false;
    items[idx] = { ...items[idx], ...updates };
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(items));
    this.notify();
    return true;
  }

  public deleteFAQ(id: string): boolean {
    let items = this.getFAQs();
    items = items.filter(f => f.id !== id);
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(items));
    this.notify();
    return true;
  }

  // --- BRANDING ---
  public getBranding(): BrandingSettings {
    if (typeof window === 'undefined') return DEFAULT_BRANDING;
    const data = localStorage.getItem(STORAGE_KEYS.BRANDING);
    return data ? { ...DEFAULT_BRANDING, ...JSON.parse(data) } : DEFAULT_BRANDING;
  }

  public updateBranding(updates: Partial<BrandingSettings>): BrandingSettings {
    const current = this.getBranding();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEYS.BRANDING, JSON.stringify(updated));
    this.applyDynamicDOM();
    this.notify();
    return updated;
  }

  // --- SEO ---
  public getSEO(): SEOSettings {
    if (typeof window === 'undefined') return DEFAULT_SEO;
    const data = localStorage.getItem(STORAGE_KEYS.SEO);
    return data ? { ...DEFAULT_SEO, ...JSON.parse(data) } : DEFAULT_SEO;
  }

  public updateSEO(updates: Partial<SEOSettings>): SEOSettings {
    const current = this.getSEO();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(updated));
    this.notify();
    return updated;
  }

  // --- SOCIAL MEDIA ---
  public getSocialLinks(): SocialLink[] {
    if (typeof window === 'undefined') return DEFAULT_SOCIAL;
    const data = localStorage.getItem(STORAGE_KEYS.SOCIAL);
    return data ? JSON.parse(data) : DEFAULT_SOCIAL;
  }

  public updateSocialLink(id: string, updates: Partial<SocialLink>): boolean {
    const list = this.getSocialLinks();
    const idx = list.findIndex(s => s.id === id);
    if (idx === -1) return false;
    list[idx] = { ...list[idx], ...updates };
    localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(list));
    this.notify();
    return true;
  }

  public addSocialLink(item: Omit<SocialLink, 'id'>): SocialLink {
    const list = this.getSocialLinks();
    const newItem: SocialLink = { ...item, id: `soc-${Date.now()}` };
    list.push(newItem);
    localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(list));
    this.notify();
    return newItem;
  }

  public deleteSocialLink(id: string): boolean {
    let list = this.getSocialLinks();
    list = list.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(list));
    this.notify();
    return true;
  }

  // --- ANALYTICS ---
  public getAnalytics(): AnalyticsSettings {
    if (typeof window === 'undefined') return DEFAULT_ANALYTICS;
    const data = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    return data ? { ...DEFAULT_ANALYTICS, ...JSON.parse(data) } : DEFAULT_ANALYTICS;
  }

  public updateAnalytics(updates: Partial<AnalyticsSettings>): AnalyticsSettings {
    const current = this.getAnalytics();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(updated));
    this.applyDynamicDOM();
    this.notify();
    return updated;
  }

  // --- WHATSAPP CHAT ---
  public getWhatsApp(): WhatsAppSettings {
    if (typeof window === 'undefined') return DEFAULT_WHATSAPP;
    const data = localStorage.getItem(STORAGE_KEYS.WHATSAPP);
    return data ? { ...DEFAULT_WHATSAPP, ...JSON.parse(data) } : DEFAULT_WHATSAPP;
  }

  public updateWhatsApp(updates: Partial<WhatsAppSettings>): WhatsAppSettings {
    const current = this.getWhatsApp();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEYS.WHATSAPP, JSON.stringify(updated));
    this.notify();
    return updated;
  }

  // --- CONTACT DETAILS ---
  public getContactDetails(): ContactDetailsSettings {
    if (typeof window === 'undefined') return DEFAULT_CONTACT;
    const data = localStorage.getItem(STORAGE_KEYS.CONTACT);
    return data ? { ...DEFAULT_CONTACT, ...JSON.parse(data) } : DEFAULT_CONTACT;
  }

  public updateContactDetails(updates: Partial<ContactDetailsSettings>): ContactDetailsSettings {
    const current = this.getContactDetails();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(updated));
    this.notify();
    return updated;
  }

  // --- SITEMAP ---
  public getSitemapItems(): SitemapItem[] {
    if (typeof window === 'undefined') return DEFAULT_SITEMAP_ITEMS;
    const data = localStorage.getItem(STORAGE_KEYS.SITEMAP);
    return data ? JSON.parse(data) : DEFAULT_SITEMAP_ITEMS;
  }

  public updateSitemapItem(id: string, updates: Partial<SitemapItem>): boolean {
    const list = this.getSitemapItems();
    const idx = list.findIndex(s => s.id === id);
    if (idx === -1) return false;
    list[idx] = { ...list[idx], ...updates, lastModified: new Date().toISOString().slice(0, 10) };
    localStorage.setItem(STORAGE_KEYS.SITEMAP, JSON.stringify(list));
    this.notify();
    return true;
  }

  public addSitemapItem(item: Omit<SitemapItem, 'id' | 'lastModified'>): SitemapItem {
    const list = this.getSitemapItems();
    const newItem: SitemapItem = {
      ...item,
      id: `sm-${Date.now()}`,
      lastModified: new Date().toISOString().slice(0, 10)
    };
    list.push(newItem);
    localStorage.setItem(STORAGE_KEYS.SITEMAP, JSON.stringify(list));
    this.notify();
    return newItem;
  }

  public deleteSitemapItem(id: string): boolean {
    let list = this.getSitemapItems();
    list = list.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SITEMAP, JSON.stringify(list));
    this.notify();
    return true;
  }

  // --- NAVIGATION MENUS (HEADER & FOOTER) ---
  public getNavigationMenus(): NavigationMenuItem[] {
    if (typeof window === 'undefined') return DEFAULT_MENUS;
    const data = localStorage.getItem(STORAGE_KEYS.MENUS);
    return data ? JSON.parse(data) : DEFAULT_MENUS;
  }

  public updateNavigationMenuItem(id: string, updates: Partial<NavigationMenuItem>): boolean {
    const list = this.getNavigationMenus();
    const idx = list.findIndex(m => m.id === id);
    if (idx === -1) return false;
    list[idx] = { ...list[idx], ...updates };
    localStorage.setItem(STORAGE_KEYS.MENUS, JSON.stringify(list));
    this.notify();
    return true;
  }

  public addNavigationMenuItem(item: Omit<NavigationMenuItem, 'id'>): NavigationMenuItem {
    const list = this.getNavigationMenus();
    const newItem: NavigationMenuItem = { ...item, id: `menu-${Date.now()}` };
    list.push(newItem);
    localStorage.setItem(STORAGE_KEYS.MENUS, JSON.stringify(list));
    this.notify();
    return newItem;
  }

  public deleteNavigationMenuItem(id: string): boolean {
    let list = this.getNavigationMenus();
    list = list.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.MENUS, JSON.stringify(list));
    this.notify();
    return true;
  }

  // Reset to initial seed data
  public resetToDefaults() {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(INITIAL_ENQUIRIES));
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(BLOG_POSTS));
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(INITIAL_PAGES));
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(TESTIMONIALS));
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(INITIAL_FAQS));
    localStorage.setItem(STORAGE_KEYS.BRANDING, JSON.stringify(DEFAULT_BRANDING));
    localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(DEFAULT_SEO));
    localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(DEFAULT_SOCIAL));
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(DEFAULT_ANALYTICS));
    localStorage.setItem(STORAGE_KEYS.WHATSAPP, JSON.stringify(DEFAULT_WHATSAPP));
    localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(DEFAULT_CONTACT));
    localStorage.setItem(STORAGE_KEYS.SITEMAP, JSON.stringify(DEFAULT_SITEMAP_ITEMS));
    localStorage.setItem(STORAGE_KEYS.MENUS, JSON.stringify(DEFAULT_MENUS));
    this.applyDynamicDOM();
    this.notify();
  }
}

export const adminStore = new AdminStore();
