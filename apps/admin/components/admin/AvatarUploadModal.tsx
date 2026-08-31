'use client';

import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Camera, X, ImagePlus } from 'lucide-react';

interface AvatarUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAvatarChange: (avatarUrl: string) => void;
}

export const AvatarUploadModal: React.FC<AvatarUploadModalProps> = ({ isOpen, onClose, onAvatarChange }) => {
  const { showToast, themeMode } = useApp();
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast('Invalid File', 'Please select an image file', 'error');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast('File Too Large', 'Please select an image under 5MB', 'error');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleUpload = () => {
    if (previewUrl) {
      onAvatarChange(previewUrl);
      showToast('Avatar Updated', 'Your profile picture has been updated successfully', 'success');
      setPreviewUrl('');
      onClose();
    }
  };

  const handleRemove = () => {
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
            <div className="w-10 h-10 rounded-xl bg-[#ab3500]/10 flex items-center justify-center">
              <Camera className="w-[20px] h-[20px] text-[#ab3500]" />
            </div>
            <h3 className={`font-heading font-bold text-base ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
              Change Avatar
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

        <div className="p-5 space-y-4">
          {/* Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-[#ab3500] bg-[#ab3500]/5'
                : themeMode === 'dark'
                  ? 'border-[#3a3a3a] hover:border-[#ab3500] bg-[#383a39]/50'
                  : 'border-gray-300 hover:border-[#ab3500] bg-gray-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
            />
            
            {previewUrl ? (
              <div className="space-y-3">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white/20 shadow-xl"
                />
                <p className={`text-xs font-medium ${themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-gray-700'}`}>
                  Click to change image
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#ab3500]/10 flex items-center justify-center mx-auto">
                  <ImagePlus className="w-[32px] h-[32px] text-[#ab3500]" />
                </div>
                <div>
                  <p className={`font-bold text-sm ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
                    Click or drag image here
                  </p>
                  <p className={`text-[10px] ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Guidelines */}
          <div className={`p-4 rounded-xl border ${
            themeMode === 'dark'
              ? 'bg-[#383a39]/50 border-[#3a3a3a]'
              : 'bg-gray-50 border-gray-200'
          }`}>
            <p className={`font-bold text-xs mb-2 ${themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-gray-900'}`}>
              Image Guidelines:
            </p>
            <ul className={`text-[10px] space-y-1 ${themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-gray-500'}`}>
              <li>• Square or circular images work best</li>
              <li>• Minimum 200x200 pixels recommended</li>
              <li>• File size under 5MB</li>
              <li>• PNG, JPG, or GIF formats</li>
            </ul>
          </div>
        </div>

        <div className={`flex gap-3 p-5 border-t ${
          themeMode === 'dark' ? 'border-[#3a3a3a]' : 'border-gray-200'
        }`}>
          {previewUrl && (
            <button
              onClick={handleRemove}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] hover:bg-[#4a4a4a] text-[#c4c4c4]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Remove
            </button>
          )}
          <button
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
            onClick={handleUpload}
            disabled={!previewUrl}
            className="flex-1 px-5 py-2.5 rounded-xl bg-[#ab3500] text-white text-xs font-bold hover:bg-[#8a2a00] transition-colors cursor-pointer shadow-md shadow-[#ab3500]/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};
