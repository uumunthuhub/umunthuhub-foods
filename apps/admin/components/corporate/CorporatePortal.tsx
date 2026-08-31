'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UtensilsCrossed, X } from 'lucide-react';
import { CorporateTab } from '@umunthuhub/shared-types';

export const CorporatePortal: React.FC = () => {
  const { showToast, themeMode, corporateTab, setCorporateTab } = useApp();

  const [dailyAllowance, setDailyAllowance] = useState('25.00');
  const [employees, setEmployees] = useState([
    { id: 'emp-1', name: 'Grayson Comrade', email: 'grayson.comrade@umunthuhub.com', team: 'Executive', balance: 25.00, monthlySpent: 280.00, status: 'Active' },
    { id: 'emp-2', name: 'Grayson Comrade (Ops)', email: 'grayson.ops@umunthuhub.com', team: 'Operations', balance: 25.00, monthlySpent: 340.00, status: 'Active' },
    { id: 'emp-3', name: 'Grayson Comrade (Tech)', email: 'grayson.tech@umunthuhub.com', team: 'Engineering', balance: 25.00, monthlySpent: 195.00, status: 'Active' },
    { id: 'emp-4', name: 'Grayson Comrade (Design)', email: 'grayson.design@umunthuhub.com', team: 'Design', balance: 25.00, monthlySpent: 420.00, status: 'Active' },
  ]);

  const [isCateringModalOpen, setIsCateringModalOpen] = useState(false);
  const [cateringHeadcount, setCateringHeadcount] = useState('35');
  const [cateringDate, setCateringDate] = useState('2026-08-22');

  const handleUpdateAllowance = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Corporate Policy Updated', `Daily employee meal subsidy set to $${dailyAllowance}`, 'success');
  };

  const handleBookCatering = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Catering Request Submitted', `Corporate catering inquiry dispatched to top culinary partners for ${cateringHeadcount} guests`, 'success');
    setIsCateringModalOpen(false);
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
          <div className="flex items-center gap-2">
            <h1 className={`font-heading font-extrabold text-xl sm:text-2xl ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              Acme Technologies Corporate Food Program
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#24619d]/15 text-[#24619d]">
              Enterprise Tier
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>
            Automated meal allowances, tax-compliant invoicing, and team catering scheduler
          </p>
        </div>

        <button
          onClick={() => setIsCateringModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl glass-button-primary font-heading font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#ab3500]/25 cursor-pointer self-start sm:self-auto"
        >
          <UtensilsCrossed className="w-[18px] h-[18px]" />
          <span>Schedule Team Catering</span>
        </button>
      </div>

      {/* Corporate KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className={`rounded-3xl p-5 border space-y-1 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wider ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
          }`}>Monthly Food Budget</span>
          <p className={`font-heading font-extrabold text-2xl ${
            themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
          }`}>$6,500.00</p>
          <p className="text-[11px] text-[#006c4f]">$1,235.00 spent this month (19%)</p>
        </div>

        <div className={`rounded-3xl p-5 border space-y-1 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wider ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
          }`}>Enrolled Team Members</span>
          <p className="font-heading font-extrabold text-2xl text-[#24619d]">42 Employees</p>
          <p className={`text-[11px] ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>Across 4 department groups</p>
        </div>

        <div className={`rounded-3xl p-5 border space-y-1 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wider ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
          }`}>Daily Meal Allowance</span>
          <p className="font-heading font-extrabold text-2xl text-[#ab3500]">${dailyAllowance}</p>
          <p className={`text-[11px] ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>Auto-refills daily at 8:00 AM</p>
        </div>
      </div>

      {/* Employee Allowance Rules & Roster */}
      <div className={`rounded-3xl p-6 border space-y-5 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${
          themeMode === 'dark' ? 'border-[#3a3a3a]/40' : 'border-[#e1bfb5]/40'
        }`}>
          <div>
            <h3 className={`font-heading font-extrabold text-base ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              Team Member Allowance Roster
            </h3>
            <p className={`text-xs ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
            }`}>Employees can pay for meals directly using their corporate badge account</p>
          </div>

          <form onSubmit={handleUpdateAllowance} className="flex items-center gap-2">
            <span className={`text-xs font-bold ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>Daily Cap:</span>
            <input
              type="number"
              step="1"
              value={dailyAllowance}
              onChange={(e) => setDailyAllowance(e.target.value)}
              className="w-20 glass-input px-2.5 py-1 rounded-xl text-xs font-bold text-center"
            />
            <button
              type="submit"
              className={`px-3 py-1 text-xs font-bold rounded-xl border ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] hover:bg-[#4a4a4a] text-[#c4c4c4] border-[#3a3a3a]'
                  : 'bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#1a1c1c] border-[#e1bfb5]'
              }`}
            >
              Update
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b ${
                themeMode === 'dark' ? 'border-[#3a3a3a]/50 text-[#7a7a7a]' : 'border-[#e1bfb5]/50 text-[#8d7168]'
              }`}>
                <th className="pb-3 font-bold">Employee</th>
                <th className="pb-3 font-bold">Department</th>
                <th className="pb-3 font-bold">Today's Remaining</th>
                <th className="pb-3 font-bold">Monthly Usage</th>
                <th className="pb-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              themeMode === 'dark' ? 'divide-[#3a3a3a]/30' : 'divide-[#e1bfb5]/30'
            }`}>
              {employees.map(emp => (
                <tr key={emp.id} className={`hover:bg-[#f9f9f9]/80 ${
                  themeMode === 'dark' ? 'hover:bg-[#383a39]/50' : ''
                }`}>
                  <td className="py-3.5">
                    <p className={`font-bold ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>{emp.name}</p>
                    <p className={`text-[10px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'}`}>{emp.email}</p>
                  </td>
                  <td className={`py-3.5 ${themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'}`}>{emp.team}</td>
                  <td className={`py-3.5 font-extrabold ${themeMode === 'dark' ? 'text-emerald-400' : 'text-[#006c4f]'}`}>${emp.balance.toFixed(2)}</td>
                  <td className={`py-3.5 font-bold ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>${emp.monthlySpent.toFixed(2)}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Catering Booking Modal */}
      {isCateringModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsCateringModalOpen(false)} />
          <div className={`relative w-full max-w-md rounded-3xl p-6 shadow-2xl border animate-in fade-in zoom-in-95 ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]'
              : 'glass-panel bg-white border-[#e1bfb5]'
          }`}>
            <div className={`flex items-center justify-between pb-3 border-b mb-4 ${
              themeMode === 'dark' ? 'border-[#3a3a3a]/40' : 'border-[#e1bfb5]/40'
            }`}>
              <h3 className={`font-heading font-extrabold text-base ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
              }`}>Schedule Team Buffet Catering</h3>
              <button onClick={() => setIsCateringModalOpen(false)} className={`w-8 h-8 rounded-full flex items-center justify-center ${
                themeMode === 'dark' ? 'bg-[#383a39] text-[#c4c4c4]' : 'bg-[#f3f3f3] text-[#594139]'
              }`}>
                <X className="w-[18px] h-[18px]" />
              </button>
            </div>

            <form onSubmit={handleBookCatering} className="space-y-4 text-xs">
              <div>
                <label className={`font-bold block mb-1 ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>Estimated Guest Headcount</label>
                <input
                  type="number"
                  min="5"
                  required
                  value={cateringHeadcount}
                  onChange={(e) => setCateringHeadcount(e.target.value)}
                  className={`w-full glass-input px-3.5 py-2 rounded-xl font-bold ${
                    themeMode === 'dark' ? 'bg-[#383a39] text-[#f5f5f5]' : 'bg-white'
                  }`}
                />
              </div>

              <div>
                <label className={`font-bold block mb-1 ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>Delivery Event Date</label>
                <input
                  type="date"
                  required
                  value={cateringDate}
                  onChange={(e) => setCateringDate(e.target.value)}
                  className={`w-full glass-input px-3.5 py-2 rounded-xl font-semibold ${
                    themeMode === 'dark' ? 'bg-[#383a39] text-[#f5f5f5]' : 'bg-white'
                  }`}
                />
              </div>

              <div>
                <label className={`font-bold block mb-1 ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>Cuisine / Dietary Preferences</label>
                <input
                  type="text"
                  placeholder="e.g. Mediterranean platters, vegan options included"
                  className={`w-full glass-input px-3.5 py-2 rounded-xl ${
                    themeMode === 'dark' ? 'bg-[#383a39] text-[#f5f5f5]' : 'bg-white'
                  }`}
                />
              </div>

              <div className={`pt-3 border-t flex gap-3 ${
                themeMode === 'dark' ? 'border-[#3a3a3a]/40' : 'border-[#e1bfb5]/40'
              }`}>
                <button
                  type="button"
                  onClick={() => setIsCateringModalOpen(false)}
                  className={`w-1/3 py-2.5 rounded-xl text-xs font-bold ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] text-[#c4c4c4]'
                      : 'bg-[#f3f3f3] text-[#594139]'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl glass-button-primary text-xs font-bold shadow-md"
                >
                  Submit Catering Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
