'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Lock, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setPersona, setVendorTab, setRiderTab, setAdminTab, setCorporateTab, showToast, themeMode } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    showToast('Subscribed to Epicurean VIP', `Weekly curated chef tastings and secret deals will be sent to ${email}`, 'success');
    setEmail('');
  };

  return (
    <footer className={`mt-auto border-t transition-colors ${
      themeMode === 'dark'
        ? 'border-[#3a3a3a]/60 bg-[#1a1c1c]/70'
        : 'border-[#e1bfb5]/60 bg-white/70'
    } backdrop-blur-xl`}>
      {/* Top Banner / Newsletter Strip */}
      <div className={`border-b ${
        themeMode === 'dark'
          ? 'border-[#3a3a3a]/40 bg-linear-to-r from-[#3a3a3a]/20 via-[#4a4a4a]/20 to-[#383a39]/20'
          : 'border-[#e1bfb5]/40 bg-linear-to-r from-[#ffdad6]/20 via-[#ffeed9]/20 to-[#e2f7f0]/20'
      }`}>
        <div className="max-w-384 mx-auto px-2 sm:px-4 lg:px-6 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#ab3500] text-white">
                EPICUREAN CLUB
              </span>
              <span className="text-xs font-bold text-[#006c4f] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ae81] animate-pulse" />
                $10 Off Your First Order
              </span>
            </div>
            <h3 className={`font-heading font-extrabold text-lg sm:text-xl ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              Join the Umunthuhub-Foods Culinary Collective
            </h3>
            <p className={`text-xs max-w-md ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
            }`}>
              Receive secret menu drops, chef pop-ups, multi-tenant loyalty boosts, and zero delivery fee weekends.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto items-center gap-2 max-w-md">
            <div className="relative flex-1 md:w-72">
              <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 ${
                themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
              }`} />
              <input
                type="email"
                required
                placeholder="Enter your work or personal email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-2xl text-xs font-medium ${
                  themeMode === 'dark'
                    ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                    : 'glass-input bg-white/90'
                }`}
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl glass-button-primary font-heading font-bold text-xs shadow-md shadow-[#ab3500]/20 whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Get Perks
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-384 mx-auto px-2 sm:px-4 lg:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/umunthuhub-logo.png"
                alt="Umunthuhub-Foods"
                className="w-10 h-10 rounded-2xl object-cover border border-[#e1bfb5] shadow-md"
              />
              <div className="flex flex-col">
                <span className={`font-heading font-extrabold text-lg tracking-tight ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>
                  Umunthuhub<span className="text-[#ab3500]">-Foods</span>
                </span>
                <span className={`text-[10px] font-bold tracking-widest uppercase -mt-1 ${
                  themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                }`}>
                  Multi-Tenant SaaS
                </span>
              </div>
            </div>

            <p className={`text-xs leading-relaxed max-w-sm ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
            }`}>
              The next-generation food ordering, ghost kitchen automation, and multi-tenant delivery logistics ecosystem. Empowering artisanal culinary brands, independent fleets, and enterprise workplaces.
            </p>

            {/* Platform Status Indicator */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs shadow-xs ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a]'
                : 'bg-white border-[#e1bfb5]/60'
            }`}>
              <span className="w-2 h-2 rounded-full bg-[#00ae81] animate-ping" />
              <span className={`font-bold ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
              }`}>All Services Operational</span>
              <span className={`text-[10px] font-mono font-medium ${
                themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
              }`}>99.98% SLA</span>
            </div>

            {/* Social & Contact Badges */}
            <div className={`flex items-center gap-2 pt-1 ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
            }`}>
              {['support_agent', 'rss_feed', 'share', 'language'].map((icon, idx) => (
                <button
                  key={idx}
                  onClick={() => showToast('Umunthuhub Ecosystem', 'Opening channel...', 'info')}
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#7a7a7a] hover:text-[#006c4f] hover:bg-[#4a4a4a]'
                      : 'bg-white border-[#e1bfb5]/60 text-[#594139] hover:text-[#006c4f] hover:bg-[#f3f3f3]'
                  }`}
                  title="Channel link"
                >
                  <Mail className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Column 1: Platform Information */}
          <div className="space-y-3">
            <h4 className={`font-heading font-extrabold text-xs uppercase tracking-wider ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              Platform
            </h4>
            <ul className={`space-y-2 text-xs ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
            }`}>
              <li>
                <button
                  onClick={() => showToast('Platform Status', 'All systems operational - 99.98% SLA', 'info')}
                  className={`transition-colors text-left cursor-pointer ${
                    themeMode === 'dark' ? 'hover:text-[#ff6b35]' : 'hover:text-[#ab3500]'
                  }`}
                >
                  System Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('API Documentation', 'Developer portal and API endpoints', 'info')}
                  className={`transition-colors text-left cursor-pointer ${
                    themeMode === 'dark' ? 'hover:text-[#ff6b35]' : 'hover:text-[#ab3500]'
                  }`}
                >
                  API Documentation
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Partner Program', 'Join our restaurant partner network', 'info')}
                  className={`transition-colors text-left cursor-pointer ${
                    themeMode === 'dark' ? 'hover:text-[#ff6b35]' : 'hover:text-[#ab3500]'
                  }`}
                >
                  Partner Program
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Enterprise Solutions', 'B2B corporate meal solutions', 'info')}
                  className={`transition-colors text-left cursor-pointer ${
                    themeMode === 'dark' ? 'hover:text-[#ff6b35]' : 'hover:text-[#ab3500]'
                  }`}
                >
                  Enterprise Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Sustainability', 'Zero-waste packaging and carbon-neutral deliveries', 'info')}
                  className={`transition-colors text-left cursor-pointer ${
                    themeMode === 'dark' ? 'hover:text-[#ff6b35]' : 'hover:text-[#ab3500]'
                  }`}
                >
                  Sustainability
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: For Restaurant Partners */}
          <div className="space-y-3">
            <h4 className={`font-heading font-extrabold text-xs uppercase tracking-wider ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              For Restaurants
            </h4>
            <ul className={`space-y-2 text-xs ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
            }`}>
              <li>
                <button
                  onClick={() => {
                    setPersona('vendor');
                    setVendorTab('dashboard');
                  }}
                  className={`transition-colors text-left cursor-pointer ${
                    themeMode === 'dark' ? 'hover:text-[#ff6b35]' : 'hover:text-[#ab3500]'
                  }`}
                >
                  Merchant Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPersona('vendor');
                    setVendorTab('kds');
                  }}
                  className="hover:text-[#ab3500] transition-colors text-left cursor-pointer flex items-center gap-1"
                >
                  <span>Kitchen Display (KDS)</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-[#24619d]/15 text-[#24619d]">Live</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPersona('vendor');
                    setVendorTab('menu');
                  }}
                  className={`transition-colors text-left cursor-pointer ${
                    themeMode === 'dark' ? 'hover:text-[#ff6b35]' : 'hover:text-[#ab3500]'
                  }`}
                >
                  86’d Stock & Menu Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPersona('vendor');
                    setVendorTab('promotions');
                  }}
                  className={`transition-colors text-left cursor-pointer ${
                    themeMode === 'dark' ? 'hover:text-[#ff6b35]' : 'hover:text-[#ab3500]'
                  }`}
                >
                  Growth & Promo Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPersona('vendor');
                    setVendorTab('onboarding');
                  }}
                  className={`transition-colors text-left cursor-pointer ${
                    themeMode === 'dark' ? 'hover:text-[#ff6b35]' : 'hover:text-[#ab3500]'
                  }`}
                >
                  Store KYC & Health Certs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Logistics & Governance */}
          <div className="space-y-3">
            <h4 className={`font-heading font-extrabold text-xs uppercase tracking-wider ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              Logistics & Platform
            </h4>
            <ul className={`space-y-2 text-xs ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
            }`}>
              <li>
                <button
                  onClick={() => {
                    setPersona('rider');
                    setRiderTab('radar');
                  }}
                  className={`transition-colors text-left cursor-pointer ${
                    themeMode === 'dark' ? 'hover:text-[#ff6b35]' : 'hover:text-[#ab3500]'
                  }`}
                >
                  Rider Dispatch Radar
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPersona('rider');
                    setRiderTab('active_job');
                  }}
                  className={`transition-colors text-left cursor-pointer ${
                    themeMode === 'dark' ? 'hover:text-[#ff6b35]' : 'hover:text-[#ab3500]'
                  }`}
                >
                  Turn-by-Turn GPS HUD
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPersona('rider');
                    setRiderTab('earnings');
                  }}
                  className={`transition-colors text-left cursor-pointer ${
                    themeMode === 'dark' ? 'hover:text-[#ff6b35]' : 'hover:text-[#ab3500]'
                  }`}
                >
                  Instant Driver Cashout
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPersona('admin');
                    setAdminTab('overview');
                  }}
                  className={`transition-colors text-left cursor-pointer ${
                    themeMode === 'dark' ? 'hover:text-[#ff6b35]' : 'hover:text-[#ab3500]'
                  }`}
                >
                  Platform Executive Admin
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPersona('admin');
                    setAdminTab('payouts');
                  }}
                  className={`transition-colors text-left cursor-pointer ${
                    themeMode === 'dark' ? 'hover:text-[#ff6b35]' : 'hover:text-[#ab3500]'
                  }`}
                >
                  Escrow & ACH Settlement
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Certification Strip */}
        <div className={`mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          themeMode === 'dark'
            ? 'border-[#3a3a3a]/50 text-[#7a7a7a]'
            : 'border-[#e1bfb5]/50 text-[#8d7168]'
        }`}>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <span>© 2026 Umunthuhub-Foods SaaS Inc. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <button
              onClick={() => showToast('Terms of Service', 'Umunthuhub-Foods Multi-Tenant Terms of Service v4.2', 'info')}
              className={`transition-colors cursor-pointer ${
                themeMode === 'dark' ? 'hover:text-[#f5f5f5]' : 'hover:text-[#1a1c1c]'
              }`}
            >
              Terms of Service
            </button>
            <button
              onClick={() => showToast('Privacy Policy', 'Umunthuhub-Foods GDPR & CCPA Data Compliance', 'info')}
              className={`transition-colors cursor-pointer ${
                themeMode === 'dark' ? 'hover:text-[#f5f5f5]' : 'hover:text-[#1a1c1c]'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => showToast('Merchant Agreement', 'Multi-tenant 12% standard commission schedule', 'info')}
              className={`transition-colors cursor-pointer ${
                themeMode === 'dark' ? 'hover:text-[#f5f5f5]' : 'hover:text-[#1a1c1c]'
              }`}
            >
              Merchant Agreement
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] text-[#006c4f] font-semibold">
              <Lock className="w-[14px] h-[14px]" />
              256-Bit SSL Encrypted
            </span>
            <span className="flex items-center gap-1 text-[11px] text-[#24619d] font-semibold">
              <Check className="w-[14px] h-[14px]" />
              PCI-DSS Tier 1
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
