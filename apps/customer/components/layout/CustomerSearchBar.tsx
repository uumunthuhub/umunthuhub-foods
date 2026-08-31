'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../../context/AppContext';

const TRENDING = [
  'Wagyu Burger', 'Dragon Roll', 'Truffle Pizza', 'Acai Bowl', 'Pad Thai', 'Birria Tacos',
];

const CATEGORIES = [
  { label: 'Burgers', icon: 'lunch_dining' },
  { label: 'Sushi', icon: 'set_meal' },
  { label: 'Pizza', icon: 'local_pizza' },
  { label: 'Healthy', icon: 'eco' },
  { label: 'Desserts', icon: 'icecream' },
  { label: 'Drinks', icon: 'local_cafe' },
];

export const CustomerSearchBar: React.FC = () => {
  const { menuItems, tenants, openItemModal, setSelectedRestaurantId, themeMode } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Ctrl/Cmd+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Deduplicate + search
  const uniqueItems = Array.from(new Map(menuItems.map(m => [m.id, m])).values());

  const results = query.trim()
    ? uniqueItems.filter(m =>
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.category.toLowerCase().includes(query.toLowerCase()) ||
        m.description?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : (() => {
        const popular = uniqueItems.filter(m => m.isPopular);
        return (popular.length > 0 ? popular : uniqueItems).slice(0, 8);
      })();

  const handleSelect = useCallback((item: typeof uniqueItems[number]) => {
    setSelectedRestaurantId(item.tenantId);
    openItemModal(item);
    setIsOpen(false);
  }, [openItemModal, setSelectedRestaurantId]);

  const handleTrending = (term: string) => setQuery(term);

  return (
    <>
      {/* ── Trigger button ── */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Search food"
        className={`flex items-center gap-1.5 h-9 px-3 rounded-xl border text-xs font-semibold transition-all duration-150 cursor-pointer group active:scale-95 ${
          themeMode === 'warm' ? 'bg-[#f5ede4] hover:bg-[#e9ddcf] border-[#d4c4b8]/60 text-[#6b5a4a]' :
          themeMode === 'dark' ? 'bg-[#2e302f] hover:bg-[#383a39] border-white/20 text-[#c4c4c4]' :
          'bg-[#f3f3f3] hover:bg-[#ede0dc] border-[#e1bfb5]/60 text-[#594139]'
        }`}
      >
        <span className={`material-symbols-outlined text-[18px] transition-colors ${
          themeMode === 'warm' ? 'text-[#6b5a4a] group-hover:text-[#ab3500]' :
          themeMode === 'dark' ? 'text-[#c4c4c4] group-hover:text-[#ab3500]' :
          'text-[#8d7168] group-hover:text-[#ab3500]'
        }`}>
          search
        </span>
        <span className={`hidden sm:inline group-hover:text-[#594139] ${
          themeMode === 'warm' ? 'text-[#6b5a4a]' :
          themeMode === 'dark' ? 'text-[#c4c4c4]' :
          'text-[#8d7168]'
        }`}>Search…</span>
        <span className={`hidden md:inline ml-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold tracking-wide ${
          themeMode === 'warm' ? 'bg-[#d4c4b8]/40 text-[#6b5a4a]' :
          themeMode === 'dark' ? 'bg-white/20 text-[#c4c4c4]' :
          'bg-[#e1bfb5]/40 text-[#8d7168]'
        }`}>
          ⌘K
        </span>
      </button>

      {/* ── Search Modal ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-60 flex items-start justify-center pt-16 sm:pt-24 px-3"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal panel */}
          <div className={`relative w-full max-w-xl backdrop-blur-2xl rounded-3xl shadow-2xl border overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 ${
            themeMode === 'warm' ? 'bg-[#fffbf7]/95 border-[#d4c4b8]/50' :
            themeMode === 'dark' ? 'bg-[#242625]/95 border-white/20' :
            'bg-white/95 border-[#e1bfb5]/50'
          }`}>

            {/* Search input row */}
            <div className={`flex items-center gap-3 px-4 py-3.5 border-b ${
              themeMode === 'warm' ? 'border-[#d4c4b8]/40' :
              themeMode === 'dark' ? 'border-white/20' :
              'border-[#f0e8e4]'
            }`}>
              <span className="material-symbols-outlined text-[22px] text-[#ab3500] shrink-0">
                search
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search dishes, cuisines, restaurants…"
                className={`flex-1 text-sm font-semibold bg-transparent outline-none ${
                  themeMode === 'warm' ? 'text-[#3d2b1f] placeholder:text-[#8d7a70]' :
                  themeMode === 'dark' ? 'text-[#f5f5f5] placeholder:text-[#7a7a7a]' :
                  'text-[#1a1c1c] placeholder:text-[#b3a49b]'
                }`}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    themeMode === 'warm' ? 'bg-[#f5ede4] text-[#6b5a4a] hover:bg-[#e9ddcf]' :
                    themeMode === 'dark' ? 'bg-[#2e302f] text-[#c4c4c4] hover:bg-[#383a39]' :
                    'bg-[#f3f3f3] text-[#8d7168] hover:bg-[#e8e8e8]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              )}
              <kbd className={`hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md border text-[10px] font-bold ${
                themeMode === 'warm' ? 'border-[#d4c4b8] text-[#6b5a4a] bg-[#fffbf7]' :
                themeMode === 'dark' ? 'border-white/30 text-[#c4c4c4] bg-[#242625]' :
                'border-[#e1bfb5] text-[#8d7168] bg-[#f9f9f9]'
              }`}>
                ESC
              </kbd>
            </div>

            {/* Body */}
            <div className="max-h-[60vh] overflow-y-auto px-4 py-4 space-y-5">

              {/* Trending chips — only when no query */}
              {!query && (
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider mb-2.5 ${
                    themeMode === 'warm' ? 'text-[#6b5a4a]' :
                    themeMode === 'dark' ? 'text-[#c4c4c4]' :
                    'text-[#8d7168]'
                  }`}>
                    🔥 Trending now
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {TRENDING.map(term => (
                      <button
                        key={term}
                        onClick={() => handleTrending(term)}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer border ${
                          themeMode === 'warm' ? 'bg-[#f5ede4] hover:bg-[#e9ddcf] hover:text-[#ab3500] text-[#6b5a4a] border-transparent hover:border-[#d4c4b8]' :
                          themeMode === 'dark' ? 'bg-[#2e302f] hover:bg-[#383a39] hover:text-[#ab3500] text-[#c4c4c4] border-transparent hover:border-white/30' :
                          'bg-[#f3f3f3] hover:bg-[#ede0dc] hover:text-[#ab3500] text-[#594139] border-transparent hover:border-[#e1bfb5]'
                        }`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Category chips — only when no query */}
              {!query && (
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider mb-2.5 ${
                    themeMode === 'warm' ? 'text-[#6b5a4a]' :
                    themeMode === 'dark' ? 'text-[#c4c4c4]' :
                    'text-[#8d7168]'
                  }`}>
                    Browse by category
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.label}
                        onClick={() => handleTrending(cat.label)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                          themeMode === 'warm' ? 'bg-[#fffbf7] hover:bg-[#f5ede4] hover:border-[#ab3500]/30 border-[#d4c4b8]/50 text-[#6b5a4a]' :
                          themeMode === 'dark' ? 'bg-[#242625] hover:bg-[#2e302f] hover:border-[#ab3500]/30 border-white/20 text-[#c4c4c4]' :
                          'bg-[#f9f9f9] hover:bg-[#f3ece9] hover:border-[#ab3500]/30 border-[#e1bfb5]/50 text-[#594139]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#ab3500]">
                          {cat.icon}
                        </span>
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results / Featured */}
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-wider mb-2.5 ${
                  themeMode === 'warm' ? 'text-[#6b5a4a]' :
                  themeMode === 'dark' ? 'text-[#c4c4c4]' :
                  'text-[#8d7168]'
                }`}>
                  {query ? `Results for "${query}" (${results.length})` : '⭐ Featured items'}
                </p>

                {results.length === 0 ? (
                  <div className="text-center py-8">
                    <span className={`material-symbols-outlined text-[40px] ${
                      themeMode === 'warm' ? 'text-[#d4c4b8]' :
                      themeMode === 'dark' ? 'text-white/30' :
                      'text-[#e1bfb5]'
                    }`}>
                      search_off
                    </span>
                    <p className={`text-sm mt-2 ${
                      themeMode === 'warm' ? 'text-[#6b5a4a]' :
                      themeMode === 'dark' ? 'text-[#c4c4c4]' :
                      'text-[#8d7168]'
                    }`}>No dishes found for that search.</p>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {results.map((item, idx) => {
                      const restaurant = tenants.find(t => t.id === item.tenantId);
                      return (
                        <button
                          key={`${item.id}-${idx}`}
                          onClick={() => handleSelect(item)}
                          className={`w-full flex items-center gap-3 p-2.5 rounded-2xl transition-all duration-150 cursor-pointer group text-left ${
                            themeMode === 'warm' ? 'hover:bg-[#f5ede4]' :
                            themeMode === 'dark' ? 'hover:bg-[#2e302f]' :
                            'hover:bg-[#f9f0ed]'
                          }`}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className={`w-12 h-12 rounded-xl object-cover border shrink-0 ${
                              themeMode === 'warm' ? 'border-[#d4c4b8]/50' :
                              themeMode === 'dark' ? 'border-white/20' :
                              'border-[#e1bfb5]/50'
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-bold truncate transition-colors ${
                              themeMode === 'warm' ? 'text-[#3d2b1f] group-hover:text-[#ab3500]' :
                              themeMode === 'dark' ? 'text-[#f5f5f5] group-hover:text-[#ab3500]' :
                              'text-[#1a1c1c] group-hover:text-[#ab3500]'
                            }`}>
                              {item.name}
                            </p>
                            {restaurant && (
                              <p className={`text-[10px] truncate ${
                                themeMode === 'warm' ? 'text-[#6b5a4a]' :
                                themeMode === 'dark' ? 'text-[#c4c4c4]' :
                                'text-[#8d7168]'
                              }`}>{restaurant.name}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-mono font-bold text-xs text-[#ab3500]">
                              ${item.price.toFixed(2)}
                            </span>
                            <span className="w-6 h-6 rounded-full bg-[#ab3500]/10 group-hover:bg-[#ab3500] flex items-center justify-center transition-colors">
                              <span className="material-symbols-outlined text-[14px] text-[#ab3500] group-hover:text-white transition-colors">
                                add
                              </span>
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Footer hint */}
            <div className={`px-4 py-2.5 border-t flex items-center justify-between ${
              themeMode === 'warm' ? 'border-[#d4c4b8]/40 bg-[#f5ede4]' :
              themeMode === 'dark' ? 'border-white/20 bg-[#242625]' :
              'border-[#f0e8e4] bg-[#faf8f7]'
            }`}>
              <p className={`text-[10px] ${
                themeMode === 'warm' ? 'text-[#8d7a70]' :
                themeMode === 'dark' ? 'text-[#7a7a7a]' :
                'text-[#b3a49b]'
              }`}>
                Click any item to view details &amp; add to tray
              </p>
              <div className={`flex items-center gap-2 text-[10px] ${
                themeMode === 'warm' ? 'text-[#8d7a70]' :
                themeMode === 'dark' ? 'text-[#7a7a7a]' :
                'text-[#b3a49b]'
              }`}>
                <kbd className={`px-1.5 py-0.5 rounded border font-bold ${
                  themeMode === 'warm' ? 'border-[#d4c4b8] bg-[#fffbf7]' :
                  themeMode === 'dark' ? 'border-white/30 bg-[#242625]' :
                  'border-[#e1bfb5] bg-white'
                }`}>↑↓</kbd>
                <span>navigate</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
