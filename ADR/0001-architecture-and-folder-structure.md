# ADR-0001: Architecture and Folder Structure

## Status
Accepted

## Date
2025-09-16

## Context

The Mythic Story Repository (MSR) project needed a clear architectural structure that follows Next.js 15 App Router best practices while implementing Feature-Oriented Clean Architecture principles. The original structure had all code under a `src/` directory, which is not the recommended approach for Next.js 15 App Router applications.

## Decision

We have adopted a Feature-Oriented Clean Architecture with the following folder structure:

```
/Users/howardrhee/Documents/msr/msr-app/web
.
├── app/                          # Next.js App Router at root
│   ├── (public)/
│   ├── (auth)/
│   ├── (app)/
│   │   ├── stories/
│   │   ├── search/
│   │   └── admin/
│   ├── api/                      # API routes
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── features/                     # Vertical slices
│   ├── stories/
│   │   ├── components/
│   │   ├── server/
│   │   ├── schema.ts
│   │   └── db/
│   ├── archetypes/
│   ├── search/
│   └── moderation/
│
├── core/                         # Framework-agnostic logic
│   ├── domain/
│   ├── usecases/
│   ├── db/
│   │   ├── prisma.schema
│   │   ├── migrations/
│   │   └── client.ts
│   ├── search/
│   ├── events/
│   └── config.ts
│
├── components/                   # Shared UI primitives
├── lib/                          # Cross-cutting utilities
├── public/
├── scripts/                      # Seed, backfill, tasks
├── tests/                        # Integration + e2e
├── ADR/
│   └── 0001-architecture-and-folder-structure.md
│
├── docs/
│   └── cline-prompts.md
│
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── tsconfig.tsbuildinfo
```

## Key Architectural Principles

### 1. Next.js 15 App Router Best Practices
- `app/` directory at the root level (not inside `src/`)
- Route groups for logical organization: `(public)`, `(auth)`, `(app)`
- Server Actions and Components where appropriate
- API routes only when necessary

### 2. Feature-Oriented Architecture
- Each feature is a vertical slice containing all related code
- Features are self-contained with their own components, server logic, schemas, and database queries
- Features can depend on `core/` but not on other features directly

### 3. Clean Architecture Layers
- **Domain**: Core business entities and types
- **Use Cases**: Business logic and application services
- **Infrastructure**: Database, external services, framework-specific code
- **Presentation**: UI components and pages

### 4. TypeScript Path Aliases
```json
{
  "baseUrl": ".",
  "paths": {
    "@app/*": ["app/*"],
    "@core/*": ["core/*"],
    "@features/*": ["features/*"],
    "@components/*": ["components/*"],
    "@lib/*": ["lib/*"],
    "@tests/*": ["tests/*"]
  }
}
```

## Implementation Details

### Database Schema Location
- Prisma schema remains at `core/db/prisma.schema`
- This centralizes database concerns while keeping them in the core layer
- Database migrations and client configuration are co-located

### Package.json Scripts Updated
```json
{
  "seed": "tsx core/db/seed.ts",
  "postinstall": "prisma generate --schema=core/db/prisma.schema",
  "vercel-build": "prisma generate --schema=core/db/prisma.schema && prisma migrate deploy --schema=core/db/prisma.schema && next build"
}
```

### Import Strategy
- All imports updated to use new path aliases
- Relative imports maintained within feature boundaries
- Cross-feature dependencies go through `@core/*` abstractions

## Benefits

1. **Scalability**: Features can be developed independently
2. **Maintainability**: Clear separation of concerns
3. **Next.js Compliance**: Follows official Next.js 15 recommendations
4. **Developer Experience**: Clear mental model and predictable file locations
5. **Testing**: Each layer can be tested in isolation
6. **Deployment**: Optimized for Vercel deployment

## Consequences

### Positive
- Clear architectural boundaries
- Easier onboarding for new developers
- Better code organization and discoverability
- Improved build performance with Next.js 15
- Simplified import paths with aliases

### Negative
- Initial migration effort required
- Some learning curve for developers familiar with traditional src/ structure
- Need to maintain discipline around architectural boundaries

## Migration Notes

The migration was performed using `git mv` commands to preserve file history:
- `git mv src/app ./app`
- `git mv src/features ./features`
- `git mv src/core ./core`
- `git mv src/components ./components`
- `git mv src/lib ./lib`
- `git mv src/tests ./tests`

All import statements were systematically updated to use the new path aliases, ensuring no broken references.

## Future Considerations

1. Consider adding feature-level testing directories as features grow
2. Evaluate need for shared types directory if cross-feature types emerge
3. Monitor bundle size and consider code splitting strategies
4. Assess need for additional architectural layers as complexity grows

## References

- [Next.js 15 App Router Documentation](https://nextjs.org/docs/app)
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Feature-Sliced Design](https://feature-sliced.design/)
