import { 
  Tenant, MenuItem, Order, RiderJob, Promotion, SupportTicket, 
  TeamMember, LoyaltyReward, CorporatePackage, StaffMember, StaffShift, PlatformSettings 
} from '@umunthuhub/shared-types';

// ── Prototype Auth ──────────────────────────────────────────────────────────
export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  orgName: string;
  organizationId: string;
  businessType: string;
  createdAt: string;
}

export const INITIAL_TENANTS: Tenant[] = [
  {
    id: 'tenant-green-bistro',
    organizationId: 'org-vance-hospitality',
    name: 'The Green Bistro',
    slug: 'the-green-bistro',
    tagline: 'Artisanal organic farm-to-table bowls & gourmet greens',
    logo: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 342,
    deliveryTime: '20-30 min',
    deliveryFee: 1.99,
    minOrder: 15.00,
    address: '452 Elmwood Avenue, Downtown District',
    city: 'Metropolis',
    cuisine: 'Organic & Salads',
    tags: ['Organic', 'Gluten-Free', 'Healthy', 'Superfoods'],
    isOpen: true,
    phone: '+1 (555) 234-8891',
    prepTimeAvg: 14,
    gmvToday: 3840.50,
    activeOrdersCount: 6,
    isFeatured: true,
  },
  {
    id: 'tenant-smashburger',
    organizationId: 'org-vance-hospitality',
    name: 'The Smashburger Co.',
    slug: 'the-smashburger-co',
    tagline: 'Triple-smashed wagyu patties & crispy truffle crinkle fries',
    logo: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 890,
    deliveryTime: '25-35 min',
    deliveryFee: 2.49,
    minOrder: 12.00,
    address: '89 Commercial Boulevard, Midtown',
    city: 'Metropolis',
    cuisine: 'Gourmet Burgers',
    tags: ['Burgers', 'Late Night', 'Comfort Food', 'Craft Shakes'],
    isOpen: true,
    phone: '+1 (555) 890-3312',
    prepTimeAvg: 18,
    gmvToday: 5120.00,
    activeOrdersCount: 8,
    isFeatured: true,
  },
  {
    id: 'tenant-akira-sushi',
    organizationId: 'org-vance-hospitality',
    name: 'Akira Omakase & Sushi Bar',
    slug: 'akira-sushi-bar',
    tagline: 'Tokyo-grade sashimi cuts, dragon rolls & hand-crafted nigiri',
    logo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=1200&auto=format&fit=crop&q=80',
    rating: 4.95,
    reviewsCount: 1240,
    deliveryTime: '30-45 min',
    deliveryFee: 3.99,
    minOrder: 25.00,
    address: '12 Kintsugi Way, Arts Quarter',
    city: 'Metropolis',
    cuisine: 'Japanese & Sushi',
    tags: ['Sushi', 'Fresh Fish', 'Premium', 'Ramen'],
    isOpen: true,
    phone: '+1 (555) 762-9900',
    prepTimeAvg: 22,
    gmvToday: 7450.25,
    activeOrdersCount: 4,
    isFeatured: true,
  },
  {
    id: 'tenant-fornino-pizza',
    organizationId: 'org-vance-hospitality',
    name: 'Fornino Woodfired Pizza',
    slug: 'fornino-woodfired-pizza',
    tagline: 'Authentic 900-degree charred sourdough Neapolitan pizza',
    logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 650,
    deliveryTime: '20-30 min',
    deliveryFee: 1.99,
    minOrder: 18.00,
    address: '77 Via Bella, Little Italy',
    city: 'Metropolis',
    cuisine: 'Italian & Pizza',
    tags: ['Woodfired', 'Pizza', 'Italian', 'Vegetarian'],
    isOpen: true,
    phone: '+1 (555) 345-1288',
    prepTimeAvg: 16,
    gmvToday: 4230.80,
    activeOrdersCount: 5,
    isFeatured: false,
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // The Green Bistro
  {
    id: 'item-gb-1',
    tenantId: 'tenant-green-bistro',
    name: 'Wild Harvest Truffle Grain Bowl',
    description: 'Ancient warm quinoa, roasted heirloom cauliflower, crispy spiced chickpeas, avocado ribbons, black truffle tahini drizzle.',
    price: 16.50,
    originalPrice: 18.50,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    isVeg: true,
    isGlutenFree: true,
    inStock: true,
    prepTimeMinutes: 12,
    calories: 540,
    options: [
      {
        name: 'Add Protein Boost',
        required: false,
        choices: [
          { name: 'Herb Grilled Chicken', priceDelta: 4.50 },
          { name: 'Organic Smoked Tofu', priceDelta: 3.50 },
          { name: 'Wild Atlantic Salmon', priceDelta: 6.50 },
          { name: 'Extra Avocado', priceDelta: 2.50 }
        ]
      },
      {
        name: 'Dressing Style',
        required: true,
        choices: [
          { name: 'Truffle Tahini (House Signature)', priceDelta: 0 },
          { name: 'Lemon Herb Vinaigrette', priceDelta: 0 },
          { name: 'Spicy Green Goddess', priceDelta: 0 }
        ]
      }
    ]
  },
  {
    id: 'item-gb-2',
    tenantId: 'tenant-green-bistro',
    name: 'Artisan Avocado & Poached Egg Toast',
    description: 'Thick toasted seeded levain bread, smashed Haas avocado, micro coriander, sumac flakes, two soft poached pasture eggs.',
    price: 13.50,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    isVeg: true,
    inStock: true,
    prepTimeMinutes: 10,
    calories: 420
  },
  {
    id: 'item-gb-3',
    tenantId: 'tenant-green-bistro',
    name: 'Cold-Pressed Green Glow Elixir',
    description: 'Hydrating cucumber, organic baby spinach, crisp green apple, ginger root, lemon zest, spirulina infusion.',
    price: 7.50,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80',
    isVeg: true,
    isGlutenFree: true,
    inStock: true,
    prepTimeMinutes: 4,
    calories: 140
  },
  {
    id: 'item-gb-4',
    tenantId: 'tenant-green-bistro',
    name: 'Roasted Sweet Potato & Cashew Soup',
    description: 'Creamy slow-simmered yam velouté with toasted spiced cashews, coconut cream float, and fresh thyme.',
    price: 9.50,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80',
    isVeg: true,
    isGlutenFree: true,
    inStock: true,
    prepTimeMinutes: 8,
    calories: 310
  },
  {
    id: 'item-gb-5',
    tenantId: 'tenant-green-bistro',
    name: 'Raw Cacao & Hazelnut Chia Pudding',
    description: 'Almond milk soaked black chia seeds layered with organic cacao mousse, roasted hazelnut crunch, and edible gold flakes.',
    price: 8.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
    isVeg: true,
    isGlutenFree: true,
    inStock: true,
    prepTimeMinutes: 5,
    calories: 280
  },

  // The Smashburger Co.
  {
    id: 'item-sb-1',
    tenantId: 'tenant-smashburger',
    name: 'The Wagyu Double Deluxe Smash',
    description: 'Two 4oz caramelized smashed Wagyu beef patties, melted aged double American cheese, caramelized onions, house pickle relish, secret smash sauce on toasted brioche.',
    price: 15.99,
    originalPrice: 17.99,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    inStock: true,
    prepTimeMinutes: 14,
    calories: 890,
    options: [
      {
        name: 'Add Extra Patty or Bacon',
        required: false,
        choices: [
          { name: 'Applewood Smoked Bacon', priceDelta: 2.50 },
          { name: 'Extra 4oz Wagyu Patty', priceDelta: 4.00 },
          { name: 'Fried Pasture Egg', priceDelta: 1.75 }
        ]
      }
    ]
  },
  {
    id: 'item-sb-2',
    tenantId: 'tenant-smashburger',
    name: 'Crisp Truffle & Parmesan Crinkle Fries',
    description: 'Golden double-fried crinkle cut potatoes tossed in white truffle oil, freshly grated 24-month Parmigiano-Reggiano, and chopped rosemary.',
    price: 6.99,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    isVeg: true,
    inStock: true,
    prepTimeMinutes: 8,
    calories: 460
  },
  {
    id: 'item-sb-3',
    tenantId: 'tenant-smashburger',
    name: 'Salted Dulce De Leche Thick Shake',
    description: 'Hand-spun Madagascar vanilla bean gelato, slow-cooked Argentine dulce de leche, Maldon sea salt crystal rim.',
    price: 7.25,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    isVeg: true,
    inStock: true,
    prepTimeMinutes: 5,
    calories: 620
  },

  // Akira Sushi Bar
  {
    id: 'item-ak-1',
    tenantId: 'tenant-akira-sushi',
    name: 'Royal Dragon Flame Maki Roll (8 pcs)',
    description: 'Crispy king prawn tempura, cucumber inside, topped with torch-seared freshwater unagi, avocado crown, sweet kabayaki glaze, and tobiko caviar.',
    price: 19.50,
    category: 'Signature',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    inStock: true,
    prepTimeMinutes: 15,
    calories: 510
  },
  {
    id: 'item-ak-2',
    tenantId: 'tenant-akira-sushi',
    name: 'Bluefin Otoro Nigiri Tasting (4 pcs)',
    description: 'Melt-in-mouth fatty Bluefin tuna belly brushed with aged nikiri soy, fresh grated Shizuoka wasabi, and yuzu zest.',
    price: 24.00,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    inStock: true,
    prepTimeMinutes: 12,
    calories: 320
  },
  {
    id: 'item-ak-3',
    tenantId: 'tenant-akira-sushi',
    name: 'Truffle Steamed Edamame',
    description: 'Young organic soybean pods tossed in black truffle sea salt and roasted sesame oil.',
    price: 6.50,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
    isVeg: true,
    isGlutenFree: true,
    inStock: true,
    prepTimeMinutes: 6,
    calories: 180
  },

  // Fornino Pizza
  {
    id: 'item-fp-1',
    tenantId: 'tenant-fornino-pizza',
    name: 'San Marzano Margherita D.O.P',
    description: 'Crushed San Marzano tomatoes, Fior di Latte mozzarella, organic fresh basil leaves, extra virgin cold-pressed olive oil, 48h sourdough crust.',
    price: 17.00,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    isVeg: true,
    inStock: true,
    prepTimeMinutes: 12,
    calories: 780
  },
  {
    id: 'item-fp-2',
    tenantId: 'tenant-fornino-pizza',
    name: 'Diavola & Hot Honey Pepperoni',
    description: 'Crispy cupping pepperoni, spicy Calabrian chili paste, whole milk mozzarella, wild clover hot honey infusion drizzle.',
    price: 19.50,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    isSpicy: true,
    inStock: true,
    prepTimeMinutes: 12,
    calories: 920
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8821',
    orderNumber: '#ORD-8821',
    tenantId: 'tenant-green-bistro',
    tenantName: 'The Green Bistro',
    tenantAddress: '452 Elmwood Avenue, Downtown District',
    customerName: 'Michael Rossi',
    customerPhone: '+1 (555) 432-1099',
    customerEmail: 'm.rossi@example.com',
    deliveryAddress: '742 Evergreen Terrace, Apt 4B, Metropolis',
    items: [
      {
        menuItemId: 'item-gb-1',
        name: 'Wild Harvest Truffle Grain Bowl',
        quantity: 2,
        price: 16.50,
        selectedOptions: { 'Add Protein Boost': 'Herb Grilled Chicken', 'Dressing Style': 'Truffle Tahini (House Signature)' },
        specialInstructions: 'Extra dressing on the side please!'
      },
      {
        menuItemId: 'item-gb-3',
        name: 'Cold-Pressed Green Glow Elixir',
        quantity: 2,
        price: 7.50
      }
    ],
    subtotal: 48.00,
    deliveryFee: 1.99,
    serviceFee: 2.50,
    discount: 5.00,
    tip: 6.00,
    total: 53.49,
    status: 'cooking',
    paymentMethod: 'apple_pay',
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    estimatedDeliveryTime: new Date(Date.now() + 18 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    riderId: 'rider-grayson-1',
    riderName: 'Grayson Comrade',
    riderPhone: '+1 (555) 778-9012',
    riderAvatar: '/umunthuhub-profile.png',
    riderRating: 4.98,
    riderVehicle: 'Yamaha E-Moped (Plate: UMN-582)',
    deliveryNotes: 'Buzz code #4092, leave at apartment door.'
  },
  {
    id: 'ord-8822',
    orderNumber: '#ORD-8822',
    tenantId: 'tenant-green-bistro',
    tenantName: 'The Green Bistro',
    tenantAddress: '452 Elmwood Avenue, Downtown District',
    customerName: 'Sarah Jenkins',
    customerPhone: '+1 (555) 893-2211',
    customerEmail: 'sarah.j@example.com',
    deliveryAddress: '1200 Grand Ave, Suite 300, Metropolis',
    items: [
      {
        menuItemId: 'item-gb-2',
        name: 'Artisan Avocado & Poached Egg Toast',
        quantity: 1,
        price: 13.50
      },
      {
        menuItemId: 'item-gb-4',
        name: 'Roasted Sweet Potato & Cashew Soup',
        quantity: 1,
        price: 9.50
      }
    ],
    subtotal: 23.00,
    deliveryFee: 1.99,
    serviceFee: 1.50,
    discount: 0,
    tip: 4.00,
    total: 30.49,
    status: 'incoming',
    paymentMethod: 'card',
    createdAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    estimatedDeliveryTime: new Date(Date.now() + 25 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  },
  {
    id: 'ord-8819',
    orderNumber: '#ORD-8819',
    tenantId: 'tenant-green-bistro',
    tenantName: 'The Green Bistro',
    tenantAddress: '452 Elmwood Avenue, Downtown District',
    customerName: 'David K.',
    customerPhone: '+1 (555) 601-3829',
    customerEmail: 'david.k@example.com',
    deliveryAddress: '315 Pine Street, Metropolis',
    items: [
      {
        menuItemId: 'item-gb-1',
        name: 'Wild Harvest Truffle Grain Bowl',
        quantity: 1,
        price: 16.50
      }
    ],
    subtotal: 16.50,
    deliveryFee: 1.99,
    serviceFee: 1.50,
    discount: 0,
    tip: 3.50,
    total: 23.49,
    status: 'ready',
    paymentMethod: 'card',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    estimatedDeliveryTime: new Date(Date.now() + 10 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    riderId: 'rider-leo-1',
    riderName: 'Leo V.'
  },
  {
    id: 'ord-8815',
    orderNumber: '#ORD-8815',
    tenantId: 'tenant-smashburger',
    tenantName: 'The Smashburger Co.',
    tenantAddress: '89 Commercial Boulevard, Midtown',
    customerName: 'Emma Watson',
    customerPhone: '+1 (555) 912-4400',
    customerEmail: 'emma.w@example.com',
    deliveryAddress: '88 Oak Ridge Way, Metropolis',
    items: [
      {
        menuItemId: 'item-sb-1',
        name: 'The Wagyu Double Deluxe Smash',
        quantity: 2,
        price: 15.99
      },
      {
        menuItemId: 'item-sb-2',
        name: 'Crisp Truffle & Parmesan Crinkle Fries',
        quantity: 2,
        price: 6.99
      }
    ],
    subtotal: 45.96,
    deliveryFee: 2.49,
    serviceFee: 2.50,
    discount: 4.00,
    tip: 5.50,
    total: 52.45,
    status: 'delivered',
    paymentMethod: 'card',
    createdAt: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    deliveredAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    estimatedDeliveryTime: 'Delivered',
    riderId: 'rider-leo-1',
    riderName: 'Leo V.',
    dropoffPhoto: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_RIDER_JOBS: RiderJob[] = [
  {
    id: 'job-101',
    orderId: 'ord-8821',
    orderNumber: '#ORD-8821',
    tenantId: 'tenant-green-bistro',
    tenantName: 'The Green Bistro',
    tenantAddress: '452 Elmwood Ave, Downtown',
    tenantPhone: '+1 (555) 234-8891',
    customerName: 'Michael Rossi',
    customerAddress: '742 Evergreen Terrace, Apt 4B',
    customerPhone: '+1 (555) 432-1099',
    payout: 8.50,
    baseFare: 5.50,
    tip: 3.00,
    distanceKm: 3.2,
    estimatedMinutes: 18,
    itemsCount: 4,
    itemsList: ['2x Wild Harvest Truffle Bowl', '2x Cold-Pressed Green Glow'],
    expiresAt: Date.now() + 45 * 1000,
    status: 'accepted',
    checklist: [
      { id: 'c1', label: 'Verify 2x Truffle Grain Bowls in thermal bag', checked: true },
      { id: 'c2', label: 'Verify 2x Cold-Pressed Juices with secure lid seal', checked: true },
      { id: 'c3', label: 'Extra dressing sauce containers packed', checked: false },
      { id: 'c4', label: 'Cutlery & eco-napkins included', checked: false }
    ],
    deliveryNotes: 'Gate code #4092. Please place on the doormat and ring the bell once.'
  }
];

export const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: 'promo-1',
    tenantId: 'tenant-green-bistro',
    code: 'WELCOME20',
    description: '20% off for first-time organic lovers',
    discountType: 'percentage',
    discountValue: 20,
    minOrder: 25.00,
    maxDiscount: 10.00,
    usageCount: 142,
    usageLimit: 500,
    expiresAt: '2026-12-31',
    isActive: true,
    revenueGenerated: 4280.00,
    targetAudience: 'First-Time'
  },
  {
    id: 'promo-2',
    tenantId: 'tenant-green-bistro',
    code: 'LUNCHBOWL',
    description: '$5 off healthy grain bowls on weekdays',
    discountType: 'fixed',
    discountValue: 5.00,
    minOrder: 20.00,
    usageCount: 298,
    usageLimit: 1000,
    expiresAt: '2026-10-15',
    isActive: true,
    revenueGenerated: 6840.50,
    targetAudience: 'All Customers'
  },
  {
    id: 'promo-3',
    tenantId: 'tenant-green-bistro',
    code: 'EPICUREAN15',
    description: 'Exclusive 15% discount for Tier Gold loyalty patrons',
    discountType: 'percentage',
    discountValue: 15,
    minOrder: 30.00,
    usageCount: 88,
    usageLimit: 300,
    expiresAt: '2026-11-30',
    isActive: true,
    revenueGenerated: 3120.00,
    targetAudience: 'VIP Loyalty'
  }
];

export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-8821',
    customerName: 'Grayson Comrade',
    customerEmail: 'grayson.comrade@umunthuhub.com',
    customerAvatar: '/umunthuhub-profile.png',
    orderId: 'ord-8821',
    orderNumber: '#ORD-8821',
    issueCategory: 'missing_items',
    status: 'open',
    priority: 'high',
    lastUpdated: '2 min ago',
    subject: 'Missing extra Truffle Tahini dressing on bowl order',
    messages: [
      {
        id: 'm1',
        sender: 'customer',
        text: 'Hi, I asked for extra truffle tahini on the side for both bowls in order #ORD-8821. Just wanted to make sure the kitchen packs it before dispatch!',
        timestamp: '11:42 AM'
      },
      {
        id: 'm2',
        sender: 'agent',
        text: 'Hello Grayson! Thanks for flagging this immediately. I have pinged The Green Bistro kitchen display system directly and they confirmed the extra dressing cups are packed.',
        timestamp: '11:44 AM'
      }
    ]
  },
  {
    id: 'tkt-8804',
    customerName: 'Grayson C. (VIP Diner)',
    customerEmail: 'grayson.vip@umunthuhub.com',
    customerAvatar: '/umunthuhub-profile.png',
    orderId: 'ord-8804',
    orderNumber: '#ORD-8804',
    issueCategory: 'late_delivery',
    status: 'resolved',
    priority: 'medium',
    lastUpdated: '1 hour ago',
    subject: 'Rider delayed due to heavy rain downtown',
    messages: [
      {
        id: 'm10',
        sender: 'customer',
        text: 'My order has been delayed by 15 minutes past the initial window.',
        timestamp: '10:15 AM'
      },
      {
        id: 'm11',
        sender: 'agent',
        text: 'We apologize for the rain traffic delay, Grayson! We issued a $5 Umunthuhub Food credit to your account.',
        timestamp: '10:18 AM'
      }
    ]
  }
];

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Grayson Comrade',
    email: 'grayson.comrade@umunthuhub.com',
    role: 'Owner',
    assignedStores: ['The Green Bistro Downtown', 'The Green Bistro Westside'],
    avatar: '/umunthuhub-profile.png',
    status: 'active',
    lastActive: 'Online now'
  },
  {
    id: 'tm-2',
    name: 'Grayson Comrade Jr.',
    email: 'grayson.chef@umunthuhub.com',
    role: 'Head Chef',
    assignedStores: ['The Green Bistro Downtown'],
    avatar: '/umunthuhub-profile.png',
    status: 'active',
    lastActive: '5m ago'
  },
  {
    id: 'tm-3',
    name: 'Grayson C. Lead',
    email: 'grayson.lead@umunthuhub.com',
    role: 'Kitchen Lead',
    assignedStores: ['The Green Bistro Downtown'],
    avatar: '/umunthuhub-profile.png',
    status: 'active',
    lastActive: '12m ago'
  }
];

