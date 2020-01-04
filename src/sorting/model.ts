import { createEvent, combine, createStore } from 'effector';
import { $filteredTickets } from '../filter';
import { tabs } from './constants';

import { compareNumeric } from '../lib';
import { Tab } from './types';

export const sortedBy = createEvent<string>();
export const $tabs = createStore<Tab[]>(tabs);

$tabs.on(sortedBy, (state, payload) =>
  state.map((tab) =>
    payload === tab.type ? { ...tab, active: true } : { ...tab, active: false },
  ),
);

export const $activeSort = $tabs.map(
  (tabs) => (tabs.find(({ active }) => active) as Tab).type,
);

export const $sortedTickets = combine(
  $activeSort,
  $filteredTickets,
  (sort, tickets) => {
    switch (sort) {
      case 'price':
        return tickets
          .slice(0)
          .sort((a, b) => compareNumeric(a.price, b.price));
      case 'duration':
        return tickets
          .slice(0)
          .sort((a, b) => compareNumeric(a.duration, b.duration));
      default:
        return tickets;
    }
  },
);
