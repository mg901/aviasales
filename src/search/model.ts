import { createStore, forward, sample, merge } from 'effector';
import { loadTickets } from './effects';
import { $searchID } from '../app';
import { Ticket } from './types';

export const $tickets = createStore<Ticket[]>([]);
export const $isTicketLoaded = createStore<boolean>(false);

$tickets.on(loadTickets.done, (state, { result }) => [
  ...state,
  ...result.tickets,
]);

// показыаем лоадер до окончания поиска
$isTicketLoaded.on(
  loadTickets.done.filter({
    fn: ({ result: { stop } }) => stop === true,
  }),
  () => true,
);

forward({
  from: $searchID.updates,
  to: loadTickets,
});

// запрашиваем билеты до тех пор, пока stop не будет равен true
sample({
  source: loadTickets,
  clock: merge([
    loadTickets.done.filter({
      fn: ({ result: { stop } }) => stop !== true,
    }),
    loadTickets.fail,
  ]),
  target: loadTickets,
});
