import { createEffect } from 'effector';
import { get } from '../api';
import { SearchID, SearchResult } from './types';

export const getSearchId = createEffect({
  handler: () => get<SearchID>('search'),
});

export const loadTickets = createEffect({
  handler: (id: string) => get<SearchResult>(`tickets?searchId=${id}`),
});

export const searchCompleted = loadTickets.done.filter({
  fn: ({ result: { stop } }) => stop === true,
});

export const searchIsNotCompleted = loadTickets.done.filter({
  fn: ({ result: { stop } }) => stop !== true,
});
