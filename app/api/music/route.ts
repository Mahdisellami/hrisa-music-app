import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { db } from '@/lib/db';
import { tracks } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

// GET all tracks
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const allTracks = await db.select().from(tracks).orderBy(desc(tracks.createdAt));

    return NextResponse.json({ tracks: allTracks });
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST create new track
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, artist, album, duration, youtubeUrl, blobUrl, thumbnailUrl, metadata } = body;

    if (!title || !artist || !youtubeUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const [newTrack] = await db.insert(tracks).values({
      title,
      artist,
      album,
      duration,
      youtubeUrl,
      blobUrl,
      thumbnailUrl,
      metadata,
    }).returning();

    return NextResponse.json({ track: newTrack }, { status: 201 });
  } catch (error) {
    console.error('Error creating track:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
