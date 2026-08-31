'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Badge, CalendarPlus, UserPlus, MapPin, Coffee, CreditCard, Star, Users, 
  CalendarDays, Receipt, Search, Store, ChefHat, Check, Clock, Edit, Trash2, 
  UserSearch, Calendar, MoreVertical, Filter, SortAsc, Download, Upload,
  X, Download as DownloadIcon, AlertTriangle, CalendarX
} from 'lucide-react';
import { StaffMember, StaffShift, StaffStation } from '@umunthuhub/shared-types';

export const StaffManagement: React.FC = () => {
  const { 
    staffMembers, 
    staffShifts, 
    tenants, 
    addStaffMember, 
    updateStaffMember, 
    deleteStaffMember, 
    updateStaffStatus, 
    addStaffShift, 
    deleteStaffShift, 
    showToast,
    themeMode
  } = useApp();

  // Active sub-tab in Staff view
  const [activeTab, setActiveTab] = useState<'roster' | 'shifts' | 'payroll'>('roster');

  // Search & Filters
  const [search, setSearch] = useState('');
  const [storeFilter, setStoreFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stationFilter, setStationFilter] = useState<string>('all');

  // Modals
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [isDeleteStaffModalOpen, setIsDeleteStaffModalOpen] = useState(false);
  const [isDeleteShiftModalOpen, setIsDeleteShiftModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [staffToDelete, setStaffToDelete] = useState<StaffMember | null>(null);
  const [shiftToDelete, setShiftToDelete] = useState<StaffShift | null>(null);

  // Form State for Add / Edit Staff
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    role: StaffMember['role'];
    storeId: string;
    station: StaffStation;
    hourlyRate: number;
    weeklyHours: number;
    certifications: string;
    canAccessKDS: boolean;
    canApproveRefunds: boolean;
    canEditMenu: boolean;
    canManageInventory: boolean;
    canViewFinancials: boolean;
    canManageRoster: boolean;
  }>({
    name: '',
    email: '',
    phone: '+1 (555) 000-0000',
    role: 'Line Cook',
    storeId: tenants[0]?.id || '',
    station: 'Line Cook & Grill',
    hourlyRate: 22.0,
    weeklyHours: 35.0,
    certifications: 'ServSafe Food Handler',
    canAccessKDS: true,
    canApproveRefunds: false,
    canEditMenu: false,
    canManageInventory: false,
    canViewFinancials: false,
    canManageRoster: false
  });

  // Shift Form State
  const [shiftData, setShiftData] = useState<{
    staffId: string;
    day: StaffShift['day'];
    startTime: string;
    endTime: string;
    station: StaffStation;
    storeId: string;
  }>({
    staffId: staffMembers[0]?.id || '',
    day: 'Monday',
    startTime: '09:00 AM',
    endTime: '05:00 PM',
    station: 'Line Cook & Grill',
    storeId: tenants[0]?.id || ''
  });

  // Filtered staff members
  const filteredStaff = staffMembers.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase()) ||
      member.station.toLowerCase().includes(search.toLowerCase());

    const matchesStore = storeFilter === 'all' || member.storeId === storeFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesStation = stationFilter === 'all' || member.station === stationFilter;

    return matchesSearch && matchesStore && matchesStatus && matchesStation;
  });

  // Summary Metrics
  const onShiftCount = staffMembers.filter(s => s.status === 'on_shift').length;
  const onBreakCount = staffMembers.filter(s => s.status === 'on_break').length;
  const totalWeeklyPayroll = staffMembers.reduce((sum, s) => sum + (s.hourlyRate * s.weeklyHours), 0);
  const avgHourlyRate = staffMembers.length > 0 ? (staffMembers.reduce((sum, s) => sum + s.hourlyRate, 0) / staffMembers.length) : 0;

  const handleOpenAddModal = () => {
    setEditingStaff(null);
    setFormData({
      name: '',
      email: '',
      phone: '+1 (555) 234-5678',
      role: 'Line Cook',
      storeId: tenants[0]?.id || '',
      station: 'Line Cook & Grill',
      hourlyRate: 22.50,
      weeklyHours: 35.0,
      certifications: 'ServSafe Food Handler, Allergen Safety',
      canAccessKDS: true,
      canApproveRefunds: false,
      canEditMenu: false,
      canManageInventory: false,
      canViewFinancials: false,
      canManageRoster: false
    });
    setIsAddStaffModalOpen(true);
  };

  const handleOpenEditModal = (member: StaffMember) => {
    setEditingStaff(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role,
      storeId: member.storeId,
      station: member.station,
      hourlyRate: member.hourlyRate,
      weeklyHours: member.weeklyHours,
      certifications: member.certifications.join(', '),
      canAccessKDS: member.permissions.canAccessKDS,
      canApproveRefunds: member.permissions.canApproveRefunds,
      canEditMenu: member.permissions.canEditMenu,
      canManageInventory: member.permissions.canManageInventory,
      canViewFinancials: member.permissions.canViewFinancials,
      canManageRoster: member.permissions.canManageRoster
    });
    setIsAddStaffModalOpen(true);
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showToast('Validation Error', 'Please enter both full name and work email', 'warning');
      return;
    }

    const assignedStore = tenants.find(t => t.id === formData.storeId) || tenants[0];
    const certArray = formData.certifications.split(',').map(c => c.trim()).filter(Boolean);

    if (editingStaff) {
      const updated: StaffMember = {
        ...editingStaff,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        storeId: assignedStore.id,
        storeName: assignedStore.name,
        station: formData.station,
        hourlyRate: Number(formData.hourlyRate),
        weeklyHours: Number(formData.weeklyHours),
        certifications: certArray,
        permissions: {
          canAccessKDS: formData.canAccessKDS,
          canApproveRefunds: formData.canApproveRefunds,
          canEditMenu: formData.canEditMenu,
          canManageInventory: formData.canManageInventory,
          canViewFinancials: formData.canViewFinancials,
          canManageRoster: formData.canManageRoster
        }
      };
      updateStaffMember(updated);
    } else {
      addStaffMember({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        storeId: assignedStore.id,
        storeName: assignedStore.name,
        station: formData.station,
        avatar: '/umunthuai.png',
        status: 'off_duty',
        hourlyRate: Number(formData.hourlyRate),
        weeklyHours: Number(formData.weeklyHours),
        rating: 5.0,
        certifications: certArray,
        permissions: {
          canAccessKDS: formData.canAccessKDS,
          canApproveRefunds: formData.canApproveRefunds,
          canEditMenu: formData.canEditMenu,
          canManageInventory: formData.canManageInventory,
          canViewFinancials: formData.canViewFinancials,
          canManageRoster: formData.canManageRoster
        },
        hireDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    }

    setIsAddStaffModalOpen(false);
  };

  const handleSaveShift = (e: React.FormEvent) => {
    e.preventDefault();
    const targetStaff = staffMembers.find(s => s.id === shiftData.staffId);
    const targetStore = tenants.find(t => t.id === shiftData.storeId) || tenants[0];

    if (!targetStaff) {
      showToast('Error', 'Please select a staff member for this shift', 'warning');
      return;
    }

    addStaffShift({
      staffId: targetStaff.id,
      staffName: targetStaff.name,
      day: shiftData.day,
      startTime: shiftData.startTime,
      endTime: shiftData.endTime,
      station: shiftData.station,
      storeId: targetStore.id,
      storeName: targetStore.name
    });

    setIsShiftModalOpen(false);
  };

  const daysOfWeek: StaffShift['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const stations: StaffStation[] = [
    'Head Chef',
    'Sous Chef',
    'Line Cook & Grill',
    'Expeditor & QC',
    'Barista & Beverages',
    'Pastry & Prep',
    'Cashier & Front Desk',
    'Dispatch & Logistics'
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner & Quick Metrics */}
      <div className={`rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 ${
        themeMode === 'dark'
          ? 'bg-linear-to-r from-[#1a1c1c] to-[#2d2d2d]'
          : 'bg-linear-to-r from-[#1a1c1c] to-[#2d2d2d]'
      }`}>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-[#006c4f]/20 flex items-center justify-center">
              <Badge className="w-[28px] h-[28px] text-[#006c4f]" />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                Staff & Shifts Management
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#006c4f]/30 text-[#006c4f] border border-[#006c4f]/40">
                {staffMembers.length} Team Members
              </span>
            </div>
          </div>
          <p className={`text-xs sm:text-sm max-w-2xl ${
            themeMode === 'dark' ? 'text-gray-400' : 'text-gray-400'
          }`}>
            Coordinate restaurant kitchen crews, shift schedules, station roles, certifications, clock-in status, and weekly payroll calculations across all food hall venues.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsShiftModalOpen(true)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer backdrop-blur-sm border ${
              themeMode === 'dark'
                ? 'bg-[#383a39]/50 hover:bg-[#383a39]/70 text-[#f5f5f5] border-[#3a3a3a]'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
            }`}
          >
            <CalendarPlus className="w-[18px] h-[18px]" />
            <span>+ Schedule Shift</span>
          </button>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#006c4f] hover:bg-[#00523b] text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-[#006c4f]/30"
          >
            <UserPlus className="w-[18px] h-[18px]" />
            <span>Add Staff Member</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className={`rounded-2xl p-5 shadow-lg border hover:shadow-xl transition-shadow ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              themeMode === 'dark' ? 'bg-emerald-900/30' : 'bg-emerald-100'
            }`}>
              <MapPin className="w-[24px] h-[24px] text-emerald-600" />
            </div>
            <div>
              <p className={`text-[11px] font-bold uppercase tracking-wider ${
                themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'
              }`}>Active On Shift</p>
              <h3 className={`font-heading font-extrabold text-2xl ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
              }`}>
                {onShiftCount} <span className={`text-sm font-normal ${
                  themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'
                }`}>/ {staffMembers.length}</span>
              </h3>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl p-5 shadow-lg border hover:shadow-xl transition-shadow ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              themeMode === 'dark' ? 'bg-amber-900/30' : 'bg-amber-100'
            }`}>
              <Coffee className="w-[24px] h-[24px] text-amber-600" />
            </div>
            <div>
              <p className={`text-[11px] font-bold uppercase tracking-wider ${
                themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'
              }`}>On Break</p>
              <h3 className={`font-heading font-extrabold text-2xl ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
              }`}>
                {onBreakCount} <span className={`text-sm font-normal ${
                  themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'
                }`}>staff</span>
              </h3>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl p-5 shadow-lg border hover:shadow-xl transition-shadow ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              themeMode === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
            }`}>
              <CreditCard className="w-[24px] h-[24px] text-blue-600" />
            </div>
            <div>
              <p className={`text-[11px] font-bold uppercase tracking-wider ${
                themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'
              }`}>Est. Weekly Payroll</p>
              <h3 className={`font-heading font-extrabold text-2xl ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
              }`}>
                ${totalWeeklyPayroll.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </h3>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl p-5 shadow-lg border hover:shadow-xl transition-shadow ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              themeMode === 'dark' ? 'bg-orange-900/30' : 'bg-orange-100'
            }`}>
              <Star className="w-[24px] h-[24px] text-orange-600" />
            </div>
            <div>
              <p className={`text-[11px] font-bold uppercase tracking-wider ${
                themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'
              }`}>Avg Hourly Rate</p>
              <h3 className={`font-heading font-extrabold text-2xl ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'
              }`}>
                ${avgHourlyRate.toFixed(2)} <span className={`text-sm font-normal ${
                  themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'
                }`}>/ hr</span>
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className={`flex items-center gap-2 rounded-2xl p-2 shadow-lg border ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'bg-white border-gray-100'
      }`}>
        <button
          onClick={() => setActiveTab('roster')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'roster'
              ? 'bg-[#006c4f] text-white shadow-md'
              : themeMode === 'dark'
                ? 'text-[#c4c4c4] hover:bg-[#383a39]'
                : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Users className="w-[18px] h-[18px]" />
          <span>Staff Directory ({staffMembers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('shifts')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'shifts'
              ? 'bg-[#006c4f] text-white shadow-md'
              : themeMode === 'dark'
                ? 'text-[#c4c4c4] hover:bg-[#383a39]'
                : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <CalendarDays className="w-[18px] h-[18px]" />
          <span>Weekly Shift Schedule ({staffShifts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('payroll')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'payroll'
              ? 'bg-[#006c4f] text-white shadow-md'
              : themeMode === 'dark'
                ? 'text-[#c4c4c4] hover:bg-[#383a39]'
                : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Receipt className="w-[18px] h-[18px]" />
          <span>Payroll & Compliance</span>
        </button>
      </div>

      {/* TAB 1: STAFF DIRECTORY ROSTER */}
      {activeTab === 'roster' && (
        <div className="space-y-4 pl-4">
          {/* Search & Filter Controls */}
          <div className={`rounded-2xl p-4 shadow-lg border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]'
              : 'bg-white border-gray-100'
          }`}>
            {/* Search */}
            <div className="relative flex-1 min-w-55">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] ${
                themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search staff by name, email, station or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#006c4f] focus:ring-2 focus:ring-[#006c4f]/20 transition-all ${
                  themeMode === 'dark'
                    ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              />
            </div>

            {/* Filter Selects */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={storeFilter}
                onChange={(e) => setStoreFilter(e.target.value)}
                className={`text-xs px-4 py-2.5 rounded-xl border font-semibold focus:outline-none focus:border-[#006c4f] transition-all cursor-pointer ${
                  themeMode === 'dark'
                    ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              >
                <option value="all">All Kitchen Locations</option>
                {tenants.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`text-xs px-4 py-2.5 rounded-xl border font-semibold focus:outline-none focus:border-[#006c4f] transition-all cursor-pointer ${
                  themeMode === 'dark'
                    ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              >
                <option value="all">All Statuses</option>
                <option value="on_shift">🟢 On Shift</option>
                <option value="on_break">🟡 On Break</option>
                <option value="off_duty">⚪ Off Duty</option>
                <option value="leave">🔴 On Leave</option>
              </select>

              <select
                value={stationFilter}
                onChange={(e) => setStationFilter(e.target.value)}
                className={`text-xs px-4 py-2.5 rounded-xl border font-semibold focus:outline-none focus:border-[#006c4f] transition-all cursor-pointer ${
                  themeMode === 'dark'
                    ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              >
                <option value="all">All Stations</option>
                {stations.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Staff Column List View */}
          <div className="flex flex-col gap-3 pr-4">
            {filteredStaff.map((member) => {
              return (
                <div 
                  key={member.id}
                  className={`rounded-2xl p-5 shadow-lg border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-xl ${
                    themeMode === 'dark'
                      ? 'bg-[#242625] border-[#3a3a3a] hover:border-[#4a4a4a]'
                      : 'bg-white border-gray-100 hover:border-gray-200'
                  }`}
                >
                  {/* Left: Avatar, Name, Email, Role */}
                  <div className="flex items-center gap-4 min-w-60">
                    <div className="relative shrink-0">
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className={`w-14 h-14 rounded-2xl object-cover border-2 shadow-md ${
                          themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-white'
                        }`}
                      />
                      <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 ${
                        themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-white'
                      } ${
                        member.status === 'on_shift' ? 'bg-emerald-500' :
                        member.status === 'on_break' ? 'bg-amber-500' :
                        member.status === 'off_duty' ? 'bg-gray-400' : 'bg-red-500'
                      }`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className={`font-heading font-bold text-sm truncate ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>{member.name}</h4>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          member.status === 'on_shift' ? (themeMode === 'dark' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-700') :
                          member.status === 'on_break' ? (themeMode === 'dark' ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700') :
                          member.status === 'off_duty' ? (themeMode === 'dark' ? 'bg-[#383a39] text-[#c4c4c4]' : 'bg-gray-100 text-gray-600') : (themeMode === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700')
                        }`}>
                          {member.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className={`text-xs truncate ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>{member.email}</p>
                      <p className="text-[11px] font-semibold text-[#006c4f] mt-0.5">{member.role}</p>
                    </div>
                  </div>

                  {/* Center: Metadata (Store, Station, Wage & Hours, Certs) */}
                  <div className={`flex flex-wrap items-center gap-4 text-xs py-2 md:py-0 border-y md:border-y-0 md:border-x md:px-6 flex-1 ${
                    themeMode === 'dark'
                      ? 'text-[#c4c4c4] border-[#3a3a3a]'
                      : 'text-gray-600 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <Store className={`w-[16px] h-[16px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-400'}`} />
                      <span className={`font-semibold ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>{member.storeName}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <ChefHat className={`w-[16px] h-[16px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-400'}`} />
                      <span className={`px-2 py-0.5 rounded-lg font-semibold text-[11px] ${
                        themeMode === 'dark'
                          ? 'bg-[#383a39] text-[#c4c4c4]'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {member.station}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono">
                      <CreditCard className={`w-[16px] h-[16px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-400'}`} />
                      <span className={`font-semibold ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
                        ${member.hourlyRate.toFixed(2)}/hr · {member.weeklyHours}h/wk
                      </span>
                    </div>

                    {member.certifications && member.certifications.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {member.certifications.map((c, i) => (
                          <span key={i} className={`px-2 py-0.5 rounded-md text-[10px] font-semibold flex items-center gap-1 ${
                            themeMode === 'dark'
                              ? 'bg-emerald-900/30 text-emerald-400'
                              : 'bg-emerald-50 text-emerald-700'
                          }`}>
                            <Check className="w-[11px] h-[11px]" />
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: Actions & Clock in/out */}
                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                    {member.clockInTime && member.status === 'on_shift' && (
                      <span className={`text-[10px] flex items-center gap-1 font-mono ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>
                        <Clock className="w-[12px] h-[12px] text-emerald-500" />
                        In @ {member.clockInTime}
                      </span>
                    )}

                    <select
                      value={member.status}
                      onChange={(e) => updateStaffStatus(member.id, e.target.value as StaffMember['status'])}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-xl focus:outline-none focus:border-[#006c4f] cursor-pointer ${
                        themeMode === 'dark'
                          ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                          : 'bg-gray-50 border border-gray-200 text-gray-900'
                      }`}
                    >
                      <option value="on_shift">🟢 Clock In</option>
                      <option value="on_break">🟡 Take Break</option>
                      <option value="off_duty">⚪ Clock Out</option>
                      <option value="leave">🔴 On Leave</option>
                    </select>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditModal(member)}
                        className={`p-2 rounded-xl transition-colors cursor-pointer ${
                          themeMode === 'dark'
                            ? 'bg-[#383a39] hover:bg-[#4a4a4a] text-[#c4c4c4] hover:text-[#f5f5f5]'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                        }`}
                        title="Edit Staff & Permissions"
                      >
                        <Edit className="w-[17px] h-[17px]" />
                      </button>
                      <button
                        onClick={() => {
                          setStaffToDelete(member);
                          setIsDeleteStaffModalOpen(true);
                        }}
                        className={`p-2 rounded-xl transition-colors cursor-pointer ${
                          themeMode === 'dark'
                            ? 'bg-red-900/20 hover:bg-red-900/30 text-red-400'
                            : 'bg-red-50 hover:bg-red-100 text-red-600'
                        }`}
                        title="Remove Staff"
                      >
                        <Trash2 className="w-[17px] h-[17px]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredStaff.length === 0 && (
            <div className={`rounded-2xl p-12 text-center shadow-lg border ${
              themeMode === 'dark'
                ? 'bg-[#242625] border-[#3a3a3a]'
                : 'bg-white border-gray-100'
            }`}>
              <UserSearch className={`w-20 h-20 mb-3 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-300'}`} />
              <h3 className={`font-heading font-bold text-base ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>No Staff Members Found</h3>
              <p className={`text-xs mt-1 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>Try adjusting your search criteria or add a new team member.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: WEEKLY SHIFT SCHEDULE */}
      {activeTab === 'shifts' && (
        <div className="space-y-4">
          <div className={`rounded-2xl p-4 border flex items-center justify-between ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]'
              : 'glass-panel border-[#e1bfb5]/40'
          }`}>
            <div className="flex items-center gap-2">
              <Calendar className="text-[#006c4f]" />
              <span className={`text-xs font-bold ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>Weekly Shift Roster & Station Coverage</span>
            </div>
            <button
              onClick={() => setIsShiftModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#006c4f] text-white text-xs font-bold hover:bg-[#00523b] cursor-pointer"
            >
              <UserPlus className="w-[16px] h-[16px]" />
              <span>Add Shift</span>
            </button>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {daysOfWeek.map((day) => {
              const dayShifts = staffShifts.filter(s => s.day === day);
              return (
                <div 
                  key={day}
                  className={`rounded-2xl p-3 border flex flex-col min-h-80 ${
                    themeMode === 'dark'
                      ? 'bg-[#242625] border-[#3a3a3a]'
                      : 'glass-panel bg-white/70 border-[#e1bfb5]/50'
                  }`}
                >
                  <div className={`flex items-center justify-between pb-2 border-b mb-2.5 ${
                    themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-[#e1bfb5]/40'
                  }`}>
                    <span className={`font-heading font-extrabold text-xs ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>{day}</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#006c4f]/10 text-[#006c4f] text-[10px] font-extrabold">
                      {dayShifts.length}
                    </span>
                  </div>

                  {/* Shift Cards in this day */}
                  <div className="space-y-2 flex-1 overflow-y-auto max-h-90 pr-1">
                    {dayShifts.map((shift) => (
                      <div 
                        key={shift.id}
                        className={`p-2.5 rounded-xl border shadow-2xs hover:border-[#006c4f] transition-all relative group ${
                          themeMode === 'dark'
                            ? 'bg-[#383a39] border-[#3a3a3a]'
                            : 'bg-white border-[#e1bfb5]/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <p className={`font-bold text-xs truncate ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>{shift.staffName}</p>
                          <button
                            onClick={() => {
                              setShiftToDelete(shift);
                              setIsDeleteShiftModalOpen(true);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                            title="Cancel shift"
                          >
                            <X className="w-[14px] h-[14px]" />
                          </button>
                        </div>
                        <p className={`text-[10px] mt-0.5 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'}`}>{shift.storeName}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold ${
                            themeMode === 'dark'
                              ? 'bg-[#383a39] text-[#c4c4c4]'
                              : 'bg-[#f3f3f3] text-[#594139]'
                          }`}>
                            {shift.station}
                          </span>
                          <span className="text-[10px] font-mono text-[#006c4f] font-bold">
                            {shift.startTime} - {shift.endTime}
                          </span>
                        </div>
                      </div>
                    ))}

                    {dayShifts.length === 0 && (
                      <div className={`h-32 flex flex-col items-center justify-center text-center p-3 border-2 border-dashed rounded-xl ${
                        themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-[#e1bfb5]/40'
                      }`}>
                        <span className={`text-[11px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'}`}>No scheduled shifts</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: PAYROLL & COMPLIANCE */}
      {activeTab === 'payroll' && (
        <div className="space-y-4">
          <div className={`rounded-3xl p-5 sm:p-6 border ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]'
              : 'glass-panel border-[#e1bfb5]/50'
          }`}>
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
              themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-[#e1bfb5]/40'
            }`}>
              <div>
                <h3 className={`font-heading font-extrabold text-lg ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>Weekly Payroll & Wages Breakdown</h3>
                <p className={`text-xs mt-0.5 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'}`}>Calculated based on standard roster hours and hourly wages.</p>
              </div>
              <button
                onClick={() => showToast('Payroll Exported', 'Weekly payroll spreadsheet exported as CSV successfully', 'success')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#24619d] hover:bg-[#1a4b7c] text-white text-xs font-bold cursor-pointer transition-all shadow-sm"
              >
                <DownloadIcon className="w-[17px] h-[17px]" />
                <span>Export Payroll CSV</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`border-b font-bold uppercase tracking-wider text-[10px] ${
                    themeMode === 'dark' ? 'border-[#3a3a3a] text-[#7a7a7a]' : 'border-[#e1bfb5]/50 text-[#8d7168]'
                  }`}>
                    <th className="pb-3 px-2">Staff Member</th>
                    <th className="pb-3 px-2">Kitchen Location</th>
                    <th className="pb-3 px-2">Station Role</th>
                    <th className="pb-3 px-2">Hourly Wage</th>
                    <th className="pb-3 px-2">Weekly Hours</th>
                    <th className="pb-3 px-2 text-right">Est. Weekly Pay</th>
                    <th className="pb-3 px-2">Compliance Status</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${themeMode === 'dark' ? 'divide-[#3a3a3a]/30' : 'divide-[#e1bfb5]/30'}`}>
                  {staffMembers.map((member) => {
                    const weeklyPay = member.hourlyRate * member.weeklyHours;
                    return (
                      <tr key={member.id} className={`${
                        themeMode === 'dark' ? 'hover:bg-[#383a39]/50' : 'hover:bg-gray-50'
                      }`}>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2.5">
                            <img src={member.avatar} alt={member.name} className="w-7 h-7 rounded-lg object-cover" />
                            <div>
                              <p className={`font-bold ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>{member.name}</p>
                              <p className={`text-[10px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'}`}>{member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className={`py-3 px-2 font-medium ${themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'}`}>{member.storeName}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                            themeMode === 'dark' ? 'bg-[#383a39] text-[#c4c4c4]' : 'bg-[#f3f3f3]'
                          }`}>
                            {member.station}
                          </span>
                        </td>
                        <td className={`py-3 px-2 font-mono font-bold ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>${member.hourlyRate.toFixed(2)}</td>
                        <td className="py-3 px-2 font-mono">{member.weeklyHours} hrs</td>
                        <td className="py-3 px-2 font-mono font-bold text-[#006c4f] text-right text-sm">
                          ${weeklyPay.toFixed(2)}
                        </td>
                        <td className="py-3 px-2">
                          <span className="px-2 py-0.5 rounded-full bg-[#00ae81]/15 text-[#006c4f] font-extrabold text-[10px] flex items-center gap-1 w-fit">
                            <Check className="w-[12px] h-[12px]" />
                            Verified
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className={`border-t-2 font-bold ${
                    themeMode === 'dark' ? 'border-[#3a3a3a] text-[#f5f5f5]' : 'border-[#e1bfb5] text-[#1a1c1c]'
                  }`}>
                    <td colSpan={4} className="pt-3 px-2 text-sm">Total Weekly Payroll</td>
                    <td className="pt-3 px-2 font-mono">{staffMembers.reduce((sum, s) => sum + s.weeklyHours, 0)} hrs</td>
                    <td className="pt-3 px-2 font-mono font-extrabold text-[#006c4f] text-right text-base">
                      ${totalWeeklyPayroll.toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT STAFF MEMBER */}
      {isAddStaffModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className={`rounded-3xl p-6 border shadow-2xl max-w-xl w-full my-8 animate-in fade-in zoom-in-95 duration-200 ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]'
              : 'bg-white border-[#e1bfb5]'
          }`}>
            <div className={`flex items-center justify-between pb-3 border-b mb-4 ${
              themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-[#e1bfb5]/40'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-xl text-[#006c4f] ${
                  themeMode === 'dark' ? 'bg-[#006c4f]/15' : 'bg-[#006c4f]/15'
                }`}>
                  <UserPlus className="w-[18px] h-[18px]" />
                </span>
                <h3 className={`font-heading font-extrabold text-lg ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>
                  {editingStaff ? 'Edit Staff Profile & Access' : 'Add New Staff Member'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddStaffModalOpen(false)}
                className={`p-1 rounded-lg transition-colors cursor-pointer ${
                  themeMode === 'dark'
                    ? 'text-[#7a7a7a] hover:text-[#f5f5f5] hover:bg-[#383a39]'
                    : 'text-[#8d7168] hover:text-[#1a1c1c] hover:bg-[#f3f3f3]'
                }`}
              >
                <X className="w-[20px] h-[20px]" />
              </button>
            </div>

            <form onSubmit={handleSaveStaff} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                    themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                  }`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Grayson Comrade"
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:border-[#006c4f] ${
                      themeMode === 'dark'
                        ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                        : 'bg-white border-[#e1bfb5] text-[#1a1c1c]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                    themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                  }`}>
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="grayson@umunthuhub.com"
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:border-[#006c4f] ${
                      themeMode === 'dark'
                        ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                        : 'bg-white border-[#e1bfb5] text-[#1a1c1c]'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                    themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                  }`}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:border-[#006c4f] ${
                      themeMode === 'dark'
                        ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                        : 'bg-white border-[#e1bfb5] text-[#1a1c1c]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                    themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                  }`}>
                    Assigned Kitchen Store
                  </label>
                  <select
                    value={formData.storeId}
                    onChange={(e) => setFormData({ ...formData, storeId: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-xl border font-semibold focus:outline-none ${
                      themeMode === 'dark'
                        ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                        : 'bg-white border-[#e1bfb5] text-[#1a1c1c]'
                    }`}
                  >
                    {tenants.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                    themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                  }`}>
                    Primary Station Role
                  </label>
                  <select
                    value={formData.station}
                    onChange={(e) => setFormData({ ...formData, station: e.target.value as StaffStation })}
                    className={`w-full px-3 py-2 text-xs rounded-xl border font-semibold focus:outline-none ${
                      themeMode === 'dark'
                        ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                        : 'bg-white border-[#e1bfb5] text-[#1a1c1c]'
                    }`}
                  >
                    {stations.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                    themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                  }`}>
                    Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    step="0.50"
                    min="0"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                    placeholder="22.50"
                    className={`w-full px-3 py-2 text-xs rounded-xl border font-mono focus:outline-none ${
                      themeMode === 'dark'
                        ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                        : 'bg-white border-[#e1bfb5] text-[#1a1c1c]'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                    themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                  }`}>
                    Title / Position
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as StaffMember['role'] })}
                    className={`w-full px-3 py-2 text-xs rounded-xl border font-semibold focus:outline-none ${
                      themeMode === 'dark'
                        ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                        : 'bg-white border-[#e1bfb5] text-[#1a1c1c]'
                    }`}
                  >
                    <option value="Head Chef">Head Chef</option>
                    <option value="Sous Chef">Sous Chef</option>
                    <option value="Shift Supervisor">Shift Supervisor</option>
                    <option value="Line Cook">Line Cook</option>
                    <option value="Pastry Chef">Pastry Chef</option>
                    <option value="Barista">Barista</option>
                    <option value="Front Desk">Front Desk</option>
                    <option value="Expo QC">Expo QC</option>
                    <option value="Kitchen Assistant">Kitchen Assistant</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                    themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                  }`}>
                    Hourly Wage ($ USD)
                  </label>
                  <input
                    type="number"
                    step="0.50"
                    min="10"
                    max="150"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                    className={`w-full px-3 py-2 text-xs rounded-xl border font-mono focus:outline-none ${
                      themeMode === 'dark'
                        ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                        : 'bg-white border-[#e1bfb5] text-[#1a1c1c]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                    themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                  }`}>
                    Contracted Weekly Hours
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="5"
                    max="60"
                    value={formData.weeklyHours}
                    onChange={(e) => setFormData({ ...formData, weeklyHours: Number(e.target.value) })}
                    className={`w-full px-3 py-2 text-xs rounded-xl border font-mono focus:outline-none ${
                      themeMode === 'dark'
                        ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                        : 'bg-white border-[#e1bfb5] text-[#1a1c1c]'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                  themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                }`}>
                  Certifications (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                  placeholder="ServSafe Food Handler, Allergen Safety"
                  className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                      : 'bg-white border-[#e1bfb5] text-[#1a1c1c]'
                  }`}
                />
              </div>

              {/* Granular Permission Toggles */}
              <div className={`pt-2 border-t ${
                themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-[#e1bfb5]/40'
              }`}>
                <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 ${
                  themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                }`}>
                  System Permissions & Access Controls
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <label className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-semibold cursor-pointer ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#c4c4c4]'
                      : 'bg-[#fcf9f8] border-[#e1bfb5]/40 text-[#594139]'
                  }`}>
                    <input
                      type="checkbox"
                      checked={formData.canAccessKDS}
                      onChange={(e) => setFormData({ ...formData, canAccessKDS: e.target.checked })}
                      className="rounded text-[#006c4f]"
                    />
                    <span>KDS Station</span>
                  </label>

                  <label className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-semibold cursor-pointer ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#c4c4c4]'
                      : 'bg-[#fcf9f8] border-[#e1bfb5]/40 text-[#594139]'
                  }`}>
                    <input
                      type="checkbox"
                      checked={formData.canApproveRefunds}
                      onChange={(e) => setFormData({ ...formData, canApproveRefunds: e.target.checked })}
                      className="rounded text-[#006c4f]"
                    />
                    <span>Refunds Auth</span>
                  </label>

                  <label className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-semibold cursor-pointer ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#c4c4c4]'
                      : 'bg-[#fcf9f8] border-[#e1bfb5]/40 text-[#594139]'
                  }`}>
                    <input
                      type="checkbox"
                      checked={formData.canEditMenu}
                      onChange={(e) => setFormData({ ...formData, canEditMenu: e.target.checked })}
                      className="rounded text-[#006c4f]"
                    />
                    <span>Edit Menu Items</span>
                  </label>

                  <label className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-semibold cursor-pointer ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#c4c4c4]'
                      : 'bg-[#fcf9f8] border-[#e1bfb5]/40 text-[#594139]'
                  }`}>
                    <input
                      type="checkbox"
                      checked={formData.canManageInventory}
                      onChange={(e) => setFormData({ ...formData, canManageInventory: e.target.checked })}
                      className="rounded text-[#006c4f]"
                    />
                    <span>Stock Toggles</span>
                  </label>

                  <label className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-semibold cursor-pointer ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#c4c4c4]'
                      : 'bg-[#fcf9f8] border-[#e1bfb5]/40 text-[#594139]'
                  }`}>
                    <input
                      type="checkbox"
                      checked={formData.canManageRoster}
                      onChange={(e) => setFormData({ ...formData, canManageRoster: e.target.checked })}
                      className="rounded text-[#006c4f]"
                    />
                    <span>Roster Mgmt</span>
                  </label>

                  <label className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-semibold cursor-pointer ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#c4c4c4]'
                      : 'bg-[#fcf9f8] border-[#e1bfb5]/40 text-[#594139]'
                  }`}>
                    <input
                      type="checkbox"
                      checked={formData.canViewFinancials}
                      onChange={(e) => setFormData({ ...formData, canViewFinancials: e.target.checked })}
                      className="rounded text-[#006c4f]"
                    />
                    <span>View Financials</span>
                  </label>
                </div>
              </div>

              <div className={`flex items-center justify-end gap-2 pt-4 border-t ${
                themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-[#e1bfb5]/40'
              }`}>
                <button
                  type="button"
                  onClick={() => setIsAddStaffModalOpen(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                    themeMode === 'dark'
                      ? 'text-[#c4c4c4] hover:bg-[#383a39]'
                      : 'text-[#594139] hover:bg-[#f3f3f3]'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#006c4f] hover:bg-[#00523b] text-white text-xs font-bold cursor-pointer shadow-lg shadow-[#006c4f]/30"
                >
                  {editingStaff ? 'Update Staff' : 'Add Staff Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SCHEDULE SHIFT */}
      {isShiftModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className={`rounded-3xl p-6 border shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-200 ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]'
              : 'bg-white border-[#e1bfb5]'
          }`}>
            <div className={`flex items-center justify-between pb-3 border-b mb-4 ${
              themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-[#e1bfb5]/40'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-xl text-[#006c4f] ${
                  themeMode === 'dark' ? 'bg-[#006c4f]/15' : 'bg-[#006c4f]/15'
                }`}>
                  <CalendarPlus className="w-[18px] h-[18px]" />
                </span>
                <h3 className={`font-heading font-extrabold text-base ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>Schedule Staff Shift</h3>
              </div>
              <button
                onClick={() => setIsShiftModalOpen(false)}
                className={`p-1 rounded-lg transition-colors cursor-pointer ${
                  themeMode === 'dark'
                    ? 'text-[#7a7a7a] hover:text-[#f5f5f5] hover:bg-[#383a39]'
                    : 'text-[#8d7168] hover:text-[#1a1c1c] hover:bg-[#f3f3f3]'
                }`}
              >
                <X className="w-[20px] h-[20px]" />
              </button>
            </div>

            <form onSubmit={handleSaveShift} className="space-y-3.5">
              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                  themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                }`}>
                  Select Staff Member
                </label>
                <select
                  value={shiftData.staffId}
                  onChange={(e) => {
                    const member = staffMembers.find(s => s.id === e.target.value);
                    setShiftData({ 
                      ...shiftData, 
                      staffId: e.target.value,
                      station: member ? member.station : shiftData.station,
                      storeId: member ? member.storeId : shiftData.storeId
                    });
                  }}
                  className={`w-full px-3 py-2 text-xs rounded-xl border font-semibold focus:outline-none ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                      : 'bg-white border-[#e1bfb5] text-[#1a1c1c]'
                  }`}
                >
                  {staffMembers.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.role})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                    themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                  }`}>
                    Day of Week
                  </label>
                  <select
                    value={shiftData.day}
                    onChange={(e) => setShiftData({ ...shiftData, day: e.target.value as StaffShift['day'] })}
                    className={`w-full px-3 py-2 text-xs rounded-xl border font-semibold focus:outline-none ${
                      themeMode === 'dark'
                        ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                        : 'bg-white border-[#e1bfb5] text-[#1a1c1c]'
                    }`}
                  >
                    {daysOfWeek.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                    themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                  }`}>
                    Station
                  </label>
                  <select
                    value={shiftData.station}
                    onChange={(e) => setShiftData({ ...shiftData, station: e.target.value as StaffStation })}
                    className={`w-full px-3 py-2 text-xs rounded-xl border font-semibold focus:outline-none ${
                      themeMode === 'dark'
                        ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                        : 'bg-white border-[#e1bfb5] text-[#1a1c1c]'
                    }`}
                  >
                    {stations.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                    themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                  }`}>
                    Start Time
                  </label>
                  <input
                    type="text"
                    value={shiftData.startTime}
                    onChange={(e) => setShiftData({ ...shiftData, startTime: e.target.value })}
                    placeholder="09:00 AM"
                    className={`w-full px-3 py-2 text-xs rounded-xl border font-mono focus:outline-none ${
                      themeMode === 'dark'
                        ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                        : 'bg-white border-[#e1bfb5] text-[#1a1c1c]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                    themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                  }`}>
                    End Time
                  </label>
                  <input
                    type="text"
                    value={shiftData.endTime}
                    onChange={(e) => setShiftData({ ...shiftData, endTime: e.target.value })}
                    placeholder="05:30 PM"
                    className={`w-full px-3 py-2 text-xs rounded-xl border font-mono focus:outline-none ${
                      themeMode === 'dark'
                        ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                        : 'bg-white border-[#e1bfb5] text-[#1a1c1c]'
                    }`}
                  />
                </div>
              </div>

              <div className={`flex items-center justify-end gap-2 pt-3 border-t ${
                themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-[#e1bfb5]/40'
              }`}>
                <button
                  type="button"
                  onClick={() => setIsShiftModalOpen(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                    themeMode === 'dark'
                      ? 'text-[#c4c4c4] hover:bg-[#383a39]'
                      : 'text-[#594139] hover:bg-[#f3f3f3]'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#006c4f] hover:bg-[#00523b] text-white text-xs font-bold cursor-pointer shadow-lg shadow-[#006c4f]/30"
                >
                  Schedule Shift
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE STAFF CONFIRMATION */}
      {isDeleteStaffModalOpen && staffToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className={`rounded-3xl p-6 border shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-200 ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]'
              : 'bg-white border-[#e1bfb5]'
          }`}>
            <div className={`flex items-center justify-between pb-3 border-b mb-4 ${
              themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-[#e1bfb5]/40'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-xl text-red-500 ${
                  themeMode === 'dark' ? 'bg-red-900/20' : 'bg-red-100'
                }`}>
                  <AlertTriangle className="w-[18px] h-[18px]" />
                </span>
                <h3 className={`font-heading font-extrabold text-base ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>Remove Staff Member</h3>
              </div>
              <button
                onClick={() => setIsDeleteStaffModalOpen(false)}
                className={`p-1 rounded-lg transition-colors cursor-pointer ${
                  themeMode === 'dark'
                    ? 'text-[#7a7a7a] hover:text-[#f5f5f5] hover:bg-[#383a39]'
                    : 'text-[#8d7168] hover:text-[#1a1c1c] hover:bg-[#f3f3f3]'
                }`}
              >
                <X className="w-[20px] h-[20px]" />
              </button>
            </div>

            <div className="space-y-4">
              <p className={`text-sm ${
                themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
              }`}>
                Are you sure you want to remove <span className="font-bold">{staffToDelete.name}</span> from the staff directory? This action cannot be undone.
              </p>

              <div className={`p-3 rounded-xl border ${
                themeMode === 'dark' ? 'bg-[#383a39] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center gap-3">
                  <img src={staffToDelete.avatar} alt={staffToDelete.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className={`font-bold text-xs ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>{staffToDelete.name}</p>
                    <p className={`text-[10px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>{staffToDelete.role} • {staffToDelete.storeName}</p>
                  </div>
                </div>
              </div>

              <div className={`flex items-center justify-end gap-2 pt-3 border-t ${
                themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-[#e1bfb5]/40'
              }`}>
                <button
                  type="button"
                  onClick={() => setIsDeleteStaffModalOpen(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                    themeMode === 'dark'
                      ? 'text-[#c4c4c4] hover:bg-[#383a39]'
                      : 'text-[#594139] hover:bg-[#f3f3f3]'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteStaffMember(staffToDelete.id);
                    setIsDeleteStaffModalOpen(false);
                    setStaffToDelete(null);
                    showToast('Staff Removed', `${staffToDelete.name} has been removed from the staff directory`, 'success');
                  }}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer shadow-lg shadow-red-600/30"
                >
                  Remove Staff
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DELETE SHIFT CONFIRMATION */}
      {isDeleteShiftModalOpen && shiftToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className={`rounded-3xl p-6 border shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-200 ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]'
              : 'bg-white border-[#e1bfb5]'
          }`}>
            <div className={`flex items-center justify-between pb-3 border-b mb-4 ${
              themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-[#e1bfb5]/40'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-xl text-red-500 ${
                  themeMode === 'dark' ? 'bg-red-900/20' : 'bg-red-100'
                }`}>
                  <CalendarX className="w-[18px] h-[18px]" />
                </span>
                <h3 className={`font-heading font-extrabold text-base ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>Cancel Shift</h3>
              </div>
              <button
                onClick={() => setIsDeleteShiftModalOpen(false)}
                className={`p-1 rounded-lg transition-colors cursor-pointer ${
                  themeMode === 'dark'
                    ? 'text-[#7a7a7a] hover:text-[#f5f5f5] hover:bg-[#383a39]'
                    : 'text-[#8d7168] hover:text-[#1a1c1c] hover:bg-[#f3f3f3]'
                }`}
              >
                <X className="w-[20px] h-[20px]" />
              </button>
            </div>

            <div className="space-y-4">
              <p className={`text-sm ${
                themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
              }`}>
                Are you sure you want to cancel this shift for <span className="font-bold">{shiftToDelete.staffName}</span>?
              </p>

              <div className={`p-3 rounded-xl border ${
                themeMode === 'dark' ? 'bg-[#383a39] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-bold text-xs ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>{shiftToDelete.staffName}</p>
                    <p className={`text-[10px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>{shiftToDelete.day} • {shiftToDelete.station}</p>
                  </div>
                  <span className="text-[10px] font-mono text-[#006c4f] font-bold">
                    {shiftToDelete.startTime} - {shiftToDelete.endTime}
                  </span>
                </div>
              </div>

              <div className={`flex items-center justify-end gap-2 pt-3 border-t ${
                themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-[#e1bfb5]/40'
              }`}>
                <button
                  type="button"
                  onClick={() => setIsDeleteShiftModalOpen(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                    themeMode === 'dark'
                      ? 'text-[#c4c4c4] hover:bg-[#383a39]'
                      : 'text-[#594139] hover:bg-[#f3f3f3]'
                  }`}
                >
                  Keep Shift
                </button>
                <button
                  onClick={() => {
                    deleteStaffShift(shiftToDelete.id);
                    setIsDeleteShiftModalOpen(false);
                    setShiftToDelete(null);
                    showToast('Shift Cancelled', `Shift for ${shiftToDelete.staffName} has been cancelled`, 'success');
                  }}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer shadow-lg shadow-red-600/30"
                >
                  Cancel Shift
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
