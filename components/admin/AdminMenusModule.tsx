import React, { useState } from 'react';
import { NavigationMenuItem, ViewType } from '../../types';
import { adminStore } from '../../services/adminStore';
import { 
  Menu as MenuIcon, Plus, Edit3, Trash2, Check, ExternalLink, 
  Eye, EyeOff, ArrowUp, ArrowDown, Layout, Globe, Shield, 
  RotateCcw, Sparkles, X, ChevronRight, CheckCircle2 
} from 'lucide-react';

interface AdminMenusModuleProps {
  onRefresh: () => void;
}

const AVAILABLE_ROUTE_TYPES: { type: ViewType; label: string }[] = [
  { type: 'home', label: 'Home Page (/)' },
  { type: 'about', label: 'About Us (/about-us)' },
  { type: 'services-hub', label: 'Services Hub (/services)' },
  { type: 'industries-hub', label: 'Industries Hub (/industries)' },
  { type: 'case-studies', label: 'Case Studies (/case-studies)' },
  { type: 'blog-hub', label: 'Blog Hub (/blog)' },
  { type: 'contact-page', label: 'Contact Us (/contact)' },
  { type: 'sitemap', label: 'Sitemap (/sitemap)' },
  { type: 'terms', label: 'Terms & Conditions (/terms)' },
  { type: 'privacy', label: 'Privacy Policy (/privacy)' },
  { type: 'custom-page', label: 'Dynamic Custom Page (/page/:slug)' },
  { type: 'admin', label: 'Admin Login (/admin)' }
];

