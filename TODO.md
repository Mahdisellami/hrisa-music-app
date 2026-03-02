# Hrisa Music - Development TODO

## 🎯 Current Phase: Phase 2 - Music Player & Library

### Next Immediate Tasks

#### 1. Audio Player Component
- [ ] Create player UI component with play/pause button
- [ ] Add progress bar with time display
- [ ] Implement seek functionality
- [ ] Add volume controls
- [ ] Create mini player component
- [ ] Add next/previous track buttons
- [ ] Implement keyboard shortcuts (space, arrows)

#### 2. Music Upload & Storage
- [ ] Set up file storage (Netlify Blobs or Vercel Blob)
- [ ] Create upload API endpoint
- [ ] Build file upload UI with drag-and-drop
- [ ] Add upload progress indicator
- [ ] Implement file validation (type, size)
- [ ] Extract metadata from uploaded files

#### 3. Track Management
- [ ] Create tracks list view
- [ ] Add track card component
- [ ] Implement track actions (play, add to playlist, delete)
- [ ] Add album art display
- [ ] Create track detail view

#### 4. Playlist Features
- [ ] Build playlist creation UI
- [ ] Add tracks to playlist functionality
- [ ] Playlist view with track list
- [ ] Drag-and-drop track reordering
- [ ] Playlist cover image upload
- [ ] Delete playlist functionality

---

## 📝 Notes

- **Current Status**: Authentication and database working on Netlify
- **Live URL**: https://hrisamux.netlify.app
- **Database**: Neon Postgres (neondb)
- **Hosting**: Netlify

### Technical Decisions Made
- ✅ Using NextAuth v5 with credentials provider
- ✅ Drizzle ORM for database operations
- ✅ Lazy database connections for serverless
- ✅ Warm sand design system
- ✅ Server-side rendering with Next.js 15

### Blockers / Known Issues
- None currently

### Questions to Resolve
- [ ] Which blob storage to use? (Netlify Blobs vs Vercel Blob)
- [ ] Audio format support? (MP3, FLAC, WAV?)
- [ ] Max file size for uploads?
- [ ] Mobile-first or desktop-first UI?

---

Last Updated: March 2, 2026
