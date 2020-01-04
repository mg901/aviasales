import {
  createEffect,
  createStore,
  combine,
  guard,
  sample,
  merge,
  restore,
} from 'effector';

import {
  searchCompleted,
  searchIsNotCompleted,
  $searchResult,
} from '../search';

import { Ticket } from '../search/types';
import { normalizeTicket } from './normalize';

export const founedTicketsReceived = searchIsNotCompleted.map(
  ({ result }) => result.tickets,
);

export const $cache = createStore<Ticket[]>([]);
export const $tickets = $cache.map((x) => x.map(normalizeTicket));
export const $isEmptyCache = $searchResult.map(
  ({ tickets }) => tickets.length > 0,
);

const timer = createEffect({
  handler: <T>(data: T): Promise<T> => {
    const interval = 1500;

    return new Promise((resolve) => {
      setTimeout(() => resolve(data), interval);
    });
  },
});

const $rawTickets = restore<Ticket[]>(founedTicketsReceived, []);

// флаг для старта / остановки кэширования
const $working = createStore(true)
  .on(searchIsNotCompleted, () => true)
  .on(searchCompleted, () => false);

// блокируем запуск аналогичного таймера
const $isParallelRun = combine(
  $working,
  timer.pending,
  (loading, pending) => loading && !pending,
);

// запускаем таймер по событию start
guard({
  source: searchIsNotCompleted,
  filter: $isParallelRun,
  target: timer,
});

// зацикливаем выполнение таймера
guard({
  source: timer.done,
  filter: $working,
  target: timer.prepend(({ result }) => result),
});

// кэшируем данные при первом удачном ответе сервера и далее по интервалу
sample({
  source: $rawTickets,
  clock: merge([$isEmptyCache.updates, timer.done]),
  target: $cache,
});
