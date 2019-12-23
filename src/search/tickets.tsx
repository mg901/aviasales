import React from 'react';
import { useStore } from 'effector-react';
import { $isTicketLoaded } from './model';
import { Loader } from '../ui';

export const Tickets: React.FC = () => {
  const isTicketsLoaded = useStore($isTicketLoaded);

  return isTicketsLoaded ? <ul>list</ul> : <Loader />;
};
