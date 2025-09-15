import { z } from 'zod';

export const submitStorySchema = z.object({
  content: z.string().min(1, 'Content is required'),
  experienceSource: z.enum(['psychedelic', 'near-death-experience', 'dream', 'mystical-opening', 'ritual-initiation', 'other']),
  archetypes: z.array(z.string()).min(1, 'Select at least one archetype'),
  license: z.enum(['CC0', 'CC BY']),
  aiUseOptOut: z.boolean().default(false),
  visibility: z.enum(['public', 'link-only', 'private']).default('public'),
  anonLevel: z.enum(['none', 'pseudonym', 'anonymous']).default('anonymous'),
  pseudonym: z.string().optional(),
  language: z.string().default('en'),
});
export type SubmitStoryInput = z.infer<typeof submitStorySchema>;
