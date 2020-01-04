import React from 'react';
import { TicketsList } from '../ticket-list';
import { FilterList } from '../filter-list';
import { Sorting } from '../sorting';
import './index.css';

export const Content = () => (
  <section data-layout="grid">
    <aside data-layout="sidebar">
      <FilterList />
    </aside>
    <main data-layout="main">
      <Sorting />
      <TicketsList />
    </main>
  </section>
);
