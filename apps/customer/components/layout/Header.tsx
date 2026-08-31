'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerSearchBar } from './CustomerSearchBar';

export const Header: React.FC = () => {
  const {
    customerTab,
    setCustomerTab,
    cartItemsCount,
    cartSubtotal,
    setIsCartDrawerOpen,
    loyaltyPoints,
    setIsAuthModalOpen,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    orders,
    showToast,
    themeMode,
    setThemeMode,
    toggleThemeMode
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('742 Evergreen Terrace, Metropolis');
  const [addressInput, setAddressInput] = useState('742 Evergreen Terrace, Metropolis');

  const activeOrdersCount = orders.filter(
    o => o.status === 'incoming' || o.status === 'cooking' || o.status === 'ready' || o.status === 'picked_up'
  ).length;

  const activeOrder = orders.find(o => o.status !== 'delivered');

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressInput.trim()) return;
    setDeliveryAddress(addressInput.trim());
    setIsLocationModalOpen(false);
    showToast('Delivery Location Updated', `Delivering to ${addressInput.trim()}`, 'success');
  };

  const handleMobileNav = (tab: string) => {
    setCustomerTab(tab as any);
    setIsMobileSidebarOpen(false);
  };

  const mobileNavItems = [
    {
      id: 'home',
      label: 'Explore Restaurants',
      icon: 'restaurant',
      desc: 'Discover local kitchens & menus',
      badge: undefined as string | undefined,
    },
    {
      id: 'tracking',
      label: 'Order Tracking',
      icon: 'navigation',
      desc: activeOrder ? 'You have an active order' : 'Track your deliveries',
      badge: activeOrder && activeOrder.status !== 'delivered' ? 'Active' : undefined,
    },
    {
      id: 'rewards',
      label: 'Rewards Hub',
      icon: 'military_tech',
      desc: `${loyaltyPoints} loyalty points earned`,
      badge: `${loyaltyPoints} pts`,
    },
  ];

  return (
    <>
      {/* Backdrop — closes drawer on tap */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-[2px] lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <header className={`fixed top-0 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2.5rem)] max-w-7xl mt-3 sm:mt-4 backdrop-blur-2xl border shadow-2xl shadow-black/10 rounded-2xl transition-all ${
        themeMode === 'warm' ? 'bg-linear-to-br from-[#fffbf7]/80 to-[#f5ede4]/70 border-[#ab3500]/25' :
        themeMode === 'dark' ? 'bg-linear-to-br from-[#242625]/85 to-[#1a1c1c]/80 border-white/10' :
        'bg-linear-to-br from-white/70 to-white/50 border-[#ab3500]/30'
      }`}>

        {/* ── Top Bar ── */}
        <div className="mx-auto px-3 sm:px-5 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-2">

            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-2 min-w-0">

              {/* Hamburger — mobile/tablet only */}
              <button
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className={`lg:hidden shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                  themeMode === 'warm' ? 'bg-[#f5ede4] hover:bg-[#e9ddcf] border-[#d4c4b8]/50 text-[#3d2b1f]' :
                  themeMode === 'dark' ? 'bg-[#2e302f] hover:bg-[#383a39] border-white/20 text-[#f5f5f5]' :
                  'bg-[#f3f3f3] hover:bg-[#e8e8e8] border-[#e1bfb5]/50 text-[#1a1c1c]'
                }`}
                aria-label="Toggle navigation drawer"
                aria-expanded={isMobileSidebarOpen}
              >
                <span
                  className="material-symbols-outlined text-[20px] transition-transform duration-300"
                  style={{ transform: isMobileSidebarOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                >
                  {isMobileSidebarOpen ? 'close' : 'menu'}
                </span>
              </button>

              {/* Logo */}
              <button
                onClick={() => setCustomerTab('home')}
                className="flex items-center gap-2 group text-left cursor-pointer min-w-0"
              >
                <div className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden shadow-md border flex items-center justify-center transition-transform group-hover:scale-105 ${
                  themeMode === 'warm' ? 'border-[#d4c4b8]/60 bg-[#fffbf7]' :
                  themeMode === 'dark' ? 'border-white/20 bg-[#242625]' :
                  'border-[#e1bfb5]/60 bg-white'
                }`}>
                  <img src="/umunthuhub-logo.png" alt="Umunthuhub Logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`font-heading font-extrabold text-sm sm:text-base tracking-tight whitespace-nowrap ${
                      themeMode === 'warm' ? 'text-[#3d2b1f]' :
                      themeMode === 'dark' ? 'text-[#f5f5f5]' :
                      'text-[#1a1c1c]'
                    }`}>
                      <span className="hidden sm:inline">Umunthuhub</span>
                      <span className="text-[#ab3500]"><span className="sm:hidden">U</span>-Foods</span>
                    </span>
                    <span className="hidden md:inline-block px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-md border bg-[#ab3500]/15 text-[#ab3500] border-[#ab3500]/30 whitespace-nowrap">
                      FOOD HUB
                    </span>
                  </div>
                  <p className={`text-[10px] font-semibold leading-none hidden xl:block ${
                    themeMode === 'warm' ? 'text-[#6b5a4a]' :
                    themeMode === 'dark' ? 'text-[#c4c4c4]' :
                    'text-[#8d7168]'
                  }`}>
                    Artisanal Multi-Kitchen Ecosystem
                  </p>
                </div>
              </button>
            </div>

            {/* Center Nav — desktop only */}
            <div className="hidden lg:flex flex-1 items-center justify-center mx-2">
              <nav className="flex items-center gap-1">
                {/* Search */}
                <CustomerSearchBar />
                {[
                  { id: 'home', label: 'Explore', icon: 'restaurant' },
                  {
                    id: 'tracking',
                    label: 'Tracking',
                    icon: 'navigation',
                    badge: activeOrder && activeOrder.status !== 'delivered' ? 'Active' : undefined,
                  },
                  { id: 'rewards', label: 'Rewards', icon: 'military_tech', badge: `${loyaltyPoints} pts` },
                ].map(item => {
                  const isActive = customerTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCustomerTab(item.id as any)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#ab3500] text-white shadow-md shadow-[#ab3500]/25 font-bold'
                          : themeMode === 'warm' ? 'text-[#6b5a4a] hover:bg-[#f5ede4] hover:text-[#3d2b1f]' :
                          themeMode === 'dark' ? 'text-[#c4c4c4] hover:bg-[#2e302f] hover:text-[#f5f5f5]' :
                          'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold hidden xl:inline ${
                          isActive ? 'bg-white text-[#ab3500]' : 'bg-[#ff6b35]/20 text-[#ab3500]'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 shrink-0">

              {/* Cart */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl glass-button-primary text-xs font-bold cursor-pointer shadow-md shadow-[#ab3500]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                id="header-cart-button"
              >
                <span className="material-symbols-outlined text-[19px]">shopping_bag</span>
                <span className="hidden sm:inline">Tray</span>
                {cartItemsCount > 0 && (
                  <span className="flex items-center justify-center min-w-4.5 h-4.5 px-1 rounded-full bg-white text-[#ab3500] text-[10px] font-extrabold shadow-sm">
                    {cartItemsCount}
                  </span>
                )}
                {cartSubtotal > 0 && (
                  <span className="hidden lg:inline text-white/95 border-l border-white/30 pl-2 font-mono">
                    ${cartSubtotal.toFixed(2)}
                  </span>
                )}
              </button>

              {/* Theme toggle */}
              <button
                onClick={() => setIsThemeModalOpen(true)}
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                  themeMode === 'warm' ? 'bg-[#f5ede4] hover:bg-[#e9ddcf] border-[#d4c4b8]/50 text-[#3d2b1f]' :
                  themeMode === 'dark' ? 'bg-[#2e302f] hover:bg-[#383a39] border-white/20 text-[#f5f5f5]' :
                  'bg-[#f3f3f3] hover:bg-[#e8e8e8] border-[#e1bfb5]/50 text-[#1a1c1c]'
                }`}
                title="Choose theme"
                aria-label="Choose theme"
              >
                <span className="material-symbols-outlined text-[20px]">
                  palette
                </span>
              </button>

              {/* Avatar / user menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="relative flex items-center justify-center w-9 h-9 rounded-full ring-2 ring-[#ab3500]/30 hover:ring-[#ab3500]/60 transition-all duration-200 cursor-pointer active:scale-95 shadow-md"
                  aria-label="Open user menu"
                  aria-expanded={isUserMenuOpen}
                >
                  <img
                    src="/umunthuai.png"
                    alt="Grayson Comrade"
                    className="w-full h-full rounded-full object-cover"
                  />
                  {/* Online indicator */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00ae81] border-2 border-white" />
                </button>

                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                    <div className={`absolute right-0 mt-3 w-68 rounded-3xl backdrop-blur-2xl border shadow-2xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 ${
                      themeMode === 'warm' ? 'bg-[#fffbf7]/95 border-[#d4c4b8]/60' :
                      themeMode === 'dark' ? 'bg-[#242625]/95 border-white/20' :
                      'bg-white/95 border-[#e1bfb5]/60'
                    }`}>

                      {/* Profile header */}
                      <div className={`px-4 pt-4 pb-3 bg-linear-to-br from-[#ab3500]/5 to-transparent border-b ${
                        themeMode === 'warm' ? 'border-[#d4c4b8]/40' :
                        themeMode === 'dark' ? 'border-white/20' :
                        'border-[#e1bfb5]/40'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0">
                            <img
                              src="/umunthuai.png"
                              alt="Grayson Comrade"
                              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#ab3500]/30 shadow-md"
                            />
                            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#00ae81] border-2 border-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`text-sm font-bold truncate ${
                              themeMode === 'warm' ? 'text-[#3d2b1f]' :
                              themeMode === 'dark' ? 'text-[#f5f5f5]' :
                              'text-[#1a1c1c]'
                            }`}>Grayson Comrade</p>
                            <p className={`text-[10px] truncate ${
                              themeMode === 'warm' ? 'text-[#6b5a4a]' :
                              themeMode === 'dark' ? 'text-[#c4c4c4]' :
                              'text-[#8d7168]'
                            }`}>grayson.comrade@umunthuhub.com</p>
                            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-[9px] font-extrabold rounded-full bg-[#00ae81]/15 text-[#006c4f]">
                              <span className="material-symbols-outlined text-[11px]">military_tech</span>
                              VIP Epicurean Patron
                            </span>
                          </div>
                        </div>

                        {/* Loyalty points pill */}
                        <div className={`flex items-center justify-between mt-3 px-3 py-2 rounded-2xl border ${
                          themeMode === 'warm' ? 'bg-[#fffbf7] border-[#d4c4b8]/50' :
                          themeMode === 'dark' ? 'bg-[#242625] border-white/20' :
                          'bg-white border-[#e1bfb5]/50'
                        }`}>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-[#ab3500]">star</span>
                            <span className={`text-xs font-bold ${
                              themeMode === 'warm' ? 'text-[#3d2b1f]' :
                              themeMode === 'dark' ? 'text-[#f5f5f5]' :
                              'text-[#1a1c1c]'
                            }`}>{loyaltyPoints} pts</span>
                          </div>
                          <span className={`text-[10px] font-semibold ${
                            themeMode === 'warm' ? 'text-[#6b5a4a]' :
                            themeMode === 'dark' ? 'text-[#c4c4c4]' :
                            'text-[#8d7168]'
                          }`}>Loyalty balance</span>
                        </div>
                      </div>

                      {/* Nav items */}
                      <div className="p-2 space-y-0.5">
                        {[
                          { icon: 'receipt_long', label: 'My Orders', sub: 'View order history' },
                          { icon: 'military_tech', label: 'Rewards Hub', sub: `${loyaltyPoints} pts available` },
                          { icon: 'location_on', label: 'Saved Addresses', sub: 'Manage delivery spots' },
                          { icon: 'settings', label: 'Account Settings', sub: 'Preferences & security' },
                        ].map(item => (
                          <button
                            key={item.label}
                            onClick={() => setIsUserMenuOpen(false)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer group ${
                              themeMode === 'warm' ? 'hover:bg-[#f5ede4]' :
                              themeMode === 'dark' ? 'hover:bg-[#2e302f]' :
                              'hover:bg-[#f9f0ed]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[18px] text-[#ab3500] shrink-0">{item.icon}</span>
                            <div className="min-w-0">
                              <p className={`text-xs font-bold transition-colors truncate ${
                                themeMode === 'warm' ? 'text-[#3d2b1f] group-hover:text-[#ab3500]' :
                                themeMode === 'dark' ? 'text-[#f5f5f5] group-hover:text-[#ab3500]' :
                                'text-[#1a1c1c] group-hover:text-[#ab3500]'
                              }`}>{item.label}</p>
                              <p className={`text-[10px] truncate ${
                                themeMode === 'warm' ? 'text-[#6b5a4a]' :
                                themeMode === 'dark' ? 'text-[#c4c4c4]' :
                                'text-[#8d7168]'
                              }`}>{item.sub}</p>
                            </div>
                            <span className={`material-symbols-outlined text-[14px] ml-auto shrink-0 ${
                              themeMode === 'warm' ? 'text-[#a89080]' :
                              themeMode === 'dark' ? 'text-[#7a7a7a]' :
                              'text-[#c4a89f]'
                            }`}>chevron_right</span>
                          </button>
                        ))}
                      </div>

                      {/* Sign out */}
                      <div className={`px-2 pb-2 pt-1 border-t ${
                        themeMode === 'warm' ? 'border-[#d4c4b8]/40' :
                        themeMode === 'dark' ? 'border-white/20' :
                        'border-[#e1bfb5]/40'
                      }`}>
                        <button
                          onClick={() => { setIsUserMenuOpen(false); setIsAuthModalOpen(true); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">logout</span>
                          Sign Out / Switch Profile
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* ── Mobile / Tablet Slide-Down Drawer ── */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            isMobileSidebarOpen ? 'max-h-150 opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isMobileSidebarOpen}
        >
          <div className={`px-3 sm:px-5 pb-5 pt-2 border-t space-y-3 ${
            themeMode === 'warm' ? 'border-[#d4c4b8]/40' :
            themeMode === 'dark' ? 'border-white/20' :
            'border-[#e1bfb5]/40'
          }`}>

            {/* User profile card */}
            <div className={`flex items-center gap-3 px-3 py-3 rounded-2xl bg-linear-to-r from-[#ab3500]/8 to-[#ff6b35]/5 border ${
              themeMode === 'warm' ? 'border-[#d4c4b8]/30' :
              themeMode === 'dark' ? 'border-white/20' :
              'border-[#ab3500]/15'
            }`}>
              <img
                src="/umunthuai.png"
                alt="Grayson Comrade"
                className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-md shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold truncate ${
                  themeMode === 'warm' ? 'text-[#3d2b1f]' :
                  themeMode === 'dark' ? 'text-[#f5f5f5]' :
                  'text-[#1a1c1c]'
                }`}>Grayson Comrade</p>
                <p className={`text-[10px] truncate ${
                  themeMode === 'warm' ? 'text-[#6b5a4a]' :
                  themeMode === 'dark' ? 'text-[#c4c4c4]' :
                  'text-[#8d7168]'
                }`}>grayson.comrade@umunthuhub.com</p>
                <span className="inline-block mt-0.5 px-2 py-0.5 text-[9px] font-extrabold rounded-md bg-[#00ae81]/15 text-[#006c4f]">
                  VIP Epicurean Patron
                </span>
              </div>
              <div className="flex flex-col items-center shrink-0">
                <span className="text-base font-extrabold text-[#ab3500]">{loyaltyPoints}</span>
                <span className={`text-[9px] uppercase font-semibold -mt-0.5 ${
                  themeMode === 'warm' ? 'text-[#6b5a4a]' :
                  themeMode === 'dark' ? 'text-[#c4c4c4]' :
                  'text-[#8d7168]'
                }`}>pts</span>
              </div>
            </div>

            {/* Nav items */}
            <nav className="space-y-1">
              {mobileNavItems.map((item, idx) => {
                const isActive = customerTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMobileNav(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer group ${
                      isActive
                        ? 'bg-[#ab3500] text-white shadow-md shadow-[#ab3500]/30'
                        : themeMode === 'warm' ? 'hover:bg-[#f5ede4] text-[#3d2b1f]' :
                        themeMode === 'dark' ? 'hover:bg-[#2e302f] text-[#f5f5f5]' :
                        'hover:bg-[#f9f0ed] text-[#1a1c1c]'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-white/20' : 'bg-[#ab3500]/10 group-hover:bg-[#ab3500]/15'
                    }`}>
                      <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-white' : 'text-[#ab3500]'}`}>
                        {item.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold leading-tight ${
                        isActive ? 'text-white' :
                        themeMode === 'warm' ? 'text-[#3d2b1f]' :
                        themeMode === 'dark' ? 'text-[#f5f5f5]' :
                        'text-[#1a1c1c]'
                      }`}>
                        {item.label}
                      </p>
                      <p className={`text-[10px] leading-tight truncate ${
                        isActive ? 'text-white/75' :
                        themeMode === 'warm' ? 'text-[#6b5a4a]' :
                        themeMode === 'dark' ? 'text-[#c4c4c4]' :
                        'text-[#8d7168]'
                      }`}>
                        {item.desc}
                      </p>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold shrink-0 ${
                        isActive ? 'bg-white text-[#ab3500]' :
                        themeMode === 'warm' ? 'bg-[#ab3500]/15 text-[#ab3500]' :
                        themeMode === 'dark' ? 'bg-[#ab3500]/20 text-[#ff6b35]' :
                        'bg-[#ab3500]/15 text-[#ab3500]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    <span className={`material-symbols-outlined text-[16px] shrink-0 ${
                      isActive ? 'text-white/70' :
                      themeMode === 'warm' ? 'text-[#a89080]' :
                      themeMode === 'dark' ? 'text-[#7a7a7a]' :
                      'text-[#c4a89f]'
                    }`}>chevron_right</span>
                  </button>
                );
              })}
            </nav>

            {/* Quick actions grid */}
            <div className="grid grid-cols-3 gap-2">
              {/* Cart chip */}
              <button
                onClick={() => { setIsCartDrawerOpen(true); setIsMobileSidebarOpen(false); }}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-colors cursor-pointer ${
                  themeMode === 'warm' ? 'bg-[#f5ede4] hover:bg-[#e9ddcf] border-[#d4c4b8]/40' :
                  themeMode === 'dark' ? 'bg-[#2e302f] hover:bg-[#383a39] border-white/20' :
                  'bg-[#f3f3f3] hover:bg-[#f9f0ed] border-[#e1bfb5]/40'
                }`}
              >
                <div className="relative">
                  <span className="material-symbols-outlined text-[22px] text-[#ab3500]">shopping_bag</span>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#ab3500] text-white text-[9px] font-extrabold flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-semibold ${
                  themeMode === 'warm' ? 'text-[#6b5a4a]' :
                  themeMode === 'dark' ? 'text-[#c4c4c4]' :
                  'text-[#594139]'
                }`}>
                  {cartSubtotal > 0 ? `$${cartSubtotal.toFixed(2)}` : 'Tray'}
                </span>
              </button>

              {/* Delivery address */}
              <button
                onClick={() => { setIsLocationModalOpen(true); setIsMobileSidebarOpen(false); }}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-colors cursor-pointer ${
                  themeMode === 'warm' ? 'bg-[#f5ede4] hover:bg-[#e9ddcf] border-[#d4c4b8]/40' :
                  themeMode === 'dark' ? 'bg-[#2e302f] hover:bg-[#383a39] border-white/20' :
                  'bg-[#f3f3f3] hover:bg-[#f9f0ed] border-[#e1bfb5]/40'
                }`}
              >
                <span className="material-symbols-outlined text-[22px] text-[#ab3500]">location_on</span>
                <span className={`text-[10px] font-semibold ${
                  themeMode === 'warm' ? 'text-[#6b5a4a]' :
                  themeMode === 'dark' ? 'text-[#c4c4c4]' :
                  'text-[#594139]'
                }`}>Delivery</span>
              </button>

              {/* Theme toggle */}
              <button
                onClick={() => setIsThemeModalOpen(true)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-colors cursor-pointer ${
                  themeMode === 'warm' ? 'bg-[#f5ede4] hover:bg-[#e9ddcf] border-[#d4c4b8]/40' :
                  themeMode === 'dark' ? 'bg-[#2e302f] hover:bg-[#383a39] border-white/20' :
                  'bg-[#f3f3f3] hover:bg-[#f9f0ed] border-[#e1bfb5]/40'
                }`}
              >
                <span className={`material-symbols-outlined text-[22px] ${
                  themeMode === 'warm' ? 'text-[#6b5a4a]' :
                  themeMode === 'dark' ? 'text-[#c4c4c4]' :
                  'text-[#594139]'
                }`}>
                  palette
                </span>
                <span className={`text-[10px] font-semibold ${
                  themeMode === 'warm' ? 'text-[#6b5a4a]' :
                  themeMode === 'dark' ? 'text-[#c4c4c4]' :
                  'text-[#594139]'
                }`}>
                  Theme
                </span>
              </button>
            </div>

            {/* Sign out row */}
            <button
              onClick={() => { setIsAuthModalOpen(true); setIsMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                themeMode === 'dark'
                  ? 'border-[#3a3a3a] bg-[#242625] hover:bg-[#383a39] text-[#f5f5f5]'
                  : 'border-[#ffdad6] bg-[#fff5f3] hover:bg-[#ffdad6]/50 text-[#ba1a1a]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              Sign Out / Switch Profile
            </button>

          </div>
        </div>

      </header>

      {/* Location Change Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsLocationModalOpen(false)} />
          <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 shadow-2xl bg-white border border-[#e1bfb5] animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#e1bfb5]/40 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#ab3500]/10 flex items-center justify-center text-[#ab3500]">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                </div>
                <h3 className="font-heading font-extrabold text-sm text-[#1a1c1c]">Set Delivery Address</h3>
              </div>
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#f3f3f3] flex items-center justify-center text-[#594139]"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-heading font-bold text-[#1a1c1c]">Street Address & Unit</label>
                <input
                  type="text"
                  required
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  placeholder="e.g. 742 Evergreen Terrace, Metropolis"
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-[#8d7168] uppercase">Saved Delivery Spots:</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: '🏠 Home', addr: '742 Evergreen Terrace, Metropolis' },
                    { label: '🏢 Tech Hub Office', addr: '450 Innovation Blvd, Floor 4' },
                    { label: '☕ Central Studio', addr: '128 Artisan Way, Suite 2B' },
                    { label: '📍 Downtown Plaza', addr: '880 Gourmet Square, Metropolis' },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAddressInput(preset.addr)}
                      className="p-2 text-left rounded-xl bg-[#f9f9f9] hover:bg-[#f3f3f3] border border-[#e1bfb5]/40 text-[11px] text-[#1a1c1c] transition-colors cursor-pointer"
                    >
                      <p className="font-bold">{preset.label}</p>
                      <p className="text-[10px] text-[#8d7168] truncate">{preset.addr}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#e1bfb5]/40 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(false)}
                  className="w-1/3 py-2 rounded-xl bg-[#f3f3f3] font-bold text-[#594139]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl glass-button-primary font-bold shadow-md"
                >
                  Confirm Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Theme Selection Modal */}
      {isThemeModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsThemeModalOpen(false)} />
          <div className={`relative w-full max-w-md glass-panel rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 ${
            themeMode === 'warm' ? 'bg-[#fffbf7]/95 border-[#d4c4b8]' :
            themeMode === 'dark' ? 'bg-[#242625]/95 border-white/20' :
            'bg-white/95 border-[#e1bfb5]'
          }`}>
            <div className={`flex items-center justify-between pb-3 border-b mb-4 ${
              themeMode === 'warm' ? 'border-[#d4c4b8]/40' :
              themeMode === 'dark' ? 'border-white/20' :
              'border-[#e1bfb5]/40'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  themeMode === 'warm' ? 'bg-[#ab3500]/10 text-[#ab3500]' :
                  themeMode === 'dark' ? 'bg-[#ab3500]/20 text-[#ff6b35]' :
                  'bg-[#ab3500]/10 text-[#ab3500]'
                }`}>
                  <span className="material-symbols-outlined text-[18px]">palette</span>
                </div>
                <h3 className={`font-heading font-extrabold text-sm ${
                  themeMode === 'warm' ? 'text-[#3d2b1f]' :
                  themeMode === 'dark' ? 'text-[#f5f5f5]' :
                  'text-[#1a1c1c]'
                }`}>Choose Theme</h3>
              </div>
              <button
                onClick={() => setIsThemeModalOpen(false)}
                className={`w-7 h-7 rounded-full flex items-center justify-center ${
                  themeMode === 'warm' ? 'bg-[#f5ede4] text-[#6b5a4a]' :
                  themeMode === 'dark' ? 'bg-[#2e302f] text-[#c4c4c4]' :
                  'bg-[#f3f3f3] text-[#594139]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'light' as const,
                  name: 'Light',
                  description: 'Clean & modern default',
                  icon: 'wb_sunny',
                  preview: 'bg-white border-[#e1bfb5]'
                },
                {
                  id: 'warm' as const,
                  name: 'Warm Cream',
                  description: 'Cozy & elegant palette',
                  icon: 'dark_mode',
                  preview: 'bg-[#fffbf7] border-[#d4c4b8]'
                },
                {
                  id: 'dark' as const,
                  name: 'Dark',
                  description: 'Easy on the eyes',
                  icon: 'light_mode',
                  preview: 'bg-[#242625] border-white/20'
                }
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setThemeMode(theme.id);
                    setIsThemeModalOpen(false);
                    showToast(
                      `${theme.name} Theme Activated`,
                      `Switched to ${theme.description.toLowerCase()}.`,
                      'success'
                    );
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    themeMode === theme.id
                      ? 'border-[#ab3500] bg-[#ab3500]/5'
                      : 'border-transparent'
                  } ${
                    themeMode === 'warm' && theme.id !== 'warm' ? 'hover:bg-[#f5ede4]' :
                    themeMode === 'dark' && theme.id !== 'dark' ? 'hover:bg-[#2e302f]' :
                    'hover:bg-[#f9f9f9]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    theme.id === 'light' ? 'bg-white border-[#e1bfb5] text-[#1a1c1c]' :
                    theme.id === 'warm' ? 'bg-[#fffbf7] border-[#d4c4b8] text-[#3d2b1f]' :
                    'bg-[#242625] border-white/20 text-[#f5f5f5]'
                  }`}>
                    <span className="material-symbols-outlined text-[24px]">{theme.icon}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <div className={`font-heading font-bold text-sm ${
                      themeMode === 'warm' ? 'text-[#3d2b1f]' :
                      themeMode === 'dark' ? 'text-[#f5f5f5]' :
                      'text-[#1a1c1c]'
                    }`}>{theme.name}</div>
                    <div className={`text-[11px] ${
                      themeMode === 'warm' ? 'text-[#6b5a4a]' :
                      themeMode === 'dark' ? 'text-[#c4c4c4]' :
                      'text-[#8d7168]'
                    }`}>{theme.description}</div>
                  </div>
                  {themeMode === theme.id && (
                    <div className="w-6 h-6 rounded-full bg-[#ab3500] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] text-white">check</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
