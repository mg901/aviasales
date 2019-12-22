import { createStore, forward, sample, merge } from 'effector';
import { getSearchId, loadTickets } from './effects';
import { $searchID } from '../app';
import { Ticket } from './types';

// export const $searchID = createStore<string>("");
export const $tickets = createStore<Ticket[]>([]);
export const $isTicketLoaded = createStore<boolean>(false);

// $searchID.on(getSearchId.done, (_, { result }) => result.searchId);

$tickets.on(loadTickets.done, (state, { result }) => [
  ...state,
  ...result.tickets,
]);

$isTicketLoaded.on(loadTickets, () => false).on(loadTickets.done, () => true);

forward({
  from: $searchID.updates,
  to: loadTickets,
});

// запрашиваем билеты до тех пор, пока stop не будет равен true
sample({
  source: loadTickets,
  clock: merge([
    loadTickets.done.filter({
      fn: ({ result }) => !result.stop,
    }),
    loadTickets.fail,
  ]),
  target: loadTickets,
});
