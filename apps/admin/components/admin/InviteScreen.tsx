'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Loader2, Send, Check, ArrowLeft } from 'lucide-react';

interface InviteScreenProps {
  onBackToLogin: () => void;
  onInviteSuccess: (email: string) => void;
}

export const InviteScreen: React.FC<InviteScreenProps> = ({ onBackToLogin, onInviteSuccess }) => {
  const { showToast, themeMode } = useApp();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));

    setIsSubmitting(false);
    setOtpSent(true);
    setCountdown(30);
    
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    showToast(
      'OTP Sent 📱',
      `A 6-digit verification code has been sent to ${email}`,
      'success'
    );
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      showToast('Invalid OTP', 'Please enter all 6 digits', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));

    setIsSubmitting(false);
    
    if (otpValue === '123456') {
      showToast(
        'Invitation Accepted! 🎉',
        'Welcome to the team. Redirecting to setup...',
        'success'
      );
      onInviteSuccess(email);
    } else {
      showToast(
        'Invalid OTP',
        'The code you entered is incorrect. Please try again.',
        'error'
      );
      setOtp(['', '', '', '', '', '']);
    }
  };

  const handleResendOtp = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    setCountdown(30);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    showToast('OTP Resent', 'A new verification code has been sent', 'success');
  };

  return (
    <div className={`max-w-5xl mx-auto py-8 px-3 sm:px-6 ${
      themeMode === 'dark' ? 'bg-[#1a1c1c]' : 'bg-[#fcf9f8]'
    }`}>
      {/* Container Box */}
      <div className={`rounded-3xl overflow-hidden border shadow-xl grid grid-cols-1 md:grid-cols-12 min-h-96 ${
        themeMode === 'dark' 
          ? 'bg-[#242625] border-[#3a3a3a]/50' 
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>

        {/* Left Side: Brand Showcase Banner */}
        <div className="md:col-span-5 bg-linear-to-br from-[#24619d] via-[#1a4a7a] to-[#0f2d4a] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background graphic glow */}
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#4a90e2]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Logo */}
          <div className="relative z-10 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white p-1.5 shadow-lg border border-white/20 flex items-center justify-center shrink-0">
                <img
                  src="/umunthuhub-logo.png"
                  alt="Umunthuhub Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-white block leading-none">
                  Umunthuhub<span className="text-[#e3f2fd]">-Foods</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#90caf9]">
                  Team Invitation
                </span>
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white leading-tight">
                Join Your Team
              </h2>
              <p className="text-sm text-[#e3f2fd]/90 leading-relaxed font-medium">
                You've been invited to join an organization on the Umunthuhub-Foods platform. Verify your email to accept and get started.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="relative z-10 pt-10 space-y-4 border-t border-white/15 mt-6">
            {[
              'Secure team onboarding with OTP verification',
              'Instant access to organization resources',
              'Role-based permissions and dashboard access',
            ].map((point) => (
              <div key={point} className="flex items-center gap-3 text-sm text-[#e3f2fd]">
                <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-white font-bold">
                  ✓
                </span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className={`md:col-span-7 p-8 sm:p-12 flex flex-col justify-center space-y-7 ${
          themeMode === 'dark' ? 'bg-[#242625]/95' : 'bg-white/95'
        }`}>

          <div>
            <h3 className={`font-heading font-extrabold text-2xl mb-2 ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              {otpSent ? 'Enter Verification Code' : 'Accept Your Invitation'}
            </h3>
            <p className={`text-sm ${
              themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
            }`}>
              {otpSent 
                ? 'Enter the 6-digit code sent to your email to complete verification.'
                : 'Enter your work email to receive a secure verification code.'
              }
            </p>
          </div>

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div className="space-y-1.5">
                <label className={`font-heading font-bold text-sm ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>Work Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className={`w-full px-4 py-3 rounded-xl text-sm font-semibold ${
                    themeMode === 'dark' 
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] placeholder-[#7a7a7a]' 
                      : 'glass-input'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-[#24619d] hover:bg-[#1a4a7a] disabled:opacity-60 text-white font-heading font-bold text-sm shadow-lg shadow-[#24619d]/25 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-[20px] h-[20px] animate-spin" />
                    <span>Sending code…</span>
                  </>
                ) : (
                  <>
                    <Send className="w-[20px] h-[20px]" />
                    <span>Send Verification Code</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="space-y-4">
                <label className={`font-heading font-bold text-sm ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>Enter 6-Digit Code</label>
                
                <div className="flex gap-2 justify-between">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all ${
                        themeMode === 'dark' 
                          ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] focus:border-[#24619d] focus:ring-2 focus:ring-[#24619d]/20' 
                          : 'bg-white border-[#e1bfb5] text-[#1a1c1c] focus:border-[#24619d] focus:ring-2 focus:ring-[#24619d]/20'
                      }`}
                    />
                  ))}
                </div>

                {/* Demo hint */}
                <div className={`text-[11px] text-center ${
                  themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                }`}>
                  Demo code: 123456
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-[#24619d] hover:bg-[#1a4a7a] disabled:opacity-60 text-white font-heading font-bold text-sm shadow-lg shadow-[#24619d]/25 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-[20px] h-[20px] animate-spin" />
                    <span>Verifying…</span>
                  </>
                ) : (
                  <>
                    <Check className="w-[20px] h-[20px]" />
                    <span>Verify & Accept Invitation</span>
                  </>
                )}
              </button>

              {/* Resend option */}
              <div className="text-center pt-2">
                {countdown > 0 ? (
                  <p className={`text-xs ${
                    themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
                  }`}>
                    Resend code in {countdown}s
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isSubmitting}
                    className={`text-xs font-bold hover:underline cursor-pointer ${
                      themeMode === 'dark' ? 'text-[#24619d]' : 'text-[#24619d]'
                    }`}
                  >
                    Resend verification code
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Back to Login */}
          <div className="pt-4 border-t">
            <button
              type="button"
              onClick={onBackToLogin}
              className={`flex items-center gap-2 text-sm font-bold hover:underline cursor-pointer ${
                themeMode === 'dark' ? 'text-[#c4c4c4] hover:text-[#f5f5f5]' : 'text-[#594139] hover:text-[#1a1c1c]'
              }`}
            >
              <ArrowLeft className="w-[18px] h-[18px]" />
              <span>Back to Sign In</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
