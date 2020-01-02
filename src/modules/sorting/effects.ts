import { createEffect } from 'effector';
import { NomalizedTicket } from '../filter/types';

export const sortByPrice = createEffect({
  handler: (x: NomalizedTicket[]) => {},
});

export const sortByDuration = createEffect({
  handler: (x: NomalizedTicket[]) => {},
});
