import { createEffect } from 'effector';
import { get } from '../api';
import { SearchID } from './types';

export const getSearchId = createEffect({
  handler: () => get<SearchID>('search'),
});
