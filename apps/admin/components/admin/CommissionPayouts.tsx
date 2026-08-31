'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard } from 'lucide-react';

export const CommissionPayouts: React.FC = () => {
  const { tenants, orders, showToast, themeMode } = useApp();

  const [isProcessingACH, setIsProcessingACH] = useState(false);

  const handleRunPayoutBatch = () => {
    setIsProcessingACH(true);
    setTimeout(() => {
      showToast('ACH Clearing Completed', '$12,480.00 successfully distributed across all active kitchen bank accounts', 'success');
      setIsProcessingACH(false);
    }, 1400);
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      
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
              Commission Ledger & Merchant Settlements
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00ae81]/15 text-[#006c4f]">
              Escrow Automated
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>
            Automated Stripe Connect & ACH split payouts between restaurants, riders, and Umunthuhub-Foods platform
          </p>
        </div>

        <button
          onClick={handleRunPayoutBatch}
          disabled={isProcessingACH}
          className="px-5 py-3 rounded-2xl glass-button-primary font-heading font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#ab3500]/25 cursor-pointer disabled:opacity-50 self-start sm:self-auto"
        >
          <CreditCard className="w-[20px] h-[20px]" />
          <span>{isProcessingACH ? 'Processing ACH...' : 'Initiate Weekly ACH Settlement'}</span>
        </button>
      </div>

      {/* Settlement Allocation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className={`rounded-3xl p-5 border space-y-1 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wider ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
          }`}>Merchant Share (85%)</span>
          <p className={`font-heading font-extrabold text-2xl ${
            themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
          }`}>$98,420.00</p>
          <p className="text-[11px] text-[#006c4f]">Pending release to 6 restaurants</p>
        </div>

        <div className={`rounded-3xl p-5 border space-y-1 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wider ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
          }`}>Umunthuhub Platform Commission (12%)</span>
          <p className="font-heading font-extrabold text-2xl text-[#006c4f]">$14,210.00</p>
          <p className={`text-[11px] ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>Net revenue retained</p>
        </div>

        <div className={`rounded-3xl p-5 border space-y-1 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wider ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
          }`}>Courier Pool & Tips (3%+)</span>
          <p className="font-heading font-extrabold text-2xl text-[#24619d]">$7,820.00</p>
          <p className={`text-[11px] ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>100% delivered to couriers</p>
        </div>
      </div>

      {/* Merchant Settlement Ledger Table */}
      <div className={`rounded-3xl p-6 border space-y-4 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>
        <h3 className={`font-heading font-extrabold text-base ${
          themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
        }`}>
          Tenant Settlement Breakdown (Current Cycle)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b ${
                themeMode === 'dark' ? 'border-[#3a3a3a]/50 text-[#7a7a7a]' : 'border-[#e1bfb5]/50 text-[#8d7168]'
              }`}>
                <th className="pb-3 font-bold">Restaurant Tenant</th>
                <th className="pb-3 font-bold">Gross Orders</th>
                <th className="pb-3 font-bold">Platform Fee (12%)</th>
                <th className="pb-3 font-bold">Net Payout</th>
                <th className="pb-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              themeMode === 'dark' ? 'divide-[#3a3a3a]/30' : 'divide-[#e1bfb5]/30'
            }`}>
              {tenants.map(t => {
                const gmv = t.monthlyRevenue || 14500;
                const fee = gmv * ((t.commissionRate ?? 12) / 100);
                const net = gmv - fee;
                return (
                  <tr key={t.id} className={`transition-colors ${
                    themeMode === 'dark' ? 'hover:bg-[#383a39]/80' : 'hover:bg-[#f9f9f9]/80'
                  }`}>
                    <td className="py-3.5 flex items-center gap-2.5">
                      <img src={t.logo} alt={t.name} className="w-8 h-8 rounded-xl object-cover" />
                      <div>
                        <p className={`font-bold ${
                          themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                        }`}>{t.name}</p>
                        <p className={`text-[10px] ${
                          themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                        }`}>{t.phone}</p>
                      </div>
                    </td>
                    <td className={`py-3.5 font-semibold ${
                      themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                    }`}>${gmv.toLocaleString()}</td>
                    <td className="py-3.5 font-semibold text-[#ba1a1a]">-${fee.toFixed(2)}</td>
                    <td className="py-3.5 font-bold text-[#006c4f]">${net.toLocaleString()}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00ae81]/15 text-[#006c4f]">
                        READY FOR ACH
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
