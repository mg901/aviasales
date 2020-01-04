import React from 'react';
import { useList } from 'effector-react';
import { Tabs, Tab } from '../../ui';
import { $tabs } from './model';
import { sortedBy } from './events';

export const Sorting = () => (
  <Tabs>
    {useList($tabs, ({ active, type, title }) => (
      <Tab active={active} title={title} onClick={() => sortedBy(type)} />
    ))}
  </Tabs>
);
