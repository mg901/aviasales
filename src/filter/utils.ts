import { establishCase } from '../lib';

export const makeTransferTitle = (x: number): string => {
  const word = establishCase(['пересадка', 'пересадки', 'пересадок']);

  return x === 0 ? `Без ${word(x)}` : `${x} ${word(x)}`;
};
