'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setPersona, setCustomerTab, showToast, themeMode } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    showToast('Subscribed to Epicurean VIP', `Weekly curated chef tastings and secret deals will be sent to ${email}`, 'success');
    setEmail('');
  };

  return (
    <footer className={`mt-auto border-t ${
      themeMode === 'warm' ? 'bg-linear-to-b from-[#fffbf7] to-[#f5ede4] border-[#d4c4b8]/30' :
      themeMode === 'dark' ? 'bg-linear-to-b from-[#242625] to-[#1a1c1c] border-white/10' :
      'bg-linear-to-b from-white to-[#faf9f8] border-[#e1bfb5]/30'
    }`}>
      {/* Newsletter Strip - Minimal */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className={`font-heading font-bold text-sm mb-1 ${
              themeMode === 'warm' ? 'text-[#3d2b1f]' :
              themeMode === 'dark' ? 'text-[#f5f5f5]' :
              'text-[#1a1c1c]'
            }`}>
              Get exclusive culinary perks
            </h3>
            <p className={`text-xs ${
              themeMode === 'warm' ? 'text-[#6b5a4a]' :
              themeMode === 'dark' ? 'text-[#c4c4c4]' :
              'text-[#8d7168]'
            }`}>
              Secret menu drops & weekly chef tastings
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`flex-1 sm:w-64 px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#ab3500]/50 transition-colors ${
                themeMode === 'warm' ? 'border-[#d4c4b8]/50 bg-[#fffbf7] text-[#3d2b1f] placeholder:text-[#6b5a4a]' :
                themeMode === 'dark' ? 'border-white/20 bg-[#242625] text-[#f5f5f5] placeholder:text-[#c4c4c4]' :
                'border-[#e1bfb5]/50 bg-white text-[#1a1c1c] placeholder:text-[#8d7168]'
              }`}
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#ab3500] text-white text-xs font-semibold hover:bg-[#8a2a00] transition-colors cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/umunthuhub-logo.png"
                alt="Umunthuhub-Foods"
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className={`font-heading font-bold text-base ${
                themeMode === 'warm' ? 'text-[#3d2b1f]' :
                themeMode === 'dark' ? 'text-[#f5f5f5]' :
                'text-[#1a1c1c]'
              }`}>
                Umunthuhub<span className="text-[#ab3500]">-Foods</span>
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${
              themeMode === 'warm' ? 'text-[#6b5a4a]' :
              themeMode === 'dark' ? 'text-[#c4c4c4]' :
              'text-[#8d7168]'
            }`}>
              Artisanal multi-kitchen ecosystem for food lovers.
            </p>
          </div>

          {/* Explore Column */}
          <div className="space-y-3">
            <h4 className={`font-semibold text-xs uppercase tracking-wider ${
              themeMode === 'warm' ? 'text-[#3d2b1f]' :
              themeMode === 'dark' ? 'text-[#f5f5f5]' :
              'text-[#1a1c1c]'
            }`}>
              Explore
            </h4>
            <ul className={`space-y-2 text-xs ${
              themeMode === 'warm' ? 'text-[#6b5a4a]' :
              themeMode === 'dark' ? 'text-[#c4c4c4]' :
              'text-[#8d7168]'
            }`}>
              <li>
                <button
                  onClick={() => {
                    setPersona('customer');
                    setCustomerTab('home');
                  }}
                  className="hover:text-[#ab3500] transition-colors text-left cursor-pointer"
                >
                  Restaurants
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPersona('customer');
                    setCustomerTab('rewards');
                  }}
                  className="hover:text-[#ab3500] transition-colors text-left cursor-pointer"
                >
                  Rewards
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPersona('customer');
                    setCustomerTab('tracking');
                  }}
                  className="hover:text-[#ab3500] transition-colors text-left cursor-pointer"
                >
                  Track Order
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3">
            <h4 className={`font-semibold text-xs uppercase tracking-wider ${
              themeMode === 'warm' ? 'text-[#3d2b1f]' :
              themeMode === 'dark' ? 'text-[#f5f5f5]' :
              'text-[#1a1c1c]'
            }`}>
              Company
            </h4>
            <ul className={`space-y-2 text-xs ${
              themeMode === 'warm' ? 'text-[#6b5a4a]' :
              themeMode === 'dark' ? 'text-[#c4c4c4]' :
              'text-[#8d7168]'
            }`}>
              <li>
                <button
                  onClick={() => showToast('About Us', 'Learn more about our mission', 'info')}
                  className="hover:text-[#ab3500] transition-colors text-left cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Careers', 'Join our team', 'info')}
                  className="hover:text-[#ab3500] transition-colors text-left cursor-pointer"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Contact', 'Get in touch', 'info')}
                  className="hover:text-[#ab3500] transition-colors text-left cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>


        </div>

        {/* Bottom Legal Strip */}
        <div className={`mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          themeMode === 'warm' ? 'border-[#d4c4b8]/30 text-[#6b5a4a]' :
          themeMode === 'dark' ? 'border-white/10 text-[#c4c4c4]' :
          'border-[#e1bfb5]/30 text-[#8d7168]'
        }`}>
          <span>© 2026 Umunthuhub-Foods. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => showToast('Terms', 'Terms of Service', 'info')}
              className={`transition-colors cursor-pointer ${
                themeMode === 'warm' ? 'hover:text-[#3d2b1f]' :
                themeMode === 'dark' ? 'hover:text-[#f5f5f5]' :
                'hover:text-[#1a1c1c]'
              }`}
            >
              Terms
            </button>
            <button
              onClick={() => showToast('Privacy', 'Privacy Policy', 'info')}
              className={`transition-colors cursor-pointer ${
                themeMode === 'warm' ? 'hover:text-[#3d2b1f]' :
                themeMode === 'dark' ? 'hover:text-[#f5f5f5]' :
                'hover:text-[#1a1c1c]'
              }`}
            >
              Privacy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
