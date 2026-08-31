'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Utensils } from 'lucide-react';

export const CorporateMenu: React.FC = () => {
  const { showToast, themeMode } = useApp();
  const [search, setSearch] = useState('');

  const menuItems = [
    { id: 1, name: 'Mediterranean Platter', category: 'Appetizers', price: 18.50, vendor: 'Olive Grove', available: true },
    { id: 2, name: 'Grilled Salmon Bowl', category: 'Main Courses', price: 24.00, vendor: 'Fresh Catch', available: true },
    { id: 3, name: 'Vegan Buddha Bowl', category: 'Main Courses', price: 19.50, vendor: 'Green Kitchen', available: true },
    { id: 4, name: 'Artisan Cheese Board', category: 'Appetizers', price: 22.00, vendor: 'Olive Grove', available: true },
    { id: 5, name: 'Chicken Caesar Wrap', category: 'Sandwiches', price: 15.00, vendor: 'Urban Deli', available: true },
    { id: 6, name: 'Quinoa Salad', category: 'Salads', price: 14.50, vendor: 'Green Kitchen', available: true },
    { id: 7, name: 'Beef Burger', category: 'Main Courses', price: 21.00, vendor: 'Urban Deli', available: false },
    { id: 8, name: 'Fruit Smoothie', category: 'Beverages', price: 8.00, vendor: 'Fresh Blend', available: true },
  ];

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase()) ||
    item.vendor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20 max-w-5xl">
      
      {/* Header */}
      <div className={`rounded-3xl p-6 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>
        <div>
          <h1 className={`font-heading font-extrabold text-xl sm:text-2xl ${
            themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
          }`}>
            Corporate Menu Catalog
          </h1>
          <p className={`text-xs mt-0.5 ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>
            Curated menu items available for corporate meal programs
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className={`rounded-2xl p-4 border ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'bg-white border-gray-100'
      }`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
          <input
            type="text"
            placeholder="Search menu items, categories, or vendors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:border-[#24619d] focus:ring-2 focus:ring-[#24619d]/20 transition-all ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                : 'bg-gray-50 border-gray-200 text-gray-900'
            }`}
          />
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div key={item.id} className={`rounded-2xl p-5 border shadow-lg hover:shadow-xl transition-all ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]'
              : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] text-[#c4c4c4]'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {item.category}
              </span>
              {!item.available && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  themeMode === 'dark'
                    ? 'bg-[#24619d]/30 text-[#24619d]'
                    : 'bg-[#24619d]/15 text-[#24619d]'
                }`}>
                  Unavailable
                </span>
              )}
            </div>
            
            <h3 className={`font-heading font-bold text-base mb-1 ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
            }`}>
              {item.name}
            </h3>
            
            <p className={`text-xs mb-3 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>
              {item.vendor}
            </p>
            
            <div className={`flex items-center justify-between pt-3 border-t ${
              themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-gray-100'
            }`}>
              <span className={`font-heading font-extrabold text-lg ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
              }`}>
                ${item.price.toFixed(2)}
              </span>
              <button
                onClick={() => showToast('Added to Cart', `${item.name} added to corporate order`, 'success')}
                disabled={!item.available}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  !item.available
                    ? (themeMode === 'dark' ? 'bg-[#383a39] text-[#7a7a7a] cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                    : themeMode === 'dark'
                      ? 'bg-[#24619d] hover:bg-[#1a4b7a] text-white'
                      : 'bg-[#24619d] hover:bg-[#1a4b7a] text-white'
                }`}
              >
                Add to Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className={`rounded-2xl p-12 text-center border ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'bg-white border-gray-100'
        }`}>
          <Utensils className={`text-5xl mb-3 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-300'}`} />
          <h3 className={`font-heading font-bold text-base ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
            No Menu Items Found
          </h3>
          <p className={`text-xs mt-1 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>
            Try adjusting your search criteria
          </p>
        </div>
      )}

    </div>
  );
};
