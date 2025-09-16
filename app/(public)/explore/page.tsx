"use client"

import { useState, useEffect, useCallback } from "react"
import { getStoriesAction } from "@features/stories/server/get-handler"
import { getArchetypesAction } from "@features/stories/server/archetype-handler"
import StoryList from "@features/stories/components/StoryList"
import type { Story } from "@core/domain/story"
import type { Archetype } from "@core/domain/archetype"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function ExplorePage() {
  const [stories, setStories] = useState<Story[]>([])
  const [archetypes, setArchetypes] = useState<Archetype[]>([])
  const [selectedArchetype, setSelectedArchetype] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadStories = useCallback(async () => {
    setLoading(true)
    setError("")

    try {
      const filter = selectedArchetype ? { archetypes: [selectedArchetype] } : {}

      const result = await getStoriesAction(filter)

      if (result.ok) {
        setStories(result.stories)
      } else {
        setError(result.error)
      }
    } catch {
      setError("Failed to load stories")
    } finally {
      setLoading(false)
    }
  }, [selectedArchetype])

  async function loadArchetypes() {
    try {
      const result = await getArchetypesAction()
      if (result.ok) {
        setArchetypes(result.archetypes)
      } else {
        console.error("Failed to load archetypes:", result.error)
      }
    } catch (err) {
      console.error("Failed to load archetypes:", err)
    }
  }

  useEffect(() => {
    loadArchetypes()
    loadStories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loadStories()
  }, [loadStories])

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">Explore Stories</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover stories by archetype and theme. Find resonance in the shared patterns of human experience.
          </p>
        </div>

        {/* Archetype Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              onClick={() => setSelectedArchetype("")}
              variant={selectedArchetype === "" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              All Stories
            </Button>
            {archetypes.map((archetype) => (
              <Button
                key={archetype.slug}
                onClick={() => setSelectedArchetype(archetype.slug)}
                variant={selectedArchetype === archetype.slug ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                title={archetype.description}
              >
                {archetype.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8">
            <Alert variant="destructive">
              <AlertDescription className="text-center">{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-2 text-muted-foreground">Loading stories...</p>
          </div>
        ) : (
          /* Stories List */
          <StoryList
            stories={stories}
            title={selectedArchetype ? `Stories: ${archetypes.find((a) => a.slug === selectedArchetype)?.label}` : ""}
            emptyMessage={
              selectedArchetype
                ? `No stories found for the "${archetypes.find((a) => a.slug === selectedArchetype)?.label}" archetype.`
                : "No stories have been shared yet. Be the first to offer your story!"
            }
          />
        )}

        {/* Story Count */}
        {!loading && stories.length > 0 && (
          <div className="text-center mt-8 text-muted-foreground">
            Showing {stories.length} {stories.length === 1 ? "story" : "stories"}
            {selectedArchetype && ` for "${archetypes.find((a) => a.slug === selectedArchetype)?.label}"`}
          </div>
        )}
      </div>
    </main>
  )
}
