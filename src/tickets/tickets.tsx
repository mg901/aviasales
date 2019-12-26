import React from 'react';
import { useStore, useList } from 'effector-react';
import { $ticketsAreLoaded } from '../search';
import { $visibleTickets } from './model';
import { Loader, Ticket } from '../ui';

export const Tickets: React.FC = () => {
  const isTicketsLoaded = useStore($ticketsAreLoaded);
  const tickets = useList($visibleTickets, ({ price, carrier }) => (
    <li>
      <Ticket price={price.title} carrier={carrier} />
    </li>
  ));

  return isTicketsLoaded ? <ul>{tickets}</ul> : <Loader />;
};
