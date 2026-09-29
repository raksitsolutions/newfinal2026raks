import React, { useState } from 'react';
import { SitemapItem } from '../../types';
import { adminStore } from '../../services/adminStore';
import { 
  Map, Plus, Edit3, Trash2, Check, ExternalLink, 
  Eye, EyeOff, Globe, RotateCcw, Copy, Code, 
  CheckCircle2, X, AlertCircle 
} from 'lucide-react';

interface AdminSitemapModuleProps {
  onRefresh: () => void;
  onViewSitemapOnSite?: () => void;
}

const AdminSitemapModule: React.FC<AdminSitemapModuleProps> = ({ onRefresh, onViewSitemapOnSite }) => {
  const [items, setItems] = useState<SitemapItem[]>(() => adminStore.getSitemapItems());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SitemapItem | null>(null);
  const [isXmlModalOpen, setIsXmlModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Omit<SitemapItem, 'id' | 'lastModified'>>({
    url: '',
    name: '',
    priority: '0.8',
    changeFreq: 'weekly',
    isActive: true,
    showInSitemapPage: true
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      url: '/page/new-page',
      name: 'New Custom Page',
      priority: '0.8',
      changeFreq: 'weekly',
      isActive: true,
      showInSitemapPage: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: SitemapItem) => {
    setEditingItem(item);
    setFormData({
      url: item.url,
      name: item.name,
      priority: item.priority,
      changeFreq: item.changeFreq,
      isActive: item.isActive,
      showInSitemapPage: item.showInSitemapPage
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.url.trim()) {
      alert('Please fill out both Name and URL.');
      return;
    }

    if (editingItem) {
      adminStore.updateSitemapItem(editingItem.id, formData);
      showToast(`Updated "${formData.name}" in sitemap`);
    } else {
      adminStore.addSitemapItem(formData);
      showToast(`Added "${formData.name}" to sitemap`);
    }

    setItems(adminStore.getSitemapItems());
    setIsModalOpen(false);
    onRefresh();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete "${name}" from the sitemap catalog?`)) {
      adminStore.deleteSitemapItem(id);
      setItems(adminStore.getSitemapItems());
      showToast(`Deleted "${name}"`);
      onRefresh();
    }
  };

  const handleToggleActive = (item: SitemapItem) => {
    adminStore.updateSitemapItem(item.id, { isActive: !item.isActive });
    setItems(adminStore.getSitemapItems());
    showToast(`"${item.name}" active status: ${!item.isActive ? 'Active' : 'Inactive'}`);
    onRefresh();
  };

  const handleToggleShow = (item: SitemapItem) => {
    adminStore.updateSitemapItem(item.id, { showInSitemapPage: !item.showInSitemapPage });
    setItems(adminStore.getSitemapItems());
    showToast(`"${item.name}" display on sitemap page: ${!item.showInSitemapPage ? 'Visible' : 'Hidden'}`);
    onRefresh();
  };

  const generateXmlSitemap = () => {
    const activeItems = items.filter(i => i.isActive);
    const domain = 'https://raksitsolutions.com';
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    activeItems.forEach(item => {
      xml += `  <url>\n`;
      xml += `    <loc>${domain}${item.url.startsWith('/') ? item.url : `/${item.url}`}</loc>\n`;
      xml += `    <lastmod>${item.lastModified}</lastmod>\n`;
      xml += `    <changefreq>${item.changeFreq}</changefreq>\n`;
      xml += `    <priority>${item.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  };

  const handleCopyXml = () => {
    const xml = generateXmlSitemap();
    navigator.clipboard.writeText(xml);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Banner */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Map className="w-3.5 h-3.5" /> Crawl & Indexing Map
          </div>
          <h2 className="text-xl font-bold text-white">Sitemap URL Directory & XML Generator</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage XML sitemap URLs for Google Search Console, adjust crawler priority, and toggle page visibility.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsXmlModalOpen(true)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Code className="w-3.5 h-3.5 text-cyan-400" /> View XML Sitemap
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-blue/30 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add URL
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs uppercase font-bold text-slate-500 mb-1">Total Indexed URLs</div>
          <div className="text-2xl font-black text-white">{items.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Tracked website endpoints</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs uppercase font-bold text-slate-500 mb-1">Active in XML Feed</div>
          <div className="text-2xl font-black text-cyan-400">
            {items.filter(i => i.isActive).length} <span className="text-xs text-slate-400 font-normal">Active</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Included in sitemap for bots</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs uppercase font-bold text-slate-500 mb-1">Public Sitemap Page</div>
          <div className="text-2xl font-black text-emerald-400">
            {items.filter(i => i.showInSitemapPage).length} <span className="text-xs text-slate-400 font-normal">Visible</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Visible on /sitemap directory</div>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Registered Sitemap URLs ({items.length})</h3>
          {onViewSitemapOnSite && (
            <button
              onClick={onViewSitemapOnSite}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              <span>View Live HTML Sitemap</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="divide-y divide-slate-800">
          {items.map((item) => (
            <div 
              key={item.id}
              className={`p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                !item.isActive ? 'bg-slate-950/40 opacity-70' : 'hover:bg-slate-850/50'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{item.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    item.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                  <span className="font-mono text-cyan-400">{item.url}</span>
                  <span>Priority: <strong className="text-slate-200">{item.priority}</strong></span>
                  <span>Freq: <strong className="text-slate-200">{item.changeFreq}</strong></span>
                  <span className="text-[11px] text-slate-500">Updated: {item.lastModified}</span>
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-2.5">
                {/* Show/Hide on HTML Page */}
                <button
                  onClick={() => handleToggleShow(item)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                    item.showInSitemapPage 
                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-300' 
                      : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'
                  }`}
                  title="Toggle HTML Sitemap Page visibility"
                >
                  {item.showInSitemapPage ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>HTML Page: {item.showInSitemapPage ? 'Show' : 'Hide'}</span>
                </button>

                {/* Active/Inactive */}
                <button
                  onClick={() => handleToggleActive(item)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                    item.isActive 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                      : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'
                  }`}
                  title="Toggle active status"
                >
                  <span className={`w-2 h-2 rounded-full ${item.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                  <span>{item.isActive ? 'Active' : 'Inactive'}</span>
                </button>

                {/* Edit & Delete */}
                <div className="flex items-center gap-1 pl-2 border-l border-slate-800">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    title="Edit Sitemap Entry"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-1.5 text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Map className="w-5 h-5 text-cyan-400" />
                <span>{editingItem ? 'Edit Sitemap URL' : 'Add Sitemap URL'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Page Name / Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Enterprise Cloud Solutions"
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  URL Relative Path *
                </label>
                <input
                  type="text"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="/page/my-custom-page"
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Crawl Priority (0.1 to 1.0)
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="1.0">1.0 (Highest - Homepage)</option>
                    <option value="0.9">0.9 (Key Hubs & Services)</option>
                    <option value="0.8">0.8 (Important Pages)</option>
                    <option value="0.7">0.7 (Sub-services & Posts)</option>
                    <option value="0.5">0.5 (Standard)</option>
                    <option value="0.3">0.3 (Low Priority)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Change Frequency
                  </label>
                  <select
                    value={formData.changeFreq}
                    onChange={(e) => setFormData({ ...formData, changeFreq: e.target.value as any })}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-700 border-slate-600"
                  />
                  <span className="text-xs text-white font-medium">Active (Included in XML sitemap feed)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showInSitemapPage}
                    onChange={(e) => setFormData({ ...formData, showInSitemapPage: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-700 border-slate-600"
                  />
                  <span className="text-xs text-white font-medium">Show in HTML Sitemap Directory Page</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-blue/30"
                >
                  {editingItem ? 'Save Changes' : 'Add to Sitemap'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* XML SITEMAP VIEWER MODAL */}
      {isXmlModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-cyan-400" />
                  <span>Live XML Sitemap Output</span>
                </h3>
                <p className="text-xs text-slate-400">Ready to copy and submit to Google Search Console or Bing Webmaster Tools.</p>
              </div>
              <button onClick={() => setIsXmlModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 max-h-96 overflow-y-auto whitespace-pre-wrap select-all">
                {generateXmlSitemap()}
              </pre>

              <button
                type="button"
                onClick={handleCopyXml}
                className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors shadow-lg"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied XML!' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">
                Total URLs in feed: {items.filter(i => i.isActive).length}
              </span>
              <button
                onClick={() => setIsXmlModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
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

export default AdminSitemapModule;
