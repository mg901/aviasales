import { createEvent, createStore, combine, sample, split } from 'effector';
import { $tickets } from '../cache';
import { makeStopsList } from './lib';
import { makeTransferTitle } from '../../lib';
import { Filter, FilterFn } from './types';

export const filterByStopToggled = createEvent<number>();
export const filterByAllToggled = createEvent<void>();

const $stopsList = $tickets.map((x) => makeStopsList(x));

export const $filterByAll = createStore<Filter>({
  type: -1,
  checked: true,
  title: 'Все',
});

export const $filtersByStops = $stopsList.map((stopsList) =>
  stopsList.map<Filter>((stops) => ({
    type: stops,
    checked: true,
    title: makeTransferTitle(stops),
  })),
);

const filterByAllWasTaken = sample($filterByAll, filterByAllToggled);

const { filterByAllOn, filterByAllOff } = split(filterByAllWasTaken, {
  filterByAllOn: ({ checked }) => checked,
  filterByAllOff: ({ checked }) => !checked,
});

$filtersByStops
  .on(filterByAllOn, (state) =>
    state.map((item) => ({
      ...item,
      checked: true,
    })),
  )
  .on(filterByAllOff, (state) =>
    state.map((item) => ({
      ...item,
      checked: false,
    })),
  )
  .on(filterByStopToggled, (state, payload) =>
    state.map((filter) =>
      payload === filter.type
        ? {
            ...filter,
            checked: !filter.checked,
          }
        : filter,
    ),
  );

const $allStopsAreSelected = $filtersByStops.map((filtersByStops) =>
  filtersByStops.map(({ checked }) => checked).every(Boolean),
);

$filterByAll
  .on(filterByAllToggled, (state) => ({
    ...state,
    checked: !state.checked,
  }))
  .on($allStopsAreSelected, (state, checked) => ({
    ...state,
    checked,
  }));

const $appliedFilters = $filtersByStops.map((filters) =>
  filters
    .filter(({ checked }) => checked)
    .map<FilterFn>(({ type }) => (x) => x.includes(type)),
);

export const $filteredTickets = combine(
  $tickets,
  $appliedFilters,
  (cache, appliedFilters) =>
    cache.filter(({ stops }) =>
      appliedFilters
        .map((fn) => fn(stops))
        .flat()
        .some(Boolean),
    ),
);
