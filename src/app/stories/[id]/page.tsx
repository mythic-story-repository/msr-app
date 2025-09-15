import { notFound } from 'next/navigation';
import { getStoryByIdAction } from '@/features/stories/server/detail-handler';
import StoryDetail from '@/features/stories/components/StoryDetail';
import ResonancePanel from '@/features/stories/components/ResonancePanel';
import Link from 'next/link';

interface StoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;
  const result = await getStoryByIdAction(id);

  if (!result.ok) {
    notFound();
  }

  const story = result.story;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/explore"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Stories
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Story Content */}
          <div className="lg:col-span-2">
            <StoryDetail story={story} />
          </div>

          {/* Sidebar with Resonance Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <ResonancePanel story={story} />
              
              {/* Actions */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  <Link
                    href="/submit"
                    className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Share Your Story
                  </Link>
                  <Link
                    href="/explore"
                    className="block w-full border border-gray-300 text-gray-700 text-center py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Explore More Stories
                  </Link>
                </div>
              </div>

              {/* Story Metadata */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Story Info</h3>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-gray-600">Story ID:</dt>
                    <dd className="text-gray-900 font-mono text-xs">{story.id}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Added:</dt>
                    <dd className="text-gray-900">
                      {new Date(story.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">License:</dt>
                    <dd className="text-gray-900">{story.license}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Anonymity:</dt>
                    <dd className="text-gray-900 capitalize">{story.anonLevel}</dd>
                  </div>
                  {story.aiUseOptOut && (
                    <div>
                      <dt className="text-gray-600">AI Use:</dt>
                      <dd className="text-gray-900">Opted out</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
