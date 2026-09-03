"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { ThemeToggle } from "./ThemeToggle";
import {
  Utensils,
  Menu,
  X,
  ArrowRight,
  Store,
  Bike,
  Building2,
  Shield,
} from "lucide-react";

type Persona = "vendor" | "rider" | "admin" | "corporate";

interface WelcomeScreenProps {
  onPersonaSelect: (persona: Persona) => void;
  /** Whether the current visitor is logged in at all */
  isAuthenticated: boolean;
  /**
   * The persona/role tied to the logged-in account.
   * null/undefined when isAuthenticated is false.
   * 'admin' is treated as "can see every portal".
   */
  userRole?: Persona | null;
  onSignIn?: () => void;
  onRegister?: () => void;
  onInvite?: () => void;
}

const testimonials = [
  {
    text: "UmunthuHub transformed our restaurant operations. Orders flow seamlessly and our kitchen efficiency increased by 40%.",
    author: "Sarah Chen",
    role: "Restaurant Owner, The Green Bistro",
    avatar: "SC",
    accent: "#ab3500",
  },
  {
    text: "As a rider, the app gives me complete control over my schedule and earnings. The GPS navigation is spot-on every time.",
    author: "Michael Rossi",
    role: "Elite Courier, 2+ Years",
    avatar: "MR",
    accent: "#24619d",
  },
  {
    text: "The corporate portal made managing our team lunches effortless. Bulk ordering and delivery tracking are game-changers.",
    author: "David Kim",
    role: "Operations Manager, TechCorp",
    avatar: "DK",
    accent: "#8d7168",
  },
  {
    text: "Platform-wide analytics give us real insights into our ecosystem. The admin tools are powerful yet intuitive.",
    author: "Amanda Foster",
    role: "Platform Executive",
    avatar: "AF",
    accent: "#006c4f",
  },
  {
    text: "Onboarding took a single afternoon. Our menu, hours, and payouts were live before dinner service that same night.",
    author: "Grace Banda",
    role: "Owner, Lilongwe Grill House",
    avatar: "GB",
    accent: "#ab3500",
  },
  {
    text: "Route batching alone pays for the app. I finish my shift earlier and my fuel spend dropped noticeably.",
    author: "Thoko Mvula",
    role: "Courier Partner",
    avatar: "TM",
    accent: "#24619d",
  },
];

const PORTAL_ACTIONS: Array<{
  key: Persona;
  label: string;
  icon: string;
  accent: string;
}> = [
  {
    key: "vendor",
    label: "Vendor Portal",
    icon: "storefront",
    accent: "#ab3500",
  },
  {
    key: "rider",
    label: "Rider Portal",
    icon: "electric_moped",
    accent: "#24619d",
  },
  {
    key: "admin",
    label: "Admin Portal",
    icon: "admin_panel_settings",
    accent: "#006c4f",
  },
  {
    key: "corporate",
    label: "Corporate Portal",
    icon: "business",
    accent: "#8d7168",
  },
];

const PRODUCTS: Array<{
  id: string;
  icon: string;
  title: string;
  desc: string;
  tag: string;
  accent: string;
}> = [
  {
    id: "vendor",
    icon: "storefront",
    title: "Storefront & Online Ordering",
    desc: "Branded ordering pages for every tenant, with live menus, real-time order status, and zero setup fees.",
    tag: "For Vendors",
    accent: "#ab3500",
  },
  {
    id: "vendor",
    icon: "inventory_2",
    title: "Menu & Inventory Sync",
    desc: "Update prices, 86 an item, or launch a new menu across every channel in seconds — no double entry.",
    tag: "For Vendors",
    accent: "#ab3500",
  },
  {
    id: "rider",
    icon: "alt_route",
    title: "Smart Dispatch & Routing",
    desc: "Automated batching and route optimization gets riders more drops per hour with less driving.",
    tag: "For Riders",
    accent: "#24619d",
  },
  {
    id: "admin",
    icon: "payments",
    title: "Payments & Instant Payouts",
    desc: "Built-in checkout, split settlements, and same-day payouts for vendors and riders alike.",
    tag: "Platform-wide",
    accent: "#006c4f",
  },
  {
    id: "corporate",
    icon: "business",
    title: "Corporate Bulk Ordering",
    desc: "Centralized billing, scheduled team meals, and approval workflows for company food programs.",
    tag: "For Corporate",
    accent: "#8d7168",
  },
  {
    id: "admin",
    icon: "monitoring",
    title: "Analytics & Insights",
    desc: "Real-time dashboards on sales, delivery performance, and tenant health across the whole platform.",
    tag: "For Admins",
    accent: "#006c4f",
  },
];

