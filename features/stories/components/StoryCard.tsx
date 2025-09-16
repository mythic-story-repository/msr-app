import Link from 'next/link';
import type { Story } from '@core/domain/story';

export default function StoryCard({ story }: { story: Story }) {
  const truncatedContent = story.content.length > 200 
    ? story.content.substring(0, 200) + '...' 
    : story.content;

  return (
    <Link href={`/stories/${story.id}`}>
      <article className="rounded-2xl border p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <p className="whitespace-pre-wrap text-foreground mb-3">{truncatedContent}</p>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {story.archetypes.map((archetype) => (
            <span
              key={archetype}
              className="text-xs rounded-full bg-blue-100 text-blue-800 px-2 py-0.5"
              aria-label={`Archetype ${archetype}`}
            >
              {archetype}
            </span>
          ))}
        </div>
        
        <div className="text-xs text-muted-foreground flex justify-between items-center">
          <span>{new Date(story.createdAt).toLocaleDateString()}</span>
          <span className="capitalize">{story.license}</span>
        </div>
      </article>
    </Link>
  );
}
