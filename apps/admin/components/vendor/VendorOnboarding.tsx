'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck } from 'lucide-react';

export const VendorOnboarding: React.FC = () => {
  const { currentTenant, showToast, themeMode } = useApp();

  const [tagline, setTagline] = useState(currentTenant.tagline);
  const [phone, setPhone] = useState(currentTenant.phone);
  const [address, setAddress] = useState(currentTenant.address);
  const [minOrder, setMinOrder] = useState(currentTenant.minOrder.toString());
  const [deliveryFee, setDeliveryFee] = useState(currentTenant.deliveryFee.toString());
  const [prepTime, setPrepTime] = useState(currentTenant.prepTimeAvg.toString());

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Store Profile Updated', 'Operating parameters synchronized with customer apps', 'success');
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      
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
              Store Profile & Compliance
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00ae81]/15 text-[#006c4f]">
              KYC Verified
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>
            Configure restaurant dispatch radius, legal licenses, and customer-facing identity
          </p>
        </div>

        <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border self-start sm:self-auto ${
          themeMode === 'dark'
            ? 'bg-[#383a39] text-[#f5f5f5] border-[#3a3a3a]'
            : 'bg-[#f3f3f3] text-[#1a1c1c] border-[#e1bfb5]/60'
        }`}>
          ID: {currentTenant.id}
        </span>
      </div>

      {/* Compliance & Verification Banner */}
      <div className={`rounded-3xl p-5 border flex items-center justify-between gap-4 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#00ae81]/30'
          : 'glass-panel border-[#00ae81]/30 bg-[#00ae81]/5'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#00ae81]/20 text-[#006c4f] flex items-center justify-center shrink-0">
            <ShieldCheck className="text-2xl" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-xs text-[#006c4f]">Grade A Food Safety Certified</h4>
            <p className={`text-[11px] ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
            }`}>All commercial kitchen permits and sanitation certificates are up to date.</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#006c4f] border-b border-[#006c4f] cursor-pointer">
          View Certificate
        </span>
      </div>

      {/* Profile Editor Form */}
      <form onSubmit={handleSaveProfile} className={`rounded-3xl p-6 sm:p-8 border space-y-6 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>
        <h3 className={`font-heading font-extrabold text-base pb-2 border-b ${
          themeMode === 'dark' ? 'text-[#f5f5f5] border-[#3a3a3a]/40' : 'text-[#1a1c1c] border-[#e1bfb5]/40'
        }`}>
          General Venue Parameters
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div>
            <label className={`font-bold block mb-1 ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>Restaurant Legal Name</label>
            <input
              type="text"
              disabled
              value={currentTenant.name}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] text-[#7a7a7a]'
                  : 'bg-[#f3f3f3] text-[#8d7168]'
              }`}
            />
          </div>

          <div>
            <label className={`font-bold block mb-1 ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>Cuisine Genre</label>
            <input
              type="text"
              disabled
              value={currentTenant.cuisine}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] text-[#7a7a7a]'
                  : 'bg-[#f3f3f3] text-[#8d7168]'
              }`}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={`font-bold block mb-1 ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>Public Tagline / Hero Description</label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                  : 'glass-input'
              }`}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={`font-bold block mb-1 ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>Physical Kitchen Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                  : 'glass-input'
              }`}
            />
          </div>

          <div>
            <label className={`font-bold block mb-1 ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>Contact Phone</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                  : 'glass-input'
              }`}
            />
          </div>

          <div>
            <label className={`font-bold block mb-1 ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>Average Prep Time (Minutes)</label>
            <input
              type="number"
              min="5"
              max="60"
              required
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                  : 'glass-input'
              }`}
            />
          </div>

          <div>
            <label className={`font-bold block mb-1 ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>Min. Order Threshold ($)</label>
            <input
              type="number"
              step="1"
              min="0"
              required
              value={minOrder}
              onChange={(e) => setMinOrder(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                  : 'glass-input'
              }`}
            />
          </div>

          <div>
            <label className={`font-bold block mb-1 ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>Delivery Fee Charged ($)</label>
            <input
              type="number"
              step="0.50"
              min="0"
              required
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                  : 'glass-input'
              }`}
            />
          </div>
        </div>

        {/* Bank Payout Account */}
        <div className={`pt-4 border-t space-y-3 ${
          themeMode === 'dark' ? 'border-[#3a3a3a]/40' : 'border-[#e1bfb5]/40'
        }`}>
          <h4 className={`font-heading font-bold text-sm ${
            themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
          }`}>Direct Deposit Bank Account</h4>
          <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs ${
            themeMode === 'dark'
              ? 'bg-[#383a39] border-[#3a3a3a]'
              : 'bg-[#f9f9f9] border-[#e1bfb5]/50'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#24619d]/15 text-[#24619d] flex items-center justify-center font-bold">
                🏛️
              </div>
              <div>
                <p className={`font-bold ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>JPMorgan Chase Bank (Checking •••• 8812)</p>
                <p className={`text-[11px] ${
                  themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                }`}>Daily automatic clearing at midnight (T+1 Settlement)</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#00ae81]/15 text-[#006c4f] font-bold text-[10px]">
              VERIFIED
            </span>
          </div>
        </div>

        <div className={`pt-4 border-t flex justify-end ${
          themeMode === 'dark' ? 'border-[#3a3a3a]/40' : 'border-[#e1bfb5]/40'
        }`}>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl glass-button-primary font-heading font-bold text-xs shadow-md shadow-[#ab3500]/25 cursor-pointer"
          >
            Save Venue Configuration
          </button>
        </div>
      </form>

    </div>
  );
};
