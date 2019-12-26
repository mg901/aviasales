import React from 'react';
import { Tickets } from '../tickets';
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
      <Tickets />
    </main>
  </section>
);
