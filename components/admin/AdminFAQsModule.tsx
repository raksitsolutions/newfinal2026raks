import React, { useState } from 'react';
import { FAQ } from '../../types';
import { adminStore } from '../../services/adminStore';
import { 
  Plus, Search, Edit3, Trash2, HelpCircle, ChevronDown, 
  ChevronUp, CheckCircle2, X, Filter 
} from 'lucide-react';

interface AdminFAQsModuleProps {
  faqs: FAQ[];
  onRefresh: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  'software': 'Software Engineering',
  'marketing': 'Digital Marketing & SEO',
  'pricing': 'Pricing & Delivery',
  'support': 'Security & Support'
};

const AdminFAQsModule: React.FC<AdminFAQsModuleProps> = ({ faqs, onRefresh }) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);

  const [formData, setFormData] = useState<Omit<FAQ, 'id'>>({
    category: 'software',
    categoryLabel: 'Software Engineering',
    question: '',
    answer: '',
    keyPoints: [''],
    readTime: '2 min read'
  });

  const toggleOpen = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = faqs.filter(f => {
    const matchesCat = categoryFilter === 'all' || f.category === categoryFilter;
    const q = search.toLowerCase().trim();
    const matchesSearch = !q || (
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      (f.keyPoints && f.keyPoints.some(kp => kp.toLowerCase().includes(q)))
    );
    return matchesCat && matchesSearch;
  });

  const handleOpenCreate = () => {
    setFormData({
      category: 'software',
      categoryLabel: 'Software Engineering',
      question: '',
      answer: '',
      keyPoints: ['Transparent weekly sprint milestone reviews', '100% intellectual property ownership'],
      readTime: '2 min read'
    });
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (faq: FAQ) => {
    setSelectedFAQ(faq);
    setFormData({
      category: faq.category,
      categoryLabel: faq.categoryLabel || CATEGORY_LABELS[faq.category] || 'General',
      question: faq.question,
      answer: faq.answer,
      keyPoints: faq.keyPoints && faq.keyPoints.length > 0 ? faq.keyPoints : [''],
      readTime: faq.readTime || '2 min read'
    });
    setIsEditOpen(true);
  };

  const handleDelete = (id: string, question: string) => {
    if (window.confirm(`Are you sure you want to delete this FAQ: "${question}"?`)) {
      adminStore.deleteFAQ(id);
      onRefresh();
    }
  };

  const handleSaveCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) return;

    adminStore.createFAQ({
      ...formData,
      categoryLabel: CATEGORY_LABELS[formData.category] || formData.categoryLabel,
      keyPoints: formData.keyPoints ? formData.keyPoints.filter(p => p.trim().length > 0) : []
    });

    setIsCreateOpen(false);
    onRefresh();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFAQ || !formData.question) return;

    adminStore.updateFAQ(selectedFAQ.id, {
      ...formData,
      categoryLabel: CATEGORY_LABELS[formData.category] || formData.categoryLabel,
      keyPoints: formData.keyPoints ? formData.keyPoints.filter(p => p.trim().length > 0) : []
    });

    setIsEditOpen(false);
    onRefresh();
  };

  const handleAddPoint = () => {
    setFormData({ ...formData, keyPoints: [...(formData.keyPoints || []), ''] });
  };

  const handlePointChange = (idx: number, val: string) => {
    const list = [...(formData.keyPoints || [])];
    list[idx] = val;
    setFormData({ ...formData, keyPoints: list });
  };

  const handleRemovePoint = (idx: number) => {
    setFormData({ ...formData, keyPoints: (formData.keyPoints || []).filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      {/* Action toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search FAQs by question or answer keyword..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
          >
            <option value="all">All FAQ Categories</option>
            <option value="software">Software Engineering</option>
            <option value="marketing">Digital Marketing & SEO</option>
            <option value="pricing">Pricing & Engagements</option>
            <option value="support">Security & Support</option>
          </select>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* FAQs List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
          <span>{filtered.length} FAQs Live</span>
          <span className="text-emerald-400">Synced to Public Homepage FAQ</span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-16 text-center text-slate-500">
            <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-base font-semibold text-slate-400">No FAQs match your search</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {filtered.map((item) => {
              const isOpen = openIds.has(item.id);
              return (
                <div key={item.id} className="p-5 hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 cursor-pointer" onClick={() => toggleOpen(item.id)}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-blue/20 text-blue-400 border border-brand-blue/30">
                          {CATEGORY_LABELS[item.category] || item.categoryLabel || item.category}
                        </span>
                        <span className="text-xs text-slate-500">{item.readTime || '2 min read'}</span>
                      </div>
                      <h4 className="font-bold text-white text-base hover:text-blue-300 transition-colors flex items-center gap-2">
                        {item.question}
                        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors"
                        title="Edit FAQ (Edit)"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.question)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                        title="Delete FAQ (Delete)"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-slate-800/60 text-slate-300 text-sm leading-relaxed animate-in fade-in">
                      <p className="mb-3">{item.answer}</p>

                      {item.keyPoints && item.keyPoints.length > 0 && (
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800 mt-3">
                          <div className="text-xs font-bold text-blue-400 uppercase mb-2">Key Takeaways</div>
                          <ul className="space-y-1 text-xs text-slate-300">
                            {item.keyPoints.map((pt, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CREATE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsCreateOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-white mb-1">Add New FAQ</h3>
            <p className="text-xs text-slate-400 mb-6">Answer common inquiries about engineering, pricing, and SEO.</p>

            <form onSubmit={handleSaveCreate} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    <option value="software">Software Engineering</option>
                    <option value="marketing">Digital Marketing & SEO</option>
                    <option value="pricing">Pricing & Delivery</option>
                    <option value="support">Security & Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Read Time Estimate</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g. 2 min read"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. What custom software development services does RAKS IT SOLUTIONS provide?"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Detailed Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Provide an authoritative, clear answer..."
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Key Takeaways (Bullet Points)</label>
                <div className="space-y-2">
                  {(formData.keyPoints || []).map((pt, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={pt}
                        onChange={(e) => handlePointChange(idx, e.target.value)}
                        placeholder={`Takeaway #${idx + 1}`}
                        className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePoint(idx)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddPoint}
                    className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 mt-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Another Bullet Point
                  </button>
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
                  className="px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/30"
                >
                  Publish FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && selectedFAQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-white mb-1">Edit FAQ</h3>
            <p className="text-xs text-slate-400 mb-6">Updating question & answer content.</p>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    <option value="software">Software Engineering</option>
                    <option value="marketing">Digital Marketing & SEO</option>
                    <option value="pricing">Pricing & Delivery</option>
                    <option value="support">Security & Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Read Time Estimate</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Detailed Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Key Takeaways</label>
                <div className="space-y-2">
                  {(formData.keyPoints || []).map((pt, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={pt}
                        onChange={(e) => handlePointChange(idx, e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePoint(idx)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddPoint}
                    className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 mt-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Another Bullet Point
                  </button>
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
                  className="px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/30"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFAQsModule;
