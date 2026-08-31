# Umunthuhub Foods - Project Blueprint

This blueprint provides modular, feature-by-feature instructions for recreating the Umunthuhub Foods project.

## Project Overview

**Type**: Monorepo (pnpm workspaces)
**Purpose**: Food delivery platform with multiple user personas
**License**: Exclusive Commercial License

## Critical Development Standards

### No Web Modals
- **NEVER use browser native modals** (e.g., `confirm()`, `alert()`, `prompt()`)
- **ALWAYS use in-app modals** for confirmations, warnings, and user interactions
- All delete actions must use custom confirmation modals with proper styling
- Modals must match the application's design system and theming

### Dark Mode Theming
- **ALL components must support dark mode** via `themeMode` from `useApp` context
- **NEVER show white backgrounds or hardcoded light colors** in dark mode
- Use conditional Tailwind classes based on `themeMode`:
  - Dark mode: `bg-[#242625]`, `bg-[#383a39]`, `border-[#3a3a3a]`, `text-[#f5f5f5]`, `text-[#c4c4c4]`, `text-[#7a7a7a]`
  - Light mode: `bg-white`, `bg-gray-50`, `border-[#e1bfb5]`, `text-[#1a1c1c]`, `text-[#594139]`, `text-[#8d7168]`
- Apply theming to: modals, inputs, selects, buttons, tables, cards, borders, text
- Test all components in both light and dark modes

### TypeScript Strictness
- **TypeScript strict mode is enabled** across all packages
- **NEVER use `any` types** - always define proper types
- Use types from `@umunthuhub/shared-types` when available
- All components must be fully typed
- Run `pnpm type-check` before committing changes

## Prerequisites

- Node.js v20 or higher
- pnpm v10.33.2 or higher

## Module 1: Core Infrastructure Setup

**Goal**: Initialize monorepo structure with workspace configuration

### Steps

```bash
# 1. Create project directory
mkdir umunthuhub-foods
cd umunthuhub-foods

# 2. Initialize root package.json
pnpm init
```

Create `package.json`:
```json
{
  "name": "umunthuhub-foods",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "pnpm --filter \"./apps/**\" dev",
    "dev:customer": "pnpm --filter customer-app dev",
    "dev:admin": "pnpm --filter admin-portal dev",
    "build": "pnpm --filter \"./apps/**\" build",
    "build:customer": "pnpm --filter customer-app build",
    "build:admin": "pnpm --filter admin-portal build",
    "lint": "pnpm --filter \"./apps/**\" lint",
    "type-check": "pnpm --filter \"./packages/**\" type-check"
  },
  "devDependencies": {
    "typescript": "^5"
  },
  "packageManager": "pnpm@10.33.2"
}
```

Create `pnpm-workspace.yaml`:
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

Create base directory structure:
```bash
mkdir -p apps/admin apps/customer packages/ui packages/shared-types
```

**Verification**: Run `pnpm install` to ensure workspace is configured correctly.

---

## Module 2: Shared Types Package

**Goal**: Create centralized TypeScript type definitions for the platform

### Dependencies
- typescript: ^5

### Steps

Create `packages/shared-types/package.json`:
```json
{
  "name": "@umunthuhub/shared-types",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsc",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5"
  }
}
```

