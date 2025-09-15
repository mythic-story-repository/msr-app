import { prisma } from '@/core/db/client';
import type { Story } from '@/core/domain/story';
import type { Archetype } from '@/core/domain/archetype';

export interface StoryFilter {
  archetypes?: string[];
  visibility?: 'public' | 'link-only' | 'private';
  limit?: number;
  offset?: number;
}

export async function createStory(data: {
  content: string;
  language: string;
  experienceSource: 'psychedelic' | 'near-death-experience' | 'dream' | 'mystical-opening' | 'ritual-initiation' | 'other';
  archetypes: string[];
  motifs: string[];
  feelings: string[];
  context?: { setting?: string; state?: string } | null;
  license: 'CC0' | 'CC BY';
  aiUseOptOut: boolean;
  visibility: 'public' | 'link-only' | 'private';
  anonLevel: 'none' | 'pseudonym' | 'anonymous';
  pseudonym?: string | null;
}): Promise<Story> {
  const dbStory = await prisma.story.create({
    data: {
      content: data.content,
      language: data.language,
      experienceSource: data.experienceSource,
      archetypes: JSON.stringify(data.archetypes),
      motifs: JSON.stringify(data.motifs),
      feelings: JSON.stringify(data.feelings),
      context: data.context ? JSON.stringify(data.context) : null,
      license: data.license,
      aiUseOptOut: data.aiUseOptOut,
      visibility: data.visibility,
      anonLevel: data.anonLevel,
      pseudonym: data.pseudonym || null,
    },
  });

  return mapDbStoryToDomain(dbStory);
}

export async function getStoryById(id: string): Promise<Story | null> {
  const dbStory = await prisma.story.findUnique({
    where: { id },
  });

  if (!dbStory) return null;
  return mapDbStoryToDomain(dbStory);
}

export async function getStories(filter: StoryFilter = {}): Promise<Story[]> {
  const where: { visibility?: string } = {};
  
  if (filter.visibility) {
    where.visibility = filter.visibility;
  } else {
    // Default to public stories only
    where.visibility = 'public';
  }

  const dbStories = await prisma.story.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: filter.limit || 20,
    skip: filter.offset || 0,
  });

  let stories = dbStories.map(mapDbStoryToDomain);

  // Filter by archetypes if specified (since we store as JSON)
  if (filter.archetypes && filter.archetypes.length > 0) {
    stories = stories.filter((story: Story) => 
      filter.archetypes!.some(archetype => 
        story.archetypes.includes(archetype)
      )
    );
  }

  return stories;
}

export async function getRecentStories(limit: number = 6): Promise<Story[]> {
  return getStories({ visibility: 'public', limit });
}

export async function createArchetype(data: {
  slug: string;
  label: string;
  description?: string;
}): Promise<Archetype> {
  const dbArchetype = await prisma.archetype.create({
    data,
  });
  
  return {
    id: dbArchetype.id,
    slug: dbArchetype.slug,
    label: dbArchetype.label,
    description: dbArchetype.description || undefined,
  };
}

export async function getArchetypes(): Promise<Archetype[]> {
  const dbArchetypes = await prisma.archetype.findMany({
    orderBy: { label: 'asc' },
  });
  
  return dbArchetypes.map(dbArchetype => ({
    id: dbArchetype.id,
    slug: dbArchetype.slug,
    label: dbArchetype.label,
    description: dbArchetype.description || undefined,
  }));
}

export async function getArchetypeBySlug(slug: string): Promise<Archetype | null> {
  const dbArchetype = await prisma.archetype.findUnique({
    where: { slug },
  });
  
  if (!dbArchetype) return null;
  
  return {
    id: dbArchetype.id,
    slug: dbArchetype.slug,
    label: dbArchetype.label,
    description: dbArchetype.description || undefined,
  };
}

// Helper function to map database story to domain model
function mapDbStoryToDomain(dbStory: {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  language: string;
  experienceSource?: string | null;
  archetypes: string;
  motifs: string;
  feelings: string;
  context: string | null;
  license: string;
  aiUseOptOut: boolean;
  visibility: string;
  anonLevel: string;
  pseudonym?: string | null;
}): Story {
  return {
    id: dbStory.id,
    createdAt: dbStory.createdAt,
    content: dbStory.content,
    language: dbStory.language,
    experienceSource: dbStory.experienceSource as 'psychedelic' | 'near-death-experience' | 'dream' | 'mystical-opening' | 'ritual-initiation' | 'other',
    archetypes: JSON.parse(dbStory.archetypes),
    motifs: JSON.parse(dbStory.motifs),
    feelings: JSON.parse(dbStory.feelings),
    context: dbStory.context ? JSON.parse(dbStory.context) : null,
    license: dbStory.license as 'CC0' | 'CC BY',
    aiUseOptOut: dbStory.aiUseOptOut,
    visibility: dbStory.visibility as 'public' | 'link-only' | 'private',
    anonLevel: dbStory.anonLevel as 'none' | 'pseudonym' | 'anonymous',
    pseudonym: dbStory.pseudonym || null,
  };
}
