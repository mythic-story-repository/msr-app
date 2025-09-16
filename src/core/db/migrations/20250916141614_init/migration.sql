-- CreateTable
CREATE TABLE "public"."stories" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "experienceSource" TEXT NOT NULL DEFAULT 'other',
    "archetypes" TEXT NOT NULL,
    "motifs" TEXT NOT NULL,
    "feelings" TEXT NOT NULL,
    "context" TEXT,
    "license" TEXT NOT NULL,
    "aiUseOptOut" BOOLEAN NOT NULL DEFAULT false,
    "visibility" TEXT NOT NULL DEFAULT 'public',
    "anonLevel" TEXT NOT NULL DEFAULT 'anonymous',
    "pseudonym" TEXT,

    CONSTRAINT "stories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."archetypes" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "archetypes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "archetypes_slug_key" ON "public"."archetypes"("slug");
