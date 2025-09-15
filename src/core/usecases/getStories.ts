import type { Story } from '../domain/story';

export interface GetStoriesFilter {
  archetypes?: string[];
  visibility?: 'public' | 'link-only' | 'private';
  limit?: number;
  offset?: number;
}

export type GetStoriesResult = 
  | { ok: true; stories: Story[] }
  | { ok: false; error: string };

export async function getStories(
  filter: GetStoriesFilter,
  getStoriesFn: (filter: GetStoriesFilter) => Promise<Story[]>
): Promise<GetStoriesResult> {
  try {
    const stories = await getStoriesFn(filter);
    return { ok: true, stories };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getRecentStories(
  limit: number = 6,
  getRecentStoriesFn: (limit: number) => Promise<Story[]>
): Promise<GetStoriesResult> {
  try {
    const stories = await getRecentStoriesFn(limit);
    return { ok: true, stories };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
