import { createEvent } from 'effector';

export const filterToggled = createEvent<number>();
export const allFiltersAreToggled = createEvent<void>();
export const allStopsSelected = createEvent<void>();
export const allStopsNotSelected = createEvent<void>();
