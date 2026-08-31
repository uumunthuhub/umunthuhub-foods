'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Monitor, X, CheckCircle, Smartphone, Laptop } from 'lucide-react';

interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  current: boolean;
}

interface SessionManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SessionManagementModal: React.FC<SessionManagementModalProps> = ({ isOpen, onClose }) => {
  const { showToast, themeMode } = useApp();
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      device: 'MacBook Pro',
      browser: 'Chrome',
      location: 'Lilongwe, Malawi',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: '2',
      device: 'iPhone 14',
      browser: 'Safari',
      location: 'Lilongwe, Malawi',
      lastActive: '1 hour ago',
      current: false
    }
  ]);

  const handleRevokeSession = (sessionId: string) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
    showToast('Session Revoked', 'The session has been terminated successfully', 'success');
  };

  const handleRevokeAllOther = () => {
    setSessions(sessions.filter(s => s.current));
    showToast('All Sessions Revoked', 'All other sessions have been terminated', 'success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-lg rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto ${
        themeMode === 'dark' ? 'bg-[#242625] border border-[#3a3a3a]' : 'bg-white border border-gray-200'
      }`}>
        <div className={`flex items-center justify-between p-5 border-b sticky top-0 ${
          themeMode === 'dark' ? 'bg-[#242625] border-[#3a3a3a]' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#006c4f]/10 flex items-center justify-center">
              <Monitor className="w-[20px] h-[20px] text-[#006c4f]" />
            </div>
            <div>
              <h3 className={`font-heading font-bold text-base ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
                Active Sessions
              </h3>
              <p className={`text-[10px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>
                Manage your active login sessions
              </p>
            </div>
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

        <div className="p-5 space-y-4">
          {sessions.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-[48px] h-[48px] text-[#7a7a7a]" />
              <p className={`mt-3 text-sm font-medium ${themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-700'}`}>
                No other active sessions
              </p>
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className={`p-4 rounded-xl border ${
                  themeMode === 'dark'
                    ? 'bg-[#383a39] border-[#3a3a3a]'
                    : 'bg-gray-50 border-gray-200'
                } ${session.current ? 'border-[#006c4f]/50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      session.current
                        ? 'bg-[#006c4f]/10'
                        : themeMode === 'dark'
                          ? 'bg-[#4a4a4a]'
                          : 'bg-gray-200'
                    }`}>
                      {session.device.includes('iPhone') || session.device.includes('Android') ? <Smartphone className={`w-[20px] h-[20px] ${
                        session.current ? 'text-[#006c4f]' : themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-600'
                      }`} /> : <Laptop className={`w-[20px] h-[20px] ${
                        session.current ? 'text-[#006c4f]' : themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-600'
                      }`} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className={`font-bold text-xs ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
                          {session.device}
                        </p>
                        {session.current && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#006c4f]/20 text-[#006c4f]">
                            Current
                          </span>
                        )}
                      </div>
                      <p className={`text-[10px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>
                        {session.browser} • {session.location}
                      </p>
                      <p className={`text-[10px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>
                        Last active: {session.lastActive}
                      </p>
                    </div>
                  </div>
                  {!session.current && (
                    <button
                      onClick={() => handleRevokeSession(session.id)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                        themeMode === 'dark'
                          ? 'bg-red-900/20 hover:bg-red-900/30 text-red-400'
                          : 'bg-red-50 hover:bg-red-100 text-red-600'
                      }`}
                    >
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {sessions.some(s => !s.current) && (
          <div className={`p-5 border-t ${themeMode === 'dark' ? 'bg-[#383a39]/50 border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
            <button
              onClick={handleRevokeAllOther}
              className={`w-full px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-red-900/20 hover:bg-red-900/30 text-red-400'
                  : 'bg-red-50 hover:bg-red-100 text-red-600'
              }`}
            >
              Revoke All Other Sessions
            </button>
          </div>
        )}

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
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
