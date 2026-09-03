"use client";

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Check, ArrowRight, Utensils, UserPlus } from "lucide-react";
import confetti from "canvas-confetti";

interface StoreSetupWizardProps {
  initialStep?: number;
  onComplete?: () => void;
  onCancel?: () => void;
}

export const StoreSetupWizard: React.FC<StoreSetupWizardProps> = ({
  initialStep = 1,
  onComplete,
  onCancel,
}) => {
  const {
    addTenantVenue,
    addMenuItem,
    setCurrentTenantId,
    setPersona,
    setVendorTab,
    setAdminTab,
    showToast,
    themeMode,
  } = useApp();

  const [step, setStep] = useState<number>(initialStep);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    orgName: "Vance Hospitality Group",
    orgTaxId: "EIN-8849-2026",
    name: "Artisan Woodfire Pizza Co.",
    slug: "artisan-woodfire-pizza",
    tagline:
      "Hand-stretched sourdough pizzas fired at 900°F in authentic volcanic stone",
    cuisine: "Woodfired Pizza",
    logo: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=200&auto=format&fit=crop&q=80",
    banner:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&auto=format&fit=crop&q=80",
    address: "742 Evergreen Terrace, Culinary Arts District",
    city: "San Francisco, CA",
    phone: "+1 (555) 890-4321",
    deliveryRadiusKm: 8,
    deliveryFee: 3.49,
    minOrder: 15.0,
    prepTimeAvg: 18,
    openingTime: "11:00 AM",
    closingTime: "10:30 PM",
    operatingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bankAccountName: "Artisan Woodfire Hospitality LLC",
    routingNumber: "121000358",
    accountNumber: "••••••••4892",
    taxId: "XX-XXXX8912",
    sanitationGrade: "Grade A - Certified",
    initialChefEmail: "chef.marco@woodfirepizza.com",
    initialChefRole: "Head Chef",
    starterItem1Name: "Margherita Burrata Rustica",
    starterItem1Price: 19.5,
    starterItem1Category: "Mains",
    starterItem2Name: "Truffle Garlic Herb Bread",
    starterItem2Price: 8.5,
    starterItem2Category: "Starters",
    skipSampleProducts: false,
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else if (onCancel) {
      onCancel();
    }
  };

  const handleFinalSubmit = async () => {
    setIsUploading(true);
    let finalLogo = formData.logo;
    let finalBanner = formData.banner;

    try {
      if (logoFile) {
        const logoData = new FormData();
        logoData.append('file', logoFile);
        const res = await fetch('/api/upload', { method: 'POST', body: logoData });
        if (res.ok) {
          const data = await res.json();
          finalLogo = data.secure_url;
        }
      }
      
      if (bannerFile) {
        const bannerData = new FormData();
        bannerData.append('file', bannerFile);
        const res = await fetch('/api/upload', { method: 'POST', body: bannerData });
        if (res.ok) {
          const data = await res.json();
          finalBanner = data.secure_url;
        }
      }
    } catch (error) {
      showToast('Upload Error', 'Failed to upload images. Using defaults.', 'error');
    } finally {
      setIsUploading(false);
    }

    // 1. Create the new Tenant
    const newSlug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");
    addTenantVenue({
      name: formData.name,
      slug: newSlug,
      tagline: formData.tagline,
      logo: finalLogo,
      banner: finalBanner,
      rating: 5.0,
      reviewsCount: 1,
      deliveryTime: `${formData.prepTimeAvg + 10}-${formData.prepTimeAvg + 20} min`,
      deliveryFee: formData.deliveryFee,
      minOrder: formData.minOrder,
      address: formData.address,
      city: formData.city,
      cuisine: formData.cuisine,
      tags: [
        formData.cuisine,
        "Fresh Ingredients",
        "Chef Signature",
        "New Arrival",
      ],
      isOpen: true,
      phone: formData.phone,
      prepTimeAvg: formData.prepTimeAvg,
      isFeatured: true,
    });

    const newTenantId = "tenant-" + newSlug;

    // 2. Add Starter Menu Items
    if (formData.starterItem1Name) {
      addMenuItem({
        tenantId: newTenantId,
        name: formData.starterItem1Name,
        description:
          "Authentic stone-oven baked with fresh San Marzano tomatoes and basil.",
        price: formData.starterItem1Price,
        category: formData.starterItem1Category as any,
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=80",
        inStock: true,
        prepTimeMinutes: formData.prepTimeAvg,
        isPopular: true,
        isVeg: true,
      });
    }

    if (formData.starterItem2Name) {
      addMenuItem({
        tenantId: newTenantId,
        name: formData.starterItem2Name,
        description:
          "Warm artisan crust brushed with roasted garlic butter and fresh thyme.",
        price: formData.starterItem2Price,
        category: formData.starterItem2Category as any,
        image:
          "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=500&auto=format&fit=crop&q=80",
        inStock: true,
        prepTimeMinutes: 10,
        isVeg: true,
      });
    }

    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
    });

    showToast(
      "Store Launched Successfully! 🎉",
      `${formData.name} is now live and accepting orders in the Umunthuhub-Foods ecosystem.`,
      "success",
    );

    // Switch context to newly created store
    setCurrentTenantId(newTenantId);

    // Navigation is handled by the caller's onComplete — do NOT set persona here
    if (onComplete) {
      onComplete();
    }
  };

  const stepsHeader = [
    { num: 1, title: "Brand & Identity", desc: "Name, logo, cuisine" },
    {
      num: 2,
      title: "Location & Delivery",
      desc: "Address, radius, min order",
    },
    { num: 3, title: "Kitchen Operations", desc: "Prep times & schedule" },
    { num: 4, title: "Banking & KYC", desc: "Direct payouts & license" },
    { num: 5, title: "Menu & Team Launch", desc: "Starter dishes & staff" },
  ];

  return (
    <div
      className={`max-w-6xl mx-auto space-y-6 pb-20 ${
        themeMode === "dark" ? "bg-[#1a1c1c]" : ""
      }`}
    >
      {/* Header */}
      <div
        className={`rounded-3xl p-7 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          themeMode === "dark"
            ? "bg-[#242625] border-[#3a3a3a]/50"
            : "glass-panel border-[#e1bfb5]/50"
        }`}
      >
        <div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-sm font-bold bg-[#ff6b35] text-white">
              STEP {step} OF {totalSteps}
            </span>
            <h1
              className={`font-heading font-extrabold text-2xl sm:text-3xl ${
                themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
              }`}
            >
              Store Setup & Kitchen Onboarding Wizard
            </h1>
          </div>
          <p
            className={`text-sm mt-1 ${
              themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
            }`}
          >
            Provision a new multi-tenant restaurant branch, configure delivery
            dispatch, and launch your digital kitchen.
          </p>
        </div>

        {onCancel && (
          <button
            onClick={onCancel}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold self-start sm:self-auto cursor-pointer ${
              themeMode === "dark"
                ? "bg-[#383a39] hover:bg-[#4a4a4a] text-[#c4c4c4]"
                : "bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#594139]"
            }`}
          >
            Exit Wizard
          </button>
        )}
      </div>

      {/* Progress Stepper */}
      <div
        className={`rounded-3xl p-5 sm:p-7 border ${
          themeMode === "dark"
            ? "bg-[#242625] border-[#3a3a3a]/50"
            : "glass-panel border-[#e1bfb5]/50"
        }`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {stepsHeader.map((s) => {
            const isCompleted = s.num < step;
            const isCurrent = s.num === step;
            return (
              <div
                key={s.num}
                onClick={() => s.num < step && setStep(s.num)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isCurrent
                    ? `${themeMode === "dark" ? "bg-[#ab3500]/10 border-[#ab3500]" : "bg-[#ab3500]/10 border-[#ab3500]"} shadow-sm`
                    : isCompleted
                      ? `${themeMode === "dark" ? "bg-[#00ae81]/10 border-[#00ae81]/50" : "bg-[#00ae81]/10 border-[#00ae81]/50"}`
                      : `${themeMode === "dark" ? "bg-[#383a39] border-[#3a3a3a]/40 opacity-70" : "bg-[#f9f9f9] border-[#e1bfb5]/40 opacity-70"}`
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold ${
                      isCurrent
                        ? "bg-[#ab3500] text-white"
                        : isCompleted
                          ? "bg-[#00ae81] text-white"
                          : themeMode === "dark"
                            ? "bg-[#3a3a3a] text-[#c4c4c4]"
                            : "bg-[#e1bfb5] text-[#594139]"
                    }`}
                  >
                    {isCompleted ? "✓" : s.num}
                  </span>
                  <span
                    className={`text-[12px] font-bold uppercase ${
                      themeMode === "dark" ? "text-[#7a7a7a]" : "text-[#8d7168]"
                    }`}
                  >
                    {isCurrent ? "Active" : isCompleted ? "Done" : "Pending"}
                  </span>
                </div>
                <h4
                  className={`font-heading font-bold text-sm truncate ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  {s.title}
                </h4>
                <p
                  className={`text-[11px] truncate ${
                    themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
                  }`}
                >
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content Body */}
      <div
        className={`rounded-3xl p-10 border space-y-7 ${
          themeMode === "dark"
            ? "bg-[#242625] border-[#3a3a3a]/50"
            : "glass-panel border-[#e1bfb5]/50"
        }`}
      >
        {/* STEP 1: Brand & Identity */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3
                className={`font-heading font-extrabold text-xl ${
                  themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                }`}
              >
                1. Restaurant Identity & Brand Assets
              </h3>
              <p
                className={`text-sm ${
                  themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
                }`}
              >
                How your store will appear to hungry diners across the
                Umunthuhub-Foods marketplace
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  className={`font-heading font-bold text-sm ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  Restaurant Trade Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Copper Kettle BBQ"
                  className={`w-full px-4 py-3 rounded-xl text-sm font-semibold ${
                    themeMode === "dark"
                      ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] placeholder-[#7a7a7a]"
                      : "glass-input"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label
                  className={`font-heading font-bold text-sm ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  Cuisine Type *
                </label>
                <select
                  value={formData.cuisine}
                  onChange={(e) =>
                    setFormData({ ...formData, cuisine: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl text-sm font-semibold ${
                    themeMode === "dark"
                      ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]"
                      : "glass-input bg-white"
                  }`}
                >
                  <option value="Woodfired Pizza">
                    Woodfired Pizza & Italian
                  </option>
                  <option value="Artisan Bowls">
                    Artisan Grain & Salad Bowls
                  </option>
                  <option value="Japanese Sushi">Japanese Sushi & Ramen</option>
                  <option value="Gourmet Burgers">Gourmet Smash Burgers</option>
                  <option value="Artisan Bakery">
                    Artisan Bakery & Pastries
                  </option>
                  <option value="Mexican Street Food">
                    Mexican Taqueria & Street Food
                  </option>
                  <option value="Mediterranean Grill">
                    Mediterranean & Levantine Grill
                  </option>
                  <option value="Thai & Pan-Asian">
                    Thai & Pan-Asian Curries
                  </option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label
                className={`font-heading font-bold text-sm ${
                  themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                }`}
              >
                Signature Tagline & Story
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) =>
                  setFormData({ ...formData, tagline: e.target.value })
                }
                placeholder="e.g. 100% grass-fed beef smoked daily over seasoned hickory wood"
                className={`w-full px-4 py-3 rounded-xl text-sm ${
                  themeMode === "dark"
                    ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] placeholder-[#7a7a7a]"
                    : "glass-input"
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <label
                  className={`font-heading font-bold text-sm ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  Store Brand Logo URL
                </label>
                <div className="flex items-center gap-3">
                  <img
                    src={logoFile ? URL.createObjectURL(logoFile) : formData.logo}
                    alt="Preview"
                    className={`w-16 h-16 rounded-2xl object-cover border shadow-sm shrink-0 ${
                      themeMode === "dark"
                        ? "border-[#3a3a3a]"
                        : "border-[#e1bfb5]"
                    }`}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) setLogoFile(e.target.files[0]);
                    }}
                    className={`w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold cursor-pointer ${
                      themeMode === "dark"
                        ? "file:bg-[#ab3500]/20 file:text-[#ff6b35]"
                        : "file:bg-[#ab3500]/10 file:text-[#ab3500] hover:file:bg-[#ab3500]/20"
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className={`font-heading font-bold text-sm ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  Store Banner Hero URL
                </label>
                <div className="flex items-center gap-3">
                  <img
                    src={bannerFile ? URL.createObjectURL(bannerFile) : formData.banner}
                    alt="Banner Preview"
                    className={`w-24 h-16 rounded-2xl object-cover border shadow-sm shrink-0 ${
                      themeMode === "dark"
                        ? "border-[#3a3a3a]"
                        : "border-[#e1bfb5]"
                    }`}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) setBannerFile(e.target.files[0]);
                    }}
                    className={`w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold cursor-pointer ${
                      themeMode === "dark"
                        ? "file:bg-[#ab3500]/20 file:text-[#ff6b35]"
                        : "file:bg-[#ab3500]/10 file:text-[#ab3500] hover:file:bg-[#ab3500]/20"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Location & Delivery Radius */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3
                className={`font-heading font-extrabold text-xl ${
                  themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                }`}
              >
                2. Physical Kitchen Location & Delivery Zones
              </h3>
              <p
                className={`text-sm ${
                  themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
                }`}
              >
                Dispatch center coordinates and order dispatch radii
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  className={`font-heading font-bold text-sm ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  Kitchen Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="e.g. 104 Culinary Row, Suite 4B"
                  className={`w-full px-4 py-3 rounded-xl text-sm font-semibold ${
                    themeMode === "dark"
                      ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] placeholder-[#7a7a7a]"
                      : "glass-input"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label
                  className={`font-heading font-bold text-sm ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  City, State & Postal Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  placeholder="e.g. Austin, TX 78701"
                  className={`w-full px-4 py-3 rounded-xl text-sm font-semibold ${
                    themeMode === "dark"
                      ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] placeholder-[#7a7a7a]"
                      : "glass-input"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label
                  className={`font-heading font-bold text-sm ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  Kitchen Dispatch Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl text-sm ${
                    themeMode === "dark"
                      ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] placeholder-[#7a7a7a]"
                      : "glass-input"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label
                  className={`font-heading font-bold text-sm ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  Delivery Max Radius (km)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={formData.deliveryRadiusKm}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      deliveryRadiusKm: Number(e.target.value),
                    })
                  }
                  className={`w-full px-4 py-3 rounded-xl text-sm font-bold text-center ${
                    themeMode === "dark"
                      ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]"
                      : "glass-input"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label
                  className={`font-heading font-bold text-sm ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  Standard Delivery Fee ($)
                </label>
                <input
                  type="number"
                  step="0.50"
                  value={formData.deliveryFee}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      deliveryFee: Number(e.target.value),
                    })
                  }
                  className={`w-full px-4 py-3 rounded-xl text-sm font-bold text-center ${
                    themeMode === "dark"
                      ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]"
                      : "glass-input"
                  }`}
                />
              </div>
            </div>

            <div
              className={`p-5 rounded-2xl border flex items-center justify-between ${
                themeMode === "dark"
                  ? "bg-[#383a39] border-[#3a3a3a]/40"
                  : "bg-[#f9f9f9] border-[#e1bfb5]/40"
              }`}
            >
              <div>
                <p
                  className={`font-heading font-bold text-sm ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  Minimum Order Amount
                </p>
                <p
                  className={`text-xs ${
                    themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
                  }`}
                >
                  Orders below this threshold will prompt an extra fee alert
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-bold ${
                    themeMode === "dark" ? "text-[#7a7a7a]" : "text-[#8d7168]"
                  }`}
                >
                  $
                </span>
                <input
                  type="number"
                  value={formData.minOrder}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      minOrder: Number(e.target.value),
                    })
                  }
                  className={`w-24 px-3 py-2 rounded-xl text-sm font-extrabold text-center ${
                    themeMode === "dark"
                      ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]"
                      : "glass-input"
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Kitchen & Prep Specs */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3
                className={`font-heading font-extrabold text-xl ${
                  themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                }`}
              >
                3. Kitchen Prep Speed & Service Schedule
              </h3>
              <p
                className={`text-sm ${
                  themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
                }`}
              >
                Configuring ticket wait times and opening hours for courier
                dispatch algorithms
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label
                  className={`font-heading font-bold text-sm ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  Target Cooking Time
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="5"
                    max="60"
                    value={formData.prepTimeAvg}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        prepTimeAvg: Number(e.target.value),
                      })
                    }
                    className={`w-full px-4 py-3 rounded-xl text-sm font-bold text-center ${
                      themeMode === "dark"
                        ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]"
                        : "glass-input"
                    }`}
                  />
                  <span
                    className={`text-sm font-semibold ${
                      themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
                    }`}
                  >
                    mins
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label
                  className={`font-heading font-bold text-sm ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  Kitchen Opens
                </label>
                <input
                  type="text"
                  value={formData.openingTime}
                  onChange={(e) =>
                    setFormData({ ...formData, openingTime: e.target.value })
                  }
                  placeholder="e.g. 10:00 AM"
                  className={`w-full px-4 py-3 rounded-xl text-sm font-semibold text-center ${
                    themeMode === "dark"
                      ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] placeholder-[#7a7a7a]"
                      : "glass-input"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label
                  className={`font-heading font-bold text-sm ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  Kitchen Closes
                </label>
                <input
                  type="text"
                  value={formData.closingTime}
                  onChange={(e) =>
                    setFormData({ ...formData, closingTime: e.target.value })
                  }
                  placeholder="e.g. 11:00 PM"
                  className={`w-full px-4 py-3 rounded-xl text-sm font-semibold text-center ${
                    themeMode === "dark"
                      ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] placeholder-[#7a7a7a]"
                      : "glass-input"
                  }`}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label
                className={`font-heading font-bold text-sm ${
                  themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                }`}
              >
                Active Operating Days
              </label>
              <div className="flex flex-wrap gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => {
                    const isSelected = formData.operatingDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setFormData({
                              ...formData,
                              operatingDays: formData.operatingDays.filter(
                                (d) => d !== day,
                              ),
                            });
                          } else {
                            setFormData({
                              ...formData,
                              operatingDays: [...formData.operatingDays, day],
                            });
                          }
                        }}
                        className={`px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#ab3500] text-white shadow-sm"
                            : `${themeMode === "dark" ? "bg-[#383a39] text-[#c4c4c4] hover:bg-[#4a4a4a]" : "bg-[#f3f3f3] text-[#594139] hover:bg-[#e8e8e8]"}`
                        }`}
                      >
                        {day}
                      </button>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Banking & Payout Compliance */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3
                className={`font-heading font-extrabold text-xl ${
                  themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                }`}
              >
                4. Direct Payouts & Commercial Food KYC
              </h3>
              <p
                className={`text-sm ${
                  themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
                }`}
              >
                Settlement routing and local public health inspection
                certificates
              </p>
            </div>

            <div className="p-5 bg-[#00ae81]/10 rounded-2xl border border-[#00ae81]/30 flex items-center gap-3">
              <Check className="text-[#006c4f] w-7 h-7" />
              <div>
                <p className="font-heading font-bold text-sm text-[#006c4f]">
                  Stripe Connect Instant Escrow Enabled
                </p>
                <p className="text-xs text-[#594139]">
                  Daily automated ACH transfers directly to your restaurant bank
                  account.
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <label
                className={`font-heading font-bold text-sm ${
                  themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                }`}
              >
                Legal Entity / Business Name *
              </label>
              <input
                type="text"
                required
                value={formData.bankAccountName}
                onChange={(e) =>
                  setFormData({ ...formData, bankAccountName: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-xl text-sm font-semibold ${
                  themeMode === "dark"
                    ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] placeholder-[#7a7a7a]"
                    : "glass-input"
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  className={`font-heading font-bold text-sm ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  Bank Routing Number (ABA) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.routingNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, routingNumber: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl text-sm font-mono ${
                    themeMode === "dark"
                      ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] placeholder-[#7a7a7a]"
                      : "glass-input"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label
                  className={`font-heading font-bold text-sm ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  Account Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.accountNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, accountNumber: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl text-sm font-mono ${
                    themeMode === "dark"
                      ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] placeholder-[#7a7a7a]"
                      : "glass-input"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  className={`font-heading font-bold text-sm ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  Federal Tax ID / EIN
                </label>
                <input
                  type="text"
                  value={formData.taxId}
                  onChange={(e) =>
                    setFormData({ ...formData, taxId: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl text-sm font-mono ${
                    themeMode === "dark"
                      ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] placeholder-[#7a7a7a]"
                      : "glass-input"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label
                  className={`font-heading font-bold text-sm ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  Sanitation Inspection Status
                </label>
                <input
                  type="text"
                  value={formData.sanitationGrade}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sanitationGrade: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-3 rounded-xl text-sm font-bold text-[#006c4f] ${
                    themeMode === "dark"
                      ? "bg-[#383a39] border-[#3a3a3a] text-[#00ae81] placeholder-[#7a7a7a]"
                      : "glass-input"
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Menu & Team Launch */}
        {step === 5 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3
                  className={`font-heading font-extrabold text-xl ${
                    themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                  }`}
                >
                  5. Initial Menu Dishes & Staff Invite
                </h3>
                <p
                  className={`text-sm ${
                    themeMode === "dark" ? "text-[#c4c4c4]" : "text-[#594139]"
                  }`}
                >
                  Seed your live digital catalog and invite kitchen team members
                  (optional)
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setFormData({
                    ...formData,
                    starterItem1Name: "",
                    starterItem2Name: "",
                    skipSampleProducts: true,
                  });
                  showToast(
                    "Products & Staff Skipped",
                    "You can populate menu items anytime from the Store Console.",
                    "info",
                  );
                  handleFinalSubmit();
                }}
                className="px-5 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-heading font-bold text-sm transition-colors cursor-pointer self-start sm:self-auto flex items-center gap-2"
              >
                <ArrowRight className="w-4.5 h-4.5" />
                <span>Skip for Now & Launch Store →</span>
              </button>
            </div>

            {/* Starter Dishes */}
            <div
              className={`p-5 rounded-2xl border space-y-4 ${
                themeMode === "dark"
                  ? "bg-[#383a39] border-[#3a3a3a]/40"
                  : "bg-[#f9f9f9] border-[#e1bfb5]/40"
              }`}
            >
              <h4
                className={`font-heading font-bold text-sm flex items-center gap-2 ${
                  themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                }`}
              >
                <Utensils className="w-5 h-5 text-[#ab3500]" />
                <span>Signature Launch Dish #1</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label
                    className={`text-xs font-bold ${
                      themeMode === "dark" ? "text-[#7a7a7a]" : "text-[#8d7168]"
                    }`}
                  >
                    Dish Name
                  </label>
                  <input
                    type="text"
                    value={formData.starterItem1Name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        starterItem1Name: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold ${
                      themeMode === "dark"
                        ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] placeholder-[#7a7a7a]"
                        : "glass-input"
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label
                    className={`text-xs font-bold ${
                      themeMode === "dark" ? "text-[#7a7a7a]" : "text-[#8d7168]"
                    }`}
                  >
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    value={formData.starterItem1Price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        starterItem1Price: Number(e.target.value),
                      })
                    }
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-bold text-center ${
                      themeMode === "dark"
                        ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]"
                        : "glass-input"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div
              className={`p-5 rounded-2xl border space-y-4 ${
                themeMode === "dark"
                  ? "bg-[#383a39] border-[#3a3a3a]/40"
                  : "bg-[#f9f9f9] border-[#e1bfb5]/40"
              }`}
            >
              <h4
                className={`font-heading font-bold text-sm flex items-center gap-2 ${
                  themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                }`}
              >
                <Utensils className="w-5 h-5 text-[#ab3500]" />
                <span>Signature Starter Dish #2</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label
                    className={`text-xs font-bold ${
                      themeMode === "dark" ? "text-[#7a7a7a]" : "text-[#8d7168]"
                    }`}
                  >
                    Dish Name
                  </label>
                  <input
                    type="text"
                    value={formData.starterItem2Name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        starterItem2Name: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold ${
                      themeMode === "dark"
                        ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] placeholder-[#7a7a7a]"
                        : "glass-input"
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label
                    className={`text-xs font-bold ${
                      themeMode === "dark" ? "text-[#7a7a7a]" : "text-[#8d7168]"
                    }`}
                  >
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    value={formData.starterItem2Price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        starterItem2Price: Number(e.target.value),
                      })
                    }
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-bold text-center ${
                      themeMode === "dark"
                        ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]"
                        : "glass-input"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Staff Invite */}
            <div
              className={`p-5 rounded-2xl border space-y-3 ${
                themeMode === "dark"
                  ? "bg-[#383a39] border-[#3a3a3a]/40"
                  : "bg-linear-to-r from-[#ffdad6]/20 to-[#ffeed9]/20 border-[#e1bfb5]/40"
              }`}
            >
              <h4
                className={`font-heading font-bold text-sm flex items-center gap-2 ${
                  themeMode === "dark" ? "text-[#f5f5f5]" : "text-[#1a1c1c]"
                }`}
              >
                <UserPlus className="w-5 h-5 text-[#24619d]" />
                <span>Invite Initial Kitchen Lead / Head Chef</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="chef@restaurant.com"
                  value={formData.initialChefEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      initialChefEmail: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2.5 rounded-xl text-sm ${
                    themeMode === "dark"
                      ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] placeholder-[#7a7a7a]"
                      : "glass-input"
                  }`}
                />
                <select
                  value={formData.initialChefRole}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      initialChefRole: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold ${
                    themeMode === "dark"
                      ? "bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5]"
                      : "glass-input bg-white"
                  }`}
                >
                  <option value="Head Chef">Head Chef (KDS Lead)</option>
                  <option value="General Manager">General Manager</option>
                  <option value="Kitchen Lead">Kitchen Line Lead</option>
                  <option value="Sous Chef">Sous Chef</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div
          className={`pt-6 border-t flex items-center justify-between gap-4 ${
            themeMode === "dark" ? "border-[#3a3a3a]/60" : "border-[#e1bfb5]/40"
          }`}
        >
          <button
            type="button"
            onClick={handleBack}
            className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
              themeMode === "dark"
                ? "bg-[#383a39] hover:bg-[#4a4a4a] text-[#c4c4c4]"
                : "bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#594139]"
            }`}
          >
            {step === 1 ? "Cancel" : "← Back Step"}
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={isUploading}
            className="px-8 py-3 rounded-2xl glass-button-primary font-heading font-bold text-sm shadow-lg shadow-[#ab3500]/25 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            <span>
              {isUploading
                ? "Uploading..."
                : step === totalSteps
                ? "🚀 Complete & Launch Store"
                : "Continue to Next Step →"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
