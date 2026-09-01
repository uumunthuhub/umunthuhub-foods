'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const CustomerSupport: React.FC = () => {
  const {
    activeOrder,
    supportTickets,
    activeTicket,
    setActiveTicket,
    sendSupportMessage,
    showToast,
    themeMode
  } = useApp();

  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [newTicketCategory, setNewTicketCategory] = useState<'missing_items' | 'late_delivery' | 'food_temperature' | 'wrong_order' | 'billing'>('missing_items');
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [replyText, setReplyText] = useState('');

  const categories = [
    { id: 'missing_items' as const, label: 'Missing Items', icon: 'remove_circle' },
    { id: 'late_delivery' as const, label: 'Late Delivery', icon: 'schedule' },
    { id: 'food_temperature' as const, label: 'Food Temperature', icon: 'thermostat' },
    { id: 'wrong_order' as const, label: 'Wrong Order', icon: 'error' },
    { id: 'billing' as const, label: 'Billing Issue', icon: 'receipt_long' },
  ];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrder || !newTicketSubject.trim() || !newTicketMessage.trim()) {
      showToast('Missing Information', 'Please fill in all required fields', 'warning');
      return;
    }

    // Create new ticket (this would normally call a backend API)
    const newTicket = {
      id: 'ticket-' + Date.now(),
      customerName: activeOrder.customerName,
      customerEmail: activeOrder.customerEmail,
      customerAvatar: '/umunthuhub-profile.png',
      orderId: activeOrder.id,
      orderNumber: activeOrder.orderNumber,
      issueCategory: newTicketCategory,
      status: 'open' as const,
      priority: 'medium' as const,
      lastUpdated: new Date().toLocaleString(),
      subject: newTicketSubject,
      messages: [
        {
          id: 'msg-' + Date.now(),
          sender: 'customer' as const,
          text: newTicketMessage,
          timestamp: new Date().toLocaleString()
        }
      ]
    };

    // Add to support tickets (in a real app, this would be an API call)
    // For now, we'll just set it as active and show success
    setActiveTicket(newTicket);
    setIsCreatingTicket(false);
    setNewTicketSubject('');
    setNewTicketMessage('');
    showToast('Support Ticket Created', `Ticket #${newTicket.orderNumber} submitted successfully. An agent will respond shortly.`, 'success');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket || !replyText.trim()) return;
    sendSupportMessage(activeTicket.id, replyText, 'customer');
    setReplyText('');
  };

  const handleStartNewTicket = () => {
    setIsCreatingTicket(true);
    setActiveTicket(null);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div>
        <h1 className={`font-heading font-extrabold text-2xl sm:text-3xl ${
          themeMode === 'warm' ? 'text-[#3d2b1f]' :
          themeMode === 'dark' ? 'text-[#f5f5f5]' :
          'text-[#1a1c1c]'
        }`}>
          Help & Support
        </h1>
        <p className={`text-xs mt-1 ${
          themeMode === 'warm' ? 'text-[#6b5a4a]' :
          themeMode === 'dark' ? 'text-[#c4c4c4]' :
          'text-[#594139]'
        }`}>
          Report issues with your order or get help from our support team
        </p>
      </div>

      {/* Active Order Info */}
      {activeOrder && (
        <div className={`glass-panel rounded-3xl p-4 border flex items-center gap-3 ${
          themeMode === 'warm' ? 'border-[#d4c4b8]/50' :
          themeMode === 'dark' ? 'border-white/20' :
          'border-[#e1bfb5]/50'
        }`}>
          <div className="w-10 h-10 rounded-xl bg-[#ab3500]/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#ab3500] text-[20px]">receipt_long</span>
          </div>
          <div className="flex-1">
            <p className={`text-[10px] font-bold uppercase tracking-wider ${
              themeMode === 'warm' ? 'text-[#6b5a4a]' :
              themeMode === 'dark' ? 'text-[#c4c4c4]' :
              'text-[#8d7168]'
            }`}>
              Active Order
            </p>
            <p className={`font-heading font-extrabold text-sm ${
              themeMode === 'warm' ? 'text-[#3d2b1f]' :
              themeMode === 'dark' ? 'text-[#f5f5f5]' :
              'text-[#1a1c1c]'
            }`}>
              {activeOrder.orderNumber}
            </p>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
            activeOrder.status === 'delivered' ? 'bg-[#00ae81]/15 text-[#006c4f]' :
            'bg-[#ab3500]/15 text-[#ab3500]'
          }`}>
            {activeOrder.status.replace('_', ' ')}
          </span>
        </div>
      )}

      {/* Create New Ticket Button */}
      {!isCreatingTicket && (
        <button
          onClick={handleStartNewTicket}
          className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer border ${
            themeMode === 'dark'
              ? 'bg-[#242625] hover:bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]'
              : 'bg-white hover:bg-[#f3f3f3] border-[#e1bfb5]/60 text-[#1a1c1c]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          Create New Support Ticket
        </button>
      )}

      {/* Create Ticket Form */}
      {isCreatingTicket && (
        <div className={`glass-panel rounded-3xl p-5 border space-y-4 ${
          themeMode === 'warm' ? 'border-[#d4c4b8]/50' :
          themeMode === 'dark' ? 'border-white/20' :
          'border-[#e1bfb5]/50'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`font-heading font-bold text-sm ${
              themeMode === 'warm' ? 'text-[#3d2b1f]' :
              themeMode === 'dark' ? 'text-[#f5f5f5]' :
              'text-[#1a1c1c]'
            }`}>
              Create New Ticket
            </h3>
            <button
              onClick={() => setIsCreatingTicket(false)}
              className={`text-xs font-semibold ${
                themeMode === 'warm' ? 'text-[#6b5a4a] hover:text-[#ab3500]' :
                themeMode === 'dark' ? 'text-[#c4c4c4] hover:text-[#ab3500]' :
                'text-[#8d7168] hover:text-[#ab3500]'
              }`}
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreateTicket} className="space-y-4">
            <div>
              <label className={`block text-[11px] font-bold mb-2 ${
                themeMode === 'warm' ? 'text-[#6b5a4a]' :
                themeMode === 'dark' ? 'text-[#c4c4c4]' :
                'text-[#594139]'
              }`}>
                Issue Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setNewTicketCategory(cat.id)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      newTicketCategory === cat.id
                        ? 'bg-[#ab3500]/10 border-[#ab3500] text-[#ab3500]'
                        : themeMode === 'dark'
                          ? 'bg-[#383a39] border-[#3a3a3a] text-[#c4c4c4] hover:bg-[#4a4a4a]'
                          : 'bg-white border-[#e1bfb5]/60 text-[#594139] hover:bg-[#f3f3f3]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-[11px] font-bold mb-2 ${
                themeMode === 'warm' ? 'text-[#6b5a4a]' :
                themeMode === 'dark' ? 'text-[#c4c4c4]' :
                'text-[#594139]'
              }`}>
                Subject
              </label>
              <input
                type="text"
                value={newTicketSubject}
                onChange={(e) => setNewTicketSubject(e.target.value)}
                placeholder="Brief description of the issue"
                className="w-full glass-input px-4 py-2.5 rounded-xl text-xs"
                required
              />
            </div>

            <div>
              <label className={`block text-[11px] font-bold mb-2 ${
                themeMode === 'warm' ? 'text-[#6b5a4a]' :
                themeMode === 'dark' ? 'text-[#c4c4c4]' :
                'text-[#594139]'
              }`}>
                Detailed Description
              </label>
              <textarea
                value={newTicketMessage}
                onChange={(e) => setNewTicketMessage(e.target.value)}
                placeholder="Please provide details about your issue..."
                rows={4}
                className="w-full glass-input px-4 py-2.5 rounded-xl text-xs resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#ab3500] hover:bg-[#8f2c00] text-white text-xs font-bold transition-colors shadow-md shadow-[#ab3500]/20 cursor-pointer"
            >
              Submit Ticket
            </button>
          </form>
        </div>
      )}

      {/* Active Ticket View */}
      {activeTicket && !isCreatingTicket && (
        <div className={`glass-panel rounded-3xl p-5 border space-y-4 ${
          themeMode === 'warm' ? 'border-[#d4c4b8]/50' :
          themeMode === 'dark' ? 'border-white/20' :
          'border-[#e1bfb5]/50'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-mono text-xs font-bold text-[#ab3500]`}>
                  {activeTicket.orderNumber}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                  activeTicket.status === 'open' ? 'bg-red-100 text-red-700' :
                  activeTicket.status === 'investigating' ? 'bg-amber-100 text-amber-700' :
                  'bg-emerald-100 text-emerald-700'
                }`}>
                  {activeTicket.status}
                </span>
              </div>
              <h3 className={`font-heading font-bold text-sm mt-1 ${
                themeMode === 'warm' ? 'text-[#3d2b1f]' :
                themeMode === 'dark' ? 'text-[#f5f5f5]' :
                'text-[#1a1c1c]'
              }`}>
                {activeTicket.subject}
              </h3>
            </div>
            <button
              onClick={() => setActiveTicket(null)}
              className={`text-xs font-semibold ${
                themeMode === 'warm' ? 'text-[#6b5a4a] hover:text-[#ab3500]' :
                themeMode === 'dark' ? 'text-[#c4c4c4] hover:text-[#ab3500]' :
                'text-[#8d7168] hover:text-[#ab3500]'
              }`}
            >
              Close
            </button>
          </div>

          {/* Chat Thread */}
          <div className={`space-y-3 max-h-80 overflow-y-auto p-4 rounded-xl ${
            themeMode === 'dark' ? 'bg-[#383a39]' : 'bg-gray-50'
          }`}>
            {activeTicket.messages.map(msg => {
              const isAgent = msg.sender === 'agent';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs space-y-1 ${
                      isAgent 
                        ? 'bg-[#ab3500] text-white rounded-br-none shadow-md' 
                        : themeMode === 'dark'
                          ? 'bg-[#383a39] text-[#f5f5f5] rounded-bl-none border border-[#3a3a3a] shadow-sm'
                          : 'bg-white text-[#1a1c1c] rounded-bl-none border border-[#e1bfb5]/40 shadow-sm'
                    }`}
                  >
                    <p className="font-medium leading-relaxed">{msg.text}</p>
                    <span className={`text-[9px] block ${isAgent ? 'text-white/70 text-right' : themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reply Input */}
          <form onSubmit={handleSendReply} className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 glass-input px-4 py-2.5 rounded-xl text-xs"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#ab3500] hover:bg-[#8f2c00] text-white text-xs font-bold transition-colors shadow-md shadow-[#ab3500]/20 cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* No Active Ticket */}
      {!activeTicket && !isCreatingTicket && (
        <div className={`text-center py-12 glass-panel rounded-3xl p-8 border ${
          themeMode === 'warm' ? 'border-[#d4c4b8]/50' :
          themeMode === 'dark' ? 'border-white/20' :
          'border-[#e1bfb5]/50'
        }`}>
          <span className="material-symbols-outlined text-5xl text-[#8d7168] mb-3">support_agent</span>
          <h3 className={`font-heading font-bold text-sm mb-2 ${
            themeMode === 'warm' ? 'text-[#3d2b1f]' :
            themeMode === 'dark' ? 'text-[#f5f5f5]' :
            'text-[#1a1c1c]'
          }`}>
            No Active Support Tickets
          </h3>
          <p className={`text-xs ${
            themeMode === 'warm' ? 'text-[#6b5a4a]' :
            themeMode === 'dark' ? 'text-[#c4c4c4]' :
            'text-[#594139]'
          }`}>
            Create a new ticket to get help with your order
          </p>
        </div>
      )}

    </div>
  );
};
