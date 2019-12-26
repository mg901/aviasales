import {
  createEffect,
  restore,
  createStore,
  combine,
  guard,
  sample,
  Event,
} from 'effector';

type CreaetCachingByInterval<T> = {
  start: Event<T>;
  stop: Event<T>;
  interval?: number;
};

export const createCachingByInterval = <T>({
  start,
  stop,
  interval = 1000,
}: CreaetCachingByInterval<T>) => {
  const timer = createEffect({
    handler: <T>(data: T): Promise<T> =>
      new Promise((resolve) => {
        setTimeout(() => resolve(data), interval);
      }),
  });

  const $cache = restore(start, null);
  const $working = createStore(true)
    .on(start, () => true)
    .on(stop, () => false);

  // если таймер уже запущен не даём запуститься ему параллельно новом вызове start
  const $isParallelRun = combine(
    $working,
    timer.pending,
    (working, pending) => working && !pending,
  );

  // запускаем таймер по событию start
  guard({
    source: start,
    filter: $isParallelRun,
    target: timer,
  });

  // зацикливаем выполнение таймера
  guard({
    source: timer.done,
    filter: $working,
    target: timer.prepend(({ result }) => result),
  });

  //  возвращаем вобытие передающие данные из start
  return sample({
    source: $cache,
    clock: timer.done,
  });
};
