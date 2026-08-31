'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Sliders, Bell, Shield, Zap } from 'lucide-react';

export const PlatformSettingsView: React.FC = () => {
  const { showToast, themeMode } = useApp();

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className={`rounded-3xl p-6 sm:p-8 shadow-xl ${
        themeMode === 'dark'
          ? 'bg-linear-to-r from-[#1a1c1c] to-[#2d2d2d]'
          : 'bg-linear-to-r from-[#1a1c1c] to-[#2d2d2d]'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#ab3500]/20 flex items-center justify-center">
            <Settings className="w-[28px] h-[28px] text-[#ab3500]" />
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              Platform Settings
            </h1>
            <p className={`text-xs mt-1 ${
              themeMode === 'dark' ? 'text-gray-400' : 'text-gray-400'
            }`}>Configure global platform configuration and preferences</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* General Settings */}
        <div className={`rounded-2xl p-5 shadow-lg border-2 hover:shadow-xl transition-shadow ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ab3500]/10 flex items-center justify-center">
                <Sliders className="w-[20px] h-[20px] text-[#ab3500]" />
              </div>
              <h3 className={`font-heading font-bold text-sm ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
              }`}>General Configuration</h3>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-3 rounded-xl border ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a]'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div>
                <p className={`font-bold text-xs ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
                }`}>Platform Name</p>
                <p className={`text-[10px] ${
                  themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'
                }`}>UmunthuHub Foods</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-[#ab3500]/10 text-[#ab3500] text-[10px] font-bold hover:bg-[#ab3500]/20 transition-colors cursor-pointer">Edit</button>
            </div>

            <div className={`flex items-center justify-between p-3 rounded-xl border ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a]'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div>
                <p className={`font-bold text-xs ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
                }`}>Default Currency</p>
                <p className={`text-[10px] ${
                  themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'
                }`}>USD ($)</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-[#ab3500]/10 text-[#ab3500] text-[10px] font-bold hover:bg-[#ab3500]/20 transition-colors cursor-pointer">Edit</button>
            </div>

            <div className={`flex items-center justify-between p-3 rounded-xl border ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a]'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div>
                <p className={`font-bold text-xs ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
                }`}>Timezone</p>
                <p className={`text-[10px] ${
                  themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'
                }`}>UTC+2</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-[#ab3500]/10 text-[#ab3500] text-[10px] font-bold hover:bg-[#ab3500]/20 transition-colors cursor-pointer">Edit</button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className={`rounded-2xl p-5 shadow-lg border-2 hover:shadow-xl transition-shadow ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#24619d]/10 flex items-center justify-center">
                <Bell className="w-[20px] h-[20px] text-[#24619d]" />
              </div>
              <h3 className={`font-heading font-bold text-sm ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
              }`}>Notification Preferences</h3>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-3 rounded-xl border ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a]'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div>
                <p className={`font-bold text-xs ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
                }`}>Email Notifications</p>
                <p className={`text-[10px] ${
                  themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'
                }`}>Enabled for all events</p>
              </div>
              <button 
                onClick={() => showToast('Settings Updated', 'Email notification preferences changed', 'success')}
                className="px-3 py-1.5 rounded-lg bg-[#24619d]/10 text-[#24619d] text-[10px] font-bold hover:bg-[#24619d]/20 transition-colors cursor-pointer"
              >
                Configure
              </button>
            </div>

            <div className={`flex items-center justify-between p-3 rounded-xl border ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a]'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div>
                <p className={`font-bold text-xs ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
                }`}>SMS Alerts</p>
                <p className={`text-[10px] ${
                  themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'
                }`}>Critical events only</p>
              </div>
              <button 
                onClick={() => showToast('Settings Updated', 'SMS alert preferences changed', 'success')}
                className="px-3 py-1.5 rounded-lg bg-[#24619d]/10 text-[#24619d] text-[10px] font-bold hover:bg-[#24619d]/20 transition-colors cursor-pointer"
              >
                Configure
              </button>
            </div>

            <div className={`flex items-center justify-between p-3 rounded-xl border ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a]'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div>
                <p className={`font-bold text-xs ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>Push Notifications</p>
                <p className={`text-[10px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>Real-time updates</p>
              </div>
              <button 
                onClick={() => showToast('Settings Updated', 'Push notification preferences changed', 'success')}
                className="px-3 py-1.5 rounded-lg bg-[#24619d]/10 text-[#24619d] text-[10px] font-bold hover:bg-[#24619d]/20 transition-colors cursor-pointer"
              >
                Configure
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className={`rounded-2xl p-5 shadow-lg border-2 hover:shadow-xl transition-shadow ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#006c4f]/10 flex items-center justify-center">
                <Shield className="w-[20px] h-[20px] text-[#006c4f]" />
              </div>
              <h3 className={`font-heading font-bold text-sm ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>Security & Access</h3>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-3 rounded-xl border ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a]'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div>
                <p className={`font-bold text-xs ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>Two-Factor Authentication</p>
                <p className="text-[10px] text-[#006c4f] font-bold">Enabled</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-[#006c4f]/10 text-[#006c4f] text-[10px] font-bold hover:bg-[#006c4f]/20 transition-colors cursor-pointer">Manage</button>
            </div>

            <div className={`flex items-center justify-between p-3 rounded-xl border ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a]'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div>
                <p className={`font-bold text-xs ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>Session Timeout</p>
                <p className={`text-[10px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>30 minutes</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-[#006c4f]/10 text-[#006c4f] text-[10px] font-bold hover:bg-[#006c4f]/20 transition-colors cursor-pointer">Edit</button>
            </div>

            <div className={`flex items-center justify-between p-3 rounded-xl border ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a]'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div>
                <p className={`font-bold text-xs ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>API Access Keys</p>
                <p className={`text-[10px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>3 active keys</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-[#006c4f]/10 text-[#006c4f] text-[10px] font-bold hover:bg-[#006c4f]/20 transition-colors cursor-pointer">Manage</button>
            </div>
          </div>
        </div>

        {/* Integration Settings */}
        <div className={`rounded-2xl p-5 shadow-lg border-2 hover:shadow-xl transition-shadow ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8d7168]/10 flex items-center justify-center">
                <Zap className="w-[20px] h-[20px] text-[#8d7168]" />
              </div>
              <h3 className={`font-heading font-bold text-sm ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>Integrations</h3>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-3 rounded-xl border ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a]'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div>
                <p className={`font-bold text-xs ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>Payment Gateway</p>
                <p className="text-[10px] text-[#006c4f] font-bold">Stripe Connected</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-[#8d7168]/10 text-[#8d7168] text-[10px] font-bold hover:bg-[#8d7168]/20 transition-colors cursor-pointer">Configure</button>
            </div>

            <div className={`flex items-center justify-between p-3 rounded-xl border ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a]'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div>
                <p className={`font-bold text-xs ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>Mapping Service</p>
                <p className={`text-[10px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>Google Maps</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-[#8d7168]/10 text-[#8d7168] text-[10px] font-bold hover:bg-[#8d7168]/20 transition-colors cursor-pointer">Configure</button>
            </div>

            <div className={`flex items-center justify-between p-3 rounded-xl border ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a]'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div>
                <p className={`font-bold text-xs ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>Analytics</p>
                <p className={`text-[10px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>Not configured</p>
              </div>
              <button 
                onClick={() => showToast('Integration Setup', 'Analytics integration wizard started', 'info')}
                className="px-3 py-1.5 rounded-lg bg-[#ab3500]/10 text-[#ab3500] text-[10px] font-bold hover:bg-[#ab3500]/20 transition-colors cursor-pointer"
              >
                Setup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};