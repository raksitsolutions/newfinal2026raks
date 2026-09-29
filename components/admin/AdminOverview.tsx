import React from 'react';
import { Enquiry, BlogPost, CustomPage, Testimonial, FAQ, AdminUser } from '../../types';
import { 
  MessageSquare, BookOpen, FileText, Star, HelpCircle, 
  Users, ArrowUpRight, TrendingUp, Clock, MapPin, Plus, 
  ExternalLink, CheckCircle2, AlertCircle 
} from 'lucide-react';

interface AdminOverviewProps {
  enquiries: Enquiry[];
  blogs: BlogPost[];
  pages: CustomPage[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  users: AdminUser[];
  onNavigateTab: (tab: 'enquiries' | 'blogs' | 'pages' | 'testimonials' | 'faqs' | 'users') => void;
  onOpenCreateEnquiry: () => void;
  onOpenCreateBlog: () => void;
  onOpenCreatePage: () => void;
  onOpenCreateTestimonial: () => void;
}

const AdminOverview: React.FC<AdminOverviewProps> = ({
  enquiries,
  blogs,
  pages,
  testimonials,
  faqs,
  users,
  onNavigateTab,
  onOpenCreateEnquiry,
  onOpenCreateBlog,
  onOpenCreatePage,
  onOpenCreateTestimonial
}) => {
  const newEnquiries = enquiries.filter(e => e.status === 'New');
  const recentEnquiries = enquiries.slice(0, 5);

  const stats = [
    {
      label: 'Client Enquiries',
      count: enquiries.length,
      badge: `${newEnquiries.length} New`,
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      icon: MessageSquare,
      iconColor: 'text-blue-400 bg-blue-500/10',
      tab: 'enquiries' as const
    },
    {
      label: 'Published Articles',
      count: blogs.length,
      badge: 'Live on /blog',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      icon: BookOpen,
      iconColor: 'text-purple-400 bg-purple-500/10',
      tab: 'blogs' as const
    },
    {
      label: 'Custom Pages (CMS)',
      count: pages.length,
      badge: `${pages.filter(p => p.status === 'Published').length} Live`,
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      icon: FileText,
      iconColor: 'text-indigo-400 bg-indigo-500/10',
      tab: 'pages' as const
    },
    {
      label: 'Client Testimonials',
      count: testimonials.length,
      badge: '5.0★ Verified',
      badgeColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
      icon: Star,
      iconColor: 'text-yellow-400 bg-yellow-500/10',
      tab: 'testimonials' as const
    },
    {
      label: 'Knowledge Base FAQs',
      count: faqs.length,
      badge: 'Interactive',
      badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
      icon: HelpCircle,
      iconColor: 'text-teal-400 bg-teal-500/10',
      tab: 'faqs' as const
    },
    {
      label: 'Staff Accounts',
      count: users.length,
      badge: 'Access Shared',
      badgeColor: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/30',
      icon: Users,
      iconColor: 'text-fuchsia-400 bg-fuchsia-500/10',
      tab: 'users' as const
    }
  ];

  return (
    <div className="space-y-8">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigateTab(s.tab)}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl shadow-xl cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.iconColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${s.badgeColor}`}>
                  {s.badge}
                </span>
              </div>
              <div className="text-3xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors">
                {s.count}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>{s.label}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-400" /> Quick Creation Shortcuts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={onOpenCreateEnquiry}
            className="p-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-left transition-all hover:border-blue-500/50 group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">Record Enquiry</div>
            <div className="text-[10px] text-slate-400">Walk-in or call lead</div>
          </button>

          <button
            onClick={onOpenCreateBlog}
            className="p-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-left transition-all hover:border-purple-500/50 group"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2 group-hover:bg-purple-500 group-hover:text-white transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">Write Blog</div>
            <div className="text-[10px] text-slate-400">Post SEO article</div>
          </button>

          <button
            onClick={onOpenCreatePage}
            className="p-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-left transition-all hover:border-emerald-500/50 group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">Create Page</div>
            <div className="text-[10px] text-slate-400">New /page/:slug URL</div>
          </button>

          <button
            onClick={onOpenCreateTestimonial}
            className="p-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-left transition-all hover:border-yellow-500/50 group"
          >
            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center mb-2 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">Add Review</div>
            <div className="text-[10px] text-slate-400">Client testimonial</div>
          </button>
        </div>
      </div>

      {/* Recent Enquiries Activity */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" /> Recent Client Inquiries
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Leads submitted via website forms & hero quick quotes</p>
          </div>
          <button
            onClick={() => onNavigateTab('enquiries')}
            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            View All Enquiries ({enquiries.length}) →
          </button>
        </div>

        <div className="divide-y divide-slate-800/80">
          {recentEnquiries.map((enq) => (
            <div key={enq.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{enq.name}</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                    enq.status === 'New' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' :
                    enq.status === 'Contacted' ? 'text-blue-400 bg-blue-500/10 border-blue-500/30' :
                    'text-slate-400 bg-slate-500/10 border-slate-500/30'
                  }`}>
                    {enq.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3 mt-1">
                  <span>{enq.email}</span>
                  <span>•</span>
                  <span>{enq.phone}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {enq.location}</span>
                </div>
                <p className="text-xs text-slate-300 italic mt-2 line-clamp-1">"{enq.message}"</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigateTab('enquiries')}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors"
                >
                  Manage Lead
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
