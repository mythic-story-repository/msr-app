import { NextRequest, NextResponse } from 'next/server';
import { getStoryByIdAction } from '@/features/stories/server/detail-handler';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  const { id } = await params;
  try {
    const result = await getStoryByIdAction(id);

    if (result.ok) {
      return NextResponse.json({ story: result.story });
    } else {
      return NextResponse.json({ error: result.error }, { status: 404 });
    }
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
