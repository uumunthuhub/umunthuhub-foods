'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToSignIn: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose, onBackToSignIn }) => {
  const { showToast, themeMode } = useApp();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className={`relative w-full max-w-md glass-panel rounded-3xl overflow-hidden shadow-2xl border p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 ${
        (themeMode === 'warm' ? 'bg-[#fffbf7]/95 border-[#d4c4b8]' :
        themeMode === 'dark' ? 'bg-[#242625]/95 border-white/20' :
        'bg-white/95 border-[#e1bfb5]')
      }`}>        
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            themeMode === 'warm' ? 'bg-[#f5ede4] hover:bg-[#e9ddcf] text-[#6b5a4a]' :
            themeMode === 'dark' ? 'bg-[#2e302f] hover:bg-[#383a39] text-[#c4c4c4]' :
            'bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#594139]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-1.5 mb-5">
          <div className={`w-12 h-12 rounded-2xl overflow-hidden border mx-auto shadow-md ${
            themeMode === 'warm' ? 'border-[#d4c4b8]' :
            themeMode === 'dark' ? 'border-white/20' :
            'border-[#e1bfb5]'
          }`}>
            <img
              src="/umunthuhub-logo.png"
              alt="Umunthuhub-Foods"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className={`font-heading font-extrabold text-xl ${
            themeMode === 'warm' ? 'text-[#3d2b1f]' :
            themeMode === 'dark' ? 'text-[#f5f5f5]' :
            'text-[#1a1c1c]'
          }`}>
            {isSent ? 'Check Your Inbox' : 'Forgot Password?'}
          </h3>
          <p className={`text-xs ${
            themeMode === 'warm' ? 'text-[#3d2b1f]' :
            themeMode === 'dark' ? 'text-[#e5e5e5]' :
            'text-[#1a1c1c]'
          }`}>
            {isSent 
              ? 'We\'ve sent password reset instructions to your email address.'
              : 'Enter your email to receive a secure reset link.'
            }
          </p>
        </div>

        {!isSent ? (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label className={`font-heading font-bold text-xs ${
                themeMode === 'warm' ? 'text-[#3d2b1f]' :
                themeMode === 'dark' ? 'text-[#f5f5f5]' :
                'text-[#1a1c1c]'
              }`}>Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-2xl glass-button-primary font-heading font-bold text-xs shadow-lg shadow-[#ab3500]/25 transition-all mt-2 cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Send Reset Link</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className={`p-4 rounded-2xl border space-y-3 ${
            themeMode === 'warm' ? 'bg-[#00ae81]/10 border-[#00ae81]/30' :
            themeMode === 'dark' ? 'bg-[#00ae81]/10 border-[#00ae81]/30' :
            'bg-[#00ae81]/5 border-[#00ae81]/20'
          }`}>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[24px] text-[#006c4f]">mail</span>
              <div>
                <p className={`font-heading font-bold text-xs text-[#006c4f] mb-1`}>
                  Email Sent Successfully
                </p>
                <p className={`text-[11px] leading-relaxed ${
                  themeMode === 'warm' ? 'text-[#3d2b1f]' :
                  themeMode === 'dark' ? 'text-[#e5e5e5]' :
                  'text-[#1a1c1c]'
                }`}>
                  Please check your inbox and spam folder. The reset link will expire in 30 minutes for security.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsSent(false)}
              className={`text-[11px] font-bold hover:underline ${
                themeMode === 'warm' ? 'text-[#ab3500]' :
                themeMode === 'dark' ? 'text-[#ff6b35]' :
                'text-[#ab3500]'
              }`}
            >
              Send another email
            </button>
          </div>
        )}

        {/* Back to Sign In */}
        <div className="pt-4 mt-4 border-t">
          <button
            type="button"
            onClick={onBackToSignIn}
            className={`flex items-center justify-center gap-2 w-full text-xs font-bold hover:underline cursor-pointer ${
              themeMode === 'warm' ? 'text-[#3d2b1f]' :
              themeMode === 'dark' ? 'text-[#e5e5e5]' :
              'text-[#1a1c1c]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Sign In</span>
          </button>
        </div>

      </div>
    </div>
  );
};
