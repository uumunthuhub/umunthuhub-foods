export type Persona = 'customer' | 'vendor' | 'rider' | 'admin' | 'corporate';

export type CustomerTab = 'home' | 'search' | 'restaurant' | 'checkout' | 'tracking' | 'rewards';
export type VendorTab = 'dashboard' | 'kds' | 'menu' | 'promotions' | 'onboarding' | 'setup_wizard';
export type RiderTab = 'radar' | 'active_job' | 'earnings' | 'rewards' | 'profile';
export type AdminTab = 'overview' | 'venues' | 'staff' | 'team' | 'billing' | 'payouts' | 'support' | 'settings' | 'profile' | 'store_wizard' | 'auth' | 'store_selector' | 'tenants';
export type CorporateTab = 'home' | 'catalog' | 'team_orders' | 'subscriptions' | 'invoices';

export type SetupStep = 'org_creation' | 'store_details' | 'operations' | 'products_staff' | 'completed';

export interface AdminOrganization {
  id: string;
  name: string;
  slug: string;
  legalName: string;
  taxId: string;
  ownerName: string;
  ownerEmail: string;
  businessType: string;
  address: string;
  city: string;
  country: string;
  createdAt: string;
  setupStep: SetupStep;
  storeIds: string[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Manager';
  organizationId?: string;
  avatar?: string;
}

export interface Tenant {
  id: string;
  organizationId?: string;
  name: string;
  slug: string;
  tagline: string;
  logo: string;
  banner: string;
  rating: number;
  reviewsCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  address: string;
  city: string;
  cuisine: string;
  tags: string[];
  isOpen: boolean;
  phone: string;
  prepTimeAvg: number;
  gmvToday: number;
  activeOrdersCount: number;
  monthlyRevenue?: number;
  commissionRate?: number;
  isFeatured?: boolean;
  setupStep?: SetupStep;
}

export interface MenuItemOptionChoice {
  name: string;
  priceDelta: number;
}

export interface MenuItemOption {
  name: string;
  required: boolean;
  maxSelections?: number;
  choices: MenuItemOptionChoice[];
}

export interface MenuItem {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'Starters' | 'Mains' | 'Sides' | 'Desserts' | 'Beverages' | 'Combos' | 'Signature';
  image: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVeg?: boolean;
  isGlutenFree?: boolean;
  inStock: boolean;
  prepTimeMinutes: number;
  calories?: number;
  options?: MenuItemOption[];
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: Record<string, string>;
  specialInstructions?: string;
  itemTotal: number;
}

export type OrderStatus = 'incoming' | 'cooking' | 'ready' | 'picked_up' | 'delivered' | 'cancelled';

export interface OrderItemSummary {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  selectedOptions?: Record<string, string>;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  tenantId: string;
  tenantName: string;
  tenantAddress: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  items: OrderItemSummary[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  discount: number;
  tip: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'card' | 'apple_pay' | 'cash' | 'corporate_account';
  createdAt: string;
  estimatedDeliveryTime: string;
  cookingStartedAt?: string;
  readyAt?: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  riderId?: string;
  riderName?: string;
  riderPhone?: string;
  riderAvatar?: string;
  riderRating?: number;
  riderVehicle?: string;
  deliveryNotes?: string;
  dropoffPhoto?: string;
  cancelReason?: string;
  orderNumber: string;
  tableNumber?: string;
}

export interface RiderJob {
  id: string;
  orderId: string;
  orderNumber: string;
  tenantId: string;
  tenantName: string;
  tenantAddress: string;
  tenantPhone: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  payout: number;
  baseFare: number;
  tip: number;
  distanceKm: number;
  estimatedMinutes: number;
  itemsCount: number;
  itemsList: string[];
  expiresAt: number; // timestamp in ms for 45s countdown
  status: 'offered' | 'accepted' | 'at_pickup' | 'picked_up' | 'at_dropoff' | 'completed' | 'declined';
  checklist: { id: string; label: string; checked: boolean }[];
  deliveryNotes?: string;
  proofPhoto?: string;
}

export interface Promotion {
  id: string;
  tenantId: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrder: number;
  maxDiscount?: number;
  usageCount: number;
  usageLimit: number;
  expiresAt: string;
  isActive: boolean;
  revenueGenerated: number;
  targetAudience: 'All Customers' | 'First-Time' | 'VIP Loyalty' | 'Late Night';
}

export interface SupportChatMessage {
  id: string;
  sender: 'customer' | 'agent' | 'system';
  text: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  orderId: string;
  orderNumber: string;
  issueCategory: 'missing_items' | 'late_delivery' | 'food_temperature' | 'wrong_order' | 'billing';
  status: 'open' | 'investigating' | 'resolved' | 'refunded';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  lastUpdated: string;
  subject: string;
  messages: SupportChatMessage[];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'General Manager' | 'Head Chef' | 'Kitchen Lead' | 'Front Staff';
  assignedStores: string[];
  avatar: string;
  status: 'active' | 'pending';
  lastActive: string;
}

export interface LoyaltyReward {
  id: string;
  title: string;
  pointsCost: number;
  description: string;
  category: 'discount' | 'free_item' | 'perk';
  icon: string;
  promoCode: string;
  redeemed?: boolean;
}

export interface CorporatePackage {
  id: string;
  title: string;
  subtitle: string;
  category: 'buffet' | 'boxed' | 'platter' | 'breakfast';
  minHeadcount: number;
  pricePerPerson: number;
  image: string;
  dietaryBadges: string[];
  itemsIncluded: string[];
  popularFor: string;
}

export type StaffStation = 'Head Chef' | 'Sous Chef' | 'Line Cook & Grill' | 'Expeditor & QC' | 'Barista & Beverages' | 'Pastry & Prep' | 'Cashier & Front Desk' | 'Dispatch & Logistics';

export interface StaffShift {
  id: string;
  staffId: string;
  staffName: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string;
  endTime: string;
  station: StaffStation;
  storeId: string;
  storeName: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'General Manager' | 'Head Chef' | 'Sous Chef' | 'Shift Supervisor' | 'Line Cook' | 'Pastry Chef' | 'Barista' | 'Front Desk' | 'Expo QC' | 'Kitchen Assistant';
  storeId: string;
  storeName: string;
  station: StaffStation;
  avatar: string;
  status: 'on_shift' | 'on_break' | 'off_duty' | 'leave';
  hourlyRate: number;
  weeklyHours: number;
  rating: number;
  certifications: string[];
  clockInTime?: string;
  permissions: {
    canAccessKDS: boolean;
    canApproveRefunds: boolean;
    canEditMenu: boolean;
    canManageInventory: boolean;
    canViewFinancials: boolean;
    canManageRoster: boolean;
  };
  hireDate: string;
}

export interface PlatformSettings {
  platformName: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
  currency: string;
  currencySymbol: string;
  timezone: string;
  defaultCommissionRate: number;
  serviceFeePercentage: number;
  minOrderRequirement: number;
  autoApproveNewTenants: boolean;
  instantPayoutsEnabled: boolean;
  maxActiveOrdersPerDriver: number;
  defaultDeliveryRadiusKm: number;
  kitchenChimeEnabled: boolean;
  kitchenAlertSound: 'bell' | 'chime' | 'digital' | 'radar';
  autoPrintKitchenTickets: boolean;
  rushHourPrepBufferMinutes: number;
  enableTwoFactorAuth: boolean;
  sessionTimeoutMinutes: number;
  enforceZeroWastePackaging: boolean;
  themeMode: 'light' | 'dark' | 'system';
  brandAccentColor: string;
}