export const INITIAL_LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    id: 'rew-1',
    title: '$10 Off Any Gourmet Order',
    pointsCost: 500,
    description: 'Instantly apply $10 deduction on orders over $25 at any restaurant.',
    category: 'discount',
    icon: 'local_offer',
    promoCode: 'REWARD-10-UMUNTHU'
  },
  {
    id: 'rew-2',
    title: 'Free Artisanal Side / Drink',
    pointsCost: 350,
    description: 'Claim a complimentary craft juice, shake, or gourmet side with any main.',
    category: 'free_item',
    icon: 'redeem',
    promoCode: 'FREE-SIDE-CRAFT'
  },
  {
    id: 'rew-3',
    title: 'Free Priority Delivery (3x Uses)',
    pointsCost: 200,
    description: 'Zero delivery fees on your next 3 chef-prepared meals.',
    category: 'perk',
    icon: 'bolt',
    promoCode: 'DELIV-VIP-FREE'
  }
];

export const INITIAL_CORPORATE_PACKAGES: CorporatePackage[] = [
  {
    id: 'corp-1',
    title: 'Executive Boardroom Hot Buffet',
    subtitle: 'Warm farm-fresh grain bowls, braised wagyu skewers, grilled seasonal asparagus & microgreen salad',
    category: 'buffet',
    minHeadcount: 10,
    pricePerPerson: 28.50,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&auto=format&fit=crop&q=80',
    dietaryBadges: ['Gluten-Free Options', 'Halal Available', 'Organic'],
    itemsIncluded: ['Truffle Quinoa Bowls', 'Charred Salmon Fillets', 'Green Goddess Crudité', 'Sparkling Yuzu Sodas'],
    popularFor: 'Quarterly Planning & Executive Lunches'
  },
  {
    id: 'corp-2',
    title: 'Gourmet Artisan Boxed Lunches',
    subtitle: 'Individually packaged premium meals with sides, craft cold-pressed drink & dessert in eco-box',
    category: 'boxed',
    minHeadcount: 8,
    pricePerPerson: 19.00,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    dietaryBadges: ['Vegan Option', 'Nut-Free Certified', 'Custom Labels'],
    itemsIncluded: ['Choice of Signature Wrap/Bowl', 'Kettle Chips or Salad', 'Raw Chia Cacao Pot', 'Cold Press Juice'],
    popularFor: 'All-Hands Meetings & Workshop Days'
  },
  {
    id: 'corp-3',
    title: 'Artisan Grazing & Mezze Platter',
    subtitle: 'Imported artisanal cheeses, smoked cured meats, honeycomb, organic grapes, crackers & dips',
    category: 'platter',
    minHeadcount: 15,
    pricePerPerson: 22.00,
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&auto=format&fit=crop&q=80',
    dietaryBadges: ['Vegetarian Friendly', 'Keto Friendly'],
    itemsIncluded: ['Charcuterie Selection', 'Marinated Olives & Feta', 'Artisan Sourdough Crisps', 'Fig Preserves'],
    popularFor: 'Friday Happy Hours & Client Receptions'
  }
];

