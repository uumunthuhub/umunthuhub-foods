'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, setCustomerTab, showToast } = useApp();
  
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  
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
      <div className="relative w-full max-w-md glass-panel rounded-3xl overflow-hidden shadow-2xl bg-white/95 border border-[#e1bfb5] p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f3f3f3] hover:bg-[#e8e8e8] flex items-center justify-center text-[#594139] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-1.5 mb-5">
          <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#e1bfb5] mx-auto shadow-md">
            <img
              src="/umunthuhub-logo.png"
              alt="Umunthuhub-Foods"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-heading font-extrabold text-xl text-[#1a1c1c]">
            {tab === 'signin' && 'Welcome Back'}
            {tab === 'signup' && 'Create Umunthuhub-Foods Account'}
          </h3>
          <p className="text-xs text-[#594139]">
            {tab === 'signin' && 'Access multi-tenant kitchens, live orders & loyalty rewards'}
            {tab === 'signup' && 'Join the culinary ecosystem as a foodie, merchant or rider'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-[#f3f3f3] rounded-2xl border border-[#e1bfb5]/50 mb-5">
          <button
            onClick={() => setTab('signin')}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              tab === 'signin' ? 'bg-white text-[#ab3500] shadow-sm' : 'text-[#594139] hover:text-[#1a1c1c]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              tab === 'signup' ? 'bg-white text-[#ab3500] shadow-sm' : 'text-[#594139] hover:text-[#1a1c1c]'
            }`}
          >
            Register
          </button>
        </div>

        {/* 1. SIGN IN FLOW */}
        {tab === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-3.5">
            <div className="space-y-1">
              <label className="font-heading font-bold text-xs text-[#1a1c1c]">Email Address</label>
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
              <label className="font-heading font-bold text-xs text-[#1a1c1c]">Password</label>
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
              <label className="flex items-center gap-2 cursor-pointer text-[#594139]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#ab3500] rounded"
                />
                <span>Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl glass-button-primary font-heading font-bold text-xs shadow-lg shadow-[#ab3500]/25 transition-all mt-2 cursor-pointer hover:scale-[1.01]"
            >
              Sign In to Account
            </button>
          </form>
        )}

        {/* 2. REGISTER / SIGN UP FLOW */}
        {tab === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-3.5">
            <div className="space-y-1">
              <label className="font-heading font-bold text-xs text-[#1a1c1c]">Full Name *</label>
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
              <label className="font-heading font-bold text-xs text-[#1a1c1c]">Email Address *</label>
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
              <label className="font-heading font-bold text-xs text-[#1a1c1c]">Password *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
              />
            </div>

            <div className="text-[11px] text-[#594139] leading-tight">
              By creating an account, you agree to Umunthuhub-Foods' <span className="text-[#ab3500] font-semibold">Terms of Service</span> and <span className="text-[#ab3500] font-semibold">Privacy Policy</span>.
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl glass-button-primary font-heading font-bold text-xs shadow-lg shadow-[#ab3500]/25 transition-all mt-2 cursor-pointer"
            >
              Create Account & Unlock Perks
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
