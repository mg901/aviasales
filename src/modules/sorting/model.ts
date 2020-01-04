import { $filteredTickets } from '../filter-list';
import { combine, createStore } from 'effector';
import { tabs } from './constants';
import { sortedBy } from './events';
import { compare } from '../../lib';
import { Tab } from './types';

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
        return tickets.slice(0).sort((a, b) => compare(a.price, b.price));
      case 'duration':
        return tickets.slice(0).sort((a, b) => compare(a.duration, b.duration));
      default:
        return tickets;
    }
  },
);
