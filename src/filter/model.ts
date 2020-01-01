import { combine, merge } from 'effector';
import { $cache } from '../cache';
import { normalize, makeStopsList, makeTransferTitle } from './lib';
import { filterToggled, filterByAllToggled } from './events';
import { FilterFn } from './types';

const $stopsList = $cache.map((x) => makeStopsList(x));
const $normalizedTickets = $cache.map((x) => normalize(x));

const filterByAll = {
  value: -1,
  checked: true,
  title: 'Все',
};

export const $filters = $stopsList.map((list) =>
  list.reduce(
    (acc, item) =>
      acc.concat({
        value: item,
        checked: true,
        title: makeTransferTitle(item),
      }),
    [filterByAll],
  ),
);

const $filtersByStops = $filters.map((x) =>
  x.filter(({ value }) => value > -1),
);
const $allStopsAreChecked = $filtersByStops.map((x) =>
  x.map(({ checked }) => checked).every(Boolean),
);

$filters
  .on(merge([filterToggled, filterByAllToggled]), (state, payload) =>
    state.map((filter) =>
      payload === filter.value
        ? {
            ...filter,
            checked: !filter.checked,
          }
        : filter,
    ),
  )
  .on(filterByAllToggled, (state) =>
    state.map((filter) =>
      filter.value !== -1 ? { ...filter, checked: !filter.checked } : filter,
    ),
  )
  .on($allStopsAreChecked.updates, (state) =>
    state.map((filter) =>
      filter.value === -1 ? { ...filter, checked: !filter.checked } : filter,
    ),
  );

const $appliedFilters = $filters.map((filters) =>
  filters
    .filter(({ checked }) => checked)
    .map<FilterFn>(({ value }) => (x) => x.includes(value)),
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
