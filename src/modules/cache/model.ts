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

import { founedTicketsReceived } from './events';
import { Ticket } from '../search/types';

const INTERVAL = 1000;

export const $cache = createStore<Ticket[]>([]);
export const $isEmptyCache = $searchResult.map(
  ({ tickets }) => tickets.length > 0,
);

const timer = createEffect({
  handler: <T>(data: T): Promise<T> =>
    new Promise((resolve) => {
      setTimeout(() => resolve(data), INTERVAL);
    }),
});

const $tickets = restore<Ticket[]>(founedTicketsReceived, []);

// флаг для старта / остановки кэширования
const $working = createStore(true)
  .on(searchIsNotCompleted, () => true)
  .on(searchCompleted, () => false);

// блокируем запуск аналогичного таймера
const $isParallelRun = combine(
  $working,
  timer.pending,
  (working, pending) => working && !pending,
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
  source: $tickets,
  clock: merge([$isEmptyCache.updates, timer.done]),
  target: $cache,
});
