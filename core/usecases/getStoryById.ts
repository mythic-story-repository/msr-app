import type { Story } from '../domain/story';

export type GetStoryByIdResult = 
  | { ok: true; story: Story }
  | { ok: false; error: string };

export async function getStoryById(
  id: string,
  getStoryByIdFn: (id: string) => Promise<Story | null>
): Promise<GetStoryByIdResult> {
  try {
    if (!id?.trim()) {
      return { ok: false, error: 'Story ID is required' };
    }

    const story = await getStoryByIdFn(id);
    
    if (!story) {
      return { ok: false, error: 'Story not found' };
    }

    return { ok: true, story };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