export const INITIAL_STAFF_MEMBERS: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Grayson Comrade (Head Chef)',
    email: 'grayson.chef@umunthuhub.com',
    phone: '+1 (555) 301-4490',
    role: 'Head Chef',
    storeId: 'tenant-green-bistro',
    storeName: 'The Green Bistro',
    station: 'Head Chef',
    avatar: '/umunthuhub-profile.png',
    status: 'on_shift',
    hourlyRate: 34.50,
    weeklyHours: 38.5,
    rating: 4.95,
    certifications: ['ServSafe Manager', 'HACCP Culinary Safety', 'Allergen Awareness Certified'],
    clockInTime: '08:00 AM',
    permissions: {
      canAccessKDS: true,
      canApproveRefunds: true,
      canEditMenu: true,
      canManageInventory: true,
      canViewFinancials: true,
      canManageRoster: true
    },
    hireDate: 'Jan 15, 2024'
  },
  {
    id: 'staff-2',
    name: 'Grayson Comrade (Supervisor)',
    email: 'grayson.ops@umunthuhub.com',
    phone: '+1 (555) 301-4491',
    role: 'Shift Supervisor',
    storeId: 'tenant-smashburger',
    storeName: 'The Smashburger Co.',
    station: 'Expeditor & QC',
    avatar: '/umunthuhub-profile.png',
    status: 'on_shift',
    hourlyRate: 26.00,
    weeklyHours: 40.0,
    rating: 4.90,
    certifications: ['ServSafe Food Handler', 'First Aid / CPR Certified'],
    clockInTime: '09:30 AM',
    permissions: {
      canAccessKDS: true,
      canApproveRefunds: true,
      canEditMenu: false,
      canManageInventory: true,
      canViewFinancials: false,
      canManageRoster: true
    },
    hireDate: 'Mar 10, 2024'
  },
  {
    id: 'staff-3',
    name: 'Grayson Comrade (Sushi Master)',
    email: 'grayson.sushi@umunthuhub.com',
    phone: '+1 (555) 301-4492',
    role: 'Sous Chef',
    storeId: 'tenant-akira-sushi',
    storeName: 'Akira Omakase & Sushi Bar',
    station: 'Sous Chef',
    avatar: '/umunthuhub-profile.png',
    status: 'on_shift',
    hourlyRate: 31.00,
    weeklyHours: 36.0,
    rating: 4.98,
    certifications: ['Master Sushi Guild Level 3', 'Seafood Safety HACCP'],
    clockInTime: '10:00 AM',
    permissions: {
      canAccessKDS: true,
      canApproveRefunds: false,
      canEditMenu: true,
      canManageInventory: true,
      canViewFinancials: false,
      canManageRoster: false
    },
    hireDate: 'Feb 01, 2024'
  },
  {
    id: 'staff-4',
    name: 'Grayson Comrade (Pizzaiolo)',
    email: 'grayson.pizza@umunthuhub.com',
    phone: '+1 (555) 301-4493',
    role: 'Line Cook',
    storeId: 'tenant-fornino-pizza',
    storeName: 'Fornino Woodfired Pizza',
    station: 'Line Cook & Grill',
    avatar: '/umunthuhub-profile.png',
    status: 'on_break',
    hourlyRate: 23.50,
    weeklyHours: 32.0,
    rating: 4.85,
    certifications: ['Woodfire Safety Level 2', 'ServSafe Food Handler'],
    clockInTime: '11:15 AM',
    permissions: {
      canAccessKDS: true,
      canApproveRefunds: false,
      canEditMenu: false,
      canManageInventory: false,
      canViewFinancials: false,
      canManageRoster: false
    },
    hireDate: 'Apr 18, 2024'
  },
  {
    id: 'staff-5',
    name: 'Grayson Comrade (Barista & Front)',
    email: 'grayson.barista@umunthuhub.com',
    phone: '+1 (555) 301-4494',
    role: 'Barista',
    storeId: 'tenant-green-bistro',
    storeName: 'The Green Bistro',
    station: 'Barista & Beverages',
    avatar: '/umunthuhub-profile.png',
    status: 'off_duty',
    hourlyRate: 20.00,
    weeklyHours: 25.0,
    rating: 4.92,
    certifications: ['Specialty Coffee Association', 'Customer Hospitality Excellence'],
    permissions: {
      canAccessKDS: true,
      canApproveRefunds: false,
      canEditMenu: false,
      canManageInventory: false,
      canViewFinancials: false,
      canManageRoster: false
    },
    hireDate: 'May 04, 2024'
  }
];

