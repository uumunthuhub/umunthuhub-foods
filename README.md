# Umunthuhub Foods

A comprehensive food delivery platform built as a monorepo with multiple applications for different user personas. The platform supports customers, vendors, riders, administrators, and corporate clients with specialized interfaces for each role.

## 🏗️ Architecture

This project uses a **monorepo architecture** with pnpm workspaces, enabling code sharing and consistent development across multiple applications.

### Structure

```
umunthuhub-foods/
├── apps/
│   ├── admin/          # Admin portal for platform management
│   └── customer/       # Customer-facing ordering application
├── packages/
│   ├── ui/            # Shared React UI components
│   └── shared-types/  # Shared TypeScript type definitions
└── package.json       # Root package.json with workspace scripts
```

## 🚀 Applications

### Admin Portal (`apps/admin`)
- **Port**: 3001
- **Purpose**: Platform administration and management
- **Features**:
  - Organization and tenant management
  - Staff and team management
  - Billing and payouts
  - Support ticket handling
  - Platform settings and configuration
  - Store setup wizard
  - Analytics and reporting

### Customer App (`apps/customer`)
- **Port**: 3000
- **Purpose**: Customer-facing food ordering interface
- **Features**:
  - Restaurant browsing and search
  - Menu browsing and customization
  - Cart and checkout
  - Order tracking
  - Rewards and loyalty program
  - 3D visualizations (Three.js)

## 📦 Shared Packages

### `@umunthuhub/ui`
Shared React UI components used across applications:
- Reusable component library
- Consistent design system
- Type-safe components

### `@umunthuhub/shared-types`
Centralized TypeScript type definitions for the entire platform:
- **Personas**: Customer, Vendor, Rider, Admin, Corporate
- **Data Models**: Orders, Menu Items, Tenants, Staff, Promotions, etc.
- **Type Safety**: Ensures consistency across all applications

## 🛠️ Tech Stack

### Core Technologies
- **Next.js 16.3.1** - React framework with App Router
- **React 19.2.8** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **pnpm 10.33.2** - Package manager and workspace management

### Additional Libraries
- **canvas-confetti** - Celebration effects
- **recharts** - Data visualization (admin portal)
- **three** - 3D graphics (customer app)

## 📋 Prerequisites

- Node.js (v20 or higher)
- pnpm (v10.33.2 or higher)

## 🏃 Getting Started

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

Run all applications in development mode:
```bash
pnpm dev
```

Run specific applications:
```bash
# Customer app only (port 3000)
pnpm dev:customer

# Admin portal only (port 3001)
pnpm dev:admin
```

### Build

Build all applications:
```bash
pnpm build
```

Build specific applications:
```bash
pnpm build:customer
pnpm build:admin
```

### Type Checking

Check types across all packages:
```bash
pnpm type-check
```

### Linting

Lint all applications:
```bash
pnpm lint
```

## 🎯 Key Features

### Multi-Platform Support
- **Customer App**: Browse restaurants, order food, track deliveries
- **Admin Portal**: Manage platform, tenants, staff, and operations
- **Vendor Portal**: Kitchen display system, menu management (planned)
- **Rider App**: Delivery job management and tracking (planned)
- **Corporate Portal**: Team orders and subscriptions (planned)

### Data Models
The platform includes comprehensive type definitions for:
- Organizations and tenants
- Menu items with customization options
- Orders with full lifecycle tracking
- Rider jobs and delivery management
- Staff management and scheduling
- Promotions and loyalty rewards
- Support tickets and messaging
- Corporate packages and subscriptions

### User Roles
- **Customer**: End users ordering food
- **Vendor**: Restaurant owners and staff
- **Rider**: Delivery drivers
- **Admin**: Platform administrators
- **Corporate**: Business clients with team ordering

## 🔧 Configuration

### Environment Setup
Each application can have its own environment variables. Create `.env.local` files in the respective app directories:

```bash
# apps/admin/.env.local
# apps/customer/.env.local
```

### Workspace Configuration
The monorepo is configured via `pnpm-workspace.yaml`:
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm dev:customer` | Start customer app only |
| `pnpm dev:admin` | Start admin portal only |
| `pnpm build` | Build all applications |
| `pnpm build:customer` | Build customer app only |
| `pnpm build:admin` | Build admin portal only |
| `pnpm lint` | Lint all applications |
| `pnpm type-check` | Type check all packages |

## 🌐 Deployment

### Customer App
```bash
cd apps/customer
pnpm build
pnpm start
```

### Admin Portal
```bash
cd apps/admin
pnpm build
pnpm start
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run type checks and linting
4. Test your changes
5. Submit a pull request

## 📄 License

This project is licensed under an **Exclusive Commercial License**. This is a paid, proprietary license. See the [LICENSE](LICENSE) file for full terms and conditions.

**License Fee**: $40,000+ USD (subject to negotiation)

For licensing inquiries, contact:
- Email: graysoncomrade7@gmail.com
- Phone: +265 992 629 908 / +265 883 220 981

## 📞 Support

For support, please contact the platform administrators through the admin portal or email support@umunthuhub.com.
