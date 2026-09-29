import React, { useState, useEffect } from 'react';
import { adminStore } from '../../services/adminStore';
import { AdminUser, Enquiry, BlogPost, CustomPage, Testimonial, FAQ, Route } from '../../types';
import BrandLogo from '../BrandLogo';
import AdminLogin from './AdminLogin';
import AdminOverview from './AdminOverview';
import AdminEnquiriesModule from './AdminEnquiriesModule';
import AdminBlogsModule from './AdminBlogsModule';
import AdminPagesModule from './AdminPagesModule';
import AdminTestimonialsModule from './AdminTestimonialsModule';
import AdminFAQsModule from './AdminFAQsModule';
import AdminUsersModule from './AdminUsersModule';
import { 
  LayoutDashboard, MessageSquare, BookOpen, FileText, Star, 
  HelpCircle, Users, LogOut, ExternalLink, Menu, X, Shield, 
  Bell, ChevronRight, Sparkles, RefreshCw 
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToSite: () => void;
  onSetRoute: (route: Route) => void;
}

type AdminTab = 'overview' | 'enquiries' | 'blogs' | 'pages' | 'testimonials' | 'faqs' | 'users';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite, onSetRoute }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => adminStore.getCurrentUser());
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Store data states
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => adminStore.getEnquiries());
  const [blogs, setBlogs] = useState<BlogPost[]>(() => adminStore.getBlogs());
  const [pages, setPages] = useState<CustomPage[]>(() => adminStore.getPages());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => adminStore.getTestimonials());
  const [faqs, setFaqs] = useState<FAQ[]>(() => adminStore.getFAQs());
  const [users, setUsers] = useState<AdminUser[]>(() => adminStore.getUsers());

  // Listen to store updates
  useEffect(() => {
    const refreshAll = () => {
      setCurrentUser(adminStore.getCurrentUser());
      setEnquiries(adminStore.getEnquiries());
      setBlogs(adminStore.getBlogs());
      setPages(adminStore.getPages());
      setTestimonials(adminStore.getTestimonials());
      setFaqs(adminStore.getFAQs());
      setUsers(adminStore.getUsers());
    };

    const unsubscribe = adminStore.subscribe(refreshAll);
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out of the Admin Portal?')) {
      adminStore.logout();
      setCurrentUser(null);
    }
  };

  if (!currentUser) {
    return <AdminLogin onLoginSuccess={(user) => setCurrentUser(user)} onBackToSite={onBackToSite} />;
  }

  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;

  const navItems = [
    { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'enquiries' as const, label: 'Enquiries & Leads', icon: MessageSquare, badge: newEnquiriesCount > 0 ? `${newEnquiriesCount} New` : null, badgeColor: 'bg-emerald-500 text-white' },
    { id: 'blogs' as const, label: 'Blog Articles', icon: BookOpen, badge: `${blogs.length}` },
    { id: 'pages' as const, label: 'Custom Pages CMS', icon: FileText, badge: `${pages.length}` },
    { id: 'testimonials' as const, label: 'Client Reviews', icon: Star, badge: `${testimonials.length}` },
    { id: 'faqs' as const, label: 'FAQ Knowledge Base', icon: HelpCircle, badge: `${faqs.length}` },
    { id: 'users' as const, label: 'User Access & Sharing', icon: Users, badge: `${users.length}` }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-900 border-r border-slate-800 p-5 sticky top-0 h-screen">
        {/* Brand header */}
        <div className="pb-6 border-b border-slate-800 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => setActiveTab('overview')}>
            <BrandLogo variant="light" className="h-8" />
          </div>
        </div>

        <div className="my-4 px-3 py-2 bg-slate-800/60 rounded-xl border border-slate-800 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-blue/20 text-blue-400 flex items-center justify-center font-bold text-xs uppercase">
            {currentUser.name.charAt(0)}
          </div>
          <div className="flex-1 truncate">
            <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
            <div className="text-[10px] text-blue-400 font-semibold">{currentUser.role}</div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400')
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom controls */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <button
            onClick={onBackToSite}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Go to Public Website</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <BrandLogo variant="light" className="h-7" />
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2 z-30">
          <div className="p-3 bg-slate-800/80 rounded-xl mb-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-blue/20 text-blue-400 flex items-center justify-center font-bold text-xs uppercase">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-white">{currentUser.name}</div>
              <div className="text-[10px] text-blue-400">{currentUser.role}</div>
            </div>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold ${
                  isActive ? 'bg-brand-blue text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onBackToSite}
              className="text-xs font-semibold text-slate-300 flex items-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4" /> Public Website
            </button>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-red-400 flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-slate-900/60 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-sm font-black text-white capitalize">
              {navItems.find(i => i.id === activeTab)?.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Live Site</span>
            </button>

            <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

            <div className="flex items-center gap-2 pl-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs text-slate-400 font-medium">System Online</span>
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <div className="p-6 md:p-8 max-w-7xl w-full mx-auto flex-1">
          {activeTab === 'overview' && (
            <AdminOverview
              enquiries={enquiries}
              blogs={blogs}
              pages={pages}
              testimonials={testimonials}
              faqs={faqs}
              users={users}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenCreateEnquiry={() => setActiveTab('enquiries')}
              onOpenCreateBlog={() => setActiveTab('blogs')}
              onOpenCreatePage={() => setActiveTab('pages')}
              onOpenCreateTestimonial={() => setActiveTab('testimonials')}
            />
          )}

          {activeTab === 'enquiries' && (
            <AdminEnquiriesModule
              enquiries={enquiries}
              onRefresh={() => setEnquiries(adminStore.getEnquiries())}
            />
          )}

          {activeTab === 'blogs' && (
            <AdminBlogsModule
              blogs={blogs}
              onRefresh={() => setBlogs(adminStore.getBlogs())}
              onViewPostOnSite={(id) => onSetRoute({ type: 'blog-post', id })}
            />
          )}

          {activeTab === 'pages' && (
            <AdminPagesModule
              pages={pages}
              onRefresh={() => setPages(adminStore.getPages())}
              onViewPageOnSite={(slug) => onSetRoute({ type: 'custom-page', id: slug })}
            />
          )}

          {activeTab === 'testimonials' && (
            <AdminTestimonialsModule
              testimonials={testimonials}
              onRefresh={() => setTestimonials(adminStore.getTestimonials())}
            />
          )}

          {activeTab === 'faqs' && (
            <AdminFAQsModule
              faqs={faqs}
              onRefresh={() => setFaqs(adminStore.getFAQs())}
            />
          )}

          {activeTab === 'users' && (
            <AdminUsersModule
              users={users}
              currentUser={currentUser}
              onRefresh={() => setUsers(adminStore.getUsers())}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
