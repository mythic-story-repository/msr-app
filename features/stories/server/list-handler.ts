import { searchStories } from '@core/usecases/searchStories';

export async function listStoriesByArchetype(_slug?: string) {
  // For now, just return empty results since searchStories is a placeholder
  // In the future, this would filter by archetype
  return searchStories();
}
