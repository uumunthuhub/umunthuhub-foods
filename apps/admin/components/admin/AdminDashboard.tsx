'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { ThemeToggle } from '../common/ThemeToggle';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { BarChart3, HandCoins, Building2, Store, Gauge, BarChart as BarChartIcon } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    tenants,
    orders,
    setAdminTab,
    setCurrentTenantId,
    setPersona,
    setVendorTab,
    themeMode
  } = useApp();

  const totalGMV = orders.reduce((sum, o) => sum + o.total, 0);
  const platformRevenue = totalGMV * 0.12; // 12% take rate
  const activeTenantsCount = tenants.filter(t => t.isOpen).length;

  // Chart Data
  const revenueData = [
    { month: 'Jan', revenue: 45000, orders: 320 },
    { month: 'Feb', revenue: 52000, orders: 380 },
    { month: 'Mar', revenue: 48000, orders: 350 },
    { month: 'Apr', revenue: 61000, orders: 420 },
    { month: 'May', revenue: 58000, orders: 400 },
    { month: 'Jun', revenue: 72000, orders: 510 },
    { month: 'Jul', revenue: 68000, orders: 470 },
    { month: 'Aug', revenue: 85000, orders: 580 },
  ];

  const tenantPerformanceData = tenants.slice(0, 6).map(t => ({
    name: t.name.substring(0, 12),
    revenue: t.monthlyRevenue || 12400,
    orders: Math.floor((t.monthlyRevenue || 12400) / 25),
  }));

  const orderStatusData = [
    { name: 'Completed', value: 65, color: '#006c4f' },
    { name: 'In Progress', value: 20, color: '#ab3500' },
    { name: 'Cancelled', value: 10, color: '#ba1a1a' },
    { name: 'Refunded', value: 5, color: '#8d7168' },
  ];

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className={`rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        themeMode === 'dark'
          ? 'bg-linear-to-r from-[#1a1c1c] to-[#2d2d2d]'
          : 'bg-linear-to-r from-[#f5f5f5] to-[#e8e8e8]'
      }`}>
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#ab3500]/20 flex items-center justify-center">
              <BarChart3 className="w-7 h-7 text-[#ab3500]" />
            </div>
            <div>
              <h1 className={`font-heading font-extrabold text-xl sm:text-2xl ${
                themeMode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Platform Executive Hub
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ab3500]/30 text-[#ab3500] border border-[#ab3500]/40">
                Global Multi-Tenant Root
              </span>
            </div>
          </div>
          <p className={`text-xs mt-2 ${
            themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Real-time ecosystem metrics across restaurants, couriers, and corporate accounts
          </p>
        </div>

        <div className={`flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-2xl border ${
          themeMode === 'dark'
            ? 'bg-white/10 border-white/20'
            : 'bg-white border-gray-200'
        }`}>
          <span className="w-2.5 h-2.5 rounded-full bg-[#00ae81] animate-pulse" />
          <span className={`text-xs font-bold ${
            themeMode === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Ecosystem Healthy (99.98% uptime)</span>
        </div>

        <ThemeToggle />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className={`rounded-2xl p-5 shadow-lg border hover:shadow-xl transition-shadow ${
          themeMode === 'dark' ? 'bg-[#242625] border-[#3a3a3a]' : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-500'
            }`}>Gross Platform GMV</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              themeMode === 'dark' ? 'bg-emerald-900/30' : 'bg-emerald-100'
            }`}>
              <HandCoins className="w-4.5 h-4.5 text-emerald-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`font-heading font-extrabold text-2xl ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
            }`}>
              ${(totalGMV + 142000).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              themeMode === 'dark' ? 'text-emerald-400 bg-emerald-900/30' : 'text-emerald-600 bg-emerald-50'
            }`}>+18.2%</span>
          </div>
          <p className={`text-[11px] mt-1 ${
            themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-500'
          }`}>Past 30 days total transactions</p>
        </div>

        <div className={`rounded-2xl p-5 shadow-lg border hover:shadow-xl transition-shadow ${
          themeMode === 'dark' ? 'bg-[#242625] border-[#3a3a3a]' : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-500'
            }`}>Platform Take-Rate (12%)</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              themeMode === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
            }`}>
              <Building2 className="w-4.5 h-4.5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-2xl text-blue-600">
              ${(platformRevenue + 17040).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              themeMode === 'dark' ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-50'
            }`}>Net SaaS</span>
          </div>
          <p className={`text-[11px] mt-1 ${
            themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-500'
          }`}>Automated escrow clearing</p>
        </div>

        <div className={`rounded-2xl p-5 shadow-lg border hover:shadow-xl transition-shadow ${
          themeMode === 'dark' ? 'bg-[#242625] border-[#3a3a3a]' : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-500'
            }`}>Active Food Tenants</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              themeMode === 'dark' ? 'bg-orange-900/30' : 'bg-orange-100'
            }`}>
              <Store className="w-4.5 h-4.5 text-orange-600" />
            </div>
          </div>
          <div className="space-y-2">
            <span className="font-heading font-extrabold text-2xl text-orange-600">
              {tenants.length} Kitchens
            </span>
            <span className={`block text-[11px] font-bold px-2 py-0.5 rounded-full text-center ${
              themeMode === 'dark' ? 'text-emerald-400 bg-emerald-900/30' : 'text-emerald-600 bg-emerald-50'
            }`}>100% active</span>
          </div>
          <p className={`text-[11px] mt-1 ${
            themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-500'
          }`}>{activeTenantsCount} open right now</p>
        </div>

        <div className={`rounded-2xl p-5 shadow-lg border hover:shadow-xl transition-shadow ${
          themeMode === 'dark' ? 'bg-[#242625] border-[#3a3a3a]' : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-500'
            }`}>Fleet Dispatch Velocity</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              themeMode === 'dark' ? 'bg-indigo-900/30' : 'bg-indigo-100'
            }`}>
              <Gauge className="w-4.5 h-4.5 text-indigo-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`font-heading font-extrabold text-2xl ${
              themeMode === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
            }`}>
              18.4 mins
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              themeMode === 'dark'
                ? 'text-emerald-400 bg-emerald-900/30'
                : 'text-emerald-600 bg-emerald-50'
            }`}>⚡ Fast</span>
          </div>
          <p className={`text-[11px] mt-1 ${
            themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-500'
          }`}>Avg. order-to-door time</p>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className={`rounded-2xl p-6 shadow-lg border ${
          themeMode === 'dark' ? 'bg-[#242625] border-[#3a3a3a]' : 'bg-white border-gray-100'
        }`}>
          <h3 className={`font-heading font-bold text-lg mb-4 ${
            themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
          }`}>Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke={themeMode === 'dark' ? '#3a3a3a' : '#e5e7eb'} />
              <XAxis dataKey="month" stroke={themeMode === 'dark' ? '#c4c4c4' : '#6b7280'} />
              <YAxis stroke={themeMode === 'dark' ? '#c4c4c4' : '#6b7280'} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: themeMode === 'dark' ? '#242625' : 'white', 
                  borderRadius: '12px', 
                  border: `1px solid ${themeMode === 'dark' ? '#3a3a3a' : '#e5e7eb'}` 
                }}
                itemStyle={{ color: themeMode === 'dark' ? '#f5f5f5' : '#1a1c1c' }}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#ab3500" strokeWidth={3} name="Revenue ($)" />
              <Line type="monotone" dataKey="orders" stroke="#24619d" strokeWidth={3} name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={`rounded-2xl p-6 shadow-lg border ${
          themeMode === 'dark' ? 'bg-[#242625] border-[#3a3a3a]' : 'bg-white border-gray-100'
        }`}>
          <h3 className={`font-heading font-bold text-lg mb-4 ${
            themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
          }`}>Tenant Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tenantPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke={themeMode === 'dark' ? '#3a3a3a' : '#e5e7eb'} />
              <XAxis dataKey="name" stroke={themeMode === 'dark' ? '#c4c4c4' : '#6b7280'} />
              <YAxis stroke={themeMode === 'dark' ? '#c4c4c4' : '#6b7280'} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: themeMode === 'dark' ? '#242625' : 'white', 
                  borderRadius: '12px', 
                  border: `1px solid ${themeMode === 'dark' ? '#3a3a3a' : '#e5e7eb'}` 
                }}
                itemStyle={{ color: themeMode === 'dark' ? '#f5f5f5' : '#1a1c1c' }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#24619d" radius={[4, 4, 0, 0]} name="Revenue ($)" />
              <Bar dataKey="orders" fill="#006c4f" radius={[4, 4, 0, 0]} name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tenant Performance Bar Chart */}
      <div className={`rounded-2xl p-6 shadow-lg border space-y-4 ${
        themeMode === 'dark' ? 'bg-[#242625] border-[#3a3a3a]' : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-heading font-extrabold text-base flex items-center gap-2 ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
            }`}>
              <BarChartIcon className="w-5 h-5 text-orange-500" />
              Tenant Performance
            </h3>
            <p className={`text-xs ${
              themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-500'
            }`}>Revenue and orders by venue</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={tenantPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke={themeMode === 'dark' ? '#3a3a3a' : '#e5e7eb'} />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: themeMode === 'dark' ? '#c4c4c4' : '#6b7280' }} angle={-45} textAnchor="end" height={60} />
            <YAxis tick={{ fontSize: 11, fill: themeMode === 'dark' ? '#c4c4c4' : '#6b7280' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: themeMode === 'dark' ? '#242625' : 'white',
                borderRadius: '12px',
                border: `1px solid ${themeMode === 'dark' ? '#3a3a3a' : '#e5e7eb'}`,
                fontSize: '12px'
              }}
              itemStyle={{ color: themeMode === 'dark' ? '#f5f5f5' : '#1a1c1c' }}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#24619d" radius={[4, 4, 0, 0]} name="Revenue ($)" />
            <Bar dataKey="orders" fill="#006c4f" radius={[4, 4, 0, 0]} name="Orders" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Order Status Distribution */}
      <div className={`rounded-2xl p-6 shadow-lg border ${
        themeMode === 'dark' ? 'bg-[#242625] border-[#3a3a3a]' : 'bg-white border-gray-100'
      }`}>
        <h3 className={`font-heading font-bold text-lg mb-4 ${
          themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
        }`}>Order Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={orderStatusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {orderStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: themeMode === 'dark' ? '#242625' : 'white',
                borderRadius: '12px',
                border: `1px solid ${themeMode === 'dark' ? '#3a3a3a' : '#e5e7eb'}`
              }}
              itemStyle={{ color: themeMode === 'dark' ? '#f5f5f5' : '#1a1c1c' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};
