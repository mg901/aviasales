import { createStore, forward } from "effector";
import { createGate } from "effector-react";
import { getSearchId } from "./effects";

// check mount / unmount
export const AppGate = createGate();

export const $searchID = createStore<string>("");

$searchID.on(getSearchId.done, (_, { result }) => result.searchId);

forward({
  from: AppGate.open,
  to: getSearchId
});
