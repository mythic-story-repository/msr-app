export type DomainEvent =
  | { type: 'StorySubmitted'; storyId: string; at: Date };
