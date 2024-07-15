import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EventState } from './event.reducer';

export const selectEventsState = createFeatureSelector<EventState>('events');

export const selectEvents = createSelector(
  selectEventsState,
  (state: EventState) => state.events
);

export const selectEventById = (id: string) => createSelector(
  selectEventsState,
  (state: EventState) =>  state.events.find(x => x.id === id)
);
