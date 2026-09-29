import React, { useState } from 'react';
import { CustomPage } from '../../types';
import { adminStore } from '../../services/adminStore';
import { 
  Plus, Search, Edit3, Trash2, Eye, ExternalLink, Globe, 
  FileText, CheckCircle2, X, Sparkles, Navigation, Link2 
} from 'lucide-react';

interface AdminPagesModuleProps {
  pages: CustomPage[];
  onRefresh: () => void;
  onViewPageOnSite: (slug: string) => void;
}

const AdminPagesModule: React.FC<AdminPagesModuleProps> = ({ pages, onRefresh, onViewPageOnSite }) => {
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<CustomPage | null>(null);

  const [formData, setFormData] = useState<Omit<CustomPage, 'id' | 'createdAt' | 'updatedAt'>>({
    slug: '',
    title: '',
    subtitle: '',
    metaTitle: '',
    metaDescription: '',
    content: '',
    features: [''],
    ctaText: 'Chat on WhatsApp',
    ctaLink: 'https://wa.me/919010591950',
    showInNav: false,
    showInFooter: true,
    status: 'Published'
  });

  const filteredPages = pages.filter(p => {
    const q = search.toLowerCase().trim();
    return !q || (
      p.title.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q)
    );
  });

  const handleOpenCreate = () => {
    setFormData({
      slug: '',
      title: '',
      subtitle: '',
      metaTitle: '',
      metaDescription: '',
      content: `<h2>Overview</h2><p>Provide details about this page, service offering, business vertical, or campaign in Telangana.</p>`,
      features: ['24/7 dedicated local assistance', 'Bespoke technology architecture', 'Sub-second performance engineering'],
      ctaText: 'Inquire on WhatsApp',
      ctaLink: 'https://wa.me/919010591950',
      showInNav: false,
      showInFooter: true,
      status: 'Published'
    });
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (page: CustomPage) => {
    setSelectedPage(page);
    setFormData({
      slug: page.slug,
      title: page.title,
      subtitle: page.subtitle,
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      content: page.content,
      features: page.features && page.features.length > 0 ? page.features : [''],
      ctaText: page.ctaText,
      ctaLink: page.ctaLink,
      showInNav: page.showInNav,
      showInFooter: page.showInFooter,
      status: page.status
    });
    setIsEditOpen(true);
  };

  const handleOpenPreview = (page: CustomPage) => {
    setSelectedPage(page);
    setIsPreviewOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the custom page "${title}"?`)) {
      adminStore.deletePage(id);
      onRefresh();
    }
  };

  const handleSaveCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const cleanSlug = (formData.slug || formData.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    adminStore.createPage({
      ...formData,
      slug: cleanSlug,
      features: formData.features.filter(f => f.trim().length > 0),
      metaTitle: formData.metaTitle || `${formData.title} | RAKS IT SOLUTIONS`,
      metaDescription: formData.metaDescription || formData.subtitle
    });

    setIsCreateOpen(false);
    onRefresh();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPage || !formData.title) return;

    adminStore.updatePage(selectedPage.id, {
      ...formData,
      slug: formData.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      features: formData.features.filter(f => f.trim().length > 0)
    });

    setIsEditOpen(false);
    onRefresh();
  };

  const handleAddFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const handleFeatureChange = (index: number, val: string) => {
    const list = [...formData.features];
    list[index] = val;
    setFormData({ ...formData, features: list });
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      {/* Top action toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search custom pages by title or slug..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Custom Page</span>
        </button>
      </div>

      {/* Pages Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
          <span>{filteredPages.length} Custom Pages</span>
          <span className="text-emerald-400">Dynamic CMS Routing Active</span>
        </div>

        {filteredPages.length === 0 ? (
          <div className="p-16 text-center text-slate-500">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-base font-semibold text-slate-400">No custom pages created yet</p>
            <p className="text-xs text-slate-500 mt-1">Click "Create New Custom Page" to add dedicated pages with their own URLs.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/60 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Page Title & Subtitle</th>
                  <th className="py-3.5 px-4">Live URL Slug</th>
                  <th className="py-3.5 px-4">Visibility</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-medium">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-white">{page.title}</div>
                      <div className="text-xs text-slate-400 truncate max-w-sm mt-0.5">{page.subtitle}</div>
                    </td>

                    <td className="py-4 px-4 font-mono text-xs text-blue-400">
                      <div className="flex items-center gap-1.5">
                        <Link2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>/page/{page.slug}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-xs">
                      <div className="flex items-center gap-2">
                        {page.showInNav && (
                          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Nav</span>
                        )}
                        {page.showInFooter && (
                          <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">Footer</span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        page.status === 'Published'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-500/10 text-slate-400 border border-slate-500/30'
                      }`}>
                        {page.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenPreview(page)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                          title="Preview Page (Read)"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onViewPageOnSite(page.slug)}
                          className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="View Live Page on Website"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(page)}
                          className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Edit Custom Page (Edit)"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(page.id, page.title)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Delete Page (Delete)"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / WRITE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsCreateOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-white mb-1">Create New Custom Page</h3>
            <p className="text-xs text-slate-400 mb-6">Instantly create a dedicated branded page with customizable sections.</p>

            <form onSubmit={handleSaveCreate} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Page Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. AI Automation & SaaS Solutions"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">URL Slug (e.g. /page/your-slug)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="ai-automation (auto-generated if empty)"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Hero Subtitle / Tagline</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Empowering Telangana enterprises with cutting-edge workflows..."
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Key Highlights / Features</label>
                <div className="space-y-2">
                  {formData.features.map((feat, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                        placeholder={`Feature highlight #${idx + 1}`}
                        className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 mt-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Another Highlight
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Page Content (HTML / Text)
                </label>
                <textarea
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="<h2>Section Title</h2><p>Section description...</p>"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Call to Action Button Text</label>
                  <input
                    type="text"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">CTA WhatsApp / Web Link</label>
                  <input
                    type="text"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 p-4 bg-slate-800/40 rounded-xl border border-slate-800">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showInNav}
                    onChange={(e) => setFormData({ ...formData, showInNav: e.target.checked })}
                    className="rounded border-slate-700 text-brand-blue focus:ring-brand-blue"
                  />
                  <span>Show in Top Navbar</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showInFooter}
                    onChange={(e) => setFormData({ ...formData, showInFooter: e.target.checked })}
                    className="rounded border-slate-700 text-brand-blue focus:ring-brand-blue"
                  />
                  <span>Show in Footer Links</span>
                </label>

                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold uppercase">Status:</span>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as CustomPage['status'] })}
                    className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/30"
                >
                  Publish Custom Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && selectedPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-white mb-1">Edit Custom Page</h3>
            <p className="text-xs text-slate-400 mb-6">Editing: <code className="text-blue-400">/page/{selectedPage.slug}</code></p>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Page Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Hero Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Key Highlights</label>
                <div className="space-y-2">
                  {formData.features.map((feat, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 mt-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Another Highlight
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Page Body Content</label>
                <textarea
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 p-4 bg-slate-800/40 rounded-xl border border-slate-800">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showInNav}
                    onChange={(e) => setFormData({ ...formData, showInNav: e.target.checked })}
                    className="rounded border-slate-700 text-brand-blue focus:ring-brand-blue"
                  />
                  <span>Show in Top Navbar</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showInFooter}
                    onChange={(e) => setFormData({ ...formData, showInFooter: e.target.checked })}
                    className="rounded border-slate-700 text-brand-blue focus:ring-brand-blue"
                  />
                  <span>Show in Footer Links</span>
                </label>

                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold uppercase">Status:</span>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as CustomPage['status'] })}
                    className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/30"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {isPreviewOpen && selectedPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[85vh] overflow-y-auto text-white">
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-block px-3 py-1 bg-brand-blue/20 text-blue-400 text-xs font-bold rounded-full mb-3">
              Slug: /page/{selectedPage.slug}
            </div>

            <h2 className="text-3xl font-black mb-2">{selectedPage.title}</h2>
            {selectedPage.subtitle && (
              <p className="text-base text-slate-300 mb-6">{selectedPage.subtitle}</p>
            )}

            {selectedPage.features && selectedPage.features.length > 0 && (
              <div className="p-4 bg-slate-800/80 rounded-2xl mb-6">
                <div className="text-xs font-bold text-blue-400 uppercase mb-2">Key Highlights</div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedPage.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div 
              className="prose prose-invert prose-sm max-w-none border-t border-slate-800 pt-6 text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: selectedPage.content }}
            />

            <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-slate-800">
              <button
                onClick={() => {
                  setIsPreviewOpen(false);
                  onViewPageOnSite(selectedPage.slug);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-xs font-bold"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open Public Page
              </button>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPagesModule;
