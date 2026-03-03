'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import * as Dialog from '@radix-ui/react-dialog';

interface CreatePlaylistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePlaylistDialog({ open, onOpenChange }: CreatePlaylistDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          isPublic,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create playlist');
      }

      // Reset form and close dialog
      setName('');
      setDescription('');
      setIsPublic(false);
      onOpenChange(false);

      // Reload the page to show the new playlist
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
          <Dialog.Title className="text-2xl font-bold mb-4">Create Playlist</Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Playlist Name *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Awesome Playlist"
                required
                className="w-full px-3 py-2 bg-background-base border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your playlist..."
                rows={3}
                className="w-full px-3 py-2 bg-background-base border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary resize-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="isPublic"
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-4 h-4 rounded border-border-subtle"
              />
              <label htmlFor="isPublic" className="text-sm">
                Make this playlist public
              </label>
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
                {loading ? 'Creating...' : 'Create Playlist'}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
