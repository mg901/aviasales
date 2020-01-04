import React from 'react';
import { useList } from 'effector-react';
import { FilterByAll } from './filter-by-all';
import { FilterItem, Sidebar } from '../../ui';
import { filterByStopToggled } from './events';
import { $filtersByStops } from './model';

export const FilterList = () => (
  <Sidebar>
    <form>
      <FilterByAll />
      {useList($filtersByStops, ({ type, checked, title }) => (
        <FilterItem
          value={type}
          checked={checked}
          title={title}
          onChange={() => filterByStopToggled(type)}
        />
      ))}
    </form>
  </Sidebar>
);
