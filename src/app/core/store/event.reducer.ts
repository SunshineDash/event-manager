import { createReducer, on } from '@ngrx/store';

import { EventActions } from './event.actions';
import { EventModel } from '../models/event.model';

export interface EventState {
  events: EventModel[];
  event: EventModel,
  pagesCount: number;
  firstPageIndex: number;
  prevPageIndex: number;
  nextPageIndex: number;
  lastPageIndex: number;
}

export const defaultEventState: EventState = {
  events: [],
  event: new EventModel(),
  pagesCount: 0,
  firstPageIndex: 0,
  prevPageIndex: 0,
  nextPageIndex: 0,
  lastPageIndex: 0
};

export const eventReducer = createReducer(
  defaultEventState,
  on(EventActions.getEventsPageSuccess, (state, { page }) =>  ({
    ...state,
    events: page.data,
    pagesCount: page.pages,
    firstPageIndex: page.first,
    prevPageIndex: page.prev,
    nextPageIndex: page.next,
    lastPageIndex: page.last,
  })),
  on(EventActions.getEventSuccess, (state, { event }) => ({ ...state, event })),
  on(EventActions.updateEventSuccess, (state, { event }) => ({ ...state, event })),
);
