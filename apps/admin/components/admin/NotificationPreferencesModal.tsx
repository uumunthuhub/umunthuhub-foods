'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, X, Mail, MessageSquare, Smartphone } from 'lucide-react';

interface NotificationPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPreferencesModal: React.FC<NotificationPreferencesModalProps> = ({ isOpen, onClose }) => {
  const { showToast, themeMode } = useApp();
  const [preferences, setPreferences] = useState({
    email: {
      orders: true,
      payments: true,
      support: true,
      marketing: false,
      security: true
    },
    sms: {
      orders: false,
      payments: true,
      support: false,
      marketing: false,
      security: true
    },
    push: {
      orders: true,
      payments: true,
      support: true,
      marketing: false,
      security: true
    }
  });

  const handleToggle = (category: keyof typeof preferences, type: string) => {
    setPreferences({
      ...preferences,
      [category]: {
        ...preferences[category],
        [type]: !preferences[category][type as keyof typeof preferences[typeof category]]
      }
    });
  };

  const handleSave = () => {
    showToast('Preferences Saved', 'Your notification preferences have been updated', 'success');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className={`w-full max-w-lg rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto pr-2 custom-scrollbar ${
          themeMode === 'dark' ? 'bg-[#242625] border border-[#3a3a3a]' : 'bg-white border border-gray-200'
        }`}
      >
        <div className={`flex items-center justify-between p-5 border-b sticky top-0 ${
          themeMode === 'dark' ? 'bg-[#242625] border-[#3a3a3a]' : 'bg-white border-gray-200'
        } ${themeMode === 'dark' ? '' : 'bg-white'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#24619d]/10 flex items-center justify-center">
              <Bell className="w-[20px] h-[20px] text-[#24619d]" />
            </div>
            <h3 className={`font-heading font-bold text-base ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
              Notification Preferences
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
              themeMode === 'dark' ? 'hover:bg-[#383a39] text-[#7a7a7a]' : 'hover:bg-gray-100 text-gray-400'
            }`}
          >
            <X className="w-[20px] h-[20px]" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Email Notifications */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-[20px] h-[20px] text-[#ab3500]" />
              <h4 className={`font-heading font-bold text-sm ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
                Email Notifications
              </h4>
            </div>
            <div className="space-y-3 ml-8">
              {Object.entries(preferences.email).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className={`text-xs font-medium capitalize ${themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-700'}`}>
                    {key}
                  </span>
                  <button
                    onClick={() => handleToggle('email', key)}
                    className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${
                      value ? 'bg-[#006c4f]' : themeMode === 'dark' ? 'bg-[#383a39]' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SMS Notifications */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-[20px] h-[20px] text-[#24619d]" />
              <h4 className={`font-heading font-bold text-sm ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
                SMS Notifications
              </h4>
            </div>
            <div className="space-y-3 ml-8">
              {Object.entries(preferences.sms).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className={`text-xs font-medium capitalize ${themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-700'}`}>
                    {key}
                  </span>
                  <button
                    onClick={() => handleToggle('sms', key)}
                    className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${
                      value ? 'bg-[#006c4f]' : themeMode === 'dark' ? 'bg-[#383a39]' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Push Notifications */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Smartphone className="w-[20px] h-[20px] text-[#8d7168]" />
              <h4 className={`font-heading font-bold text-sm ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
                Push Notifications
              </h4>
            </div>
            <div className="space-y-3 ml-8">
              {Object.entries(preferences.push).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className={`text-xs font-medium capitalize ${themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-700'}`}>
                    {key}
                  </span>
                  <button
                    onClick={() => handleToggle('push', key)}
                    className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${
                      value ? 'bg-[#006c4f]' : themeMode === 'dark' ? 'bg-[#383a39]' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`flex gap-3 p-5 border-t sticky bottom-0 ${
          themeMode === 'dark' ? 'bg-[#242625] border-[#3a3a3a]' : 'bg-white border-gray-200'
        }`}>
          <button
            onClick={onClose}
            className={`flex-1 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              themeMode === 'dark'
                ? 'bg-[#383a39] hover:bg-[#4a4a4a] text-[#c4c4c4]'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-5 py-2.5 rounded-xl bg-[#ab3500] text-white text-xs font-bold hover:bg-[#8a2a00] transition-colors cursor-pointer shadow-md shadow-[#ab3500]/30"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
