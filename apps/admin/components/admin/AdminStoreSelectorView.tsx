'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building, LogOut, Search, AlertTriangle, Settings, LogIn, Plus } from 'lucide-react';
import { Tenant } from '@umunthuhub/shared-types';

interface AdminStoreSelectorViewProps {
  onSelectStore: (tenantId: string) => void;
  onLaunchNewStoreWizard: () => void;
  onContinueMissingStep: (tenantId: string, missingStepNum: number) => void;
  onLogoutAdmin: () => void;
}

export const AdminStoreSelectorView: React.FC<AdminStoreSelectorViewProps> = ({
  onSelectStore,
  onLaunchNewStoreWizard,
  onContinueMissingStep,
  onLogoutAdmin
}) => {
  const { tenants, showToast, currentOrganizationId, themeMode } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCuisine, setFilterCuisine] = useState<string>('all');

  // Filter stores by organization first, then by search/cuisine
  const organizationTenants = tenants.filter((tenant) => 
    tenant.organizationId === currentOrganizationId
  );

  // Filtered stores
  const filteredTenants = organizationTenants.filter((tenant) => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tenant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = filterCuisine === 'all' || tenant.cuisine === filterCuisine;
    return matchesSearch && matchesCuisine;
  });

  const cuisines = Array.from(new Set(organizationTenants.map(t => t.cuisine)));

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      
      {/* Header Banner */}
      <div className={`rounded-3xl p-6 border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]/50'
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#ab3500] text-white">
              ORGANIZATION COMMAND CENTER
            </span>
            <span className={`text-xs font-bold ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
            }`}>
              {organizationTenants.length} Active Stores
            </span>
          </div>
          <h1 className={`font-heading font-extrabold text-2xl sm:text-3xl mt-1 ${
            themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
          }`}>
            Vance Gourmet Hospitality Group
          </h1>
          <p className={`text-xs mt-0.5 max-w-xl ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>
            Select a store location to manage daily KDS orders, menu pricing, staff rosters, and revenue telemetry, or provision a new branch.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={onLaunchNewStoreWizard}
            className="px-5 py-2.5 rounded-2xl glass-button-primary font-heading font-bold text-xs shadow-lg shadow-[#ab3500]/25 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-[18px] h-[18px]" />
            <span>+ Provision New Store</span>
          </button>
          
          <button
            onClick={() => {
              showToast('Admin Session Ended', 'Logged out of Enterprise Admin Console.', 'info');
              onLogoutAdmin();
            }}
            className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              themeMode === 'dark'
                ? 'bg-[#383a39] hover:bg-[#4a4a4a] text-[#c4c4c4]'
                : 'bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#594139]'
            }`}
            title="Log out of Admin"
          >
            <LogOut className="w-[16px] h-[16px]" />
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl p-4 border ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]/40'
          : 'glass-panel border-[#e1bfb5]/40'
      }`}>
        <div className="relative w-full sm:w-80">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
          }`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stores by name or cuisine..."
            className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs font-semibold ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] placeholder-[#7a7a7a]'
                : 'glass-input'
            }`}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterCuisine('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filterCuisine === 'all'
                ? 'bg-[#ab3500] text-white shadow-sm'
                : themeMode === 'dark'
                  ? 'bg-[#383a39] text-[#c4c4c4] hover:bg-[#4a4a4a]'
                  : 'bg-[#f3f3f3] text-[#594139] hover:bg-[#e8e8e8]'
            }`}
          >
            All Cuisines ({organizationTenants.length})
          </button>
          {cuisines.map((c) => (
            <button
              key={c}
              onClick={() => setFilterCuisine(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterCuisine === c
                  ? 'bg-[#ab3500] text-white shadow-sm'
                  : themeMode === 'dark'
                    ? 'bg-[#383a39] text-[#c4c4c4] hover:bg-[#4a4a4a]'
                    : 'bg-[#f3f3f3] text-[#594139] hover:bg-[#e8e8e8]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Store Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTenants.map((tenant, idx) => {
          // Demo incomplete state indicator for demonstration
          const isIncomplete = idx === 3;
          const missingStepNum = isIncomplete ? 4 : 5;

          return (
            <div
              key={tenant.id}
              className={`rounded-3xl overflow-hidden border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                themeMode === 'dark'
                  ? 'bg-[#242625] border-[#3a3a3a]'
                  : 'glass-panel border-[#e1bfb5]/50'
              }`}
            >
              {/* Top Banner & Badges */}
              <div className="relative h-36 overflow-hidden">
                <img
                  src={tenant.banner}
                  alt={tenant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Logo overlay */}
                <div className="absolute bottom-3 left-4 flex items-center gap-3">
                  <img
                    src={tenant.logo}
                    alt={tenant.name}
                    className={`w-12 h-12 rounded-2xl object-cover border-2 shadow-md ${
                      themeMode === 'dark' ? 'border-[#3a3a3a] bg-[#383a39]' : 'border-white bg-white'
                    }`}
                  />
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-white drop-shadow-md leading-tight">
                      {tenant.name}
                    </h3>
                    <p className="text-[11px] text-[#ffeed9] drop-shadow-xs font-medium">
                      {tenant.cuisine} • {tenant.city}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  {isIncomplete ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500 text-white shadow-sm flex items-center gap-1 animate-pulse">
                      <AlertTriangle className="w-[12px] h-[12px]" />
                      <span>Setup Incomplete</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#00ae81] text-white shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      <span>Live & Operating</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className={`text-xs line-clamp-2 italic ${
                    themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
                  }`}>
                    "{tenant.tagline}"
                  </p>

                  {/* Telemetry Stats */}
                  <div className={`grid grid-cols-3 gap-2 mt-4 p-3 rounded-2xl border text-center ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a]'
                      : 'bg-[#f9f9f9] border-[#e1bfb5]/40'
                  }`}>
                    <div>
                      <span className={`block text-[10px] font-bold uppercase ${
                        themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                      }`}>GMV Today</span>
                      <span className="font-heading font-extrabold text-xs text-[#ab3500]">
                        ${tenant.gmvToday?.toLocaleString() || '3,450'}
                      </span>
                    </div>
                    <div>
                      <span className={`block text-[10px] font-bold uppercase ${
                        themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                      }`}>Rating</span>
                      <span className={`font-heading font-extrabold text-xs ${
                        themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                      }`}>
                        ★ {tenant.rating}
                      </span>
                    </div>
                    <div>
                      <span className={`block text-[10px] font-bold uppercase ${
                        themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                      }`}>Orders</span>
                      <span className="font-heading font-extrabold text-xs text-[#24619d]">
                        {tenant.activeOrdersCount || 5} active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="pt-2">
                  {isIncomplete ? (
                    <button
                      onClick={() => onContinueMissingStep(tenant.id, missingStepNum)}
                      className="w-full py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-heading font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Settings className="w-[16px] h-[16px]" />
                      <span>Resume Setup (Missing Step {missingStepNum})</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectStore(tenant.id)}
                      className="w-full py-2.5 rounded-2xl bg-[#ab3500] hover:bg-[#8d2a00] text-white font-heading font-bold text-xs shadow-md shadow-[#ab3500]/20 transition-all cursor-pointer flex items-center justify-center gap-1.5 group-hover:scale-[1.02]"
                    >
                      <LogIn className="w-[16px] h-[16px]" />
                      <span>Enter Store Admin Console</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}

        {/* Add New Store CTA Card */}
        <div
          onClick={onLaunchNewStoreWizard}
          className={`rounded-3xl p-8 border-2 border-dashed hover:border-[#ab3500] transition-all duration-300 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer group min-h-85 ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]/50 hover:border-[#ab3500]/50'
              : 'glass-panel border-[#ab3500]/40 hover:border-[#ab3500] bg-[#ab3500]/5 hover:bg-[#ab3500]/10'
          }`}
        >
          <div className="w-14 h-14 rounded-3xl bg-[#ab3500] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Plus className="w-[28px] h-[28px]" />
          </div>
          <div>
            <h3 className={`font-heading font-extrabold text-base ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              Provision New Store Location
            </h3>
            <p className={`text-xs mt-1 max-w-xs ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
            }`}>
              Launch another restaurant branch, ghost kitchen, or brand concept in 5 easy steps.
            </p>
          </div>
          <span className={`px-4 py-2 rounded-xl font-heading font-bold text-xs shadow-sm border transition-colors ${
            themeMode === 'dark'
              ? 'bg-[#383a39] text-[#ff6b35] border-[#3a3a3a] group-hover:bg-[#ab3500] group-hover:text-white'
              : 'bg-white text-[#ab3500] border-[#e1bfb5]/50 group-hover:bg-[#ab3500] group-hover:text-white'
          }`}>
            Start Setup Wizard →
          </span>
        </div>
      </div>

    </div>
  );
};
