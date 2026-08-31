'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlusCircle, Ticket, X } from 'lucide-react';
import { Promotion } from '@umunthuhub/shared-types';

export const VendorPromotions: React.FC = () => {
  const {
    currentTenant,
    promotions,
    togglePromotionStatus,
    createPromotion,
    showToast,
    themeMode
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState('20');
  const [minOrder, setMinOrder] = useState('25');
  const [targetAudience, setTargetAudience] = useState<Promotion['targetAudience']>('All Customers');

  const tenantPromos = promotions.filter(p => p.tenantId === currentTenant.id);

  const totalPromoRevenue = tenantPromos.reduce((sum, p) => sum + p.revenueGenerated, 0);
  const totalPromoOrders = tenantPromos.reduce((sum, p) => sum + p.usageCount, 0);

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    createPromotion({
      tenantId: currentTenant.id,
      code: code.toUpperCase().trim(),
      description,
      discountType,
      discountValue: parseFloat(discountValue) || 10,
      minOrder: parseFloat(minOrder) || 15,
      usageLimit: 500,
      expiresAt: '2026-12-31',
      isActive: true,
      targetAudience
    });

    setIsModalOpen(false);
    setCode('');
    setDescription('');
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className={`rounded-3xl p-6 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`font-heading font-extrabold text-xl sm:text-2xl ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              Promotions & Growth Campaigns
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00ae81]/15 text-[#006c4f]">
              {tenantPromos.filter(p => p.isActive).length} Active Deals
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>
            Boost repeat customer frequency and average ticket sizes with targeted promo codes
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl glass-button-primary font-heading font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#ab3500]/25 cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-[18px] h-[18px]" />
          <span>Create Promotion</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className={`rounded-3xl p-5 border space-y-1 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wider ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
          }`}>Revenue Influenced</span>
          <p className="font-heading font-extrabold text-2xl text-[#006c4f]">
            ${totalPromoRevenue.toLocaleString()}
          </p>
          <p className={`text-[11px] ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>From promo code redemptions</p>
        </div>

        <div className={`rounded-3xl p-5 border space-y-1 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wider ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
          }`}>Total Redemptions</span>
          <p className={`font-heading font-extrabold text-2xl ${
            themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
          }`}>
            {totalPromoOrders} orders
          </p>
          <p className={`text-[11px] ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>14.2% conversion rate</p>
        </div>

        <div className={`rounded-3xl p-5 border space-y-1 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wider ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
          }`}>Avg. Lift on Ticket Size</span>
          <p className="font-heading font-extrabold text-2xl text-[#ab3500]">
            +$8.40
          </p>
          <p className={`text-[11px] ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>Higher min-order basket size</p>
        </div>
      </div>

      {/* Promotions List */}
      <div className={`rounded-3xl p-6 border space-y-4 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>
        <h3 className={`font-heading font-extrabold text-base ${
          themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
        }`}>
          Active & Scheduled Promo Codes
        </h3>

        <div className="space-y-3">
          {tenantPromos.map(promo => (
            <div
              key={promo.id}
              className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] border-[#3a3a3a] hover:bg-[#4a4a4a]'
                  : 'bg-[#f9f9f9] border-[#e1bfb5]/40 hover:bg-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#ff6b35]/15 text-[#ab3500] flex items-center justify-center shrink-0">
                  <Ticket className="w-[22px] h-[22px]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono font-extrabold text-sm tracking-wider ${
                      themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                    }`}>
                      {promo.code}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                      themeMode === 'dark'
                        ? 'bg-[#383a39] text-[#c4c4c4] border-[#3a3a3a]'
                        : 'bg-[#f3f3f3] text-[#594139] border-[#e1bfb5]/40'
                    }`}>
                      {promo.targetAudience}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      promo.isActive ? 'bg-[#00ae81]/15 text-[#006c4f]' : 'bg-[#ffdad6] text-[#ba1a1a]'
                    }`}>
                      {promo.isActive ? 'ACTIVE' : 'PAUSED'}
                    </span>
                  </div>
                  <p className={`text-xs mt-0.5 ${
                    themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
                  }`}>{promo.description}</p>
                  <p className={`text-[11px] mt-1 ${
                    themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                  }`}>
                    Min order ${promo.minOrder.toFixed(2)} • Expires {promo.expiresAt}
                  </p>
                </div>
              </div>

              {/* Stats & Toggle */}
              <div className={`flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0 border-t md:border-t-0 ${
                themeMode === 'dark' ? 'border-[#3a3a3a]/30' : 'border-[#e1bfb5]/30'
              }`}>
                <div className="text-right text-xs">
                  <p className={`font-bold ${
                    themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                  }`}>{promo.usageCount} / {promo.usageLimit} redeemed</p>
                  <p className="text-[11px] text-[#006c4f] font-semibold">${promo.revenueGenerated.toFixed(2)} GMV generated</p>
                </div>

                <button
                  onClick={() => {
                    togglePromotionStatus(promo.id);
                    showToast('Promotion Toggled', `Coupon ${promo.code} is now ${promo.isActive ? 'paused' : 'active'}`, 'info');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    promo.isActive
                      ? 'bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ffb4ab]'
                      : 'bg-[#00ae81] text-white hover:bg-[#00523b]'
                  }`}
                >
                  {promo.isActive ? 'Pause Code' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Promotion Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsModalOpen(false)} />
          <div className={`relative w-full max-w-md rounded-3xl p-6 shadow-2xl border animate-in fade-in zoom-in-95 ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]'
              : 'bg-white border-[#e1bfb5]'
          }`}>
            <div className={`flex items-center justify-between pb-3 border-b mb-4 ${
              themeMode === 'dark' ? 'border-[#3a3a3a]/40' : 'border-[#e1bfb5]/40'
            }`}>
              <h3 className={`font-heading font-extrabold text-base ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
              }`}>Create Coupon Code</h3>
              <button onClick={() => setIsModalOpen(false)} className={`w-8 h-8 rounded-full flex items-center justify-center ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] text-[#c4c4c4]'
                  : 'bg-[#f3f3f3] text-[#594139]'
              }`}>
                <X className="w-[18px] h-[18px]" />
              </button>
            </div>

            <form onSubmit={handleCreatePromo} className="space-y-4 text-xs">
              <div>
                <label className={`font-bold block mb-1 ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>Coupon Code (Uppercase)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FLASH30"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className={`w-full px-3.5 py-2 rounded-xl uppercase font-mono font-bold ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                      : 'glass-input'
                  }`}
                />
              </div>

              <div>
                <label className={`font-bold block mb-1 ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>Promo Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 20% off all dinners this weekend"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full glass-input px-3.5 py-2 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1a1c1c] block mb-1">Discount Type</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full glass-input px-3 py-2 rounded-xl bg-white font-semibold"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Dollar ($)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#1a1c1c] block mb-1">Discount Value</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-full glass-input px-3.5 py-2 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1a1c1c] block mb-1">Min. Order ($)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    className="w-full glass-input px-3.5 py-2 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1a1c1c] block mb-1">Audience</label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value as any)}
                    className="w-full glass-input px-3 py-2 rounded-xl bg-white font-semibold"
                  >
                    <option value="All Customers">All Customers</option>
                    <option value="First-Time">First-Time</option>
                    <option value="VIP Loyalty">VIP Loyalty</option>
                    <option value="Late Night">Late Night</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e1bfb5]/40 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-[#f3f3f3] text-xs font-bold text-[#594139]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl glass-button-primary text-xs font-bold shadow-md"
                >
                  Launch Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
