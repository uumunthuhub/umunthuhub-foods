'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '@umunthuhub/shared-types';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    selectedRestaurant,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    placeOrder,
    setCustomerTab,
    showToast,
    themeMode
  } = useApp();

  const [name, setName] = useState('Michael Rossi');
  const [phone, setPhone] = useState('+1 (555) 432-1099');
  const [address, setAddress] = useState('742 Evergreen Terrace, Apt 4B, Metropolis');
  const [deliveryNotes, setDeliveryNotes] = useState('Gate code #4092. Please leave at door.');
  const [deliveryTimeOption, setDeliveryTimeOption] = useState<'asap' | 'scheduled'>('asap');
  const [tipAmount, setTipAmount] = useState<number>(5.00);
  const [customTip, setCustomTip] = useState('');
  const [isCustomTip, setIsCustomTip] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('apple_pay');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className={`text-center py-20 glass-panel rounded-3xl p-8 border space-y-4 max-w-md mx-auto ${
        themeMode === 'warm' ? 'border-[#d4c4b8]/50' :
        themeMode === 'dark' ? 'border-white/20' :
        'border-[#e1bfb5]/50'
      }`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
          themeMode === 'warm' ? 'bg-[#f5ede4] text-[#6b5a4a]' :
          themeMode === 'dark' ? 'bg-[#2e302f] text-[#c4c4c4]' :
          'bg-[#f3f3f3] text-[#8d7168]'
        }`}>
          <span className="material-symbols-outlined text-3xl">shopping_cart</span>
        </div>
        <h2 className={`font-heading font-extrabold text-lg ${
          themeMode === 'warm' ? 'text-[#3d2b1f]' :
          themeMode === 'dark' ? 'text-[#f5f5f5]' :
          'text-[#1a1c1c]'
        }`}>No items to checkout</h2>
        <p className={`text-xs ${
          themeMode === 'warm' ? 'text-[#6b5a4a]' :
          themeMode === 'dark' ? 'text-[#c4c4c4]' :
          'text-[#594139]'
        }`}>Add some fresh items from our curated kitchens to continue.</p>
        <button
          onClick={() => setCustomerTab('home')}
          className={`px-5 py-2.5 rounded-xl glass-button-primary text-xs font-bold ${
            themeMode === 'warm' ? 'bg-[#fffbf7] hover:bg-[#f5ede4]' :
            themeMode === 'dark' ? 'bg-[#242625] hover:bg-[#2e302f]' :
            'bg-white hover:bg-[#f3f3f3]'
          }`}
        >
          Explore Menus
        </button>
      </div>
    );
  }

  const deliveryFee = selectedRestaurant.deliveryFee;
  const serviceFee = Number((cartSubtotal * 0.05).toFixed(2));
  
  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountType === 'percentage') {
      discount = (cartSubtotal * appliedPromo.discountValue) / 100;
      if (appliedPromo.maxDiscount) discount = Math.min(discount, appliedPromo.maxDiscount);
    } else {
      discount = appliedPromo.discountValue;
    }
  }

  const currentTip = isCustomTip ? (parseFloat(customTip) || 0) : tipAmount;
  const grandTotal = Math.max(0, cartSubtotal + deliveryFee + serviceFee + currentTip - discount);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      showToast('Missing Address', 'Please provide a valid delivery address', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder({
        customerName: name,
        customerPhone: phone,
        deliveryAddress: address,
        paymentMethod,
        tip: currentTip,
        deliveryNotes
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      
      {/* Back button */}
      <button
        onClick={() => setCustomerTab('restaurant')}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold shadow-sm transition-colors cursor-pointer ${
          themeMode === 'warm' ? 'bg-[#fffbf7] hover:bg-[#f5ede4] border-[#d4c4b8]/60 text-[#6b5a4a]' :
          themeMode === 'dark' ? 'bg-[#242625] hover:bg-[#2e302f] border-white/20 text-[#c4c4c4]' :
          'bg-white hover:bg-[#f3f3f3] border-[#e1bfb5]/60 text-[#594139]'
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        <span>Back to {selectedRestaurant.name}</span>
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className={`font-heading font-extrabold text-2xl sm:text-3xl ${
            themeMode === 'warm' ? 'text-[#3d2b1f]' :
            themeMode === 'dark' ? 'text-[#f5f5f5]' :
            'text-[#1a1c1c]'
          }`}>
            Order Checkout
          </h1>
          <p className={`text-xs ${
            themeMode === 'warm' ? 'text-[#6b5a4a]' :
            themeMode === 'dark' ? 'text-[#c4c4c4]' :
            'text-[#594139]'
          }`}>Confirm your details and payment method</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#00ae81]/15 border border-[#00ae81]/30 text-[#006c4f] text-xs font-bold">
          <span className="material-symbols-outlined text-[16px]">lock</span>
          <span>256-Bit Encrypted</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - Delivery & Payment Information */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Delivery Address & Map Pin Card */}
          <div className={`glass-panel rounded-3xl p-5 sm:p-6 border space-y-4 ${
            themeMode === 'warm' ? 'border-[#d4c4b8]/50' :
            themeMode === 'dark' ? 'border-white/20' :
            'border-[#e1bfb5]/50'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#ff6b35]/15 flex items-center justify-center text-[#ab3500]">
                  <span className="material-symbols-outlined text-[20px]">pin_drop</span>
                </div>
                <h3 className={`font-heading font-bold text-sm ${
                  themeMode === 'warm' ? 'text-[#3d2b1f]' :
                  themeMode === 'dark' ? 'text-[#f5f5f5]' :
                  'text-[#1a1c1c]'
                }`}>
                  Delivery Location
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#006c4f] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#00ae81] animate-pulse" />
                Live Pin Verified
              </span>
            </div>

            {/* Map Preview Graphic */}
            <div className={`relative h-28 w-full rounded-2xl overflow-hidden border ${
              themeMode === 'warm' ? 'border-[#d4c4b8]/50 bg-[#e9ddcf]' :
              themeMode === 'dark' ? 'border-white/20 bg-[#1a1c1c]' :
              'border-[#e1bfb5]/50 bg-[#e8e8e8]'
            }`}>
              <div className={`absolute inset-0 bg-[radial-gradient(#ab3500_1px,transparent_1px)] bg-size-[16px_16px] ${
                themeMode === 'dark' ? 'opacity-15' : 'opacity-25'
              }`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center animate-bounce">
                  <div className="px-2.5 py-1 rounded-lg bg-[#ab3500] text-white text-[10px] font-extrabold shadow-md mb-1">
                    Your Address
                  </div>
                  <span className="material-symbols-outlined text-3xl text-[#ab3500] drop-shadow-md">
                    location_on
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className={`text-[11px] font-bold block mb-1 ${
                  themeMode === 'warm' ? 'text-[#6b5a4a]' :
                  themeMode === 'dark' ? 'text-[#c4c4c4]' :
                  'text-[#594139]'
                }`}>Full Street Address & Unit</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`text-[11px] font-bold block mb-1 ${
                    themeMode === 'warm' ? 'text-[#6b5a4a]' :
                    themeMode === 'dark' ? 'text-[#c4c4c4]' :
                    'text-[#594139]'
                  }`}>Recipient Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className={`text-[11px] font-bold block mb-1 ${
                    themeMode === 'warm' ? 'text-[#6b5a4a]' :
                    themeMode === 'dark' ? 'text-[#c4c4c4]' :
                    'text-[#594139]'
                  }`}>Contact Phone</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className={`text-[11px] font-bold block mb-1 ${
                  themeMode === 'warm' ? 'text-[#6b5a4a]' :
                  themeMode === 'dark' ? 'text-[#c4c4c4]' :
                  'text-[#594139]'
                }`}>Drop-off Instructions for Rider</label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="Gate code, door drop-off, ring bell..."
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>
            </div>
          </div>

          {/* Delivery Timing Options */}
          <div className={`glass-panel rounded-3xl p-5 sm:p-6 border space-y-3 ${
            themeMode === 'warm' ? 'border-[#d4c4b8]/50' :
            themeMode === 'dark' ? 'border-white/20' :
            'border-[#e1bfb5]/50'
          }`}>
            <h3 className={`font-heading font-bold text-sm flex items-center gap-2 ${
              themeMode === 'warm' ? 'text-[#3d2b1f]' :
              themeMode === 'dark' ? 'text-[#f5f5f5]' :
              'text-[#1a1c1c]'
            }`}>
              <span className="material-symbols-outlined text-[#24619d] text-[20px]">timer</span>
              Delivery Timing
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryTimeOption('asap')}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                  deliveryTimeOption === 'asap'
                    ? 'bg-[#24619d]/10 border-[#24619d] text-[#24619d]'
                    : themeMode === 'warm' ? 'bg-[#fffbf7] border-[#d4c4b8]/50 text-[#6b5a4a] hover:bg-white' :
                    themeMode === 'dark' ? 'bg-[#242625] border-white/20 text-[#c4c4c4] hover:bg-[#2e302f]' :
                    'bg-[#f9f9f9] border-[#e1bfb5]/50 text-[#594139] hover:bg-white'
                }`}
              >
                <p className="font-heading font-bold text-xs">Standard Express (ASAP)</p>
                <p className={`text-[11px] mt-0.5 ${
                  themeMode === 'warm' ? 'text-[#6b5a4a]' :
                  themeMode === 'dark' ? 'text-[#c4c4c4]' :
                  'text-[#594139]'
                }`}>20-30 min estimated</p>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryTimeOption('scheduled')}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                  deliveryTimeOption === 'scheduled'
                    ? 'bg-[#24619d]/10 border-[#24619d] text-[#24619d]'
                    : themeMode === 'warm' ? 'bg-[#fffbf7] border-[#d4c4b8]/50 text-[#6b5a4a] hover:bg-white' :
                    themeMode === 'dark' ? 'bg-[#242625] border-white/20 text-[#c4c4c4] hover:bg-[#2e302f]' :
                    'bg-[#f9f9f9] border-[#e1bfb5]/50 text-[#594139] hover:bg-white'
                }`}
              >
                <p className="font-heading font-bold text-xs">Schedule For Later</p>
                <p className={`text-[11px] mt-0.5 ${
                  themeMode === 'warm' ? 'text-[#6b5a4a]' :
                  themeMode === 'dark' ? 'text-[#c4c4c4]' :
                  'text-[#594139]'
                }`}>Pick lunch / dinner slot</p>
              </button>
            </div>
          </div>

          {/* Rider Tip Selector */}
          <div className={`glass-panel rounded-3xl p-5 sm:p-6 border space-y-3 ${
            themeMode === 'warm' ? 'border-[#d4c4b8]/50' :
            themeMode === 'dark' ? 'border-white/20' :
            'border-[#e1bfb5]/50'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className={`font-heading font-bold text-sm flex items-center gap-2 ${
                themeMode === 'warm' ? 'text-[#3d2b1f]' :
                themeMode === 'dark' ? 'text-[#f5f5f5]' :
                'text-[#1a1c1c]'
              }`}>
                <span className="material-symbols-outlined text-amber-600 text-[20px]">volunteer_activism</span>
                Courier Tip
              </h3>
              <span className={`text-[11px] ${
                themeMode === 'warm' ? 'text-[#6b5a4a]' :
                themeMode === 'dark' ? 'text-[#c4c4c4]' :
                'text-[#8d7168]'
              }`}>100% goes to your driver</span>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              {[3.00, 5.00, 7.00].map(tip => {
                const isSelected = !isCustomTip && tipAmount === tip;
                return (
                  <button
                    key={tip}
                    type="button"
                    onClick={() => {
                      setIsCustomTip(false);
                      setTipAmount(tip);
                    }}
                    className={`py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#ab3500] text-white shadow-sm'
                        : themeMode === 'warm' ? 'bg-[#f5ede4] text-[#3d2b1f] border border-[#d4c4b8]/50 hover:bg-white' :
                        themeMode === 'dark' ? 'bg-[#2e302f] text-[#f5f5f5] border border-white/20 hover:bg-[#383a39]' :
                        'bg-[#f3f3f3] text-[#1a1c1c] border border-[#e1bfb5]/50 hover:bg-white'
                    }`}
                  >
                    ${tip.toFixed(2)}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setIsCustomTip(true)}
                className={`py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isCustomTip
                    ? 'bg-[#ab3500] text-white shadow-sm'
                    : themeMode === 'warm' ? 'bg-[#f5ede4] text-[#3d2b1f] border border-[#d4c4b8]/50 hover:bg-white' :
                    themeMode === 'dark' ? 'bg-[#2e302f] text-[#f5f5f5] border border-white/20 hover:bg-[#383a39]' :
                    'bg-[#f3f3f3] text-[#1a1c1c] border border-[#e1bfb5]/50 hover:bg-white'
                }`}
              >
                Custom
              </button>
            </div>

            {isCustomTip && (
              <div className="pt-1">
                <input
                  type="number"
                  step="0.50"
                  min="0"
                  placeholder="Enter custom tip (e.g. $8.00)"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  className="w-full glass-input px-3.5 py-2 rounded-xl text-xs font-semibold"
                />
              </div>
            )}
          </div>

          {/* Payment Method Selector */}
          <div className={`glass-panel rounded-3xl p-5 sm:p-6 border space-y-3 ${
            themeMode === 'warm' ? 'border-[#d4c4b8]/50' :
            themeMode === 'dark' ? 'border-white/20' :
            'border-[#e1bfb5]/50'
          }`}>
            <h3 className={`font-heading font-bold text-sm flex items-center gap-2 ${
              themeMode === 'warm' ? 'text-[#3d2b1f]' :
              themeMode === 'dark' ? 'text-[#f5f5f5]' :
              'text-[#1a1c1c]'
            }`}>
              <span className="material-symbols-outlined text-[#006c4f] text-[20px]">credit_card</span>
              Payment Method
            </h3>

            <div className="space-y-2">
              {[
                { id: 'apple_pay', label: 'Apple Pay / Google Pay', icon: 'contactless', badge: 'Instant Touch ID' },
                { id: 'card', label: 'Credit or Debit Card', icon: 'credit_card', badge: 'Visa •••• 4242' },
                { id: 'corporate_account', label: 'Corporate Food Account', icon: 'corporate_fare', badge: 'Acme Corp Allowance ($150)' },
                { id: 'cash', label: 'Cash On Delivery', icon: 'payments', badge: 'Exact change preferred' },
              ].map(method => {
                const isSelected = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'bg-[#ff6b35]/10 border-2 border-[#ab3500] text-[#ab3500]'
                        : themeMode === 'warm' ? 'bg-[#fffbf7] border-[#d4c4b8]/50 text-[#3d2b1f] hover:bg-white' :
                        themeMode === 'dark' ? 'bg-[#242625] border-white/20 text-[#f5f5f5] hover:bg-[#2e302f]' :
                        'bg-[#f9f9f9] border-[#e1bfb5]/50 text-[#1a1c1c] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#ab3500] bg-[#ab3500]' :
                        themeMode === 'warm' ? 'border-[#6b5a4a] bg-[#fffbf7]' :
                        themeMode === 'dark' ? 'border-[#c4c4c4] bg-[#242625]' :
                        'border-[#8d7168] bg-white'
                      }`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="material-symbols-outlined text-[20px]">{method.icon}</span>
                      <span className={`text-xs font-bold ${
                        themeMode === 'warm' ? 'text-[#3d2b1f]' :
                        themeMode === 'dark' ? 'text-[#f5f5f5]' :
                        'text-[#1a1c1c]'
                      }`}>{method.label}</span>
                    </div>
                    <span className={`text-[11px] font-medium ${
                      themeMode === 'warm' ? 'text-[#6b5a4a]' :
                      themeMode === 'dark' ? 'text-[#c4c4c4]' :
                      'text-[#8d7168]'
                    }`}>{method.badge}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`glass-panel rounded-3xl p-5 sm:p-6 border space-y-5 sticky top-24 ${
            themeMode === 'warm' ? 'border-[#d4c4b8]/50' :
            themeMode === 'dark' ? 'border-white/20' :
            'border-[#e1bfb5]/50'
          }`}>
            <h3 className={`font-heading font-extrabold text-base pb-3 border-b ${
              themeMode === 'warm' ? 'text-[#3d2b1f] border-b-[#d4c4b8]/40' :
              themeMode === 'dark' ? 'text-[#f5f5f5] border-b-white/20' :
              'text-[#1a1c1c] border-b-[#e1bfb5]/40'
            }`}>
              Order Breakdown ({cart.length} items)
            </h3>

            {/* Items scroll */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-start gap-2 text-xs">
                  <div className="min-w-0">
                    <p className={`font-bold truncate ${
                      themeMode === 'warm' ? 'text-[#3d2b1f]' :
                      themeMode === 'dark' ? 'text-[#f5f5f5]' :
                      'text-[#1a1c1c]'
                    }`}>
                      {item.quantity}x {item.menuItem.name}
                    </p>
                    {Object.entries(item.selectedOptions).length > 0 && (
                      <p className={`text-[10px] truncate ${
                        themeMode === 'warm' ? 'text-[#6b5a4a]' :
                        themeMode === 'dark' ? 'text-[#c4c4c4]' :
                        'text-[#8d7168]'
                      }`}>
                        {Object.values(item.selectedOptions).join(', ')}
                      </p>
                    )}
                  </div>
                  <span className={`font-bold shrink-0 ${
                    themeMode === 'warm' ? 'text-[#3d2b1f]' :
                    themeMode === 'dark' ? 'text-[#f5f5f5]' :
                    'text-[#1a1c1c]'
                  }`}>
                    ${item.itemTotal.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code box */}
            <div className="pt-2">
              {appliedPromo ? (
                <div className="p-3 bg-[#00ae81]/15 rounded-xl border border-[#00ae81]/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#006c4f] font-bold">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>{appliedPromo.code} applied (-${discount.toFixed(2)})</span>
                  </div>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="text-[#ba1a1a] font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                    className="flex-1 glass-input px-3 py-2 rounded-xl text-xs font-semibold uppercase"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (promoCodeInput) {
                        applyPromoCode(promoCodeInput);
                        setPromoCodeInput('');
                      }
                    }}
                    className={`px-4 py-2 border rounded-xl text-xs font-bold ${
                      themeMode === 'warm' ? 'bg-[#f5ede4] hover:bg-[#e9ddcf] border-[#d4c4b8] text-[#3d2b1f]' :
                      themeMode === 'dark' ? 'bg-[#2e302f] hover:bg-[#383a39] border-white/20 text-[#f5f5f5]' :
                      'bg-[#f3f3f3] hover:bg-[#e8e8e8] border-[#e1bfb5] text-[#1a1c1c]'
                    }`}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className={`p-4 rounded-2xl border space-y-2 text-xs ${
              themeMode === 'warm' ? 'bg-[#f5ede4] border-[#d4c4b8]/40' :
              themeMode === 'dark' ? 'bg-[#2e302f] border-white/20' :
              'bg-[#f3f3f3] border-[#e1bfb5]/40'
            }`}>
              <div className={`flex justify-between ${
                themeMode === 'warm' ? 'text-[#6b5a4a]' :
                themeMode === 'dark' ? 'text-[#c4c4c4]' :
                'text-[#594139]'
              }`}>
                <span>Items Subtotal</span>
                <span className={`font-semibold ${
                  themeMode === 'warm' ? 'text-[#3d2b1f]' :
                  themeMode === 'dark' ? 'text-[#f5f5f5]' :
                  'text-[#1a1c1c]'
                }`}>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className={`flex justify-between ${
                themeMode === 'warm' ? 'text-[#6b5a4a]' :
                themeMode === 'dark' ? 'text-[#c4c4c4]' :
                'text-[#594139]'
              }`}>
                <span>Delivery Fee</span>
                <span className={`font-semibold ${
                  themeMode === 'warm' ? 'text-[#3d2b1f]' :
                  themeMode === 'dark' ? 'text-[#f5f5f5]' :
                  'text-[#1a1c1c]'
                }`}>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className={`flex justify-between ${
                themeMode === 'warm' ? 'text-[#6b5a4a]' :
                themeMode === 'dark' ? 'text-[#c4c4c4]' :
                'text-[#594139]'
              }`}>
                <span>Service & Carbon Offset</span>
                <span className={`font-semibold ${
                  themeMode === 'warm' ? 'text-[#3d2b1f]' :
                  themeMode === 'dark' ? 'text-[#f5f5f5]' :
                  'text-[#1a1c1c]'
                }`}>${serviceFee.toFixed(2)}</span>
              </div>
              <div className={`flex justify-between ${
                themeMode === 'warm' ? 'text-[#6b5a4a]' :
                themeMode === 'dark' ? 'text-[#c4c4c4]' :
                'text-[#594139]'
              }`}>
                <span>Rider Tip</span>
                <span className={`font-semibold ${
                  themeMode === 'warm' ? 'text-[#3d2b1f]' :
                  themeMode === 'dark' ? 'text-[#f5f5f5]' :
                  'text-[#1a1c1c]'
                }`}>${currentTip.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#006c4f] font-bold">
                  <span>Promotional Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className={`pt-3 border-t flex justify-between font-heading font-extrabold text-base ${
                themeMode === 'warm' ? 'border-t-[#d4c4b8]/50 text-[#3d2b1f]' :
                themeMode === 'dark' ? 'border-t-white/20 text-[#f5f5f5]' :
                'border-t-[#e1bfb5]/50 text-[#1a1c1c]'
              }`}>
                <span>Grand Total</span>
                <span className="text-[#ab3500]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Place Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl glass-button-primary font-heading font-bold text-sm flex items-center justify-between shadow-xl shadow-[#ab3500]/30 transition-all active:scale-98 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Confirming Order...' : 'Place Order Now'}</span>
              <span className="font-extrabold">${grandTotal.toFixed(2)} →</span>
            </button>

            <p className={`text-center text-[10px] ${
              themeMode === 'warm' ? 'text-[#6b5a4a]' :
              themeMode === 'dark' ? 'text-[#c4c4c4]' :
              'text-[#8d7168]'
            }`}>
              By placing this order you agree to Umunthuhub-Foods Terms & Zero-Waste Packaging policy.
            </p>
          </div>
        </div>

      </form>

    </div>
  );
};
