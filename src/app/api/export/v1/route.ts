import { NextRequest, NextResponse } from 'next/server';
import { getStoriesAction } from '@/features/stories/server/get-handler';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    
    // Get all public stories for export
    const result = await getStoriesAction({ 
      visibility: 'public',
      limit: 1000 // Large limit for export
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const stories = result.stories;

    // Filter out any PII based on anonymity level
    const exportStories = stories.map(story => {
      const exportStory = { ...story };
      
      // Respect anonymity settings
      if (story.anonLevel === 'anonymous' || story.anonLevel === 'pseudonym') {
        // Remove any potential identifying information
        // For now, we just ensure the story content is preserved
        // In a real implementation, we'd scrub PII from content
      }
      
      return exportStory;
    });

    if (format === 'csv') {
      // Convert to CSV format
      const csvHeaders = 'id,createdAt,content,archetypes,license,language,visibility,anonLevel\n';
      const csvRows = exportStories.map(story => {
        const escapedContent = `"${story.content.replace(/"/g, '""')}"`;
        const archetypes = `"${story.archetypes.join(';')}"`;
        return `${story.id},${story.createdAt.toISOString()},${escapedContent},${archetypes},${story.license},${story.language},${story.visibility},${story.anonLevel}`;
      }).join('\n');
      
      const csvContent = csvHeaders + csvRows;
      
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="msr-stories-export.csv"',
        },
      });
    }

    // Default JSON format
    return NextResponse.json({
      exportedAt: new Date().toISOString(),
      totalStories: exportStories.length,
      format: 'json',
      stories: exportStories,
    });

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
