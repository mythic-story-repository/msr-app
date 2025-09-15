'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { submitStoryAction } from '../server/submit-handler';
import type { Archetype } from '@/core/domain/archetype';

const EXPERIENCE_SOURCES = [
  { value: 'psychedelic', label: 'Psychedelic' },
  { value: 'near-death-experience', label: 'Near-Death Experience' },
  { value: 'dream', label: 'Dream' },
  { value: 'mystical-opening', label: 'Mystical Opening' },
  { value: 'ritual-initiation', label: 'Ritual/Initiation' },
  { value: 'other', label: 'Other' },
];

const SUGGESTED_ARCHETYPES = [
  { slug: 'death-rebirth', label: 'Death & Rebirth' },
  { slug: 'cosmic-journey', label: 'Cosmic Journey' },
  { slug: 'sacred-union', label: 'Sacred Union' },
  { slug: 'trickster', label: 'Trickster' },
  { slug: 'healing-wholeness', label: 'Healing & Wholeness' },
  { slug: 'hero-journey', label: 'Hero&#39;s Journey' },
  { slug: 'initiation', label: 'Initiation' },
  { slug: 'shadow-descent', label: 'Shadow Descent' },
];

export default function StoryEditor() {
  const [content, setContent] = useState('');
  const [experienceSource, setExperienceSource] = useState('');
  const [selectedArchetypes, setSelectedArchetypes] = useState<string[]>([]);
  const [licenseChoice, setLicenseChoice] = useState('gift-to-commons');
  const [visibility, setVisibility] = useState('public');
  const [anonLevel, setAnonLevel] = useState('anonymous');
  const [pseudonym, setPseudonym] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [availableArchetypes, setAvailableArchetypes] = useState<Archetype[]>([]);
  const router = useRouter();

  // Use suggested archetypes (no database call needed on client side)
  useEffect(() => {
    setAvailableArchetypes(SUGGESTED_ARCHETYPES.map(a => ({ 
      id: a.slug, 
      slug: a.slug, 
      label: a.label 
    })));
  }, []);

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('experienceSource', experienceSource);
      formData.append('archetypes', JSON.stringify(selectedArchetypes));
      
      // Map license choice to actual values
      let license = 'CC0';
      let aiUseOptOut = false;
      
      switch (licenseChoice) {
        case 'gift-to-commons':
          license = 'CC0';
          aiUseOptOut = false;
          break;
        case 'gift-with-attribution':
          license = 'CC BY';
          aiUseOptOut = false;
          break;
        case 'gift-to-people-not-ai':
          license = 'CC BY';
          aiUseOptOut = true;
          break;
      }
      
      formData.append('license', license);
      formData.append('aiUseOptOut', aiUseOptOut ? 'on' : '');
      formData.append('visibility', visibility);
      formData.append('anonLevel', anonLevel);
      if (anonLevel === 'pseudonym' && pseudonym) {
        formData.append('pseudonym', pseudonym);
      }
      formData.append('language', 'en');

      const result = await submitStoryAction(formData);
      
      if (result.ok) {
        setContent('');
        setSelectedArchetypes([]);
        router.push(`/stories/${result.story.id}`);
      } else {
        setError(result.error);
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const toggleArchetype = (slug: string) => {
    setSelectedArchetypes(prev => 
      prev.includes(slug) 
        ? prev.filter(a => a !== slug)
        : [...prev, slug]
    );
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Writing Space</h2>
          <button
            onClick={toggleFullscreen}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Exit Fullscreen
          </button>
        </div>
        <div className="flex-1 p-8">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full resize-none border-none outline-none text-lg leading-relaxed"
            placeholder="Share your story here..."
            autoFocus
          />
        </div>
        <div className="p-4 border-t bg-gray-50 text-sm text-gray-600">
          {wordCount} words • Aim for 200–800 words
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border">
        {error && (
          <div className="m-6 mb-0 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="p-6 space-y-8">
          {/* Editor Section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="content" className="block text-lg font-medium text-gray-900">
                Your Story *
              </label>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Fullscreen
              </button>
            </div>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[24rem] max-h-[32rem] border border-gray-300 rounded-lg p-4 text-base leading-relaxed resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Share your story here..."
              required
            />
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>Tell your story in your own words. Be authentic and honest.</span>
              <span className={wordCount < 200 || wordCount > 800 ? 'text-amber-600' : 'text-green-600'}>
                {wordCount} words • Aim for 200–800 words
              </span>
            </div>
          </div>

          {/* Experience Source */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              What is this story from? *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {EXPERIENCE_SOURCES.map((source) => (
                <label
                  key={source.value}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    experienceSource === source.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="experienceSource"
                    value={source.value}
                    checked={experienceSource === source.value}
                    onChange={(e) => setExperienceSource(e.target.value)}
                    className="sr-only"
                    required
                  />
                  <span className="text-sm font-medium">{source.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Archetypes */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Archetypes *
            </label>
            <p className="text-sm text-gray-600 mb-4">
              Select the archetypal patterns that best describe your story. Choose at least one.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(availableArchetypes.length > 0 ? availableArchetypes : SUGGESTED_ARCHETYPES).map((archetype) => (
                <label
                  key={archetype.slug}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedArchetypes.includes(archetype.slug)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedArchetypes.includes(archetype.slug)}
                    onChange={() => toggleArchetype(archetype.slug)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{archetype.label}</span>
                </label>
              ))}
            </div>
            {selectedArchetypes.length === 0 && (
              <p className="mt-2 text-sm text-red-600">Please select at least one archetype.</p>
            )}
          </div>

          {/* Sharing & Privacy */}
          <div className="border-t pt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Sharing & Privacy</h3>
            
            <div className="space-y-6">
              {/* License & AI Intent */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How would you like to share this?
                </label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="licenseChoice"
                      value="gift-to-commons"
                      checked={licenseChoice === 'gift-to-commons'}
                      onChange={(e) => setLicenseChoice(e.target.value)}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="font-medium">Gift to Commons</div>
                      <div className="text-sm text-gray-600">CC0 license, AI training allowed</div>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="licenseChoice"
                      value="gift-with-attribution"
                      checked={licenseChoice === 'gift-with-attribution'}
                      onChange={(e) => setLicenseChoice(e.target.value)}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="font-medium">Gift with Attribution</div>
                      <div className="text-sm text-gray-600">CC BY license, AI training allowed</div>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="licenseChoice"
                      value="gift-to-people-not-ai"
                      checked={licenseChoice === 'gift-to-people-not-ai'}
                      onChange={(e) => setLicenseChoice(e.target.value)}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="font-medium">Gift to People, not to AI</div>
                      <div className="text-sm text-gray-600">CC BY license, AI training opted out</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Visibility */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Who can see this?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={visibility === 'public'}
                      onChange={(e) => setVisibility(e.target.value)}
                      className="mr-2"
                    />
                    Public
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="visibility"
                      value="link-only"
                      checked={visibility === 'link-only'}
                      onChange={(e) => setVisibility(e.target.value)}
                      className="mr-2"
                    />
                    Link-only
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={visibility === 'private'}
                      onChange={(e) => setVisibility(e.target.value)}
                      className="mr-2"
                    />
                    Private
                  </label>
                </div>
              </div>

              {/* Name Display */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How should your name appear?
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="anonLevel"
                      value="none"
                      checked={anonLevel === 'none'}
                      onChange={(e) => setAnonLevel(e.target.value)}
                      className="mr-2"
                    />
                    Show name
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="anonLevel"
                      value="pseudonym"
                      checked={anonLevel === 'pseudonym'}
                      onChange={(e) => setAnonLevel(e.target.value)}
                      className="mr-2"
                    />
                    Pseudonym
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="anonLevel"
                      value="anonymous"
                      checked={anonLevel === 'anonymous'}
                      onChange={(e) => setAnonLevel(e.target.value)}
                      className="mr-2"
                    />
                    Anonymous
                  </label>
                </div>
                
                {anonLevel === 'pseudonym' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      value={pseudonym}
                      onChange={(e) => setPseudonym(e.target.value)}
                      placeholder="Enter your pseudonym"
                      className="w-full max-w-xs border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="border-t pt-6">
            <button 
              type="submit"
              disabled={isSubmitting || !content.trim() || !experienceSource || selectedArchetypes.length === 0}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Sharing Your Story...' : 'Share Your Story'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
