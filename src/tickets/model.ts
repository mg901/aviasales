import { createStore, sample, guard, combine } from 'effector';
import { NomalizedTicket } from './types';
import { $loadedTickets, $ticketsAreLoaded } from '../search';
import { normalizeTickets } from './utils';

export const $normalizedTickets = createStore<NomalizedTicket[]>([]);
export const $visibleTickets = $normalizedTickets.map((tickets) =>
  tickets.slice(0, 5),
);

// по завершению поиска, нормализуем данные
sample({
  source: $loadedTickets,
  clock: guard($ticketsAreLoaded, { filter: (is) => is }),
  target: $normalizedTickets,
  fn: (tickets) => normalizeTickets(tickets),
});

export const $tickets = combine({
  normalizedTickets: $normalizedTickets,
  visibleTickets: $visibleTickets,
});

$normalizedTickets.watch(console.log);

// const createCacheByInterval = (
//   {start, stop = createEvent(), timeout = 1000}
// ) => {
//   const wait = ms =>
//     new Promise(resolve => {
//       setTimeout(resolve, ms)
//     })

//   const tick = createEvent()
//   const timer = createEffect().use(() => wait(timeout))
//   const $isWorking = createStore(true)

//    $isWorking.on(start, () => true).on(stop, () => false)

//   guard({
//     source: start,
//     filter: timer.pending.map(is => !is),
//     target: tick,
//   })
//   forward({
//     from: tick,
//     to: timer,
//   })
//   const willTick = guard({
//     source: timer.done.map(({params}) => params - 1),
//     filter: seconds => seconds >= 0,
//   })
//   guard({
//     source: willTick,
//     filter: $isWorking,
//     target: tick,
//   })
//   return {tick}
// }

// const cache = createCacheByInterval({
//   start: startEvent,
//   stop: stopEvent,
// })
