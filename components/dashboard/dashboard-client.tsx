'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AddTrackDialog } from './add-track-dialog';
import { CreatePlaylistDialog } from './create-playlist-dialog';

interface DashboardClientProps {
  userName: string | null | undefined;
  tracks: any[];
}

export function DashboardClient({ userName, tracks }: DashboardClientProps) {
  const [showAddTrack, setShowAddTrack] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-accent-primary">Hrisa Music</h1>
            <p className="text-text-secondary mt-2">
              Welcome back, {userName}!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-background-elevated p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Your Library</h3>
            <p className="text-text-secondary text-sm">
              Browse your playlists and tracks
            </p>
            <Button
              className="mt-4 w-full"
              variant="secondary"
              onClick={() => (window.location.href = '/library')}
            >
              View Library
            </Button>
          </div>

          <div className="bg-background-elevated p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Add Music</h3>
            <p className="text-text-secondary text-sm">
              Download tracks from YouTube
            </p>
            <Button
              className="mt-4 w-full"
              variant="primary"
              onClick={() => setShowAddTrack(true)}
            >
              Add Track
            </Button>
          </div>

          <div className="bg-background-elevated p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Create Playlist</h3>
            <p className="text-text-secondary text-sm">
              Organize your music collection
            </p>
            <Button
              className="mt-4 w-full"
              variant="secondary"
              onClick={() => setShowCreatePlaylist(true)}
            >
              New Playlist
            </Button>
          </div>
        </div>

        <div className="mt-8 bg-background-elevated p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Recent Tracks</h2>
          {tracks.length === 0 ? (
            <p className="text-text-tertiary">No tracks yet. Add some music to get started!</p>
          ) : (
            <div className="space-y-3">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center gap-4 p-3 bg-background-base rounded-lg hover:bg-background-elevated transition-colors"
                >
                  {track.thumbnailUrl && (
                    <img
                      src={track.thumbnailUrl}
                      alt={track.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium">{track.title}</h4>
                    <p className="text-sm text-text-secondary">{track.artist}</p>
                  </div>
                  {track.duration && (
                    <span className="text-sm text-text-tertiary">
                      {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddTrackDialog open={showAddTrack} onOpenChange={setShowAddTrack} />
      <CreatePlaylistDialog open={showCreatePlaylist} onOpenChange={setShowCreatePlaylist} />
    </div>
  );
}