Create `packages/shared-types/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["esnext"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Create `packages/shared-types/src/index.ts` with type definitions:
- Personas (Customer, Vendor, Rider, Admin, Corporate)
- Data models (Orders, Menu Items, Tenants, Staff, Promotions)
- Common interfaces

**Verification**: Run `pnpm --filter @umunthuhub/shared-types type-check`

---

## Module 3: Shared UI Package

**Goal**: Create reusable React UI components

### Dependencies
- react: 19.2.8
- react-dom: 19.2.8
- @types/react: ^19
- @types/react-dom: ^19
- typescript: ^5

### Steps

Create `packages/ui/package.json`:
```json
{
  "name": "@umunthuhub/ui",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsc",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "19.2.8",
    "react-dom": "19.2.8"
  },
  "devDependencies": {
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5"
  }
}
```

Create `packages/ui/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["node_modules"]
}
```

Create `packages/ui/src/index.ts`:
```typescript
export { ScrollableContainer } from './ScrollableContainer';
```

Create component files (e.g., `ScrollableContainer.tsx`).

**Verification**: Run `pnpm --filter @umunthuhub/ui type-check`

---

## Module 4: Admin Portal - Core Setup

**Goal**: Initialize Next.js 16 admin portal with basic configuration

### Dependencies
- next: 16.3.1
- react: 19.2.8
- react-dom: 19.2.8
- @umunthuhub/shared-types: workspace:*
- @umunthuhub/ui: workspace:*
- @tailwindcss/postcss: ^4
- tailwindcss: ^4
- @types/node: ^20
- @types/react: ^19
- @types/react-dom: ^19
- eslint: ^9
- eslint-config-next: 16.3.1
- typescript: ^5

### Steps

Create `apps/admin/package.json`:
```json
{
  "name": "admin-portal",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001",
    "lint": "eslint"
  },
  "dependencies": {
    "@umunthuhub/shared-types": "workspace:*",
    "@umunthuhub/ui": "workspace:*",
    "next": "16.3.1",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "lucide-react": "^1.37.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.3.1",
    "tailwindcss": "^4",
    "typescript": "^5"
  },
  "packageManager": "pnpm@10.33.2"
}
```

Create `apps/admin/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

Create `apps/admin/next.config.ts`:
```typescript
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, "../../"),
  },
};

export default nextConfig;
```

Create `apps/admin/postcss.config.mjs`:
```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

Create `apps/admin/eslint.config.mjs`:
```javascript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

Create basic Next.js structure:
- `apps/admin/app/layout.tsx`
- `apps/admin/app/page.tsx`
- `apps/admin/app/globals.css`
- `apps/admin/index.css`

**Verification**: Run `pnpm dev:admin` to start the admin portal on port 3001

---

## Module 5: Admin Portal - Analytics Feature

**Goal**: Add data visualization capabilities using Recharts

### Additional Dependencies
- recharts: ^3.10.1

### Steps

Add to `apps/admin/package.json` dependencies:
```json
"recharts": "^3.10.1"
```

Install dependencies:
```bash
pnpm install
```

Create analytics components:
- Dashboard charts
- Revenue graphs
- Order statistics
- Performance metrics

**Verification**: Test analytics components render correctly in admin portal

---

## Module 6: Admin Portal - Celebration Effects

**Goal**: Add celebration effects for successful actions

### Additional Dependencies
- canvas-confetti: ^1.9.4
- @types/canvas-confetti: ^1.9.0

### Steps

Add to `apps/admin/package.json`:
```json
"canvas-confetti": "^1.9.4"
```

Add to devDependencies:
```json
"@types/canvas-confetti": "^1.9.0"
```

Install dependencies:
```bash
pnpm install
```

Create confetti utility components for:
- Order completion celebrations
- Achievement unlocks
- Milestone celebrations

**Verification**: Test confetti effects trigger on appropriate actions

---

## Module 7: Customer App - Core Setup

**Goal**: Initialize Next.js 16 customer app with basic configuration

### Dependencies
- next: 16.3.1
- react: 19.2.8
- react-dom: 19.2.8
- @umunthuhub/shared-types: workspace:*
- @umunthuhub/ui: workspace:*
- @tailwindcss/postcss: ^4
- tailwindcss: ^4
- @types/node: ^20
- @types/react: ^19
- @types/react-dom: ^19
- eslint: ^9
- eslint-config-next: 16.3.1
- typescript: ^5

### Steps

Create `apps/customer/package.json`:
```json
{
  "name": "customer-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "eslint"
  },
  "dependencies": {
    "@umunthuhub/shared-types": "workspace:*",
    "@umunthuhub/ui": "workspace:*",
    "next": "16.3.1",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "lucide-react": "^1.37.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.3.1",
    "tailwindcss": "^4",
    "typescript": "^5"
  },
  "packageManager": "pnpm@10.33.2"
}
```

Create identical config files as admin portal:
- `apps/customer/tsconfig.json`
- `apps/customer/next.config.ts`
- `apps/customer/postcss.config.mjs`
- `apps/customer/eslint.config.mjs`

