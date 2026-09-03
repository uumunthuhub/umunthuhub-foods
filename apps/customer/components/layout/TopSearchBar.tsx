'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuItem, Tenant } from '@umunthuhub/shared-types';

export const TopSearchBar: React.FC = () => {
  const {
    persona,
    setPersona,
    setCustomerTab,
    setVendorTab,
    tenants,
    menuItems,
    setSelectedRestaurantId,
    openItemModal,
    showToast,
    applyPromoCode,
    activeOrder
  } = useApp();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'dishes' | 'venues' | 'dietary'>('all');
  const [selectedDiet] = useState<string | null>(null);

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

  // Matched Menu Items
  const matchingDishes = menuItems.filter(m => {
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
      id: 'track',
      title: 'Track Active Order',
      subtitle: activeOrder ? `Status: ${activeOrder.status.toUpperCase()} (${activeOrder.orderNumber})` : 'Check live delivery ETA',
      icon: 'navigation',
      color: 'text-[#ab3500] bg-[#ab3500]/10',
      action: () => {
        setPersona('customer');
        setCustomerTab('tracking');
        setIsOpen(false);
      }
    },
    {
      id: 'rewards',
      title: 'Epicurean Loyalty Club',
      subtitle: 'Redeem points for discounts & gourmet perks',
      icon: 'military_tech',
      color: 'text-amber-600 bg-amber-500/10',
      action: () => {
        setPersona('customer');
        setCustomerTab('rewards');
        setIsOpen(false);
      }
    },
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
      id: 'promo_welcome',
      title: 'Apply Coupon "WELCOME20"',
      subtitle: 'Instant 20% off culinary orders over $25',
      icon: 'local_activity',
      color: 'text-[#006c4f] bg-[#006c4f]/10',
      action: () => {
        applyPromoCode('WELCOME20');
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
    setPersona('customer');
    setCustomerTab('restaurant');
    setIsOpen(false);
    showToast('Kitchen Selected', `Opening ${tenant.name} menu`, 'info');
  };

  const handleSelectDish = (dish: MenuItem) => {
    openItemModal(dish);
    setIsOpen(false);
  };


  return (
    <div ref={containerRef} className="relative w-full z-30 mb-6">
      {/* Sleek Minimal Search Bar */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-[#c9a896] shadow-sm transition-all focus-within:shadow-lg focus-within:border-[#ab3500]">
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Search Icon */}
          <span className="material-symbols-outlined text-[#ab3500] text-[20px]">search</span>

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
            className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-[#1a1c1c] placeholder:text-[#8d7168] placeholder:font-normal"
          />

          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="w-7 h-7 rounded-full bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#594139] flex items-center justify-center transition-colors cursor-pointer"
              title="Clear search"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Live Dropdown Results Modal / Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white glass-panel rounded-3xl border border-[#e1bfb5] shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[80vh] flex flex-col">
          
          {/* Header & Filter Tabs */}
          <div className="p-3 bg-[#fcf9f8] border-b border-[#e1bfb5]/50 flex items-center justify-between gap-2">
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
                      : 'bg-white text-[#594139] border border-[#e1bfb5]/40 hover:bg-[#f3f3f3]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#594139] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>

          {/* Results Scrollable Area */}
          <div className="p-4 overflow-y-auto space-y-6 flex-1 divide-y divide-[#e1bfb5]/30">
            
            {/* 1. Quick Shortcuts / Actions (shown if matching or empty query) */}
            {(activeFilter === 'all') && quickActions.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-[#8d7168] uppercase tracking-wider">
                  Quick Actions & Shortcuts
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quickActions.map(action => (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#f9f9f9] hover:bg-[#f3f3f3] border border-[#e1bfb5]/40 text-left transition-all group cursor-pointer hover:border-[#ab3500]/50"
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${action.color}`}>
                        <span className="material-symbols-outlined text-[18px]">{action.icon}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-heading font-bold text-xs text-[#1a1c1c] group-hover:text-[#ab3500] truncate">
                          {action.title}
                        </p>
                        <p className="text-[10px] text-[#8d7168] truncate">{action.subtitle}</p>
                      </div>
                      <span className="material-symbols-outlined text-[16px] text-[#8d7168] group-hover:translate-x-1 transition-transform">
                        chevron_right
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Matched Restaurants / Kitchens */}
            {(activeFilter === 'all' || activeFilter === 'venues') && (
              <div className="space-y-2 pt-4 first:pt-0">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-[#8d7168] uppercase tracking-wider">
                    Partner Kitchens & Bistros ({matchingTenants.length})
                  </p>
                  {matchingTenants.length > 0 && (
                    <span className="text-[10px] text-[#ab3500] font-bold">Direct Ordering Available</span>
                  )}
                </div>

                {matchingTenants.length === 0 ? (
                  <p className="text-xs text-[#8d7168] py-2">No restaurants match "{query}"</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchingTenants.slice(0, 4).map(tenant => (
                      <div
                        key={tenant.id}
                        onClick={() => handleSelectTenant(tenant)}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-[#f9f9f9] hover:bg-[#f3f3f3] border border-[#e1bfb5]/40 transition-all cursor-pointer group hover:border-[#ab3500]/60 hover:shadow-sm"
                      >
                        <img
                          src={tenant.logo}
                          alt={tenant.name}
                          className="w-12 h-12 rounded-xl object-cover border border-[#e1bfb5]/50 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-heading font-bold text-xs text-[#1a1c1c] group-hover:text-[#ab3500] truncate">
                              {tenant.name}
                            </h4>
                            <span className="flex items-center text-[10px] font-extrabold text-amber-600">
                              ★ {tenant.rating}
                            </span>
                          </div>
                          <p className="text-[10px] text-[#8d7168] truncate">{tenant.cuisine} • {tenant.deliveryTime}</p>
                          <p className="text-[10px] font-semibold text-[#006c4f]">
                            ${tenant.deliveryFee.toFixed(2)} delivery • Min ${tenant.minOrder.toFixed(2)}
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-[18px] text-[#ab3500] opacity-0 group-hover:opacity-100 transition-opacity">
                          arrow_forward
                        </span>
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
                  <p className="text-[10px] font-bold text-[#8d7168] uppercase tracking-wider">
                    Dishes & Gourmet Selections ({matchingDishes.length})
                  </p>
                  <span className="text-[10px] text-[#8d7168]">Click dish to customize & order</span>
                </div>

                {matchingDishes.length === 0 ? (
                  <p className="text-xs text-[#8d7168] py-2">No menu items match your query.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {matchingDishes.slice(0, 6).map(dish => {
                      const rest = tenants.find(t => t.id === dish.tenantId);
                      return (
                        <div
                          key={dish.id}
                          onClick={() => handleSelectDish(dish)}
                          className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-[#f9f9f9] hover:bg-[#f3f3f3] border border-[#e1bfb5]/40 transition-all cursor-pointer group hover:border-[#ab3500]/60 hover:shadow-sm"
                        >
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-14 h-14 rounded-xl object-cover border border-[#e1bfb5]/50 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-heading font-bold text-xs text-[#1a1c1c] group-hover:text-[#ab3500] truncate">
                              {dish.name}
                            </h4>
                            {rest && (
                              <p className="text-[10px] text-[#8d7168] truncate">{rest.name}</p>
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
          <div className="p-2.5 bg-[#fcf9f8] border-t border-[#e1bfb5]/40 text-center text-[10px] text-[#8d7168] flex items-center justify-between px-4">
            <span>Press <strong className="text-[#1a1c1c]">ESC</strong> to dismiss</span>
            <span>Showing real-time kitchen availability</span>
          </div>

        </div>
      )}
    </div>
  );
};
