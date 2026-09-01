 'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { FoodScrollIndicator } from '../common/FoodScrollIndicator';
import confetti from 'canvas-confetti';

export const CustomerHome: React.FC = () => {
  const {
    tenants,
    setSelectedRestaurantId,
    setCustomerTab,
    menuItems,
    openItemModal,
    showToast,
    applyPromoCode,
    themeMode
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeFilter, setActiveFilter] = useState<'all' | 'rating' | 'speed' | 'free_delivery'>('all');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoCycleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const restaurantsSectionRef = useRef<HTMLDivElement>(null);
  const [deliveryAddress, setDeliveryAddress] = useState('742 Evergreen Terrace, Metropolis');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [tempAddress, setTempAddress] = useState('');

  const heroVideos = [
    { video: '/videos/Assembling_wagyu_burger_with_cheese_202608191233.mp4', name: 'Signature Truffle Burger', restaurant: 'Green Bistro', price: 18.99 },
    { video: '/videos/Chef_slicing_salmon_sushi_roll_202608192132.mp4', name: 'Dragon Roll Sushi', restaurant: 'Tokyo Sushi House', price: 24.99 },
    { video: '/videos/Chopsticks_lifting_noodle_from_r…_202608192141.mp4', name: 'Spicy Miso Ramen', restaurant: 'Noodle Master', price: 16.99 },
    { video: '/videos/Sauce_drizzling_over_fried_chicken_202608191449.mp4', name: 'Crispy Fried Chicken', restaurant: 'Southern Comfort', price: 14.99 },
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
  }, [isVideoPaused]);

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

  const currentHeroItem = heroVideos[currentVideoIndex];

  return (
    <div className={`space-y-8 pb-16 ${
      themeMode === 'warm' ? 'bg-[#faf5f0]' :
      themeMode === 'dark' ? 'bg-[#1a1c1c]' :
      'bg-[#fcf9f8]'
    }`}>
      
          {/* Hero Banner with Search & Address */}
      <section className={`relative overflow-hidden rounded-4xl p-6 sm:p-10 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2.5rem)] max-w-7xl mx-auto backdrop-blur-2xl border shadow-[0_8px_40px_-8px_rgba(171,53,0,0.18)] ${
        themeMode === 'warm' ? 'bg-[#fffbf7]/60 border-[#d4c4b8]/50' :
        themeMode === 'dark' ? 'bg-[#242625]/60 border-white/10' :
        'bg-white/35 border-white/60'
      }`}>
        {/* Ambient light — softer, more diffuse than a flat blur blob */}
        <div className={`absolute -top-32 -right-32 w-md h-112 rounded-full blur-[80px] -z-10 pointer-events-none ${
          themeMode === 'warm' ? 'bg-linear-to-br from-[#ff6b35]/20 via-[#ffb088]/10 to-transparent' :
          themeMode === 'dark' ? 'bg-linear-to-br from-[#ff6b35]/15 via-[#ab3500]/10 to-transparent' :
          'bg-linear-to-br from-[#ff6b35]/25 via-[#ffb088]/10 to-transparent'
        }`} />
        <div className={`absolute -bottom-32 -left-24 w-96 h-96 rounded-full blur-[80px] -z-10 pointer-events-none ${
          themeMode === 'warm' ? 'bg-linear-to-tr from-[#5c4a3d]/10 via-[#d4c4b8]/8 to-transparent' :
          themeMode === 'dark' ? 'bg-linear-to-tr from-[#87bcfe]/10 via-[#24619d]/8 to-transparent' :
          'bg-linear-to-tr from-[#24619d]/12 via-[#87bcfe]/10 to-transparent'
        }`} />
        {/* Faint inner sheen for glass depth */}
        <div className={`absolute inset-0 rounded-4xl -z-10 pointer-events-none ${
          themeMode === 'warm' ? 'bg-linear-to-b from-[#fffbf7]/30 via-transparent to-transparent' :
          themeMode === 'dark' ? 'bg-linear-to-b from-white/10 via-transparent to-transparent' :
          'bg-linear-to-b from-white/40 via-transparent to-transparent'
        }`} />

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border shadow-sm text-[#ab3500] text-xs font-bold ${
              themeMode === 'warm' ? 'bg-[#fffbf7]/70 border-[#d4c4b8]/60' :
              themeMode === 'dark' ? 'bg-[#242625]/70 border-white/20' :
              'bg-white/50 border-white/70'
            }`}>
              <span className="material-symbols-outlined text-[15px]">location_on</span>
              <span>Delivering to {deliveryAddress}</span>
              <span
                onClick={() => {
                  setTempAddress(deliveryAddress);
                  setIsAddressModalOpen(true);
                }}
                className={`text-[10px] font-semibold underline underline-offset-2 hover:text-[#ab3500] cursor-pointer transition-colors ${
                  themeMode === 'warm' ? 'text-[#6b5a4a] decoration-[#d4c4b8]' :
                  themeMode === 'dark' ? 'text-[#c4c4c4] decoration-white/30' :
                  'text-[#8d7168] decoration-[#e1bfb5]'
                }`}
              >
                Change
              </span>
            </div>

            <h1 className={`font-heading font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] tracking-tight leading-[1.05] ${
              themeMode === 'warm' ? 'text-[#3d2b1f]' :
              themeMode === 'dark' ? 'text-[#f5f5f5]' :
              'text-[#1a1c1c]'
            }`}>
              Deliciousness <br className="hidden sm:block" />
              <span className="bg-linear-to-r from-[#ab3500] to-[#ff6b35] bg-clip-text text-transparent">
                Delivered to Your Door
              </span>
            </h1>

            <p className={`text-xs sm:text-sm leading-relaxed max-w-xl ${
              themeMode === 'warm' ? 'text-[#6b5a4a]/90' :
              themeMode === 'dark' ? 'text-[#c4c4c4]/90' :
              'text-[#594139]/90'
            }`}>
              Savor organic farm bowls, triple-smashed wagyu burgers, artisan woodfired pizzas, and Tokyo-grade sushi from verified kitchens.
            </p>

            {/* Quick Action Badges & CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setActiveFilter('rating');
                  showToast('Top Rated Kitchens', 'Showing verified kitchens rated 4.8★ and above', 'info');
                  restaurantsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="px-5 py-2.5 rounded-2xl bg-linear-to-r from-[#ab3500] to-[#ff6b35] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-[#ab3500]/25 cursor-pointer hover:shadow-xl hover:shadow-[#ab3500]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span className="material-symbols-outlined text-[17px] fill-1">stars</span>
                <span>Explore Top Rated</span>
              </button>

              <button
                onClick={() => {
                  const result = applyPromoCode('WELCOME20');
                  if (result.success) {
                    // Trigger confetti celebration with delay to ensure it renders
                    setTimeout(() => {
                      confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#ab3500', '#ff6b35', '#00ae81'],
                        disableForReducedMotion: true,
                        zIndex: 9999,
                      });
                    }, 100);
                  }
                }}
                className={`px-5 py-2.5 rounded-2xl backdrop-blur-md hover:backdrop-blur-lg border text-[#ab3500] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                  themeMode === 'warm' ? 'bg-[#fffbf7]/60 hover:bg-[#fffbf7]/80 border-[#d4c4b8]/60' :
                  themeMode === 'dark' ? 'bg-[#242625]/60 hover:bg-[#242625]/80 border-white/20' :
                  'bg-white/45 hover:bg-white/65 border-white/70'
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">local_activity</span>
                <span>Claim 20% Coupon</span>
              </button>

              <div className={`hidden lg:flex items-center gap-2 pl-3 ml-1 border-l text-xs font-bold ${
                themeMode === 'warm' ? 'border-[#d4c4b8]/50 text-[#6b5a4a]' :
                themeMode === 'dark' ? 'border-white/20 text-[#c4c4c4]' :
                'border-[#e1bfb5]/50 text-[#594139]'
              }`}>
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
              <div className={`absolute top-2 right-2 px-3 py-1.5 rounded-full backdrop-blur-md border shadow-md text-[#ab3500] text-[10px] font-extrabold tracking-wide flex items-center gap-1 z-10 ${
                themeMode === 'warm' ? 'bg-[#fffbf7]/80 border-[#d4c4b8]/70' :
                themeMode === 'dark' ? 'bg-[#242625]/80 border-white/20' :
                'bg-white/70 border-white/80'
              }`}>
                <span className="material-symbols-outlined text-[13px] fill-1">local_fire_department</span>
                TRENDING
              </div>
              
              <div className="relative group">
                <video
                  ref={videoRef}
                  key={currentVideoIndex}
                  src={currentHeroItem.video}
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
                      <h3 className={`font-heading font-bold text-sm ${
                        themeMode === 'warm' ? 'text-[#3d2b1f]' :
                        themeMode === 'dark' ? 'text-[#ffffff]' :
                        'text-[#1a1c1c]'
                      }`}>
                        {currentHeroItem.name}
                      </h3>
                      <p className={`text-[10px] ${
                        themeMode === 'warm' ? 'text-[#6b5a4a]' :
                        themeMode === 'dark' ? 'text-[#e0e0e0]' :
                        'text-[#8d7168]'
                      }`}>
                        {currentHeroItem.restaurant}
                      </p>
                    </div>
                    <div className={`flex items-center gap-1 text-[10px] font-bold text-amber-600 px-1.5 py-0.5 rounded-md ${
                      themeMode === 'warm' ? 'bg-[#fffbf7]/70' :
                      themeMode === 'dark' ? 'bg-[#242625]/70' :
                      'bg-white/50'
                    }`}>
                      <span className="material-symbols-outlined text-[14px]">star</span>
                      <span>4.9</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className={`px-3 py-1.5 rounded-lg border-2 border-[#ab3500] shadow-sm ${
                      themeMode === 'warm' ? 'bg-[#fffbf7]' :
                      themeMode === 'dark' ? 'bg-[#242625]' :
                      'bg-white'
                    }`}>
                      <span className="font-mono font-extrabold text-[#ab3500] text-base">
                        ${currentHeroItem.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const matchingDish = menuItems.find(m => 
                          m.name.toLowerCase().includes(currentHeroItem.name.toLowerCase().split(' ')[0]) ||
                          currentHeroItem.name.toLowerCase().includes(m.name.toLowerCase().split(' ')[0])
                        );
                        if (matchingDish) {
                          openItemModal(matchingDish);
                        } else {
                          showToast('Item Not Found', 'This item is not currently available', 'warning');
                        }
                      }}
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
        <span className={`text-xs font-bold mr-1 shrink-0 flex items-center gap-1 ${
          themeMode === 'warm' ? 'text-[#6b5a4a]' :
          themeMode === 'dark' ? 'text-[#c4c4c4]' :
          'text-[#8d7168]'
        }`}>
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
                  : themeMode === 'warm' ? 'bg-[#fffbf7] text-[#6b5a4a] border border-[#d4c4b8]/50 hover:bg-[#f5ede4]' :
                  themeMode === 'dark' ? 'bg-[#242625] text-[#c4c4c4] border border-white/20 hover:bg-[#2e302f]' :
                  'bg-white text-[#594139] border border-[#e1bfb5]/50 hover:bg-[#f9f9f9]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Restaurant Showcase Cards */}
      <section ref={restaurantsSectionRef} className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`font-heading font-extrabold text-xl ${
              themeMode === 'warm' ? 'text-[#3d2b1f]' :
              themeMode === 'dark' ? 'text-[#ffffff]' :
              'text-[#1a1c1c]'
            }`}>
              Featured Kitchens
            </h2>
            <p className={`text-xs ${
              themeMode === 'warm' ? 'text-[#6b5a4a]' :
              themeMode === 'dark' ? 'text-[#e0e0e0]' :
              'text-[#594139]'
            }`}>Partner restaurants ready for immediate dispatch</p>
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
              className={`glass-panel rounded-3xl overflow-hidden border group hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                themeMode === 'warm' ? 'border-[#d4c4b8]/50' :
                themeMode === 'dark' ? 'border-white/20' :
                'border-[#e1bfb5]/50'
              }`}
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

                  {/* Verified Kitchen Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-xl backdrop-blur-md text-[#006c4f] text-[10px] font-bold flex items-center gap-1 shadow-md ${
                      themeMode === 'dark' ? 'bg-[#242625]/90' : 'bg-white/90'
                    }`}>
                      <span className="material-symbols-outlined text-[14px] text-[#00ae81]">verified</span>
                      Verified
                    </span>
                  </div>

                  {/* Rating Pill */}
                  <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-xl backdrop-blur-md flex items-center gap-1 shadow-md ${
                    themeMode === 'warm' ? 'bg-[#fffbf7]/90' :
                    themeMode === 'dark' ? 'bg-[#242625]/90' :
                    'bg-white/90'
                  }`}>
                    <span className="material-symbols-outlined text-[15px] text-amber-500 fill-1">star</span>
                    <span className={`text-xs font-extrabold ${
                      themeMode === 'warm' ? 'text-[#3d2b1f]' :
                      themeMode === 'dark' ? 'text-[#f5f5f5]' :
                      'text-[#1a1c1c]'
                    }`}>{tenant.rating}</span>
                    <span className={`text-[10px] ${
                      themeMode === 'warm' ? 'text-[#6b5a4a]' :
                      themeMode === 'dark' ? 'text-[#c4c4c4]' :
                      'text-[#8d7168]'
                    }`}>({tenant.reviewsCount})</span>
                  </div>

                  {/* Delivery time pill */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#54fdc4]">schedule</span>
                    <span>{tenant.deliveryTime}</span>
                  </div>

                  {/* Delivery Fee pill */}
                  <div className={`absolute bottom-3 right-3 px-2.5 py-1 rounded-xl backdrop-blur-md text-xs font-bold ${
                    themeMode === 'warm' ? 'bg-[#fffbf7]/90 text-[#3d2b1f]' :
                    themeMode === 'dark' ? 'bg-[#242625]/90 text-[#f5f5f5]' :
                    'bg-white/90 text-[#1a1c1c]'
                  }`}>
                    ${tenant.deliveryFee.toFixed(2)} delivery
                  </div>
                </div>

                {/* Info block */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={tenant.logo}
                      alt={tenant.name}
                      className={`w-10 h-10 rounded-xl object-cover border shadow-sm ${
                        themeMode === 'warm' ? 'border-[#d4c4b8]/60' :
                        themeMode === 'dark' ? 'border-white/20' :
                        'border-[#e1bfb5]/60'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-heading font-bold text-base transition-colors truncate ${
                        themeMode === 'warm' ? 'text-[#3d2b1f] group-hover:text-[#ab3500]' :
                        themeMode === 'dark' ? 'text-[#ffffff] group-hover:text-[#ab3500]' :
                        'text-[#1a1c1c] group-hover:text-[#ab3500]'
                      }`}>
                        {tenant.name}
                      </h3>
                      <p className={`text-xs truncate ${
                        themeMode === 'warm' ? 'text-[#6b5a4a]' :
                        themeMode === 'dark' ? 'text-[#c4c4c4]' :
                        'text-[#8d7168]'
                      }`}>{tenant.cuisine} • {tenant.address}</p>
                    </div>
                  </div>

                  <p className={`text-xs line-clamp-2 ${
                    themeMode === 'warm' ? 'text-[#6b5a4a]' :
                    themeMode === 'dark' ? 'text-[#c4c4c4]' :
                    'text-[#594139]'
                  }`}>
                    {tenant.tagline}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tenant.tags.map(tag => (
                      <span
                        key={tag}
                        className={`px-2.5 py-0.5 rounded-lg text-[10px] font-semibold border ${
                        themeMode === 'warm' ? 'bg-[#f5ede4] text-[#6b5a4a] border-[#d4c4b8]/40' :
                        themeMode === 'dark' ? 'bg-[#2e302f] text-[#c4c4c4] border-white/20' :
                        'bg-[#f3f3f3] text-[#594139] border-[#e1bfb5]/40'
                      }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className={`px-5 pb-5 pt-2 flex items-center justify-between border-t ${
                themeMode === 'warm' ? 'border-[#d4c4b8]/30' :
                themeMode === 'dark' ? 'border-white/20' :
                'border-[#e1bfb5]/30'
              }`}>
                <span className="flex flex-row leading-tight items-center gap-2">
                  <span className={`text-[10px] font-medium uppercase tracking-wide ${
                    themeMode === 'warm' ? 'text-[#6b5a4a]' :
                    themeMode === 'dark' ? 'text-[#c4c4c4]' :
                    'text-[#8d7168]'
                  }`}>Min. Order</span>
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
          <h2 className={`font-heading font-bold text-lg flex items-center gap-2 ${
            themeMode === 'warm' ? 'text-[#3d2b1f]' :
            themeMode === 'dark' ? 'text-[#ffffff]' :
            'text-[#1a1c1c]'
          }`}>
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
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                themeMode === 'warm' ? 'bg-[#f5ede4] hover:bg-[#e9ddcf] text-[#6b5a4a] border-[#d4c4b8]/40' :
                themeMode === 'dark' ? 'bg-[#2e302f] hover:bg-[#383a39] text-[#c4c4c4] border-white/20' :
                'bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#594139] border-[#e1bfb5]/40'
              }`}
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
            <h2 className={`font-heading font-extrabold text-xl ${
              themeMode === 'warm' ? 'text-[#3d2b1f]' :
              themeMode === 'dark' ? 'text-[#ffffff]' :
              'text-[#1a1c1c]'
            }`}>
              Popular Dishes
            </h2>
            <p className={`text-xs ${
              themeMode === 'warm' ? 'text-[#6b5a4a]' :
              themeMode === 'dark' ? 'text-[#e0e0e0]' :
              'text-[#594139]'
            }`}>Signature dishes ordered most frequently</p>
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

      {/* Address Change Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className={`rounded-3xl p-6 border shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-200 ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]'
              : 'bg-white border-[#e1bfb5]'
          }`}>
            <div className={`flex items-center justify-between pb-3 border-b mb-4 ${
              themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-[#e1bfb5]/40'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-xl text-[#ab3500] ${
                  themeMode === 'dark' ? 'bg-[#ab3500]/15' : 'bg-[#ab3500]/15'
                }`}>
                  <span className="material-symbols-outlined text-lg">location_on</span>
                </span>
                <h3 className={`font-heading font-extrabold text-base ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>Change Delivery Address</h3>
              </div>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className={`p-1 rounded-lg transition-colors cursor-pointer ${
                  themeMode === 'dark'
                    ? 'text-[#7a7a7a] hover:text-[#f5f5f5] hover:bg-[#383a39]'
                    : 'text-[#8d7168] hover:text-[#1a1c1c] hover:bg-[#f3f3f3]'
                }`}
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                  themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                }`}>
                  New Delivery Address
                </label>
                <input
                  type="text"
                  value={tempAddress}
                  onChange={(e) => setTempAddress(e.target.value)}
                  placeholder="Enter your delivery address"
                  className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:border-[#ab3500] ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                      : 'bg-white border-[#e1bfb5] text-[#1a1c1c]'
                  }`}
                />
              </div>

              <div className={`flex items-center justify-end gap-2 pt-3 border-t ${
                themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-[#e1bfb5]/40'
              }`}>
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                    themeMode === 'dark'
                      ? 'text-[#c4c4c4] hover:bg-[#383a39]'
                      : 'text-[#594139] hover:bg-[#f3f3f3]'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (tempAddress.trim()) {
                      setDeliveryAddress(tempAddress.trim());
                      setIsAddressModalOpen(false);
                      showToast('Address Updated', `Delivery address changed to ${tempAddress.trim()}`, 'success');
                    }
                  }}
                  className="px-5 py-2 rounded-xl bg-[#ab3500] hover:bg-[#8a2a00] text-white text-xs font-bold cursor-pointer shadow-lg shadow-[#ab3500]/30"
                >
                  Update Address
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};