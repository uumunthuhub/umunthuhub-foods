import { create } from 'zustand';

export interface CartItem {
  id: string;
  menuItemId: string;
  quantity: number;
  price: number;
  name: string;
}

export type OrderStatus = 'incoming' | 'cooking' | 'ready' | 'picked_up' | 'delivered';

export interface Order {
  id: string;
  orderNumber: string;
  tenantName: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  tip: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  address: string;
  estimatedDeliveryTime: string;
  placedAt: string;
  riderName: string;
  riderRating: number;
  riderVehicle: string;
  riderAvatar?: string;
}

interface AppState {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
  orders: Order[];
  activeOrderId: string | null;
  placeOrder: (details: {
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    tax: number;
    tip: number;
    total: number;
    paymentMethod: string;
    address: string;
  }) => Order;
  advanceOrderStatus: (orderId: string) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const RIDERS = [
  { name: 'Leo Vasquez', rating: 4.98, vehicle: 'Yamaha E-Moped (UMN-582)' },
  { name: 'Priya Nair', rating: 4.95, vehicle: 'Honda CB500 (UMN-774)' },
  { name: 'Kofi Mensah', rating: 4.97, vehicle: 'Electric Cargo Bike (UMN-219)' },
];

export const useAppStore = create<AppState>((set, get) => ({
  cart: [],
  isAuthenticated: true,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),

  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((c) => c.menuItemId === item.menuItemId);
      if (existing) {
        return {
          cart: state.cart.map((c) =>
            c.menuItemId === item.menuItemId
              ? { ...c, quantity: c.quantity + item.quantity }
              : c
          ),
        };
      }
      return { cart: [...state.cart, { ...item, id: Math.random().toString() }] };
    }),

  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((c) => c.id !== id) })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((c) => (c.id === id ? { ...c, quantity } : c)),
    })),

  clearCart: () => set({ cart: [] }),
  cartTotal: () => get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
  cartCount: () => get().cart.reduce((count, item) => count + item.quantity, 0),

  orders: [],
  activeOrderId: null,

  placeOrder: (details) => {
    const rider = RIDERS[Math.floor(Math.random() * RIDERS.length)];
    const now = new Date();
    const etaDate = new Date(now.getTime() + 20 * 60000);
    const order: Order = {
      id: Math.random().toString(36).substring(2, 10).toUpperCase(),
      orderNumber: 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      tenantName: 'Umunthuhub Kitchen',
      items: details.items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
      subtotal: details.subtotal,
      deliveryFee: details.deliveryFee,
      tax: details.tax,
      tip: details.tip,
      discount: 0,
      total: details.total,
      status: 'incoming',
      paymentMethod: details.paymentMethod,
      address: details.address,
      estimatedDeliveryTime: etaDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      placedAt: now.toISOString(),
      riderName: rider.name,
      riderRating: rider.rating,
      riderVehicle: rider.vehicle,
    };
    set((state) => ({
      orders: [order, ...state.orders],
      activeOrderId: order.id,
    }));
    return order;
  },

  advanceOrderStatus: (orderId) => {
    const statuses: OrderStatus[] = ['incoming', 'cooking', 'ready', 'picked_up', 'delivered'];
    set((state) => ({
      orders: state.orders.map((o) => {
        if (o.id !== orderId) return o;
        const idx = statuses.indexOf(o.status);
        return { ...o, status: idx < statuses.length - 1 ? statuses[idx + 1] : o.status };
      }),
    }));
  },
}));