export const INITIAL_STAFF_SHIFTS: StaffShift[] = [
  { id: 'shift-1', staffId: 'staff-1', staffName: 'Grayson Comrade (Head Chef)', day: 'Monday', startTime: '08:00 AM', endTime: '04:30 PM', station: 'Head Chef', storeId: 'tenant-green-bistro', storeName: 'The Green Bistro' },
  { id: 'shift-2', staffId: 'staff-2', staffName: 'Grayson Comrade (Supervisor)', day: 'Monday', startTime: '09:30 AM', endTime: '06:00 PM', station: 'Expeditor & QC', storeId: 'tenant-smashburger', storeName: 'The Smashburger Co.' },
  { id: 'shift-3', staffId: 'staff-3', staffName: 'Grayson Comrade (Sushi Master)', day: 'Monday', startTime: '10:00 AM', endTime: '06:30 PM', station: 'Sous Chef', storeId: 'tenant-akira-sushi', storeName: 'Akira Omakase & Sushi Bar' },
  { id: 'shift-4', staffId: 'staff-4', staffName: 'Grayson Comrade (Pizzaiolo)', day: 'Monday', startTime: '11:15 AM', endTime: '07:45 PM', station: 'Line Cook & Grill', storeId: 'tenant-fornino-pizza', storeName: 'Fornino Woodfired Pizza' },
  { id: 'shift-5', staffId: 'staff-1', staffName: 'Grayson Comrade (Head Chef)', day: 'Tuesday', startTime: '08:00 AM', endTime: '04:30 PM', station: 'Head Chef', storeId: 'tenant-green-bistro', storeName: 'The Green Bistro' },
  { id: 'shift-6', staffId: 'staff-5', staffName: 'Grayson Comrade (Barista & Front)', day: 'Tuesday', startTime: '07:00 AM', endTime: '03:00 PM', station: 'Barista & Beverages', storeId: 'tenant-green-bistro', storeName: 'The Green Bistro' },
  { id: 'shift-7', staffId: 'staff-2', staffName: 'Grayson Comrade (Supervisor)', day: 'Wednesday', startTime: '10:00 AM', endTime: '06:30 PM', station: 'Expeditor & QC', storeId: 'tenant-smashburger', storeName: 'The Smashburger Co.' },
  { id: 'shift-8', staffId: 'staff-3', staffName: 'Grayson Comrade (Sushi Master)', day: 'Thursday', startTime: '10:00 AM', endTime: '06:30 PM', station: 'Sous Chef', storeId: 'tenant-akira-sushi', storeName: 'Akira Omakase & Sushi Bar' },
];

