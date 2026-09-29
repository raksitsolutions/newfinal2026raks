
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

export type ViewType = 'home' | 'service' | 'industry' | 'location' | 'industries-hub' | 'services-hub' | 'blog-hub' | 'blog-post' | 'about' | 'gallery' | 'contact-page' | 'logo-generator' | 'image-ai' | 'case-studies' | 'case-study' | 'terms' | 'privacy' | 'sitemap';

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
  IMAGE_AI = 'image-ai',
  SERVICES_HUB = 'services-hub',
  INDUSTRIES_HUB = 'industries-hub',
  BLOG_HUB = 'blog-hub'
}
