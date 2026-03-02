import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { db } from '@/lib/db';
import { playlists, playlistTracks, tracks } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

// GET all playlists for current user
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userPlaylists = await db
      .select()
      .from(playlists)
      .where(eq(playlists.userId, parseInt(session.user.id)))
      .orderBy(desc(playlists.createdAt));

    return NextResponse.json({ playlists: userPlaylists });
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST create new playlist
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, isPublic } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Playlist name is required' },
        { status: 400 }
      );
    }

    const [newPlaylist] = await db.insert(playlists).values({
      userId: parseInt(session.user.id),
      name,
      description,
      isPublic: isPublic || false,
    }).returning();

    return NextResponse.json({ playlist: newPlaylist }, { status: 201 });
  } catch (error) {
    console.error('Error creating playlist:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
