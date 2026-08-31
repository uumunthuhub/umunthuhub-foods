"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Persona,
  CustomerTab,
  VendorTab,
  RiderTab,
  CorporateTab,
  Tenant,
  MenuItem,
  CartItem,
  Order,
  RiderJob,
  Promotion,
  SupportTicket,
  TeamMember,
  LoyaltyReward,
  CorporatePackage,
  OrderStatus,
  StaffMember,
  StaffShift,
  PlatformSettings,
} from "@umunthuhub/shared-types";
import { dbService } from "../db/indexedDB";
import confetti from "canvas-confetti";

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Navigation & Personas
  persona: Persona;
  setPersona: (p: Persona) => void;
  customerTab: CustomerTab;
  setCustomerTab: (t: CustomerTab) => void;
  vendorTab: VendorTab;
  setVendorTab: (t: VendorTab) => void;
  riderTab: RiderTab;
  setRiderTab: (t: RiderTab) => void;
  corporateTab: CorporateTab;
  setCorporateTab: (t: CorporateTab) => void;

  // Tenants
  tenants: Tenant[];
  currentTenantId: string;
  setCurrentTenantId: (id: string) => void;
  currentTenant: Tenant;
  selectedRestaurantId: string;
  setSelectedRestaurantId: (id: string) => void;
  selectedRestaurant: Tenant;

  // Menu & Cart
  menuItems: MenuItem[];
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, selectedOptions?: Record<string, string>, instructions?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartItemsCount: number;

  // Orders
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  placeOrder: (details: {
    deliveryAddress: string;
    customerName: string;
    customerPhone: string;
    paymentMethod: Order['paymentMethod'];
    tip: number;
    promoCode?: string;
    deliveryNotes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Rider Logistics
  riderJobs: RiderJob[];
  currentJob: RiderJob | null;
  setCurrentJob: (job: RiderJob | null) => void;
  incomingOffer: RiderJob | null;
  setIncomingOffer: (job: RiderJob | null) => void;
  acceptRiderJob: (jobId: string) => void;
  declineRiderJob: (jobId: string) => void;
  advanceJobStatus: (jobId: string, nextStatus: RiderJob['status']) => void;
  toggleChecklistItem: (jobId: string, checkId: string) => void;
  completeJobWithPhoto: (jobId: string, photoUrl: string) => void;

  // Support & Chat
  supportTickets: SupportTicket[];
  activeTicket: SupportTicket | null;
  setActiveTicket: (ticket: SupportTicket | null) => void;
  sendSupportMessage: (ticketId: string, text: string, sender: 'customer' | 'agent') => void;
  resolveTicket: (ticketId: string, status: SupportTicket['status']) => void;

  // Promotions
  promotions: Promotion[];
  appliedPromo: Promotion | null;
  applyPromoCode: (code: string) => { success: boolean; message: string; discount?: number };
  removePromoCode: () => void;
  togglePromotionStatus: (promoId: string) => void;
  createPromotion: (promo: Omit<Promotion, 'id' | 'usageCount' | 'revenueGenerated'>) => void;

  // Loyalty & Rewards
  loyaltyPoints: number;
  loyaltyRewards: LoyaltyReward[];
  redeemReward: (reward: LoyaltyReward) => boolean;

  // Corporate & Team
  corporatePackages: CorporatePackage[];
  teamMembers: TeamMember[];
  addTeamMember: (member: Omit<TeamMember, 'id' | 'lastActive'>) => void;
  addTenantVenue: (tenant: Omit<Tenant, 'id' | 'gmvToday' | 'activeOrdersCount'>) => void;

  // Staff & Shifts Management
  staffMembers: StaffMember[];
  staffShifts: StaffShift[];
  addStaffMember: (staff: Omit<StaffMember, 'id'>) => void;
  updateStaffMember: (staff: StaffMember) => void;
  deleteStaffMember: (id: string) => void;
  updateStaffStatus: (id: string, status: StaffMember['status']) => void;
  addStaffShift: (shift: Omit<StaffShift, 'id'>) => void;
  deleteStaffShift: (id: string) => void;

  // Platform & Store Settings
  platformSettings: PlatformSettings;
  updatePlatformSettings: (settings: Partial<PlatformSettings>) => void;

  // Menu Management
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  toggleItemStock: (itemId: string) => void;

  // Modals & UI Controls
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isItemModalOpen: boolean;
  selectedItemForModal: MenuItem | null;
  openItemModal: (item: MenuItem) => void;
  closeItemModal: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSOSModalOpen: boolean;
  setIsSOSModalOpen: (open: boolean) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;

  // Theme System
  themeMode: 'light' | 'warm' | 'dark';
  setThemeMode: (mode: 'light' | 'warm' | 'dark') => void;
  toggleThemeMode: () => void;
  isThemeTransitioning: boolean;

  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [persona, setPersona] = useState<Persona>('customer');
  const [customerTab, setCustomerTab] = useState<CustomerTab>('home');
  const [vendorTab, setVendorTab] = useState<VendorTab>('dashboard');
  const [riderTab, setRiderTab] = useState<RiderTab>('radar');
  const [corporateTab, setCorporateTab] = useState<CorporateTab>('catalog');

  // Tenants & Store State
  const [tenants, setTenants] = useState<Tenant[]>(() => dbService.getTenants());
  const [currentTenantId, setCurrentTenantId] = useState<string>('tenant-green-bistro');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('tenant-green-bistro');

  // Menu & Cart State
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => dbService.getMenuItems());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<Promotion | null>(null);

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => dbService.getOrders());
  const [activeOrder, setActiveOrder] = useState<Order | null>(() => {
    const list = dbService.getOrders();
    return list.find(o => o.status !== 'delivered' && o.status !== 'cancelled') || list[0] || null;
  });

  // Rider State
  const [riderJobs, setRiderJobs] = useState<RiderJob[]>(() => dbService.getRiderJobs());
  const [currentJob, setCurrentJob] = useState<RiderJob | null>(() => {
    const jobs = dbService.getRiderJobs();
    return jobs.find(j => j.status === 'accepted' || j.status === 'at_pickup' || j.status === 'picked_up' || j.status === 'at_dropoff') || jobs[0] || null;
  });
  const [incomingOffer, setIncomingOffer] = useState<RiderJob | null>(null);

  // Support State
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => dbService.getSupportTickets());
  const [activeTicket, setActiveTicket] = useState<SupportTicket | null>(() => dbService.getSupportTickets()[0] || null);

  // Loyalty & Rewards State
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(() => dbService.getLoyaltyPoints());
  const [loyaltyRewards, setLoyaltyRewards] = useState<LoyaltyReward[]>(() => dbService.getLoyaltyRewards());

  // Corporate & Team State
  const [corporatePackages] = useState<CorporatePackage[]>(() => dbService.getCorporatePackages());
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => dbService.getTeamMembers());
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(() => dbService.getStaffMembers());
  const [staffShifts, setStaffShifts] = useState<StaffShift[]>(() => dbService.getStaffShifts());
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>(() => dbService.getPlatformSettings());
  const [promotions, setPromotions] = useState<Promotion[]>(() => dbService.getPromotions());

  // UI Modal States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Theme State
  const [themeMode, setThemeModeState] = useState<'light' | 'warm' | 'dark'>('light');
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);

  const toggleThemeMode = useCallback(() => {
    setIsThemeTransitioning(true);
    setTimeout(() => {
      setThemeModeState((prev) => {
        if (prev === 'light') return 'warm';
        if (prev === 'warm') return 'dark';
        return 'light';
      });
      setTimeout(() => setIsThemeTransitioning(false), 300);
    }, 50);
  }, []);

  const setThemeMode = useCallback((mode: 'light' | 'warm' | 'dark') => {
    if (mode === themeMode) return;
    setIsThemeTransitioning(true);
    setTimeout(() => {
      setThemeModeState(mode);
      setTimeout(() => setIsThemeTransitioning(false), 300);
    }, 50);
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  useEffect(() => {
    const overlay = document.getElementById('theme-transition-overlay');
    if (overlay) {
      if (isThemeTransitioning) {
        overlay.classList.add('active');
      } else {
        overlay.classList.remove('active');
      }
    }
  }, [isThemeTransitioning]);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev: any) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev: any[]) => prev.filter((t: { id: string; }) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev: any[]) => prev.filter((t: { id: string; }) => t.id !== id));
  }, []);

  // Derived current tenant & selected restaurant
  const currentTenant = tenants.find((t: { id: any; }) => t.id === currentTenantId) || tenants[0];
  const selectedRestaurant = tenants.find((t: { id: any; }) => t.id === selectedRestaurantId) || tenants[0];

  // Refresh data from DB helper
  const refreshData = useCallback(() => {
    setTenants(dbService.getTenants());
    setMenuItems(dbService.getMenuItems());
    setOrders(dbService.getOrders());
    setRiderJobs(dbService.getRiderJobs());
    setPromotions(dbService.getPromotions());
    setSupportTickets(dbService.getSupportTickets());
    setLoyaltyRewards(dbService.getLoyaltyRewards());
    setLoyaltyPoints(dbService.getLoyaltyPoints());
    setTeamMembers(dbService.getTeamMembers());
    setStaffMembers(dbService.getStaffMembers());
    setStaffShifts(dbService.getStaffShifts());
    setPlatformSettings(dbService.getPlatformSettings());
  }, []);

  // Play audio chimes
  const playSound = (soundType: 'success' | 'alert' | 'ding') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (soundType === 'success') {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } else if (soundType === 'alert') {
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        osc.frequency.setValueAtTime(660, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else {
        osc.frequency.setValueAtTime(700, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      }
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum: any, item: { itemTotal: any; }) => sum + item.itemTotal, 0);
  const cartItemsCount = cart.reduce((count: any, item: { quantity: any; }) => count + item.quantity, 0);

  const addToCart = (item: MenuItem, quantity = 1, selectedOptions: Record<string, string> = {}, instructions = '') => {
    // calculate extra delta
    let optionsDelta = 0;
    if (item.options) {
      item.options.forEach(opt => {
        const choiceName = selectedOptions[opt.name];
        if (choiceName) {
          const choice = opt.choices.find(c => c.name === choiceName);
          if (choice) optionsDelta += choice.priceDelta;
        }
      });
    }

    const singleUnitPrice = item.price + optionsDelta;
    const itemTotal = singleUnitPrice * quantity;
    const cartItemId = `${item.id}-${JSON.stringify(selectedOptions)}-${instructions}`;

    setCart((prev: any[]) => {
      const existingIdx = prev.findIndex((i: { id: string; }) => i.id === cartItemId);
      if (existingIdx !== -1) {
        const updated = [...prev];
        const newQty = updated[existingIdx].quantity + quantity;
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          itemTotal: singleUnitPrice * newQty
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: cartItemId,
          menuItem: item,
          quantity,
          selectedOptions,
          specialInstructions: instructions,
          itemTotal
        }
      ];
    });

    playSound('ding');
    showToast('Added to Cart', `${quantity}x ${item.name} added to your tray`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev: any[]) => prev.filter((i: { id: string; }) => i.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev: any[]) => {
      return prev.map((item: { id: string; quantity: number; itemTotal: number; }) => {
        if (item.id === cartItemId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          const unitPrice = item.itemTotal / item.quantity;
          return {
            ...item,
            quantity: newQty,
            itemTotal: unitPrice * newQty
          };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const openItemModal = (item: MenuItem) => {
    setSelectedItemForModal(item);
    setIsItemModalOpen(true);
  };

  const closeItemModal = () => {
    setSelectedItemForModal(null);
    setIsItemModalOpen(false);
  };

  // Promo application
  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    const promo = promotions.find((p: { code: string; isActive: any; }) => p.code.toUpperCase() === clean && p.isActive);
    if (!promo) {
      return { success: false, message: 'Invalid or expired promotion code' };
    }
    if (cartSubtotal < promo.minOrder) {
      return { success: false, message: `Minimum order of $${promo.minOrder.toFixed(2)} required for this code` };
    }

    let discount = 0;
    if (promo.discountType === 'percentage') {
      discount = (cartSubtotal * promo.discountValue) / 100;
      if (promo.maxDiscount) discount = Math.min(discount, promo.maxDiscount);
    } else {
      discount = promo.discountValue;
    }

    setAppliedPromo(promo);
    playSound('success');
    showToast('Promo Code Applied!', `Saved $${discount.toFixed(2)} on your order!`, 'success');
    return { success: true, message: 'Promo code applied successfully!', discount };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo Removed', 'Discount removed from total', 'info');
  };

  // Place Order
  const placeOrder = (details: {
    deliveryAddress: string;
    customerName: string;
    customerPhone: string;
    paymentMethod: Order['paymentMethod'];
    tip: number;
    promoCode?: string;
    deliveryNotes?: string;
  }): Order => {
    const currentRest = selectedRestaurant;
    let discount = 0;
    if (appliedPromo) {
      if (appliedPromo.discountType === 'percentage') {
        discount = (cartSubtotal * appliedPromo.discountValue) / 100;
        if (appliedPromo.maxDiscount) discount = Math.min(discount, appliedPromo.maxDiscount);
      } else {
        discount = appliedPromo.discountValue;
      }
    }

    const deliveryFee = currentRest.deliveryFee;
    const serviceFee = Number((cartSubtotal * 0.05).toFixed(2));
    const total = Number((cartSubtotal + deliveryFee + serviceFee + details.tip - discount).toFixed(2));
    const randomOrderNum = '#ORD-' + Math.floor(1000 + Math.random() * 9000);

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: randomOrderNum,
      tenantId: currentRest.id,
      tenantName: currentRest.name,
      tenantAddress: currentRest.address,
      customerName: details.customerName || 'Michael Rossi',
      customerPhone: details.customerPhone || '+1 (555) 432-1099',
      customerEmail: 'm.rossi@example.com',
      deliveryAddress: details.deliveryAddress,
      items: cart.map((i) => ({
        menuItemId: i.menuItem.id,
        name: i.menuItem.name,
        quantity: i.quantity,
        price: i.menuItem.price,
        selectedOptions: i.selectedOptions,
        specialInstructions: i.specialInstructions
      })),
      subtotal: cartSubtotal,
      deliveryFee,
      serviceFee,
      discount,
      tip: details.tip,
      total,
      status: 'incoming',
      paymentMethod: details.paymentMethod,
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: new Date(Date.now() + 25 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      deliveryNotes: details.deliveryNotes,
      riderName: 'Grayson Comrade',
      riderPhone: '+1 (555) 778-9012',
      riderRating: 4.98,
      riderAvatar: '/umunthuhub-profile.png',
      riderVehicle: 'Yamaha E-Moped (Plate: UMN-582)'
    };

    dbService.addOrder(newOrder);
    refreshData();
    setActiveOrder(newOrder);
    clearCart();

    // Reward points for order
    const pointsEarned = Math.round(total * 10);
    dbService.addPoints(pointsEarned);
    setLoyaltyPoints(dbService.getLoyaltyPoints());

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

    playSound('success');
    showToast('Order Placed Successfully!', `Order ${newOrder.orderNumber} is confirmed and sent to kitchen.`, 'success');
    setCustomerTab('tracking');

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    dbService.updateOrderStatus(orderId, status);
    refreshData();
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder((prev: any) => prev ? { ...prev, status } : null);
    }
    showToast('Order Status Updated', `Order marked as ${status.replace('_', ' ').toUpperCase()}`, 'info');
  };

  // Rider actions
  const acceptRiderJob = (jobId: string) => {
    dbService.updateRiderJobStatus(jobId, 'accepted');
    refreshData();
    const job = dbService.getRiderJobs().find(j => j.id === jobId);
    if (job) setCurrentJob(job);
    setIncomingOffer(null);
    playSound('success');
    showToast('Delivery Accepted!', 'Navigate to restaurant for pickup', 'success');
    setRiderTab('active_job');
  };

  const declineRiderJob = (jobId: string) => {
    dbService.updateRiderJobStatus(jobId, 'declined');
    refreshData();
    setIncomingOffer(null);
    showToast('Offer Declined', 'Searching for next nearby dispatch...', 'info');
  };

  const advanceJobStatus = (jobId: string, nextStatus: RiderJob['status']) => {
    dbService.updateRiderJobStatus(jobId, nextStatus);
    refreshData();
    const job = dbService.getRiderJobs().find(j => j.id === jobId);
    if (job) setCurrentJob(job);
    playSound('ding');
    showToast('Job Updated', `Delivery is now ${nextStatus.replace('_', ' ')}`, 'info');
  };

  const toggleChecklistItem = (jobId: string, checkId: string) => {
    dbService.toggleJobChecklistItem(jobId, checkId);
    refreshData();
    const job = dbService.getRiderJobs().find(j => j.id === jobId);
    if (job) setCurrentJob({ ...job });
  };

  const completeJobWithPhoto = (jobId: string, photoUrl: string) => {
    const job = dbService.getRiderJobs().find(j => j.id === jobId);
    if (job) {
      job.proofPhoto = photoUrl;
      dbService.updateRiderJobStatus(jobId, 'completed');
      refreshData();
      setCurrentJob(null);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.7 }
      });
      playSound('success');
      showToast('Delivery Completed! 🎉', `Earned $${job.payout.toFixed(2)} payout!`, 'success');
      setRiderTab('earnings');
    }
  };

  // Support & Chat
  const sendSupportMessage = (ticketId: string, text: string, sender: 'customer' | 'agent') => {
    dbService.sendSupportMessage(ticketId, text, sender);
    refreshData();
    const t = dbService.getSupportTickets().find(tk => tk.id === ticketId);
    if (t) setActiveTicket({ ...t });
    playSound('ding');

    // Auto-respond simulation if customer sent
    if (sender === 'customer') {
      setTimeout(() => {
        dbService.sendSupportMessage(ticketId, 'Our kitchen supervisor has acknowledged your note. A real-time update has been pushed to the driver.', 'agent');
        refreshData();
        const updated = dbService.getSupportTickets().find(tk => tk.id === ticketId);
        if (updated) setActiveTicket({ ...updated });
        playSound('ding');
      }, 1400);
    }
  };

  const resolveTicket = (ticketId: string, status: SupportTicket['status']) => {
    dbService.resolveTicket(ticketId, status);
    refreshData();
    const t = dbService.getSupportTickets().find(tk => tk.id === ticketId);
    if (t) setActiveTicket({ ...t });
    showToast('Ticket Updated', `Ticket marked as ${status.toUpperCase()}`, 'success');
  };

  // Loyalty Rewards
  const redeemReward = (reward: LoyaltyReward): boolean => {
    if (loyaltyPoints < reward.pointsCost) {
      showToast('Insufficient Points', `You need ${reward.pointsCost - loyaltyPoints} more points to unlock this reward.`, 'warning');
      return false;
    }
    dbService.deductPoints(reward.pointsCost);
    setLoyaltyPoints(dbService.getLoyaltyPoints());
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    playSound('success');
    showToast('Reward Unlocked! 🎁', `Code ${reward.promoCode} is ready to use at checkout!`, 'success');
    return true;
  };

  // Admin & Management
  const addTeamMember = (member: Omit<TeamMember, 'id' | 'lastActive'>) => {
    const newMember: TeamMember = {
      ...member,
      id: 'tm-' + Date.now(),
      lastActive: 'Just invited'
    };
    dbService.addTeamMember(newMember);
    refreshData();
    showToast('Invitation Sent', `${member.name} (${member.email}) invited as ${member.role}`, 'success');
  };

  const addTenantVenue = (tenantData: Omit<Tenant, 'id' | 'gmvToday' | 'activeOrdersCount'>) => {
    const newTenant: Tenant = {
      ...tenantData,
      id: 'tenant-' + tenantData.slug,
      gmvToday: 0,
      activeOrdersCount: 0
    };
    dbService.addTenant(newTenant);
    refreshData();
    showToast('Venue Created!', `${newTenant.name} is now registered in the ecosystem.`, 'success');
  };

  const togglePromotionStatus = (promoId: string) => {
    dbService.togglePromotion(promoId);
    refreshData();
  };

  const createPromotion = (promoData: Omit<Promotion, 'id' | 'usageCount' | 'revenueGenerated'>) => {
    const newPromo: Promotion = {
      ...promoData,
      id: 'promo-' + Date.now(),
      usageCount: 0,
      revenueGenerated: 0
    };
    dbService.addPromotion(newPromo);
    refreshData();
    showToast('Promotion Created', `Code ${newPromo.code} is now active!`, 'success');
  };

  const addMenuItem = (itemData: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...itemData,
      id: 'item-' + Date.now()
    };
    dbService.addMenuItem(newItem);
    refreshData();
    showToast('Menu Item Added', `${newItem.name} added to ${currentTenant.name}`, 'success');
  };

  const updateMenuItem = (item: MenuItem) => {
    dbService.updateMenuItem(item);
    refreshData();
    showToast('Menu Item Updated', `${item.name} changes saved successfully`, 'success');
  };

  const toggleItemStock = (itemId: string) => {
    dbService.toggleMenuItemStock(itemId);
    refreshData();
  };

  // Staff & Shifts Management
  const addStaffMember = (staffData: Omit<StaffMember, 'id'>) => {
    const newStaff: StaffMember = {
      ...staffData,
      id: 'staff-' + Date.now()
    };
    dbService.addStaffMember(newStaff);
    refreshData();
    showToast('Staff Member Added', `${newStaff.name} assigned to ${newStaff.storeName}`, 'success');
  };

  const updateStaffMember = (staff: StaffMember) => {
    dbService.updateStaffMember(staff);
    refreshData();
    showToast('Staff Record Updated', `${staff.name}'s profile & permissions updated`, 'success');
  };

  const deleteStaffMember = (id: string) => {
    const target = staffMembers.find((s: { id: string; }) => s.id === id);
    dbService.deleteStaffMember(id);
    refreshData();
    showToast('Staff Member Removed', target ? `${target.name} has been removed` : 'Staff removed', 'info');
  };

  const updateStaffStatus = (id: string, status: StaffMember['status']) => {
    dbService.updateStaffStatus(id, status);
    refreshData();
    const target = staffMembers.find((s: { id: string; }) => s.id === id);
    const label = status === 'on_shift' ? 'Clocked In' : status === 'on_break' ? 'On Break' : status === 'off_duty' ? 'Clocked Out' : 'On Leave';
    showToast(`Staff Status: ${label}`, target ? `${target.name} is now ${label.toLowerCase()}` : 'Status updated', 'info');
  };

  const addStaffShift = (shiftData: Omit<StaffShift, 'id'>) => {
    const newShift: StaffShift = {
      ...shiftData,
      id: 'shift-' + Date.now()
    };
    dbService.addStaffShift(newShift);
    refreshData();
    showToast('Shift Scheduled', `${newShift.staffName} scheduled on ${newShift.day}`, 'success');
  };

  const deleteStaffShift = (id: string) => {
    dbService.deleteStaffShift(id);
    refreshData();
    showToast('Shift Cancelled', 'Scheduled shift has been removed', 'info');
  };

  // Platform Settings Management
  const updatePlatformSettings = (newSettings: Partial<PlatformSettings>) => {
    const updated = dbService.updatePlatformSettings(newSettings);
    setPlatformSettings(updated);
    showToast('Settings Saved', 'Platform & store preferences updated successfully', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        persona,
        setPersona,
        customerTab,
        setCustomerTab,
        vendorTab,
        setVendorTab,
        riderTab,
        setRiderTab,
        corporateTab,
        setCorporateTab,

        tenants,
        currentTenantId,
        setCurrentTenantId,
        currentTenant,
        selectedRestaurantId,
        setSelectedRestaurantId,
        selectedRestaurant,

        menuItems,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartItemsCount,

        orders,
        activeOrder,
        setActiveOrder,
        placeOrder,
        updateOrderStatus,

        riderJobs,
        currentJob,
        setCurrentJob,
        incomingOffer,
        setIncomingOffer,
        acceptRiderJob,
        declineRiderJob,
        advanceJobStatus,
        toggleChecklistItem,
        completeJobWithPhoto,

        supportTickets,
        activeTicket,
        setActiveTicket,
        sendSupportMessage,
        resolveTicket,

        promotions,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        togglePromotionStatus,
        createPromotion,

        loyaltyPoints,
        loyaltyRewards,
        redeemReward,

        corporatePackages,
        teamMembers,
        addTeamMember,
        addTenantVenue,

        staffMembers,
        staffShifts,
        addStaffMember,
        updateStaffMember,
        deleteStaffMember,
        updateStaffStatus,
        addStaffShift,
        deleteStaffShift,

        platformSettings,
        updatePlatformSettings,

        addMenuItem,
        updateMenuItem,
        toggleItemStock,

        isAuthModalOpen,
        setIsAuthModalOpen,
        isItemModalOpen,
        selectedItemForModal,
        openItemModal,
        closeItemModal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isSOSModalOpen,
        setIsSOSModalOpen,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,

        themeMode: themeMode,
        setThemeMode,
        toggleThemeMode,
        isThemeTransitioning,

        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
