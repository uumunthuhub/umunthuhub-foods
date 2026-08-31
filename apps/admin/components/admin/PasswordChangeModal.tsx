'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, X, Eye, EyeOff } from 'lucide-react';

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({ isOpen, onClose }) => {
  const { showToast, themeMode } = useApp();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Validation Error', 'Please fix the errors before submitting', 'error');
      return;
    }

    // Simulate password change
    showToast('Password Changed', 'Your password has been updated successfully', 'success');
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-md rounded-2xl shadow-2xl ${
        themeMode === 'dark' ? 'bg-[#242625] border border-[#3a3a3a]' : 'bg-white border border-gray-200'
      }`}>
        <div className={`flex items-center justify-between p-5 border-b ${
          themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#006c4f]/10 flex items-center justify-center">
              <Lock className="w-[20px] h-[20px] text-[#006c4f]" />
            </div>
            <h3 className={`font-heading font-bold text-base ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
              Change Password
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

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1">
            <label className={`font-heading font-bold text-xs ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword.current ? 'text' : 'password'}
                value={formData.currentPassword}
                onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-[#ab3500] focus:ring-2 focus:ring-[#ab3500]/20 transition-all pr-10 ${
                  themeMode === 'dark'
                    ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                } ${errors.currentPassword ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword({...showPassword, current: !showPassword.current})}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword.current ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
              </button>
            </div>
            {errors.currentPassword && <p className="text-[10px] text-red-500 font-semibold">{errors.currentPassword}</p>}
          </div>

          <div className="space-y-1">
            <label className={`font-heading font-bold text-xs ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword.new ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-[#ab3500] focus:ring-2 focus:ring-[#ab3500]/20 transition-all pr-10 ${
                  themeMode === 'dark'
                    ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                } ${errors.newPassword ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword({...showPassword, new: !showPassword.new})}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword.new ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
              </button>
            </div>
            {errors.newPassword && <p className="text-[10px] text-red-500 font-semibold">{errors.newPassword}</p>}
            <p className={`text-[10px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>
              Must be at least 8 characters with uppercase, lowercase, and number
            </p>
          </div>

          <div className="space-y-1">
            <label className={`font-heading font-bold text-xs ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPassword.confirm ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-[#ab3500] focus:ring-2 focus:ring-[#ab3500]/20 transition-all pr-10 ${
                  themeMode === 'dark'
                    ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                } ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword.confirm ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-[10px] text-red-500 font-semibold">{errors.confirmPassword}</p>}
          </div>

          <div className={`flex gap-3 pt-4 border-t ${themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-gray-200'}`}>
            <button
              type="button"
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
              type="submit"
              className="flex-1 px-5 py-2.5 rounded-xl bg-[#ab3500] text-white text-xs font-bold hover:bg-[#8a2a00] transition-colors cursor-pointer shadow-md shadow-[#ab3500]/30"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
