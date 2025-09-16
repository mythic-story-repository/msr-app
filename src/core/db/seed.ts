import { prisma } from './client';

const archetypes = [
  {
    slug: 'hero-journey',
    label: 'Hero\'s Journey',
    description: 'A transformative quest where the protagonist faces challenges and returns changed'
  },
  {
    slug: 'death-rebirth',
    label: 'Death & Rebirth',
    description: 'Stories of endings that lead to new beginnings, transformation through loss'
  },
  {
    slug: 'mentor',
    label: 'Mentor',
    description: 'Wisdom shared, guidance given, or lessons learned from others'
  },
  {
    slug: 'shadow',
    label: 'Shadow',
    description: 'Confronting the dark aspects of self or society'
  },
  {
    slug: 'trickster',
    label: 'Trickster',
    description: 'Disruption of order, humor in chaos, unexpected wisdom'
  },
  {
    slug: 'lover',
    label: 'Lover',
    description: 'Stories of connection, passion, and relationships'
  },
  {
    slug: 'creator',
    label: 'Creator',
    description: 'Building something new, artistic expression, bringing ideas to life'
  },
  {
    slug: 'caregiver',
    label: 'Caregiver',
    description: 'Nurturing others, sacrifice for loved ones, protective instincts'
  }
];

const stories = [
  {
    content: `I was 25 when my father died suddenly. I thought I knew who I was until that moment. The funeral was a blur, but I remember standing at his grave thinking, "Now what?" 

For months, I felt lost. I quit my corporate job and traveled to Southeast Asia with just a backpack. In a small village in Nepal, an elderly woman invited me for tea. She didn't speak English, but she held my hand and I cried for the first time since the funeral.

That moment taught me that grief isn't something to get over—it's something to carry with grace. I came home and started a nonprofit helping others navigate loss. My father's death wasn't the end of our relationship; it was the beginning of understanding what he really gave me.`,
    archetypes: ['death-rebirth', 'hero-journey'],
    motifs: ['loss', 'travel', 'transformation'],
    feelings: ['grief', 'confusion', 'acceptance', 'purpose'],
    license: 'CC0',
    aiUseOptOut: false,
    visibility: 'public',
    anonLevel: 'anonymous',
    language: 'en'
  },
  {
    content: `My grandmother taught me to bake bread when I was seven. Every Sunday, we'd wake up early and she'd let me measure the flour while she told stories about her childhood in Italy.

She passed away when I was in college, but I kept baking. During the pandemic, when everyone was stuck inside, I started leaving loaves on neighbors' doorsteps with little notes. It became a thing—people started requesting their favorites, sharing their own family recipes.

Now I run a small bakery, but it's really about continuing what my grandmother started: feeding people isn't just about food, it's about love made tangible. Every loaf carries her wisdom forward.`,
    archetypes: ['mentor', 'caregiver', 'creator'],
    motifs: ['tradition', 'food', 'community'],
    feelings: ['love', 'nostalgia', 'purpose', 'connection'],
    license: 'CC BY',
    aiUseOptOut: false,
    visibility: 'public',
    anonLevel: 'pseudonym',
    language: 'en'
  },
  {
    content: `I spent my twenties trying to be perfect. Perfect grades, perfect job, perfect relationship. I was exhausted but couldn't stop. Then I got fired for the first time in my life—budget cuts, nothing personal.

I was devastated, but also secretly relieved. For the first time in years, I had no plan. I started painting again, something I'd abandoned in college. My first paintings were angry, chaotic. Then they became playful. Then beautiful.

Six months later, I had my first art show. I didn't get my old job back—I didn't want it. Sometimes the thing that breaks you is the thing that sets you free.`,
    archetypes: ['shadow', 'death-rebirth', 'creator'],
    motifs: ['perfectionism', 'failure', 'art'],
    feelings: ['anxiety', 'relief', 'freedom', 'joy'],
    license: 'CC0',
    aiUseOptOut: true,
    visibility: 'public',
    anonLevel: 'anonymous',
    language: 'en'
  },
  {
    content: `My daughter came out to me when she was sixteen. I'm ashamed to say my first reaction was fear—not of who she was, but of how the world might treat her.

I spent weeks researching, reading stories from other parents, trying to understand. But the real learning happened in small moments: watching her confidence grow when I used her girlfriend's name naturally, seeing her relief when I put a pride flag in our yard.

She's in college now, thriving. The other day she thanked me for "getting it right." I told her the truth: she taught me how to love better. Sometimes our children are our greatest teachers.`,
    archetypes: ['caregiver', 'mentor'],
    motifs: ['family', 'acceptance', 'growth'],
    feelings: ['fear', 'love', 'pride', 'gratitude'],
    license: 'CC BY',
    aiUseOptOut: false,
    visibility: 'public',
    anonLevel: 'anonymous',
    language: 'en'
  },
  {
    content: `I was the class clown in high school—not because I was naturally funny, but because making people laugh felt safer than letting them see who I really was.

College was different. I joined the improv club on a whim and discovered something magical: when you're truly present with other people, creating something together in the moment, all the masks fall away.

Now I teach improv to kids with social anxiety. We play games where there are no wrong answers, where "mistakes" become gifts. Watching a shy kid discover their voice through play—that's when I remember why laughter isn't just entertainment, it's healing.`,
    archetypes: ['trickster', 'mentor', 'shadow'],
    motifs: ['humor', 'authenticity', 'performance'],
    feelings: ['insecurity', 'joy', 'connection', 'purpose'],
    license: 'CC0',
    aiUseOptOut: false,
    visibility: 'public',
    anonLevel: 'pseudonym',
    language: 'en'
  },
  {
    content: `We met in a bookstore. Cliché, I know, but we both reached for the same copy of a poetry collection. Instead of fighting over it, we decided to read it together at the café next door.

Three hours later, we were still talking. Six months later, we moved in together. Two years later, we got married in that same bookstore, surrounded by friends and the smell of old paper.

People ask what makes a relationship last. For us, it's simple: we never stopped being curious about each other. Every day, I discover something new about the person I thought I knew completely. Love isn't a destination—it's a daily choice to keep exploring.`,
    archetypes: ['lover', 'creator'],
    motifs: ['books', 'curiosity', 'commitment'],
    feelings: ['love', 'wonder', 'contentment', 'growth'],
    license: 'CC BY',
    aiUseOptOut: false,
    visibility: 'public',
    anonLevel: 'none',
    language: 'en'
  },
  {
    content: `I started writing songs in my bedroom when I was fourteen, using a cheap guitar and a phone app to record. My parents thought it was a phase. My friends didn't really get it.

But I kept going. Posted videos online, played open mics, wrote songs about everything—heartbreak, hope, the way light looks at 3 AM when you can't sleep.

Last month, a song I wrote about my anxiety went viral. Not because it was perfect, but because it was honest. Now I get messages from strangers saying my music helped them feel less alone.

Art isn't about being the best—it's about being brave enough to share your truth and trust that someone else needs to hear it.`,
    archetypes: ['creator', 'hero-journey'],
    motifs: ['music', 'vulnerability', 'persistence'],
    feelings: ['doubt', 'determination', 'connection', 'fulfillment'],
    license: 'CC0',
    aiUseOptOut: false,
    visibility: 'public',
    anonLevel: 'anonymous',
    language: 'en'
  },
  {
    content: `My brother struggled with addiction for years. I tried everything—interventions, tough love, enabling, cutting him off. Nothing worked, and I was exhausted from trying to save someone who didn't want to be saved.

The turning point came when I stopped trying to fix him and started taking care of myself. I went to Al-Anon, learned about boundaries, focused on my own healing.

Ironically, when I stopped chasing him, he started reaching out. He's been clean for two years now. We have coffee every Sunday, and sometimes we talk about the dark years, but mostly we just enjoy being brothers again.

You can't love someone into recovery, but you can love yourself enough to stop drowning with them.`,
    archetypes: ['caregiver', 'shadow', 'death-rebirth'],
    motifs: ['addiction', 'family', 'boundaries'],
    feelings: ['exhaustion', 'guilt', 'acceptance', 'peace'],
    license: 'CC BY',
    aiUseOptOut: true,
    visibility: 'public',
    anonLevel: 'anonymous',
    language: 'en'
  },
  {
    content: `I was laid off at 55 and thought my career was over. Twenty-five years at the same company, and suddenly I was "redundant." I felt invisible, obsolete.

My daughter suggested I try tutoring. "You've always been good at explaining things," she said. I started with one kid struggling with math. Then two. Then five.

Now I run a learning center for kids who don't fit the traditional mold—the dreamers, the anxious ones, the ones who think differently. Turns out, all those years of corporate experience taught me patience, problem-solving, and how to see potential where others see problems.

Sometimes what feels like an ending is actually a beginning in disguise.`,
    archetypes: ['mentor', 'death-rebirth', 'caregiver'],
    motifs: ['career change', 'teaching', 'resilience'],
    feelings: ['rejection', 'uncertainty', 'purpose', 'fulfillment'],
    license: 'CC0',
    aiUseOptOut: false,
    visibility: 'public',
    anonLevel: 'pseudonym',
    language: 'en'
  },
  {
    content: `I grew up poor, and I mean really poor—sometimes we didn't have electricity, often we didn't have enough food. I was embarrassed, angry, determined to escape.

I worked three jobs through college, graduated with honors, got a good job in finance. I thought success meant never being vulnerable again. I built walls so high that even I couldn't see over them.

It took a therapist to help me understand: my childhood wasn't something to overcome, it was something that gave me superpowers. I understand struggle in a way that helps me connect with people. I know how to make something from nothing.

Now I mentor kids from backgrounds like mine. I tell them: your story isn't your limitation, it's your strength. The world needs what you've learned from surviving.`,
    archetypes: ['hero-journey', 'mentor', 'shadow'],
    motifs: ['poverty', 'education', 'resilience'],
    feelings: ['shame', 'determination', 'pride', 'empowerment'],
    license: 'CC BY',
    aiUseOptOut: false,
    visibility: 'public',
    anonLevel: 'anonymous',
    language: 'en'
  }
];

export async function seedDatabase() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.story.deleteMany();
  await prisma.archetype.deleteMany();

  // Seed archetypes
  console.log('📚 Seeding archetypes...');
  for (const archetype of archetypes) {
    await prisma.archetype.create({
      data: archetype
    });
  }

  // Seed stories
  console.log('📖 Seeding stories...');
  for (const story of stories) {
    await prisma.story.create({
      data: {
        content: story.content,
        archetypes: JSON.stringify(story.archetypes),
        motifs: JSON.stringify(story.motifs),
        feelings: JSON.stringify(story.feelings),
        license: story.license,
        aiUseOptOut: story.aiUseOptOut,
        visibility: story.visibility,
        anonLevel: story.anonLevel,
        language: story.language,
      }
    });
  }

  console.log(`✅ Seeded ${archetypes.length} archetypes and ${stories.length} stories`);
  console.log('🎉 Database seeding complete!');
}

if (require.main === module) {
  seedDatabase()
    .catch((e) => {
      console.error('❌ Seeding failed:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
