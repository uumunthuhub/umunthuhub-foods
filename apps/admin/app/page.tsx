'use client';

import React from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import { Header } from '../components/layout/Header';
import { NavigationSidebar } from '../components/layout/NavigationSidebar';
import { Footer } from '../components/layout/Footer';
import { dbService } from '../db/indexedDB';
import { ArrowLeft, ArrowLeftRight, Menu, PanelLeftOpen, CheckCircle, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

// Vendor views
import { VendorDashboard } from '../components/vendor/VendorDashboard';
import { KitchenDisplaySystem } from '../components/vendor/KitchenDisplaySystem';
import { MenuManager } from '../components/vendor/MenuManager';
import { VendorPromotions } from '../components/vendor/VendorPromotions';
import { VendorOnboarding } from '../components/vendor/VendorOnboarding';
import { StoreSetupWizard } from '../components/vendor/StoreSetupWizard';

// Rider views
import { RiderDashboard } from '../components/rider/RiderDashboard';
import { RiderTripExecution } from '../components/rider/RiderTripExecution';
import { RiderEarnings } from '../components/rider/RiderEarnings';

// Corporate views
import { CorporateHome } from '../components/corporate/CorporateHome';
import { CorporatePortal } from '../components/corporate/CorporatePortal';
import { CorporateMenu } from '../components/corporate/CorporateMenu';
import { CorporateOrders } from '../components/corporate/CorporateOrders';
import { CorporateStipends } from '../components/corporate/CorporateStipends';

// Admin views
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { TenantDirectory } from '../components/admin/TenantDirectory';
import { CommissionPayouts } from '../components/admin/CommissionPayouts';
import { TeamManagement } from '../components/admin/TeamManagement';
import { HelpDeskSupport } from '../components/admin/HelpDeskSupport';
import { StaffManagement } from '../components/admin/StaffManagement';
import { PlatformSettingsView } from '../components/admin/PlatformSettings';
import { AdminProfile } from '../components/admin/AdminProfile';
import { AdminAuthView } from '../components/admin/AdminAuthView';
import { AdminStoreSelectorView } from '../components/admin/AdminStoreSelectorView';

// Common views
import { WelcomeScreen } from '../components/common/WelcomeScreen';

const MainAppContent: React.FC = () => {
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
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    toasts,
    dismissToast,
    setCurrentTenantId,
    setCurrentOrganizationId,
    themeMode
  } = useApp();

  // Welcome / Auth Screen state
  const [appScreen, setAppScreen] = React.useState<
    'welcome' | 'auth_sign_in' | 'auth_register' | 'auth_invite' | 'wizard' | 'portal'
  >('welcome');

  // Admin Flow State
  const [adminViewMode, setAdminViewMode] = React.useState<'store_selector' | 'dashboard'>('dashboard');
  const [wizardStep, setWizardStep] = React.useState<number>(1);

  const handlePersonaSelect = (selectedPersona: 'vendor' | 'rider' | 'admin' | 'corporate') => {
    setPersona(selectedPersona);
    // Admin portal needs auth; others go straight to portal
    if (selectedPersona === 'admin') {
      setAppScreen('auth_sign_in');
    } else {
      setAppScreen('portal');
    }
  };

  const handleAdminAuthSuccess = (mode: 'existing' | 'new_no_org' | 'incomplete_step', userEmail?: string) => {
    if (mode === 'existing') {
      // Get the logged-in user and set their organization ID
      const user = userEmail ? dbService.findUserByEmail(userEmail) : dbService.getAdminUsers()[0];
      // PROTOTYPE MODE: If no user found or no organizationId, use default org for demo
      const orgId = user?.organizationId || 'org-vance-hospitality';
      setCurrentOrganizationId(orgId);
      // Signed in → go straight to portal (store selector)
      setAdminViewMode('store_selector');
      setAppScreen('portal');
    } else if (mode === 'incomplete_step') {
      // Incomplete setup → resume wizard full-screen
      setWizardStep(3);
      setAppScreen('wizard');
    } else {
      // New account → run setup wizard full-screen before entering portal
      setWizardStep(1);
      setAppScreen('wizard');
    }
  };

  const renderActiveView = () => {
    // Vendor / Kitchen Persona
    if (persona === 'vendor') {
      switch (vendorTab) {
        case 'dashboard':
          return <VendorDashboard />;
        case 'kds':
          return <KitchenDisplaySystem />;
        case 'menu':
          return <MenuManager />;
        case 'promotions':
          return <VendorPromotions />;
        case 'onboarding':
          return <VendorOnboarding />;
        case 'setup_wizard':
          return <StoreSetupWizard onComplete={() => setVendorTab('kds')} onCancel={() => setVendorTab('dashboard')} />;
        default:
          return <VendorDashboard />;
      }
    }

    // Courier / Rider Persona
    if (persona === 'rider') {
      switch (riderTab) {
        case 'radar':
          return <RiderDashboard />;
        case 'active_job':
          return <RiderTripExecution />;
        case 'earnings':
          return <RiderEarnings />;
        default:
          return <RiderDashboard />;
      }
    }

    // Platform Executive Admin Persona Flow
    if (persona === 'admin') {
      return (
        <div className="space-y-4">
          <div className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${
                adminViewMode === 'store_selector' ? 'bg-[#006c4f]' : 'bg-[#ab3500]'
              }`} />
              <span className={`text-xs font-bold ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
              }`}>
                {adminViewMode === 'store_selector' ? 'Viewing Store Directory' : 'Active Tenant View'}
              </span>
            </div>
            <button
              onClick={() => setAdminViewMode('store_selector')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] text-[#90caf9] hover:bg-[#4a4c4b]'
                  : 'bg-white text-[#24619d] border border-[#24619d]/20 hover:bg-[#e3f2fd]'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Switch Tenant Store</span>
            </button>
          </div>

          {adminTab === 'overview' && <AdminDashboard />}
          {adminTab === 'tenants' && <TenantDirectory />}
          {adminTab === 'payouts' && <CommissionPayouts />}
          {adminTab === 'team' && <TeamManagement />}
          {adminTab === 'support' && <HelpDeskSupport />}
          {adminTab === 'staff' && <StaffManagement />}
          {adminTab === 'settings' && <PlatformSettingsView />}
          {adminTab === 'profile' && <AdminProfile />}
        </div>
      );
    }

    // Corporate Persona
    if (persona === 'corporate') {
      switch (corporateTab) {
        case 'home':
          return <CorporateHome />;
        case 'catalog':
          return <CorporateMenu />;
        case 'team_orders':
          return <CorporateOrders />;
        case 'subscriptions':
          return <CorporateStipends />;
        case 'invoices':
          return <CorporatePortal />;
        default:
          return <CorporateHome />;
      }
    }

    return null;
  };

  return (
    <>
      <div className="theme-transition-overlay" id="theme-transition-overlay" />
      <div className={`flex-1 font-body selection:bg-[#ab3500] selection:text-white transition-colors duration-300 overflow-x-hidden ${
        themeMode === 'dark' ? 'bg-[#1a1c1c] text-[#f5f5f5]' : 'bg-[#fcf9f8] text-[#1a1c1c]'
      }`}>

      {/* ── Welcome Screen ── */}
      {appScreen === 'welcome' && (
        <WelcomeScreen
          onPersonaSelect={handlePersonaSelect}
          isAuthenticated={false}
          userRole={null}
          onSignIn={() => {
            setPersona('admin');
            setAppScreen('auth_sign_in');
          }}
          onRegister={() => {
            setPersona('admin');
            setAppScreen('auth_register');
          }}
          onInvite={() => {
            setPersona('admin');
            setAppScreen('auth_invite');
          }}
        />
      )}

      {/* ── Auth Screen (Sign In, Register, or Invite) ── */}
      {(appScreen === 'auth_sign_in' || appScreen === 'auth_register' || appScreen === 'auth_invite') && (
        <div className={`min-h-screen flex flex-col ${
          themeMode === 'dark' ? 'bg-[#1a1c1c]' : 'bg-[#fcf9f8]'
        }`}>
          {/* Back to welcome */}
          <div className="px-4 sm:px-8 pt-5">
            <button
              onClick={() => setAppScreen('welcome')}
              className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer ${
                themeMode === 'dark'
                  ? 'text-[#c4c4c4] hover:text-[#ff6b35]'
                  : 'text-[#594139] hover:text-[#ab3500]'
              }`}
            >
              <ArrowLeft className="w-[16px] h-[16px]" />
              Back to home
            </button>
          </div>
          <div className="flex-1 flex items-center">
            <div className="w-full">
              <AdminAuthView
                initialMode={
                  appScreen === 'auth_register'
                    ? 'register'
                    : appScreen === 'auth_invite'
                    ? 'invite'
                    : 'login'
                }
                onLoginSuccess={(mode, email) => handleAdminAuthSuccess(mode, email)}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Admin Store Selector (full-screen, no sidebar/header) ── */}
      {appScreen === 'portal' && persona === 'admin' && adminViewMode === 'store_selector' && (
        <div className={`min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ${
          themeMode === 'dark' ? 'bg-[#1a1c1c]' : 'bg-[#fcf9f8]'
        }`}>
          <AdminStoreSelectorView
            onSelectStore={(tenantId) => {
              setCurrentTenantId(tenantId);
              setAdminViewMode('dashboard');
              setAdminTab('overview');
            }}
            onLaunchNewStoreWizard={() => {
              setWizardStep(1);
              setAppScreen('wizard');
            }}
            onContinueMissingStep={(tenantId, stepNum) => {
              setCurrentTenantId(tenantId);
              setWizardStep(stepNum);
              setAppScreen('wizard');
            }}
            onLogoutAdmin={() => {
              setAdminViewMode('dashboard');
              setAppScreen('welcome');
            }}
          />
        </div>
      )}

      {/* ── Setup Wizard (full-screen, no sidebar/header) ── */}
      {appScreen === 'wizard' && (
        <div className={`min-h-screen ${
          themeMode === 'dark' ? 'bg-[#1a1c1c]' : 'bg-[#fcf9f8]'
        }`}>
          <StoreSetupWizard
            initialStep={wizardStep}
            onComplete={() => {
              // The wizard internally calls setPersona('vendor') — we override it back to admin
              setPersona('admin');
              setAdminViewMode('dashboard');
              setAdminTab('overview');
              setAppScreen('portal');
            }}
            onCancel={() => {
              // Return to auth so they can sign in with existing account
              setAppScreen('auth_sign_in');
            }}
          />
        </div>
      )}

      {/* ── Main Portal ── */}
      {appScreen === 'portal' && !(persona === 'admin' && adminViewMode === 'store_selector') && (
        <div className="flex min-h-screen">
          {/* Sidebar — fixed on lg+. On mobile, NavigationSidebar renders its own fixed overlay drawer when isMobileSidebarOpen is true. */}
          <NavigationSidebar />

          {/* Main Content Area */}
          <div
            className="flex-1 flex flex-col min-w-0 transition-all duration-300"
            id="main-content"
          >
            {/* Top bar: collapse toggle (desktop) + Header */}
            <div className="p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
              {/* Desktop sidebar collapse toggle */}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden lg:flex items-center justify-center w-9 h-9 rounded-xl bg-[#ab3500]/10 hover:bg-[#ab3500]/20 border border-[#ab3500]/30 text-[#ab3500] transition-all cursor-pointer shrink-0"
                title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              >
                {isSidebarCollapsed ? <PanelLeftOpen className="w-[20px] h-[20px]" /> : <Menu className="w-[20px] h-[20px]" />}
              </button>

              {/* Header takes remaining width */}
              <div className="flex-1 min-w-0">
                <Header />
              </div>
            </div>

            {/* Page content */}
            <div className="flex-1 w-full px-2 sm:px-4 lg:px-6 py-3 sm:py-5 flex flex-col gap-4 sm:gap-6 overflow-x-hidden">
              <main className="flex-1 min-w-0 overflow-x-hidden flex flex-col">
                {renderActiveView()}
              </main>
            </div>

            <Footer />
          </div>
        </div>
      )}

      {toasts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              onClick={() => dismissToast(toast.id)}
              className={`pointer-events-auto p-4 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-start gap-3 cursor-pointer transition-all animate-in fade-in slide-in-from-bottom-5 duration-300 ${
                themeMode === 'dark' ? 'bg-[#242625]/95' : 'bg-white/95'
              } ${
                toast.type === 'success' ? 'border-[#00ae81]/50' :
                toast.type === 'warning' ? 'border-amber-400' :
                toast.type === 'error' ? 'border-[#ba1a1a]' :
                'border-[#24619d]/50'
              } ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
              }`}
            >
              {toast.type === 'success' ? <CheckCircle className="w-[20px] h-[20px] text-[#00ae81]" /> :
               toast.type === 'warning' ? <AlertTriangle className="w-[20px] h-[20px] text-amber-500" /> :
               toast.type === 'error' ? <AlertCircle className="w-[20px] h-[20px] text-[#ba1a1a]" /> :
               <Info className="w-[20px] h-[20px] text-[#24619d]" />}
              <div className="flex-1">
                <h4 className={`font-heading font-bold text-xs ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>{toast.title}</h4>
                <p className={`text-[11px] mt-0.5 ${
                  themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                }`}>{toast.message}</p>
              </div>
              <button className={`${
                themeMode === 'dark' ? 'text-[#c4c4c4] hover:text-[#f5f5f5]' : 'text-[#8d7168] hover:text-[#1a1c1c]'
              }`}>
                <X className="w-[14px] h-[14px]" />
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
    </>
  );
};

export default function Home() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
