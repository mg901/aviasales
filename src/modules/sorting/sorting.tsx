import React from 'react';
import { Tabs, Tab } from '../../ui';
import { sortedByPrice, sortedByDuration } from './events';

export const Sorting = () => (
  <Tabs>
    <Tab onClick={() => sortedByPrice()}>Самый дешёвый</Tab>
    <Tab onClick={() => sortedByDuration()}>Самый Быстрый</Tab>
  </Tabs>
);
