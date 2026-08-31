'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { themeMode, toggleThemeMode } = useApp();

  const handleClick = () => {
    console.log('Theme toggle clicked, current mode:', themeMode);
    toggleThemeMode();
  };

  return (
    <button
      onClick={handleClick}
      className={`group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
        themeMode === 'dark' 
          ? 'bg-[#242625] border border-[#3a3a3a] hover:border-[#5a5a5a]' 
          : 'bg-white border border-gray-200 hover:border-gray-300'
      } ${className}`}
      title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {themeMode === 'dark' ? <Sun className="w-[20px] h-[20px] transition-all duration-300" /> : <Moon className="w-[20px] h-[20px] transition-all duration-300" />}
      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
        themeMode === 'dark' ? 'bg-white/5' : 'bg-black/5'
      }`} />
    </button>
  );
};
