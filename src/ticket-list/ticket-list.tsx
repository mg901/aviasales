import React from 'react';
import { useList } from 'effector-react';
import { $visibleTickets } from './model';
import { Ticket, TicketItem } from './ui/ticket';

export const TicketsList: React.FC = () => (
  <ul>
    {useList(
      $visibleTickets,
      ({ priceTitle, carrier, segments: [there, back] }) => (
        <li>
          <Ticket price={priceTitle} carrier={carrier}>
            <TicketItem item={there} />
            <TicketItem item={back} />
          </Ticket>
        </li>
      ),
    )}
  </ul>
);
