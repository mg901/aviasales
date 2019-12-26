import { createEffect } from 'effector';
import { Ticket } from '../search/types';
import { uniq, compare } from '../lib';

export const makeStops = createEffect({
  handler: (x: Ticket[]) => {
    const result = x
      .map(({ segments }) => segments.map(({ stops }) => stops.length))
      .flat();

    return uniq(result).sort(compare);
  },
});
