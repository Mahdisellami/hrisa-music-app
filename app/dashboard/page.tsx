import { auth, signOut } from '@/lib/auth/config';
import { Button } from '@/components/ui/button';
import { DashboardClient } from '@/components/dashboard/dashboard-client';
import { db } from '@/lib/db';
import { tracks } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

export default async function DashboardPage() {
  const session = await auth();

  // Fetch recent tracks
  let recentTracks: any[] = [];
  try {
    recentTracks = await db.select().from(tracks).orderBy(desc(tracks.createdAt)).limit(5);
  } catch (error) {
    console.error('Error fetching tracks:', error);
  }

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/auth/login' });
          }}
        >
          <Button variant="secondary">Sign Out</Button>
        </form>
      </div>
      <DashboardClient userName={session?.user?.name} tracks={recentTracks} />
    </div>
  );
}
