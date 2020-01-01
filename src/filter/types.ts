import { Ticket } from '../search/types';

export type FilterFn = (x: number[]) => boolean;

export type Filter = {
  value: number;
  title: string;
  checked: boolean;
};

export type NormalizedTicket = Ticket & { stops: number[] };
