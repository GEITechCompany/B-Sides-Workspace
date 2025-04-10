#!/usr/bin/env bash
set -e

# Increase memory allocation for Node
export NODE_OPTIONS="--max_old_space_size=2048"

# Clear npm cache to avoid stale dependencies
npm cache clean --force

# Install dependencies
npm ci || npm install

# Build the application
npm run build

echo "Build completed successfully!"
