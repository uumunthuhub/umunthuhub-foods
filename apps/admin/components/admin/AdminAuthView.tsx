 'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { dbService } from '../../db/indexedDB';
import { ForgotPassword } from './ForgotPassword';
import { InviteScreen } from './InviteScreen';

interface AdminAuthViewProps {
  onLoginSuccess: (mode: 'existing' | 'new_no_org' | 'incomplete_step', email?: string) => void;
  /** Pre-select the tab when the view opens */
  initialMode?: 'login' | 'register' | 'invite';
}

export const AdminAuthView: React.FC<AdminAuthViewProps> = ({
  onLoginSuccess,
  initialMode = 'login',
}) => {
  const { showToast, themeMode } = useApp();
  const [authMode, setAuthMode] = useState<'login' | 'register'>(
    initialMode === 'invite' ? 'login' : initialMode
  );
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showInviteScreen, setShowInviteScreen] = useState(initialMode === 'invite');

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [businessType, setBusinessType] = useState('Restaurant Group');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Testimonials data
  const testimonials = [
    {
      text: "Umunthuhub transformed our multi-restaurant operations. Real-time KDS and fleet integration cut delivery times by 40%.",
      author: "Sarah Chen",
      role: "Operations Director, Vance Hospitality"
    },
    {
      text: "The platform's commission automation and tenant onboarding tools saved us 20+ hours weekly in manual admin work.",
      author: "Michael Rossi",
      role: "CEO, Metro Food Group"
    },
    {
      text: "Best multi-tenant dispatch system we've used. Rider management and order tracking are seamless.",
      author: "David Kim",
      role: "Founder, Kitchen Collective"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  // 'idle' -> resting in place
  // 'out'  -> currently sliding/fading out to the left
  // 'in'   -> new testimonial sliding/fading in from the right
  const [transitionState, setTransitionState] = useState<'idle' | 'out' | 'in'>('idle');

  // Auto-rotate testimonials with a slow, smooth slide-left + fade
  React.useEffect(() => {
    const ROTATE_INTERVAL = 6000; // how long each testimonial stays fully visible
    const OUT_DURATION = 700;     // how long the slide-out/fade-out takes

    const interval = setInterval(() => {
      // Step 1: slide/fade the current testimonial out to the left
      setTransitionState('out');

      // Step 2: once it's fully faded out, swap content and slide the new one in from the right
      const outTimer = setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setTransitionState('in');

        // Step 3: after a tick, settle into idle so the "in" transition can animate
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTransitionState('idle');
          });
        });
      }, OUT_DURATION);

      return () => clearTimeout(outTimer);
    }, ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email) return;

    setIsSubmitting(true);

    // Tiny artificial delay for prototype realism
    await new Promise((r) => setTimeout(r, 600));

    if (authMode === 'register') {
      // Generate organization ID from org name
      const organizationId = 'org-' + (orgName || 'my-organization').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      // Save user to local storage via dbService
      dbService.registerUser({
        email,
        fullName: fullName || 'Admin User',
        orgName: orgName || 'My Organization',
        organizationId,
        businessType,
      });
      showToast(
        'Enterprise Account Created 🎉',
        `Organization "${orgName || 'My Organization'}" registered. Launching setup wizard.`,
        'success'
      );
      setIsSubmitting(false);
      onLoginSuccess('new_no_org');
    } else {
      // PROTOTYPE MODE: Allow any email/password for demo purposes
      // In production, this would validate against a real auth backend
      const user = dbService.findUserByEmail(email);
      const displayName = user?.fullName || email.split('@')[0];
      
      showToast(
        `Welcome back, ${displayName}!`,
        `Prototype mode: Authenticated as ${email}. Loading your admin console.`,
        'success'
      );
      setIsSubmitting(false);
      onLoginSuccess('existing', email);
    }
  };

  if (showInviteScreen) {
    return (
      <InviteScreen 
        onBackToLogin={() => setShowInviteScreen(false)} 
        onInviteSuccess={(userEmail) => {
          setShowInviteScreen(false);
          onLoginSuccess('existing', userEmail);
        }}
      />
    );
  }

  if (showForgotPassword) {
    return (
      <ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />
    );
  }

  return (
    <div className={`max-w-5xl mx-auto py-8 px-3 sm:px-6 ${
      themeMode === 'dark' ? 'bg-[#1a1c1c]' : 'bg-[#fcf9f8]'
    }`}>
      {/* Container Box */}
      <div className={`rounded-3xl overflow-hidden border shadow-xl grid grid-cols-1 md:grid-cols-12 ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]/50'
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>

        {/* Left Side: Brand Showcase Banner */}
        <div className="md:col-span-5 bg-linear-to-br from-[#ab3500] via-[#8d2a00] to-[#591a00] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background graphic glow */}
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#ff6b35]/20 rounded-full blur-3xl pointer-events-none" />

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
                  Umunthuhub<span className="text-[#ffe0b2]">-Foods</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#ffcc80]">
                  Admin Platform
                </span>
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white leading-tight">
                {authMode === 'login' ? 'Welcome Back' : 'Get Started'}
              </h2>
              <p className="text-sm text-white/90 leading-relaxed font-medium">
                {authMode === 'login'
                  ? 'Sign in to access your tenant dashboard, manage orders, kitchen displays, and platform operations.'
                  : 'Register your organization to onboard tenants, configure commission rates, and manage delivery fleets.'}
              </p>
            </div>
          </div>

          {/* Auto-scrolling Testimonials */}
          <div className="relative z-10 my-6 overflow-hidden">
            <div
              className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all ease-in-out ${
                transitionState === 'out'
                  ? 'opacity-0 -translate-x-8 duration-700'
                  : transitionState === 'in'
                  ? 'opacity-0 translate-x-8 duration-0'
                  : 'opacity-100 translate-x-0 duration-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ffcc80] flex items-center justify-center shrink-0">
                  <span className="text-[#ab3500] font-bold text-sm">"</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/95 italic leading-relaxed mb-3 line-clamp-3">
                    {testimonials[currentTestimonial].text}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      {testimonials[currentTestimonial].author}
                    </span>
                    <span className="text-[10px] text-white/70">
                      • {testimonials[currentTestimonial].role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features / Value Prop */}
          <div className="relative z-10 space-y-4 border-t border-white/15 mt-auto pt-6">
            {[
              'Real-time order dispatching & KDS',
              'Multi-tenant vendor configuration',
              'Integrated rider fleet management',
            ].map((point) => (
              <div key={point} className="flex items-center gap-3 text-sm text-white/90">
                <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-white font-bold">
                  ✓
                </span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className={`md:col-span-7 p-8 sm:p-12 flex flex-col ${
          themeMode === 'dark' ? 'bg-[#242625]/95' : 'bg-white/95'
        }`}>
          <div>
            {/* Header Tabs */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#e1bfb5]/30">
              <div>
                <h3 className={`font-heading font-extrabold text-2xl ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>
                  {authMode === 'login' ? 'Sign In to Admin' : 'Register Organization'}
                </h3>
                <p className={`text-xs mt-1 ${
                  themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                }`}>
                  {authMode === 'login'
                    ? 'Enter your credentials to manage your store'
                    : 'Create a new account for your business'}
                </p>
              </div>

              {/* Mode Toggle */}
              <div className={`flex rounded-2xl p-1 border ${
                themeMode === 'dark'
                  ? 'bg-[#1a1c1c] border-[#3a3a3a]'
                  : 'bg-[#fcf9f8] border-[#e1bfb5]/50'
              }`}>
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-linear-to-br from-[#ab3500] to-[#8a2a00] text-white shadow-md'
                      : themeMode === 'dark' ? 'text-[#c4c4c4] hover:text-[#f5f5f5]' : 'text-[#594139] hover:text-[#1a1c1c]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setErrorMsg(''); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    authMode === 'register'
                      ? 'bg-linear-to-br from-[#ab3500] to-[#8a2a00] text-white shadow-md'
                      : themeMode === 'dark' ? 'text-[#c4c4c4] hover:text-[#f5f5f5]' : 'text-[#594139] hover:text-[#1a1c1c]'
                  }`}
                >
                  Register
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'register' && (
                <>
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wider ${
                      themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                    }`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium transition-all outline-none ${
                        themeMode === 'dark'
                          ? 'bg-[#1a1c1c] border-[#3a3a3a] text-[#f5f5f5] focus:border-[#ff6b35]'
                          : 'bg-[#fcf9f8] border-[#e1bfb5] text-[#1a1c1c] focus:border-[#ab3500]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wider ${
                      themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                    }`}>
                      Organization / Business Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Hospitality Group"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium transition-all outline-none ${
                        themeMode === 'dark'
                          ? 'bg-[#1a1c1c] border-[#3a3a3a] text-[#f5f5f5] focus:border-[#ff6b35]'
                          : 'bg-[#fcf9f8] border-[#e1bfb5] text-[#1a1c1c] focus:border-[#ab3500]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wider ${
                      themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                    }`}>
                      Business Type
                    </label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium transition-all outline-none ${
                        themeMode === 'dark'
                          ? 'bg-[#1a1c1c] border-[#3a3a3a] text-[#f5f5f5] focus:border-[#ff6b35]'
                          : 'bg-[#fcf9f8] border-[#e1bfb5] text-[#1a1c1c] focus:border-[#ab3500]'
                      }`}
                    >
                      <option value="Restaurant Group">Restaurant Group</option>
                      <option value="Single Kitchen / Cafe">Single Kitchen / Cafe</option>
                      <option value="Delivery Fleet Operator">Delivery Fleet Operator</option>
                      <option value="Corporate Catering Manager">Corporate Catering Manager</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wider ${
                  themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                }`}>
                  Work Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@yourcompany.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium transition-all outline-none ${
                    themeMode === 'dark'
                      ? 'bg-[#1a1c1c] border-[#3a3a3a] text-[#f5f5f5] focus:border-[#ff6b35]'
                      : 'bg-[#fcf9f8] border-[#e1bfb5] text-[#1a1c1c] focus:border-[#ab3500]'
                  }`}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={`block text-xs font-bold uppercase tracking-wider ${
                    themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
                  }`}>
                    Password
                  </label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className={`text-xs font-bold hover:underline cursor-pointer ${
                        themeMode === 'dark' ? 'text-[#ff6b35]' : 'text-[#ab3500]'
                      }`}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium transition-all outline-none ${
                    themeMode === 'dark'
                      ? 'bg-[#1a1c1c] border-[#3a3a3a] text-[#f5f5f5] focus:border-[#ff6b35]'
                      : 'bg-[#fcf9f8] border-[#e1bfb5] text-[#1a1c1c] focus:border-[#ab3500]'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl font-bold text-sm text-white bg-linear-to-br from-[#ab3500] via-[#8d2a00] to-[#591a00] hover:opacity-95 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{authMode === 'login' ? 'Authenticating…' : 'Creating account…'}</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>{authMode === 'login' ? 'Authenticate & Enter Admin Console' : 'Create Organization & Start Setup Wizard'}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom Switcher */}
          <div className="mt-4 pt-4 border-t border-[#e1bfb5]/30 text-center">
            <p className={`text-xs ${
              themeMode === 'dark' ? 'text-[#c4c4c4]' : 'text-[#594139]'
            }`}>
              {authMode === 'login' ? (
                <>
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setAuthMode('register'); setErrorMsg(''); }}
                    className={`font-bold hover:underline cursor-pointer ${
                      themeMode === 'dark' ? 'text-[#ff6b35]' : 'text-[#ab3500]'
                    }`}
                  >
                    Register your organization
                  </button>
                  <span className="mx-2">|</span>
                  <button
                    type="button"
                    onClick={() => setShowInviteScreen(true)}
                    className={`font-bold hover:underline cursor-pointer ${
                      themeMode === 'dark' ? 'text-[#90caf9]' : 'text-[#24619d]'
                    }`}
                  >
                    I was invited
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
                    className={`font-bold hover:underline cursor-pointer ${
                      themeMode === 'dark' ? 'text-[#ff6b35]' : 'text-[#ab3500]'
                    }`}
                  >
                    Sign in instead
                  </button>
                  <span className="mx-2">|</span>
                  <button
                    type="button"
                    onClick={() => setShowInviteScreen(true)}
                    className={`font-bold hover:underline cursor-pointer ${
                      themeMode === 'dark' ? 'text-[#90caf9]' : 'text-[#24619d]'
                    }`}
                  >
                    I was invited
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};