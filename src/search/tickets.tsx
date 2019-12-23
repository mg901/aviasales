import React from 'react';
import { useStore, useList } from 'effector-react';
import { $isTicketLoaded, $tickets } from './model';
import { Loader, Ticket } from '../ui';

export const Tickets: React.FC = () => {
  const isTicketsLoaded = useStore($isTicketLoaded);
  const tickets = useList($tickets, ({ price, carrier }) => (
    <li>
      <Ticket price={price} carrier={carrier} />
    </li>
  ));

  return isTicketsLoaded ? <ul>{tickets}</ul> : <Loader />;
};
