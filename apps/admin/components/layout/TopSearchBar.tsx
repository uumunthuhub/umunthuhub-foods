'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, ChevronRight, ArrowRight, Store, Utensils, User } from 'lucide-react';
import { MenuItem, Tenant } from '@umunthuhub/shared-types';
import { ScrollableContainer } from '@umunthuhub/ui';

export const TopSearchBar: React.FC = () => {
  const {
    persona,
    setPersona,
    setVendorTab,
    setAdminTab,
    setRiderTab,
    setCorporateTab,
    tenants,
    menuItems,
    setSelectedRestaurantId,
    openItemModal,
    showToast,
    activeOrder,
    themeMode
  } = useApp();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'dishes' | 'venues' | 'dietary'>('all');
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut (Cmd+K / Ctrl+K) to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Search calculations
  const cleanQuery = query.trim().toLowerCase();

  // Matched Tenants
  const matchingTenants = tenants.filter(t => {
    if (!cleanQuery) return true;
    return (
      t.name.toLowerCase().includes(cleanQuery) ||
      t.cuisine.toLowerCase().includes(cleanQuery) ||
      t.city.toLowerCase().includes(cleanQuery) ||
      t.tags.some(tag => tag.toLowerCase().includes(cleanQuery))
    );
  });

  // Matched Menu Items — deduplicate by ID first to avoid React key collisions
  const uniqueMenuItems = Array.from(
    new Map(menuItems.map((m) => [m.id, m])).values()
  );
  const matchingDishes = uniqueMenuItems.filter(m => {
    if (selectedDiet === 'veg' && !m.isVeg) return false;
    if (selectedDiet === 'spicy' && !m.isSpicy) return false;
    if (selectedDiet === 'gf' && !m.isGlutenFree) return false;

    if (!cleanQuery) return true;
    return (
      m.name.toLowerCase().includes(cleanQuery) ||
      m.description.toLowerCase().includes(cleanQuery) ||
      m.category.toLowerCase().includes(cleanQuery)
    );
  });

  // Quick Action suggestions
  const quickActions = [
    {
      id: 'kds',
      title: 'Kitchen Display System (KDS)',
      subtitle: 'Live ticket line & prep manager for operators',
      icon: 'soup_kitchen',
      color: 'text-[#24619d] bg-[#24619d]/10',
      action: () => {
        setPersona('vendor');
        setVendorTab('kds');
        setIsOpen(false);
      }
    },
    {
      id: 'admin',
      title: 'Platform HQ Admin Console',
      subtitle: 'Store onboarding, GMV analytics & billing',
      icon: 'admin_panel_settings',
      color: 'text-[#594139] bg-[#594139]/10',
      action: () => {
        setPersona('admin');
        setAdminTab('overview');
        setIsOpen(false);
      }
    },
    {
      id: 'rider',
      title: 'Courier Dispatch Radar',
      subtitle: 'Driver fleet management and job assignment',
      icon: 'two_wheeler',
      color: 'text-[#006c4f] bg-[#006c4f]/10',
      action: () => {
        setPersona('rider');
        setRiderTab('radar');
        setIsOpen(false);
      }
    },
    {
      id: 'corporate',
      title: 'Corporate B2B Portal',
      subtitle: 'Enterprise meal solutions and team orders',
      icon: 'corporate_fare',
      color: 'text-[#8d7168] bg-[#8d7168]/10',
      action: () => {
        setPersona('corporate');
        setCorporateTab('home');
        setIsOpen(false);
      }
    }
  ].filter(action => {
    if (!cleanQuery) return true;
    return (
      action.title.toLowerCase().includes(cleanQuery) ||
      action.subtitle.toLowerCase().includes(cleanQuery)
    );
  });

  const handleSelectTenant = (tenant: Tenant) => {
    setSelectedRestaurantId(tenant.id);
    setPersona('vendor');
    setVendorTab('dashboard');
    setIsOpen(false);
    showToast('Kitchen Selected', `Opening ${tenant.name} dashboard`, 'info');
  };

  const handleSelectDish = (dish: MenuItem) => {
    openItemModal(dish);
    setIsOpen(false);
  };

  const quickTags = [
    { label: '🍕 Woodfired Pizza', search: 'Pizza' },
    { label: '🍣 Tokyo Sushi & Sashimi', search: 'Sushi' },
    { label: '🍔 Artisanal Smash Burgers', search: 'Burger' },
    { label: '🌮 Street Tacos & Birria', search: 'Tacos' },
    { label: '🍜 Tonkotsu Ramen & Bowls', search: 'Ramen' },
    { label: '🥗 Organic Farm-to-Table', search: 'Organic' },
    { label: '🥟 Dim Sum & Dumplings', search: 'Dim Sum' },
    { label: '🥩 Smoked Texas BBQ', search: 'BBQ' },
    { label: '🥐 French Bakery & Pastries', search: 'Bakery' },
    { label: '🌱 100% Plant-Based Vegan', diet: 'veg' },
    { label: '🌶️ Hot & Spicy Specialties', diet: 'spicy' },
    { label: '🍦 Gelato & Sweet Treats', search: 'Dessert' },
    { label: '⚡ Ultra-Fast 15-min Prep', search: 'Express' }
  ];

  return (
    <div ref={containerRef} className="relative w-full z-30">
      {/* Sleek Minimal Search Bar */}
      <div className={`relative backdrop-blur-xl rounded-2xl border shadow-sm transition-all focus-within:shadow-lg focus-within:border-[#ab3500] ${
        themeMode === 'dark'
          ? 'bg-[#383a39]/95 border-[#3a3a3a]'
          : 'bg-white/95 border-[#c9a896]'
      }`}>
        <div className="flex items-center gap-2 px-3 py-2">
          {/* Search Icon */}
          <Search className={`w-[18px] h-[18px] ${
            themeMode === 'dark' ? 'text-[#ff6b35]' : 'text-[#ab3500]'
          }`} />

          {/* Text Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={
              persona === 'customer'
                ? "Search restaurants, dishes, cuisines..."
                : "Search dishes, venues, orders, team..."
            }
            className={`flex-1 bg-transparent border-none outline-none text-xs font-medium placeholder:font-normal ${
              themeMode === 'dark'
                ? 'text-[#f5f5f5] placeholder:text-[#7a7a7a]'
                : 'text-[#1a1c1c] placeholder:text-[#8d7168]'
            }`}
          />

          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                themeMode === 'dark'
                  ? 'bg-[#4a4a4a] hover:bg-[#5a5a5a] text-[#c4c4c4]'
                  : 'bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#594139]'
              }`}
              title="Clear search"
            >
              <X className="w-[14px] h-[14px]" />
            </button>
          )}
        </div>
      </div>

      {/* Live Dropdown Results Modal / Popover */}
      {isOpen && (
        <div className={`absolute top-full left-0 right-0 mt-2 rounded-3xl border shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[80vh] flex flex-col ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'bg-white glass-panel border-[#e1bfb5]'
        }`}>
          
          {/* Header & Filter Tabs */}
          <div className={`p-3 border-b flex items-center justify-between gap-2 ${
            themeMode === 'dark'
              ? 'bg-[#383a39] border-[#3a3a3a]/50'
              : 'bg-[#fcf9f8] border-[#e1bfb5]/50'
          }`}>
            <div className="flex items-center gap-1.5">
              {[
                { id: 'all', label: 'All Results' },
                { id: 'dishes', label: `Dishes (${matchingDishes.length})` },
                { id: 'venues', label: `Kitchens (${matchingTenants.length})` },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-[#ab3500] text-white shadow-xs'
                      : themeMode === 'dark'
                        ? 'bg-[#242625] text-[#c4c4c4] border border-[#3a3a3a]/40 hover:bg-[#383a39]'
                        : 'bg-white text-[#594139] border border-[#e1bfb5]/40 hover:bg-[#f3f3f3]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-[#4a4a4a] hover:bg-[#5a5a5a] text-[#c4c4c4]'
                  : 'bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#594139]'
              }`}
            >
              <X className="w-[16px] h-[16px]" />
            </button>
          </div>

          {/* Results Scrollable Area */}
          <div className={`p-4 overflow-y-auto space-y-6 flex-1 divide-y ${
            themeMode === 'dark' ? 'divide-[#3a3a3a]/30' : 'divide-[#e1bfb5]/30'
          }`}>
            
            {/* 1. Quick Shortcuts / Actions (shown if matching or empty query) */}
            {(activeFilter === 'all') && quickActions.length > 0 && (
              <div className="space-y-2">
                <p className={`text-[10px] font-bold uppercase tracking-wider ${
                  themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                }`}>
                  Quick Actions & Shortcuts
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quickActions.map(action => (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className={`flex items-center gap-3 p-2.5 rounded-2xl border text-left transition-all group cursor-pointer hover:border-[#ab3500]/50 ${
                        themeMode === 'dark'
                          ? 'bg-[#383a39] hover:bg-[#4a4a4a] border-[#3a3a3a]/40'
                          : 'bg-[#f9f9f9] hover:bg-[#f3f3f3] border-[#e1bfb5]/40'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${action.color}`}>
                        {action.icon === 'store' ? <Store className="w-[18px] h-[18px]" /> :
                         action.icon === 'restaurant' ? <Utensils className="w-[18px] h-[18px]" /> :
                         action.icon === 'person' ? <User className="w-[18px] h-[18px]" /> :
                         <Search className="w-[18px] h-[18px]" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-heading font-bold text-xs group-hover:text-[#ab3500] truncate ${
                          themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                        }`}>
                          {action.title}
                        </p>
                        <p className={`text-[10px] truncate ${
                          themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                        }`}>{action.subtitle}</p>
                      </div>
                      <ChevronRight className={`w-[16px] h-[16px] group-hover:translate-x-1 transition-transform ${
                        themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Matched Restaurants / Kitchens */}
            {(activeFilter === 'all' || activeFilter === 'venues') && (
              <div className="space-y-2 pt-4 first:pt-0">
                <div className="flex items-center justify-between">
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${
                    themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                  }`}>
                    Partner Kitchens & Bistros ({matchingTenants.length})
                  </p>
                  {matchingTenants.length > 0 && (
                    <span className="text-[10px] text-[#ab3500] font-bold">Direct Ordering Available</span>
                  )}
                </div>

                {matchingTenants.length === 0 ? (
                  <p className={`text-xs py-2 ${
                    themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                  }`}>No restaurants match "{query}"</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchingTenants.slice(0, 4).map(tenant => (
                      <div
                        key={tenant.id}
                        onClick={() => handleSelectTenant(tenant)}
                        className={`flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-pointer group hover:border-[#ab3500]/60 hover:shadow-sm ${
                          themeMode === 'dark'
                            ? 'bg-[#383a39] hover:bg-[#4a4a4a] border-[#3a3a3a]/40'
                            : 'bg-[#f9f9f9] hover:bg-[#f3f3f3] border-[#e1bfb5]/40'
                        }`}
                      >
                        <img
                          src={tenant.logo}
                          alt={tenant.name}
                          className={`w-12 h-12 rounded-xl object-cover border shrink-0 ${
                            themeMode === 'dark' ? 'border-[#3a3a3a]/50' : 'border-[#e1bfb5]/50'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className={`font-heading font-bold text-xs group-hover:text-[#ab3500] truncate ${
                              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                            }`}>
                              {tenant.name}
                            </h4>
                            <span className="flex items-center text-[10px] font-extrabold text-amber-600">
                              ★ {tenant.rating}
                            </span>
                          </div>
                          <p className={`text-[10px] truncate ${
                            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                          }`}>{tenant.cuisine} • {tenant.deliveryTime}</p>
                          <p className="text-[10px] font-semibold text-[#006c4f]">
                            ${tenant.deliveryFee.toFixed(2)} delivery • Min ${tenant.minOrder.toFixed(2)}
                          </p>
                        </div>
                        <ArrowRight className="w-[18px] h-[18px] text-[#ab3500] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. Matched Dishes */}
            {(activeFilter === 'all' || activeFilter === 'dishes') && (
              <div className="space-y-2 pt-4 first:pt-0">
                <div className="flex items-center justify-between">
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${
                    themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                  }`}>
                    Dishes & Gourmet Selections ({matchingDishes.length})
                  </p>
                  <span className={`text-[10px] ${
                    themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                  }`}>Click dish to customize & order</span>
                </div>

                {matchingDishes.length === 0 ? (
                  <p className={`text-xs py-2 ${
                    themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                  }`}>No menu items match your query.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {matchingDishes.slice(0, 6).map((dish, idx) => {
                      const rest = tenants.find(t => t.id === dish.tenantId);
                      return (
                        <div
                          key={`${dish.id}-${idx}`}
                          onClick={() => handleSelectDish(dish)}
                          className={`flex items-center gap-2.5 p-2.5 rounded-2xl border transition-all cursor-pointer group hover:border-[#ab3500]/60 hover:shadow-sm ${
                            themeMode === 'dark'
                              ? 'bg-[#383a39] hover:bg-[#4a4a4a] border-[#3a3a3a]/40'
                              : 'bg-[#f9f9f9] hover:bg-[#f3f3f3] border-[#e1bfb5]/40'
                          }`}
                        >
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className={`w-14 h-14 rounded-xl object-cover border shrink-0 ${
                              themeMode === 'dark' ? 'border-[#3a3a3a]/50' : 'border-[#e1bfb5]/50'
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-heading font-bold text-xs group-hover:text-[#ab3500] truncate ${
                              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                            }`}>
                              {dish.name}
                            </h4>
                            {rest && (
                              <p className={`text-[10px] truncate ${
                                themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                              }`}>{rest.name}</p>
                            )}
                            <div className="flex items-center justify-between mt-1">
                              <span className="font-mono font-bold text-xs text-[#ab3500]">
                                ${dish.price.toFixed(2)}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-[#ab3500]/10 text-[#ab3500] text-[9px] font-extrabold group-hover:bg-[#ab3500] group-hover:text-white transition-colors">
                                + Add
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Footer note */}
          <div className={`p-2.5 border-t text-center text-[10px] flex items-center justify-between px-4 ${
            themeMode === 'dark'
              ? 'bg-[#383a39] border-[#3a3a3a]/40 text-[#7a7a7a]'
              : 'bg-[#fcf9f8] border-[#e1bfb5]/40 text-[#8d7168]'
          }`}>
            <span>Press <strong className={themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}>ESC</strong> to dismiss</span>
            <span>Showing real-time kitchen availability</span>
          </div>

        </div>
      )}
    </div>
  );
};