export const INITIAL_PLATFORM_SETTINGS: PlatformSettings = {
  platformName: 'Umunthuhub-Foods',
  tagline: 'Multi-Tenant Food Court, Cloud Kitchen & Dispatch OS',
  supportEmail: 'support@umunthuhub.com',
  supportPhone: '+1 (555) 789-0123',
  currency: 'USD',
  currencySymbol: '$',
  timezone: 'America/New_York (EST)',
  defaultCommissionRate: 12.0,
  serviceFeePercentage: 3.5,
  minOrderRequirement: 12.00,
  autoApproveNewTenants: true,
  instantPayoutsEnabled: true,
  maxActiveOrdersPerDriver: 2,
  defaultDeliveryRadiusKm: 12.0,
  kitchenChimeEnabled: true,
  kitchenAlertSound: 'bell',
  autoPrintKitchenTickets: true,
  rushHourPrepBufferMinutes: 5,
  enableTwoFactorAuth: true,
  sessionTimeoutMinutes: 60,
  enforceZeroWastePackaging: true,
  themeMode: 'light',
  brandAccentColor: '#ab3500'
};

// IndexedDB Helper with LocalStorage Fallback
const DB_NAME = 'UmunthuhubFoodsDB';
const DB_VERSION = 1;

class UmunthuhubStorageService {
  private memoryCache: {
    tenants: Tenant[];
    menuItems: MenuItem[];
    orders: Order[];
    riderJobs: RiderJob[];
    promotions: Promotion[];
    supportTickets: SupportTicket[];
    teamMembers: TeamMember[];
    loyaltyRewards: LoyaltyReward[];
    loyaltyPoints: number;
    corporatePackages: CorporatePackage[];
    staffMembers: StaffMember[];
    staffShifts: StaffShift[];
    platformSettings: PlatformSettings;
    adminUsers: AdminUser[];
  };

