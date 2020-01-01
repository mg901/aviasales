import { searchIsNotCompleted } from '../search';

export const founedTicketsReceived = searchIsNotCompleted.map(
  ({ result }) => result.tickets,
);
