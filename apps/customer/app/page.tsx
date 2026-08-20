'use client';

import React from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { CartDrawer } from '../components/customer/CartDrawer';
import { ItemDetailModal } from '../components/customer/ItemDetailModal';
import { AuthModal } from '../components/customer/AuthModal';

// Customer views
import { CustomerHome } from '../components/customer/CustomerHome';
import { RestaurantMenu } from '../components/customer/RestaurantMenu';
import { CheckoutView } from '../components/customer/CheckoutView';
import { OrderTrackingView } from '../components/customer/OrderTrackingView';
import { RewardsView } from '../components/customer/RewardsView';

const MainAppContent: React.FC = () => {
  const {
    customerTab,
    toasts,
    dismissToast
  } = useApp();

  const renderActiveView = () => {
    switch (customerTab) {
      case 'home':
        return <CustomerHome />;
      case 'restaurant':
        return <RestaurantMenu />;
      case 'checkout':
        return <CheckoutView />;
      case 'tracking':
        return <OrderTrackingView />;
      case 'rewards':
        return <RewardsView />;
      default:
        return <CustomerHome />;
    }
  };

  return (
    <div className="flex-1 bg-[#fcf9f8] text-[#1a1c1c] font-body selection:bg-[#ab3500] selection:text-white flex flex-col transition-colors duration-300 overflow-x-hidden">
      <Header />

      <div className="flex-1 max-w-384 w-full mx-auto px-2 sm:px-4 lg:px-6 pt-24 pb-4 sm:pb-5 overflow-x-hidden">
        <main className="w-full">
          {renderActiveView()}
        </main>
      </div>

      <Footer />

      <CartDrawer />
      <ItemDetailModal />
      <AuthModal />

      {toasts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              onClick={() => dismissToast(toast.id)}
              className={`pointer-events-auto p-4 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-start gap-3 cursor-pointer transition-all animate-in fade-in slide-in-from-bottom-5 duration-300 ${
                toast.type === 'success' ? 'bg-white/95 border-[#00ae81]/50 text-[#1a1c1c]' :
                toast.type === 'warning' ? 'bg-white/95 border-amber-400 text-[#1a1c1c]' :
                toast.type === 'error' ? 'bg-white/95 border-[#ba1a1a] text-[#ba1a1a]' :
                'bg-white/95 border-[#24619d]/50 text-[#1a1c1c]'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${
                toast.type === 'success' ? 'text-[#00ae81]' :
                toast.type === 'warning' ? 'text-amber-500' :
                toast.type === 'error' ? 'text-[#ba1a1a]' :
                'text-[#24619d]'
              }`}>
                {toast.type === 'success' ? 'check_circle' :
                 toast.type === 'warning' ? 'warning' :
                 toast.type === 'error' ? 'error' : 'info'}
              </span>
              <div className="flex-1">
                <h4 className="font-heading font-bold text-xs text-[#1a1c1c]">{toast.title}</h4>
                <p className="text-[11px] text-[#594139] mt-0.5">{toast.message}</p>
              </div>
              <button className="text-[#8d7168] hover:text-[#1a1c1c]">
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
