'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Persona, VendorTab, AdminTab, CorporateTab, RiderTab } from '@umunthuhub/shared-types';
import { 
  ChevronDown, ChevronUp, Shield, Store, Bike, Building2, LayoutDashboard, 
  Building, Headphones, User, Activity, ChefHat, BookOpen, Ticket, 
  Radar, Navigation, CreditCard, Home, Utensils, Users, Calendar, Badge, 
  Sun, Moon, LogOut, X 
} from 'lucide-react';

export const NavigationSidebar: React.FC = () => {
  const {
    persona,
    setPersona,
    vendorTab,
    setVendorTab,
    adminTab,
    setAdminTab,
    riderTab,
    setRiderTab,
    corporateTab,
    setCorporateTab,
    orders,
    activeOrder,
    currentTenant,
    currentTenantId,
    setCurrentTenantId,
    tenants,
    supportTickets,
    setIsSOSModalOpen,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    setIsAuthModalOpen,
    showToast,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    themeMode,
    toggleThemeMode,
    signOut
  } = useApp();

  const [collapsedSections, setCollapsedSections] = React.useState<Record<string, boolean>>({
    staff: false,
    quickActions: false,
    adminNav: false,
    vendorNav: false,
    riderNav: false,
    corporateNav: false,
  });


  const activeOrdersCount = orders.filter(
    o => o.tenantId === currentTenant.id && (o.status === 'incoming' || o.status === 'cooking')
  ).length;

  const openTicketsCount = supportTickets.filter(
    t => t.status === 'open' || t.status === 'investigating'
  ).length;

  const backOfficeWorkspaces: { id: Persona; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'admin', label: 'Platform Admin', icon: <Shield className="w-4 h-4" />, color: 'bg-[#594139] text-white' },
    { id: 'vendor', label: 'Kitchen (KDS)', icon: <Store className="w-4 h-4" />, color: 'bg-[#24619d] text-white' },
    { id: 'rider', label: 'Courier Dispatch', icon: <Bike className="w-4 h-4" />, color: 'bg-[#006c4f] text-white' },
    { id: 'corporate', label: 'Corporate B2B', icon: <Building2 className="w-4 h-4" />, color: 'bg-[#8d7168] text-white' },
  ];

  const renderSidebarContent = () => {
    // -------------------------------------------------------------
    // ADMIN / BACK-OFFICE OPERATIONS SIDEBAR
    // -------------------------------------------------------------
    return (
      <div className="space-y-3">
        {/* Logo Section */}
        <div className={`${isSidebarCollapsed ? 'pb-3' : 'pb-4'} border-b ${
          themeMode === 'dark' ? 'border-[#3a3a3a]/40' : 'border-[#e1bfb5]/40'
        }`}>
          <button
            onClick={() => {
              setPersona('admin');
            }}
            className={`flex flex-col items-center gap-3 group text-left cursor-pointer w-full ${isSidebarCollapsed ? '' : ''}`}
          >
            <div className={`w-16 h-16 rounded-xl overflow-hidden shadow-md border flex items-center justify-center transition-transform group-hover:scale-105 duration-300 shrink-0 ${
              themeMode === 'dark'
                ? 'border-[#3a3a3a]/60 bg-[#383a39]'
                : 'border-[#e1bfb5]/60 bg-white'
            }`}>
              <img
                src="/umunthuhub-logo.png"
                alt="Umunthuhub Logo"
                className="w-full h-full object-cover"
              />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5">
                  <span className={`font-heading font-extrabold text-base tracking-tight ${
                    themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                  }`}>
                    Umunthuhub<span className="text-[#ab3500]">-Foods</span>
                  </span>
                  <span className="px-1.5 py-0.2 text-[9px] font-extrabold uppercase tracking-wider rounded-md border bg-[#ab3500]/15 text-[#ab3500] border-[#ab3500]/30">
                    HQ SUITE
                  </span>
                </div>
                <p className={`text-[10px] font-semibold leading-none ${
                  themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                }`}>
                  Enterprise Multi-Tenant Back-Office
                </p>
              </div>
            )}
          </button>
        </div>

        {/* Admin Navigation Section */}
        {persona === 'admin' && (
          <div className="space-y-1.5">
            {!isSidebarCollapsed && (
              <button
                onClick={() => setCollapsedSections(prev => ({ ...prev, adminNav: !prev.adminNav }))}
                className={`w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  themeMode === 'dark'
                    ? 'text-[#7a7a7a] hover:text-[#f5f5f5]'
                    : 'text-[#8d7168] hover:text-[#1a1c1c]'
                }`}
              >
                <span>Admin Navigation</span>
                {collapsedSections.adminNav ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
            {(!collapsedSections.adminNav || isSidebarCollapsed) && (
              <div className={`space-y-1 ${isSidebarCollapsed ? '' : 'pl-2'}`}>
                <button
                  onClick={() => {
                    setAdminTab('overview');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                    adminTab === 'overview' 
                      ? themeMode === 'dark' ? 'bg-[#594139]/80 text-white shadow-md shadow-[#594139]/20 font-bold' : 'bg-[#594139] text-white shadow-md shadow-[#594139]/20 font-bold' 
                      : themeMode === 'dark'
                        ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                        : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                  }`}
                  title="Analytics"
                >
                  <LayoutDashboard className="w-[18px] h-[18px] shrink-0" />
                  {!isSidebarCollapsed && <span>Analytics</span>}
                </button>
                <button
                  onClick={() => {
                    setAdminTab('venues');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                    adminTab === 'venues' 
                      ? themeMode === 'dark' ? 'bg-[#594139]/80 text-white shadow-md shadow-[#594139]/20 font-bold' : 'bg-[#594139] text-white shadow-md shadow-[#594139]/20 font-bold' 
                      : themeMode === 'dark'
                        ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                        : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                  }`}
                  title="Stores"
                >
                  <Building className="w-[18px] h-[18px] shrink-0" />
                  {!isSidebarCollapsed && <span>Stores</span>}
                </button>
                <button
                  onClick={() => {
                    setAdminTab('support');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                    adminTab === 'support' 
                      ? themeMode === 'dark' ? 'bg-[#594139]/80 text-white shadow-md shadow-[#594139]/20 font-bold' : 'bg-[#594139] text-white shadow-md shadow-[#594139]/20 font-bold' 
                      : themeMode === 'dark'
                        ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                        : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                  }`}
                  title="Support"
                >
                  <Headphones className="w-[18px] h-[18px] shrink-0" />
                  {!isSidebarCollapsed && <span>Support</span>}
                </button>
                <button
                  onClick={() => {
                    setAdminTab('settings');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                    adminTab === 'settings' 
                      ? themeMode === 'dark' ? 'bg-[#594139]/80 text-white shadow-md shadow-[#594139]/20 font-bold' : 'bg-[#594139] text-white shadow-md shadow-[#594139]/20 font-bold' 
                      : themeMode === 'dark'
                        ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                        : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                  }`}
                  title="Store Profile"
                >
                  <Store className="w-4.5 h-4.5 shrink-0" />
                  {!isSidebarCollapsed && <span>Store Profile</span>}
                </button>
                <button
                  onClick={() => {
                    setAdminTab('profile');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                    adminTab === 'profile' 
                      ? themeMode === 'dark' ? 'bg-[#594139]/80 text-white shadow-md shadow-[#594139]/20 font-bold' : 'bg-[#594139] text-white shadow-md shadow-[#594139]/20 font-bold' 
                      : themeMode === 'dark'
                        ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                        : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                  }`}
                  title="My Profile"
                >
                  <User className="w-4.5 h-4.5 shrink-0" />
                  {!isSidebarCollapsed && <span>My Profile</span>}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Vendor Navigation Section */}
        {persona === 'vendor' && (
          <div className="space-y-1.5">
            {!isSidebarCollapsed && (
              <button
                onClick={() => setCollapsedSections(prev => ({ ...prev, vendorNav: !prev.vendorNav }))}
                className={`w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  themeMode === 'dark'
                    ? 'text-[#7a7a7a] hover:text-[#f5f5f5]'
                    : 'text-[#8d7168] hover:text-[#1a1c1c]'
                }`}
              >
                <span>Kitchen Navigation</span>
                {collapsedSections.vendorNav ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
            {(!collapsedSections.vendorNav || isSidebarCollapsed) && (
              <div className={`space-y-1 ${isSidebarCollapsed ? '' : 'pl-2'}`}>
                <button
                  onClick={() => {
                    setVendorTab('dashboard');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                    vendorTab === 'dashboard' 
                      ? themeMode === 'dark' ? 'bg-[#24619d]/80 text-white shadow-md shadow-[#24619d]/20 font-bold' : 'bg-[#24619d] text-white shadow-md shadow-[#24619d]/20 font-bold' 
                      : themeMode === 'dark'
                        ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                        : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                  }`}
                  title="Overview"
                >
                  <Activity className="w-4.5 h-4.5 shrink-0" />
                  {!isSidebarCollapsed && <span>Overview</span>}
                </button>
                <button
                  onClick={() => {
                    setVendorTab('kds');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                    vendorTab === 'kds' 
                      ? themeMode === 'dark' ? 'bg-[#24619d]/80 text-white shadow-md shadow-[#24619d]/20 font-bold' : 'bg-[#24619d] text-white shadow-md shadow-[#24619d]/20 font-bold' 
                      : themeMode === 'dark'
                        ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                        : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                  }`}
                  title="KDS"
                >
                  <ChefHat className="w-4.5 h-4.5 shrink-0" />
                  {!isSidebarCollapsed && <span>KDS</span>}
                </button>
                <button
                  onClick={() => {
                    setVendorTab('menu');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                    vendorTab === 'menu' 
                      ? themeMode === 'dark' ? 'bg-[#24619d]/80 text-white shadow-md shadow-[#24619d]/20 font-bold' : 'bg-[#24619d] text-white shadow-md shadow-[#24619d]/20 font-bold' 
                      : themeMode === 'dark'
                        ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                        : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                  }`}
                  title="Menu"
                >
                  <BookOpen className="w-4.5 h-4.5 shrink-0" />
                  {!isSidebarCollapsed && <span>Menu</span>}
                </button>
                <button
                  onClick={() => {
                    setVendorTab('promotions');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                    vendorTab === 'promotions' 
                      ? themeMode === 'dark' ? 'bg-[#24619d]/80 text-white shadow-md shadow-[#24619d]/20 font-bold' : 'bg-[#24619d] text-white shadow-md shadow-[#24619d]/20 font-bold' 
                      : themeMode === 'dark'
                        ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                        : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                  }`}
                  title="Promos"
                >
                  <Ticket className="w-[18px] h-[18px] shrink-0" />
                  {!isSidebarCollapsed && <span>Promos</span>}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Rider Navigation Section */}
        {persona === 'rider' && (
          <div className="space-y-1.5">
            {!isSidebarCollapsed && (
              <button
                onClick={() => setCollapsedSections(prev => ({ ...prev, riderNav: !prev.riderNav }))}
                className={`w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  themeMode === 'dark'
                    ? 'text-[#7a7a7a] hover:text-[#f5f5f5]'
                    : 'text-[#8d7168] hover:text-[#1a1c1c]'
                }`}
              >
                <span>Courier Navigation</span>
                {collapsedSections.riderNav ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
            {(!collapsedSections.riderNav || isSidebarCollapsed) && (
              <div className={`space-y-1 ${isSidebarCollapsed ? '' : 'pl-2'}`}>
                <button
                  onClick={() => {
                    setRiderTab('radar');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                    riderTab === 'radar' 
                      ? themeMode === 'dark' ? 'bg-[#006c4f]/80 text-white shadow-md shadow-[#006c4f]/20 font-bold' : 'bg-[#006c4f] text-white shadow-md shadow-[#006c4f]/20 font-bold' 
                      : themeMode === 'dark'
                        ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                        : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                  }`}
                  title="Radar"
                >
                  <Radar className="w-[18px] h-[18px] shrink-0" />
                  {!isSidebarCollapsed && <span>Radar</span>}
                </button>
                <button
                  onClick={() => {
                    setRiderTab('active_job');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                    riderTab === 'active_job' 
                      ? themeMode === 'dark' ? 'bg-[#006c4f]/80 text-white shadow-md shadow-[#006c4f]/20 font-bold' : 'bg-[#006c4f] text-white shadow-md shadow-[#006c4f]/20 font-bold' 
                      : themeMode === 'dark'
                        ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                        : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                  }`}
                  title="Active Trip"
                >
                  <Navigation className="w-[18px] h-[18px] shrink-0" />
                  {!isSidebarCollapsed && <span>Active Trip</span>}
                </button>
                <button
                  onClick={() => {
                    setRiderTab('earnings');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                    riderTab === 'earnings' 
                      ? themeMode === 'dark' ? 'bg-[#006c4f]/80 text-white shadow-md shadow-[#006c4f]/20 font-bold' : 'bg-[#006c4f] text-white shadow-md shadow-[#006c4f]/20 font-bold' 
                      : themeMode === 'dark'
                        ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                        : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                  }`}
                  title="Earnings"
                >
                  <CreditCard className="w-[18px] h-[18px] shrink-0" />
                  {!isSidebarCollapsed && <span>Earnings</span>}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Corporate Navigation Section */}
        {persona === 'corporate' && (
          <div className="space-y-1.5">
            {!isSidebarCollapsed && (
              <button
                onClick={() => setCollapsedSections(prev => ({ ...prev, corporateNav: !prev.corporateNav }))}
                className={`w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  themeMode === 'dark'
                    ? 'text-[#7a7a7a] hover:text-[#f5f5f5]'
                    : 'text-[#8d7168] hover:text-[#1a1c1c]'
                }`}
              >
                <span>Corporate Navigation</span>
                {collapsedSections.corporateNav ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
            {(!collapsedSections.corporateNav || isSidebarCollapsed) && (
              <div className={`space-y-1 ${isSidebarCollapsed ? '' : 'pl-2'}`}>
                <button
                  onClick={() => {
                    setCorporateTab('home');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                    corporateTab === 'home' 
                      ? themeMode === 'dark' ? 'bg-[#8d7168]/80 text-white shadow-md shadow-[#8d7168]/20 font-bold' : 'bg-[#8d7168] text-white shadow-md shadow-[#8d7168]/20 font-bold' 
                      : themeMode === 'dark'
                        ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                        : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                  }`}
                  title="Home"
                >
                  <Home className="w-[18px] h-[18px] shrink-0" />
                  {!isSidebarCollapsed && <span>Home</span>}
                </button>
                <button
                  onClick={() => {
                    setCorporateTab('catalog');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                    corporateTab === 'catalog' 
                      ? themeMode === 'dark' ? 'bg-[#8d7168]/80 text-white shadow-md shadow-[#8d7168]/20 font-bold' : 'bg-[#8d7168] text-white shadow-md shadow-[#8d7168]/20 font-bold' 
                      : themeMode === 'dark'
                        ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                        : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                  }`}
                  title="Menus"
                >
                  <Utensils className="w-[18px] h-[18px] shrink-0" />
                  {!isSidebarCollapsed && <span>Menus</span>}
                </button>
                <button
                  onClick={() => {
                    setCorporateTab('team_orders');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                    corporateTab === 'team_orders' 
                      ? themeMode === 'dark' ? 'bg-[#8d7168]/80 text-white shadow-md shadow-[#8d7168]/20 font-bold' : 'bg-[#8d7168] text-white shadow-md shadow-[#8d7168]/20 font-bold' 
                      : themeMode === 'dark'
                        ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                        : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                  }`}
                  title="Team Orders"
                >
                  <Users className="w-[18px] h-[18px] shrink-0" />
                  {!isSidebarCollapsed && <span>Team Orders</span>}
                </button>
                <button
                  onClick={() => {
                    setCorporateTab('subscriptions');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                    corporateTab === 'subscriptions' 
                      ? themeMode === 'dark' ? 'bg-[#8d7168]/80 text-white shadow-md shadow-[#8d7168]/20 font-bold' : 'bg-[#8d7168] text-white shadow-md shadow-[#8d7168]/20 font-bold' 
                      : themeMode === 'dark'
                        ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                        : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                  }`}
                  title="Stipends"
                >
                  <Calendar className="w-[18px] h-[18px] shrink-0" />
                  {!isSidebarCollapsed && <span>Stipends</span>}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Staff Management Section - Collapsible */}
        {persona === 'admin' && (
          <div className="space-y-1.5">
            {!isSidebarCollapsed && (
              <button
                onClick={() => setCollapsedSections(prev => ({ ...prev, staff: !prev.staff }))}
                className={`w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  themeMode === 'dark'
                    ? 'text-[#7a7a7a] hover:text-[#f5f5f5]'
                    : 'text-[#8d7168] hover:text-[#1a1c1c]'
                }`}
              >
                <span>Staff Management</span>
                {collapsedSections.staff ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
            {(!collapsedSections.staff || isSidebarCollapsed) && (
              <div className={`space-y-1 ${isSidebarCollapsed ? '' : 'pl-2'}`}>
                <button
                  onClick={() => {
                    setAdminTab('staff');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                    adminTab === 'staff' 
                      ? themeMode === 'dark' ? 'bg-[#594139]/80 text-white shadow-md shadow-[#594139]/20 font-bold' : 'bg-[#594139] text-white shadow-md shadow-[#594139]/20 font-bold' 
                      : themeMode === 'dark'
                        ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                        : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                  }`}
                  title="Staff Roster"
                >
                  <Badge className="w-[18px] h-[18px] shrink-0" />
                  {!isSidebarCollapsed && <span>Staff Roster</span>}
                </button>
                <button
                  onClick={() => {
                    setAdminTab('team');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                    adminTab === 'team' 
                      ? themeMode === 'dark' ? 'bg-[#594139]/80 text-white shadow-md shadow-[#594139]/20 font-bold' : 'bg-[#594139] text-white shadow-md shadow-[#594139]/20 font-bold' 
                      : themeMode === 'dark'
                        ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                        : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                  }`}
                  title="Team Access"
                >
                  <Users className="w-[18px] h-[18px] shrink-0" />
                  {!isSidebarCollapsed && <span>Team Access</span>}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions - Standalone Items */}
        <div className="space-y-1">
          {/* User Profile */}
          <button
            onClick={() => {
              if (persona === 'admin') {
                setAdminTab('profile');
              } else {
                setAdminTab('profile');
                setPersona('admin');
              }
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center py-2.5' : 'gap-2 px-3 py-2'} rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
              themeMode === 'dark'
                ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
            }`}
            title="Profile Settings"
          >
            <img
              src="/umunthuai.png"
              alt="Grayson Comrade"
              className={`${isSidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'} rounded-lg object-cover border border-white shadow-2xs shrink-0`}
            />
            {!isSidebarCollapsed && <span>Profile Settings</span>}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleThemeMode}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center py-2.5' : 'gap-2 px-3 py-2'} rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
              themeMode === 'dark'
                ? 'text-[#c4c4c4] hover:bg-[#383a39] hover:text-[#f5f5f5]'
                : 'text-[#594139] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
            }`}
            title="Toggle Theme"
          >
            {themeMode === 'dark' ? <Sun className={`${isSidebarCollapsed ? 'w-5 h-5' : 'w-[18px] h-[18px]'} shrink-0`} /> : <Moon className={`${isSidebarCollapsed ? 'w-5 h-5' : 'w-[18px] h-[18px]'} shrink-0`} />}
            {!isSidebarCollapsed && <span>{themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          {/* Sign Out */}
          <button
            onClick={() => {
              signOut();
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center py-2.5' : 'gap-2 px-3 py-2'} rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
              themeMode === 'dark'
                ? 'text-[#ff6b6b] hover:bg-[#383a39] hover:text-[#ff8a8a]'
                : 'text-[#ba1a1a] hover:bg-[#ffdad6] hover:text-[#d63333]'
            }`}
            title="Sign Out"
          >
            <LogOut className={`${isSidebarCollapsed ? 'w-5 h-5' : 'w-[18px] h-[18px]'} shrink-0`} />
            {!isSidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>




        {/* Rider Emergency SOS */}
        {persona === 'rider' && (
          <div className="pt-3">
            <button
              onClick={() => setIsSOSModalOpen(true)}
              className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-center'} gap-2 py-2 px-3 rounded-2xl bg-[#ffdad6] hover:bg-[#ffb4ab] text-[#ba1a1a] text-xs font-extrabold transition-all duration-300 border border-[#ba1a1a]/20 cursor-pointer shadow-xs transform hover:scale-[1.02] active:scale-[0.98]`}
              title="Emergency SOS Alert"
            >
              <Activity className="w-[16px] shrink-0" />
              {!isSidebarCollapsed && <span>Emergency SOS Alert</span>}
            </button>
          </div>
        )}



      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-20' : 'w-72'}`}>
        <div className={`rounded-3xl border-2 shadow-2xl h-full overflow-y-auto transition-all duration-300 ease-in-out backdrop-blur-xl custom-scrollbar ${
          themeMode === 'dark'
            ? 'bg-[#242625]/90 border-[#3a3a3a] shadow-black/30'
            : 'glass-panel border-[#ab3500] shadow-[#ab3500]/15 bg-white/60'
        } ${isSidebarCollapsed ? 'p-3' : 'p-4'}`}>
          <div className="flex flex-col h-full">
            {renderSidebarContent()}
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          {/* Drawer Panel */}
          <div className={`relative w-72 max-w-[85vw] h-full p-4 shadow-2xl border-2 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-left duration-200 custom-scrollbar ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]'
              : 'bg-white glass-panel border-[#e1bfb5]'
          }`}>
            <div className="space-y-4">
              {/* Drawer Top Header */}
              <div className={`flex items-center justify-between pb-3 border-b ${
                themeMode === 'dark' ? 'border-[#3a3a3a]/40' : 'border-[#e1bfb5]/40'
              }`}>
                <div className="flex items-center gap-2">
                  <img
                    src="/umunthuhub-logo.png"
                    alt="Umunthuhub"
                    className={`w-8 h-8 rounded-xl object-cover border ${
                      themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-[#e1bfb5]'
                    }`}
                  />
                  <span className={`font-heading font-extrabold text-sm ${
                    themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                  }`}>
                    Umunthuhub<span className="text-[#006c4f]">-Foods</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] text-[#c4c4c4]'
                      : 'bg-[#f3f3f3] text-[#594139]'
                  }`}
                >
                  <X className="w-[16px]" />
                </button>
              </div>

              {/* Drawer Content */}
              {renderSidebarContent()}

              {/* Mobile Venue Selector */}
              <div className="space-y-2 pt-4 border-t">
                <p className={`text-[10px] font-bold uppercase tracking-wide ${
                  themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                }`}>Active Store</p>
                <div className={`flex items-center gap-2 p-2.5 rounded-xl border ${
                  themeMode === 'dark'
                    ? 'bg-[#383a39] border-[#3a3a3a]/50'
                    : 'bg-[#f9f9f9] border-[#e1bfb5]/50'
                }`}>
                  <img
                    src={currentTenant.logo}
                    alt={currentTenant.name}
                    className={`w-8 h-8 rounded-lg object-cover border shrink-0 ${
                      themeMode === 'dark' ? 'border-[#3a3a3a]/60' : 'border-[#e1bfb5]/60'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-xs truncate ${
                      themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                    }`}>{currentTenant.name}</p>
                  </div>
                </div>
                <select
                  value={currentTenantId}
                  onChange={(e) => {
                    setCurrentTenantId(e.target.value);
                    showToast('Store Switched', `Active context: ${tenants.find(t => t.id === e.target.value)?.name}`, 'info');
                  }}
                  className={`w-full text-xs font-semibold px-3 py-2 rounded-xl border shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ab3500]/20 focus:border-[#ab3500] ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                      : 'bg-white border-[#e1bfb5] text-[#0a0c0c]'
                  }`}
                >
                  {tenants.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Bottom Footer Note */}
            <div className={`pt-4 border-t text-[10px] text-center ${
              themeMode === 'dark'
                ? 'border-[#3a3a3a]/40 text-[#7a7a7a]'
                : 'border-[#e1bfb5]/40 text-[#8d7168]'
            }`}>
              Umunthuhub-Foods SaaS • 2026
            </div>
          </div>
        </div>
      )}
    </>
  );
};
