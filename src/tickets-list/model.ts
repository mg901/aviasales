import { createStore, sample, guard, combine } from 'effector';
import { NomalizedTicket } from './types';
import { $cache } from '../cache';
import { $searchCompleted } from '../search';
import { normalize } from './lib';

export const $normalizedTickets = createStore<NomalizedTicket[]>([]);
export const $visibleTickets = $normalizedTickets.map((tickets) =>
  tickets.slice(0, 5),
);

// по завершению поиска, нормализуем данные
sample({
  source: $cache,
  clock: guard($searchCompleted, { filter: (is) => is }),
  target: $normalizedTickets,
  fn: (tickets) => normalize(tickets),
});

export const $tickets = combine({
  normalizedTickets: $normalizedTickets,
  visibleTickets: $visibleTickets,
});