const NAV_LINKS: Array<{ label: string; href: string }> = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

const FOOTER_LINKS: Array<{ heading: string; links: string[] }> = [
  {
    heading: "Platform",
    links: [
      "Vendor Portal",
      "Rider Portal",
      "Admin Portal",
      "Corporate Portal",
    ],
  },
  { heading: "Company", links: ["About UmunthuHub", "Careers", "Press"] },
  { heading: "Support", links: ["Help Center", "Contact Us", "System Status"] },
  {
    heading: "Legal",
    links: ["Terms of Service", "Privacy Policy", "Vendor Agreement"],
  },
];

const TestimonialCard: React.FC<{
  t: (typeof testimonials)[number];
  themeMode: "light" | "dark";
}> = ({ t, themeMode }) => (
  <div
    className={`shrink-0 w-85 md:w-95 mx-3 rounded-2xl backdrop-blur-xl border p-6 shadow-lg ${
      themeMode === "dark"
        ? "bg-[#242625]/70 border-[#3a3a3a]/60"
        : "bg-white/70 border-white/60"
    }`}
  >
    <div className="flex items-start gap-4">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-heading font-bold text-sm text-white"
        style={{
          background: `linear-gradient(135deg, ${t.accent}, ${t.accent}cc)`,
        }}
      >
        {t.avatar}
      </div>
      <div className="min-w-0">
        <p
          className={`text-[13.5px] leading-relaxed mb-3 line-clamp-4 ${
            themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
          }`}
        >
          "{t.text}"
        </p>
        <p
          className={`font-heading font-bold text-sm truncate ${
            themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
          }`}
        >
          {t.author}
        </p>
        <p
          className={`text-xs truncate ${
            themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
          }`}
        >
          {t.role}
        </p>
      </div>
    </div>
  </div>
);

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onPersonaSelect,
  isAuthenticated,
  userRole,
  onSignIn,
  onRegister,
  onInvite,
}) => {
  const { themeMode, toggleThemeMode } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const topRow = useMemo(() => {
    const row = testimonials.filter((_, i) => i % 2 === 0);
    return [...row, ...row, ...row];
  }, []);
  const bottomRow = useMemo(() => {
    const row = testimonials.filter((_, i) => i % 2 === 1);
    return [...row, ...row, ...row];
  }, []);

  // Only show portal actions the logged-in account is actually entitled to.
  // Admin accounts can see every portal; everyone else only sees their own.
  const visiblePortals = useMemo(() => {
    if (!isAuthenticated || !userRole) return [];
    if (userRole === "admin") return PORTAL_ACTIONS;
    return PORTAL_ACTIONS.filter((p) => p.key === userRole);
  }, [isAuthenticated, userRole]);

  const handleGetStarted = () => {
    if (isAuthenticated && userRole) {
      onPersonaSelect(userRole);
    } else {
      onRegister?.();
    }
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden flex flex-col ${
        themeMode === "dark"
          ? "bg-linear-to-br from-[#1a1c1c] via-[#242625] to-[#1a1c1c]"
          : "bg-linear-to-br from-[#fcf9f8] via-white to-[#f0e8e6]"
      }`}
    >
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }
        .marquee-track-left {
          animation: marquee-left 42s linear infinite;
        }
        .marquee-track-right {
          animation: marquee-right 42s linear infinite;
        }
        .marquee-row:hover .marquee-track-left,
        .marquee-row:hover .marquee-track-right {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track-left, .marquee-track-right { animation: none; }
        }
      `}</style>

      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl ${
            themeMode === "dark" ? "bg-[#ab3500]/10" : "bg-[#ab3500]/5"
          }`}
        />
        <div
          className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl ${
            themeMode === "dark" ? "bg-[#24619d]/10" : "bg-[#24619d]/5"
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full blur-3xl ${
            themeMode === "dark" ? "bg-[#006c4f]/10" : "bg-[#006c4f]/5"
          }`}
        />
      </div>

      {/* Glassy header */}
      <header className="fixed top-4 left-4 right-4 z-50">
        <div className="max-w-7xl mx-auto">
          <div
            className={`backdrop-blur-xl rounded-2xl shadow-2xl border px-5 py-3 ${
              themeMode === "dark"
                ? "bg-[#242625]/80 border-[#3a3a3a]/50"
                : "bg-white/80 border-white/50"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              {/* Brand */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#ab3500] to-[#8a2a00] flex items-center justify-center shadow-lg">
                  <Utensils className="w-5.5 h-5.5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1
                    className={`font-heading font-extrabold text-[15px] leading-tight tracking-tight ${
                      themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                    }`}
                  >
                    UmunthuHub
                  </h1>
                  <p
                    className={`text-[10px] leading-tight ${
                      themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
                    }`}
                  >
                    Food Delivery Ecosystem
                  </p>
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-9 h-9 rounded-xl border flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: themeMode === "dark" ? "#383a39" : "#f3f3f3",
                  borderColor:
                    themeMode === "dark" ? "#3a3a3a/50" : "#e1bfb5/50",
                }}
              >
                {isMobileMenuOpen ? (
                  <X
                    className="w-5.5 h-5.5"
                    style={{
                      color: themeMode === "dark" ? "#f5f5f5" : "#594139",
                    }}
                  />
                ) : (
                  <Menu
                    className="w-5.5 h-5.5"
                    style={{
                      color: themeMode === "dark" ? "#f5f5f5" : "#594139",
                    }}
                  />
                )}
              </button>

              {/* Primary site nav — desktop only */}
              <nav className="hidden md:flex items-center gap-1 shrink-0">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      themeMode === "dark"
                        ? "text-[#c4c4c4] hover:text-[#f5f5f5] hover:bg-white/5"
                        : "text-[#594139] hover:text-[#1a1c1c] hover:bg-black/3"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Portal actions — desktop only */}
              {isAuthenticated && visiblePortals.length > 0 && (
                <nav className="hidden md:flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {visiblePortals.map((p) => (
                    <button
                      key={p.key}
                      onClick={() => onPersonaSelect(p.key)}
                      className="group flex items-center gap-1.5 pl-2.5 pr-3 py-2 rounded-xl border border-black/4 bg-black/2 hover:bg-black/5 hover:border-black/8 transition-all duration-200 shrink-0"
                    >
                      {p.key === "vendor" ? (
                        <Store
                          className="w-4.5 h-4.5"
                          style={{ color: p.accent }}
                        />
                      ) : p.key === "rider" ? (
                        <Bike
                          className="w-4.5 h-4.5"
                          style={{ color: p.accent }}
                        />
                      ) : p.key === "admin" ? (
                        <Shield
                          className="w-4.5 h-4.5"
                          style={{ color: p.accent }}
                        />
                      ) : (
                        <Building2
                          className="w-4.5 h-4.5"
                          style={{ color: p.accent }}
                        />
                      )}
                      <span className="hidden lg:inline text-xs font-semibold text-[#1a1c1c] whitespace-nowrap">
                        {p.label}
                      </span>
                    </button>
                  ))}
                </nav>
              )}

              {/* Right side actions — desktop only */}
              <div className="hidden md:flex items-center gap-2 shrink-0">
                {/* Status */}
                <div className="flex items-center gap-2 bg-[#00ae81]/10 px-3 py-1.5 rounded-xl border border-[#00ae81]/20">
                  <span className="w-2 h-2 rounded-full bg-[#00ae81] animate-pulse" />
                  <span className="text-[11px] font-bold text-[#006c4f]">
                    Online
                  </span>
                </div>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Auth actions — only for guests */}
                {!isAuthenticated && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onSignIn}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        themeMode === "dark"
                          ? "text-[#f5f5f5] hover:bg-white/5"
                          : "text-[#1a1c1c] hover:bg-black/4"
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={onRegister}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-linear-to-br from-[#ab3500] to-[#8a2a00] shadow-md hover:shadow-lg transition-all"
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu dropdown */}
            {isMobileMenuOpen && (
              <div
                className={`md:hidden mt-4 pt-4 border-t space-y-4 ${
                  themeMode === "dark"
                    ? "border-[#3a3a3a]/50"
                    : "border-white/50"
                }`}
              >
                {/* Mobile nav links */}
                <nav className="flex flex-col gap-2">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        themeMode === "dark"
                          ? "text-[#c4c4c4] hover:text-[#f5f5f5] hover:bg-white/5"
                          : "text-[#594139] hover:text-[#1a1c1c] hover:bg-black/3"
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                {/* Mobile portal actions */}
                {isAuthenticated && visiblePortals.length > 0 && (
                  <nav className="flex flex-col gap-2">
                    {visiblePortals.map((p) => (
                      <button
                        key={p.key}
                        onClick={() => {
                          onPersonaSelect(p.key);
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-xl border border-black/4 bg-black/2 hover:bg-black/5 transition-all"
                      >
                        {p.key === "vendor" ? (
                          <Store
                            className="w-4.5 h-4.5"
                            style={{ color: p.accent }}
                          />
                        ) : p.key === "rider" ? (
                          <Bike
                            className="w-4.5 h-4.5"
                            style={{ color: p.accent }}
                          />
                        ) : p.key === "admin" ? (
                          <Shield
                            className="w-4.5 h-4.5"
                            style={{ color: p.accent }}
                          />
                        ) : (
                          <Building2
                            className="w-4.5 h-4.5"
                            style={{ color: p.accent }}
                          />
                        )}
                        <span className="text-xs font-semibold text-[#1a1c1c]">
                          {p.label}
                        </span>
                      </button>
                    ))}
                  </nav>
                )}

                {/* Mobile status */}
                <div className="flex items-center gap-2 bg-[#00ae81]/10 px-3 py-1.5 rounded-xl border border-[#00ae81]/20">
                  <span className="w-2 h-2 rounded-full bg-[#00ae81] animate-pulse" />
                  <span className="text-[11px] font-bold text-[#006c4f]">
                    Online
                  </span>
                </div>

                {/* Mobile theme toggle */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold ${
                      themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
                    }`}
                  >
                    Theme
                  </span>
                  <ThemeToggle />
                </div>

                {/* Mobile auth actions */}
                {!isAuthenticated && (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        onSignIn?.();
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        themeMode === "dark"
                          ? "text-[#f5f5f5] hover:bg-white/5"
                          : "text-[#1a1c1c] hover:bg-black/4"
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        onRegister?.();
                        setIsMobileMenuOpen(false);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-linear-to-br from-[#ab3500] to-[#8a2a00] shadow-md hover:shadow-lg transition-all"
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <main
        id="home"
        className="max-w-7xl mx-auto px-6 pt-36 pb-20 relative flex-1 w-full scroll-mt-24"
      >
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm mb-6 ${
              themeMode === "dark"
                ? "bg-[#242625]/70 border-[#3a3a3a]/60"
                : "bg-white/70 border-white/60"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ab3500]" />
            <span
              className={`text-xs font-semibold tracking-wide ${
                themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
              }`}
            >
              Multi-tenant delivery, one platform
            </span>
          </div>
          <h2
            className={`font-heading font-extrabold text-5xl md:text-7xl mb-6 leading-[1.05] tracking-tight ${
              themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
            }`}
          >
            Welcome to the
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ab3500] to-[#8a2a00]">
              {" "}
              Future of Food
            </span>
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto leading-relaxed mb-8 ${
              themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
            }`}
          >
            Choose your portal above to manage restaurants, deliver orders,
            oversee operations, or coordinate corporate programs — all in one
            ecosystem.
          </p>

          {/* Primary call to action */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={handleGetStarted}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-white bg-linear-to-br from-[#ab3500] to-[#8a2a00] shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>{isAuthenticated ? "Go to My Portal" : "Get Started"}</span>
              <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-0.5" />
            </button>
            {!isAuthenticated && (
              <button
                onClick={onSignIn}
                className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold backdrop-blur-xl border shadow-md transition-all duration-200 ${
                  themeMode === "dark"
                    ? "text-[#f5f5f5] bg-[#242625]/70 border-[#3a3a3a]/60 hover:bg-[#242625]/90"
                    : "text-[#1a1c1c] bg-white/70 border-white/60 hover:bg-white/90"
                }`}
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Products showcase */}
        <div id="about" className="mb-20 scroll-mt-28">
          <div className="text-center mb-10">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm mb-5 ${
                themeMode === "dark"
                  ? "bg-[#242625]/70 border-[#3a3a3a]/60"
                  : "bg-white/70 border-white/60"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#006c4f]" />
              <span
                className={`text-xs font-semibold tracking-wide ${
                  themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
                }`}
              >
                What's inside UmunthuHub
              </span>
            </div>
            <h3
              className={`font-heading font-extrabold text-3xl md:text-4xl mb-3 tracking-tight ${
                themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
              }`}
            >
              Every product your food business needs
            </h3>
            <p
              className={`text-base max-w-2xl mx-auto leading-relaxed ${
                themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
              }`}
            >
              One multitenant platform, built end-to-end — from the storefront
              to the last mile to the back office.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((product) => (
              <div
                key={product.title}
                className={`group backdrop-blur-xl rounded-3xl p-7 shadow-lg border transition-all duration-300 ${
                  themeMode === "dark"
                    ? "bg-[#242625]/70 border-[#3a3a3a]/50 hover:bg-[#242625]/90"
                    : "bg-white/70 border-white/50 hover:bg-white/80"
                } hover:shadow-2xl`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all"
                    style={{ background: `${product.accent}1a` }}
                  >
                    {product.id === "vendor" ? (
                      <Store
                        className="w-7 h-7"
                        style={{ color: product.accent }}
                      />
                    ) : product.id === "rider" ? (
                      <Bike
                        className="w-7 h-7"
                        style={{ color: product.accent }}
                      />
                    ) : product.id === "admin" ? (
                      <Shield
                        className="w-7 h-7"
                        style={{ color: product.accent }}
                      />
                    ) : (
                      <Building2
                        className="w-7 h-7"
                        style={{ color: product.accent }}
                      />
                    )}
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
                    style={{
                      color: product.accent,
                      background: `${product.accent}14`,
                    }}
                  >
                    {product.tag}
                  </span>
                </div>
                <h4
                  className={`font-heading font-bold text-lg mb-2.5 ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  {product.title}
                </h4>
                <p
                  className={`text-sm leading-relaxed ${
                    themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
                  }`}
                >
                  {product.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-scrolling dual-direction testimonials */}
        <div className="mb-20 -mx-6">
          <div
            className="marquee-row relative overflow-hidden mb-4"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="flex w-max marquee-track-left">
              {topRow.map((t, i) => (
                <TestimonialCard key={`top-${i}`} t={t} themeMode={themeMode} />
              ))}
            </div>
          </div>
          <div
            className="marquee-row relative overflow-hidden"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="flex w-max marquee-track-right">
              {bottomRow.map((t, i) => (
                <TestimonialCard
                  key={`bottom-${i}`}
                  t={t}
                  themeMode={themeMode}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Persona Cards — only shown for logged-in accounts entitled to that portal */}
        {isAuthenticated && visiblePortals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                persona: "vendor" as const,
                title: "Vendor Portal",
                desc: "Manage your restaurant, menu, and orders",
                icon: "storefront",
                accent: "#ab3500",
              },
              {
                persona: "rider" as const,
                title: "Rider Portal",
                desc: "Accept deliveries and track your earnings",
                icon: "delivery_dining",
                accent: "#24619d",
              },
              {
                persona: "admin" as const,
                title: "Admin Portal",
                desc: "Oversee platform operations and tenants",
                icon: "admin_panel_settings",
                accent: "#006c4f",
              },
              {
                persona: "corporate" as const,
                title: "Corporate Portal",
                desc: "Coordinate food programs for teams",
                icon: "business",
                accent: "#8b5cf6",
              },
            ]
              .filter((p) => visiblePortals.some((vp) => vp.key === p.persona))
              .map((p) => (
                <button
                  key={p.persona}
                  onClick={() => onPersonaSelect(p.persona)}
                  className={`group backdrop-blur-xl rounded-3xl p-6 shadow-lg border transition-all duration-300 text-left ${
                    themeMode === "dark"
                      ? "bg-[#242625]/70 border-[#3a3a3a]/50 hover:bg-[#242625]/90"
                      : "bg-white/70 border-white/50 hover:bg-white/80"
                  } hover:shadow-2xl`}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all"
                    style={{ background: `${p.accent}1a` }}
                  >
                    {p.persona === "vendor" ? (
                      <Store
                        className="w-6.5 h-6.5"
                        style={{ color: p.accent }}
                      />
                    ) : p.persona === "rider" ? (
                      <Bike
                        className="w-6.5 h-6.5"
                        style={{ color: p.accent }}
                      />
                    ) : p.persona === "admin" ? (
                      <Shield
                        className="w-6.5 h-6.5"
                        style={{ color: p.accent }}
                      />
                    ) : (
                      <Building2
                        className="w-6.5 h-6.5"
                        style={{ color: p.accent }}
                      />
                    )}
                  </div>
                  <h4
                    className={`font-heading font-bold text-lg mb-2 ${
                      themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                    }`}
                  >
                    {p.title}
                  </h4>
                  <p
                    className={`text-sm leading-relaxed ${
                      themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
                    }`}
                  >
                    {p.desc}
                  </p>
                </button>
              ))}
          </div>
        )}

        {/* Guests: prompt to register instead of persona cards */}
        {!isAuthenticated && (
          <div
            className={`backdrop-blur-xl rounded-3xl p-10 shadow-lg border text-center max-w-2xl mx-auto ${
              themeMode === "dark"
                ? "bg-[#242625]/70 border-[#3a3a3a]/50"
                : "bg-white/70 border-white/50"
            }`}
          >
            <h3
              className={`font-heading font-bold text-xl mb-2.5 ${
                themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
              }`}
            >
              Create an account to enter a portal
            </h3>
            <p
              className={`text-sm leading-relaxed mb-5 ${
                themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
              }`}
            >
              Register to access the vendor, rider, admin, or corporate portal
              tailored to your role.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onRegister}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-linear-to-br from-[#ab3500] to-[#8a2a00] shadow-md hover:shadow-lg transition-all"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16">
          <div
            className={`relative flex flex-col lg:flex-row items-center justify-between gap-8 rounded-3xl p-8 ${
              themeMode === "dark"
                ? "bg-linear-to-r from-[#ab3500] to-[#ff6b35]"
                : "bg-linear-to-r from-[#1a1c1c] to-[#2d2d2d]"
            }`}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className={`absolute -top-16 -right-16 w-72 h-72 rounded-full blur-3xl ${
                  themeMode === "dark" ? "bg-white/10" : "bg-white/10"
                }`}
              />
              <div
                className={`absolute -bottom-20 -left-10 w-80 h-80 rounded-full blur-3xl ${
                  themeMode === "dark" ? "bg-white/10" : "bg-white/10"
                }`}
              />
            </div>
            <div className="text-center lg:text-left relative z-10">
              <h3 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-3 leading-tight">
                Ready to join the UmunthuHub ecosystem?
              </h3>
              <p className="text-white/80 text-base max-w-xl">
                Whether you're running a kitchen, delivering orders, or managing
                a corporate program — get set up in minutes and start today.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center relative z-10">
              <button
                onClick={handleGetStarted}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-[#ab3500] bg-white shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>
                  {isAuthenticated ? "Go to My Portal" : "Get Started Free"}
                </span>
                <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-0.5" />
              </button>
              {!isAuthenticated && (
                <button
                  onClick={onSignIn}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-white border border-white/40 hover:bg-white/10 transition-all duration-200"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`relative border-t backdrop-blur-xl ${
          themeMode === "dark"
            ? "border-[#3a3a3a]/60 bg-[#242625]/60"
            : "border-[#1a1c1c]/6 bg-white/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#ab3500] to-[#8a2a00] flex items-center justify-center shadow-md">
                  <Utensils className="w-5.5 h-5.5 text-white" />
                </div>
                <h3
                  className={`font-heading font-extrabold text-lg ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  UmunthuHub
                </h3>
              </div>
              <p
                className={`text-sm leading-relaxed max-w-xs ${
                  themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
                }`}
              >
                The multi-tenant food delivery ecosystem connecting vendors,
                riders, admins, and corporate teams on one platform.
              </p>
              <div
                className={`flex items-center gap-2 mt-5 px-3 py-1.5 rounded-xl border w-fit ${
                  themeMode === "dark"
                    ? "bg-[#00ae81]/10 border-[#00ae81]/20"
                    : "bg-[#00ae81]/10 border-[#00ae81]/20"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#00ae81] animate-pulse" />
                <span className="text-[11px] font-bold text-[#006c4f]">
                  All systems online
                </span>
              </div>
            </div>

            {FOOTER_LINKS.map((col) => (
              <div key={col.heading}>
                <h4
                  className={`font-heading font-bold text-sm mb-4 ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  {col.heading}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className={`text-sm transition-colors ${
                          themeMode === "dark"
                            ? "text-[#c4c4c4] hover:text-[#ff6b35]"
                            : "text-[#594139] hover:text-[#ab3500]"
                        }`}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className={`mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
              themeMode === "dark"
                ? "border-[#3a3a3a]/60"
                : "border-[#1a1c1c]/6"
            }`}
          >
            <p
              className={`text-xs ${
                themeMode === "dark" ? "text-[#7a7a7a]" : "text-[#8d7168]"
              }`}
            >
              © {new Date().getFullYear()} UmunthuHub Foods. All rights
              reserved.
            </p>
            <div className="flex items-center gap-5">
              <a
                href="#"
                className={`text-xs transition-colors ${
                  themeMode === "dark"
                    ? "text-[#c4c4c4] hover:text-[#ff6b35]"
                    : "text-[#594139] hover:text-[#ab3500]"
                }`}
              >
                Twitter
              </a>
              <a
                href="#"
                className={`text-xs transition-colors ${
                  themeMode === "dark"
                    ? "text-[#c4c4c4] hover:text-[#ff6b35]"
                    : "text-[#594139] hover:text-[#ab3500]"
                }`}
              >
                LinkedIn
              </a>
              <a
                href="#"
                className={`text-xs transition-colors ${
                  themeMode === "dark"
                    ? "text-[#c4c4c4] hover:text-[#ff6b35]"
                    : "text-[#594139] hover:text-[#ab3500]"
                }`}
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
