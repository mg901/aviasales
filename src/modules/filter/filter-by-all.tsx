import React from 'react';
import { useStore } from 'effector-react';
import { Checkbox } from '../../ui';
import { $filterByAll, filterByAllToggled } from './model';

export const FilterByAll = () => {
  const { type, checked, title } = useStore($filterByAll);

  return (
    <Checkbox
      value={type}
      title={title}
      checked={checked}
      onChange={() => filterByAllToggled()}
    />
  );
};
