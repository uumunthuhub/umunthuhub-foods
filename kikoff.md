#!/bin/bash
# Umunthuhub Foods - Project Setup Script
# This script automates the initial project setup
# Dependencies include: lucide-react: ^1.37.0

set -e

echo "🚀 Setting up Umunthuhub Foods project..."

# Check prerequisites
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v20 or higher."
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm v10.33.2 or higher."
    exit 1
fi

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p apps/admin apps/customer packages/ui packages/shared-types

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Type check packages
echo "🔍 Type checking packages..."
pnpm type-check

echo "✅ Setup complete!"
echo ""
echo "Available commands:"
echo "  pnpm dev           - Start all applications"
echo "  pnpm dev:customer  - Start customer app (port 3000)"
echo "  pnpm dev:admin     - Start admin portal (port 3001)"
echo "  pnpm build         - Build all applications"
echo "  pnpm lint          - Lint all applications"
echo "  pnpm type-check    - Type check all packages"
