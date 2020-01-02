import { forward } from 'effector';
import { createGate } from 'effector-react';
import { getSearchId } from '../search';

// check mount / unmount
export const AppGate = createGate();

// запрашиваем id поиска при загрузке страницы
forward({
  from: AppGate.open,
  to: getSearchId,
});
