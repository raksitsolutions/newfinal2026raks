import React, { useState, useMemo } from 'react';
import { Enquiry } from '../../types';
import { adminStore } from '../../services/adminStore';
import { 
  Search, Plus, Filter, Trash2, Edit3, Eye, Phone, Mail, 
  MapPin, MessageSquare, Download, Calendar, CheckCircle2, 
  Clock, AlertCircle, X, ExternalLink, Send
} from 'lucide-react';

interface AdminEnquiriesModuleProps {
  enquiries: Enquiry[];
  onRefresh: () => void;
}

const STATUS_COLORS: Record<Enquiry['status'], { bg: string; text: string; border: string }> = {
  'New': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'Contacted': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  'In Progress': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  'Closed': { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30' },
  'Spam': { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' }
};

const AdminEnquiriesModule: React.FC<AdminEnquiriesModuleProps> = ({ enquiries, onRefresh }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form state for editing / creating
  const [formData, setFormData] = useState<Partial<Enquiry>>({
    name: '',
    email: '',
    phone: '',
    location: 'Warangal',
    service: 'Web Development',
    message: '',
    status: 'New',
    notes: '',
    source: 'Manual Admin Entry'
  });

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter(item => {
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const q = search.toLowerCase().trim();
      const matchesSearch = !q || (
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.service.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q)
      );
      return matchesStatus && matchesSearch;
    });
  }, [enquiries, search, statusFilter]);

  const handleOpenDetail = (item: Enquiry) => {
    setSelectedEnquiry(item);
    setIsDetailOpen(true);
  };

  const handleOpenEdit = (item: Enquiry) => {
    setSelectedEnquiry(item);
    setFormData(item);
    setIsEditOpen(true);
  };

  const handleOpenCreate = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: 'Warangal',
      service: 'Web Development',
      message: '',
      status: 'New',
      notes: '',
      source: 'Phone / Walk-in Enquiry'
    });
    setIsCreateOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    adminStore.updateEnquiry(selectedEnquiry.id, formData);
    setIsEditOpen(false);
    onRefresh();
  };

  const handleSaveCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    adminStore.addEnquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '+91 - Not provided',
      location: formData.location || 'Warangal',
      service: formData.service || 'Web Development',
      message: formData.message || 'No additional message provided.',
      source: formData.source || 'Admin Direct Entry',
      status: (formData.status as Enquiry['status']) || 'New',
      notes: formData.notes || ''
    });

    setIsCreateOpen(false);
    onRefresh();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the enquiry from "${name}"?`)) {
      adminStore.deleteEnquiry(id);
      if (selectedEnquiry?.id === id) {
        setIsDetailOpen(false);
        setIsEditOpen(false);
      }
      onRefresh();
    }
  };

  const handleQuickStatusChange = (id: string, newStatus: Enquiry['status']) => {
    adminStore.updateEnquiry(id, { status: newStatus });
    onRefresh();
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Location', 'Service', 'Status', 'Source', 'Message', 'Notes'];
    const rows = filteredEnquiries.map(e => [
      e.id,
      new Date(e.createdAt).toLocaleString(),
      `"${e.name.replace(/"/g, '""')}"`,
      e.email,
      e.phone,
      `"${e.location}"`,
      `"${e.service}"`,
      e.status,
      `"${e.source}"`,
      `"${e.message.replace(/"/g, '""')}"`,
      `"${(e.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `raks_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top action toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search enquiries by name, email, phone, city or service..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
              <option value="Spam">Spam</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-sm font-semibold transition-colors"
            title="Export filtered enquiries to CSV"
          >
            <Download className="w-4 h-4" />
            <span className="hidden md:inline">Export CSV</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Enquiry</span>
          </button>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
          <span>Showing {filteredEnquiries.length} of {enquiries.length} Enquiries</span>
          <span className="text-emerald-400 font-semibold">
            {enquiries.filter(e => e.status === 'New').length} Pending Review
          </span>
        </div>

        {filteredEnquiries.length === 0 ? (
          <div className="p-16 text-center text-slate-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-base font-semibold text-slate-400">No enquiries found</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search or status filter</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/60 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Client / Prospect</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Service & Location</th>
                  <th className="py-3.5 px-4">Date & Source</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-medium">
                {filteredEnquiries.map((item) => {
                  const statusStyle = STATUS_COLORS[item.status] || STATUS_COLORS.New;
                  return (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-bold text-white flex items-center gap-2">
                          {item.name}
                          {item.status === 'New' && (
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 truncate max-w-xs mt-0.5">
                          "{item.message}"
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          <a href={`mailto:${item.email}`} className="hover:underline">{item.email}</a>
                        </div>
                        {item.phone && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                            <Phone className="w-3.5 h-3.5 text-slate-500" />
                            <span>{item.phone}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-200">{item.service}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500" /> {item.location}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="text-xs text-slate-300">
                          {new Date(item.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{item.source}</div>
                      </td>

                      <td className="py-4 px-4">
                        <select
                          value={item.status}
                          onChange={(e) => handleQuickStatusChange(item.id, e.target.value as Enquiry['status'])}
                          className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border focus:outline-none cursor-pointer ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                        >
                          <option value="New" className="bg-slate-900 text-emerald-400">New</option>
                          <option value="Contacted" className="bg-slate-900 text-blue-400">Contacted</option>
                          <option value="In Progress" className="bg-slate-900 text-amber-400">In Progress</option>
                          <option value="Closed" className="bg-slate-900 text-slate-400">Closed</option>
                          <option value="Spam" className="bg-slate-900 text-red-400">Spam</option>
                        </select>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenDetail(item)}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                            title="View Full Enquiry Details (Read)"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors"
                            title="Edit Enquiry & Notes (Edit)"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(item.id, item.name)}
                            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                            title="Delete Enquiry (Delete)"
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
        )}
      </div>

      {/* DETAIL MODAL (READ) */}
      {isDetailOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsDetailOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 text-brand-blue flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedEnquiry.name}</h3>
                <p className="text-xs text-slate-400">
                  Received on {new Date(selectedEnquiry.createdAt).toLocaleString()} via {selectedEnquiry.source}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 uppercase font-bold">Email Address</div>
                <div className="text-sm font-semibold text-white mt-1 select-all">{selectedEnquiry.email}</div>
              </div>
              <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 uppercase font-bold">Phone Number</div>
                <div className="text-sm font-semibold text-white mt-1 select-all">{selectedEnquiry.phone || 'N/A'}</div>
              </div>
              <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 uppercase font-bold">Service Required</div>
                <div className="text-sm font-semibold text-white mt-1">{selectedEnquiry.service}</div>
              </div>
              <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 uppercase font-bold">Location / City</div>
                <div className="text-sm font-semibold text-white mt-1">{selectedEnquiry.location}</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-xs text-slate-400 uppercase font-bold mb-2">Client Inquiry Message</div>
              <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700/60 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message}
              </div>
            </div>

            {selectedEnquiry.notes && (
              <div className="mb-6">
                <div className="text-xs text-amber-400 uppercase font-bold mb-2">Staff Internal Notes</div>
                <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-xs">
                  {selectedEnquiry.notes}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                {selectedEnquiry.phone && selectedEnquiry.phone.replace(/[^0-9]/g, '').length >= 10 && (
                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedEnquiry.name)},%20thank%20you%20for%20contacting%20RAKS%20IT%20SOLUTIONS.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" /> WhatsApp Reply
                  </a>
                )}
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=RAKS%20IT%20SOLUTIONS%20-%20Response%20to%20your%20inquiry`}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" /> Email Reply
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsDetailOpen(false);
                    handleOpenEdit(selectedEnquiry);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Edit Details
                </button>
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / WRITE ENQUIRY MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsCreateOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-2">Record New Client Enquiry</h3>
            <p className="text-xs text-slate-400 mb-6">Manually record a walk-in, phone call, or external lead.</p>

            <form onSubmit={handleSaveCreate} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Reddy"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ramesh@company.in"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98480 00000"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Location / City</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Warangal / Hyderabad"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Service</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    <option>Web Development</option>
                    <option>Mobile App Development</option>
                    <option>Digital Marketing & SEO</option>
                    <option>Enterprise ERP / CRM</option>
                    <option>Cloud Infrastructure & DevOps</option>
                    <option>Branding & UI/UX</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Enquiry['status'] })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Inquiry Details / Message</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Client requirements summary..."
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Internal Notes</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Assigned to, follow-up date, etc."
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
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
                  className="px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/30"
                >
                  Save Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">Edit Enquiry: {selectedEnquiry.name}</h3>
            <p className="text-xs text-slate-400 mb-6">Update contact information, status, or staff remarks.</p>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Enquiry['status'] })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                    <option value="Spam">Spam</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Service</label>
                  <input
                    type="text"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Message Content</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Staff Internal Notes / Follow-up</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Record call outcome, quote sent, meeting date..."
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
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
                  className="px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/30"
                >
                  Update Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiriesModule;
