import type { Story } from '@core/domain/story';
import StoryCard from './StoryCard';

interface StoryListProps {
  stories: Story[];
  title?: string;
  emptyMessage?: string;
}

export default function StoryList({ 
  stories, 
  title = "Stories",
  emptyMessage = "No stories found."
}: StoryListProps) {
  return (
    <section>
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      
      {stories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </section>
  );
}
