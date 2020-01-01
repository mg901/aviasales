import { createEvent } from 'effector';

export const filterToggled = createEvent<number>();
export const filterByAllToggled = filterToggled.filter({
  fn: (x) => x === -1,
});
