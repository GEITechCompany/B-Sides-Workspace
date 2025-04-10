#!/usr/bin/env bash
set -e

echo "📦 Starting build process..."

# Increase memory allocation for Node (Render has 2GB standard limit)
export NODE_OPTIONS="--max_old_space_size=2048"
echo "🧠 Node memory increased to 2GB"

# Remove previous build artifacts
echo "🧹 Cleaning up build artifacts..."
rm -rf .next

# Clear npm cache to avoid stale dependencies
echo "🧹 Cleaning npm cache..."
npm cache clean --force

# Install both production and development dependencies
echo "📥 Installing dependencies (including devDependencies)..."
npm install --include=dev --no-audit

# Build the application
echo "🏗️ Building the application..."
NODE_ENV=production npm run build

echo "✅ Build completed successfully!" 