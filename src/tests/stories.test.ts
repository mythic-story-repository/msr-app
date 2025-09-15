import { describe, it, expect, beforeEach } from '@jest/globals';
import { submitStory } from '@/core/usecases/submitStory';
import { getStories } from '@/core/usecases/getStories';
import { getStoryById } from '@/core/usecases/getStoryById';
import type { Story } from '@/core/domain/story';

// Mock story data for testing
const mockStory: Story = {
  id: 'test-story-1',
  createdAt: new Date(),
  content: 'This is a test story about overcoming challenges.',
  language: 'en',
  archetypes: ['hero-journey'],
  motifs: ['challenge', 'growth'],
  feelings: ['determination', 'hope'],
  context: null,
  license: 'CC0',
  aiUseOptOut: false,
  visibility: 'public',
  anonLevel: 'anonymous',
};

// Mock database functions
const mockCreateStory = jest.fn();
const mockGetStoriesQuery = jest.fn();
const mockGetStoryByIdQuery = jest.fn();

describe('Story Usecases', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('submitStory', () => {
    it('should successfully submit a valid story', async () => {
      mockCreateStory.mockResolvedValue(mockStory);

      const input = {
        content: 'This is a test story about overcoming challenges.',
        archetypes: ['hero-journey'],
        license: 'CC0' as const,
        aiUseOptOut: false,
        visibility: 'public' as const,
        anonLevel: 'anonymous' as const,
        language: 'en',
      };

      const result = await submitStory(input, mockCreateStory);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.story).toEqual(mockStory);
      }
      expect(mockCreateStory).toHaveBeenCalledWith({
        content: input.content,
        language: 'en',
        archetypes: input.archetypes,
        motifs: [],
        feelings: [],
        context: null,
        license: input.license,
        aiUseOptOut: input.aiUseOptOut,
        visibility: input.visibility,
        anonLevel: input.anonLevel,
      });
    });

    it('should reject story with empty content', async () => {
      const input = {
        content: '',
        archetypes: ['hero-journey'],
        license: 'CC0' as const,
        aiUseOptOut: false,
        visibility: 'public' as const,
        anonLevel: 'anonymous' as const,
        language: 'en',
      };

      const result = await submitStory(input, mockCreateStory);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('Content is required');
      }
      expect(mockCreateStory).not.toHaveBeenCalled();
    });

    it('should reject story with no archetypes', async () => {
      const input = {
        content: 'This is a test story.',
        archetypes: [],
        license: 'CC0' as const,
        aiUseOptOut: false,
        visibility: 'public' as const,
        anonLevel: 'anonymous' as const,
        language: 'en',
      };

      const result = await submitStory(input, mockCreateStory);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('At least one archetype is required');
      }
      expect(mockCreateStory).not.toHaveBeenCalled();
    });
  });

  describe('getStories', () => {
    it('should successfully retrieve stories', async () => {
      const mockStories = [mockStory];
      mockGetStoriesQuery.mockResolvedValue(mockStories);

      const filter = { visibility: 'public' as const };
      const result = await getStories(filter, mockGetStoriesQuery);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.stories).toEqual(mockStories);
      }
      expect(mockGetStoriesQuery).toHaveBeenCalledWith(filter);
    });

    it('should handle database errors gracefully', async () => {
      mockGetStoriesQuery.mockRejectedValue(new Error('Database connection failed'));

      const result = await getStories({}, mockGetStoriesQuery);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('Database connection failed');
      }
    });
  });

  describe('getStoryById', () => {
    it('should successfully retrieve a story by ID', async () => {
      mockGetStoryByIdQuery.mockResolvedValue(mockStory);

      const result = await getStoryById('test-story-1', mockGetStoryByIdQuery);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.story).toEqual(mockStory);
      }
      expect(mockGetStoryByIdQuery).toHaveBeenCalledWith('test-story-1');
    });

    it('should return error when story not found', async () => {
      mockGetStoryByIdQuery.mockResolvedValue(null);

      const result = await getStoryById('non-existent-id', mockGetStoryByIdQuery);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('Story not found');
      }
    });

    it('should reject empty story ID', async () => {
      const result = await getStoryById('', mockGetStoryByIdQuery);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('Story ID is required');
      }
      expect(mockGetStoryByIdQuery).not.toHaveBeenCalled();
    });
  });
});

// Integration test to verify domain model consistency
describe('Story Domain Model', () => {
  it('should have consistent type definitions', () => {
    const story: Story = {
      id: 'test-id',
      createdAt: new Date(),
      content: 'Test content',
      language: 'en',
      archetypes: ['hero-journey'],
      motifs: ['test'],
      feelings: ['hope'],
      context: { setting: 'test setting' },
      license: 'CC0',
      aiUseOptOut: false,
      visibility: 'public',
      anonLevel: 'anonymous',
    };

    // Verify all required fields are present
    expect(story.id).toBeDefined();
    expect(story.createdAt).toBeInstanceOf(Date);
    expect(story.content).toBeDefined();
    expect(story.archetypes).toBeInstanceOf(Array);
    expect(['CC0', 'CC BY']).toContain(story.license);
    expect(['public', 'link-only', 'private']).toContain(story.visibility);
    expect(['none', 'pseudonym', 'anonymous']).toContain(story.anonLevel);
  });
});
