'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, UserPlus, CheckCircle, Clock, Utensils, Store, Search, X, UserPlus as GroupAdd, Copy, Check, Send } from 'lucide-react';
import { TeamMember } from '@umunthuhub/shared-types';

export const TeamManagement: React.FC = () => {
  const { teamMembers, addTeamMember, tenants, showToast, themeMode } = useApp();

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('All');

  // Invite Form State
  const [inviteEmails, setInviteEmails] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState<TeamMember['role']>('General Manager');
  const [selectedStores, setSelectedStores] = useState<string[]>(['all']);
  const [personalNote, setPersonalNote] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const roles = ['All', 'Owner', 'General Manager', 'Head Chef', 'Kitchen Lead', 'Front Staff'];

  const filteredMembers = teamMembers.filter(m => {
    const matchesRole = filterRole === 'All' || m.role === filterRole;
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                          m.email.toLowerCase().includes(search.toLowerCase()) ||
                          m.role.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleSendInvites = (e: React.FormEvent) => {
    e.preventDefault();
    const emails = inviteEmails.split(/[\n,]+/).map(em => em.trim()).filter(Boolean);
    
    if (emails.length === 0 && !inviteName) return;

    if (emails.length > 0) {
      emails.forEach(em => {
        addTeamMember({
          name: em.split('@')[0].replace('.', ' '),
          email: em,
          role: inviteRole,
          assignedStores: selectedStores.includes('all') ? ['All Kitchen Locations'] : selectedStores,
          avatar: '/umunthuai.png',
          status: 'pending'
        });
      });
      showToast('Invitations Dispatched!', `${emails.length} team members invited as ${inviteRole}`, 'success');
    } else if (inviteName) {
      addTeamMember({
        name: inviteName,
        email: `${inviteName.toLowerCase().replace(' ', '.')}@umunthuhub.com`,
        role: inviteRole,
        assignedStores: selectedStores.includes('all') ? ['All Kitchen Locations'] : selectedStores,
        avatar: '/umunthuai.png',
        status: 'pending'
      });
      showToast('Invitation Dispatched!', `${inviteName} invited as ${inviteRole}`, 'success');
    }

    setIsInviteModalOpen(false);
    setInviteEmails('');
    setInviteName('');
    setPersonalNote('');
  };

  const handleCopyLink = () => {
    const inviteLink = `https://umunthuhub.com/join?token=org_umunthuhub_${Math.random().toString(36).substring(2, 9)}&role=${encodeURIComponent(inviteRole)}`;
    navigator.clipboard.writeText(inviteLink);
    setCopiedLink(true);
    showToast('Link Copied!', 'Direct invite link copied to clipboard', 'info');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className={`rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        themeMode === 'dark'
          ? 'bg-linear-to-r from-[#1a1c1c] to-[#2d2d2d]'
          : 'bg-linear-to-r from-[#1a1c1c] to-[#2d2d2d]'
      }`}>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-[#24619d]/20 flex items-center justify-center">
              <Users className="w-[28px] h-[28px] text-[#24619d]" />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                Team Members & Role Access Control
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#24619d]/30 text-[#24619d] border border-[#24619d]/40">
                {teamMembers.length} Staff Roster
              </span>
            </div>
          </div>
          <p className={`text-xs mt-2 ${
            themeMode === 'dark' ? 'text-gray-400' : 'text-gray-400'
          }`}>
            Manage organization users, head chefs, kitchen managers, and granular multi-store POS/KDS permissions
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#24619d] hover:bg-[#1a4a7a] text-white text-xs font-bold transition-all shadow-lg shadow-[#24619d]/30 flex items-center gap-2"
        >
          <UserPlus className="w-[18px] h-[18px]" />
          <span>+ Invite New Team Member</span>
        </button>
      </div>

      {/* Role Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className={`rounded-2xl p-5 shadow-lg border space-y-2 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>Active Staff</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              themeMode === 'dark' ? 'bg-emerald-900/30' : 'bg-emerald-100'
            }`}>
              <CheckCircle className="w-[18px] h-[18px] text-emerald-600" />
            </div>
          </div>
          <p className="font-heading font-extrabold text-2xl text-emerald-600">
            {teamMembers.filter(m => m.status === 'active').length} Members
          </p>
        </div>

        <div className={`rounded-2xl p-5 shadow-lg border space-y-2 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>Pending Invites</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              themeMode === 'dark' ? 'bg-amber-900/30' : 'bg-amber-100'
            }`}>
              <Clock className="w-[18px] h-[18px] text-amber-600" />
            </div>
          </div>
          <p className="font-heading font-extrabold text-2xl text-amber-600">
            {teamMembers.filter(m => m.status === 'pending').length} Awaiting
          </p>
        </div>

        <div className={`rounded-2xl p-5 shadow-lg border space-y-2 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>Kitchen Leads</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              themeMode === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
            }`}>
              <Utensils className="w-[18px] h-[18px] text-blue-600" />
            </div>
          </div>
          <p className="font-heading font-extrabold text-2xl text-blue-600">
            {teamMembers.filter(m => m.role === 'Head Chef' || m.role === 'Kitchen Lead').length} Chefs
          </p>
        </div>

        <div className={`rounded-2xl p-5 shadow-lg border space-y-2 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>Managed Venues</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              themeMode === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'
            }`}>
              <Store className="w-[18px] h-[18px] text-purple-600" />
            </div>
          </div>
          <p className={`font-heading font-extrabold text-2xl ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
            {tenants.length} Branches
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className={`rounded-2xl p-4 shadow-lg border flex flex-col md:flex-row items-center justify-between gap-3 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {roles.map(r => (
            <button
              key={r}
              onClick={() => setFilterRole(r)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterRole === r
                  ? 'bg-[#24619d] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
          <input
            type="text"
            placeholder="Filter by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:border-[#24619d] focus:ring-2 focus:ring-[#24619d]/20 transition-all ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                : 'bg-gray-50 border-gray-200 text-gray-900'
            }`}
          />
        </div>
      </div>

      {/* Team Roster Table */}
      <div className={`rounded-2xl p-6 shadow-lg border space-y-4 ${
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
                <th className="pb-3 font-bold uppercase tracking-wider text-[10px]">Team Member</th>
                <th className="pb-3 font-bold uppercase tracking-wider text-[10px]">Role & Permissions</th>
                <th className="pb-3 font-bold uppercase tracking-wider text-[10px]">Assigned Stores</th>
                <th className="pb-3 font-bold uppercase tracking-wider text-[10px]">Status</th>
                <th className="pb-3 font-bold uppercase tracking-wider text-[10px]">Last Activity</th>
                <th className="pb-3 font-bold uppercase tracking-wider text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${themeMode === 'dark' ? 'divide-[#3a3a3a]' : 'divide-gray-100'}`}>
              {filteredMembers.map(member => (
                <tr key={member.id} className={`transition-colors ${themeMode === 'dark' ? 'hover:bg-[#383a39]/50' : 'hover:bg-gray-50'}`}>
                  <td className="py-4 flex items-center gap-3">
                    <img
                      src={member.avatar || '/umunthuai.png'}
                      alt={member.name}
                      className={`w-10 h-10 rounded-xl object-cover border-2 shadow-sm ${
                        themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-white'
                      }`}
                    />
                    <div>
                      <p className={`font-heading font-bold text-sm ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>{member.name}</p>
                      <p className={`text-[11px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>{member.email}</p>
                    </div>
                  </td>

                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      member.role === 'Owner' ? (themeMode === 'dark' ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-700') :
                      member.role === 'Head Chef' ? (themeMode === 'dark' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-700') :
                      member.role === 'General Manager' ? (themeMode === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700') :
                      (themeMode === 'dark' ? 'bg-[#383a39] text-[#c4c4c4]' : 'bg-gray-100 text-gray-600')
                    }`}>
                      {member.role}
                    </span>
                  </td>

                  <td className="py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {member.assignedStores.map((st, i) => (
                        <span key={i} className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold border ${
                          themeMode === 'dark'
                            ? 'bg-[#383a39] text-[#c4c4c4] border-[#3a3a3a]'
                            : 'bg-gray-100 text-gray-600 border-gray-200'
                        }`}>
                          {st}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      member.status === 'active' 
                        ? (themeMode === 'dark' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-700') 
                        : (themeMode === 'dark' ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700')
                    }`}>
                      {member.status === 'active' ? '● ACTIVE' : '○ PENDING INVITE'}
                    </span>
                  </td>

                  <td className={`py-4 text-[11px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>{member.lastActive}</td>

                  <td className="py-4 text-right space-x-2">
                    {member.status === 'pending' && (
                      <button
                        onClick={() => showToast('Invitation Resent', `Invite ping sent to ${member.email}`, 'success')}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                          themeMode === 'dark'
                            ? 'bg-[#383a39] hover:bg-[#4a4a4a] text-orange-400'
                            : 'bg-gray-100 hover:bg-gray-200 text-orange-600'
                        }`}
                      >
                        Resend
                      </button>
                    )}
                    <button
                      onClick={() => showToast('Permissions', `Editing permissions for ${member.name}`, 'info')}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                        themeMode === 'dark'
                          ? 'bg-[#383a39] hover:bg-[#4a4a4a] text-[#c4c4c4]'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      }`}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Member Modal (SCREEN_12) */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsInviteModalOpen(false)} />
          <div className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border animate-in fade-in zoom-in-95 ${
            themeMode === 'dark'
              ? 'bg-[#242625] border-[#3a3a3a]'
              : 'glass-panel bg-white border-[#e1bfb5]'
          }`}>
            
            <div className={`flex items-center justify-between pb-4 border-b mb-5 ${
              themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-[#e1bfb5]/40'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#ab3500]/10 flex items-center justify-center text-[#ab3500]">
                  <GroupAdd className="w-[22px] h-[22px]" />
                </div>
                <div>
                  <h3 className={`font-heading font-extrabold text-base ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>Invite Team Members</h3>
                  <p className={`text-xs ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'}`}>Send role invitations or generate a shareable onboarding link</p>
                </div>
              </div>
              <button 
                onClick={() => setIsInviteModalOpen(false)} 
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  themeMode === 'dark'
                    ? 'bg-[#383a39] text-[#c4c4c4] hover:bg-[#4a4a4a]'
                    : 'bg-[#f3f3f3] text-[#594139] hover:bg-[#e8e8e8]'
                }`}
              >
                <X className="w-[18px] h-[18px]" />
              </button>
            </div>

            <form onSubmit={handleSendInvites} className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <label className={`font-heading font-bold block ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>
                  Email Addresses (Batch or Single) *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Enter email addresses separated by commas or line breaks (e.g. chef@store.com, gm@store.com)"
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className={`font-heading font-bold block ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>
                    Assigned Role & Level *
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as any)}
                    className={`w-full glass-input px-3.5 py-2.5 rounded-xl font-bold ${
                      themeMode === 'dark' ? 'bg-[#383a39] text-[#f5f5f5]' : 'bg-white'
                    }`}
                  >
                    <option value="Owner">Organization Owner (Full Admin)</option>
                    <option value="General Manager">General Manager (Ops & Payouts)</option>
                    <option value="Head Chef">Head Chef (KDS Lead & Menu Editor)</option>
                    <option value="Kitchen Lead">Kitchen Lead (KDS Order Stream)</option>
                    <option value="Front Staff">Front Counter Staff (POS & Pickup)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className={`font-heading font-bold block ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>
                    Venue Store Access *
                  </label>
                  <select
                    value={selectedStores[0]}
                    onChange={(e) => setSelectedStores([e.target.value])}
                    className={`w-full glass-input px-3.5 py-2.5 rounded-xl font-semibold ${
                      themeMode === 'dark' ? 'bg-[#383a39] text-[#f5f5f5]' : 'bg-white'
                    }`}
                  >
                    <option value="all">All Managed Store Branches</option>
                    {tenants.map(t => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className={`font-heading font-bold block ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>
                  Personal Invitation Message (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Welcome to the kitchen team! Here is your access invite."
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  className="w-full glass-input px-3.5 py-2 rounded-xl"
                />
              </div>

              {/* Instant Shareable Link Box */}
              <div className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] border-[#3a3a3a]'
                  : 'bg-[#f9f9f9] border-[#e1bfb5]/50'
              }`}>
                <div className="min-w-0">
                  <p className={`font-heading font-bold text-[11px] ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'}`}>Or Share Instant Invite Link</p>
                  <p className={`text-[10px] truncate font-mono ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'}`}>https://umunthuhub.com/join?token=org_umunthuhub_staff</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold shrink-0 flex items-center gap-1 cursor-pointer ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#ab3500] hover:bg-[#4a4a4a]'
                      : 'bg-white border-[#e1bfb5] text-[#ab3500] hover:bg-[#f3f3f3]'
                  }`}
                >
                  {copiedLink ? <Check className="w-[15px] h-[15px]" /> : <Copy className="w-[15px] h-[15px]" />}
                  <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
                </button>
              </div>

              <div className={`pt-4 border-t flex gap-3 ${
                themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-[#e1bfb5]/40'
              }`}>
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className={`w-1/3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] text-[#c4c4c4] hover:bg-[#4a4a4a]'
                      : 'bg-[#f3f3f3] text-[#594139] hover:bg-[#e8e8e8]'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl glass-button-primary text-xs font-bold shadow-md flex items-center justify-center gap-1.5"
                >
                  <Send className="w-[18px] h-[18px]" />
                  <span>Send Staff Invitations</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
