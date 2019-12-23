import React from 'react';
import { Sidebar, Filter } from '../ui';

export const Filters = () => (
  <Sidebar>
    <Filter onClick={() => {}}>Все</Filter>
    <Filter onClick={() => {}}>Без пересадок</Filter>
    <Filter onClick={() => {}}>1 пересадка</Filter>
    <Filter onClick={() => {}}>2 пересадки</Filter>
    <Filter onClick={() => {}}>3 пересадки</Filter>
  </Sidebar>
);
