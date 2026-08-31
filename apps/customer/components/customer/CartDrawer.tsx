'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    cartSubtotal,
    cartItemsCount,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    selectedRestaurant,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setCustomerTab,
    themeMode
  } = useApp();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartDrawerOpen) return null;

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

  const grandTotal = Math.max(0, cartSubtotal + deliveryFee + serviceFee - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className={`w-screen max-w-md glass-panel rounded-l-3xl shadow-2xl flex flex-col border-l ${
          themeMode === 'warm' ? 'bg-[#fffbf7]/95 border-l-[#d4c4b8]' :
          themeMode === 'dark' ? 'bg-[#242625]/95 border-l-white/20' :
          'bg-white/95 border-l-[#e1bfb5]'
        }`}>
          
          {/* Drawer Header */}
          <div className={`p-5 border-b flex items-center justify-between ${
            themeMode === 'warm' ? 'border-b-[#d4c4b8]/40' :
            themeMode === 'dark' ? 'border-b-white/20' :
            'border-b-[#e1bfb5]/40'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#ff6b35]/15 flex items-center justify-center text-[#ab3500]">
                <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              </div>
              <div>
                <h3 className={`font-heading font-bold text-base ${
                  themeMode === 'warm' ? 'text-[#3d2b1f]' :
                  themeMode === 'dark' ? 'text-[#f5f5f5]' :
                  'text-[#1a1c1c]'
                }`}>Your Order Tray</h3>
                <p className={`text-xs ${
                  themeMode === 'warm' ? 'text-[#3d2b1f]' :
                  themeMode === 'dark' ? 'text-[#e5e5e5]' :
                  'text-[#1a1c1c]'
                }`}>{selectedRestaurant.name}</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                themeMode === 'warm' ? 'bg-[#f5ede4] hover:bg-[#e9ddcf] text-[#6b5a4a]' :
                themeMode === 'dark' ? 'bg-[#2e302f] hover:bg-[#383a39] text-[#c4c4c4]' :
                'bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#594139]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Drawer Body - Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
                  themeMode === 'warm' ? 'bg-[#f5ede4] text-[#6b5a4a]' :
                  themeMode === 'dark' ? 'bg-[#2e302f] text-[#c4c4c4]' :
                  'bg-[#f3f3f3] text-[#8d7168]'
                }`}>
                  <span className="material-symbols-outlined text-4xl">takeout_dining</span>
                </div>
                <div>
                  <p className={`font-heading font-bold text-base ${
                    themeMode === 'warm' ? 'text-[#3d2b1f]' :
                    themeMode === 'dark' ? 'text-[#f5f5f5]' :
                    'text-[#1a1c1c]'
                  }`}>Your tray is empty</p>
                  <p className={`text-xs max-w-xs mx-auto mt-1 ${
                    themeMode === 'warm' ? 'text-[#6b5a4a]' :
                    themeMode === 'dark' ? 'text-[#c4c4c4]' :
                    'text-[#594139]'
                  }`}>
                    Explore our chef-curated menus and add delicious items to get started!
                  </p>
                </div>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="px-5 py-2 rounded-xl bg-[#ab3500] text-white text-xs font-bold hover:bg-[#8f2c00] transition-colors"
                >
                  Explore Menus
                </button>
              </div>
            ) : (
              <>
                <div className={`flex items-center justify-between pb-2 border-b ${
                  themeMode === 'warm' ? 'border-b-[#d4c4b8]/30' :
                  themeMode === 'dark' ? 'border-b-white/20' :
                  'border-b-[#e1bfb5]/30'
                }`}>
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    themeMode === 'warm' ? 'text-[#3d2b1f]' :
                    themeMode === 'dark' ? 'text-[#e5e5e5]' :
                    'text-[#1a1c1c]'
                  }`}>
                    {cartItemsCount} {cartItemsCount === 1 ? 'Item' : 'Items'}
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-xs text-[#ba1a1a] hover:underline font-semibold"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-3">
                  {cart.map(item => (
                    <div 
                      key={item.id}
                      className={`p-3.5 rounded-2xl border flex gap-3 group transition-all ${
                        themeMode === 'warm' ? 'bg-[#fffbf7] border-[#d4c4b8]/40 hover:bg-[#f5ede4]' :
                        themeMode === 'dark' ? 'bg-[#242625] border-white/20 hover:bg-[#2e302f]' :
                        'bg-[#f9f9f9] border-[#e1bfb5]/40 hover:bg-white'
                      }`}
                    >
                      <img 
                        src={item.menuItem.image} 
                        alt={item.menuItem.name} 
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className={`font-heading font-bold text-xs truncate ${
                            themeMode === 'warm' ? 'text-[#3d2b1f]' :
                            themeMode === 'dark' ? 'text-[#f5f5f5]' :
                            'text-[#1a1c1c]'
                          }`}>
                            {item.menuItem.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className={`transition-colors ${
                              themeMode === 'warm' ? 'text-[#6b5a4a] hover:text-[#ba1a1a]' :
                              themeMode === 'dark' ? 'text-[#c4c4c4] hover:text-[#ba1a1a]' :
                              'text-[#8d7168] hover:text-[#ba1a1a]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>

                        {/* Options summary */}
                        {Object.entries(item.selectedOptions).length > 0 && (
                          <div className={`text-[10px] space-y-0.5 mt-1 ${
                            themeMode === 'warm' ? 'text-[#6b5a4a]' :
                            themeMode === 'dark' ? 'text-[#c4c4c4]' :
                            'text-[#594139]'
                          }`}>
                            {Object.entries(item.selectedOptions).map(([key, val]) => (
                              <p key={key} className="truncate">
                                <span className={`font-medium ${
                                  themeMode === 'warm' ? 'text-[#6b5a4a]' :
                                  themeMode === 'dark' ? 'text-[#c4c4c4]' :
                                  'text-[#8d7168]'
                                }`}>{key}:</span> {val}
                              </p>
                            ))}
                          </div>
                        )}

                        {item.specialInstructions && (
                          <p className="text-[10px] text-[#006c4f] italic mt-1 truncate">
                            Note: "{item.specialInstructions}"
                          </p>
                        )}

                        <div className={`flex items-center justify-between mt-2 pt-2 border-t ${
                          themeMode === 'warm' ? 'border-t-[#d4c4b8]/20' :
                          themeMode === 'dark' ? 'border-t-white/20' :
                          'border-t-[#e1bfb5]/20'
                        }`}>
                          <span className="font-heading font-bold text-xs text-[#ab3500]">
                            ${item.itemTotal.toFixed(2)}
                          </span>

                          <div className={`flex items-center gap-2 rounded-lg border px-1.5 py-0.5 ${
                            themeMode === 'warm' ? 'bg-[#fffbf7] border-[#d4c4b8]/60' :
                            themeMode === 'dark' ? 'bg-[#242625] border-white/20' :
                            'bg-white border-[#e1bfb5]/60'
                          }`}>
                            <button
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className={`w-5 h-5 flex items-center justify-center hover:text-[#ab3500] ${
                                themeMode === 'warm' ? 'text-[#6b5a4a]' :
                                themeMode === 'dark' ? 'text-[#c4c4c4]' :
                                'text-[#594139]'
                              }`}
                            >
                              -
                            </button>
                            <span className={`text-xs font-bold min-w-3 text-center ${
                              themeMode === 'warm' ? 'text-[#3d2b1f]' :
                              themeMode === 'dark' ? 'text-[#f5f5f5]' :
                              'text-[#1a1c1c]'
                            }`}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, 1)}
                              className={`w-5 h-5 flex items-center justify-center hover:text-[#ab3500] ${
                                themeMode === 'warm' ? 'text-[#6b5a4a]' :
                                themeMode === 'dark' ? 'text-[#c4c4c4]' :
                                'text-[#594139]'
                              }`}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="pt-2">
                  {appliedPromo ? (
                    <div className={`p-3 rounded-2xl border flex items-center justify-between ${
                      themeMode === 'warm' ? 'bg-[#00ae81]/10 border-[#00ae81]/30' :
                      themeMode === 'dark' ? 'bg-[#00ae81]/20 border-[#00ae81]/40' :
                      'bg-[#00ae81]/10 border-[#00ae81]/30'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined text-[20px] ${
                          themeMode === 'warm' ? 'text-[#006c4f]' :
                          themeMode === 'dark' ? 'text-[#00ff99]' :
                          'text-[#006c4f]'
                        }`}>local_offer</span>
                        <div>
                          <p className={`text-xs font-bold ${
                            themeMode === 'warm' ? 'text-[#006c4f]' :
                            themeMode === 'dark' ? 'text-[#00ff99]' :
                            'text-[#006c4f]'
                          }`}>{appliedPromo.code} Applied</p>
                          <p className={`text-[10px] ${
                            themeMode === 'warm' ? 'text-[#6b5a4a]' :
                            themeMode === 'dark' ? 'text-[#c4c4c4]' :
                            'text-[#594139]'
                          }`}>
                            {appliedPromo.discountType === 'percentage' 
                              ? `${appliedPromo.discountValue}% off order`
                              : `$${appliedPromo.discountValue} discount`}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className={`text-xs font-bold hover:underline ${
                          themeMode === 'warm' ? 'text-[#ba1a1a]' :
                          themeMode === 'dark' ? 'text-[#ff6b6b]' :
                          'text-[#ba1a1a]'
                        }`}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="space-y-1">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo code (e.g. WELCOME20)"
                          value={promoInput}
                          onChange={(e) => {
                            setPromoInput(e.target.value.toUpperCase());
                            setPromoError('');
                          }}
                          className="flex-1 glass-input px-3 py-2 rounded-xl text-xs font-medium uppercase"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#f3f3f3] hover:bg-[#e8e8e8] border border-[#e1bfb5] rounded-xl text-xs font-bold text-[#1a1c1c] transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <p className="text-[11px] text-[#ba1a1a] px-1">{promoError}</p>
                      )}
                    </form>
                  )}
                </div>

                {/* Pricing Summary */}
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
                    <span>Item Subtotal</span>
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
                    <span>Service & Eco Fee</span>
                    <span className={`font-semibold ${
                      themeMode === 'warm' ? 'text-[#3d2b1f]' :
                      themeMode === 'dark' ? 'text-[#f5f5f5]' :
                      'text-[#1a1c1c]'
                    }`}>${serviceFee.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className={`flex justify-between font-bold ${
                      themeMode === 'warm' ? 'text-[#006c4f]' :
                      themeMode === 'dark' ? 'text-[#00ff99]' :
                      'text-[#006c4f]'
                    }`}>
                      <span>Promo Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className={`pt-2 border-t flex justify-between font-heading font-extrabold text-sm ${
                    themeMode === 'warm' ? 'border-t-[#d4c4b8]/40 text-[#3d2b1f]' :
                    themeMode === 'dark' ? 'border-t-white/20 text-[#f5f5f5]' :
                    'border-t-[#e1bfb5]/40 text-[#1a1c1c]'
                  }`}>
                    <span>Total (excl. tip)</span>
                    <span className="text-[#ab3500]">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className={`p-5 border-t space-y-3 ${
              themeMode === 'warm' ? 'border-t-[#d4c4b8]/40 bg-[#fffbf7]' :
              themeMode === 'dark' ? 'border-t-white/20 bg-[#242625]' :
              'border-t-[#e1bfb5]/40 bg-white'
            }`}>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setCustomerTab('checkout');
                }}
                className="w-full py-3.5 rounded-2xl glass-button-primary font-heading font-bold text-sm flex items-center justify-between px-5 cursor-pointer shadow-lg shadow-[#ab3500]/25"
              >
                <span>Proceed to Checkout</span>
                <span className="flex items-center gap-1 font-extrabold">
                  ${grandTotal.toFixed(2)}
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </span>
              </button>
              <p className={`text-center text-[11px] ${
                themeMode === 'warm' ? 'text-[#6b5a4a]' :
                themeMode === 'dark' ? 'text-[#c4c4c4]' :
                'text-[#8d7168]'
              }`}>
                ⚡ Guaranteed 20-30 min contactless delivery
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
