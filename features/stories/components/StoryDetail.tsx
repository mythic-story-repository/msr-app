import type { Story } from '@core/domain/story';

interface StoryDetailProps {
  story: Story;
}

export default function StoryDetail({ story }: StoryDetailProps) {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="bg-card rounded-lg shadow-sm border p-8">
        {/* Story Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <p className="whitespace-pre-wrap text-foreground leading-relaxed">
            {story.content}
          </p>
        </div>

        {/* Metadata */}
        <div className="border-t pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Archetypes */}
            <div>
              <h3 className="font-semibold text-card-foreground mb-3">Archetypes</h3>
              <div className="flex flex-wrap gap-2">
                {story.archetypes.map((archetype) => (
                  <span
                    key={archetype}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {archetype}
                  </span>
                ))}
              </div>
            </div>

            {/* Story Info */}
            <div>
              <h3 className="font-semibold text-card-foreground mb-3">Story Details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Published:</dt>
                  <dd className="text-card-foreground">
                    {new Date(story.createdAt).toLocaleDateString()}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">License:</dt>
                  <dd className="text-card-foreground capitalize">{story.license}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Language:</dt>
                  <dd className="text-card-foreground uppercase">{story.language}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Visibility:</dt>
                  <dd className="text-card-foreground capitalize">{story.visibility}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Motifs and Feelings */}
          {(story.motifs.length > 0 || story.feelings.length > 0) && (
            <div className="mt-6 pt-6 border-t">
              <div className="grid md:grid-cols-2 gap-6">
                {story.motifs.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-3">Motifs</h3>
                    <div className="flex flex-wrap gap-2">
                      {story.motifs.map((motif, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm"
                        >
                          {motif}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {story.feelings.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-3">Feelings</h3>
                    <div className="flex flex-wrap gap-2">
                      {story.feelings.map((feeling, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm"
                        >
                          {feeling}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Context */}
          {story.context && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold text-card-foreground mb-3">Context</h3>
              <div className="bg-muted rounded-lg p-4">
                {story.context.setting && (
                  <div className="mb-2">
                    <span className="font-medium text-card-foreground">Setting: </span>
                    <span className="text-muted-foreground">{story.context.setting}</span>
                  </div>
                )}
                {story.context.state && (
                  <div>
                    <span className="font-medium text-card-foreground">State: </span>
                    <span className="text-muted-foreground">{story.context.state}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
