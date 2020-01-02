import React from 'react';
import { useList } from 'effector-react';
import { FilterByAll } from './filter-by-all';
import { FilterItem, Sidebar } from '../ui';
import { filterByStopToggled } from './events';
import { $filtersByStops } from './model';

export const Filter = () => (
  <Sidebar>
    <form>
      <FilterByAll />
      {useList($filtersByStops, ({ stops, checked, title }) => (
        <FilterItem
          value={stops}
          checked={checked}
          title={title}
          onChange={() => filterByStopToggled(stops)}
        />
      ))}
    </form>
  </Sidebar>
);
