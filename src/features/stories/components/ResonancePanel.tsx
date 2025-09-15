import type { Story } from '@/core/domain/story';

interface ResonancePanelProps {
  story: Story;
}

export default function ResonancePanel({ story }: ResonancePanelProps) {
  // Stub data for Phase D0 - deterministic based on story ID to avoid hydration issues
  const hash = story.id.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const resonanceData = {
    views: Math.abs(hash % 1000) + 50,
    likes: Math.abs((hash * 7) % 100) + 5,
    shares: Math.abs((hash * 13) % 50) + 1,
    resonanceScore: Math.abs((hash * 17) % 100) + 1,
    similarStories: Math.abs((hash * 23) % 20) + 3,
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
        Resonance Metrics
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {resonanceData.views}
          </div>
          <div className="text-sm text-gray-600">Views</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {resonanceData.likes}
          </div>
          <div className="text-sm text-gray-600">Likes</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {resonanceData.shares}
          </div>
          <div className="text-sm text-gray-600">Shares</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {resonanceData.resonanceScore}%
          </div>
          <div className="text-sm text-gray-600">Resonance</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-600">
            {resonanceData.similarStories}
          </div>
          <div className="text-sm text-gray-600">Similar</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-pink-600">
            {story.archetypes.length}
          </div>
          <div className="text-sm text-gray-600">Archetypes</div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-white/50 rounded-lg">
        <p className="text-xs text-gray-500 italic">
          📊 This is a stub panel for Phase D0. Real resonance metrics will be calculated 
          based on user interactions, story similarity analysis, and engagement patterns.
        </p>
      </div>
    </div>
  );
}
