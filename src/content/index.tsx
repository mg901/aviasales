import React from 'react';
import { Tickets } from '../search';
import { Filters } from '../filtration';
import { Sorting } from '../sorting';
import './index.css';

export const Content = () => (
  <section data-layout="grid">
    <aside data-layout="sidebar">
      <Filters />
    </aside>
    <main data-layout="main">
      <Sorting />
      <Tickets />
    </main>
  </section>
);
