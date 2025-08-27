import { NextRequest, NextResponse } from 'next/server';
import { fetchAdzuna } from '@/lib/sources/adzuna';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';
  const page = Number(searchParams.get('page') || '1');

  // For Milestone 1, we only call Adzuna. A second source can be added later.
  const adzuna = await fetchAdzuna(q, location, page);

  if (adzuna.error) {
    return NextResponse.json({ results: [], error: adzuna.error }, { status: 200 });
  }

  return NextResponse.json({ results: adzuna.results });
}
