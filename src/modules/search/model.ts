import { createStore, forward, sample, merge, restore } from 'effector';
import { getSearchId, loadTickets, searchIsNotCompleted } from './effects';

export const $searchID = createStore('');
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
