import { createEffect } from 'effector';
import { get } from '../request';
import { SearchID } from './types';

export const getSearchId = createEffect({
  handler: () => get<SearchID>('search'),
});
