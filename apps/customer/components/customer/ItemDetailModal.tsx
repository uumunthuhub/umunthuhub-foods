'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuItem } from '@umunthuhub/shared-types';

export const ItemDetailModal: React.FC = () => {
  const {
    isItemModalOpen,
    closeItemModal,
    selectedItemForModal,
    addToCart,
    themeMode
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
      <div className={`relative w-full max-w-lg glass-panel rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 ${
        themeMode === 'warm' ? 'bg-[#fffbf7]/95 border-[#d4c4b8]' :
        themeMode === 'dark' ? 'bg-[#242625]/95 border-white/20' :
        'bg-white/95 border-[#e1bfb5]'
      }`}>
        
        {/* Header Image */}
        <div className="relative h-64 w-full overflow-hidden bg-black/5">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <button
            onClick={closeItemModal}
            className={`absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer ${
              themeMode === 'warm' ? 'bg-[#fffbf7]/80 hover:bg-[#fffbf7] text-[#3d2b1f]' :
              themeMode === 'dark' ? 'bg-[#242625]/80 hover:bg-[#242625] text-[#f5f5f5]' :
              'bg-white/80 hover:bg-white text-[#1a1c1c]'
            }`}
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
          <p className={`text-xs leading-relaxed ${
            themeMode === 'warm' ? 'text-[#6b5a4a]' :
            themeMode === 'dark' ? 'text-[#c4c4c4]' :
            'text-[#594139]'
          }`}>
            {item.description}
          </p>

          {/* Options / Customizations */}
          {item.options && item.options.length > 0 && (
            <div className="space-y-5 pt-2">
              {item.options.map(option => (
                <div key={option.name} className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-heading font-bold text-xs ${
                      themeMode === 'warm' ? 'text-[#3d2b1f]' :
                      themeMode === 'dark' ? 'text-[#f5f5f5]' :
                      'text-[#1a1c1c]'
                    }`}>
                      {option.name}
                    </h4>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      option.required 
                        ? (themeMode === 'warm' ? 'bg-[#ffdad6] text-[#ba1a1a]' :
                           themeMode === 'dark' ? 'bg-[#ffdad6]/50 text-[#ff6b6b]' :
                           'bg-[#ffdad6] text-[#ba1a1a]')
                        : (themeMode === 'warm' ? 'bg-[#f5ede4] text-[#6b5a4a]' :
                           themeMode === 'dark' ? 'bg-[#2e302f] text-[#c4c4c4]' :
                           'bg-[#f3f3f3] text-[#8d7168]')
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
                              : (themeMode === 'warm' ? 'bg-[#fffbf7] border-[#d4c4b8]/50 text-[#3d2b1f] hover:bg-[#f5ede4]' :
                                 themeMode === 'dark' ? 'bg-[#242625] border-white/20 text-[#f5f5f5] hover:bg-[#2e302f]' :
                                 'bg-[#f9f9f9] border-[#e1bfb5]/50 text-[#1a1c1c] hover:bg-[#f3f3f3]')
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-[#ab3500] bg-[#ab3500]' : (themeMode === 'warm' ? 'border-[#6b5a4a] bg-[#fffbf7]' :
                              themeMode === 'dark' ? 'border-[#c4c4c4] bg-[#242625]' :
                              'border-[#8d7168] bg-white')
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
            <label className={`font-heading font-bold text-xs flex items-center gap-1.5 ${
              themeMode === 'warm' ? 'text-[#3d2b1f]' :
              themeMode === 'dark' ? 'text-[#f5f5f5]' :
              'text-[#1a1c1c]'
            }`}>
              <span className={`material-symbols-outlined text-[16px] ${
                themeMode === 'warm' ? 'text-[#6b5a4a]' :
                themeMode === 'dark' ? 'text-[#c4c4c4]' :
                'text-[#8d7168]'
              }`}>edit_note</span>
              Special Kitchen Instructions
            </label>
            <input
              type="text"
              placeholder="e.g. Extra napkins, dressing on side, no onions..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className={`w-full glass-input px-3.5 py-2.5 rounded-xl text-xs font-medium ${
                themeMode === 'warm' ? 'text-[#3d2b1f]' :
                themeMode === 'dark' ? 'text-[#f5f5f5]' :
                'text-[#1a1c1c]'
              }`}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className={`p-5 border-t flex items-center justify-between gap-4 ${
          themeMode === 'warm' ? 'border-t-[#d4c4b8]/40 bg-[#fffbf7]' :
          themeMode === 'dark' ? 'border-t-white/20 bg-[#242625]' :
          'border-t-[#e1bfb5]/40 bg-[#f9f9f9]'
        }`}>
          
          {/* Quantity Controls */}
          <div className={`flex items-center gap-3 px-3 py-2 rounded-2xl border shadow-sm ${
            themeMode === 'warm' ? 'bg-white border-[#d4c4b8]/60' :
            themeMode === 'dark' ? 'bg-[#2e302f] border-white/20' :
            'bg-white border-[#e1bfb5]/60'
          }`}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className={`w-7 h-7 rounded-xl disabled:opacity-40 flex items-center justify-center font-bold transition-colors ${
                themeMode === 'warm' ? 'bg-[#f5ede4] hover:bg-[#e9ddcf] text-[#3d2b1f]' :
                themeMode === 'dark' ? 'bg-[#2e302f] hover:bg-[#383a39] text-[#f5f5f5]' :
                'bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#1a1c1c]'
              }`}
            >
              -
            </button>
            <span className={`font-heading font-extrabold text-sm min-w-[18px] text-center ${
              themeMode === 'warm' ? 'text-[#3d2b1f]' :
              themeMode === 'dark' ? 'text-[#f5f5f5]' :
              'text-[#1a1c1c]'
            }`}>
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold transition-colors ${
                themeMode === 'warm' ? 'bg-[#f5ede4] hover:bg-[#e9ddcf] text-[#3d2b1f]' :
                themeMode === 'dark' ? 'bg-[#2e302f] hover:bg-[#383a39] text-[#f5f5f5]' :
                'bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#1a1c1c]'
              }`}
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

