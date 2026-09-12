import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, RefreshCw, LogOut, CheckCircle } from 'lucide-react';
import { Logo } from '../common/Logo';

export const VerifyEmailView: React.FC = () => {
  const { currentUser, resendVerification, logout } = useAuth();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    try {
      await resendVerification();
      setSent(true);
      setTimeout(() => setSent(false), 8000);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl text-center">
        <div className="flex justify-center mb-6">
          <Logo size="lg" showTagline={false} />
        </div>

        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Mail className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight mb-2">Verify Your Gmail</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          We sent a verification link to <span className="font-semibold text-slate-900 dark:text-white">{currentUser?.email}</span>. Please click the link in your inbox to unlock your student dashboard.
        </p>

        {sent && (
          <div className="mb-6 p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>New verification email sent! Check your spam folder if needed.</span>
          </div>
        )}

        <div className="space-y-3">
          <button
            id="verify-check-status-btn"
            onClick={handleReload}
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>I Have Verified, Continue</span>
          </button>

          <button
            id="resend-verification-btn"
            onClick={handleResend}
            disabled={loading || sent}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm transition-colors cursor-pointer disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Resend Verification Email'}
          </button>

          <button
            id="verify-logout-btn"
            onClick={logout}
            className="w-full py-2 px-4 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Use a different account</span>
          </button>
        </div>
      </div>
    </div>
  );
};
