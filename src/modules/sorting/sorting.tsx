import React from 'react';
import { useList } from 'effector-react';
import { Tabs, Tab } from './ui/tabs';
import { $tabs, sortedBy } from './model';

export const Sorting = () => (
  <Tabs>
    {useList($tabs, ({ active, type, title }) => (
      <Tab active={active} title={title} onClick={() => sortedBy(type)} />
    ))}
  </Tabs>
);
