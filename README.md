# Hrisa Music - Next.js App

A modern music management and streaming application built with Next.js 15, Neon Postgres, and Vercel Blob Storage.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Vercel account
- Neon account (for database)

### Local Development

1. **Clone and Install**
   ```bash
   cd hrisa-web
   npm install
   ```

2. **Set up Environment Variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your credentials:
   ```env
   DATABASE_URL=your-neon-database-url
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
   ```

3. **Push Database Schema**
   ```bash
   npm run db:push
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## 📦 Deployment to Vercel

### Step 1: Create Neon Database

1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Save it for later

### Step 2: Deploy to Vercel

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial Hrisa Next.js app"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Next.js
     - Root Directory: `hrisa-web`
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Add Environment Variables** in Vercel dashboard:
   ```
   DATABASE_URL=<your-neon-connection-string>
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=<generate-random-string>
   BLOB_READ_WRITE_TOKEN=<leave-empty-for-now>
   ```

   Generate NEXTAUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

### Step 3: Set up Vercel Blob Storage

1. In Vercel dashboard:
   - Go to "Storage" tab
   - Click "Create Database"
   - Select "Blob"
   - Name it "hrisa-music"

2. Get the token:
   - Click on your Blob storage
   - Go to "Settings"
   - Copy "Read-Write Token"

3. Add to Environment Variables:
   ```
   BLOB_READ_WRITE_TOKEN=<your-blob-token>
   ```

4. Redeploy to apply changes

### Step 4: Initialize Database

1. **Option A: Via Drizzle Studio (Local)**
   ```bash
   npm run db:studio
   ```
   Open the URL and verify tables are created

2. **Option B: Via Vercel CLI**
   ```bash
   vercel env pull .env.local
   npm run db:push
   ```

## 🎯 Features

### ✅ Completed
- User authentication (register/login)
- PostgreSQL database with Drizzle ORM
- Spotify-inspired dark theme
- Protected routes
- Dashboard page
- API routes for music and playlists

### 🚧 In Progress
- Audio player with Web Audio API
- YouTube download integration
- Playlist management UI
- Track upload to Vercel Blob

### 📋 Planned
- Search functionality
- Equalizer
- Listening history
- User favorites
- Collaborative playlists

## 📄 License

Private project - All rights reserved