Create basic Next.js structure:
- `apps/customer/app/layout.tsx`
- `apps/customer/app/page.tsx`
- `apps/customer/app/globals.css`
- `apps/customer/index.css`

**Verification**: Run `pnpm dev:customer` to start the customer app on port 3000

---

## Module 8: Customer App - 3D Visualizations

**Goal**: Add Three.js for 3D food visualizations

### Additional Dependencies
- three: ^0.185.1
- @types/three: ^0.185.4

### Steps

Add to `apps/customer/package.json` dependencies:
```json
"three": "^0.185.1"
```

Add to devDependencies:
```json
"@types/three": "^0.185.4"
```

Install dependencies:
```bash
pnpm install
```

Create 3D components:
- Food item 3D viewers
- Interactive menu displays
- Restaurant environment previews

**Verification**: Test 3D components render and are interactive

---

## Module 9: Customer App - Celebration Effects

**Goal**: Add celebration effects for customer interactions

### Additional Dependencies
- canvas-confetti: ^1.9.4
- @types/canvas-confetti: ^1.9.0

### Steps

Add to `apps/customer/package.json`:
```json
"canvas-confetti": "^1.9.4"
```

Add to devDependencies:
```json
"@types/canvas-confetti": "^1.9.0"
```

Install dependencies:
```bash
pnpm install
```

Create confetti utility components for:
- Order placement celebrations
- Reward unlocks
- Achievement milestones

**Verification**: Test confetti effects trigger on customer actions

---

## Module 10: Final Setup

**Goal**: Complete project initialization and verification

### Steps

```bash
# Install all dependencies
pnpm install

# Type check all packages
pnpm type-check

# Initialize git
git init
git add .
git commit -m "Initial commit"
```

## Package Versions Summary

### Core Dependencies
- next: 16.3.1
- react: 19.2.8
- react-dom: 19.2.8
- lucide-react: ^1.37.0
- typescript: ^5

### Admin Portal Specific
- canvas-confetti: ^1.9.4
- recharts: ^3.10.1

### Customer App Specific
- canvas-confetti: ^1.9.4
- three: ^0.185.1

### Development Dependencies
- @tailwindcss/postcss: ^4
- tailwindcss: ^4
- @types/node: ^20
- @types/react: ^19
- @types/react-dom: ^19
- eslint: ^9
- eslint-config-next: 16.3.1

### Type Definitions
- @types/canvas-confetti: ^1.9.0
- @types/three: ^0.185.4

## Development Commands

```bash
# Install dependencies
pnpm install

# Run all apps
pnpm dev

# Run specific apps
pnpm dev:customer  # Port 3000
pnpm dev:admin     # Port 3001

# Build all apps
pnpm build

# Build specific apps
pnpm build:customer
pnpm build:admin

# Type check
pnpm type-check

# Lint
pnpm lint
```

## Key Configuration Notes

1. **Turbopack**: Both Next.js apps use Turbopack with root set to monorepo root
2. **Workspace Dependencies**: Apps use `workspace:*` for internal packages
3. **Tailwind CSS v4**: Uses new PostCSS plugin approach
4. **TypeScript**: Strict mode enabled across all packages
5. **Path Aliases**: `@/*` maps to app root in Next.js apps

## Application Features

### Admin Portal (Port 3001)
- Organization and tenant management
- Staff and team management
- Billing and payouts
- Support ticket handling
- Platform settings and configuration
- Store setup wizard
- Analytics and reporting (recharts)

### Customer App (Port 3000)
- Restaurant browsing and search
- Menu browsing and customization
- Cart and checkout
- Order tracking
- Rewards and loyalty program
- 3D visualizations (Three.js)

## Shared Packages

### @umunthuhub/shared-types
Centralized TypeScript definitions for:
- Personas (Customer, Vendor, Rider, Admin, Corporate)
- Data models (Orders, Menu Items, Tenants, Staff, Promotions)
- Type safety across applications

### @umunthuhub/ui
Reusable React components:
- ScrollableContainer
- Consistent design system
- Type-safe components
