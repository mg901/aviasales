import {
  createEffect,
  createStore,
  forward,
  sample,
  merge,
  restore,
} from 'effector';

import { get } from '../../api';
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

export const $searchID = createStore('');
export const $loading = createStore(true).on(searchCompleted, () => false);
export const $searchResult = restore(loadTickets, {
  tickets: [],
  stop: false,
});

$searchID.on(
  getSearchId.done.map(({ result }) => result.searchId),
  (_, payload) => payload,
);

export const $searchCompleted = $searchResult.map(({ stop }) => stop);

// запрашиваем билеты после получения id поиска
forward({
  from: $searchID.updates,
  to: loadTickets,
});

// запрашиваем билеты до тех пор, пока stop не будет равен true
sample({
  source: loadTickets,
  clock: merge([searchIsNotCompleted, loadTickets.fail]),
  target: loadTickets,
});
