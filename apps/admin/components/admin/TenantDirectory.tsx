'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Store, Plus, Search, MapPin, Phone, ArrowRight } from 'lucide-react';
import { Tenant } from '@umunthuhub/shared-types';

export const TenantDirectory: React.FC = () => {
  const {
    tenants,
    setCurrentTenantId,
    setPersona,
    setVendorTab,
    setAdminTab,
    showToast,
    themeMode
  } = useApp();

  const [search, setSearch] = useState('');
  const [filterCuisine, setFilterCuisine] = useState('All');

  const cuisines = ['All', ...Array.from(new Set(tenants.map(t => t.cuisine)))];

  const filteredTenants = tenants.filter(t => {
    const matchesCuisine = filterCuisine === 'All' || t.cuisine === filterCuisine;
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                          t.cuisine.toLowerCase().includes(search.toLowerCase()) ||
                          t.address.toLowerCase().includes(search.toLowerCase());
    return matchesCuisine && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className={`rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        themeMode === 'dark'
          ? 'bg-linear-to-r from-[#1a1c1c] to-[#2d2d2d]'
          : 'bg-linear-to-r from-[#1a1c1c] to-[#2d2d2d]'
      }`}>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-[#ab3500]/20 flex items-center justify-center">
              <Store className="w-[28px] h-[28px] text-[#ab3500]" />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                Multi-Tenant Kitchen Directory
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ab3500]/30 text-[#ab3500] border border-[#ab3500]/40">
                {tenants.length} Managed Venues
              </span>
            </div>
          </div>
          <p className={`text-xs mt-2 ${
            themeMode === 'dark' ? 'text-gray-400' : 'text-gray-400'
          }`}>
            Audit store health, commission rates, operational hours, and menu compliance
          </p>
        </div>

        <button
          onClick={() => setAdminTab('store_wizard')}
          className="px-5 py-2.5 rounded-xl bg-[#ab3500] hover:bg-[#8a2a00] text-white text-xs font-bold transition-all shadow-lg shadow-[#ab3500]/30 flex items-center gap-2"
        >
          <Plus className="w-[18px] h-[18px]" />
          <span>Provision New Merchant</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className={`rounded-2xl p-4 shadow-lg border flex flex-col md:flex-row items-center justify-between gap-3 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {cuisines.map(c => (
            <button
              key={c}
              onClick={() => setFilterCuisine(c)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterCuisine === c
                  ? 'bg-[#ab3500] text-white shadow-md'
                  : themeMode === 'dark'
                    ? 'bg-[#383a39] text-[#c4c4c4] hover:bg-[#4a4a4a]'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Search merchants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-xs font-medium focus:outline-none focus:border-[#ab3500] focus:ring-2 focus:ring-[#ab3500]/20 transition-all ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                : 'bg-gray-50 border-gray-200 text-gray-900'
            }`}
          />
        </div>
      </div>

      {/* Tenants Table Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTenants.map(tenant => (
          <div
            key={tenant.id}
            className={`rounded-2xl p-5 shadow-lg border flex flex-col justify-between space-y-4 hover:shadow-xl transition-all ${
              themeMode === 'dark'
                ? 'bg-[#242625] border-[#3a3a3a]'
                : 'bg-white border-gray-100'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={tenant.logo}
                    alt={tenant.name}
                    className={`w-14 h-14 rounded-xl object-cover border-2 shadow-md ${
                      themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-white'
                    }`}
                  />
                  <div>
                    <h3 className={`font-heading font-extrabold text-sm ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>{tenant.name}</h3>
                    <p className={`text-[11px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>{tenant.cuisine}</p>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  tenant.isOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {tenant.isOpen ? 'OPEN' : 'PAUSED'}
                </span>
              </div>

              <div className={`pt-3 space-y-2 text-xs ${themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-600'}`}>
                <p className="flex items-center gap-2">
                  <MapPin className={`w-[16px] h-[16px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-400'}`} />
                  <span className="truncate">{tenant.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className={`w-[16px] h-[16px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-400'}`} />
                  <span>{tenant.phone}</span>
                </p>
              </div>

              <div className={`mt-3 p-4 rounded-xl border grid grid-cols-2 gap-3 text-xs ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] border-[#3a3a3a]'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div>
                  <span className={`text-[10px] uppercase tracking-wider ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>Commission Take</span>
                  <p className="font-heading font-bold text-[#ab3500]">{tenant.commissionRate}%</p>
                </div>
                <div>
                  <span className={`text-[10px] uppercase tracking-wider ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>Rating & Trust</span>
                  <p className={`font-heading font-bold ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>★ {tenant.rating} ({tenant.reviewsCount})</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={`pt-3 border-t flex items-center justify-between ${
              themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-gray-200'
            }`}>
              <button
                onClick={() => {
                  setCurrentTenantId(tenant.id);
                  setPersona('vendor');
                  setVendorTab('dashboard');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-md cursor-pointer ${
                  themeMode === 'dark'
                    ? 'bg-[#24619d] hover:bg-[#1a4a7a] text-white shadow-[#24619d]/20'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
                }`}
              >
                Log In As Tenant
              </button>

              <button
                onClick={() => showToast('Tenant Settings', `Configuring settings for ${tenant.name}`, 'info')}
                className={`text-xs font-bold flex items-center gap-1 transition-colors ${
                  themeMode === 'dark'
                    ? 'text-[#c4c4c4] hover:text-[#ab3500]'
                    : 'text-gray-600 hover:text-[#ab3500]'
                }`}
              >
                Audit Store
                <ArrowRight className="w-[16px] h-[16px]" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
