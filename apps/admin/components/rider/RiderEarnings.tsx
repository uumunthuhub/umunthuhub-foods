'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Medal } from 'lucide-react';

export const RiderEarnings: React.FC = () => {
  const { showToast, themeMode } = useApp();

  const [isCashingOut, setIsCashingOut] = useState(false);
  const [balance, setBalance] = useState(482.50);

  const handleInstantCashout = () => {
    if (balance <= 0) return;
    setIsCashingOut(true);
    setTimeout(() => {
      showToast('Instant Cash-out Initiated', `$${balance.toFixed(2)} transferred to Chase Debit Card ending in ••8812`, 'success');
      setBalance(0);
      setIsCashingOut(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl">
      
      {/* Header & Wallet Balance */}
      <div className={`rounded-3xl p-6 sm:p-8 border flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>
        <div>
          <span className={`text-xs font-bold uppercase tracking-wider ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
          }`}>Available Balance for Instant Transfer</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#006c4f]">
              ${balance.toFixed(2)}
            </span>
            <span className={`text-xs font-bold ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>USD</span>
          </div>
          <p className={`text-xs mt-1 ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>
            Includes $94.00 customer tips (100% kept by driver)
          </p>
        </div>

        <button
          onClick={handleInstantCashout}
          disabled={balance <= 0 || isCashingOut}
          className="px-6 py-3.5 rounded-2xl glass-button-primary font-heading font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#ab3500]/25 cursor-pointer disabled:opacity-50"
        >
          <Building2 className="w-[20px] h-[20px]" />
          <span>{isCashingOut ? 'Transferring...' : 'Instant Cash Out ($0.50 fee)'}</span>
        </button>
      </div>

      {/* Quest Bonuses Section */}
      <div className={`rounded-3xl p-6 border space-y-4 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>
        <div>
          <h3 className={`font-heading font-extrabold text-base flex items-center gap-2 ${
            themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
          }`}>
            <Medal className="text-[#ab3500] w-[22px] h-[22px]" />
            Weekly Driver Surge Quests
          </h3>
          <p className={`text-xs ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>Complete milestone deliveries during lunch/dinner rushes to unlock cash multipliers</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={`p-4 rounded-2xl border space-y-2 ${
            themeMode === 'dark'
              ? 'bg-[#383a39] border-[#3a3a3a]'
              : 'bg-[#f9f9f9] border-[#e1bfb5]/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`font-heading font-bold text-xs ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
              }`}>Weekend Rush Warrior</span>
              <span className="text-xs font-extrabold text-[#006c4f] bg-[#00ae81]/15 px-2 py-0.5 rounded-md">
                +$40.00 BONUS
              </span>
            </div>
            <p className={`text-[11px] ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
            }`}>Complete 15 deliveries between Friday 5 PM and Sunday 10 PM</p>
            <div className="w-full h-2.5 bg-[#eeeeee] rounded-full overflow-hidden">
              <div className="w-4/5 h-full bg-[#00ae81] rounded-full" />
            </div>
            <span className={`text-[10px] font-bold ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
            }`}>12 of 15 Deliveries (80%)</span>
          </div>

          <div className={`p-4 rounded-2xl border space-y-2 ${
            themeMode === 'dark'
              ? 'bg-[#383a39] border-[#3a3a3a]'
              : 'bg-[#f9f9f9] border-[#e1bfb5]/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`font-heading font-bold text-xs ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
              }`}>Five-Star Streak</span>
              <span className="text-xs font-extrabold text-[#24619d] bg-[#24619d]/15 px-2 py-0.5 rounded-md">
                +$15.00 BONUS
              </span>
            </div>
            <p className={`text-[11px] ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
            }`}>Maintain a 5.0 rating across 10 consecutive trips</p>
            <div className="w-full h-2.5 bg-[#eeeeee] rounded-full overflow-hidden">
              <div className="w-full h-full bg-[#24619d] rounded-full" />
            </div>
            <span className="text-[10px] text-[#006c4f] font-bold">✓ Quest Complete! (Bonus Claimed)</span>
          </div>
        </div>
      </div>

      {/* Weekly Ledger Breakdown */}
      <div className={`rounded-3xl p-6 border space-y-4 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>
        <h3 className={`font-heading font-extrabold text-base ${
          themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
        }`}>
          Weekly Earnings Activity
        </h3>

        <div className="space-y-2 text-xs">
          {[
            { day: 'Today (Tuesday)', trips: 6, fares: '$54.00', tips: '$30.50', total: '$84.50' },
            { day: 'Yesterday (Monday)', trips: 9, fares: '$78.00', tips: '$34.00', total: '$112.00' },
            { day: 'Sunday', trips: 14, fares: '$126.00', tips: '$52.00', total: '$178.00' },
            { day: 'Saturday', trips: 12, fares: '$108.00', tips: '$45.00', total: '$153.00' },
          ].map((row, i) => (
            <div key={i} className={`p-3.5 rounded-2xl border flex items-center justify-between ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a]'
                : 'bg-[#f9f9f9] border-[#e1bfb5]/40'
            }`}>
              <div>
                <p className={`font-bold ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>{row.day}</p>
                <p className={`text-[11px] ${
                  themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                }`}>{row.trips} trips • Base fare: {row.fares} • Tips: {row.tips}</p>
              </div>
              <span className="font-heading font-extrabold text-sm text-[#006c4f]">{row.total}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
