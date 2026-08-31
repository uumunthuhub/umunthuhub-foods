'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Building2, CreditCard, ShoppingCart, Utensils, Receipt, Wallet, FileText } from 'lucide-react';

export const CorporateHome: React.FC = () => {
  const { showToast, themeMode, setCorporateTab } = useApp();

  const quickActions = [
    {
      id: 'menu',
      title: 'Browse Menu',
      description: 'View available menu items and prices',
      icon: Utensils,
      color: 'bg-[#24619d]',
      onClick: () => setCorporateTab('catalog'),
    },
    {
      id: 'orders',
      title: 'View Orders',
      description: 'Track and manage corporate orders',
      icon: Receipt,
      color: 'bg-[#006c4f]',
      onClick: () => setCorporateTab('team_orders'),
    },
    {
      id: 'stipends',
      title: 'Manage Stipends',
      description: 'Configure meal allowances and budgets',
      icon: Wallet,
      color: 'bg-[#ab3500]',
      onClick: () => setCorporateTab('subscriptions'),
    },
    {
      id: 'invoices',
      title: 'Invoices',
      description: 'View billing and payment history',
      icon: FileText,
      color: 'bg-purple-600',
      onClick: () => setCorporateTab('invoices'),
    },
  ];

  const recentActivity = [
    { id: 1, type: 'order', message: 'Grayson Comrade placed an order - Mediterranean Platter', time: '2 hours ago' },
    { id: 2, type: 'budget', message: 'Monthly budget updated to $6,500.00', time: '1 day ago' },
    { id: 3, type: 'stipend', message: 'Daily allowance increased to $25.00', time: '2 days ago' },
    { id: 4, type: 'order', message: 'Grayson Comrade (Ops) placed an order - Vegan Buddha Bowl', time: '3 days ago' },
  ];

  const stats = [
    { label: 'Total Employees', value: '42', icon: Users, color: 'text-[#24619d]' },
    { label: 'Monthly Budget', value: '$6,500', icon: Building2, color: 'text-[#006c4f]' },
    { label: 'Daily Allowance', value: '$25.00', icon: CreditCard, color: 'text-[#ab3500]' },
    { label: 'Active Orders', value: '12', icon: ShoppingCart, color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-6 pb-20 max-w-5xl">
      
      {/* Header */}
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
              Corporate Food Program
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#24619d]/15 text-[#24619d]">
              Enterprise Tier
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>
            Welcome back! Manage your corporate meal program from here
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`rounded-2xl p-4 border space-y-2 ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]'
              : 'bg-white border-gray-100'
          }`}>
            <stat.icon className={`text-[24px] ${stat.color}`} />
            <p className={`font-heading font-extrabold text-2xl ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
            }`}>
              {stat.value}
            </p>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'
            }`}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className={`font-heading font-extrabold text-lg mb-4 ${
          themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
        }`}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`rounded-2xl p-5 border text-left hover:shadow-lg transition-all cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-[#242625] border-[#3a3a3a] hover:border-[#4a4a4a]'
                  : 'bg-white border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${action.color}`}>
                <action.icon className="text-[24px] text-white" />
              </div>
              <h3 className={`font-heading font-bold text-sm mb-1 ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
              }`}>
                {action.title}
              </h3>
              <p className={`text-xs ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>
                {action.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`rounded-2xl p-6 border ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'bg-white border-gray-100'
      }`}>
        <h2 className={`font-heading font-extrabold text-lg mb-4 ${
          themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
        }`}>
          Recent Activity
        </h2>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className={`flex items-start gap-3 p-3 rounded-xl ${
              themeMode === 'dark' ? 'bg-[#383a39]/50' : 'bg-gray-50'
            }`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                activity.type === 'order' ? 'bg-[#24619d]/15' :
                activity.type === 'budget' ? 'bg-[#006c4f]/15' :
                activity.type === 'stipend' ? 'bg-[#ab3500]/15' : 'bg-purple-600/15'
              }`}>
                {activity.type === 'order' ? <ShoppingCart className={`text-[18px] text-[#24619d]`} /> :
                 activity.type === 'budget' ? <Building2 className={`text-[18px] text-[#006c4f]`} /> :
                 activity.type === 'stipend' ? <CreditCard className={`text-[18px] text-[#ab3500]`} /> :
                 <FileText className={`text-[18px] text-purple-600`} />}
              </div>
              <div className="flex-1">
                <p className={`text-xs font-medium ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
                }`}>
                  {activity.message}
                </p>
                <p className={`text-[10px] mt-0.5 ${
                  themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'
                }`}>
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
