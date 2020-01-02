import React from 'react';
import { useStore, useList } from 'effector-react';
import { $visibleTickets } from './model';
import { Ticket } from '../../ui';
import { $isEmptyCache } from '../cache';

export const TicketsList: React.FC = () => {
  const isEmptyCache = useStore($isEmptyCache);

  const tickets = useList($visibleTickets, ({ price, carrier }) => (
    <li>
      <Ticket price={price.title} carrier={carrier} />
    </li>
  ));

  return isEmptyCache ? <ul>{tickets}</ul> : null;
};
