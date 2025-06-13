#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linter..."
npm run lint

# Build the application
echo "🏗️ Building the application..."
npm run build

# Generate sitemap
echo "🗺️ Generating sitemap..."
npm run postbuild

# Start the application
echo "🌟 Starting the application..."
PORT=3000 npm run start 