import { $sortedTickets } from '../sorting';

export const $visibleTickets = $sortedTickets.map((tickets) =>
  tickets.slice(0, 5),
);
