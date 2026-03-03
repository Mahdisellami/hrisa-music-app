import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { tracks, playlists } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function LibraryPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  // Fetch all tracks
  let allTracks: any[] = [];
  try {
    allTracks = await db.select().from(tracks).orderBy(desc(tracks.createdAt));
  } catch (error) {
    console.error('Error fetching tracks:', error);
  }

  // Fetch user's playlists
  let userPlaylists: any[] = [];
  try {
    userPlaylists = await db
      .select()
      .from(playlists)
      .where(eq(playlists.userId, parseInt(session.user.id!)))
      .orderBy(desc(playlists.createdAt));
  } catch (error) {
    console.error('Error fetching playlists:', error);
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-accent-primary">Your Library</h1>
          <Link href="/dashboard">
            <Button variant="secondary">Back to Dashboard</Button>
          </Link>
        </div>

        {/* Playlists Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Playlists</h2>
          {userPlaylists.length === 0 ? (
            <div className="bg-background-elevated p-6 rounded-lg">
              <p className="text-text-tertiary">No playlists yet. Create one from the dashboard!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="bg-background-elevated p-6 rounded-lg hover:bg-background-base transition-colors cursor-pointer"
                >
                  <h3 className="text-xl font-semibold mb-2">{playlist.name}</h3>
                  {playlist.description && (
                    <p className="text-sm text-text-secondary mb-3">{playlist.description}</p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-text-tertiary">
                    <span>{playlist.isPublic ? 'Public' : 'Private'}</span>
                    <span>•</span>
                    <span>Created {new Date(playlist.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Tracks Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">All Tracks</h2>
          {allTracks.length === 0 ? (
            <div className="bg-background-elevated p-6 rounded-lg">
              <p className="text-text-tertiary">No tracks yet. Add some music from the dashboard!</p>
            </div>
          ) : (
            <div className="bg-background-elevated rounded-lg overflow-hidden">
              <div className="divide-y divide-border-subtle">
                {allTracks.map((track, index) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-4 p-4 hover:bg-background-base transition-colors"
                  >
                    <span className="text-text-tertiary text-sm w-8">{index + 1}</span>
                    {track.thumbnailUrl && (
                      <img
                        src={track.thumbnailUrl}
                        alt={track.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium">{track.title}</h4>
                      <p className="text-sm text-text-secondary">{track.artist}</p>
                      {track.album && (
                        <p className="text-xs text-text-tertiary">{track.album}</p>
                      )}
                    </div>
                    {track.duration && (
                      <span className="text-sm text-text-tertiary">
                        {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
                      </span>
                    )}
                    {track.youtubeUrl && (
                      <a
                        href={track.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent-primary hover:underline"
                      >
                        View on YouTube
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
