import React, { useState } from 'react';
import { AdminUser } from '../../types';
import { adminStore } from '../../services/adminStore';
import { 
  Plus, Search, Edit3, Trash2, Shield, Share2, Copy, 
  Check, Lock, Mail, User, Clock, AlertCircle, X, KeyRound, 
  Send, ShieldCheck, UserCheck 
} from 'lucide-react';

interface AdminUsersModuleProps {
  users: AdminUser[];
  currentUser: AdminUser | null;
  onRefresh: () => void;
}

const ROLE_BADGES: Record<AdminUser['role'], { bg: string; text: string; border: string }> = {
  'Super Admin': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  'Editor': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  'Support': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' }
};

const AdminUsersModule: React.FC<AdminUsersModuleProps> = ({ users, currentUser, onRefresh }) => {
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: AdminUser['role'];
    status: AdminUser['status'];
  }>({
    name: '',
    email: '',
    password: '',
    role: 'Editor',
    status: 'Active'
  });

  const filtered = users.filter(u => {
    const q = search.toLowerCase().trim();
    return !q || (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  });

  const handleOpenCreate = () => {
    setFormData({
      name: '',
      email: '',
      password: 'raks' + Math.floor(1000 + Math.random() * 9000),
      role: 'Editor',
      status: 'Active'
    });
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (user: AdminUser) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password || '',
      role: user.role,
      status: user.status
    });
    setIsEditOpen(true);
  };

  const handleOpenShare = (user: AdminUser) => {
    setSelectedUser(user);
    setCopied(false);
    setIsShareOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (id === currentUser?.id) {
      alert("You cannot delete your own logged-in account.");
      return;
    }
    if (users.length <= 1) {
      alert("Cannot delete the only remaining admin account.");
      return;
    }
    if (window.confirm(`Are you sure you want to remove staff access for "${name}"?`)) {
      adminStore.deleteUser(id);
      onRefresh();
    }
  };

  const handleSaveCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) return;

    const created = adminStore.createUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      status: formData.status
    });

    setIsCreateOpen(false);
    onRefresh();

    // Automatically prompt to share access with the newly created user!
    setSelectedUser(created);
    setIsShareOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !formData.name) return;

    adminStore.updateUser(selectedUser.id, {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      status: formData.status
    });

    setIsEditOpen(false);
    onRefresh();
  };

  const getShareableText = (user: AdminUser) => {
    const portalUrl = typeof window !== 'undefined' ? `${window.location.origin}/admin` : 'https://www.raksitsolutions.com/admin';
    return `🔐 *RAKS IT SOLUTIONS - Admin Dashboard Access Credentials*

Hello ${user.name}, you have been granted staff access to the RAKS IT SOLUTIONS management portal.

🌐 *Portal URL:* ${portalUrl}
📧 *Username / Email:* ${user.email}
🔑 *Password:* ${user.password || 'Contact Super Admin'}
🛡️ *Assigned Role:* ${user.role}

*Responsibilities:* Manage client inquiries, publish tech blogs, customize landing pages, testimonials, and FAQs. Please change your password upon initial login.`;
  };

  const handleCopyCredentials = (user: AdminUser) => {
    const text = getShareableText(user);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header and top bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search staff members by name, email or role..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Invite / Add New User</span>
        </button>
      </div>

      {/* Access Sharing Info Callout */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-start gap-3">
        <Share2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-blue-200">
          <strong className="text-white block mb-0.5">User Access Sharing Enabled:</strong>
          Generate, edit, and share instant dashboard credentials with your teammates in Warangal, Hyderabad, or remote branches via WhatsApp or Email.
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
          <span>{filtered.length} Active Staff Accounts</span>
          <span className="text-purple-400">Multi-Role RBAC Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/60 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Staff Member</th>
                <th className="py-3.5 px-4">Role & Access</th>
                <th className="py-3.5 px-4">Account Status</th>
                <th className="py-3.5 px-4">Last Activity</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {filtered.map((user) => {
                const roleStyle = ROLE_BADGES[user.role] || ROLE_BADGES.Editor;
                const isSelf = user.id === currentUser?.id;
                return (
                  <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-white flex items-center gap-2">
                        {user.name}
                        {isSelf && (
                          <span className="text-[10px] bg-slate-800 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-bold">
                            You
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>{user.email}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${roleStyle.bg} ${roleStyle.text} ${roleStyle.border}`}>
                        {user.role}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        user.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}>
                        {user.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-xs text-slate-400">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenShare(user)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-bold transition-colors"
                          title="Share Access Credentials with User"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Share Access</span>
                        </button>

                        <button
                          onClick={() => handleOpenEdit(user)}
                          className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Edit User (Edit)"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {!isSelf && (
                          <button
                            onClick={() => handleDelete(user.id, user.name)}
                            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                            title="Delete User (Delete)"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SHARE ACCESS CREDENTIALS MODAL */}
      {isShareOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsShareOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Share2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Share Staff Credentials</h3>
                <p className="text-xs text-slate-400">Send login access to {selectedUser.name}</p>
              </div>
            </div>

            {/* Credential Card */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 mb-5 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                <span className="text-xs text-slate-400 font-bold uppercase">Staff Member</span>
                <span className="text-sm font-bold text-white">{selectedUser.name}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                <span className="text-xs text-slate-400 font-bold uppercase">Username / Email</span>
                <span className="text-sm font-mono text-blue-300 font-bold select-all">{selectedUser.email}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                <span className="text-xs text-slate-400 font-bold uppercase">Password</span>
                <span className="text-sm font-mono text-emerald-400 font-bold select-all">{selectedUser.password || '••••••••'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold uppercase">Role Permission</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {selectedUser.role}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleCopyCredentials(selectedUser)}
                className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  copied
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-brand-blue hover:bg-blue-600 text-white shadow-lg shadow-brand-blue/30'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Credentials Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Complete Access Card</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(getShareableText(selectedUser))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" /> Send via WhatsApp
                </a>

                <a
                  href={`mailto:${selectedUser.email}?subject=RAKS%20IT%20SOLUTIONS%20-%20Your%20Admin%20Dashboard%20Credentials&body=${encodeURIComponent(getShareableText(selectedUser))}`}
                  className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" /> Send via Email
                </a>
              </div>
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={() => setIsShareOpen(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsCreateOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">Add Staff Account</h3>
            <p className="text-xs text-slate-400 mb-6">Create credentials and assign access permissions.</p>

            <form onSubmit={handleSaveCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Anil Kumar"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Staff Email / Username *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="anil@raksitsolutions.com"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Password *</label>
                <input
                  type="text"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Role Permission</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as AdminUser['role'] })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    <option value="Super Admin">Super Admin (All Modules)</option>
                    <option value="Editor">Editor (Blogs, Pages, FAQs)</option>
                    <option value="Support">Support (Enquiries Only)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as AdminUser['status'] })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
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
                  className="px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/30"
                >
                  Create & Share Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">Edit User: {selectedUser.name}</h3>
            <p className="text-xs text-slate-400 mb-6">Modify user profile, credentials or role access.</p>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email / Username</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Reset Password</label>
                <input
                  type="text"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as AdminUser['role'] })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Support">Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as AdminUser['status'] })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
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

export default AdminUsersModule;
