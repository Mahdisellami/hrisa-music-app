#!/bin/bash

# Hrisa Music - Quick Start Script
# This script helps you deploy the app quickly

echo "🎵 Hrisa Music - Quick Deployment"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the hrisa-web directory"
    exit 1
fi

echo "📦 Step 1: Install dependencies"
npm install
echo "✅ Dependencies installed"
echo ""

echo "🔐 Step 2: Environment Setup"
if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo "⚠️  Created .env.local - Please edit it with your credentials:"
    echo "   - DATABASE_URL (from Neon)"
    echo "   - NEXTAUTH_SECRET (run: openssl rand -base64 32)"
    echo "   - NEXTAUTH_URL (http://localhost:3000 for local)"
    echo ""
    echo "Press Enter when done..."
    read
else
    echo "✅ .env.local already exists"
fi
echo ""

echo "🗄️  Step 3: Initialize Database"
echo "Make sure your DATABASE_URL is set in .env.local"
echo "Press Enter to push schema to database..."
read
npm run db:push
echo "✅ Database schema pushed"
echo ""

echo "🚀 Step 4: Start Development Server"
echo "Starting Next.js dev server..."
npm run dev
