import Link from 'next/link';
import { getRecentStoriesAction } from '@/features/stories/server/get-handler';
import StoryList from '@/features/stories/components/StoryList';

export default async function Home() {
  const result = await getRecentStoriesAction(6);
  const recentStories = result.ok ? result.stories : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mythic Story Repository
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              A commons for human stories, where personal narratives become part of our collective wisdom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/submit"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
              >
                Offer Your Story
              </Link>
              <Link
                href="/explore"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Explore Stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Stories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Stories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest stories shared by our community. Each story carries the wisdom of lived experience.
          </p>
        </div>

        {recentStories.length > 0 ? (
          <StoryList 
            stories={recentStories} 
            title=""
            emptyMessage="No stories have been shared yet. Be the first to offer your story!"
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-6">No stories have been shared yet.</p>
            <Link
              href="/submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Be the first to share your story
            </Link>
          </div>
        )}

        {recentStories.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/explore"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View all stories →
            </Link>
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Your Story</h3>
              <p className="text-gray-600">
                Your experiences matter. Share your story to contribute to our collective understanding.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Patterns</h3>
              <p className="text-gray-600">
                Explore stories by archetypes and themes to find resonance and meaning.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Build Commons</h3>
              <p className="text-gray-600">
                Together we create a repository of human wisdom for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
