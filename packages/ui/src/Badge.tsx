'use client';

import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-[#ab3500]/10 text-[#ab3500] border-[#ab3500]/20',
    success: 'bg-[#00ae81]/10 text-[#006c4f] border-[#00ae81]/20',
    warning: 'bg-[#f59e0b]/10 text-[#b45309] border-[#f59e0b]/20',
    error: 'bg-[#ef4444]/10 text-[#b91c1c] border-[#ef4444]/20',
    info: 'bg-[#24619d]/10 text-[#1d4ed8] border-[#24619d]/20',
    neutral: 'bg-black/5 text-[#594139] border-black/10',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={`inline-flex items-center font-bold rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
