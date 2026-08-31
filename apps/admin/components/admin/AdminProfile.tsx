'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Camera, X, Edit, Mail, Phone, Globe, Briefcase, Building, Clock, 
  Shield, Zap, Download, History, Bell, LogOut 
} from 'lucide-react';
import { PasswordChangeModal } from './PasswordChangeModal';
import { NotificationPreferencesModal } from './NotificationPreferencesModal';
import { SessionManagementModal } from './SessionManagementModal';
import { AvatarUploadModal } from './AvatarUploadModal';

export const AdminProfile: React.FC = () => {
  const { showToast, setIsAuthModalOpen, themeMode } = useApp();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('/umunthuai.png');
  const [formData, setFormData] = useState({
    name: 'Grayson Comrade',
    email: 'grayson.comrade@umunthuhub.com',
    phone: '+1 (555) 123-4567',
    role: 'Platform Administrator',
    department: 'Operations',
    bio: 'Managing multi-tenant food hall ecosystem and vendor operations.',
    timezone: 'UTC+2',
    language: 'English'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (formData.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Validation Error', 'Please fix the errors before saving', 'error');
      return;
    }

    setIsEditing(false);
    showToast('Profile Updated', 'Your profile information has been saved successfully', 'success');
  };

  const handleAvatarUpload = () => {
    setIsAvatarModalOpen(true);
  };

  const handleAvatarChange = (newAvatarUrl: string) => {
    setAvatarUrl(newAvatarUrl);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className={`rounded-3xl p-6 sm:p-8 shadow-xl ${
        themeMode === 'dark'
          ? 'bg-linear-to-r from-[#1a1c1c] to-[#2d2d2d]'
          : 'bg-linear-to-r from-[#1a1c1c] to-[#2d2d2d]'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={avatarUrl}
                alt="Grayson Comrade"
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white/20 shadow-xl"
              />
              <button
                onClick={handleAvatarUpload}
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#ab3500] text-white flex items-center justify-center shadow-lg hover:bg-[#8a2a00] transition-colors cursor-pointer"
                title="Change avatar"
              >
                <Camera className="w-[16px] h-[16px]" />
              </button>
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                {formData.name}
              </h1>
              <p className={`text-xs mt-1 ${
                themeMode === 'dark' ? 'text-gray-400' : 'text-gray-400'
              }`}>{formData.role}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#00ae81]/30 text-[#00ae81] border border-[#00ae81]/40">
                  Active
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#ab3500]/30 text-[#ab3500] border border-[#ab3500]/40">
                  Admin
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer backdrop-blur-sm border flex items-center gap-2 ${
              themeMode === 'dark'
                ? 'bg-[#383a39]/50 hover:bg-[#383a39]/70 text-[#f5f5f5] border-[#3a3a3a]'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
            }`}
          >
            {isEditing ? <X className="w-[18px] h-[18px]" /> : <Edit className="w-[18px] h-[18px]" />}
            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>

      {/* Profile Form */}
      {isEditing ? (
        <div className={`rounded-2xl p-6 shadow-lg border ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'bg-white border-gray-200'
        }`}>
          <div className={`flex items-center gap-2 mb-6 pb-4 border-b ${
            themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-gray-200'
          }`}>
            <div className="w-8 h-8 rounded-xl bg-[#ab3500]/10 flex items-center justify-center">
              <Edit className="w-[18px] h-[18px] text-[#ab3500]" />
            </div>
            <h3 className={`font-heading font-bold text-base ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
            }`}>Edit Profile Information</h3>
          </div>
          
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className={`font-heading font-bold text-xs ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
                }`}>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-[#ab3500] focus:ring-2 focus:ring-[#ab3500]/20 transition-all ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  } ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.name && <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>}
              </div>
              
              <div className="space-y-1">
                <label className={`font-heading font-bold text-xs ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
                }`}>Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-[#ab3500] focus:ring-2 focus:ring-[#ab3500]/20 transition-all ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  } ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.email && <p className="text-[10px] text-red-500 font-semibold">{errors.email}</p>}
              </div>
              
              <div className="space-y-1">
                <label className={`font-heading font-bold text-xs ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
                }`}>Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-[#ab3500] focus:ring-2 focus:ring-[#ab3500]/20 transition-all ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  } ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.phone && <p className="text-[10px] text-red-500 font-semibold">{errors.phone}</p>}
              </div>
              
              <div className="space-y-1">
                <label className={`font-heading font-bold text-xs ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
                }`}>Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-[#ab3500] focus:ring-2 focus:ring-[#ab3500]/20 transition-all ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  } ${errors.role ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.role && <p className="text-[10px] text-red-500 font-semibold">{errors.role}</p>}
              </div>
              
              <div className="space-y-1">
                <label className={`font-heading font-bold text-xs ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
                }`}>Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-[#ab3500] focus:ring-2 focus:ring-[#ab3500]/20 transition-all ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  } ${errors.department ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.department && <p className="text-[10px] text-red-500 font-semibold">{errors.department}</p>}
              </div>
              
              <div className="space-y-1">
                <label className={`font-heading font-bold text-xs ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
                }`}>Timezone</label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-[#ab3500] focus:ring-2 focus:ring-[#ab3500]/20 transition-all cursor-pointer ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                >
                  <option value="UTC+2">UTC+2 (Central Africa Time)</option>
                  <option value="UTC+0">UTC+0 (GMT)</option>
                  <option value="UTC-5">UTC-5 (Eastern Time)</option>
                  <option value="UTC-8">UTC-8 (Pacific Time)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className={`font-heading font-bold text-xs ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
                }`}>Language</label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-[#ab3500] focus:ring-2 focus:ring-[#ab3500]/20 transition-all cursor-pointer ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                >
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className={`font-heading font-bold text-xs ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
              }`}>Bio</label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-[#ab3500] focus:ring-2 focus:ring-[#ab3500]/20 transition-all resize-none ${
                  themeMode === 'dark'
                    ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                } ${errors.bio ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              <div className="flex justify-between items-center">
                {errors.bio && <p className="text-[10px] text-red-500 font-semibold">{errors.bio}</p>}
                <p className={`text-[10px] ${errors.bio ? 'text-red-500' : themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>
                  {formData.bio.length}/500 characters
                </p>
              </div>
            </div>
            
            <div className={`flex gap-3 pt-4 border-t ${
              themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-gray-200'
            }`}>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Contact Information */}
          <div className={`rounded-2xl p-5 shadow-lg border hover:shadow-xl transition-shadow ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#ab3500]/10 flex items-center justify-center">
                <Mail className="w-[20px] h-[20px] text-[#ab3500]" />
              </div>
              <h3 className={`font-heading font-bold text-sm ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>Contact Information</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className={`w-[16px] h-[16px] mt-0.5 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-400'}`} />
                <div>
                  <p className={`text-[10px] font-semibold ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>Email</p>
                  <p className={`text-xs font-medium ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>{formData.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className={`w-[16px] h-[16px] mt-0.5 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-400'}`} />
                <div>
                  <p className={`text-[10px] font-semibold ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>Phone</p>
                  <p className={`text-xs font-medium ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>{formData.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Globe className={`w-[16px] h-[16px] mt-0.5 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-400'}`} />
                <div>
                  <p className={`text-[10px] font-semibold ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>Language</p>
                  <p className={`text-xs font-medium ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>{formData.language}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Role & Department */}
          <div className={`rounded-2xl p-5 shadow-lg border hover:shadow-xl transition-shadow ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#24619d]/10 flex items-center justify-center">
                <Briefcase className="w-[20px] h-[20px] text-[#24619d]" />
              </div>
              <h3 className={`font-heading font-bold text-sm ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>Role & Department</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Briefcase className={`w-[16px] h-[16px] mt-0.5 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-400'}`} />
                <div>
                  <p className={`text-[10px] font-semibold ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>Role</p>
                  <p className={`text-xs font-medium ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>{formData.role}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Building className={`w-[16px] h-[16px] mt-0.5 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-400'}`} />
                <div>
                  <p className={`text-[10px] font-semibold ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>Department</p>
                  <p className={`text-xs font-medium ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>{formData.department}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className={`w-[16px] h-[16px] mt-0.5 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-400'}`} />
                <div>
                  <p className={`text-[10px] font-semibold ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>Timezone</p>
                  <p className={`text-xs font-medium ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>{formData.timezone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className={`rounded-2xl p-5 shadow-lg border hover:shadow-xl transition-shadow ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#006c4f]/10 flex items-center justify-center">
                <Shield className="w-[20px] h-[20px] text-[#006c4f]" />
              </div>
              <h3 className={`font-heading font-bold text-sm ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>Account Security</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs font-medium ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>Two-Factor Auth</p>
                  <p className="text-[10px] text-[#006c4f] font-bold">Enabled</p>
                </div>
                <button 
                  onClick={() => showToast('Security', '2FA settings opened', 'info')}
                  className="px-3 py-1.5 rounded-lg bg-[#006c4f]/10 text-[#006c4f] text-[10px] font-bold hover:bg-[#006c4f]/20 transition-colors cursor-pointer"
                >
                  Manage
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs font-medium ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>Password</p>
                  <p className={`text-[10px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>Last changed 30 days ago</p>
                </div>
                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] hover:bg-[#4a4a4a] text-[#c4c4c4]'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Change
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs font-medium ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>Active Sessions</p>
                  <p className={`text-[10px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>2 devices</p>
                </div>
                <button
                  onClick={() => setIsSessionModalOpen(true)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] hover:bg-[#4a4a4a] text-[#c4c4c4]'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {!isEditing && (
        <div className={`rounded-2xl p-5 shadow-lg border ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'bg-white border-gray-200'
        }`}>
          <div className={`flex items-center gap-2 mb-4 pb-4 border-b ${
            themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-gray-200'
          }`}>
            <div className="w-8 h-8 rounded-xl bg-[#8d7168]/10 flex items-center justify-center">
              <Zap className="w-[18px] h-[18px] text-[#8d7168]" />
            </div>
            <h3 className={`font-heading font-bold text-sm ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>Quick Actions</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => showToast('Export', 'Profile data exported successfully', 'success')}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] hover:bg-[#4a4a4a] border-[#3a3a3a]'
                  : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
              }`}
            >
              <Download className="w-[24px] h-[24px] text-[#ab3500]" />
              <span className={`text-[10px] font-bold ${themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-700'}`}>Export Data</span>
            </button>
            
            <button
              onClick={() => showToast('Activity', 'Activity log opened', 'info')}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] hover:bg-[#4a4a4a] border-[#3a3a3a]'
                  : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
              }`}
            >
              <History className="w-[24px] h-[24px] text-[#24619d]" />
              <span className={`text-[10px] font-bold ${themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-700'}`}>Activity Log</span>
            </button>
            
            <button
              onClick={() => setIsNotificationModalOpen(true)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] hover:bg-[#4a4a4a] border-[#3a3a3a]'
                  : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
              }`}
            >
              <Bell className="w-[24px] h-[24px] text-[#006c4f]" />
              <span className={`text-[10px] font-bold ${themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-700'}`}>Notifications</span>
            </button>
            
            <button
              onClick={() => {
                setIsAuthModalOpen(true);
                showToast('Sign Out', 'You have been signed out', 'info');
              }}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-red-900/20 hover:bg-red-900/30 border-red-900/40'
                  : 'bg-red-50 hover:bg-red-100 border-red-200'
              }`}
            >
              <LogOut className={`w-[24px] h-[24px] ${themeMode === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
              <span className={`text-[10px] font-bold ${themeMode === 'dark' ? 'text-red-400' : 'text-red-700'}`}>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
      <NotificationPreferencesModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
      <SessionManagementModal
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
      />
      <AvatarUploadModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onAvatarChange={handleAvatarChange}
      />
    </div>
  );
};
