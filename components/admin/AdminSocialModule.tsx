import React, { useState } from 'react';
import { SocialLink } from '../../types';
import { adminStore } from '../../services/adminStore';
import { 
  Share2, Plus, Edit3, Trash2, Check, ExternalLink, 
  Eye, EyeOff, Globe, X, Facebook, Twitter, Instagram, 
  Linkedin, Youtube, Github 
} from 'lucide-react';

interface AdminSocialModuleProps {
  onRefresh: () => void;
}

const PLATFORM_ICONS: Record<string, any> = {
  'Facebook': Facebook,
  'Twitter / X': Twitter,
  'Twitter': Twitter,
  'Instagram': Instagram,
  'LinkedIn': Linkedin,
  'YouTube': Youtube,
  'GitHub': Github
};

const AdminSocialModule: React.FC<AdminSocialModuleProps> = ({ onRefresh }) => {
  const [links, setLinks] = useState<SocialLink[]>(() => adminStore.getSocialLinks());
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<SocialLink | null>(null);

  const [formData, setFormData] = useState<Omit<SocialLink, 'id'>>({
    platform: 'Facebook',
    url: '',
    handle: '',
    isActive: true,
    showInNavbar: true,
    showInFooter: true
  });

  const handleToggleActive = (id: string, current: boolean) => {
    adminStore.updateSocialLink(id, { isActive: !current });
    setLinks(adminStore.getSocialLinks());
    onRefresh();
  };

  const handleToggleFooter = (id: string, current: boolean) => {
    adminStore.updateSocialLink(id, { showInFooter: !current });
    setLinks(adminStore.getSocialLinks());
    onRefresh();
  };

  const handleToggleNavbar = (id: string, current: boolean) => {
    adminStore.updateSocialLink(id, { showInNavbar: !current });
    setLinks(adminStore.getSocialLinks());
    onRefresh();
  };

  const handleOpenCreate = () => {
    setFormData({
      platform: 'Instagram',
      url: 'https://instagram.com/raksitsolutions',
      handle: '@raksitsolutions',
      isActive: true,
      showInNavbar: true,
      showInFooter: true
    });
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (item: SocialLink) => {
    setSelectedLink(item);
    setFormData({
      platform: item.platform,
      url: item.url,
      handle: item.handle,
      isActive: item.isActive,
      showInNavbar: item.showInNavbar,
      showInFooter: item.showInFooter
    });
    setIsEditOpen(true);
  };

  const handleDelete = (id: string, platform: string) => {
    if (window.confirm(`Are you sure you want to delete ${platform}?`)) {
      adminStore.deleteSocialLink(id);
      setLinks(adminStore.getSocialLinks());
      onRefresh();
    }
  };

  const handleSaveCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.platform || !formData.url) return;
    adminStore.addSocialLink(formData);
    setLinks(adminStore.getSocialLinks());
    setIsCreateOpen(false);
    onRefresh();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLink) return;
    adminStore.updateSocialLink(selectedLink.id, formData);
    setLinks(adminStore.getSocialLinks());
    setIsEditOpen(false);
    onRefresh();
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top action toolbar */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Share2 className="w-3.5 h-3.5" /> Social Media Channels
          </div>
          <h2 className="text-xl font-bold text-white">Social Media Links & Visibility</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage corporate social profiles, toggle active status, and choose whether they appear in the header or footer.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Social Channel</span>
        </button>
      </div>

      {/* Social Links List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
          <span>{links.length} Connected Social Platforms</span>
          <span className="text-emerald-400">{links.filter(l => l.isActive).length} Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/60 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Platform & Handle</th>
                <th className="py-3.5 px-4">Target URL</th>
                <th className="py-3.5 px-4 text-center">Header Nav</th>
                <th className="py-3.5 px-4 text-center">Footer Nav</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {links.map((item) => {
                const Icon = PLATFORM_ICONS[item.platform] || Globe;
                return (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 text-blue-400 flex items-center justify-center border border-slate-700">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-white">{item.platform}</div>
                          <div className="text-xs text-slate-400">{item.handle || 'No handle set'}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono text-xs text-blue-400">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                        <span className="truncate max-w-[200px]">{item.url}</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </td>

                    {/* Show in Navbar Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleNavbar(item.id, item.showInNavbar)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border transition-all ${
                          item.showInNavbar
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                            : 'bg-slate-800 text-slate-500 border-slate-700'
                        }`}
                      >
                        {item.showInNavbar ? 'Visible' : 'Hidden'}
                      </button>
                    </td>

                    {/* Show in Footer Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleFooter(item.id, item.showInFooter)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border transition-all ${
                          item.showInFooter
                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                            : 'bg-slate-800 text-slate-500 border-slate-700'
                        }`}
                      >
                        {item.showInFooter ? 'Visible' : 'Hidden'}
                      </button>
                    </td>

                    {/* Active/Inactive Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(item.id, item.isActive)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border transition-all ${
                          item.isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-red-500/10 text-red-400 border-red-500/30'
                        }`}
                      >
                        {item.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Edit link (Edit)"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.platform)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Delete link (Delete)"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsCreateOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">Add Social Media Channel</h3>
            <p className="text-xs text-slate-400 mb-6">Connect a public social profile to your site footer.</p>

            <form onSubmit={handleSaveCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Platform Name *</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                >
                  <option>Facebook</option>
                  <option>Twitter / X</option>
                  <option>Instagram</option>
                  <option>LinkedIn</option>
                  <option>YouTube</option>
                  <option>GitHub</option>
                  <option>WhatsApp Channel</option>
                  <option>Threads</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Target Profile URL *</label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://instagram.com/your-brand"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Display Handle / Username</label>
                <input
                  type="text"
                  value={formData.handle}
                  onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                  placeholder="@raksitsolutions"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div className="space-y-2 p-3.5 bg-slate-800/50 rounded-xl border border-slate-800">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showInFooter}
                    onChange={(e) => setFormData({ ...formData, showInFooter: e.target.checked })}
                    className="rounded border-slate-700 text-brand-blue focus:ring-brand-blue"
                  />
                  <span>Show icon in Website Footer</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded border-slate-700 text-brand-blue focus:ring-brand-blue"
                  />
                  <span>Active & Clickable</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/30"
                >
                  Save Channel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && selectedLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">Edit {selectedLink.platform} Link</h3>
            <p className="text-xs text-slate-400 mb-6">Modify destination URL and visibility controls.</p>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Target Profile URL *</label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Display Handle</label>
                <input
                  type="text"
                  value={formData.handle}
                  onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div className="space-y-2 p-3.5 bg-slate-800/50 rounded-xl border border-slate-800">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showInFooter}
                    onChange={(e) => setFormData({ ...formData, showInFooter: e.target.checked })}
                    className="rounded border-slate-700 text-brand-blue focus:ring-brand-blue"
                  />
                  <span>Show in Website Footer</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded border-slate-700 text-brand-blue focus:ring-brand-blue"
                  />
                  <span>Active Status</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/30"
                >
                  Update Channel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSocialModule;
