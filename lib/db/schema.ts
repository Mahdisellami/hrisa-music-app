import { pgTable, text, serial, timestamp, integer, boolean, json } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Playlists table
export const playlists = pgTable('playlists', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  isPublic: boolean('is_public').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Tracks table
export const tracks = pgTable('tracks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  artist: text('artist').notNull(),
  album: text('album'),
  duration: integer('duration'), // in seconds
  youtubeUrl: text('youtube_url').notNull(),
  blobUrl: text('blob_url'), // Vercel Blob storage URL
  thumbnailUrl: text('thumbnail_url'),
  metadata: json('metadata'), // Additional YouTube metadata
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Playlist tracks (many-to-many relationship)
export const playlistTracks = pgTable('playlist_tracks', {
  id: serial('id').primaryKey(),
  playlistId: integer('playlist_id').references(() => playlists.id).notNull(),
  trackId: integer('track_id').references(() => tracks.id).notNull(),
  position: integer('position').notNull(), // order in playlist
  addedAt: timestamp('added_at').defaultNow().notNull(),
});

// User listening history
export const playHistory = pgTable('play_history', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  trackId: integer('track_id').references(() => tracks.id).notNull(),
  playedAt: timestamp('played_at').defaultNow().notNull(),
});

// User favorites
export const favorites = pgTable('favorites', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  trackId: integer('track_id').references(() => tracks.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Playlist = typeof playlists.$inferSelect;
export type NewPlaylist = typeof playlists.$inferInsert;
export type Track = typeof tracks.$inferSelect;
export type NewTrack = typeof tracks.$inferInsert;
export type PlaylistTrack = typeof playlistTracks.$inferSelect;
export type NewPlaylistTrack = typeof playlistTracks.$inferInsert;
