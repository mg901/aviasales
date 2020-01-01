import { Ticket } from '../search/types';
import { uniq, compare, establishCase } from '../lib';
import { NormalizedTicket } from './types';

export const makeStopsList = (x: Ticket[]): number[] => {
  const result = x
    .map(({ segments }) => segments.map(({ stops }) => stops.length))
    .flat();

  return uniq(result).sort(compare);
};

export const makeTransferTitle = (x: number): string => {
  const word = establishCase(x, ['пересадка', 'пересадки', 'пересадок']);

  return x === 0 ? `Без ${word}` : `${x} ${word}`;
};

export const normalize = (x: Ticket[]): NormalizedTicket[] =>
  x.map(({ segments, ...ticket }) => {
    const [there, back] = segments;

    return {
      ...ticket,
      segments,
      stops: [there.stops.length, back.stops.length],
    };
  });
