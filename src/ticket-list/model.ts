import { $filteredTickets } from '../filter';

export const $visibleTickets = $filteredTickets.map((tickets) =>
  tickets.slice(0, 5),
);
