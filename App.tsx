
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import IndustriesSection from './components/IndustriesSection';
import LocationsSection from './components/LocationsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AIConsultant from './components/AIConsultant';
import LandingPage from './components/LandingPage';
import IndustriesHub from './components/IndustriesHub';
import ServicesHub from './components/ServicesHub';
import BlogHub from './components/BlogHub';
import BlogPostView from './components/BlogPostView';
import AboutUs from './components/AboutUs';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import Sitemap from './components/Sitemap';
import HomeAboutSection from './components/HomeAboutSection';
import HomeSlider from './components/HomeSlider';
import Gallery from './components/Gallery';
import ContactPage from './components/ContactPage';
import LogoGenerator from './components/LogoGenerator';
import CaseStudiesHub from './components/CaseStudiesHub';
import CaseStudyView from './components/CaseStudyView';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import AdminDashboard from './components/admin/AdminDashboard';
import CustomPageView from './components/CustomPageView';
import { adminStore } from './services/adminStore';
import { AppSection, Route, ViewType } from './types';
import { SERVICES, INDUSTRIES, TELANGANA_CITIES, BLOG_POSTS, CASE_STUDIES } from './constants';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>({ type: 'home' });
  const [isAiOpen, setIsAiOpen] = useState(false);

  const parseUrl = useCallback((): Route => {
    let path = window.location.pathname.toLowerCase();
    path = path.replace(/\.html$/, '');
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);

    if (path === '' || path === '/' || path === '/home') return { type: 'home' };
    if (path === '/admin' || path === '/admin/login' || path === '/admin/dashboard') return { type: 'admin' };
    if (path === '/about-us') return { type: 'about' };
    if (path === '/industries') return { type: 'industries-hub' };
    if (path === '/services') return { type: 'services-hub' };
    if (path === '/blog') return { type: 'blog-hub' };
    if (path === '/gallery') return { type: 'gallery' };
    if (path === '/contact-us') return { type: 'contact-page' };
    if (path === '/logo-generator') return { type: 'logo-generator' };
    if (path === '/case-studies') return { type: 'case-studies' };
    if (path === '/terms-and-conditions') return { type: 'terms' };
    if (path === '/privacy-policy') return { type: 'privacy' };
    if (path === '/sitemap') return { type: 'sitemap' };

    const pageMatch = path.match(/^\/page\/(.+)$/);
    if (pageMatch) return { type: 'custom-page', id: pageMatch[1] };

    // Check direct custom page slug e.g. /careers
    const directSlug = path.replace(/^\//, '');
    if (directSlug && adminStore.getPageBySlug(directSlug)) {
      return { type: 'custom-page', id: directSlug };
    }

    const serviceMatch = path.match(/^\/services\/(.+)$/);
    if (serviceMatch) return { type: 'service', id: serviceMatch[1] };

    const industryMatch = path.match(/^\/industries\/(.+)$/);
    if (industryMatch) return { type: 'industry', id: industryMatch[1] };

    const locationMatch = path.match(/^\/locations\/(.+)$/);
    if (locationMatch) return { type: 'location', id: locationMatch[1] };

    const blogMatch = path.match(/^\/blog\/(.+)$/);
    if (blogMatch) return { type: 'blog-post', id: blogMatch[1] };

    const caseStudyMatch = path.match(/^\/case-studies\/(.+)$/);
    if (caseStudyMatch) return { type: 'case-study', id: caseStudyMatch[1] };

    return { type: 'home' };
  }, []);

  const updateUrl = (route: Route) => {
    let path = '/';
    switch (route.type) {
      case 'home': path = '/'; break;
      case 'about': path = '/about-us'; break;
      case 'industries-hub': path = '/industries'; break;
      case 'services-hub': path = '/services'; break;
      case 'blog-hub': path = '/blog'; break;
      case 'gallery': path = '/gallery'; break;
      case 'contact-page': path = '/contact-us'; break;
      case 'logo-generator': path = '/logo-generator'; break;
      case 'case-studies': path = '/case-studies'; break;
      case 'terms': path = '/terms-and-conditions'; break;
      case 'privacy': path = '/privacy-policy'; break;
      case 'sitemap': path = '/sitemap'; break;
      case 'admin': path = '/admin'; break;
      case 'custom-page': path = `/page/${route.id}`; break;
      case 'case-study': path = `/case-studies/${route.id}`; break;
      case 'service': path = `/services/${route.id}`; break;
      case 'industry': path = `/industries/${route.id}`; break;
      case 'location': path = `/locations/${route.id}`; break;
      case 'blog-post': path = `/blog/${route.id}`; break;
    }
    if (window.location.pathname !== path) window.history.pushState(route, '', path);
  };

  useEffect(() => {
    const handlePopState = () => setCurrentRoute(parseUrl());
    window.addEventListener('popstate', handlePopState);
    setCurrentRoute(parseUrl());
    return () => window.removeEventListener('popstate', handlePopState);
  }, [parseUrl]);

  useEffect(() => {
    let title = "RAKS IT SOLUTIONS | Premier Software & SEO Agency in Telangana";
    let description = "Expert Web Development, SEO, and Digital Marketing hub in Warangal, Hanamkonda & Hyderabad.";

    if (currentRoute.type === 'service') {
      const s = SERVICES.find(x => x.id === currentRoute.id);
      if (s) { title = s.seo.metaTitle; description = s.seo.metaDescription; }
    } else if (currentRoute.type === 'blog-post') {
      const b = BLOG_POSTS.find(x => x.id === currentRoute.id);
      if (b) { title = b.seo.metaTitle; description = b.seo.metaDescription; }
    } else if (currentRoute.type === 'location') {
      const l = TELANGANA_CITIES.find(x => x.city.toLowerCase() === currentRoute.id?.toLowerCase());
      if (l) { title = l.seo.metaTitle; description = l.seo.metaDescription; }
    } else if (currentRoute.type === 'industry') {
      const i = INDUSTRIES.find(x => x.id === currentRoute.id);
      if (i) { title = i.seo.metaTitle; description = i.seo.metaDescription; }
    } else if (currentRoute.type === 'case-studies') {
      title = "Case Studies | Success Stories | RAKS IT SOLUTIONS";
      description = "Explore our portfolio of successful digital transformations and business growth stories across Telangana.";
    } else if (currentRoute.type === 'case-study') {
      const s = CASE_STUDIES.find(x => x.id === currentRoute.id);
      if (s) { title = `${s.title} | Case Study | RAKS IT SOLUTIONS`; description = s.description; }
    } else if (currentRoute.type === 'terms') {
      title = "Terms & Conditions | RAKS IT SOLUTIONS";
      description = "Read our terms and conditions for using RAKS IT SOLUTIONS services in Telangana.";
    } else if (currentRoute.type === 'privacy') {
      title = "Privacy Policy | RAKS IT SOLUTIONS";
      description = "Learn how RAKS IT SOLUTIONS protects your personal data and privacy.";
    } else if (currentRoute.type === 'sitemap') {
      title = "Sitemap | RAKS IT SOLUTIONS";
      description = "A complete directory of all pages on the RAKS IT SOLUTIONS website.";
    } else if (currentRoute.type === 'admin') {
      title = "Admin Dashboard | RAKS IT SOLUTIONS";
      description = "Authorized staff management portal for enquiries, blogs, pages, and website content.";
    } else if (currentRoute.type === 'custom-page') {
      const cp = adminStore.getPageBySlug(currentRoute.id || '');
      if (cp) {
        title = `${cp.metaTitle || cp.title} | RAKS IT SOLUTIONS`;
        description = cp.metaDescription || cp.subtitle;
      }
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  const setRoute = (route: Route) => {
    setCurrentRoute(route);
    updateUrl(route);
  };

  const renderContent = () => {
    switch(currentRoute.type) {
      case 'home':
        return (
          <>
            <HomeSlider />
            <Hero onOpenAI={() => setIsAiOpen(true)} onExplore={() => setRoute({ type: 'services-hub' })} />
            <HomeAboutSection onReadMore={() => setRoute({ type: 'about' })} />
            <ServicesSection onSelectService={(id) => setRoute({ type: 'service', id })} />
            <IndustriesSection onSelectIndustry={(id) => setRoute({ type: 'industry', id })} />
            <TestimonialsSection />
            <LocationsSection onSelectLocation={(city) => setRoute({ type: 'location', id: city })} />
            <FAQSection onSetRoute={setRoute} />
          </>
        );
      case 'services-hub': return <ServicesHub onSelectService={(id) => setRoute({ type: 'service', id })} onBack={() => setRoute({ type: 'home' })} />;
      case 'industries-hub': return <IndustriesHub onSelectIndustry={(id) => setRoute({ type: 'industry', id })} onBack={() => setRoute({ type: 'home' })} />;
      case 'blog-hub': return <BlogHub onSelectPost={(id) => setRoute({ type: 'blog-post', id })} onBack={() => setRoute({ type: 'home' })} />;
      case 'blog-post': return <BlogPostView postId={currentRoute.id || ''} onBack={() => setRoute({ type: 'blog-hub' })} />;
      case 'about': return <AboutUs onBack={() => setRoute({ type: 'home' })} />;
      case 'gallery': return <Gallery onBack={() => setRoute({ type: 'home' })} />;
      case 'contact-page': return <ContactPage onBack={() => setRoute({ type: 'home' })} />;
      case 'logo-generator': return <LogoGenerator onBack={() => setRoute({ type: 'home' })} />;
      case 'case-studies': return <CaseStudiesHub onSelectCaseStudy={(id) => setRoute({ type: 'case-study', id })} onBack={() => setRoute({ type: 'home' })} />;
      case 'case-study': return <CaseStudyView study={CASE_STUDIES.find(s => s.id === currentRoute.id)!} onBack={() => setRoute({ type: 'case-studies' })} />;
      case 'terms': return <TermsAndConditions onBack={() => setRoute({ type: 'home' })} />;
      case 'privacy': return <PrivacyPolicy onBack={() => setRoute({ type: 'home' })} />;
      case 'sitemap': return <Sitemap onBack={() => setRoute({ type: 'home' })} onSetRoute={setRoute} />;
      case 'custom-page': {
        const cp = adminStore.getPageBySlug(currentRoute.id || '');
        if (cp) return <CustomPageView page={cp} onBack={() => setRoute({ type: 'home' })} />;
        return <LandingPage route={currentRoute} onBack={() => setRoute({ type: 'home' })} />;
      }
      case 'admin': return <AdminDashboard onBackToSite={() => setRoute({ type: 'home' })} onSetRoute={setRoute} />;
      default: return <LandingPage route={currentRoute} onBack={() => setRoute({ type: 'home' })} />;
    }
  };

  if (currentRoute.type === 'admin') {
    return <AdminDashboard onBackToSite={() => setRoute({ type: 'home' })} onSetRoute={setRoute} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeSection={AppSection.HOME} onNavigate={() => {}} onSetRoute={setRoute} onOpenAI={() => setIsAiOpen(true)} />
      <main className="flex-grow">
        {renderContent()}
        {currentRoute.type === 'home' && (
          <div id="contact" className="bg-brand-ash text-white py-20">
            <ContactSection />
          </div>
        )}
      </main>
      <Footer onNavigate={() => {}} onSetRoute={setRoute} />
      {isAiOpen && <AIConsultant onClose={() => setIsAiOpen(false)} />}
      
      <a 
        href="https://wa.me/919010591950?text=Hello%20RAKS%20IT%20SOLUTIONS,%20I'm%20interested%20in%20your%20services." 
        target="_blank"
        className="fixed bottom-6 right-6 z-[60] bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-700 transition-all hover:scale-110 active:scale-95 group flex items-center gap-3"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold text-sm">Chat on WhatsApp</span>
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
};

const MessageCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.415 0 12.05c0 2.122.554 4.197 1.597 6.013L0 24l6.135-1.61a11.782 11.782 0 005.91 1.586h.005c6.631 0 12.046-5.415 12.046-12.05a11.776 11.776 0 00-3.441-8.518z"/></svg>
);

export default App;
