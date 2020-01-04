import { compareNumeric, uniq } from '../lib';
import { NomalizedTicket } from '../cache/types';

export const makeStopsList = (x: NomalizedTicket[]): number[] => {
  const stops = x.map(({ stops }) => stops).flat();

  return uniq(stops)
    .slice(0)
    .sort(compareNumeric);
};
