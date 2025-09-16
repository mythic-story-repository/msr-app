'use server';

import { getStories, getRecentStories } from '@core/usecases/getStories';
import { getStories as getStoriesQuery, getRecentStories as getRecentStoriesQuery } from '../db/queries';
import type { GetStoriesFilter } from '@core/usecases/getStories';

export async function getStoriesAction(filter: GetStoriesFilter = {}) {
  return getStories(filter, getStoriesQuery);
}

export async function getRecentStoriesAction(limit: number = 6) {
  return getRecentStories(limit, getRecentStoriesQuery);
}
