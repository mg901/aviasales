import { NomalizedTicket } from '../tickets/types';

export type Filter = {
  value: number;
  title: string;
  checked: boolean;
  fn: (x: NomalizedTicket) => boolean[];
};

export type FilterByAll = Omit<Filter, 'fn'>;
