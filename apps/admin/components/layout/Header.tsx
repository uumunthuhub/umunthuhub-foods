'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TopSearchBar } from './TopSearchBar';
import { Menu, X, Shield, Store, Bike, Building2 } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    persona,
    setPersona,
    vendorTab,
    setVendorTab,
    adminTab,
    setAdminTab,
    riderTab,
    setRiderTab,
    corporateTab,
    setCorporateTab,
    currentTenant,
    currentTenantId,
    setCurrentTenantId,
    tenants,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    showToast,
    themeMode
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Get active breadcrumb / section title for back-office
  const getBackOfficeTitle = () => {
    if (persona === 'admin') {
      switch (adminTab) {
        case 'overview': return 'Ecosystem Analytics';
        case 'venues': return 'Store & Multi-Venue Management';
        case 'team': return 'Team Roster & Access Control';
        case 'billing': return 'SaaS Plan & Commission Billing';
        case 'support': return 'Help Desk & Live Inquiries';
        case 'store_wizard': return 'Provision New Store Wizard';
        default: return 'Platform Admin HQ';
      }
    }
    if (persona === 'vendor') {
      switch (vendorTab) {
        case 'dashboard': return `${currentTenant.name} • Overview`;
        case 'kds': return `${currentTenant.name} • Kitchen Display (KDS)`;
        case 'menu': return `${currentTenant.name} • Menu & Catalog`;
        case 'promotions': return `${currentTenant.name} • Promotions`;
        case 'onboarding': return `${currentTenant.name} • Store Profile`;
        case 'setup_wizard': return 'Launch New Restaurant';
        default: return 'Vendor Kitchen Console';
      }
    }
    if (persona === 'rider') {
      switch (riderTab) {
        case 'radar': return 'Courier Dispatch • Radar';
        case 'active_job': return 'Active Delivery Trip';
        case 'earnings': return 'Earnings & Instant Cashout';
        case 'rewards': return 'Umunthuhub Pro Tier & Badges';
        case 'profile': return 'Vehicle & Profile';
        default: return 'Rider Logistics';
      }
    }
    if (persona === 'corporate') {
      switch (corporateTab) {
        case 'home': return 'Corporate Food Program';
        case 'catalog': return 'Corporate Dining • Executive Menus';
        case 'team_orders': return 'Group Orders & Allocations';
        case 'subscriptions': return 'Daily Office Stipends';
        case 'invoices': return 'Corporate Invoicing';
        default: return 'Corporate Meal Accounts';
      }
    }
    return 'Admin Console';
  };

  const personaColor = {
    admin: '#594139',
    vendor: '#24619d',
    rider: '#006c4f',
    corporate: '#8d7168',
    customer: '#ab3500',
  }[persona] ?? '#ab3500';

  const personaLabel = {
    admin: 'Platform Admin',
    vendor: 'Kitchen Console',
    rider: 'Courier Dispatch',
    corporate: 'Corporate B2B',
    customer: 'Customer',
  }[persona] ?? 'Admin';

  return (
    <header className={`w-full backdrop-blur-2xl border shadow-2xl rounded-2xl transition-all overflow-hidden ${
      themeMode === 'dark'
        ? 'bg-[#242625]/90 border-[#3a3a3a]/50 shadow-black/30'
        : 'bg-linear-to-br from-white/70 to-white/50 border-[#ab3500]/30 shadow-black/10'
    }`}>

        {/* ── Top Bar ── */}
        <div className="px-3 sm:px-5 lg:px-6 py-2.5">
          <div className="flex items-center gap-2 sm:gap-3">

            {/* ── Sidebar hamburger toggle — mobile/tablet only ── */}
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className={`lg:hidden shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-95 ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] hover:bg-[#4a4a4a] border-[#3a3a3a]/50 text-[#f5f5f5]'
                  : 'bg-[#f3f3f3] hover:bg-[#ede0dc] border-[#e1bfb5]/50 text-[#594139]'
              }`}
              aria-label="Open navigation menu"
              aria-expanded={isMobileSidebarOpen}
            >
              {isMobileSidebarOpen ? <X className="w-[22px] h-[22px]" /> : <Menu className="w-[22px] h-[22px]" />}
            </button>

            {/* Search Bar — always visible, fills available space */}
            <div className="flex-1 min-w-0">
              <TopSearchBar />
            </div>

            {/* Quick Actions — Workspace Switcher */}
            <div className="hidden md:flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setPersona('admin')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-semibold transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                  persona === 'admin'
                    ? themeMode === 'dark' ? 'bg-[#594139]/80 text-white shadow-md font-bold' : 'bg-[#594139] text-white shadow-md font-bold'
                    : themeMode === 'dark'
                      ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                      : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                }`}
                title="Platform Admin"
              >
                <Shield className="w-4 h-4 shrink-0" />
                <span className="hidden lg:inline">Admin</span>
              </button>
              <button
                onClick={() => setPersona('vendor')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-semibold transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                  persona === 'vendor'
                    ? themeMode === 'dark' ? 'bg-[#24619d]/80 text-white shadow-md font-bold' : 'bg-[#24619d] text-white shadow-md font-bold'
                    : themeMode === 'dark'
                      ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                      : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                }`}
                title="Kitchen (KDS)"
              >
                <Store className="w-4 h-4 shrink-0" />
                <span className="hidden lg:inline">Kitchen</span>
              </button>
              <button
                onClick={() => setPersona('rider')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-semibold transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                  persona === 'rider'
                    ? themeMode === 'dark' ? 'bg-[#006c4f]/80 text-white shadow-md font-bold' : 'bg-[#006c4f] text-white shadow-md font-bold'
                    : themeMode === 'dark'
                      ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                      : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                }`}
                title="Courier Dispatch"
              >
                <Bike className="w-4 h-4 shrink-0" />
                <span className="hidden lg:inline">Courier</span>
              </button>
              <button
                onClick={() => setPersona('corporate')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-semibold transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                  persona === 'corporate'
                    ? themeMode === 'dark' ? 'bg-[#8d7168]/80 text-white shadow-md font-bold' : 'bg-[#8d7168] text-white shadow-md font-bold'
                    : themeMode === 'dark'
                      ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                      : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                }`}
                title="Corporate B2B"
              >
                <Building2 className="w-4 h-4 shrink-0" />
                <span className="hidden lg:inline">Corporate</span>
              </button>
            </div>

            {/* Venue Selector — desktop only */}
            <div className={`hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-xl border shrink-0 ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a]/50'
                : 'bg-[#f9f9f9] border-[#e1bfb5]/50'
            }`}>
              <img
                src={currentTenant.logo}
                alt={currentTenant.name}
                className={`w-6 h-6 rounded-lg object-cover border shrink-0 ${
                  themeMode === 'dark' ? 'border-[#3a3a3a]/60' : 'border-[#e1bfb5]/60'
                }`}
              />
              <div className="min-w-0 hidden lg:block">
                <p className={`font-heading font-bold text-[10px] truncate max-w-20 ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>{currentTenant.name}</p>
              </div>
              <select
                value={currentTenantId}
                onChange={(e) => {
                  setCurrentTenantId(e.target.value);
                  showToast('Store Switched', `Active context: ${tenants.find(t => t.id === e.target.value)?.name}`, 'info');
                }}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border shadow-sm hover:shadow-md hover:border-[#ab3500]/50 transition-all cursor-pointer appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-[#ab3500]/20 focus:border-[#ab3500] ${
                  themeMode === 'dark'
                    ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                    : 'bg-white border-[#e1bfb5] text-[#1a1c1c]'
                }`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='${themeMode === 'dark' ? '%23c4c4c4' : '%23594139'}'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 8px center',
                  backgroundSize: '14px'
                }}
              >
                {tenants.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
 

          </div>
        </div>
      </header>
  );
};
