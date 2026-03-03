'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import * as Dialog from '@radix-ui/react-dialog';

interface AddTrackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTrackDialog({ open, onOpenChange }: AddTrackDialogProps) {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || 'Untitled Track',
          artist: artist || 'Unknown Artist',
          youtubeUrl,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add track');
      }

      // Reset form and close dialog
      setYoutubeUrl('');
      setTitle('');
      setArtist('');
      onOpenChange(false);

      // Reload the page to show the new track
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background-elevated p-6 rounded-lg shadow-xl max-w-md w-full">
          <Dialog.Title className="text-2xl font-bold mb-4">Add Track from YouTube</Dialog.Title>
          <Dialog.Description className="text-sm text-text-secondary mb-4">
            Enter a YouTube URL and optionally provide track details
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="youtubeUrl" className="block text-sm font-medium mb-1">
                YouTube URL *
              </label>
              <input
                id="youtubeUrl"
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                required
                className="w-full px-3 py-2 bg-background-base border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Song title"
                className="w-full px-3 py-2 bg-background-base border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
            </div>

            <div>
              <label htmlFor="artist" className="block text-sm font-medium mb-1">
                Artist
              </label>
              <input
                id="artist"
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Artist name"
                className="w-full px-3 py-2 bg-background-base border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <div className="flex gap-3 justify-end">
              <Dialog.Close asChild>
                <Button type="button" variant="secondary" disabled={loading}>
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Adding...' : 'Add Track'}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