  constructor() {
    this.memoryCache = {
      tenants: INITIAL_TENANTS,
      menuItems: INITIAL_MENU_ITEMS,
      orders: INITIAL_ORDERS,
      riderJobs: INITIAL_RIDER_JOBS,
      promotions: INITIAL_PROMOTIONS,
      supportTickets: INITIAL_SUPPORT_TICKETS,
      teamMembers: INITIAL_TEAM_MEMBERS,
      loyaltyRewards: INITIAL_LOYALTY_REWARDS,
      loyaltyPoints: 2450,
      corporatePackages: INITIAL_CORPORATE_PACKAGES,
      staffMembers: INITIAL_STAFF_MEMBERS,
      staffShifts: INITIAL_STAFF_SHIFTS,
      platformSettings: INITIAL_PLATFORM_SETTINGS,
      adminUsers: [
        {
          id: 'admin-1',
          email: 'admin@vancehospitality.com',
          fullName: 'Chef Alexandra Vance',
          orgName: 'Vance Gourmet Hospitality Group',
          organizationId: 'org-vance-hospitality',
          businessType: 'Restaurant Group',
          createdAt: new Date().toISOString(),
        }
      ],
    };
    this.initFromLocalStorage();
  }

  private initFromLocalStorage() {
    try {
      const savedTenants = localStorage.getItem('umunthu_tenants');
      if (savedTenants) this.memoryCache.tenants = JSON.parse(savedTenants);

      const savedMenuItems = localStorage.getItem('umunthu_menu_items');
      if (savedMenuItems) this.memoryCache.menuItems = JSON.parse(savedMenuItems);

      const savedOrders = localStorage.getItem('umunthu_orders');
      if (savedOrders) this.memoryCache.orders = JSON.parse(savedOrders);

      const savedJobs = localStorage.getItem('umunthu_rider_jobs');
      if (savedJobs) this.memoryCache.riderJobs = JSON.parse(savedJobs);

      const savedPromos = localStorage.getItem('umunthu_promotions');
      if (savedPromos) this.memoryCache.promotions = JSON.parse(savedPromos);

      const savedTickets = localStorage.getItem('umunthu_support_tickets');
      if (savedTickets) this.memoryCache.supportTickets = JSON.parse(savedTickets);

      const savedPoints = localStorage.getItem('umunthu_loyalty_points');
      if (savedPoints) this.memoryCache.loyaltyPoints = JSON.parse(savedPoints);

      const savedStaff = localStorage.getItem('umunthu_staff_members');
      if (savedStaff) this.memoryCache.staffMembers = JSON.parse(savedStaff);

      const savedShifts = localStorage.getItem('umunthu_staff_shifts');
      if (savedShifts) this.memoryCache.staffShifts = JSON.parse(savedShifts);

      const savedSettings = localStorage.getItem('umunthu_platform_settings');
      if (savedSettings) this.memoryCache.platformSettings = JSON.parse(savedSettings);

      const savedAdminUsers = localStorage.getItem('umunthu_admin_users');
      if (savedAdminUsers) this.memoryCache.adminUsers = JSON.parse(savedAdminUsers);
    } catch {
      // ignore storage errors in sandbox
    }
  }

