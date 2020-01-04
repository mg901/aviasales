import { createStore, combine, sample, split } from 'effector';
import { $cache } from '../cache';
import { normalize, makeStopsList, makeTransferTitle } from './lib';
import { filterByStopToggled, filterByAllToggled } from './events';
import { Filter, FilterFn } from './types';

const $stopsList = $cache.map((x) => makeStopsList(x));
const $normalizedTickets = $cache.map((x) => normalize(x));

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

const { filterByAllOn, filterByAllOff } = split(
  sample($filterByAll, filterByAllToggled),
  {
    filterByAllOn: ({ checked }) => checked,
    filterByAllOff: ({ checked }) => !checked,
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
