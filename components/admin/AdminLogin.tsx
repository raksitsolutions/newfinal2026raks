import React, { useState } from 'react';
import { adminStore } from '../../services/adminStore';
import { AdminUser } from '../../types';
import BrandLogo from '../BrandLogo';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser) => void;
  onBackToSite: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToSite }) => {
  const [email, setEmail] = useState('admin@raksitsolutions.com');
  const [password, setPassword] = useState('admin@raks2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const result = adminStore.login(email, password);
      setIsLoading(false);
      if (result.success && result.user) {
        onLoginSuccess(result.user);
      } else {
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    }, 400);
  };

  const handleQuickFill = (role: 'super' | 'editor' | 'support') => {
    if (role === 'super') {
      setEmail('admin@raksitsolutions.com');
      setPassword('admin@raks2026');
    } else if (role === 'editor') {
      setEmail('content@raksitsolutions.com');
      setPassword('content@raks2026');
    } else {
      setEmail('support@raksitsolutions.com');
      setPassword('support@raks2026');
    }
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <div className="flex justify-center mb-6">
          <BrandLogo variant="light" className="h-10" />
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" /> Authorized Staff Portal
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white">
          Admin Dashboard Login
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Manage website inquiries, blogs, custom pages, FAQs & testimonials
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-3xl sm:px-10">
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300 font-medium">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Staff Username / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@raksitsolutions.com"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-10 py-3 border border-slate-700 rounded-xl bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent text-sm font-medium"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-blue/30 text-sm font-bold text-white bg-brand-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to Admin Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Credentials helper */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-blue-400" /> Default Credentials (1-Click Fill)
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('super')}
                className="p-2 text-left bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors group"
              >
                <div className="text-[11px] font-bold text-blue-400 group-hover:text-blue-300">Super Admin</div>
                <div className="text-[9px] text-slate-400 truncate">admin@raks...</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('editor')}
                className="p-2 text-left bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors group"
              >
                <div className="text-[11px] font-bold text-emerald-400 group-hover:text-emerald-300">Editor</div>
                <div className="text-[9px] text-slate-400 truncate">content@raks...</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('support')}
                className="p-2 text-left bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors group"
              >
                <div className="text-[11px] font-bold text-purple-400 group-hover:text-purple-300">Support</div>
                <div className="text-[9px] text-slate-400 truncate">support@raks...</div>
              </button>
            </div>

            <div className="mt-4 p-3 bg-slate-800/40 border border-slate-800 rounded-xl text-[11px] text-slate-400 space-y-1">
              <div><strong className="text-slate-300">Admin Email:</strong> admin@raksitsolutions.com</div>
              <div><strong className="text-slate-300">Default Password:</strong> admin@raks2026</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={onBackToSite}
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            ← Return to Public Website
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