  private saveToLocalStorage(key: string, data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // ignore
    }
  }

  // Getters
  getTenants(): Tenant[] {
    return [...this.memoryCache.tenants];
  }

  getMenuItems(tenantId?: string): MenuItem[] {
    if (!tenantId) return [...this.memoryCache.menuItems];
    return this.memoryCache.menuItems.filter(item => item.tenantId === tenantId);
  }

  getOrders(tenantId?: string): Order[] {
    if (!tenantId) return [...this.memoryCache.orders];
    return this.memoryCache.orders.filter(order => order.tenantId === tenantId);
  }

  getRiderJobs(): RiderJob[] {
    return [...this.memoryCache.riderJobs];
  }

  getPromotions(tenantId?: string): Promotion[] {
    if (!tenantId) return [...this.memoryCache.promotions];
    return this.memoryCache.promotions.filter(p => p.tenantId === tenantId);
  }

  getSupportTickets(): SupportTicket[] {
    return [...this.memoryCache.supportTickets];
  }

  getTeamMembers(): TeamMember[] {
    return [...this.memoryCache.teamMembers];
  }

  getLoyaltyRewards(): LoyaltyReward[] {
    return [...this.memoryCache.loyaltyRewards];
  }

  getLoyaltyPoints(): number {
    return this.memoryCache.loyaltyPoints;
  }

  getCorporatePackages(): CorporatePackage[] {
    return [...this.memoryCache.corporatePackages];
  }

  getStaffMembers(): StaffMember[] {
    return [...this.memoryCache.staffMembers];
  }

  getStaffShifts(): StaffShift[] {
    return [...this.memoryCache.staffShifts];
  }

  getPlatformSettings(): PlatformSettings {
    return { ...this.memoryCache.platformSettings };
  }

  // Mutations
  addOrder(order: Order): Order {
    this.memoryCache.orders = [order, ...this.memoryCache.orders];
    this.saveToLocalStorage('enita_orders', this.memoryCache.orders);

    // Also auto-create a rider job offer
    const newJob: RiderJob = {
      id: 'job-' + Date.now(),
      orderId: order.id,
      orderNumber: order.orderNumber,
      tenantId: order.tenantId,
      tenantName: order.tenantName,
      tenantAddress: order.tenantAddress,
      tenantPhone: '+1 (555) 234-8891',
      customerName: order.customerName,
      customerAddress: order.deliveryAddress,
      customerPhone: order.customerPhone,
      payout: Number((5.50 + order.tip).toFixed(2)),
      baseFare: 5.50,
      tip: order.tip,
      distanceKm: 2.8,
      estimatedMinutes: 16,
      itemsCount: order.items.reduce((acc, i) => acc + i.quantity, 0),
      itemsList: order.items.map(i => `${i.quantity}x ${i.name}`),
      expiresAt: Date.now() + 45 * 1000,
      status: 'accepted',
      checklist: order.items.map((i, idx) => ({
        id: `c-${idx}`,
        label: `Verify ${i.quantity}x ${i.name}`,
        checked: false
      }))
    };
    this.memoryCache.riderJobs = [newJob, ...this.memoryCache.riderJobs];
    this.saveToLocalStorage('enita_rider_jobs', this.memoryCache.riderJobs);

    return order;
  }

  updateOrderStatus(orderId: string, status: Order['status']): Order | undefined {
    const order = this.memoryCache.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      if (status === 'cooking') order.cookingStartedAt = new Date().toISOString();
      if (status === 'ready') order.readyAt = new Date().toISOString();
      if (status === 'picked_up') order.pickedUpAt = new Date().toISOString();
      if (status === 'delivered') order.deliveredAt = new Date().toISOString();
      this.saveToLocalStorage('enita_orders', this.memoryCache.orders);
    }
    return order;
  }

  updateRiderJobStatus(jobId: string, status: RiderJob['status']): RiderJob | undefined {
    const job = this.memoryCache.riderJobs.find(j => j.id === jobId);
    if (job) {
      job.status = status;
      this.saveToLocalStorage('enita_rider_jobs', this.memoryCache.riderJobs);
      
      // Sync corresponding order status
      if (status === 'picked_up') {
        this.updateOrderStatus(job.orderId, 'picked_up');
      } else if (status === 'completed') {
        this.updateOrderStatus(job.orderId, 'delivered');
      }
    }
    return job;
  }

  toggleJobChecklistItem(jobId: string, checkId: string): void {
    const job = this.memoryCache.riderJobs.find(j => j.id === jobId);
    if (job) {
      const item = job.checklist.find(c => c.id === checkId);
      if (item) item.checked = !item.checked;
      this.saveToLocalStorage('enita_rider_jobs', this.memoryCache.riderJobs);
    }
  }

  addMenuItem(item: MenuItem): void {
    this.memoryCache.menuItems.unshift(item);
    this.saveToLocalStorage('enita_menu_items', this.memoryCache.menuItems);
  }

  updateMenuItem(item: MenuItem): void {
    const idx = this.memoryCache.menuItems.findIndex(m => m.id === item.id);
    if (idx !== -1) {
      this.memoryCache.menuItems[idx] = item;
      this.saveToLocalStorage('enita_menu_items', this.memoryCache.menuItems);
    }
  }

  toggleMenuItemStock(itemId: string): void {
    const item = this.memoryCache.menuItems.find(m => m.id === itemId);
    if (item) {
      item.inStock = !item.inStock;
      this.saveToLocalStorage('enita_menu_items', this.memoryCache.menuItems);
    }
  }

  addPromotion(promo: Promotion): void {
    this.memoryCache.promotions.unshift(promo);
    this.saveToLocalStorage('enita_promotions', this.memoryCache.promotions);
  }

  togglePromotion(promoId: string): void {
    const p = this.memoryCache.promotions.find(pr => pr.id === promoId);
    if (p) {
      p.isActive = !p.isActive;
      this.saveToLocalStorage('enita_promotions', this.memoryCache.promotions);
    }
  }

  sendSupportMessage(ticketId: string, text: string, sender: 'customer' | 'agent'): void {
    const ticket = this.memoryCache.supportTickets.find(t => t.id === ticketId);
    if (ticket) {
      ticket.messages.push({
        id: 'msg-' + Date.now(),
        sender,
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      ticket.lastUpdated = 'Just now';
      this.saveToLocalStorage('enita_support_tickets', this.memoryCache.supportTickets);
    }
  }

  resolveTicket(ticketId: string, status: SupportTicket['status']): void {
    const ticket = this.memoryCache.supportTickets.find(t => t.id === ticketId);
    if (ticket) {
      ticket.status = status;
      this.saveToLocalStorage('enita_support_tickets', this.memoryCache.supportTickets);
    }
  }

  deductPoints(points: number): number {
    this.memoryCache.loyaltyPoints = Math.max(0, this.memoryCache.loyaltyPoints - points);
    this.saveToLocalStorage('enita_loyalty_points', this.memoryCache.loyaltyPoints);
    return this.memoryCache.loyaltyPoints;
  }

  addPoints(points: number): number {
    this.memoryCache.loyaltyPoints += points;
    this.saveToLocalStorage('enita_loyalty_points', this.memoryCache.loyaltyPoints);
    return this.memoryCache.loyaltyPoints;
  }

  addTeamMember(member: TeamMember): void {
    this.memoryCache.teamMembers.push(member);
  }

  addStaffMember(staff: StaffMember): void {
    this.memoryCache.staffMembers.unshift(staff);
    this.saveToLocalStorage('umunthu_staff_members', this.memoryCache.staffMembers);
  }

  updateStaffMember(staff: StaffMember): void {
    const idx = this.memoryCache.staffMembers.findIndex(s => s.id === staff.id);
    if (idx !== -1) {
      this.memoryCache.staffMembers[idx] = staff;
      this.saveToLocalStorage('umunthu_staff_members', this.memoryCache.staffMembers);
    }
  }

  deleteStaffMember(id: string): void {
    this.memoryCache.staffMembers = this.memoryCache.staffMembers.filter(s => s.id !== id);
    this.saveToLocalStorage('umunthu_staff_members', this.memoryCache.staffMembers);
  }

  updateStaffStatus(id: string, status: StaffMember['status']): void {
    const staff = this.memoryCache.staffMembers.find(s => s.id === id);
    if (staff) {
      staff.status = status;
      if (status === 'on_shift' && !staff.clockInTime) {
        staff.clockInTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (status === 'off_duty') {
        staff.clockInTime = undefined;
      }
      this.saveToLocalStorage('umunthu_staff_members', this.memoryCache.staffMembers);
    }
  }

  addStaffShift(shift: StaffShift): void {
    this.memoryCache.staffShifts.unshift(shift);
    this.saveToLocalStorage('umunthu_staff_shifts', this.memoryCache.staffShifts);
  }

  deleteStaffShift(id: string): void {
    this.memoryCache.staffShifts = this.memoryCache.staffShifts.filter(s => s.id !== id);
    this.saveToLocalStorage('umunthu_staff_shifts', this.memoryCache.staffShifts);
  }

  updatePlatformSettings(settings: Partial<PlatformSettings>): PlatformSettings {
    this.memoryCache.platformSettings = {
      ...this.memoryCache.platformSettings,
      ...settings
    };
    this.saveToLocalStorage('umunthu_platform_settings', this.memoryCache.platformSettings);
    return { ...this.memoryCache.platformSettings };
  }

  addTenant(tenant: Tenant): void {
    this.memoryCache.tenants.push(tenant);
    this.saveToLocalStorage('umunthuhub_tenants', this.memoryCache.tenants);
  }

  // ── Prototype Auth Methods ─────────────────────────────────────────────────

  registerUser(data: Omit<AdminUser, 'id' | 'createdAt'>): AdminUser {
    const existing = this.memoryCache.adminUsers.find(
      (u) => u.email.toLowerCase() === data.email.toLowerCase()
    );
    if (existing) return existing; 

    const newUser: AdminUser = {
      id: `user-${Date.now()}`,
      email: data.email,
      fullName: data.fullName,
      orgName: data.orgName,
      organizationId: data.organizationId,
      businessType: data.businessType,
      createdAt: new Date().toISOString(),
    };
    this.memoryCache.adminUsers.push(newUser);
    this.saveToLocalStorage('umunthu_admin_users', this.memoryCache.adminUsers);
    return newUser;
  }

  findUserByEmail(email: string): AdminUser | undefined {
    return this.memoryCache.adminUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
  }

  getAdminUsers(): AdminUser[] {
    return [...this.memoryCache.adminUsers];
  }
}

export const dbService = new UmunthuhubStorageService();
