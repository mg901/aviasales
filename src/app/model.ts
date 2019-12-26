import { createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { getSearchId } from './effects';
import { App } from './app';

// check mount / unmount
export const AppGate = createGate();

export const $searchID = createStore<string>('');

$searchID.on(getSearchId.done, (_, { result }) => result.searchId);

// запрашиваем id поиска при загрузке страницы
forward({
  from: AppGate.open,
  to: getSearchId,
});
