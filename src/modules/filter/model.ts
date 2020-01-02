import { createStore, combine, sample, split } from 'effector';
import { $cache } from '../cache';
import { normalize, makeStopsList, makeTransferTitle } from './lib';
import { filterByStopToggled, filterByAllToggled } from './events';
import { FilterFn } from './types';

const $stopsList = $cache.map((x) => makeStopsList(x));
const $normalizedTickets = $cache.map((x) => normalize(x));

export const $filterByAll = createStore({
  stops: -1,
  checked: true,
  title: 'Все',
});

export const $filtersByStops = $stopsList.map((stopsList) =>
  stopsList.map((stops) => ({
    stops,
    checked: true,
    title: makeTransferTitle(stops),
  })),
);

const { filterByAllOn, filterByAllOff } = split(
  sample($filterByAll, filterByAllToggled),
  {
    filterByAllOn: ({ checked }) => checked === true,
    filterByAllOff: ({ checked }) => checked === false,
  },
);

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
      payload === filter.stops
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
    .map<FilterFn>(({ stops }) => (x) => x.includes(stops)),
);

export const $filteredTickets = combine(
  $normalizedTickets,
  $appliedFilters,
  (cache, appliedFilters) =>
    cache.filter(({ stops }) =>
      appliedFilters
        .map((fn) => fn(stops))
        .flat()
        .some(Boolean),
    ),
);
