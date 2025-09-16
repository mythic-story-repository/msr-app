import { notFound } from "next/navigation"
import { getStoryByIdAction } from "@features/stories/server/detail-handler"
import StoryDetail from "@features/stories/components/StoryDetail"
import ResonancePanel from "@features/stories/components/ResonancePanel"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface StoryPageProps {
  params: Promise<{ id: string }>
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params
  const result = await getStoryByIdAction(id)

  if (!result.ok) {
    notFound()
  }

  const story = result.story

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Stories
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

              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full">
                    <Link href="/submit">Share Your Story</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/explore">Explore More Stories</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Story Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Story ID:</dt>
                      <dd className="text-foreground font-mono text-xs">{story.id}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Added:</dt>
                      <dd className="text-foreground">
                        {new Date(story.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">License:</dt>
                      <dd className="text-foreground">{story.license}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Anonymity:</dt>
                      <dd className="text-foreground capitalize">{story.anonLevel}</dd>
                    </div>
                    {story.aiUseOptOut && (
                      <div>
                        <dt className="text-muted-foreground">AI Use:</dt>
                        <dd className="text-foreground">Opted out</dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