const AdminMenusModule: React.FC<AdminMenusModuleProps> = ({ onRefresh }) => {
  const [menus, setMenus] = useState<NavigationMenuItem[]>(() => adminStore.getNavigationMenus());
  const [activeFilter, setActiveFilter] = useState<'all' | 'header' | 'footer'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NavigationMenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<NavigationMenuItem, 'id'>>({
    label: '',
    routeType: 'home',
    routeId: '',
    externalUrl: '',
    target: '_self',
    order: 1,
    isActive: true,
    showInHeader: true,
    showInFooter: true,
    category: 'Explore Hub'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      label: '',
      routeType: 'home',
      routeId: '',
      externalUrl: '',
      target: '_self',
      order: menus.length + 1,
      isActive: true,
      showInHeader: true,
      showInFooter: true,
      category: 'Explore Hub'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: NavigationMenuItem) => {
    setEditingItem(item);
    setFormData({
      label: item.label,
      routeType: item.routeType,
      routeId: item.routeId || '',
      externalUrl: item.externalUrl || '',
      target: item.target || '_self',
      order: item.order,
      isActive: item.isActive,
      showInHeader: item.showInHeader,
      showInFooter: item.showInFooter,
      category: item.category || 'Explore Hub'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.label.trim()) {
      alert('Please enter a menu label.');
      return;
    }

    if (editingItem) {
      adminStore.updateNavigationMenuItem(editingItem.id, formData);
      showToast(`Updated menu "${formData.label}"`);
    } else {
      adminStore.addNavigationMenuItem(formData);
      showToast(`Added new menu item "${formData.label}"`);
    }

    setMenus(adminStore.getNavigationMenus());
    setIsModalOpen(false);
    onRefresh();
  };

  const handleDelete = (id: string, label: string) => {
    if (window.confirm(`Are you sure you want to delete the menu item "${label}"?`)) {
      adminStore.deleteNavigationMenuItem(id);
      setMenus(adminStore.getNavigationMenus());
      showToast(`Deleted "${label}"`);
      onRefresh();
    }
  };

  const handleToggleActive = (item: NavigationMenuItem) => {
    adminStore.updateNavigationMenuItem(item.id, { isActive: !item.isActive });
    setMenus(adminStore.getNavigationMenus());
    showToast(`"${item.label}" is now ${!item.isActive ? 'Active' : 'Inactive'}`);
    onRefresh();
  };

  const handleToggleHeader = (item: NavigationMenuItem) => {
    adminStore.updateNavigationMenuItem(item.id, { showInHeader: !item.showInHeader });
    setMenus(adminStore.getNavigationMenus());
    showToast(`"${item.label}" header visibility: ${!item.showInHeader ? 'Shown' : 'Hidden'}`);
    onRefresh();
  };

  const handleToggleFooter = (item: NavigationMenuItem) => {
    adminStore.updateNavigationMenuItem(item.id, { showInFooter: !item.showInFooter });
    setMenus(adminStore.getNavigationMenus());
    showToast(`"${item.label}" footer visibility: ${!item.showInFooter ? 'Shown' : 'Hidden'}`);
    onRefresh();
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= menus.length) return;

    const listCopy = [...menus];
    const temp = listCopy[index];
    listCopy[index] = listCopy[targetIndex];
    listCopy[targetIndex] = temp;

    // Reassign order
    listCopy.forEach((item, i) => {
      adminStore.updateNavigationMenuItem(item.id, { order: i + 1 });
    });

    setMenus(adminStore.getNavigationMenus());
    onRefresh();
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset all header and footer menus to default configuration?")) {
      adminStore.resetToDefaults();
      setMenus(adminStore.getNavigationMenus());
      showToast("Reset menus to defaults");
      onRefresh();
    }
  };

  // Filtered menus
  const filteredMenus = menus.filter(m => {
    if (activeFilter === 'header') return m.showInHeader;
    if (activeFilter === 'footer') return m.showInFooter;
    return true;
  }).sort((a, b) => a.order - b.order);

  const headerCount = menus.filter(m => m.showInHeader && m.isActive).length;
  const footerCount = menus.filter(m => m.showInFooter && m.isActive).length;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Banner */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <MenuIcon className="w-3.5 h-3.5" /> Site Navigation Management
          </div>
          <h2 className="text-xl font-bold text-white">Header & Footer URL Menus Module</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Full control to Add, Edit, Delete, Update, Active/Inactive, and Show/Hide any menu link on Header & Footer.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
            title="Reset to default menus"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Defaults
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-blue/30 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Menu Item
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* Stats & Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div 
          onClick={() => setActiveFilter('all')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            activeFilter === 'all' 
              ? 'bg-blue-950/40 border-blue-500/40 text-white' 
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="text-xs uppercase font-bold text-slate-500 mb-1">Total Navigation Items</div>
          <div className="text-2xl font-black text-white">{menus.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Both Header & Footer URLs</div>
        </div>

        <div 
          onClick={() => setActiveFilter('header')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            activeFilter === 'header' 
              ? 'bg-blue-950/40 border-blue-500/40 text-white' 
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="text-xs uppercase font-bold text-slate-500 mb-1">Header Navbar Links</div>
          <div className="text-2xl font-black text-blue-400">{headerCount} <span className="text-xs text-slate-400 font-normal">Active</span></div>
          <div className="text-[11px] text-slate-400 mt-1">Displayed in top navigation bar</div>
        </div>

        <div 
          onClick={() => setActiveFilter('footer')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            activeFilter === 'footer' 
              ? 'bg-blue-950/40 border-blue-500/40 text-white' 
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="text-xs uppercase font-bold text-slate-500 mb-1">Footer Menu Links</div>
          <div className="text-2xl font-black text-indigo-400">{footerCount} <span className="text-xs text-slate-400 font-normal">Active</span></div>
          <div className="text-[11px] text-slate-400 mt-1">Displayed in bottom footer columns</div>
        </div>
      </div>

      {/* Menu List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white capitalize">{activeFilter} Menus ({filteredMenus.length})</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Filter:</span>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-bold ${activeFilter === 'all' ? 'bg-brand-blue text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('header')}
              className={`px-2.5 py-1 rounded-lg font-bold ${activeFilter === 'header' ? 'bg-brand-blue text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              Header Only
            </button>
            <button
              onClick={() => setActiveFilter('footer')}
              className={`px-2.5 py-1 rounded-lg font-bold ${activeFilter === 'footer' ? 'bg-brand-blue text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              Footer Only
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-800">
          {filteredMenus.map((item, idx) => (
            <div 
              key={item.id} 
              className={`p-4 sm:p-5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                !item.isActive ? 'bg-slate-950/40 opacity-70' : 'hover:bg-slate-850/50'
              }`}
            >
              {/* Order & Title */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => handleMoveOrder(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 text-slate-500 hover:text-slate-200 disabled:opacity-20"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMoveOrder(idx, 'down')}
                    disabled={idx === filteredMenus.length - 1}
                    className="p-1 text-slate-500 hover:text-slate-200 disabled:opacity-20"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 font-mono text-xs flex items-center justify-center font-bold">
                  {item.order}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{item.label}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      item.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
                    <span className="text-slate-300">
                      {item.externalUrl ? item.externalUrl : `/${item.routeType}${item.routeId ? `/${item.routeId}` : ''}`}
                    </span>
                    {item.category && (
                      <span className="text-[11px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Toggles & Actions */}
              <div className="flex items-center flex-wrap gap-2.5">
                {/* Header Show/Hide */}
                <button
                  onClick={() => handleToggleHeader(item)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                    item.showInHeader 
                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-300' 
                      : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'
                  }`}
                  title="Toggle Header visibility"
                >
                  {item.showInHeader ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>Header: {item.showInHeader ? 'Show' : 'Hide'}</span>
                </button>

                {/* Footer Show/Hide */}
                <button
                  onClick={() => handleToggleFooter(item)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                    item.showInFooter 
                      ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300' 
                      : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'
                  }`}
                  title="Toggle Footer visibility"
                >
                  {item.showInFooter ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>Footer: {item.showInFooter ? 'Show' : 'Hide'}</span>
                </button>

                {/* Active/Inactive Toggle */}
                <button
                  onClick={() => handleToggleActive(item)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                    item.isActive 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                      : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'
                  }`}
                  title="Toggle Active / Inactive"
                >
                  <span className={`w-2 h-2 rounded-full ${item.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                  <span>{item.isActive ? 'Active' : 'Inactive'}</span>
                </button>

                {/* Edit & Delete */}
                <div className="flex items-center gap-1 pl-2 border-l border-slate-800">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    title="Edit Menu"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id, item.label)}
                    className="p-1.5 text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete Menu"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredMenus.length === 0 && (
            <div className="p-12 text-center text-slate-500 text-sm">
              No menu items match the selected filter.
            </div>
          )}
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MenuIcon className="w-5 h-5 text-blue-400" />
                <span>{editingItem ? 'Edit Menu Item' : 'Add New Navigation Menu URL'}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Menu Display Label *
                </label>
                <input
                  type="text"
                  required
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g. Services, Case Studies, Careers"
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Route Destination
                  </label>
                  <select
                    value={formData.routeType}
                    onChange={(e) => setFormData({ ...formData, routeType: e.target.value as ViewType })}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {AVAILABLE_ROUTE_TYPES.map(r => (
                      <option key={r.type} value={r.type}>{r.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {formData.routeType === 'custom-page' && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Custom Page Slug ID
                  </label>
                  <input
                    type="text"
                    value={formData.routeId || ''}
                    onChange={(e) => setFormData({ ...formData, routeId: e.target.value })}
                    placeholder="e.g. careers, enterprise-cloud, training"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Or External URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.externalUrl || ''}
                  onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                  placeholder="https://example.com/external-portal"
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Footer Column Category
                </label>
                <select
                  value={formData.category || 'Explore Hub'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Explore Hub">Explore Hub</option>
                  <option value="Local Offices">Local Offices</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>

              {/* Visibility and Status Checkboxes */}
              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700 space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase">Visibility & Active Status</div>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 bg-slate-700 border-slate-600"
                  />
                  <span className="text-xs text-white font-medium">Menu is Active (Enabled on website)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showInHeader}
                    onChange={(e) => setFormData({ ...formData, showInHeader: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 bg-slate-700 border-slate-600"
                  />
                  <span className="text-xs text-white font-medium">Show in Header Navbar</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showInFooter}
                    onChange={(e) => setFormData({ ...formData, showInFooter: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 bg-slate-700 border-slate-600"
                  />
                  <span className="text-xs text-white font-medium">Show in Footer Links</span>
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
                  {editingItem ? 'Save Changes' : 'Add Menu Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenusModule;
