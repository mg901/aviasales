import React from 'react';
import { useList } from 'effector-react';
import { FilterByAll } from './filter-by-all';
import { Checkbox } from '../ui';
import { Sidebar } from './ui/sidebar';
import { $filtersByStops, filterByStopToggled } from './model';

export const Filter = () => (
  <Sidebar>
    <form>
      <FilterByAll />
      {useList($filtersByStops, ({ type, checked, title }) => (
        <Checkbox
          value={type}
          checked={checked}
          title={title}
          onChange={() => {
            filterByStopToggled(type);
          }}
        />
      ))}
    </form>
  </Sidebar>
);
