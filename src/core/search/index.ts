export interface SearchAdapter {
  searchByArchetype(slug: string): Promise<string[]>;
}
