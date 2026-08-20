'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const OrderTrackingView: React.FC = () => {
  const {
    activeOrder,
    setCustomerTab,
    showToast,
    orders,
    setActiveOrder,
    setPersona,
    setVendorTab
  } = useApp();

  const [etaMinutes, setEtaMinutes] = useState(18);
  const [isCallingRider, setIsCallingRider] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'rider', text: 'Hi! I have just arrived at the restaurant. Will head your way as soon as the kitchen seals the bag!', time: '11:46 AM' }
  ]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Fallback to latest order if none active
  const order = activeOrder || orders[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMinutes(prev => (prev > 2 ? prev - 1 : 2));
    }, 25000);
    return () => clearInterval(timer);
  }, []);

  if (!order) {
    return (
      <div className="text-center py-20 glass-panel rounded-3xl p-8 border border-[#e1bfb5]/50 space-y-4 max-w-md mx-auto">
        <span className="material-symbols-outlined text-4xl text-[#8d7168]">local_shipping</span>
        <h2 className="font-heading font-extrabold text-lg text-[#1a1c1c]">No Active Orders</h2>
        <p className="text-xs text-[#594139]">You don't have any active deliveries at the moment.</p>
        <button
          onClick={() => setCustomerTab('home')}
          className="px-5 py-2 rounded-xl glass-button-primary text-xs font-bold"
        >
          Order Food Now
        </button>
      </div>
    );
  }

  const steps = [
    { key: 'incoming', label: 'Order Received', icon: 'receipt_long', desc: 'Kitchen is checking ticket' },
    { key: 'cooking', label: 'Kitchen Preparing', icon: 'skillet', desc: 'Chef crafting fresh dishes' },
    { key: 'ready', label: 'Ready for Pickup', icon: 'inventory_2', desc: 'Sealed & bagged at counter' },
    { key: 'picked_up', label: 'Courier On Route', icon: 'two_wheeler', desc: 'Rider is speeding your way' },
    { key: 'delivered', label: 'Order Delivered', icon: 'check_circle', desc: 'Enjoy your meal!' },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'incoming': return 0;
      case 'cooking': return 1;
      case 'ready': return 2;
      case 'picked_up': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  };

  const currentStepIdx = getStepIndex(order.status);

  const handleSendRiderChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatHistory(prev => [
      ...prev,
      { sender: 'customer', text: chatMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setChatMessage('');
    showToast('Message Sent', 'Rider notified on their heads-up display', 'info');

    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        { sender: 'rider', text: 'Got it! Following your delivery instructions carefully.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 1800);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1a1c1c]">
              Live Order Tracking
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-[#ff6b35]/15 text-[#ab3500] text-xs font-mono font-extrabold border border-[#e1bfb5]">
              {order.orderNumber}
            </span>
          </div>
          <p className="text-xs text-[#594139] mt-0.5">
            Ordered from <span className="font-bold text-[#1a1c1c]">{order.tenantName}</span> • Estimated Delivery: <span className="font-bold text-[#006c4f]">{order.estimatedDeliveryTime}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick switcher to KDS for demoing multi-tenant flow */}
          <button
            onClick={() => {
              setPersona('vendor');
              setVendorTab('kds');
              showToast('Switched to Kitchen Display', 'Advance order status from the restaurant KDS screen', 'info');
            }}
            className="px-3.5 py-2 rounded-xl bg-[#24619d]/10 hover:bg-[#24619d]/20 border border-[#24619d]/30 text-[#24619d] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Simulate kitchen state updates"
          >
            <span className="material-symbols-outlined text-[16px]">soup_kitchen</span>
            <span>View in Kitchen KDS</span>
          </button>

          <button
            onClick={() => setCustomerTab('home')}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#f3f3f3] border border-[#e1bfb5]/60 text-[#594139] text-xs font-bold transition-colors cursor-pointer"
          >
            Order More
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Progress Stepper & Live Simulated Map */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Status Stepper Card */}
          <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-[#e1bfb5]/50 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#00ae81] animate-ping" />
                <span className="font-heading font-extrabold text-sm text-[#1a1c1c] uppercase tracking-wider">
                  {order.status.replace('_', ' ')}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#8d7168]">Estimated Arrival</span>
                <p className="font-heading font-extrabold text-base text-[#ab3500]">
                  {order.status === 'delivered' ? 'Delivered 🎉' : `In ${etaMinutes} mins`}
                </p>
              </div>
            </div>

            {/* Stepper Bar */}
            <div className="relative">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-[#eeeeee]">
                <div 
                  style={{ width: `${((currentStepIdx + 1) / steps.length) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#ff6b35] to-[#ab3500] transition-all duration-500"
                />
              </div>

              <div className="grid grid-cols-5 gap-1">
                {steps.map((step, idx) => {
                  const isCompleted = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;
                  return (
                    <div key={step.key} className="text-center space-y-1">
                      <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center transition-all ${
                        isCurrent 
                          ? 'bg-[#ab3500] text-white shadow-md shadow-[#ab3500]/30 scale-110' 
                          : isCompleted 
                            ? 'bg-[#00ae81] text-white' 
                            : 'bg-[#eeeeee] text-[#8d7168]'
                      }`}>
                        <span className="material-symbols-outlined text-[16px]">{step.icon}</span>
                      </div>
                      <p className={`text-[10px] font-bold leading-tight line-clamp-1 ${
                        isCurrent ? 'text-[#ab3500]' : isCompleted ? 'text-[#1a1c1c]' : 'text-[#8d7168]'
                      }`}>
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Simulated Live Map Container */}
          <div className="glass-panel rounded-3xl p-5 border border-[#e1bfb5]/50 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-xs text-[#1a1c1c] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#24619d] text-[18px]">satellite_alt</span>
                GPS Live Dispatch Radar
              </h3>
              <span className="text-[10px] font-bold text-[#006c4f] bg-[#00ae81]/15 px-2 py-0.5 rounded-md">
                Telemetry Active
              </span>
            </div>

            {/* Simulated Map Canvas */}
            <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-[#e8edf2] border border-[#e1bfb5]/50 shadow-inner">
              {/* Street grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
              
              {/* Route Line SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 60 70 Q 180 120 280 180 T 420 220"
                  fill="none"
                  stroke="#ab3500"
                  strokeWidth="4"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
              </svg>

              {/* Restaurant Pin */}
              <div className="absolute top-12 left-10 flex flex-col items-center">
                <div className="px-2 py-0.5 rounded bg-white shadow-md text-[9px] font-extrabold text-[#24619d] border border-[#e1bfb5] whitespace-nowrap">
                  {order.tenantName}
                </div>
                <div className="w-8 h-8 rounded-full bg-[#24619d] text-white flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[16px]">restaurant</span>
                </div>
              </div>

              {/* Rider Scooter Marker */}
              <div className="absolute top-32 left-1/2 -translate-x-1/2 flex flex-col items-center animate-soft-pulse">
                <div className="px-2.5 py-0.5 rounded-full bg-[#ab3500] text-white text-[10px] font-extrabold shadow-lg flex items-center gap-1">
                  <span>Leo V.</span>
                  <span className="text-[9px] opacity-80">(Yamaha Moped)</span>
                </div>
                <div className="relative mt-1">
                  <span className="absolute -inset-1 rounded-full bg-[#ff6b35]/40 animate-ping" />
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#ff6b35] to-[#ab3500] text-white flex items-center justify-center shadow-xl border-2 border-white relative z-10">
                    <span className="material-symbols-outlined text-[18px]">two_wheeler</span>
                  </div>
                </div>
              </div>

              {/* Customer Delivery Pin */}
              <div className="absolute bottom-6 right-10 flex flex-col items-center">
                <div className="px-2 py-0.5 rounded bg-white shadow-md text-[9px] font-extrabold text-[#006c4f] border border-[#e1bfb5] whitespace-nowrap">
                  742 Evergreen Terrace (You)
                </div>
                <div className="w-8 h-8 rounded-full bg-[#006c4f] text-white flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[16px]">home</span>
                </div>
              </div>

              {/* Map Floating Tools */}
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#1a1c1c] shadow-md border border-[#e1bfb5]/50 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ae81]" />
                <span>Speed: 28 km/h • 1.4 km remaining</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Courier Card & Itemized Receipt */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Courier Card */}
          <div className="glass-panel rounded-3xl p-5 border border-[#e1bfb5]/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8d7168] uppercase tracking-wider">
                Assigned Delivery Partner
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#00ae81]/15 text-[#006c4f]">
                Umunthuhub Pro Silver
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <img
                src={order.riderAvatar || "/umunthuhub-profile.png"}
                alt="Courier"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-heading font-extrabold text-sm text-[#1a1c1c]">
                  {order.riderName || 'Grayson Comrade'}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-[#594139] mt-0.5">
                  <span className="material-symbols-outlined text-[14px] text-amber-500 fill-1">star</span>
                  <span className="font-bold text-[#1a1c1c]">{order.riderRating || 4.98}</span>
                  <span>• {order.riderVehicle || 'Yamaha E-Moped (UMN-582)'}</span>
                </div>
                <p className="text-[11px] text-[#006c4f] font-medium mt-0.5">
                  ✓ Temperature-controlled thermal bag verified
                </p>
              </div>
            </div>

            {/* Courier Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsCallingRider(true);
                  showToast('Calling Rider', 'Connecting encrypted line to courier Leo V...', 'info');
                  setTimeout(() => setIsCallingRider(false), 3000);
                }}
                className="py-2.5 px-3 rounded-xl bg-[#f3f3f3] hover:bg-[#e8e8e8] text-xs font-bold text-[#1a1c1c] flex items-center justify-center gap-1.5 transition-colors border border-[#e1bfb5]/50 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#006c4f]">call</span>
                <span>{isCallingRider ? 'Calling...' : 'Call Driver'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="py-2.5 px-3 rounded-xl bg-[#ab3500] hover:bg-[#8f2c00] text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-[#ab3500]/20 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Direct Message</span>
              </button>
            </div>

            {/* Courier Chat Drawer Inline */}
            {isChatOpen && (
              <div className="p-3.5 bg-[#f9f9f9] rounded-2xl border border-[#e1bfb5]/50 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-1 border-b border-[#e1bfb5]/30">
                  <span className="text-[11px] font-bold text-[#1a1c1c]">Direct Chat with Leo V.</span>
                  <button onClick={() => setIsChatOpen(false)} className="text-[11px] text-[#8d7168] hover:underline">
                    Close
                  </button>
                </div>

                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {chatHistory.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-2.5 rounded-xl text-xs max-w-[85%] ${
                        msg.sender === 'customer'
                          ? 'ml-auto bg-[#ab3500] text-white rounded-br-none'
                          : 'bg-white text-[#1a1c1c] border border-[#e1bfb5]/40 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-[9px] opacity-70 block text-right mt-0.5">{msg.time}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendRiderChat} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Message courier..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1 glass-input px-3 py-1.5 rounded-xl text-xs"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-[#ab3500] text-white text-xs font-bold"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Itemized Order Receipt */}
          <div className="glass-panel rounded-3xl p-5 border border-[#e1bfb5]/50 space-y-4">
            <h4 className="font-heading font-bold text-xs text-[#1a1c1c] uppercase tracking-wider pb-2 border-b border-[#e1bfb5]/40">
              Receipt & Item Breakdown
            </h4>

            <div className="space-y-2.5 text-xs">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-[#1a1c1c]">{item.quantity}x {item.name}</span>
                    {item.specialInstructions && (
                      <p className="text-[10px] text-[#006c4f] italic">{item.specialInstructions}</p>
                    )}
                  </div>
                  <span className="font-bold text-[#1a1c1c]">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#e1bfb5]/40 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#594139]">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#594139]">
                <span>Delivery & Courier Fee</span>
                <span>${order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#594139]">
                <span>Driver Tip</span>
                <span>${order.tip.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#006c4f] font-bold">
                  <span>Discount Applied</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#e1bfb5]/40 flex justify-between font-heading font-extrabold text-sm text-[#1a1c1c]">
                <span>Paid via {order.paymentMethod.replace('_', ' ').toUpperCase()}</span>
                <span className="text-[#ab3500]">${order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => showToast('Help Desk', 'Connecting to order resolution supervisor...', 'info')}
                className="text-xs text-[#8d7168] hover:text-[#ab3500] font-semibold underline"
              >
                Having an issue with this order? Report to Help Desk
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
