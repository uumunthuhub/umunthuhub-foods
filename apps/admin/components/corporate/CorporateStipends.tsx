'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const CorporateStipends: React.FC = () => {
  const { showToast, themeMode } = useApp();
  const [monthlyBudget, setMonthlyBudget] = useState('6500.00');
  const [dailyAllowance, setDailyAllowance] = useState('25.00');

  const employees = [
    { id: 'emp-1', name: 'Grayson Comrade', email: 'grayson.comrade@umunthuhub.com', team: 'Executive', balance: 25.00, monthlySpent: 280.00, monthlyLimit: 600.00, status: 'Active' },
    { id: 'emp-2', name: 'Grayson Comrade (Ops)', email: 'grayson.ops@umunthuhub.com', team: 'Operations', balance: 25.00, monthlySpent: 340.00, monthlyLimit: 600.00, status: 'Active' },
    { id: 'emp-3', name: 'Grayson Comrade (Tech)', email: 'grayson.tech@umunthuhub.com', team: 'Engineering', balance: 25.00, monthlySpent: 195.00, monthlyLimit: 600.00, status: 'Active' },
    { id: 'emp-4', name: 'Grayson Comrade (Design)', email: 'grayson.design@umunthuhub.com', team: 'Design', balance: 25.00, monthlySpent: 420.00, monthlyLimit: 600.00, status: 'Active' },
  ];

  const handleUpdateBudget = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Budget Updated', `Monthly budget set to $${monthlyBudget}`, 'success');
  };

  const handleUpdateAllowance = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Allowance Updated', `Daily allowance set to $${dailyAllowance}`, 'success');
  };

  const getUsagePercentage = (spent: number, limit: number) => {
    return Math.round((spent / limit) * 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 70) return 'text-amber-500';
    return 'text-emerald-500';
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
            Stipend Management
          </h1>
          <p className={`text-xs mt-0.5 ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>
            Configure meal stipends and track employee spending
          </p>
        </div>
      </div>

      {/* Budget Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={`rounded-3xl p-5 border space-y-4 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <div>
            <h3 className={`font-heading font-extrabold text-base mb-1 ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              Monthly Budget
            </h3>
            <p className={`text-xs ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'}`}>
              Total monthly food budget for all employees
            </p>
          </div>
          <form onSubmit={handleUpdateBudget} className="flex items-center gap-2">
            <span className={`text-xs font-bold ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>
              $
            </span>
            <input
              type="number"
              step="100"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className={`flex-1 glass-input px-3 py-2 rounded-xl text-xs font-bold ${
                themeMode === 'dark' ? 'bg-[#383a39] text-[#f5f5f5]' : 'bg-white'
              }`}
            />
            <button
              type="submit"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-[#24619d] hover:bg-[#1a4b7a] text-white'
                  : 'bg-[#24619d] hover:bg-[#1a4b7a] text-white'
              }`}
            >
              Update
            </button>
          </form>
        </div>

        <div className={`rounded-3xl p-5 border space-y-4 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <div>
            <h3 className={`font-heading font-extrabold text-base mb-1 ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              Daily Allowance
            </h3>
            <p className={`text-xs ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'}`}>
              Daily meal allowance per employee
            </p>
          </div>
          <form onSubmit={handleUpdateAllowance} className="flex items-center gap-2">
            <span className={`text-xs font-bold ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>
              $
            </span>
            <input
              type="number"
              step="1"
              value={dailyAllowance}
              onChange={(e) => setDailyAllowance(e.target.value)}
              className={`flex-1 glass-input px-3 py-2 rounded-xl text-xs font-bold ${
                themeMode === 'dark' ? 'bg-[#383a39] text-[#f5f5f5]' : 'bg-white'
              }`}
            />
            <button
              type="submit"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-[#24619d] hover:bg-[#1a4b7a] text-white'
                  : 'bg-[#24619d] hover:bg-[#1a4b7a] text-white'
              }`}
            >
              Update
            </button>
          </form>
        </div>
      </div>

      {/* Employee Stipend Table */}
      <div className={`rounded-3xl p-6 border space-y-4 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>
        <div>
          <h3 className={`font-heading font-extrabold text-base ${
            themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
          }`}>
            Employee Stipend Usage
          </h3>
          <p className={`text-xs ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'}`}>
            Track monthly spending and remaining balances
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b font-bold uppercase tracking-wider text-[10px] ${
                themeMode === 'dark' ? 'border-[#3a3a3a] text-[#7a7a7a]' : 'border-[#e1bfb5]/50 text-[#8d7168]'
              }`}>
                <th className="pb-3">Employee</th>
                <th className="pb-3">Department</th>
                <th className="pb-3">Daily Balance</th>
                <th className="pb-3">Monthly Spent</th>
                <th className="pb-3">Monthly Limit</th>
                <th className="pb-3">Usage</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              themeMode === 'dark' ? 'divide-[#3a3a3a]/30' : 'divide-[#e1bfb5]/30'
            }`}>
              {employees.map(emp => {
                const usagePercent = getUsagePercentage(emp.monthlySpent, emp.monthlyLimit);
                return (
                  <tr key={emp.id} className={`transition-colors ${
                    themeMode === 'dark' ? 'hover:bg-[#383a39]/50' : 'hover:bg-[#f9f9f9]/80'
                  }`}>
                    <td className="py-3.5">
                      <p className={`font-bold ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>{emp.name}</p>
                      <p className={`text-[10px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'}`}>{emp.email}</p>
                    </td>
                    <td className={`py-3.5 ${themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'}`}>{emp.team}</td>
                    <td className={`py-3.5 font-extrabold ${themeMode === 'dark' ? 'text-emerald-400' : 'text-[#006c4f]'}`}>
                      ${emp.balance.toFixed(2)}
                    </td>
                    <td className={`py-3.5 font-bold ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>
                      ${emp.monthlySpent.toFixed(2)}
                    </td>
                    <td className={`py-3.5 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>
                      ${emp.monthlyLimit.toFixed(2)}
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full overflow-hidden bg-gray-200">
                          <div 
                            className={`h-full ${usagePercent >= 90 ? 'bg-red-500' : usagePercent >= 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${usagePercent}%` }}
                          />
                        </div>
                        <span className={`font-bold ${getUsageColor(usagePercent)}`}>
                          {usagePercent}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        themeMode === 'dark'
                          ? 'bg-emerald-900/30 text-emerald-400'
                          : 'bg-[#00ae81]/15 text-[#006c4f]'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
