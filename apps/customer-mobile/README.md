# UmunthuHub Foods - Customer Mobile App 📱

Welcome to the **Customer Mobile App** for UmunthuHub Foods! This application is the primary interface for customers to browse restaurants, view menus, and place orders. 

Built as a universal Expo application, it runs seamlessly on both iOS and Android while offering a fast, fluid, and native-feeling user experience.

## ✨ Key Features

- **Authentication Flow**: Secure login experience guarding the main application.
- **Dynamic Home Dashboard**: Browse categorized foods and featured restaurants.
- **Restaurant Details & Menus**: View detailed information about restaurants, including delivery times, fees, ratings, and a full menu.
- **Shopping Cart**: Seamlessly add items to your cart, modify quantities, and review the breakdown of subtotal, taxes, and delivery fees.
- **In-App Checkout**: Confirm orders with a beautiful native modal (no web views!).
- **Dark & Light Mode**: Full theme support out of the box using NativeWind.

## 🛠 Tech Stack

- **Framework**: [Expo](https://expo.dev/) & React Native
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Styling**: [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Language**: TypeScript (Strict Mode)

## 🚀 Getting Started

Since this app is part of the UmunthuHub Foods monorepo, you can run it easily using `pnpm`.

### 1. Install Dependencies
From the root of the workspace:
```bash
pnpm install
```

### 2. Start the App
From the root of the workspace, run the mobile development script:
```bash
pnpm dev:mobile
```

Alternatively, you can navigate into this app's directory and run it directly:
```bash
cd apps/customer-mobile
npx expo start
```

### 3. Run on your device
In the output, you'll find options to open the app:
- Press `a` to open on an Android emulator.
- Press `i` to open on an iOS simulator.
- Scan the QR code with the **Expo Go** app on your physical device.

## 📁 Directory Structure

```text
apps/customer-mobile/
├── src/
│   ├── app/                 # Expo Router screens (_layout.tsx, index.tsx, cart.tsx)
│   ├── components/          # Reusable UI components (app-tabs, etc.)
│   ├── constants/           # Theme definitions, Colors, and Spacing
│   ├── hooks/               # Custom React hooks (use-color-scheme, use-theme)
│   ├── mocks/               # Mock data for restaurants, menus, and categories
│   └── store/               # Zustand global state (useAppStore.ts)
├── assets/                  # Images, fonts, and icons
├── app.json                 # Expo configuration
├── tailwind.config.js       # NativeWind theme & design system
└── tsconfig.json            # TypeScript configuration
```

## 🎨 Styling Guidelines

We use **NativeWind** to style our components. Our design system relies heavily on a centralized theme defined in `tailwind.config.js`. 
- Use semantic color classes like `bg-light-bg dark:bg-dark-bg` to ensure compatibility across light and dark modes.
- Do **not** use default React Native `StyleSheet` unless absolutely necessary (e.g., for complex animations or third-party component wrappers like `SafeAreaView`).

---

*Part of the UmunthuHub project.*
