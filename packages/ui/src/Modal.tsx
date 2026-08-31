'use client';

import React, { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  themeMode?: 'light' | 'dark' | 'warm';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  themeMode = 'light',
  maxWidth = 'lg',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClass =
    maxWidth === 'sm' ? 'max-w-sm' :
    maxWidth === 'md' ? 'max-w-md' :
    maxWidth === 'xl' ? 'max-w-xl' :
    maxWidth === '2xl' ? 'max-w-2xl' : 'max-w-lg';

  const themeClasses =
    themeMode === 'dark'
      ? 'bg-[#242625] text-[#f5f5f5] border-[#3a3a3a]'
      : themeMode === 'warm'
      ? 'bg-[#fffbf7] text-[#3d2b1f] border-[#d4c4b8]'
      : 'bg-white text-[#1a1c1c] border-[#e1bfb5]';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div
        className={`relative w-full ${maxWidthClass} rounded-3xl overflow-hidden shadow-2xl border ${themeClasses} transition-all transform animate-in fade-in zoom-in-95 duration-200 z-10`}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-inherit">
            <h3 className="font-heading font-extrabold text-lg tracking-tight">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
