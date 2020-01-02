import React from 'react';
import { useStore } from 'effector-react';
import { FilterItem } from '../ui';
import { filterByAllToggled } from './events';
import { $filterByAll } from './model';

export const FilterByAll = () => {
  const { stops, checked, title } = useStore($filterByAll);

  return (
    <FilterItem
      value={stops}
      title={title}
      checked={checked}
      onChange={() => filterByAllToggled()}
    />
  );
};
