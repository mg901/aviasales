import { createEffect } from 'effector';
import { Filter } from './types';

export const saveFilter = createEffect({
  handler: (x: Filter[]) => {
    localStorage.setItem('filter-state', JSON.stringify(x));
  },
});

export const loadFilter = createEffect({
  handler: () => JSON.parse(String(localStorage.getItem('filter-state'))),
});
