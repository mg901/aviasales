import React from 'react';
import { useList, useStore } from 'effector-react';
import { Sidebar, FilterItem } from '../ui';
import { allFiltersAreToggled, filterToggled } from './events';
import { $filterByAll, $filtersByStops } from './model';

const FilterByAll = () => {
  const { value, checked, title } = useStore($filterByAll);

  return (
    <FilterItem
      value={value}
      title={title}
      checked={checked}
      onChange={() => allFiltersAreToggled()}
    />
  );
};

export const Filter = () => (
  <Sidebar>
    <FilterByAll />
    {useList($filtersByStops, ({ value, checked, title }) => (
      <FilterItem
        value={value}
        title={title}
        checked={checked}
        onChange={() => filterToggled(value)}
      />
    ))}
  </Sidebar>
);
