import { createStore, restore, sample, guard, split, combine } from 'effector';
import { $loadedTickets, $ticketsAreLoaded } from '../search';
import { makeTransferTitle } from './utils';
import {
  allFiltersAreToggled,
  filterToggled,
  allStopsSelected,
  allStopsNotSelected,
} from './events';
import { makeStops } from './effects';
import { Filter, FilterByAll } from './types';

sample({
  source: $loadedTickets,
  clock: guard($ticketsAreLoaded, { filter: (is) => is }),
  target: makeStops,
});

const $stopsList = restore(makeStops, []);

// Фильтр
export const $filterByAll = createStore<FilterByAll>({
  value: -1,
  title: 'Все',
  checked: true,
});

// создаём стор фильтров по остановкам
export const $filtersByStops = $stopsList.map((stopsList) =>
  stopsList.map<Filter>((stop) => ({
    value: stop,
    checked: true,
    title: makeTransferTitle(stop),
    fn: ({ stops }) => stops.map((s) => s === stop),
  })),
);

const { togglerAllOn, togglerAllOff } = split(
  sample($filterByAll, allFiltersAreToggled),
  {
    // создание ивента применяющий фильтр "Все" если все фильтры пересадок выбраны
    togglerAllOn: (stop) => stop.checked,
    // создание ивента сброса фильтра "Все" при выборе одного из фильров
    togglerAllOff: (stop) => !stop.checked,
  },
);

$filtersByStops
  // переключам конкретный фильтр
  .on(filterToggled, (state, payload) =>
    state.map((filter) =>
      payload === filter.value
        ? {
            ...filter,
            checked: !filter.checked,
          }
        : filter,
    ),
  )

  .on(togglerAllOn, (state) =>
    state.map((filter) => ({
      ...filter,
      checked: true,
    })),
  )
  .on(togglerAllOff, (state) =>
    state.map((filter) => ({
      ...filter,
      checked: false,
    })),
  )
  // Выделяем все фильры при нажатии на поле "Все"
  .on(allStopsSelected, (state) =>
    state.map((filter) => ({
      ...filter,
      checked: true,
    })),
  )
  // Сбрасываем все фильры при нажатии на поле "Все"
  .on(allStopsNotSelected, (state) =>
    state.map((filter) => ({
      ...filter,
      checked: false,
    })),
  );

// все остановки выбраны или нет
const $allStopsAreSelected = $filtersByStops.map((filtersByStops) =>
  filtersByStops.map(({ checked }) => checked).every(Boolean),
);

$filterByAll
  .on(allFiltersAreToggled, (state) => ({
    ...state,
    checked: !state.checked,
  }))
  .on($allStopsAreSelected, (state, checked) => ({
    ...state,
    checked,
  }));

// Создаём общий стор фильтра
export const $filters = combine({
  stopsList: $stopsList,
  togglerForAllStops: $filterByAll,
  filtersByStops: $filtersByStops,
  allStopsAreSelected: $allStopsAreSelected,
});
