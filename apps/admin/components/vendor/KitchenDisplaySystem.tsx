'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Loader2, Check, ChefHat, CheckCircle, Bike, Bell } from 'lucide-react';
import { Order } from '@umunthuhub/shared-types';

export const KitchenDisplaySystem: React.FC = () => {
  const {
    currentTenant,
    orders,
    updateOrderStatus,
    showToast,
    themeMode
  } = useApp();

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const tenantOrders = orders.filter(o => o.tenantId === currentTenant.id && o.status !== 'delivered' && o.status !== 'cancelled');

  const incomingOrders = tenantOrders.filter(o => o.status === 'incoming');
  const cookingOrders = tenantOrders.filter(o => o.status === 'cooking');
  const readyOrders = tenantOrders.filter(o => o.status === 'ready');
  const onTheWayOrders = tenantOrders.filter(o => o.status === 'picked_up');

  const toggleItemCheck = (ticketId: string, itemIdx: number) => {
    const key = `${ticketId}-${itemIdx}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderOrderCard = (order: Order, stage: 'incoming' | 'cooking' | 'ready' | 'picked_up') => {
    return (
      <div
        key={order.id}
        className={`rounded-3xl p-5 border shadow-md space-y-3.5 transition-all ${
          stage === 'incoming' 
            ? themeMode === 'dark'
              ? 'bg-[#242625] border-[#ba1a1a]/40 shadow-[#ffdad6]/50'
              : 'bg-white border-[#ba1a1a]/40 shadow-[#ffdad6]/50'
            : stage === 'cooking'
              ? themeMode === 'dark'
                ? 'bg-[#242625] border-amber-400/60 shadow-amber-500/5'
                : 'bg-white border-amber-400/60 shadow-amber-500/5'
              : stage === 'ready'
                ? themeMode === 'dark'
                  ? 'bg-[#242625] border-[#00ae81]/60 shadow-[#00ae81]/10'
                  : 'bg-white border-[#00ae81]/60 shadow-[#00ae81]/10'
                : themeMode === 'dark'
                  ? 'bg-[#383a39] border-[#3a3a3a]/50 opacity-90'
                  : 'bg-[#f9f9f9] border-[#e1bfb5]/50 opacity-90'
        }`}
      >
        {/* Ticket Header */}
        <div className={`flex items-center justify-between pb-2 border-b ${
          themeMode === 'dark' ? 'border-[#3a3a3a]/40' : 'border-[#e1bfb5]/40'
        }`}>
          <div className="flex items-center gap-2">
            <span className={`font-heading font-extrabold text-sm ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              {order.orderNumber}
            </span>
            <span className={`text-[11px] ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
            }`}>
              {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {stage === 'incoming' && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#ffdad6] text-[#ba1a1a] animate-pulse">
                NEW INCOMING
              </span>
            )}
            {stage === 'cooking' && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 flex items-center gap-1">
                <Loader2 className="w-[13px] h-[13px] animate-spin" />
                PREPARING
              </span>
            )}
            {stage === 'ready' && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#00ae81]/15 text-[#006c4f]">
                READY FOR DRIVER
              </span>
            )}
            {stage === 'picked_up' && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#24619d]/15 text-[#24619d]">
                WITH COURIER
              </span>
            )}
          </div>
        </div>

        {/* Customer & Address */}
        <div className="text-xs">
          <p className={`font-bold ${
            themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
          }`}>{order.customerName}</p>
          <p className={`text-[11px] truncate ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
          }`}>{order.deliveryAddress}</p>
          {order.deliveryNotes && (
            <p className="text-[10px] text-[#006c4f] font-semibold mt-0.5">
              Note: {order.deliveryNotes}
            </p>
          )}
        </div>

        {/* Item Checklist */}
        <div className="space-y-2 py-1">
          {order.items.map((item, idx) => {
            const isChecked = checkedItems[`${order.id}-${idx}`];
            return (
              <div
                key={idx}
                onClick={() => toggleItemCheck(order.id, idx)}
                className={`p-2 rounded-xl text-xs flex items-start gap-2.5 cursor-pointer select-none transition-all ${
                  isChecked 
                    ? themeMode === 'dark'
                      ? 'bg-[#383a39] text-[#7a7a7a] line-through'
                      : 'bg-[#f3f3f3] text-[#8d7168] line-through'
                    : themeMode === 'dark'
                      ? 'bg-[#383a39] text-[#f5f5f5]'
                      : 'bg-white text-[#1a1c1c]'
                }`}
              >
                <div className={`w-4 h-4 rounded-md border mt-0.5 flex items-center justify-center shrink-0 ${
                  isChecked ? 'bg-[#00ae81] border-[#00ae81] text-white' : themeMode === 'dark' ? 'border-[#3a3a3a] bg-[#383a39]' : 'border-[#8d7168] bg-white'
                }`}>
                  {isChecked && <Check className="w-[14px] h-[14px]" />}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold">
                    {item.quantity}x {item.name}
                  </p>
                  {item.selectedOptions && Object.entries(item.selectedOptions).length > 0 && (
                    <p className="text-[10px] text-[#8d7168]">
                      {Object.values(item.selectedOptions).join(' • ')}
                    </p>
                  )}
                  {item.specialInstructions && (
                    <p className="text-[10px] text-[#ab3500] font-semibold italic mt-0.5">
                      ⚠️ Kitchen Note: {item.specialInstructions}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stage Advance Action */}
        <div className={`pt-2 border-t ${
          themeMode === 'dark' ? 'border-[#3a3a3a]/30' : 'border-[#e1bfb5]/30'
        }`}>
          {stage === 'incoming' && (
            <button
              onClick={() => updateOrderStatus(order.id, 'cooking')}
              className="w-full py-2.5 rounded-xl bg-[#ab3500] hover:bg-[#8f2c00] text-white text-xs font-bold shadow-md shadow-[#ab3500]/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ChefHat className="w-[18px] h-[18px]" />
              <span>Start Cooking</span>
            </button>
          )}
          {stage === 'cooking' && (
            <button
              onClick={() => updateOrderStatus(order.id, 'ready')}
              className="w-full py-2.5 rounded-xl bg-[#006c4f] hover:bg-[#00523b] text-white text-xs font-bold shadow-md shadow-[#006c4f]/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle className="w-[18px] h-[18px]" />
              <span>Mark Ready for Pickup</span>
            </button>
          )}
          {stage === 'ready' && (
            <button
              onClick={() => updateOrderStatus(order.id, 'picked_up')}
              className="w-full py-2.5 rounded-xl bg-[#24619d] hover:bg-[#1a4a7a] text-white text-xs font-bold shadow-md shadow-[#24619d]/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Bike className="w-[18px] h-[18px]" />
              <span>Hand to Courier (Leo V.)</span>
            </button>
          )}
          {stage === 'picked_up' && (
            <button
              onClick={() => updateOrderStatus(order.id, 'delivered')}
              className={`w-full py-2 rounded-xl text-xs font-bold cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] hover:bg-[#4a4a4a] text-[#c4c4c4]'
                  : 'bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#594139]'
              }`}
            >
              Mark Delivery Finalized
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* KDS Header Controls */}
      <div className={`rounded-3xl p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`font-heading font-extrabold text-xl sm:text-2xl ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              Kitchen Display System (KDS)
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#24619d]/15 text-[#24619d]">
              Station #1 Main Line
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>
            Active Kitchen: <span className={`font-bold ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>{currentTenant.name}</span> • {tenantOrders.length} active tickets
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Chime Tested', 'Kitchen audible bell sound pinged across stations', 'info')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer ${
              themeMode === 'dark'
                ? 'bg-[#383a39] hover:bg-[#4a4a4a] text-[#c4c4c4] border-[#3a3a3a]'
                : 'bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#1a1c1c] border-[#e1bfb5]/50'
            }`}
          >
            <Bell className="w-[16px] h-[16px] text-amber-600" />
            <span>Test Bell</span>
          </button>
          <span className="px-3 py-1.5 rounded-xl bg-[#00ae81]/15 text-[#006c4f] text-xs font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#00ae81] animate-ping" />
            Live Sync Active
          </span>
        </div>
      </div>

      {/* KDS 4-Column Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        
        {/* Column 1: Incoming (New Orders) */}
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-[#ffdad6]/40 border border-[#ba1a1a]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ba1a1a] animate-pulse" />
              <h3 className="font-heading font-extrabold text-xs text-[#ba1a1a] uppercase tracking-wider">
                1. Incoming Tickets
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#ba1a1a] text-white text-[11px] font-extrabold">
              {incomingOrders.length}
            </span>
          </div>

          <div className="space-y-4">
            {incomingOrders.length === 0 ? (
              <div className={`p-8 text-center rounded-3xl border text-xs ${
                themeMode === 'dark'
                  ? 'bg-[#242625] border-[#3a3a3a] text-[#7a7a7a]'
                  : 'glass-panel border-[#e1bfb5]/40 text-[#8d7168]'
              }`}>
                No incoming tickets waiting
              </div>
            ) : (
              incomingOrders.map(order => renderOrderCard(order, 'incoming'))
            )}
          </div>
        </div>

        {/* Column 2: Cooking (In Progress) */}
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChefHat className="w-[18px] h-[18px] text-amber-700" />
              <h3 className="font-heading font-extrabold text-xs text-amber-900 uppercase tracking-wider">
                2. On the Line (Cooking)
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-600 text-white text-[11px] font-extrabold">
              {cookingOrders.length}
            </span>
          </div>

          <div className="space-y-4">
            {cookingOrders.length === 0 ? (
              <div className={`p-8 text-center rounded-3xl border text-xs ${
                themeMode === 'dark'
                  ? 'bg-[#242625] border-[#3a3a3a] text-[#7a7a7a]'
                  : 'glass-panel border-[#e1bfb5]/40 text-[#8d7168]'
              }`}>
                Kitchen line clear
              </div>
            ) : (
              cookingOrders.map(order => renderOrderCard(order, 'cooking'))
            )}
          </div>
        </div>

        {/* Column 3: Ready for Pickup */}
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-[#00ae81]/15 border border-[#00ae81]/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-[18px] h-[18px] text-[#006c4f]" />
              <h3 className="font-heading font-extrabold text-xs text-[#006c4f] uppercase tracking-wider">
                3. Ready at Counter
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#006c4f] text-white text-[11px] font-extrabold">
              {readyOrders.length}
            </span>
          </div>

          <div className="space-y-4">
            {readyOrders.length === 0 ? (
              <div className={`p-8 text-center rounded-3xl border text-xs ${
                themeMode === 'dark'
                  ? 'bg-[#242625] border-[#3a3a3a] text-[#7a7a7a]'
                  : 'glass-panel border-[#e1bfb5]/40 text-[#8d7168]'
              }`}>
                No orders waiting at counter
              </div>
            ) : (
              readyOrders.map(order => renderOrderCard(order, 'ready'))
            )}
          </div>
        </div>

        {/* Column 4: Dispatched with Rider */}
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-[#24619d]/15 border border-[#24619d]/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bike className="w-[18px] h-[18px] text-[#24619d]" />
              <h3 className="font-heading font-extrabold text-xs text-[#24619d] uppercase tracking-wider">
                4. On Delivery Route
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#24619d] text-white text-[11px] font-extrabold">
              {onTheWayOrders.length}
            </span>
          </div>

          <div className="space-y-4">
            {onTheWayOrders.length === 0 ? (
              <div className={`p-8 text-center rounded-3xl border text-xs ${
                themeMode === 'dark'
                  ? 'bg-[#242625] border-[#3a3a3a] text-[#7a7a7a]'
                  : 'glass-panel border-[#e1bfb5]/40 text-[#8d7168]'
              }`}>
                No drivers currently in transit
              </div>
            ) : (
              onTheWayOrders.map(order => renderOrderCard(order, 'picked_up'))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
