import React from 'react';
import { useList } from 'effector-react';
import { $visibleTickets } from './model';
import { Ticket } from '../../ui';

export const TicketsList: React.FC = () => (
  <ul>
    {useList($visibleTickets, ({ priceTitle, carrier }) => (
      <li>
        <Ticket price={priceTitle} carrier={carrier} />
      </li>
    ))}
  </ul>
);
