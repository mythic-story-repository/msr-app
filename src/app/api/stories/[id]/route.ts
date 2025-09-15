import { NextRequest, NextResponse } from 'next/server';
import { getStoryByIdAction } from '@/features/stories/server/detail-handler';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await getStoryByIdAction(params.id);

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
