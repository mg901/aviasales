import React from 'react';
import { useList } from 'effector-react';
import { Tabs } from '../ui/tabs';
import { $tabs, sortedBy } from './model';
import { Button } from '../ui';

export const Sorting = () => (
  <Tabs>
    {useList($tabs, ({ active, type, title }) => (
      <Button
        key={type}
        className="tab"
        active={active}
        onClick={() => sortedBy(type)}>
        {title}
      </Button>
    ))}
  </Tabs>
);
