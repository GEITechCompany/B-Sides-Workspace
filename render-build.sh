#!/usr/bin/env bash
set -e

echo "📦 Starting build process..."

# Increase memory allocation for Node (increase to 4GB)
export NODE_OPTIONS="--max_old_space_size=4096 --max-old-space-size=4096"
echo "🧠 Node memory increased to 4GB"

# Remove node_modules to ensure clean install
echo "🧹 Cleaning up node_modules..."
rm -rf node_modules
rm -rf .next

# Clear npm cache to avoid stale dependencies
echo "🧹 Cleaning npm cache..."
npm cache clean --force

# Install production dependencies only to save space
echo "📥 Installing dependencies..."
npm ci --production=false --no-audit || npm install --no-audit

# Build the application with limited concurrency to prevent memory issues
echo "🏗️ Building the application..."
NODE_ENV=production npm run build

echo "✅ Build completed successfully!" 