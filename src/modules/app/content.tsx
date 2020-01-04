import React from 'react';
import { TicketsList } from '../ticket-list';
import { Filter } from '../filter';
import { Sorting } from '../sorting';
import './index.css';

export const Content = () => (
  <section data-layout="grid">
    <aside data-layout="sidebar">
      <Filter />
    </aside>
    <main data-layout="main">
      <Sorting />
      <TicketsList />
    </main>
  </section>
);
