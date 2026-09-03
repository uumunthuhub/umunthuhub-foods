'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';

export const RewardsView: React.FC = () => {
  const {
    loyaltyPoints,
    loyaltyRewards,
    redeemReward,
    setCustomerTab,
    applyPromoCode,
    themeMode
  } = useApp();

  const nextTierPoints = 3000;
  const currentProgressPercent = Math.min(100, Math.round((loyaltyPoints / nextTierPoints) * 100));

  return (
    <div className="space-y-8 pb-20">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`font-heading font-extrabold text-2xl sm:text-3xl ${
            themeMode === 'warm' ? 'text-[#3d2b1f]' :
            themeMode === 'dark' ? 'text-[#f5f5f5]' :
            'text-[#1a1c1c]'
          }`}>
            Epicurean Loyalty Club
          </h1>
          <p className={`text-xs mt-0.5 ${
            themeMode === 'warm' ? 'text-[#6b5a4a]' :
            themeMode === 'dark' ? 'text-[#c4c4c4]' :
            'text-[#594139]'
          }`}>
            Earn 10 points for every $1 spent across all Umunthuhub-Foods partner venues.
          </p>
        </div>

        <button
          onClick={() => setCustomerTab('home')}
          className={`px-4 py-2 rounded-xl border text-xs font-bold shadow-sm transition-colors self-start sm:self-auto cursor-pointer ${
            themeMode === 'warm' ? 'bg-[#fffbf7] hover:bg-[#f5ede4] border-[#d4c4b8]/60 text-[#6b5a4a]' :
            themeMode === 'dark' ? 'bg-[#242625] hover:bg-[#2e302f] border-white/20 text-[#c4c4c4]' :
            'bg-white hover:bg-[#f3f3f3] border-[#e1bfb5]/60 text-[#594139]'
          }`}
        >
          Explore Menus & Earn Points
        </button>
      </div>

      {/* Digital Member Card & Tier Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Digital Membership Card (Gold Luxury Light Glass) */}
        <div className="md:col-span-6 relative rounded-3xl p-6 sm:p-7 overflow-hidden text-white shadow-2xl bg-gradient-to-br from-[#ab3500] via-[#c2410c] to-[#ff6b35] border border-white/30 flex flex-col justify-between min-h-[220px]">
          {/* Card background ambient glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-black/15 rounded-full blur-xl pointer-events-none" />

          {/* Top row */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[20px] fill-1">military_tech</span>
              </div>
              <span className="font-heading font-extrabold text-sm tracking-wide">EPICUREAN GOLD</span>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-black/25 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase">
              EN-8492-X9
            </span>
          </div>

          {/* Center points */}
          <div className="my-4 relative z-10">
            <p className="text-[11px] text-white/80 uppercase font-semibold tracking-wider">Available Balance</p>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                {loyaltyPoints.toLocaleString()}
              </span>
              <span className="text-sm font-bold text-amber-200">EPICUREAN PTS</span>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex items-end justify-between relative z-10 pt-2 border-t border-white/20">
            <div>
              <p className="text-[10px] text-white/70 uppercase">Cardholder</p>
              <p className="font-heading font-bold text-xs">Grayson Comrade</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/70 uppercase">VIP Multiplier</p>
              <p className="font-bold text-xs text-[#54fdc4]">1.5x Multi-Tenant</p>
            </div>
          </div>
        </div>

        {/* Tier Progress & Benefits Breakdown */}
        <div className={`md:col-span-6 glass-panel rounded-3xl p-6 border flex flex-col justify-between space-y-4 ${
          themeMode === 'warm' ? 'border-[#d4c4b8]/50' :
          themeMode === 'dark' ? 'border-white/20' :
          'border-[#e1bfb5]/50'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  themeMode === 'warm' ? 'text-[#6b5a4a]' :
                  themeMode === 'dark' ? 'text-[#c4c4c4]' :
                  'text-[#8d7168]'
                }`}>Tier Progression</span>
                <h3 className={`font-heading font-extrabold text-base ${
                  themeMode === 'warm' ? 'text-[#3d2b1f]' :
                  themeMode === 'dark' ? 'text-[#f5f5f5]' :
                  'text-[#1a1c1c]'
                }`}>Road to Platinum Tier</h3>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-800 text-xs font-bold border border-amber-300">
                {currentProgressPercent}% Complete
              </span>
            </div>

            {/* Progress bar */}
            <div className={`w-full h-3 rounded-full overflow-hidden my-3 ${
              themeMode === 'warm' ? 'bg-[#e9ddcf]' :
              themeMode === 'dark' ? 'bg-[#383a39]' :
              'bg-[#eeeeee]'
            }`}>
              <div
                style={{ width: `${currentProgressPercent}%` }}
                className="h-full bg-linear-to-r from-[#ff6b35] to-[#ab3500] rounded-full transition-all duration-700 shadow-sm"
              />
            </div>
            <p className={`text-xs ${
              themeMode === 'warm' ? 'text-[#6b5a4a]' :
              themeMode === 'dark' ? 'text-[#c4c4c4]' :
              'text-[#594139]'
            }`}>
              Earn <span className="font-bold text-[#ab3500]">{Math.max(0, nextTierPoints - loyaltyPoints)} more points</span> to unlock free monthly chef tastings and 0% delivery fees everywhere!
            </p>
          </div>

          {/* Tier Perks Grid */}
          <div className={`grid grid-cols-2 gap-2 pt-2 border-t text-xs ${
            themeMode === 'warm' ? 'border-t-[#d4c4b8]/40' :
            themeMode === 'dark' ? 'border-t-white/20' :
            'border-t-[#e1bfb5]/40'
          }`}>
            <div className={`flex items-center gap-2 p-2 rounded-xl border ${
              themeMode === 'warm' ? 'bg-[#fffbf7] border-[#d4c4b8]/40' :
              themeMode === 'dark' ? 'bg-[#242625] border-white/20' :
              'bg-[#f9f9f9] border-[#e1bfb5]/40'
            }`}>
              <span className="material-symbols-outlined text-[#00ae81] text-[18px]">check_circle</span>
              <span className={`font-semibold ${
                themeMode === 'warm' ? 'text-[#3d2b1f]' :
                themeMode === 'dark' ? 'text-[#f5f5f5]' :
                'text-[#1a1c1c]'
              }`}>Priority Driver Dispatch</span>
            </div>
            <div className={`flex items-center gap-2 p-2 rounded-xl border ${
              themeMode === 'warm' ? 'bg-[#fffbf7] border-[#d4c4b8]/40' :
              themeMode === 'dark' ? 'bg-[#242625] border-white/20' :
              'bg-[#f9f9f9] border-[#e1bfb5]/40'
            }`}>
              <span className="material-symbols-outlined text-[#00ae81] text-[18px]">check_circle</span>
              <span className={`font-semibold ${
                themeMode === 'warm' ? 'text-[#3d2b1f]' :
                themeMode === 'dark' ? 'text-[#f5f5f5]' :
                'text-[#1a1c1c]'
              }`}>Free Seasonal Desserts</span>
            </div>
          </div>
        </div>

      </div>

      {/* Rewards Catalog */}
      <section className="space-y-4">
        <div>
          <h2 className={`font-heading font-extrabold text-xl ${
            themeMode === 'warm' ? 'text-[#3d2b1f]' :
            themeMode === 'dark' ? 'text-[#f5f5f5]' :
            'text-[#1a1c1c]'
          }`}>
            Redeem Points for Culinary Perks
          </h2>
          <p className={`text-xs ${
            themeMode === 'warm' ? 'text-[#6b5a4a]' :
            themeMode === 'dark' ? 'text-[#c4c4c4]' :
            'text-[#594139]'
          }`}>Instantly convert your loyalty points into usable checkout discounts</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {loyaltyRewards.map(reward => {
            const canAfford = loyaltyPoints >= reward.pointsCost;
            return (
              <div
                key={reward.id}
                className={`glass-panel rounded-3xl p-5 border flex flex-col justify-between space-y-4 hover:shadow-lg transition-all ${
                  themeMode === 'warm' ? 'border-[#d4c4b8]/50' :
                  themeMode === 'dark' ? 'border-white/20' :
                  'border-[#e1bfb5]/50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#ff6b35]/15 text-[#ab3500] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">{reward.icon}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-xl text-[#ab3500] text-xs font-extrabold border ${
                      themeMode === 'warm' ? 'bg-[#f5ede4] border-[#d4c4b8]/50' :
                      themeMode === 'dark' ? 'bg-[#2e302f] border-white/20' :
                      'bg-[#f3f3f3] border-[#e1bfb5]/50'
                    }`}>
                      {reward.pointsCost} pts
                    </span>
                  </div>

                  <div>
                    <h4 className={`font-heading font-bold text-sm ${
                      themeMode === 'warm' ? 'text-[#3d2b1f]' :
                      themeMode === 'dark' ? 'text-[#f5f5f5]' :
                      'text-[#1a1c1c]'
                    }`}>
                      {reward.title}
                    </h4>
                    <p className={`text-xs mt-1 leading-relaxed ${
                      themeMode === 'warm' ? 'text-[#6b5a4a]' :
                      themeMode === 'dark' ? 'text-[#c4c4c4]' :
                      'text-[#594139]'
                    }`}>
                      {reward.description}
                    </p>
                  </div>
                </div>

                <div className={`pt-3 border-t ${
                  themeMode === 'warm' ? 'border-t-[#d4c4b8]/40' :
                  themeMode === 'dark' ? 'border-t-white/20' :
                  'border-t-[#e1bfb5]/40'
                }`}>
                  <button
                    onClick={() => {
                      const success = redeemReward(reward);
                      if (success) {
                        applyPromoCode(reward.promoCode);
                      }
                    }}
                    disabled={!canAfford}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      canAfford
                        ? 'glass-button-primary shadow-md shadow-[#ab3500]/20 active:scale-95'
                        : themeMode === 'warm' ? 'bg-[#f5ede4] text-[#6b5a4a] border border-[#d4c4b8]/50 cursor-not-allowed opacity-60' :
                        themeMode === 'dark' ? 'bg-[#2e302f] text-[#c4c4c4] border border-white/20 cursor-not-allowed opacity-60' :
                        'bg-[#f3f3f3] text-[#8d7168] border border-[#e1bfb5]/50 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <span>{canAfford ? 'Redeem & Apply' : `Need ${reward.pointsCost - loyaltyPoints} pts`}</span>
                    {canAfford && <span className="material-symbols-outlined text-[16px]">arrow_forward</span>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Culinary Challenges */}
      <section className={`glass-panel rounded-3xl p-6 border space-y-4 ${
        themeMode === 'warm' ? 'border-[#d4c4b8]/50' :
        themeMode === 'dark' ? 'border-white/20' :
        'border-[#e1bfb5]/50'
      }`}>
        <div>
          <h3 className={`font-heading font-extrabold text-base flex items-center gap-2 ${
            themeMode === 'warm' ? 'text-[#3d2b1f]' :
            themeMode === 'dark' ? 'text-[#f5f5f5]' :
            'text-[#1a1c1c]'
          }`}>
            <span className="material-symbols-outlined text-[#006c4f] text-[22px]">trophy</span>
            Weekly Culinary Challenges
          </h3>
          <p className={`text-xs ${
            themeMode === 'warm' ? 'text-[#6b5a4a]' :
            themeMode === 'dark' ? 'text-[#c4c4c4]' :
            'text-[#594139]'
          }`}>Complete interactive missions to boost your point multipliers</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={`p-4 rounded-2xl border space-y-2 ${
            themeMode === 'warm' ? 'bg-[#fffbf7] border-[#d4c4b8]/40' :
            themeMode === 'dark' ? 'bg-[#242625] border-white/20' :
            'bg-[#f9f9f9] border-[#e1bfb5]/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`font-heading font-bold text-xs ${
                themeMode === 'warm' ? 'text-[#3d2b1f]' :
                themeMode === 'dark' ? 'text-[#f5f5f5]' :
                'text-[#1a1c1c]'
              }`}>Organic Healthy Bowl Streak</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#00ae81]/15 text-[#006c4f]">
                +250 PTS
              </span>
            </div>
            <p className={`text-[11px] ${
              themeMode === 'warm' ? 'text-[#6b5a4a]' :
              themeMode === 'dark' ? 'text-[#c4c4c4]' :
              'text-[#594139]'
            }`}>Order 3 farm-to-table bowls from The Green Bistro this week</p>
            <div className={`w-full h-2 rounded-full overflow-hidden ${
              themeMode === 'warm' ? 'bg-[#e9ddcf]' :
              themeMode === 'dark' ? 'bg-[#383a39]' :
              'bg-[#eeeeee]'
            }`}>
              <div className="w-2/3 h-full bg-[#00ae81] rounded-full" />
            </div>
            <span className={`text-[10px] font-bold ${
              themeMode === 'warm' ? 'text-[#6b5a4a]' :
              themeMode === 'dark' ? 'text-[#c4c4c4]' :
              'text-[#8d7168]'
            }`}>2 of 3 Completed (66%)</span>
          </div>

          <div className={`p-4 rounded-2xl border space-y-2 ${
            themeMode === 'warm' ? 'bg-[#fffbf7] border-[#d4c4b8]/40' :
            themeMode === 'dark' ? 'bg-[#242625] border-white/20' :
            'bg-[#f9f9f9] border-[#e1bfb5]/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`font-heading font-bold text-xs ${
                themeMode === 'warm' ? 'text-[#3d2b1f]' :
                themeMode === 'dark' ? 'text-[#f5f5f5]' :
                'text-[#1a1c1c]'
              }`}>Multi-Tenant Flavor Explorer</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#24619d]/15 text-[#24619d]">
                +400 PTS
              </span>
            </div>
            <p className={`text-[11px] ${
              themeMode === 'warm' ? 'text-[#6b5a4a]' :
              themeMode === 'dark' ? 'text-[#c4c4c4]' :
              'text-[#594139]'
            }`}>Try food from 3 different partner kitchens this month</p>
            <div className={`w-full h-2 rounded-full overflow-hidden ${
              themeMode === 'warm' ? 'bg-[#e9ddcf]' :
              themeMode === 'dark' ? 'bg-[#383a39]' :
              'bg-[#eeeeee]'
            }`}>
              <div className="w-3/3 h-full bg-[#24619d] rounded-full" />
            </div>
            <span className="text-[10px] text-[#006c4f] font-bold">✓ Mission Completed (+400 PTS Awarded!)</span>
          </div>
        </div>
      </section>

    </div>
  );
};
