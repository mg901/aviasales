export type FilterFn = (x: number[]) => boolean;

export type Filter = Readonly<{
  type: number;
  title: string;
  checked: boolean;
}>;
