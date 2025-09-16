import Link from "next/link"
import { getRecentStoriesAction } from "@features/stories/server/get-handler"
import StoryList from "@features/stories/components/StoryList"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Share2, Search, Users } from "lucide-react"

export default async function Home() {
  const result = await getRecentStoriesAction(6)
  const recentStories = result.ok ? result.stories : []

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Mythic Story Repository</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/80 max-w-3xl mx-auto text-pretty">
              A commons for human stories, where personal narratives become part of our collective wisdom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-4 rounded-2xl">
                <Link href="/submit">Offer Your Story</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 rounded-2xl border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                <Link href="/explore">Explore Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Stories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Recent Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover the latest stories shared by our community. Each story carries the wisdom of lived experience.
          </p>
        </div>

        {recentStories.length > 0 ? (
          <>
            <StoryList
              stories={recentStories}
              title=""
              emptyMessage="No stories have been shared yet. Be the first to offer your story!"
            />
            <div className="text-center mt-12">
              <Link
                href="/explore"
                className="text-primary hover:text-primary/80 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg px-2 py-1"
              >
                View all stories →
              </Link>
            </div>
          </>
        ) : (
          <Card className="max-w-md mx-auto rounded-2xl shadow-card">
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-6">No stories have been shared yet.</p>
              <Button asChild className="rounded-2xl">
                <Link href="/submit">Be the first to share your story</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Value Propositions Section */}
      <section className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center rounded-2xl shadow-card">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">Share Your Story</h3>
                <p className="text-muted-foreground text-pretty">
                  Your experiences matter. Share your story to contribute to our collective understanding.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center rounded-2xl shadow-card">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">Discover Patterns</h3>
                <p className="text-muted-foreground text-pretty">
                  Explore stories by archetypes and themes to find resonance and meaning.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center rounded-2xl shadow-card">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">Build Commons</h3>
                <p className="text-muted-foreground text-pretty">
                  Together we create a repository of human wisdom for future generations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-6">
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg px-2 py-1"
              >
                About
              </Link>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg px-2 py-1"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg px-2 py-1"
              >
                Contact
              </Link>
            </div>
            <p className="text-muted-foreground text-sm">© 2024 Mythic Story Repository. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
