'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Headphones, Send, MessageSquare } from 'lucide-react';
import { SupportTicket } from '@umunthuhub/shared-types';

export const HelpDeskSupport: React.FC = () => {
  const { supportTickets, activeTicket, setActiveTicket, sendSupportMessage, resolveTicket, showToast, themeMode } = useApp();
  const [replyText, setReplyText] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Tickets' },
    { id: 'missing_items', label: 'Missing Items' },
    { id: 'late_delivery', label: 'Late Delivery' },
    { id: 'food_temperature', label: 'Food Temp' },
    { id: 'wrong_order', label: 'Wrong Order' },
    { id: 'billing', label: 'Billing Dispute' },
  ];

  const filteredTickets = supportTickets.filter(t => {
    if (filterCategory === 'all') return true;
    return t.issueCategory === filterCategory;
  });

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket || !replyText.trim()) return;
    sendSupportMessage(activeTicket.id, replyText, 'agent');
    setReplyText('');
  };

  const handleIssueRefund = () => {
    if (!activeTicket) return;
    resolveTicket(activeTicket.id, 'refunded');
    showToast('Refund Issued', `Full refund processed for Order ${activeTicket.orderNumber}`, 'success');
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
            <div className="w-12 h-12 rounded-2xl bg-[#ba1a1a]/20 flex items-center justify-center">
              <Headphones className="w-[28px] h-[28px] text-[#ba1a1a]" />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                Help Desk & Live Customer Concierge
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ba1a1a]/30 text-[#ba1a1a] border border-[#ba1a1a]/40">
                {supportTickets.filter(t => t.status === 'open' || t.status === 'investigating').length} Active Issues
              </span>
            </div>
          </div>
          <p className={`text-xs mt-2 ${
            themeMode === 'dark' ? 'text-gray-400' : 'text-gray-400'
          }`}>
            Resolve diner inquiries, driver telemetry disputes, and issue instant kitchen credit refunds
          </p>
        </div>

        <div className={`flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-2xl border ${
          themeMode === 'dark'
            ? 'bg-[#383a39]/50 border-[#3a3a3a]'
            : 'bg-white/10 border-white/20'
        }`}>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className={`text-xs font-bold ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-white'}`}>Live Agent Queue Connected</span>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Ticket List Sidebar */}
        <div className={`rounded-2xl p-4 shadow-lg border space-y-4 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'bg-white border-gray-100'
        }`}>
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setFilterCategory(c.id)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filterCategory === c.id 
                    ? 'bg-gray-900 text-white shadow-md' 
                    : themeMode === 'dark'
                      ? 'bg-[#383a39] text-[#c4c4c4] hover:bg-[#4a4a4a]'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Ticket Cards */}
          <div className={`space-y-2 max-h-130 overflow-y-auto pr-4 ${
            themeMode === 'dark' ? 'scrollbar-thumb-gray-600' : 'scrollbar-thumb-gray-300'
          } scrollbar-thin scrollbar-track-transparent`}>
            {filteredTickets.map(ticket => {
              const isSelected = activeTicket?.id === ticket.id;
              return (
                <div
                  key={ticket.id}
                  onClick={() => setActiveTicket(ticket)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-[#ab3500]/10 border-[#ab3500] shadow-md' 
                      : themeMode === 'dark'
                        ? 'bg-[#383a39] border-[#3a3a3a] hover:bg-[#4a4a4a] hover:shadow-md'
                        : 'bg-gray-50 border-gray-200 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        ticket.priority === 'urgent' ? 'bg-red-500' : 'bg-amber-500'
                      }`} />
                      <span className={`font-mono text-[10px] font-bold ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>{ticket.orderNumber}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                      ticket.status === 'open' ? (themeMode === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700') :
                      ticket.status === 'investigating' ? (themeMode === 'dark' ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700') :
                      (themeMode === 'dark' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-700')
                    }`}>
                      {ticket.status}
                    </span>
                  </div>

                  <h4 className={`font-heading font-bold text-xs truncate ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>{ticket.subject}</h4>
                  <div className={`flex items-center justify-between mt-2 text-[11px] ${themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-500'}`}>
                    <span>{ticket.customerName}</span>
                    <span className={`text-[10px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-400'}`}>{ticket.lastUpdated}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Conversation Stream & Actions */}
        <div className={`lg:col-span-2 rounded-2xl p-6 shadow-lg border flex flex-col justify-between space-y-4 min-h-137.5 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'bg-white border-gray-100'
        }`}>
          
          {activeTicket ? (
            <>
              {/* Ticket Top Info */}
              <div className={`pb-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-gray-200'
              }`}>
                <div className="flex items-center gap-3">
                  <img
                    src={activeTicket.customerAvatar}
                    alt={activeTicket.customerName}
                    className={`w-12 h-12 rounded-xl object-cover border-2 shadow-md ${
                      themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-white'
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`font-heading font-extrabold text-sm ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
                        {activeTicket.customerName}
                      </h3>
                      <span className={`font-mono text-xs font-bold text-[#ab3500] px-2 py-0.5 rounded ${
                        themeMode === 'dark' ? 'bg-[#ab3500]/20' : 'bg-orange-50'
                      }`}>
                        {activeTicket.orderNumber}
                      </span>
                    </div>
                    <p className={`text-[11px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>{activeTicket.customerEmail}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleIssueRefund}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      themeMode === 'dark'
                        ? 'bg-red-900/30 hover:bg-red-900/50 text-red-400'
                        : 'bg-red-100 hover:bg-red-200 text-red-700'
                    }`}
                  >
                    Issue Full Refund
                  </button>
                  <button
                    onClick={() => resolveTicket(activeTicket.id, 'resolved')}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-emerald-200"
                  >
                    Mark Resolved ✓
                  </button>
                </div>
              </div>

              {/* Chat Thread */}
              <div className={`flex-1 space-y-3 overflow-y-auto max-h-87.5 p-4 rounded-xl pr-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent ${
                themeMode === 'dark' ? 'bg-[#383a39]' : 'bg-gray-50'
              }`}>
                {activeTicket.messages.map(msg => {
                  const isAgent = msg.sender === 'agent';
                  const isSystem = msg.sender === 'system';
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isAgent ? 'justify-end' : isSystem ? 'justify-center' : 'justify-start'}`}
                    >
                      {isSystem ? (
                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-semibold ${
                          themeMode === 'dark'
                            ? 'bg-[#3a3a3a] text-[#7a7a7a]'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {msg.text}
                        </span>
                      ) : (
                        <div
                          className={`max-w-md p-4 rounded-2xl text-xs space-y-1 ${
                            isAgent 
                              ? 'bg-[#ab3500] text-white rounded-br-none shadow-md' 
                              : themeMode === 'dark'
                                ? 'bg-[#383a39] text-[#f5f5f5] rounded-bl-none border border-[#3a3a3a] shadow-sm'
                                : 'bg-white text-gray-900 rounded-bl-none border border-gray-200 shadow-sm'
                          }`}
                        >
                          <p className="font-medium leading-relaxed">{msg.text}</p>
                          <span className={`text-[9px] block ${isAgent ? 'text-white/70 text-right' : themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>
                            {msg.timestamp}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Reply Input Form */}
              <form onSubmit={handleSendReply} className={`pt-3 border-t flex gap-2 ${
                themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-gray-200'
              }`}>
                <input
                  type="text"
                  placeholder="Type an official response or settlement offer to customer..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className={`flex-1 px-4 py-2.5 rounded-2xl text-xs font-medium focus:outline-none focus:border-[#ab3500] focus:ring-2 focus:ring-[#ab3500]/20 transition-all ${
                    themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-[#ab3500] hover:bg-[#8a2a00] text-white text-xs font-bold shadow-lg shadow-[#ab3500]/30 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Send className="w-[18px] h-[18px]" />
                  <span>Reply</span>
                </button>
              </form>
            </>
          ) : (
            <div className={`flex-1 flex flex-col items-center justify-center text-center p-8 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-400'}`}>
              <MessageSquare className="w-[56px] h-[56px] opacity-30 mb-3" />
              <p className={`font-heading font-bold text-sm ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>No Ticket Selected</p>
              <p className="text-xs">Pick an open support inquiry from the queue on the left.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
