'use server';

import { getArchetypes } from '../db/queries';
import type { Archetype } from '@/core/domain/archetype';

export async function getArchetypesAction(): Promise<
  | { ok: true; archetypes: Archetype[] }
  | { ok: false; error: string }
> {
  try {
    const archetypes = await getArchetypes();
    return { ok: true, archetypes };
  } catch {
    return { ok: false, error: 'Failed to load archetypes' };
  }
}
