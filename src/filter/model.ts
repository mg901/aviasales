import { createEvent, createStore, combine, split } from 'effector';
import { $tickets } from '../cache';
import { makeStopsList } from './lib';
import { makeTransferTitle } from '../lib';
import { Filter, FilterFn } from './types';

export const filterByStopToggled = createEvent<number>();
export const filterByAllToggled = createEvent<boolean>();

export const handleFilterByAllToggled = filterByAllToggled.prepend(
  (e: React.ChangeEvent<HTMLInputElement>) => e.target.checked,
);

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

const { filterByAllOn, filterByAllOff } = split(filterByAllToggled, {
  filterByAllOn: (x) => x === true,
  filterByAllOff: (x) => x === false,
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
  .on(filterByAllToggled, (state, payload) => ({
    ...state,
    checked: payload,
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
