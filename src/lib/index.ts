export const establishCase = (list: string[]) => (
  x: number | string,
): string => {
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

export const uniq = <T>(x: T[]): T[] => Array.from(new Set(x));

export const compare = (x: number, y: number): number => (x > y ? 1 : -1);
