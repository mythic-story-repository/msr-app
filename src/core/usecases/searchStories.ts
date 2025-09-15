import type { Story } from '@/core/domain/story';

export interface SearchParams {
  archetype?: string;
}

export async function searchStories() {
  // Placeholder search returning empty list; replace with DB/search adapter.
  return { items: [] as Story[], total: 0 };
}
