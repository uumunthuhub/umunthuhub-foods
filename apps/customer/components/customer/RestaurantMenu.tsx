'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScrollableContainer } from '@umunthuhub/ui';
import { ProductCard } from '../common/ProductCard';

export const RestaurantMenu: React.FC = () => {
  const {
    selectedRestaurant,
    menuItems,
    openItemModal,
    setCustomerTab,
    cartItemsCount,
    cartSubtotal,
    setIsCartDrawerOpen,
    themeMode
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'gf' | 'popular'>('all');

  const restaurantItems = menuItems.filter(m => m.tenantId === selectedRestaurant.id);

  const categories = ['All', ...Array.from(new Set(restaurantItems.map(i => i.category)))];

  const filteredItems = restaurantItems.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    if (!matchesCat) return false;
    if (dietaryFilter === 'veg' && !item.isVeg) return false;
    if (dietaryFilter === 'gf' && !item.isGlutenFree) return false;
    if (dietaryFilter === 'popular' && !item.isPopular) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-24">
      
      {/* Back button */}
      <button
        onClick={() => setCustomerTab('home')}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold shadow-sm transition-colors cursor-pointer ${
          themeMode === 'dark'
            ? 'bg-[#383a39] hover:bg-[#4a4a4a] border-[#3a3a3a] text-[#f5f5f5]'
            : 'bg-white hover:bg-[#f3f3f3] border-[#e1bfb5]/60 text-[#594139]'
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        <span>Back to Restaurants</span>
      </button>

      {/* Restaurant Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#e1bfb5]/60 shadow-xl">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={selectedRestaurant.banner}
            alt={selectedRestaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/20" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`px-3 py-1 rounded-xl backdrop-blur-md text-[#006c4f] text-xs font-bold flex items-center gap-1 ${
              themeMode === 'dark' ? 'bg-[#242625]/90' : 'bg-white/90'
            }`}>
              <span className="material-symbols-outlined text-[16px] text-[#00ae81]">verified</span>
              Verified Kitchen
            </span>
          </div>

          <div className={`absolute top-4 right-4 px-3 py-1 rounded-xl backdrop-blur-md text-xs font-bold flex items-center gap-1 ${
            themeMode === 'dark' ? 'bg-[#242625]/90 text-[#f5f5f5]' : 'bg-white/90 text-[#1a1c1c]'
          }`}>
            <span className="material-symbols-outlined text-[16px] text-amber-500 fill-1">star</span>
            <span>{selectedRestaurant.rating}</span>
            <span className={themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#8d7168]'}>({selectedRestaurant.reviewsCount} reviews)</span>
          </div>

          {/* Bottom Info Banner */}
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <img
                  src={selectedRestaurant.logo}
                  alt={selectedRestaurant.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
                />
                <div>
                  <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                    {selectedRestaurant.name}
                  </h1>
                  <p className="text-xs text-white/90">{selectedRestaurant.cuisine} • {selectedRestaurant.address}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 pt-1">
                <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                  <span className="material-symbols-outlined text-[15px] text-[#54fdc4]">schedule</span>
                  {selectedRestaurant.deliveryTime}
                </span>
                <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                  <span className="material-symbols-outlined text-[15px] text-[#87bcfe]">two_wheeler</span>
                  ${selectedRestaurant.deliveryFee.toFixed(2)} delivery
                </span>
                <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                  <span className="material-symbols-outlined text-[15px] text-amber-400">payments</span>
                  Min. ${selectedRestaurant.minOrder.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="hidden sm:block">
              <div className="px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-md text-right border border-white/30">
                <p className="text-[10px] uppercase font-bold text-white/80">Average Prep Speed</p>
                <p className="font-heading font-extrabold text-lg text-[#54fdc4]">{selectedRestaurant.prepTimeAvg} mins</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Category & Dietary Filter Bar */}
      <div className={`sticky top-20 z-30 rounded-2xl p-2 sm:p-2.5 border shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'glass-panel border-[#e1bfb5]/60'
      }`}>
        {/* Category Pills with Scroll Arrows */}
        <div className="w-full sm:flex-1 min-w-0">
          <ScrollableContainer scrollAmount={240} arrowSize="sm" className="gap-1.5 py-0.5">
            {categories.map(cat => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#ab3500] text-white shadow-sm shadow-[#ab3500]/20'
                      : themeMode === 'dark'
                        ? 'bg-[#383a39] text-[#f5f5f5] hover:bg-[#4a4a4a]'
                        : 'bg-[#f3f3f3] text-[#594139] hover:bg-[#e8e8e8] hover:text-[#1a1c1c]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </ScrollableContainer>
        </div>

        {/* Dietary Filters */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'popular', label: '🔥 Popular' },
            { id: 'veg', label: '🌱 Veg' },
            { id: 'gf', label: '🌾 GF' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setDietaryFilter(f.id as any)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                dietaryFilter === f.id
                  ? 'bg-[#00ae81] text-white'
                  : themeMode === 'dark'
                    ? 'bg-[#383a39] text-[#f5f5f5] border border-[#3a3a3a] hover:bg-[#4a4a4a]'
                    : 'bg-white text-[#594139] border border-[#e1bfb5]/40 hover:bg-[#f9f9f9]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className={`font-heading font-extrabold text-xl ${
            themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
          }`}>
            {activeCategory === 'All' ? 'Full Culinary Menu' : activeCategory}
          </h2>
          <span className={`text-xs font-medium ${
            themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#8d7168]'
          }`}>
            {filteredItems.length} items available
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className={`text-center py-12 rounded-3xl p-8 border ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]'
              : 'glass-panel border-[#e1bfb5]/40'
          }`}>
            <span className={`material-symbols-outlined text-4xl ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
            }`}>restaurant_menu</span>
            <p className={`font-heading font-bold text-sm mt-2 ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>No items match your dietary filter</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setDietaryFilter('all');
              }}
              className="mt-3 px-4 py-1.5 rounded-xl bg-[#ab3500] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredItems.map(item => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                image={item.image}
                price={item.price}
                originalPrice={item.originalPrice}
                isPopular={item.isPopular}
                isVeg={item.isVeg}
                isGlutenFree={item.isGlutenFree}
                isCustomizable={item.options && item.options.length > 0}
                onAdd={() => openItemModal(item)}
                onClick={() => openItemModal(item)}
                layout="horizontal"
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Bottom Sticky Bar if Cart has items */}
      {cartItemsCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4 animate-in slide-in-from-bottom-6 duration-300">
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="w-full py-3.5 px-5 rounded-2xl glass-button-primary shadow-2xl flex items-center justify-between cursor-pointer border border-white/30"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-[#ab3500] text-xs font-extrabold">
                {cartItemsCount}
              </span>
              <span className="font-heading font-bold text-xs uppercase tracking-wider">
                View Tray & Checkout
              </span>
            </div>
            <span className="font-heading font-extrabold text-base">
              ${cartSubtotal.toFixed(2)} →
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
