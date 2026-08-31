'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import { ForgotPasswordModal } from './ForgotPasswordModal';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, setCustomerTab, showToast, themeMode } = useApp();
  
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  // Sign in / Sign up state
  const [email, setEmail] = useState('julian@greenbistro.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Julian Rossi');
  const [rememberMe, setRememberMe] = useState(true);

  if (!isAuthModalOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Signed In Successfully!', `Welcome back, ${email}`, 'success');
    setIsAuthModalOpen(false);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

    setCustomerTab('home');
    showToast('Epicurean Account Created!', `Welcome to Umunthuhub-Foods, ${name}! Enjoy $10 off your first order.`, 'success');
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsAuthModalOpen(false)}
      />

      {/* Modal Box */}
      <div className={`relative w-full max-w-md glass-panel rounded-3xl overflow-hidden shadow-2xl border p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 ${
        (themeMode === 'warm' ? 'bg-[#fffbf7]/95 border-[#d4c4b8]' :
        themeMode === 'dark' ? 'bg-[#242625]/95 border-white/20' :
        'bg-white/95 border-[#e1bfb5]')
      }`}>        
        <button
          onClick={() => setIsAuthModalOpen(false)}
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
            {tab === 'signin' && 'Welcome Back'}
            {tab === 'signup' && 'Create Umunthuhub-Foods Account'}
          </h3>
          <p className={`text-xs ${
            themeMode === 'warm' ? 'text-[#3d2b1f]' :
            themeMode === 'dark' ? 'text-[#e5e5e5]' :
            'text-[#1a1c1c]'
          }`}>
            {tab === 'signin' && 'Access multi-tenant kitchens, live orders & loyalty rewards'}
            {tab === 'signup' && 'Join the culinary ecosystem as a foodie, merchant or rider'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className={`grid grid-cols-2 p-1 rounded-2xl border mb-5 ${
          themeMode === 'warm' ? 'bg-[#f5ede4] border-[#d4c4b8]/50' :
          themeMode === 'dark' ? 'bg-[#2e302f] border-white/20' :
          'bg-[#f3f3f3] border-[#e1bfb5]/50'
        }`}>
          <button
            onClick={() => setTab('signin')}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              tab === 'signin'
                ? themeMode === 'dark' ? 'bg-[#383a39] text-[#f5f5f5] shadow-sm' : 'bg-white text-[#ab3500] shadow-sm'
                : themeMode === 'warm' ? 'text-[#3d2b1f] hover:text-[#2a1f16]' :
                  themeMode === 'dark' ? 'text-[#e5e5e5] hover:text-[#f5f5f5]' :
                  'text-[#1a1c1c] hover:text-[#0a0c0c]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              tab === 'signup'
                ? themeMode === 'dark' ? 'bg-[#383a39] text-[#f5f5f5] shadow-sm' : 'bg-white text-[#ab3500] shadow-sm'
                : themeMode === 'warm' ? 'text-[#3d2b1f] hover:text-[#2a1f16]' :
                  themeMode === 'dark' ? 'text-[#e5e5e5] hover:text-[#f5f5f5]' :
                  'text-[#1a1c1c] hover:text-[#0a0c0c]'
            }`}
          >
            Register
          </button>
        </div>

        {/* 1. SIGN IN FLOW */}
        {tab === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-3.5">
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

            <div className="space-y-1">
              <label className={`font-heading font-bold text-xs ${
                themeMode === 'warm' ? 'text-[#3d2b1f]' :
                themeMode === 'dark' ? 'text-[#f5f5f5]' :
                'text-[#1a1c1c]'
              }`}>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs font-medium"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className={`flex items-center gap-2 cursor-pointer ${
                themeMode === 'warm' ? 'text-[#3d2b1f]' :
                themeMode === 'dark' ? 'text-[#e5e5e5]' :
                'text-[#1a1c1c]'
              }`}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#ab3500] rounded"
                />
                <span>Remember this device</span>
              </label>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className={`font-bold hover:underline cursor-pointer ${
                  themeMode === 'warm' ? 'text-[#ab3500]' :
                  themeMode === 'dark' ? 'text-[#ff6b35]' :
                  'text-[#ab3500]'
                }`}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#ab3500] hover:bg-[#8a2a00] text-white font-heading font-bold text-xs shadow-lg shadow-[#ab3500]/25 transition-all mt-2 cursor-pointer hover:scale-[1.01]"
            >
              Sign In to Account
            </button>
          </form>
        )}

        {/* 2. REGISTER / SIGN UP FLOW */}
        {tab === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-3.5">
            <div className="space-y-1">
              <label className={`font-heading font-bold text-xs ${
                themeMode === 'warm' ? 'text-[#3d2b1f]' :
                themeMode === 'dark' ? 'text-[#f5f5f5]' :
                'text-[#1a1c1c]'
              }`}>Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Julian Rossi"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className={`font-heading font-bold text-xs ${
                themeMode === 'warm' ? 'text-[#3d2b1f]' :
                themeMode === 'dark' ? 'text-[#f5f5f5]' :
                'text-[#1a1c1c]'
              }`}>Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className={`font-heading font-bold text-xs ${
                themeMode === 'warm' ? 'text-[#3d2b1f]' :
                themeMode === 'dark' ? 'text-[#f5f5f5]' :
                'text-[#1a1c1c]'
              }`}>Password *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
              />
            </div>

            <div className={`text-[11px] leading-tight ${
              themeMode === 'warm' ? 'text-[#3d2b1f]' :
              themeMode === 'dark' ? 'text-[#e5e5e5]' :
              'text-[#1a1c1c]'
            }`}>
              By creating an account, you agree to Umunthuhub-Foods' <span className="text-[#ab3500] font-semibold">Terms of Service</span> and <span className="text-[#ab3500] font-semibold">Privacy Policy</span>.
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#ab3500] hover:bg-[#8a2a00] text-white font-heading font-bold text-xs shadow-lg shadow-[#ab3500]/25 transition-all mt-2 cursor-pointer"
            >
              Create Account & Unlock Perks
            </button>
          </form>
        )}

      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onBackToSignIn={() => setShowForgotPassword(false)}
      />
    </div>
  );
};
