export type License = 'CC0' | 'CC BY';
export type Visibility = 'public' | 'link-only' | 'private';
export type AnonLevel = 'none' | 'pseudonym' | 'anonymous';
export type ExperienceSource = 'psychedelic' | 'near-death-experience' | 'dream' | 'mystical-opening' | 'ritual-initiation' | 'other';

export interface Story {
  id: string;
  createdAt: Date;
  content: string;
  language: string;
  experienceSource: ExperienceSource;
  archetypes: string[];  // slugs
  motifs: string[];
  feelings: string[];
  context?: { setting?: string; state?: string } | null;
  license: License;
  aiUseOptOut: boolean;
  visibility: Visibility;
  anonLevel: AnonLevel;
  pseudonym?: string | null;  // Only used when anonLevel is 'pseudonym'
}
