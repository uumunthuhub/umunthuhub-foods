 'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { ScrollableContainer } from '@umunthuhub/ui';
import { ProductCard } from '../common/ProductCard';
import { FoodScrollIndicator } from '../common/FoodScrollIndicator';

export const CustomerHome: React.FC = () => {
  const {
    tenants,
    setSelectedRestaurantId,
    setCustomerTab,
    menuItems,
    openItemModal,
    showToast,
    applyPromoCode,
    activeOrder,
    persona,
    setPersona,
    setVendorTab,
    setRiderTab,
    setIsMobileSidebarOpen
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeFilter, setActiveFilter] = useState<'all' | 'rating' | 'speed' | 'free_delivery'>('all');
  const [currentDishIndex, setCurrentDishIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoCycleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const heroVideos = [
    '/videos/Assembling_wagyu_burger_with_cheese_202608191233.mp4',
    '/videos/Chef_slicing_salmon_sushi_roll_202608192132.mp4',
    '/videos/Chopsticks_lifting_noodle_from_r…_202608192141.mp4',
    '/videos/Sauce_drizzling_over_fried_chicken_202608191449.mp4',
  ];

  const categories = [
    { name: 'All', icon: 'lunch_dining' },
    { name: 'Healthy & Organic', icon: 'eco' },
    { name: 'Gourmet Burgers', icon: 'fastfood' },
    { name: 'Japanese & Sushi', icon: 'set_meal' },
    { name: 'Italian & Pizza', icon: 'local_pizza' },
    { name: 'Mexican & Tacos', icon: 'restaurant_menu' },
    { name: 'Ramen & Noodles', icon: 'ramen_dining' },
    { name: 'Smoked BBQ', icon: 'outdoor_grill' },
    { name: 'Dim Sum & Dumplings', icon: 'soup_kitchen' },
    { name: 'French Bakery & Cafe', icon: 'bakery_dining' },
    { name: 'Desserts & Gelato', icon: 'icecream' },
    { name: 'Artisan Beverages', icon: 'local_cafe' },
  ];

  // Filter restaurants
  let filteredTenants = tenants.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || t.cuisine.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  if (activeFilter === 'rating') {
    filteredTenants = [...filteredTenants].sort((a, b) => b.rating - a.rating);
  } else if (activeFilter === 'speed') {
    filteredTenants = [...filteredTenants].sort((a, b) => a.prepTimeAvg - b.prepTimeAvg);
  } else if (activeFilter === 'free_delivery') {
    filteredTenants = filteredTenants.filter(t => t.deliveryFee <= 1.99);
  }

  // Popular items across all restaurants
  const popularDishes = menuItems.filter(m => m.isPopular);

  // Auto-scroll carousel
  useEffect(() => {
    if (popularDishes.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentDishIndex((prev) => (prev + 1) % popularDishes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [popularDishes.length]);

  // Auto-cycle hero videos with a smooth crossfade (slower cadence, eased transition)
  useEffect(() => {
    if (isVideoPaused) return;
    const CYCLE_MS = 9000; // how long each video stays before switching
    const FADE_MS = 900;   // how long the crossfade itself takes

    autoCycleRef.current = setInterval(() => {
      // fade current video out
      setVideoOpacity(0);

      // once fully faded out, swap the source, then fade the new one in
      const swapTimeout = setTimeout(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length);

        // wait a couple of frames so the new video mounts at opacity 0
        // before we animate it up to opacity 1 (otherwise the browser
        // can skip straight to the end state and it looks like a jump-cut)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setVideoOpacity(1));
        });
      }, FADE_MS);

      return () => clearTimeout(swapTimeout);
    }, CYCLE_MS);

    return () => {
      if (autoCycleRef.current) clearInterval(autoCycleRef.current);
    };
  }, [heroVideos.length, isVideoPaused]);

  const toggleVideoPlayback = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsVideoPaused(false);
    } else {
      vid.pause();
      setIsVideoPaused(true);
    }
  }, []);

  const currentDish = popularDishes[currentDishIndex];

  return (
    <div className="space-y-8 pb-16">
      
          {/* Hero Banner with Search & Address */}
      <section className="relative overflow-hidden rounded-4xl p-6 sm:p-10 bg-white/35 backdrop-blur-2xl border border-white/60 shadow-[0_8px_40px_-8px_rgba(171,53,0,0.18)]">
        {/* Ambient light — softer, more diffuse than a flat blur blob */}
        <div className="absolute -top-32 -right-32 w-md h-112 rounded-full bg-linear-to-br from-[#ff6b35]/25 via-[#ffb088]/10 to-transparent blur-[80px] -z-10 pointer-events-none" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-linear-to-tr from-[#24619d]/12 via-[#87bcfe]/10 to-transparent blur-[80px] -z-10 pointer-events-none" />
        {/* Faint inner sheen for glass depth */}
        <div className="absolute inset-0 rounded-4xl bg-linear-to-b from-white/40 via-transparent to-transparent -z-10 pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/50 backdrop-blur-md border border-white/70 shadow-sm text-[#ab3500] text-xs font-bold">
              <span className="material-symbols-outlined text-[15px]">location_on</span>
              <span>Delivering to 742 Evergreen Terrace, Metropolis</span>
              <span className="text-[10px] text-[#8d7168] font-semibold underline decoration-[#e1bfb5] underline-offset-2 hover:text-[#ab3500] cursor-pointer transition-colors">
                Change
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] text-[#1a1c1c] tracking-tight leading-[1.05]">
              Deliciousness <br className="hidden sm:block" />
              <span className="bg-linear-to-r from-[#ab3500] to-[#ff6b35] bg-clip-text text-transparent">
                Delivered to Your Door
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-[#594139]/90 leading-relaxed max-w-xl">
              Savor organic farm bowls, triple-smashed wagyu burgers, artisan woodfired pizzas, and Tokyo-grade sushi from verified kitchens.
            </p>

            {/* Quick Action Badges & CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setActiveFilter('rating');
                  showToast('Top Rated Kitchens', 'Showing verified kitchens rated 4.8★ and above', 'info');
                }}
                className="px-5 py-2.5 rounded-2xl bg-linear-to-r from-[#ab3500] to-[#ff6b35] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-[#ab3500]/25 cursor-pointer hover:shadow-xl hover:shadow-[#ab3500]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span className="material-symbols-outlined text-[17px] fill-1">stars</span>
                <span>Explore Top Rated</span>
              </button>

              <button
                onClick={() => {
                  applyPromoCode('WELCOME20');
                }}
                className="px-5 py-2.5 rounded-2xl bg-white/45 backdrop-blur-md hover:bg-white/65 border border-white/70 text-[#ab3500] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[17px]">local_activity</span>
                <span>Claim 20% Coupon</span>
              </button>

              <div className="hidden lg:flex items-center gap-2 pl-3 ml-1 border-l border-[#e1bfb5]/50 text-xs font-bold text-[#594139]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ae81] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ae81]" />
                </span>
                <span>{tenants.length} Kitchens Open Now</span>
              </div>
            </div>
          </div>

          {/* Featured Dish Carousel — sits flush inside the hero, not as a separate floating card */}
          <div className="hidden lg:block">
            <div className="relative overflow-hidden">
              <div className="absolute top-2 right-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-md text-[#ab3500] text-[10px] font-extrabold tracking-wide flex items-center gap-1 z-10">
                <span className="material-symbols-outlined text-[13px] fill-1">local_fire_department</span>
                TRENDING
              </div>
              
              <div className="relative group">
                <video
                  ref={videoRef}
                  key={currentVideoIndex}
                  src={heroVideos[currentVideoIndex]}
                  className="w-full h-72 object-cover rounded-2xl mb-3 ring-1 ring-white/50 transition-opacity ease-in-out"
                  style={{ opacity: videoOpacity, transitionDuration: '900ms' }}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                {/* Play / Pause overlay button */}
                <button
                  onClick={toggleVideoPlayback}
                  aria-label={isVideoPaused ? 'Play video' : 'Pause video'}
                  className="absolute bottom-6 right-3 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isVideoPaused ? 'play_arrow' : 'pause'}
                  </span>
                </button>
              </div>
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-sm text-[#1a1c1c]">
                        {currentDish?.name || 'Signature Truffle Burger'}
                      </h3>
                      <p className="text-[10px] text-[#8d7168]">
                        {tenants.find(t => t.id === currentDish?.tenantId)?.name || 'Green Bistro'}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-white/50 px-1.5 py-0.5 rounded-md">
                      <span className="material-symbols-outlined text-[14px]">star</span>
                      <span>4.9</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="px-3 py-1.5 rounded-lg border-2 border-[#ab3500] bg-white shadow-sm">
                      <span className="font-mono font-extrabold text-[#ab3500] text-base">
                        ${currentDish?.price?.toFixed(2) || '18.99'}
                      </span>
                    </div>
                    <button
                      onClick={() => currentDish && openItemModal(currentDish)}
                      className="px-3.5 py-1.5 rounded-xl bg-linear-to-r from-[#ab3500] to-[#8a2a00] text-white text-[10px] font-bold hover:shadow-md hover:shadow-[#ab3500]/30 active:scale-95 transition-all cursor-pointer"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
      {/* Filter Quick Pills */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-[#8d7168] mr-1 shrink-0 flex items-center gap-1">
          <span className="material-symbols-outlined text-[15px]">filter_list</span>
          <span>Sort:</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All' },
            { id: 'rating', label: '⭐ Top Rated' },
            { id: 'speed', label: '⚡ Fastest' },
            { id: 'free_delivery', label: '🛵 Low Fee' },
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-[#f3f3f3] text-[#ab3500] font-bold border border-[#ab3500]'
                  : 'bg-white text-[#594139] border border-[#e1bfb5]/50 hover:bg-[#f9f9f9]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Restaurant Showcase Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-extrabold text-xl text-[#1a1c1c]">
              Featured Kitchens
            </h2>
            <p className="text-xs text-[#594139]">Partner restaurants ready for immediate dispatch</p>
          </div>
          <span className="text-xs font-bold text-[#ab3500]">
            {filteredTenants.length} available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTenants.map(tenant => (
            <div
              key={tenant.id}
              onClick={() => {
                setSelectedRestaurantId(tenant.id);
                setCustomerTab('restaurant');
              }}
              className="glass-panel rounded-3xl overflow-hidden border border-[#e1bfb5]/50 group hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Banner with Badges */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={tenant.banner}
                    alt={tenant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />

                  {/* Rating Pill */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-md flex items-center gap-1 shadow-md">
                    <span className="material-symbols-outlined text-[15px] text-amber-500 fill-1">star</span>
                    <span className="text-xs font-extrabold text-[#1a1c1c]">{tenant.rating}</span>
                    <span className="text-[10px] text-[#8d7168]">({tenant.reviewsCount})</span>
                  </div>

                  {/* Delivery time pill */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#54fdc4]">schedule</span>
                    <span>{tenant.deliveryTime}</span>
                  </div>

                  {/* Delivery Fee pill */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-md text-[#1a1c1c] text-xs font-bold">
                    ${tenant.deliveryFee.toFixed(2)} delivery
                  </div>
                </div>

                {/* Info block */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={tenant.logo}
                      alt={tenant.name}
                      className="w-10 h-10 rounded-xl object-cover border border-[#e1bfb5]/60 shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-base text-[#1a1c1c] group-hover:text-[#ab3500] transition-colors truncate">
                        {tenant.name}
                      </h3>
                      <p className="text-xs text-[#8d7168] truncate">{tenant.cuisine} • {tenant.address}</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#594139] line-clamp-2">
                    {tenant.tagline}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tenant.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-lg text-[10px] font-semibold bg-[#f3f3f3] text-[#594139] border border-[#e1bfb5]/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-[#e1bfb5]/30">
                <span className="flex flex-row leading-tight items-center gap-2">
                  <span className="text-[10px] font-medium text-[#8d7168] uppercase tracking-wide">Min. Order</span>
                  <span className="text-base font-bold text-[#ab3500]">${tenant.minOrder.toFixed(2)}</span>
                </span>
                <span className="text-xs font-bold text-[#ab3500] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Full Menu
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Cuisine Tags - Moved to Middle */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-lg text-[#1a1c1c] flex items-center gap-2">
            <span>Popular Cuisines</span>
            <span className="material-symbols-outlined text-[18px] text-[#ab3500]">restaurant_menu</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            '🥗 Healthy', '🍔 Burgers', '🍣 Sushi', '🍕 Italian', '🌱 Vegan', '🥩 Halal'
          ].map((tag, idx) => (
            <button
              key={idx}
              onClick={() => {
                showToast('Filter Applied', `Browsing ${tag} dishes`, 'info');
              }}
              className="px-3 py-2 rounded-xl bg-[#f3f3f3] hover:bg-[#e8e8e8] text-xs font-semibold text-[#594139] transition-colors cursor-pointer border border-[#e1bfb5]/40"
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Chef's Popular Dishes */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-extrabold text-xl text-[#1a1c1c]">
              Popular Dishes
            </h2>
            <p className="text-xs text-[#594139]">Signature dishes ordered most frequently</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularDishes.slice(0, 6).map(dish => {
            const restaurant = tenants.find(t => t.id === dish.tenantId);
            return (
              <ProductCard
                key={dish.id}
                id={dish.id}
                name={dish.name}
                description={dish.description}
                image={dish.image}
                price={dish.price}
                originalPrice={dish.originalPrice}
                tenantId={dish.tenantId}
                tenantName={restaurant?.name}
                badge="TOP SELLER"
                onAdd={() => openItemModal(dish)}
              />
            );
          })}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="p-4 sm:p-5 rounded-3xl bg-linear-to-r from-[#ab3500] to-[#ff6b35] text-white shadow-lg shadow-[#ab3500]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-2xl font-bold">local_activity</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-base sm:text-lg">20% OFF YOUR FIRST ORDER</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-white text-[#ab3500]">NEW</span>
            </div>
            <p className="text-xs text-white/90">Use code <span className="font-mono font-bold text-amber-200">WELCOME20</span> on orders over $25</p>
          </div>
        </div>
        <button
          onClick={() => {
            applyPromoCode('WELCOME20');
          }}
          className="px-5 py-2.5 rounded-xl bg-white text-[#ab3500] text-xs font-extrabold hover:bg-white/90 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer"
        >
          Auto-Apply Code
        </button>
      </section>

      {/* ── 3D Food Scroll Indicator ── */}
      <FoodScrollIndicator
        threshold={300}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-16 h-20 z-40 drop-shadow-2xl"
      />

    </div>
  );
};