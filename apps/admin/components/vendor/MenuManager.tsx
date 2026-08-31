'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Search, Edit, X } from 'lucide-react';
import { MenuItem } from '@umunthuhub/shared-types';

export const MenuManager: React.FC = () => {
  const {
    currentTenant,
    menuItems,
    addMenuItem,
    updateMenuItem,
    toggleItemStock,
    showToast,
    themeMode
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Add/Edit Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('14.50');
  const [category, setCategory] = useState<MenuItem['category']>('Mains');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80');
  const [isVeg, setIsVeg] = useState(false);
  const [isGF, setIsGF] = useState(false);
  const [isSpicy, setIsSpicy] = useState(false);
  const [prepTime, setPrepTime] = useState('12');

  const tenantItems = menuItems.filter(m => m.tenantId === currentTenant.id);

  const filteredItems = tenantItems.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categories = ['All', 'Starters', 'Mains', 'Sides', 'Desserts', 'Beverages', 'Signature'];

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingItem) {
      updateMenuItem({
        ...editingItem,
        name,
        description,
        price: parseFloat(price) || 0,
        category,
        image,
        isVeg,
        isGlutenFree: isGF,
        isSpicy,
        prepTimeMinutes: parseInt(prepTime) || 10
      });
      setEditingItem(null);
    } else {
      addMenuItem({
        tenantId: currentTenant.id,
        name,
        description,
        price: parseFloat(price) || 0,
        category,
        image,
        isVeg,
        isGlutenFree: isGF,
        isSpicy,
        inStock: true,
        prepTimeMinutes: parseInt(prepTime) || 10,
        isPopular: false
      });
    }

    setIsAddModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('14.50');
    setCategory('Mains');
    setImage('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80');
    setIsVeg(false);
    setIsGF(false);
    setIsSpicy(false);
    setPrepTime('12');
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price.toString());
    setCategory(item.category);
    setImage(item.image);
    setIsVeg(!!item.isVeg);
    setIsGF(!!item.isGlutenFree);
    setIsSpicy(!!item.isSpicy);
    setPrepTime(item.prepTimeMinutes.toString());
    setIsAddModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header Controls */}
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
              Menu & Catalog Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ff6b35]/15 text-[#ab3500]">
              {tenantItems.length} Dishes
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>
            Manage recipes, adjust prices, and toggle in-stock availability for <span className="font-bold">{currentTenant.name}</span>
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setEditingItem(null);
            setIsAddModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-2xl glass-button-primary font-heading font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#ab3500]/25 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-[18px] h-[18px]" />
          <span>Add New Culinary Dish</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className={`rounded-2xl p-3 border flex flex-col md:flex-row items-center justify-between gap-3 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#ab3500] text-white shadow-sm'
                  : themeMode === 'dark'
                    ? 'bg-[#383a39] text-[#c4c4c4] hover:bg-[#4a4a4a] hover:text-[#f5f5f5]'
                    : 'bg-[#f3f3f3] text-[#594139] hover:bg-[#e8e8e8] hover:text-[#1a1c1c]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
          }`} />
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs font-medium ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                : 'glass-input'
            }`}
          />
        </div>
      </div>

      {/* Dishes Table / Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className={`rounded-3xl p-4 border transition-all flex flex-col justify-between space-y-3 ${
              item.inStock
                ? themeMode === 'dark'
                  ? 'bg-[#242625] border-[#3a3a3a]'
                  : 'glass-panel border-[#e1bfb5]/50'
                : themeMode === 'dark'
                  ? 'bg-[#383a39] border-[#ba1a1a]/30 opacity-75'
                  : 'border-[#ba1a1a]/30 bg-[#f9f9f9] opacity-75'
            }`}
          >
            <div>
              <div className="relative h-36 w-full rounded-2xl overflow-hidden mb-3">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 flex gap-1">
                  <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                    {item.category}
                  </span>
                  {item.isPopular && (
                    <span className="px-2 py-0.5 rounded-md bg-[#ff6b35] text-white text-[10px] font-bold">
                      TOP SELLER
                    </span>
                  )}
                </div>

                {/* In Stock Badge */}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => {
                      toggleItemStock(item.id);
                      showToast(
                        item.inStock ? '86’d Out of Stock' : 'Marked In Stock',
                        `${item.name} is now ${item.inStock ? 'unavailable' : 'available'} to customers`,
                        item.inStock ? 'warning' : 'success'
                      );
                    }}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold flex items-center gap-1 shadow-md transition-colors cursor-pointer ${
                      item.inStock 
                        ? 'bg-[#00ae81] text-white' 
                        : 'bg-[#ba1a1a] text-white'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>{item.inStock ? 'IN STOCK' : '86’d (OUT)'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-heading font-bold text-sm truncate ${
                    themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                  }`}>
                    {item.name}
                  </h3>
                  <span className="font-heading font-extrabold text-sm text-[#ab3500]">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <p className={`text-[11px] line-clamp-2 leading-relaxed ${
                  themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
                }`}>
                  {item.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {item.isVeg && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#00ae81]/15 text-[#006c4f]">
                    VEG
                  </span>
                )}
                {item.isGlutenFree && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#24619d]/15 text-[#24619d]">
                    GLUTEN-FREE
                  </span>
                )}
                {item.isSpicy && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#ffdad6] text-[#ba1a1a]">
                    SPICY 🔥
                  </span>
                )}
                <span className={`px-2 py-0.5 rounded text-[9px] font-medium ${
                  themeMode === 'dark' ? 'bg-[#383a39] text-[#7a7a7a]' : 'bg-[#f3f3f3] text-[#8d7168]'
                }`}>
                  ⏱️ {item.prepTimeMinutes}m prep
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className={`pt-3 border-t flex items-center justify-between ${
              themeMode === 'dark' ? 'border-[#3a3a3a]/40' : 'border-[#e1bfb5]/40'
            }`}>
              <button
                onClick={() => openEditModal(item)}
                className={`text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer ${
                  themeMode === 'dark' ? 'text-[#4a9eff]' : 'text-[#24619d]'
                }`}
              >
                <Edit className="w-[16px] h-[16px]" />
                <span>Edit Details</span>
              </button>

              <button
                onClick={() => {
                  toggleItemStock(item.id);
                  showToast('Stock Toggled', `${item.name} stock updated`, 'info');
                }}
                className={`text-xs font-semibold cursor-pointer ${
                  themeMode === 'dark' ? 'text-[#7a7a7a] hover:text-[#ff6b35]' : 'text-[#594139] hover:text-[#ab3500]'
                }`}
              >
                {item.inStock ? 'Mark Unavailable' : 'Restore to Menu'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Dish Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-7 shadow-2xl bg-white border border-[#e1bfb5] animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#e1bfb5]/40 mb-4">
              <h3 className="font-heading font-extrabold text-base text-[#1a1c1c]">
                {editingItem ? 'Edit Culinary Dish' : 'Add New Menu Item'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="w-8 h-8 rounded-full bg-[#f3f3f3] hover:bg-[#e8e8e8] flex items-center justify-center text-[#594139]">
                <X className="w-[18px] h-[18px]" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#1a1c1c] block mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Truffle Infused Risotto"
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1a1c1c] block mb-1">Description & Ingredients</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the flavors, allergens, and preparation details..."
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#1a1c1c] block mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    step="0.25"
                    min="1"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full glass-input px-3.5 py-2 rounded-xl text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1a1c1c] block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full glass-input px-3.5 py-2 rounded-xl text-xs font-semibold bg-white"
                  >
                    <option value="Starters">Starters</option>
                    <option value="Mains">Mains</option>
                    <option value="Sides">Sides</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Signature">Signature</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1a1c1c] block mb-1">Image URL (Food Photo)</label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full glass-input px-3.5 py-2 rounded-xl text-xs"
                />
              </div>

              {/* Dietary checkboxes */}
              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#1a1c1c] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVeg}
                    onChange={(e) => setIsVeg(e.target.checked)}
                    className="rounded text-[#ab3500]"
                  />
                  <span>Vegetarian</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#1a1c1c] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isGF}
                    onChange={(e) => setIsGF(e.target.checked)}
                    className="rounded text-[#ab3500]"
                  />
                  <span>Gluten-Free</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#1a1c1c] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSpicy}
                    onChange={(e) => setIsSpicy(e.target.checked)}
                    className="rounded text-[#ab3500]"
                  />
                  <span>Spicy</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#e1bfb5]/40 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-[#f3f3f3] text-xs font-bold text-[#594139]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl glass-button-primary text-xs font-bold shadow-md shadow-[#ab3500]/25"
                >
                  {editingItem ? 'Save Changes' : 'Publish Dish to Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
