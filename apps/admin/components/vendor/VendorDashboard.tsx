'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Pause, ChefHat, CreditCard, TrendingUp, Gauge, Star, Receipt } from 'lucide-react';

export const VendorDashboard: React.FC = () => {
  const {
    currentTenant,
    orders,
    setVendorTab,
    updateOrderStatus,
    showToast,
    themeMode
  } = useApp();

  const [isKitchenPaused, setIsKitchenPaused] = useState(false);
  const [prepMultiplier, setPrepMultiplier] = useState(1);

  const tenantOrders = orders.filter(o => o.tenantId === currentTenant.id);
  const activeOrders = tenantOrders.filter(o => o.status === 'incoming' || o.status === 'cooking' || o.status === 'ready');
  const completedToday = tenantOrders.filter(o => o.status === 'delivered');

  const totalGMVToday = tenantOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Header & Store Status Bar */}
      <div className={`rounded-3xl p-6 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>
        <div className="flex items-center gap-4">
          <img
            src={currentTenant.logo}
            alt={currentTenant.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`font-heading font-extrabold text-xl sm:text-2xl ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
                {currentTenant.name}
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                isKitchenPaused 
                  ? 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/30' 
                  : 'bg-[#00ae81]/15 text-[#006c4f] border border-[#00ae81]/30'
              }`}>
                {isKitchenPaused ? 'PAUSED' : 'ONLINE & ACCEPTING'}
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
            }`}>{currentTenant.cuisine} • {currentTenant.address}</p>
          </div>
        </div>

        {/* Live Kitchen Controls */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => {
              setIsKitchenPaused(!isKitchenPaused);
              showToast(
                isKitchenPaused ? 'Kitchen Resumed' : 'Kitchen Paused',
                isKitchenPaused ? 'Now accepting new inbound customer orders' : 'Inbound orders temporarily paused',
                isKitchenPaused ? 'success' : 'warning'
              );
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
              isKitchenPaused
                ? 'bg-[#006c4f] text-white border-[#006c4f]'
                : 'bg-[#ffdad6] text-[#ba1a1a] border-[#ba1a1a]/30 hover:bg-[#ffb4ab]'
            }`}
          >
            {isKitchenPaused ? <Play className="w-[16px] h-[16px]" /> : <Pause className="w-[16px] h-[16px]" />}
            <span>{isKitchenPaused ? 'Resume Kitchen' : 'Pause Orders (Rush)'}</span>
          </button>

          <button
            onClick={() => setVendorTab('kds')}
            className="px-4 py-2 rounded-xl bg-[#24619d] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#24619d]/20 hover:bg-[#1a4a7a] transition-all cursor-pointer"
          >
            <ChefHat className="w-[18px] h-[18px]" />
            <span>Open KDS Board ({activeOrders.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Gross Sales Today */}
        <div className={`rounded-3xl p-5 border space-y-2 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
            }`}>Today's Gross Sales</span>
            <div className="w-8 h-8 rounded-xl bg-[#00ae81]/15 text-[#006c4f] flex items-center justify-center">
              <CreditCard className="w-[18px] h-[18px]" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`font-heading font-extrabold text-2xl ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              ${totalGMVToday.toFixed(2)}
            </span>
            <span className="text-[11px] font-bold text-[#006c4f] flex items-center">
              <TrendingUp className="w-[14px] h-[14px]" /> +14.2%
            </span>
          </div>
          <p className={`text-[11px] ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>{tenantOrders.length} processed orders</p>
        </div>

        {/* Active In-Flight Orders */}
        <div className={`rounded-3xl p-5 border space-y-2 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
            }`}>Active KDS Tickets</span>
            <div className="w-8 h-8 rounded-xl bg-[#ff6b35]/15 text-[#ab3500] flex items-center justify-center">
              <ChefHat className="w-[18px] h-[18px]" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-2xl text-[#ab3500]">
              {activeOrders.length}
            </span>
            <span className={`text-[11px] ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
            }`}>live in line</span>
          </div>
          <p className={`text-[11px] ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>
            {tenantOrders.filter(o => o.status === 'incoming').length} incoming, {tenantOrders.filter(o => o.status === 'cooking').length} cooking
          </p>
        </div>

        {/* Average Prep Speed */}
        <div className={`rounded-3xl p-5 border space-y-2 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
            }`}>Avg Prep Speed</span>
            <div className="w-8 h-8 rounded-xl bg-[#24619d]/15 text-[#24619d] flex items-center justify-center">
              <Gauge className="w-[18px] h-[18px]" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`font-heading font-extrabold text-2xl ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              {currentTenant.prepTimeAvg} mins
            </span>
            <span className="text-[11px] font-bold text-[#006c4f]">⚡ Fast</span>
          </div>
          <p className={`text-[11px] ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>Target: &lt; 18 mins standard</p>
        </div>

        {/* Store Quality Rating */}
        <div className={`rounded-3xl p-5 border space-y-2 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
            }`}>Kitchen Rating</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center">
              <Star className="w-[18px] h-[18px] fill-current" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`font-heading font-extrabold text-2xl ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              {currentTenant.rating} ★
            </span>
            <span className={`text-[11px] ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
            }`}>({currentTenant.reviewsCount} reviews)</span>
          </div>
          <p className="text-[11px] text-[#006c4f] font-semibold">99.2% order accuracy</p>
        </div>

      </div>

      {/* Hourly Sales & Volume Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Hourly Volume Simulated Graph */}
        <div className={`lg:col-span-7 rounded-3xl p-6 border space-y-4 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`font-heading font-bold text-sm ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
              }`}>
                Hourly Demand & Kitchen Velocity
              </h3>
              <p className={`text-xs ${
                themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
              }`}>Peak rush detected between 11:30 AM – 1:45 PM</p>
            </div>
            <span className="text-xs font-bold text-[#ab3500] bg-[#ff6b35]/15 px-2.5 py-1 rounded-xl">
              Lunch Rush Peak
            </span>
          </div>

          {/* Bar Chart Simulation */}
          <div className={`h-44 flex items-end justify-between gap-2 pt-6 px-2 border-b ${
            themeMode === 'dark' ? 'border-[#3a3a3a]/40' : 'border-[#e1bfb5]/40'
          }`}>
            {[
              { time: '9 AM', height: '25%', count: 4 },
              { time: '10 AM', height: '40%', count: 7 },
              { time: '11 AM', height: '85%', count: 16 },
              { time: '12 PM', height: '100%', count: 22 },
              { time: '1 PM', height: '90%', count: 19 },
              { time: '2 PM', height: '50%', count: 9 },
              { time: '3 PM', height: '35%', count: 6 },
              { time: '4 PM', height: '30%', count: 5 },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                <span className={`text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity ${
                  themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                }`}>
                  {bar.count}
                </span>
                <div 
                  style={{ height: bar.height }}
                  className={`w-full rounded-t-xl group-hover:brightness-110 transition-all shadow-sm ${
                    themeMode === 'dark'
                      ? 'bg-linear-to-t from-[#8f2c00] to-[#cc5a1a]'
                      : 'bg-linear-to-t from-[#ab3500] to-[#ff6b35]'
                  }`}
                />
                <span className={`text-[10px] font-medium mt-1 whitespace-nowrap ${
                  themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                }`}>{bar.time}</span>
              </div>
            ))}
          </div>

          <div className={`flex items-center justify-between text-xs pt-2 ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>
            <span>🟢 System status: Operating normally</span>
            <span className={`font-semibold ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>Total Today: $3,840.50 GMV</span>
          </div>
        </div>

        {/* Live Inbound Order Feed */}
        <div className={`lg:col-span-5 rounded-3xl p-6 border space-y-4 flex flex-col justify-between ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className={`font-heading font-bold text-sm flex items-center gap-2 ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
              }`}>
                <Receipt className="text-[#ab3500] w-[20px] h-[20px]" />
                Live Kitchen Tickets
              </h3>
              <span className={`text-xs ${
                themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
              }`}>{tenantOrders.length} total today</span>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {tenantOrders.slice(0, 4).map(order => (
                <div
                  key={order.id}
                  className={`p-3.5 rounded-2xl border space-y-2 transition-colors ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a]/40 hover:bg-[#4a4a4a]'
                      : 'bg-[#f9f9f9] border-[#e1bfb5]/40 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono font-bold text-xs ${
                      themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                    }`}>{order.orderNumber}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                      order.status === 'incoming' ? 'bg-[#ffdad6] text-[#ba1a1a]' :
                      order.status === 'cooking' ? 'bg-amber-100 text-amber-900' :
                      order.status === 'ready' ? 'bg-[#00ae81]/15 text-[#006c4f]' :
                      themeMode === 'dark' ? 'bg-[#383a39] text-[#7a7a7a]' : 'bg-[#f3f3f3] text-[#8d7168]'
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  <p className={`text-xs truncate ${
                    themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
                  }`}>
                    {order.customerName} • {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="font-extrabold text-[#ab3500]">${order.total.toFixed(2)}</span>
                    
                    {order.status === 'incoming' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'cooking')}
                        className="px-3 py-1 rounded-lg bg-[#ab3500] text-white text-[11px] font-bold hover:bg-[#8f2c00]"
                      >
                        Accept & Cook
                      </button>
                    )}
                    {order.status === 'cooking' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="px-3 py-1 rounded-lg bg-[#006c4f] text-white text-[11px] font-bold hover:bg-[#00523b]"
                      >
                        Mark Ready
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                        className="px-3 py-1 rounded-lg bg-[#24619d] text-white text-[11px] font-bold"
                      >
                        Hand to Driver
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setVendorTab('kds')}
            className={`w-full py-2.5 rounded-xl text-xs font-bold text-center transition-colors border ${
              themeMode === 'dark'
                ? 'bg-[#383a39] hover:bg-[#4a4a4a] text-[#c4c4c4] border-[#3a3a3a]'
                : 'bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#1a1c1c] border-[#e1bfb5]/60'
            }`}
          >
            Launch Fullscreen KDS Mode →
          </button>
        </div>

      </div>

    </div>
  );
};
