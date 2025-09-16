import { NextRequest, NextResponse } from 'next/server';
import { getStoriesAction } from '@features/stories/server/get-handler';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filter = {
      archetypes: searchParams.get('archetypes')?.split(',').filter(Boolean),
      visibility: searchParams.get('visibility') as 'public' | 'link-only' | 'private' | undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined,
    };

    const result = await getStoriesAction(filter);

    if (result.ok) {
      return NextResponse.json({ stories: result.stories });
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
