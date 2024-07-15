import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { EventModel } from '../models/event.model';

export const EventActions = createActionGroup({
  source: 'Event',
  events: {
    'Get Events': emptyProps(),
    'Get Events Success': props<{ events: EventModel[] }>(),
    'Get Events Failure': props<{ error: string }>(),
    'Create Event': props<{ event: EventModel }>(),
    'Create Event Success': props<{ event: EventModel }>(),
    'Create Event Failure': props<{ error: string }>(),
    'Update Event': props<{ event: EventModel }>(),
    'Update Event Success': props<{ event: EventModel }>(),
    'Update Event Failure': props<{ error: string }>(),
    'Delete Event': props<{ id: string }>(),
    'Delete Event Success': props<{ event: EventModel }>(),
    'Delete Event Failure': props<{ error: string }>()
  }
});
