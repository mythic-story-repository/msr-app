'use server';

import { submitStorySchema } from '../schema';
import { submitStory } from '@core/usecases/submitStory';
import { createStory } from '../db/queries';

export async function submitStoryAction(formData: FormData) {
  const data = Object.fromEntries(formData) as Record<string, string>;
  
  // Parse archetypes - could be comma-separated string or JSON array
  let archetypes: string[] = [];
  if (data.archetypes) {
    try {
      // Try parsing as JSON first (for multi-select)
      archetypes = JSON.parse(data.archetypes);
    } catch {
      // Fall back to comma-separated parsing
      archetypes = data.archetypes
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
    }
  }

  const parsed = submitStorySchema.parse({
    content: data.content,
    experienceSource: data.experienceSource,
    archetypes,
    license: data.license,
    aiUseOptOut: data.aiUseOptOut === 'on',
    visibility: data.visibility,
    anonLevel: data.anonLevel,
    pseudonym: data.pseudonym || undefined,
    language: data.language ?? 'en',
  });

  return submitStory(parsed, createStory);
}
