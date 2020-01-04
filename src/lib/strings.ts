export const establishCase = (x: number | string, list: string[]): string => {
  const value = Number(x);
  const index = value > 19 ? value % 10 : value % 100;

  switch (index) {
    case 1:
      return list[0];
    case 2:
    case 3:
    case 4:
      return list[1];
    default:
      return list[2];
  }
};

export const makeTransferTitle = (x: number): string => {
  const word = establishCase(x, ['пересадка', 'пересадки', 'пересадок']);

  return x === 0 ? `Без ${word}` : `${x} ${word}`;
};
