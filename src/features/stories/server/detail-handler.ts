'use server';

import { getStoryById } from '@/core/usecases/getStoryById';
import { getStoryById as getStoryByIdQuery } from '../db/queries';

export async function getStoryByIdAction(id: string) {
  return getStoryById(id, getStoryByIdQuery);
}
