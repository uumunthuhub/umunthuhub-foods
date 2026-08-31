'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Power, Play, Navigation, Radar, PowerOff, RefreshCw } from 'lucide-react';

export const RiderDashboard: React.FC = () => {
  const {
    orders,
    activeOrder,
    acceptRiderJob,
    setRiderTab,
    showToast,
    themeMode
  } = useApp();

  const [riderOnline, setRiderOnline] = useState(true);
  const [shiftHours, setShiftHours] = useState('3h 45m');
  const [shiftEarnings, setShiftEarnings] = useState(84.50);
  const [completedTripsCount, setCompletedTripsCount] = useState(6);

  // Available dispatch trips looking for courier
  const availableTrips = orders.filter(o => o.status === 'cooking' || o.status === 'ready');

  return (
    <div className="space-y-6 pb-20 max-w-5xl w-full">
      
      {/* Rider Status & Online Toggle Card */}
      <div className={`rounded-3xl p-6 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>
        <div className="flex items-center gap-4">
          <img
            src="/umunthuhub-profile.png"
            alt="Grayson Comrade"
            className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`font-heading font-extrabold text-xl sm:text-2xl ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
              }`}>
                Grayson Comrade (Courier Lead #814)
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                riderOnline 
                  ? 'bg-[#00ae81]/15 text-[#006c4f] border border-[#00ae81]/30' 
                  : 'bg-[#f3f3f3] text-[#8d7168] border border-[#e1bfb5]/50'
              }`}>
                {riderOnline ? 'ONLINE & DISPATCHING' : 'OFFLINE'}
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
            }`}>
              Yamaha E-Moped • ★ 4.98 Rating (1,240 Deliveries) • Zone: Metro Center
            </p>
          </div>
        </div>

        {/* Big Online Toggle Switch */}
        <button
          onClick={() => {
            setRiderOnline(!riderOnline);
            showToast(
              riderOnline ? 'Shift Paused' : 'You are Online!',
              riderOnline ? 'Radar muted. You will not receive trip pings' : 'Listening for nearby restaurant pickups',
              riderOnline ? 'info' : 'success'
            );
          }}
          className={`px-5 py-3 rounded-2xl font-heading font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer ${
            riderOnline
              ? 'bg-[#006c4f] hover:bg-[#00523b] text-white shadow-[#006c4f]/25'
              : 'bg-[#ba1a1a] hover:bg-[#921414] text-white shadow-[#ba1a1a]/25'
          }`}
        >
          {riderOnline ? <Power className="w-[20px] h-[20px]" /> : <Play className="w-[20px] h-[20px]" />}
          <span>{riderOnline ? 'GO OFFLINE' : 'GO ONLINE NOW'}</span>
        </button>
      </div>

      {/* Rider KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        <div className={`rounded-3xl p-5 border space-y-1 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wider ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
          }`}>Today's Shift Payout</span>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-2xl text-[#006c4f]">
              ${shiftEarnings.toFixed(2)}
            </span>
            <span className="text-[11px] font-bold text-[#006c4f]">+ $18.50 tips</span>
          </div>
          <p className={`text-[11px] ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>{completedTripsCount} trips delivered today</p>
        </div>

        <div className={`rounded-3xl p-5 border space-y-1 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wider ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
          }`}>Shift Duration</span>
          <div className="flex items-baseline gap-2">
            <span className={`font-heading font-extrabold text-2xl ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              {shiftHours}
            </span>
            <span className="text-[11px] font-bold text-[#24619d]">⚡ $22.50 / hr</span>
          </div>
          <p className={`text-[11px] ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>Active since 8:15 AM</p>
        </div>

        <div className={`rounded-3xl p-5 border space-y-1 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wider ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
          }`}>Acceptance & Speed</span>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-2xl text-[#ab3500]">
              98.4%
            </span>
            <span className="text-[11px] font-bold text-[#006c4f]">Top 5%</span>
          </div>
          <p className={`text-[11px] ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>Avg. delivery speed: 17.2 mins</p>
        </div>

      </div>

      {/* Active Trip Banner if Rider has active trip */}
      {activeOrder && activeOrder.status !== 'delivered' && (
        <div className={`rounded-3xl p-6 border-2 shadow-xl space-y-4 animate-soft-pulse ${
          themeMode === 'dark'
            ? 'bg-[#383a39] border-[#ab3500]'
            : 'glass-panel border-[#ab3500] bg-linear-to-r from-orange-50/50 to-amber-50/50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ab3500] animate-ping" />
              <h3 className="font-heading font-extrabold text-sm text-[#ab3500] uppercase tracking-wider">
                Active Assigned Delivery In Progress
              </h3>
            </div>
            <span className={`font-mono font-bold text-xs px-2.5 py-1 rounded-xl border ${
              themeMode === 'dark'
                ? 'bg-[#242625] border-[#3a3a3a] text-[#f5f5f5]'
                : 'bg-white border-[#e1bfb5]'
            }`}>
              {activeOrder.orderNumber}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className={`font-heading font-extrabold text-base ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
              }`}>
                Pickup from: {activeOrder.tenantName}
              </p>
              <p className={`text-xs mt-0.5 ${
                themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
              }`}>
                Dropoff to: <span className={`font-bold ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>{activeOrder.customerName}</span> ({activeOrder.deliveryAddress})
              </p>
            </div>

            <button
              onClick={() => setRiderTab('active_job')}
              className="px-5 py-3 rounded-2xl glass-button-primary font-heading font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#ab3500]/30 cursor-pointer"
            >
              <Navigation className="w-[20px] h-[20px]" />
              <span>Open Turn-by-Turn GPS HUD</span>
            </button>
          </div>
        </div>
      )}

      {/* Available Radar Trip Pings */}
      <div className={`rounded-3xl p-6 border space-y-4 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radar className="text-[#24619d] w-[22px] h-[22px]" />
            <h3 className={`font-heading font-extrabold text-base ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              Nearby Pickup Opportunities ({availableTrips.length})
            </h3>
          </div>
          <span className="text-xs text-[#006c4f] font-bold">
            {riderOnline ? '🟢 Live Dispatch Active' : '🔴 Go Online to accept'}
          </span>
        </div>

        {!riderOnline ? (
          <div className={`p-8 text-center rounded-2xl border space-y-2 ${
            themeMode === 'dark'
              ? 'bg-[#383a39] border-[#3a3a3a]'
              : 'bg-[#f9f9f9] border-[#e1bfb5]/40'
          }`}>
            <PowerOff className={`text-3xl ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
            }`} />
            <p className={`font-heading font-bold text-xs ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>You are currently offline</p>
            <p className={`text-[11px] ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
            }`}>Toggle your shift to online above to view live nearby orders.</p>
          </div>
        ) : availableTrips.length === 0 ? (
          <div className={`p-8 text-center rounded-2xl border space-y-2 ${
            themeMode === 'dark'
              ? 'bg-[#383a39] border-[#3a3a3a]'
              : 'bg-[#f9f9f9] border-[#e1bfb5]/40'
          }`}>
            <RefreshCw className="w-[28px] h-[28px] text-[#00ae81] animate-spin" />
            <p className={`font-heading font-bold text-xs ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>Scanning for nearby orders...</p>
            <p className={`text-[11px] ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
            }`}>Stay in your current hotspot zone for fastest dispatch pings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableTrips.map(trip => {
              const estimatedCourierPayout = 6.50 + trip.tip;
              return (
                <div
                  key={trip.id}
                  className={`p-5 rounded-3xl border shadow-md space-y-4 hover:shadow-lg transition-all ${
                    themeMode === 'dark'
                      ? 'bg-[#242625] border-[#3a3a3a]'
                      : 'bg-white border-[#e1bfb5]/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-xl bg-[#24619d]/15 text-[#24619d] text-xs font-mono font-bold">
                      {trip.orderNumber}
                    </span>
                    <span className="font-heading font-extrabold text-base text-[#006c4f]">
                      ${estimatedCourierPayout.toFixed(2)} est.
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#24619d] mt-1.5 shrink-0" />
                      <div>
                        <p className={`font-bold ${
                          themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                        }`}>Pickup: {trip.tenantName}</p>
                        <p className={`text-[11px] ${
                          themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                        }`}>0.8 km away • {trip.items.length} items</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00ae81] mt-1.5 shrink-0" />
                      <div>
                        <p className={`font-bold ${
                          themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                        }`}>Dropoff: {trip.customerName}</p>
                        <p className={`text-[11px] truncate ${
                          themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                        }`}>{trip.deliveryAddress}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`pt-2 border-t flex items-center justify-between ${
                    themeMode === 'dark' ? 'border-[#3a3a3a]/40' : 'border-[#e1bfb5]/40'
                  }`}>
                    <span className={`text-[11px] font-medium ${
                      themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
                    }`}>
                      Est. time: 14 mins total
                    </span>

                    <button
                      onClick={() => acceptRiderJob(trip.id)}
                      className="px-4 py-2 rounded-xl glass-button-primary text-xs font-bold shadow-md shadow-[#ab3500]/20 cursor-pointer"
                    >
                      Accept Trip (${estimatedCourierPayout.toFixed(2)})
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
