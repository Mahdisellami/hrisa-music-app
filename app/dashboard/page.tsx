import { auth } from '@/lib/auth/config';
import { signOut } from '@/lib/auth/config';
import { Button } from '@/components/ui/button';

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-accent-primary">Hrisa Music</h1>
            <p className="text-text-secondary mt-2">
              Welcome back, {session?.user?.name}!
            </p>
          </div>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/auth/login' });
            }}
          >
            <Button variant="secondary">Sign Out</Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-background-elevated p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Your Library</h3>
            <p className="text-text-secondary text-sm">
              Browse your playlists and tracks
            </p>
            <Button className="mt-4 w-full" variant="secondary">
              View Library
            </Button>
          </div>

          <div className="bg-background-elevated p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Add Music</h3>
            <p className="text-text-secondary text-sm">
              Download tracks from YouTube
            </p>
            <Button className="mt-4 w-full" variant="primary">
              Add Track
            </Button>
          </div>

          <div className="bg-background-elevated p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Create Playlist</h3>
            <p className="text-text-secondary text-sm">
              Organize your music collection
            </p>
            <Button className="mt-4 w-full" variant="secondary">
              New Playlist
            </Button>
          </div>
        </div>

        <div className="mt-8 bg-background-elevated p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Recent Tracks</h2>
          <p className="text-text-tertiary">No tracks yet. Add some music to get started!</p>
        </div>
      </div>
    </div>
  );
}
