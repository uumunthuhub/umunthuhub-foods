'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setPersona, setCustomerTab, showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    showToast('Subscribed to Epicurean VIP', `Weekly curated chef tastings and secret deals will be sent to ${email}`, 'success');
    setEmail('');
  };

  return (
    <footer className="mt-auto bg-gradient-to-b from-white to-[#faf9f8] border-t border-[#e1bfb5]/30">
      {/* Newsletter Strip - Minimal */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="font-heading font-bold text-sm text-[#1a1c1c] mb-1">
              Get exclusive culinary perks
            </h3>
            <p className="text-xs text-[#8d7168]">
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
              className="flex-1 sm:w-64 px-4 py-2.5 rounded-xl border border-[#e1bfb5]/50 bg-white text-xs text-[#1a1c1c] placeholder:text-[#8d7168] focus:outline-none focus:border-[#ab3500]/50 transition-colors"
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
              <span className="font-heading font-bold text-base text-[#1a1c1c]">
                Umunthuhub<span className="text-[#ab3500]">-Foods</span>
              </span>
            </div>
            <p className="text-xs text-[#8d7168] leading-relaxed">
              Artisanal multi-kitchen ecosystem for food lovers.
            </p>
          </div>

          {/* Explore Column */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-[#1a1c1c] uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#8d7168]">
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
            <h4 className="font-semibold text-xs text-[#1a1c1c] uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-[#8d7168]">
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
        <div className="mt-10 pt-6 border-t border-[#e1bfb5]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8d7168]">
          <span>© 2026 Umunthuhub-Foods. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => showToast('Terms', 'Terms of Service', 'info')}
              className="hover:text-[#1a1c1c] transition-colors cursor-pointer"
            >
              Terms
            </button>
            <button
              onClick={() => showToast('Privacy', 'Privacy Policy', 'info')}
              className="hover:text-[#1a1c1c] transition-colors cursor-pointer"
            >
              Privacy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
