import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EventState } from './event.reducer';

export const selectEventsState = createFeatureSelector<EventState>('events');

export const selectState = createSelector(
  selectEventsState,
  (state: EventState) => state
);

export const selectDetailsEvent = () => createSelector(
  selectEventsState,
  (state: EventState) =>  state.event
);
