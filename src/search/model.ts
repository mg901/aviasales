import {
  createEvent,
  createEffect,
  createStore,
  forward,
  sample,
  merge,
} from 'effector';
import { loadTickets, searchCompleted, searchIsNotCompleted } from './effects';
import { $searchID } from '../app';
import { SearchResult } from './types';

export const $searchResult = createStore<SearchResult>({
  tickets: [],
  stop: false,
});

export const $loadedTickets = $searchResult.map(({ tickets }) => tickets);
export const $ticketsAreLoaded = $searchResult.map(({ stop }) => stop);

$searchResult.on(searchCompleted, (state, { result }) => ({
  ...state,
  ...result,
}));

// запрашиваем билеты после получения id поиска
forward({
  from: $searchID.updates,
  to: loadTickets,
});

// запрашиваем билеты до тех пор, пока stop не будет равен true
sample({
  source: $searchID,
  clock: merge([searchIsNotCompleted, loadTickets.fail]),
  target: loadTickets,
});
