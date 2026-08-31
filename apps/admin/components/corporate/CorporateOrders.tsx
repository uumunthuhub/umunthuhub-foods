'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Receipt } from 'lucide-react';

export const CorporateOrders: React.FC = () => {
  const { showToast, themeMode } = useApp();
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    { id: 'ORD-001', employee: 'Grayson Comrade', items: ['Mediterranean Platter', 'Grilled Salmon Bowl'], total: 42.50, date: '2026-08-22', status: 'completed' },
    { id: 'ORD-002', employee: 'Grayson Comrade (Ops)', items: ['Vegan Buddha Bowl'], total: 19.50, date: '2026-08-22', status: 'pending' },
    { id: 'ORD-003', employee: 'Grayson Comrade (Tech)', items: ['Chicken Caesar Wrap', 'Fruit Smoothie'], total: 23.00, date: '2026-08-21', status: 'completed' },
    { id: 'ORD-004', employee: 'Grayson Comrade (Design)', items: ['Artisan Cheese Board'], total: 22.00, date: '2026-08-21', status: 'cancelled' },
    { id: 'ORD-005', employee: 'Grayson Comrade', items: ['Quinoa Salad'], total: 14.50, date: '2026-08-20', status: 'completed' },
  ];

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: themeMode === 'dark' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-700',
      pending: themeMode === 'dark' ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700',
      cancelled: themeMode === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700',
    };
    return styles[status as keyof typeof styles] || styles.completed;
  };

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
            Corporate Orders
          </h1>
          <p className={`text-xs mt-0.5 ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>
            Track and manage all corporate meal orders
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className={`rounded-2xl p-4 border flex items-center gap-3 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'bg-white border-gray-100'
      }`}>
        <span className={`text-xs font-bold ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>
          Filter by Status:
        </span>
        <div className="flex gap-2">
          {['all', 'completed', 'pending', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#24619d] text-white'
                  : themeMode === 'dark'
                    ? 'bg-[#383a39] text-[#c4c4c4] hover:bg-[#4a4a4a]'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className={`rounded-2xl p-6 border ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'bg-white border-gray-100'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b font-bold uppercase tracking-wider text-[10px] ${
                themeMode === 'dark' ? 'border-[#3a3a3a] text-[#7a7a7a]' : 'border-gray-200 text-gray-500'
              }`}>
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Employee</th>
                <th className="pb-3">Items</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              themeMode === 'dark' ? 'divide-[#3a3a3a]/30' : 'divide-gray-100'
            }`}>
              {filteredOrders.map(order => (
                <tr key={order.id} className={`transition-colors ${
                  themeMode === 'dark' ? 'hover:bg-[#383a39]/50' : 'hover:bg-gray-50'
                }`}>
                  <td className={`py-4 font-mono font-bold ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
                    {order.id}
                  </td>
                  <td className={`py-4 ${themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-700'}`}>
                    {order.employee}
                  </td>
                  <td className="py-4">
                    <div className="flex flex-wrap gap-1">
                      {order.items.map((item, i) => (
                        <span key={i} className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold ${
                          themeMode === 'dark'
                            ? 'bg-[#383a39] text-[#c4c4c4]'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className={`py-4 font-bold ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
                    ${order.total.toFixed(2)}
                  </td>
                  <td className={`py-4 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>
                    {order.date}
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 text-right space-x-2">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => showToast('Order Cancelled', `Order ${order.id} has been cancelled`, 'success')}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                          themeMode === 'dark'
                            ? 'bg-red-900/20 hover:bg-red-900/30 text-red-400'
                            : 'bg-red-50 hover:bg-red-100 text-red-600'
                        }`}
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={() => showToast('Order Details', `Viewing details for ${order.id}`, 'info')}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                        themeMode === 'dark'
                          ? 'bg-[#383a39] hover:bg-[#4a4a4a] text-[#c4c4c4]'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      }`}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Receipt className={`text-5xl mb-3 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-300'}`} />
            <h3 className={`font-heading font-bold text-base ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
              No Orders Found
            </h3>
            <p className={`text-xs mt-1 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>
              Try adjusting your filter criteria
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
