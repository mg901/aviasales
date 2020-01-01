import React from 'react';
import { useList } from 'effector-react';
import { FilterItem, Sidebar } from '../ui';
import { filterToggled } from './events';
import { $filters } from './model';

export const Filter = () => (
  <Sidebar>
    <form>
      {useList($filters, ({ value, checked, title }) => (
        <FilterItem
          checked={checked}
          value={value}
          title={title}
          onChange={() => filterToggled(value)}
        />
      ))}
    </form>
  </Sidebar>
);
