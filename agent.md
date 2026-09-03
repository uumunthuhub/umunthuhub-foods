# Umunthuhub Foods - AI Agent Configuration

This file contains instructions for AI agents working on the Umunthuhub Foods project.

## Project Context

**Project Type**: Monorepo food delivery platform
**Package Manager**: pnpm v10.33.2
**Framework**: Next.js 16.3.1 (with breaking changes from traditional Next.js)
**React Version**: 19.2.8
**TypeScript**: Strict mode enabled

## Critical Agent Rules

### UI/UX Standards

#### No Web Modals
- **NEVER use browser native modals** (e.g., `confirm()`, `alert()`, `prompt()`)
- **ALWAYS use in-app modals** for confirmations, warnings, and user interactions
- All delete actions must use custom confirmation modals with proper styling
- Modals must match the application's design system and theming

#### Dark Mode Theming
- **ALL components must support dark mode** via `themeMode` from `useApp` context
- **NEVER show white backgrounds or hardcoded light colors** in dark mode
- Use conditional Tailwind classes based on `themeMode`:
  - Dark mode: `bg-[#242625]`, `bg-[#383a39]`, `border-[#3a3a3a]`, `text-[#f5f5f5]`, `text-[#c4c4c4]`, `text-[#7a7a7a]`
  - Light mode: `bg-white`, `bg-gray-50`, `border-[#e1bfb5]`, `text-[#1a1c1c]`, `text-[#594139]`, `text-[#8d7168]`
- Apply theming to: modals, inputs, selects, buttons, tables, cards, borders, text
- Test all components in both light and dark modes

#### TypeScript Strictness
- **TypeScript strict mode is enabled** across all packages
- **NEVER use `any` types** - always define proper types
- Use types from `@umunthuhub/shared-types` when available
- All components must be fully typed
- Run `pnpm type-check` before committing changes

### Next.js 16 Specific Guidelines
This project uses Next.js 16.3.1, which has breaking changes from traditional Next.js:
- APIs, conventions, and file structure may differ from training data
- Always read relevant guides in `node_modules/next/dist/docs/` before writing code
- Heed all deprecation notices
- The AGENTS.md file in each app directory contains Next.js-specific agent rules

### Monorepo Architecture
- This is a pnpm workspace monorepo
- Apps are in `apps/` directory
- Shared packages are in `packages/` directory
- Internal packages use `workspace:*` protocol
- Both Next.js apps use Turbopack with root set to monorepo root

### Workspace Dependencies
- `@umunthuhub/shared-types` - Shared TypeScript definitions
- `@umunthuhub/ui` - Shared React UI components
- Never use external alternatives when workspace packages are available

### Technology Stack Constraints
**Only use the following packages/versions as specified in this project:**

Core Framework:
- next: 16.3.1
- react: 19.2.8
- react-dom: 19.2.8
- typescript: ^5

Styling:
- tailwindcss: ^4
- @tailwindcss/postcss: ^4
- lucide-react: ^1.37.0

Admin Portal Only:
- recharts: ^3.10.1
- canvas-confetti: ^1.9.4

Customer App Only:
- three: ^0.185.1
- canvas-confetti: ^1.9.4

Development:
- eslint: ^9
- eslint-config-next: 16.3.1
- @types/node: ^20
- @types/react: ^19
- @types/react-dom: ^19

Type Definitions:
- @types/canvas-confetti: ^1.9.0
- @types/three: ^0.185.4

**DO NOT add any packages outside this scope without explicit user approval.**

## Code Style Guidelines

### TypeScript
- Strict mode is enabled across all packages
- Use proper type definitions from `@umunthuhub/shared-types`
- Never use `any` types
- Always define interfaces/types for data structures

### React/Next.js
- Use functional components with hooks
- Follow Next.js 16 App Router conventions
- Use TypeScript for all components
- Leverage shared UI components from `@umunthuhub/ui`

### File Structure
- Admin portal: `apps/admin/`
- Customer app: `apps/customer/`
- Shared types: `packages/shared-types/src/`
- Shared UI: `packages/ui/src/`

### Path Aliases
- In Next.js apps: `@/*` maps to app root
- Use workspace imports for shared packages

## Development Workflow

### Before Making Changes
1. Read the relevant Next.js 16 documentation in `node_modules/next/dist/docs/`
2. Check if similar functionality exists in shared packages
3. Verify package versions before adding dependencies
4. Review existing code patterns in the project

### When Adding Features
1. Check if types should be added to `@umunthuhub/shared-types`
2. Check if components should be added to `@umunthuhub/ui`
3. Use existing project patterns and conventions
4. Maintain consistency with existing code style

### Testing
- Run `pnpm type-check` before committing
- Run `pnpm lint` to check code quality
- Test changes in the appropriate app (customer or admin)

## Application-Specific Notes

### Admin Portal (Port 3001)
- Purpose: Platform administration
- Key features: Organization management, staff management, billing, analytics
- Uses recharts for data visualization
- Uses canvas-confetti for celebration effects

### Customer App (Port 3000)
- Purpose: Customer-facing ordering
- Key features: Restaurant browsing, ordering, tracking, 3D visualizations
- Uses Three.js for 3D graphics
- Uses canvas-confetti for celebration effects

### Customer Mobile App (Expo)
- Purpose: Mobile ordering experience
- Key features: Restaurant browsing, menu details, cart and checkout, order tracking
- Uses React Native / Expo, NativeWind (Tailwind), and Zustand
- Core flows include an Authentication wall that redirects to a tabbed navigation interface

## Common Pitfalls

1. **Next.js Version**: Do not assume traditional Next.js patterns work
2. **Package Versions**: Never upgrade packages without explicit approval
3. **Monorepo Structure**: Remember this is a workspace, not standalone apps
4. **Shared Packages**: Always check if functionality exists in shared packages first
5. **Type Safety**: Never bypass TypeScript strict mode

## Commands Reference

```bash
# Development
pnpm dev              # All apps
pnpm dev:customer     # Customer app only
pnpm dev:admin        # Admin portal only
pnpm dev:mobile       # Customer mobile app (Expo)

# Building
pnpm build            # All apps
pnpm build:customer   # Customer app only
pnpm build:admin      # Admin portal only

# Quality Checks
pnpm type-check       # Type check all packages
pnpm lint             # Lint all applications
```

## License Information

This project is under an Exclusive Commercial License. All code and configurations are proprietary.
