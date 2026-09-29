
export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOContent {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  body: string;
  features: string[];
  faqs: FAQItem[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
  content: string;
  seo: SEOContent;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  seo: SEOContent;
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  image: string;
  seo: SEOContent;
}

export interface LocationInfo {
  city: string;
  region: string;
  description: string;
  seo: SEOContent;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  image: string;
  growth: string;
  description: string;
  strategies: string[];
  pros: string[];
  cons: string[];
  implementation: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export interface FAQ {
  id: string;
  category: string;
  categoryLabel: string;
  question: string;
  answer: string;
  keyPoints?: string[];
  readTime: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'Super Admin' | 'Editor' | 'Support';
  status: 'Active' | 'Suspended';
  createdAt: string;
  lastLogin?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  message: string;
  source: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Closed' | 'Spam';
  notes?: string;
  createdAt: string;
}

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  showInNav: boolean;
  showInFooter: boolean;
  status: 'Published' | 'Draft';
  createdAt: string;
  updatedAt: string;
}

export interface BrandingSettings {
  logoUrl?: string; // Custom uploaded logo (data URL or external URL)
  logoWhiteUrl?: string; // Custom logo for dark backgrounds
  faviconUrl?: string; // Custom favicon URL or data URL
  siteName: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  darkColor: string;
  copyrightText: string;
  developedByText: string;
  showDevelopedBy: boolean;
  footerDescription: string;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
  canonicalUrl: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  schemaEnabled: boolean;
  customSchemaJson?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  handle: string;
  isActive: boolean;
  showInNavbar: boolean;
  showInFooter: boolean;
}

export interface AnalyticsSettings {
  ga4MeasurementId: string;
  ga4Enabled: boolean;
  searchConsoleTag: string;
  searchConsoleEnabled: boolean;
  gtmContainerId: string;
  gtmEnabled: boolean;
  customHeadScript?: string;
}

export interface WhatsAppSettings {
  phoneNumber: string;
  defaultMessage: string;
  floatingButtonVisible: boolean;
  buttonPosition: 'right' | 'left';
  hoverText: string;
  agentStatus: string;
  hoursText: string;
}

export interface ContactDetailsSettings {
  phonePrimary: string;
  phoneSecondary: string;
  emailPrimary: string;
  emailSupport: string;
  addressLine1: string;
  addressLine2: string;
  businessHours: string;
  mapsUrl: string;
  showInContactPage: boolean;
  showInFooter: boolean;
}

export interface SitemapItem {
  id: string;
  url: string;
  name: string;
  priority: string;
  changeFreq: 'daily' | 'weekly' | 'monthly';
  isActive: boolean;
  showInSitemapPage: boolean;
  lastModified: string;
}

export interface NavigationMenuItem {
  id: string;
  label: string;
  routeType: ViewType;
  routeId?: string;
  externalUrl?: string;
  target?: '_self' | '_blank';
  order: number;
  isActive: boolean;
  showInHeader: boolean;
  showInFooter: boolean;
  category?: 'Explore Hub' | 'Local Offices' | 'Legal';
}

export type ViewType = 'home' | 'service' | 'industry' | 'location' | 'industries-hub' | 'services-hub' | 'blog-hub' | 'blog-post' | 'about' | 'gallery' | 'contact-page' | 'logo-generator' | 'case-studies' | 'case-study' | 'terms' | 'privacy' | 'sitemap' | 'admin' | 'custom-page';

export interface Route {
  type: ViewType;
  id?: string;
}

export enum AppSection {
  HOME = 'home',
  ABOUT = 'about',
  SERVICES = 'services',
  INDUSTRIES = 'industries',
  LOCATIONS = 'locations',
  AI_CONSULTANT = 'ai-consultant',
  CONTACT = 'contact',
  GALLERY = 'gallery',
  LOGO_GENERATOR = 'logo-generator',
  SERVICES_HUB = 'services-hub',
  INDUSTRIES_HUB = 'industries-hub',
  BLOG_HUB = 'blog-hub'
}
