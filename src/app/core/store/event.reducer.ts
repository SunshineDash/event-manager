import { createReducer, on } from '@ngrx/store';

import { EventActions } from './event.actions';
import { EventModel } from '../models/event.model';

export interface EventState {
  events: EventModel[];
}

export const defaultEventState: EventState = {
  events: []
};

export const eventReducer = createReducer(
  defaultEventState,
  on(EventActions.getEventsSuccess, (state, { events }) => ({...state, events})),
  on(EventActions.createEventSuccess, (state,{ event }) => ({ ...state, events: [...state.events, event]})),
  on(EventActions.updateEventSuccess, (state,{ event }) => ({ ...state, events: state.events.map(item => item.id !== event.id ? item : event )})),
  on(EventActions.deleteEventSuccess, (state,{ event }) => ({...state, events: state.events.filter(item => item.id !== event.id)})),
);
