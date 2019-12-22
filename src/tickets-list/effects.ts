import { createEffect } from "effector";
import { get } from "../request";
import { SearchID, SearchResult } from "./types";

export const getSearchId = createEffect({
  handler: () => get<SearchID>("search")
});

export const loadTickets = createEffect({
  handler: (id: string) => get<SearchResult>(`tickets?searchId=${id}`)
});
