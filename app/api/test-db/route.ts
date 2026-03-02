import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Simple query to test database connection
    const result = await db.execute('SELECT NOW()');
    return NextResponse.json({
      success: true,
      dbConnected: true,
      hasDbUrl: !!process.env.DATABASE_URL,
      timestamp: result.rows[0]
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      success: false,
      error: errorMessage,
      hasDbUrl: !!process.env.DATABASE_URL,
      dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 20)
    }, { status: 500 });
  }
}
