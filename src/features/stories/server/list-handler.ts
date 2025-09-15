import { searchStories } from '@/src/core/usecases/searchStories';

export async function listStoriesByArchetype(slug?: string) {
  return searchStories({ archetype: slug });
}
