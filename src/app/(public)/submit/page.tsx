import StoryEditor from '@/features/stories/components/StoryEditor';

export default function SubmitPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Offer Your Story</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your story matters. Share your experience to contribute to our collective understanding 
            and help others find meaning in their own journeys.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Offerings, not uploads. Consent is sacred.
          </p>
        </div>
        
        <StoryEditor />
      </div>
    </main>
  );
}
