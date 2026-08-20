'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuItem } from '@umunthuhub/shared-types';

export const ItemDetailModal: React.FC = () => {
  const {
    isItemModalOpen,
    closeItemModal,
    selectedItemForModal,
    addToCart
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [instructions, setInstructions] = useState('');

  const item: MenuItem | null = selectedItemForModal;

  // Initialize default options when modal opens
  useEffect(() => {
    if (item && item.options) {
      const defaults: Record<string, string> = {};
      item.options.forEach(opt => {
        if (opt.required && opt.choices.length > 0) {
          defaults[opt.name] = opt.choices[0].name;
        }
      });
      setSelectedOptions(defaults);
      setQuantity(1);
      setInstructions('');
    }
  }, [item]);

  if (!isItemModalOpen || !item) return null;

  // Calculate current unit price with options
  let optionsDelta = 0;
  if (item.options) {
    item.options.forEach(opt => {
      const choiceName = selectedOptions[opt.name];
      if (choiceName) {
        const choice = opt.choices.find(c => c.name === choiceName);
        if (choice) optionsDelta += choice.priceDelta;
      }
    });
  }

  const unitPrice = item.price + optionsDelta;
  const totalPrice = unitPrice * quantity;

  const handleOptionSelect = (optionName: string, choiceName: string, isRequired: boolean) => {
    setSelectedOptions(prev => {
      // If optional and clicked again, deselect
      if (!isRequired && prev[optionName] === choiceName) {
        const next = { ...prev };
        delete next[optionName];
        return next;
      }
      return { ...prev, [optionName]: choiceName };
    });
  };

  const handleAddToCart = () => {
    addToCart(item, quantity, selectedOptions, instructions);
    closeItemModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeItemModal}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg glass-panel rounded-3xl overflow-hidden shadow-2xl bg-white/95 border border-[#e1bfb5] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Image */}
        <div className="relative h-56 w-full overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <button
            onClick={closeItemModal}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1a1c1c] flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              {item.isPopular && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#ff6b35] text-white">
                  POPULAR
                </span>
              )}
              {item.isVeg && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#00ae81] text-white">
                  VEG
                </span>
              )}
              {item.isGlutenFree && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#24619d] text-white">
                  GLUTEN-FREE
                </span>
              )}
              {item.calories && (
                <span className="text-xs text-white/80 font-medium">
                  {item.calories} kcal
                </span>
              )}
            </div>
            <h3 className="font-heading font-extrabold text-xl text-white drop-shadow-sm">
              {item.name}
            </h3>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[55vh] overflow-y-auto">
          <p className="text-xs text-[#594139] leading-relaxed">
            {item.description}
          </p>

          {/* Options / Customizations */}
          {item.options && item.options.length > 0 && (
            <div className="space-y-5 pt-2">
              {item.options.map(option => (
                <div key={option.name} className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-xs text-[#1a1c1c]">
                      {option.name}
                    </h4>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      option.required ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#f3f3f3] text-[#8d7168]'
                    }`}>
                      {option.required ? 'Required' : 'Optional'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {option.choices.map(choice => {
                      const isSelected = selectedOptions[option.name] === choice.name;
                      return (
                        <button
                          key={choice.name}
                          type="button"
                          onClick={() => handleOptionSelect(option.name, choice.name, option.required)}
                          className={`flex items-center justify-between p-3 rounded-2xl text-xs font-semibold text-left transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-[#ff6b35]/15 border-2 border-[#ab3500] text-[#ab3500]' 
                              : 'bg-[#f9f9f9] border border-[#e1bfb5]/50 text-[#1a1c1c] hover:bg-[#f3f3f3]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-[#ab3500] bg-[#ab3500]' : 'border-[#8d7168] bg-white'
                            }`}>
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <span>{choice.name}</span>
                          </div>

                          <span className="text-xs font-bold">
                            {choice.priceDelta > 0 ? `+$${choice.priceDelta.toFixed(2)}` : 'Included'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Special Instructions Note */}
          <div className="space-y-1.5">
            <label className="font-heading font-bold text-xs text-[#1a1c1c] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#8d7168]">edit_note</span>
              Special Kitchen Instructions
            </label>
            <input
              type="text"
              placeholder="e.g. Extra napkins, dressing on side, no onions..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#1a1c1c]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#e1bfb5]/40 bg-[#f9f9f9] flex items-center justify-between gap-4">
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-2xl border border-[#e1bfb5]/60 shadow-sm">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-7 h-7 rounded-xl bg-[#f3f3f3] hover:bg-[#e8e8e8] disabled:opacity-40 flex items-center justify-center font-bold text-[#1a1c1c] transition-colors"
            >
              -
            </button>
            <span className="font-heading font-extrabold text-sm text-[#1a1c1c] min-w-[18px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-xl bg-[#f3f3f3] hover:bg-[#e8e8e8] flex items-center justify-center font-bold text-[#1a1c1c] transition-colors"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3.5 px-5 rounded-2xl glass-button-primary font-heading font-bold text-xs flex items-center justify-between shadow-lg shadow-[#ab3500]/25 active:scale-98 transition-all cursor-pointer"
          >
            <span>Add to Order Tray</span>
            <span className="text-sm font-extrabold">${totalPrice.toFixed(2)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
