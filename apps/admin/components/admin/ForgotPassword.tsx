'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Loader2, Send, Mail, ArrowLeft } from 'lucide-react';

interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBackToLogin }) => {
  const { showToast, themeMode } = useApp();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));

    setIsSubmitting(false);
    setIsSent(true);
    showToast(
      'Reset Link Sent 📧',
      `Password reset instructions have been sent to ${email}. Check your inbox.`,
      'success'
    );
  };

  return (
    <div className={`max-w-5xl mx-auto py-8 px-3 sm:px-6 ${
      themeMode === 'dark' ? 'bg-[#1a1c1c]' : 'bg-[#fcf9f8]'
    }`}>
      {/* Container Box */}
      <div className={`rounded-3xl overflow-hidden border shadow-xl grid grid-cols-1 md:grid-cols-12 min-h-96 ${
        themeMode === 'dark' 
          ? 'bg-[#242625] border-[#3a3a3a]/50' 
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>

        {/* Left Side: Brand Showcase Banner */}
        <div className="md:col-span-5 bg-linear-to-br from-[#ab3500] via-[#8d2a00] to-[#591a00] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background graphic glow */}
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#ff6b35]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Logo */}
          <div className="relative z-10 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white p-1.5 shadow-lg border border-white/20 flex items-center justify-center shrink-0">
                <img
                  src="/umunthuhub-logo.png"
                  alt="Umunthuhub Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-white block leading-none">
                  Umunthuhub<span className="text-[#ffeed9]">-Foods</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#ffc5b3]">
                  Enterprise Admin Console
                </span>
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white leading-tight">
                Reset Your Password
              </h2>
              <p className="text-sm text-[#ffeed9]/90 leading-relaxed font-medium">
                Enter your work email address and we'll send you a secure link to reset your password and regain access to your admin console.
              </p>
            </div>
          </div>

          {/* Security Badge */}
          <div className="relative z-10 pt-10 space-y-4 border-t border-white/15 mt-6">
            <div className="flex items-center gap-3 text-sm text-[#ffeed9]">
              <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-white font-bold">
                🔒
              </span>
              <span>Secure, time-limited reset links</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#ffeed9]">
              <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-white font-bold">
                ✓
              </span>
              <span>Verified email delivery</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className={`md:col-span-7 p-8 sm:p-12 flex flex-col justify-center space-y-7 ${
          themeMode === 'dark' ? 'bg-[#242625]/95' : 'bg-white/95'
        }`}>

          <div>
            <h3 className={`font-heading font-extrabold text-2xl mb-2 ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              {isSent ? 'Check Your Inbox' : 'Forgot Password?'}
            </h3>
            <p className={`text-sm ${
              themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
            }`}>
              {isSent 
                ? 'We\'ve sent password reset instructions to your email address.'
                : 'Enter your work email to receive a secure reset link.'
              }
            </p>
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className={`font-heading font-bold text-sm ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>Work Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@restaurantgroup.com"
                  className={`w-full px-4 py-3 rounded-xl text-sm font-semibold ${
                    themeMode === 'dark' 
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] placeholder-[#7a7a7a]' 
                      : 'glass-input'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-[#ab3500] hover:bg-[#8d2a00] disabled:opacity-60 text-white font-heading font-bold text-sm shadow-lg shadow-[#ab3500]/25 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-[20px] h-[20px] animate-spin" />
                    <span>Sending reset link…</span>
                  </>
                ) : (
                  <>
                    <Send className="w-[20px] h-[20px]" />
                    <span>Send Password Reset Link</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className={`p-5 rounded-2xl border space-y-4 ${
              themeMode === 'dark' 
                ? 'bg-[#00ae81]/10 border-[#00ae81]/30' 
                : 'bg-[#00ae81]/5 border-[#00ae81]/20'
            }`}>
              <div className="flex items-start gap-3">
                <Mail className="w-[28px] h-[28px] text-[#006c4f]" />
                <div>
                  <p className={`font-heading font-bold text-sm text-[#006c4f] mb-1`}>
                    Email Sent Successfully
                  </p>
                  <p className={`text-xs text-[#594139] leading-relaxed`}>
                    Please check your inbox and spam folder. The reset link will expire in 30 minutes for security.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSent(false)}
                className={`text-xs font-bold hover:underline ${
                  themeMode === 'dark' ? 'text-[#ff6b35]' : 'text-[#ab3500]'
                }`}
              >
                Send another email
              </button>
            </div>
          )}

          {/* Back to Login */}
          <div className="pt-4 border-t">
            <button
              type="button"
              onClick={onBackToLogin}
              className={`flex items-center gap-2 text-sm font-bold hover:underline cursor-pointer ${
                themeMode === 'dark' ? 'text-[#c4c4c4] hover:text-[#f5f5f5]' : 'text-[#594139] hover:text-[#1a1c1c]'
              }`}
            >
              <ArrowLeft className="w-[18px] h-[18px]" />
              <span>Back to Sign In</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
