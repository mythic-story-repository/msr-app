import type { Story } from '../domain/story';

export type SubmitStoryInput = Pick<
  Story,
  'content' | 'experienceSource' | 'archetypes' | 'license' | 'aiUseOptOut' | 'visibility' | 'anonLevel' | 'language' | 'pseudonym'
>;

export type SubmitStoryResult = 
  | { ok: true; story: Story }
  | { ok: false; error: string };

export async function submitStory(
  input: SubmitStoryInput,
  createStoryFn: (data: {
    content: string;
    language: string;
    experienceSource: 'psychedelic' | 'near-death-experience' | 'dream' | 'mystical-opening' | 'ritual-initiation' | 'other';
    archetypes: string[];
    motifs: string[];
    feelings: string[];
    context: { setting?: string; state?: string } | null;
    license: 'CC0' | 'CC BY';
    aiUseOptOut: boolean;
    visibility: 'public' | 'link-only' | 'private';
    anonLevel: 'none' | 'pseudonym' | 'anonymous';
    pseudonym?: string | null;
  }) => Promise<Story>
): Promise<SubmitStoryResult> {
  try {
    // Validate input
    if (!input.content?.trim()) {
      return { ok: false, error: 'Content is required' };
    }
    if (!input.archetypes?.length) {
      return { ok: false, error: 'At least one archetype is required' };
    }
    if (!input.experienceSource) {
      return { ok: false, error: 'Experience source is required' };
    }

    // Create story with default values for missing fields
    const story = await createStoryFn({
      content: input.content.trim(),
      language: input.language || 'en',
      experienceSource: input.experienceSource,
      archetypes: input.archetypes,
      motifs: [], // Default empty for now
      feelings: [], // Default empty for now
      context: null,
      license: input.license,
      aiUseOptOut: input.aiUseOptOut,
      visibility: input.visibility,
      anonLevel: input.anonLevel,
      pseudonym: input.pseudonym || null,
    });

    return { ok: true, story };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
