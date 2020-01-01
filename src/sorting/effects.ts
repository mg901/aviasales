import { createEffect } from 'effector';
import { NomalizedTicket } from '../tickets-list/types';

export const sortByPrice = createEffect({
  handler: (x: NomalizedTicket[]) => {},
});

export const sortByDuration = createEffect({
  handler: (x: NomalizedTicket[]) => {},
});
