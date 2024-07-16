import { createActionGroup, props } from '@ngrx/store';

import { EventModel } from '../models/event.model';
import { PaginationResponseInterface } from '../interfaces/pagination-response.interface';

export const EventActions = createActionGroup({
  source: 'Event',
  events: {
    'Get Events Page': props<{
      pageIndex: number,
      recordsPerPage: number,
      titleSearch?: string,
      statusFilter?: string,
      sort?: string
    }>(),
    'Get Events Page Success': props<{ page: PaginationResponseInterface<EventModel[]> }>(),
    'Get Events Page Failure': props<{ error: string }>(),
    'Get Event': props<{ id: number }>(),
    'Get Event Success': props<{ event: EventModel }>(),
    'Get Event Failure': props<{ error: string }>(),
    'Create Event': props<{
      event: EventModel,
      pageIndex: number,
      recordsPerPage: number,
      titleSearch?: string,
      statusFilter?: string,
      sort?: string
    }>(),
    'Create Event Failure': props<{ error: string }>(),
    'Update Event': props<{ event: EventModel }>(),
    'Update Event Success': props<{ event: EventModel }>(),
    'Update Event Failure': props<{ error: string }>(),
    'Delete Event': props<{
      id: string,
      pageIndex: number,
      recordsPerPage: number,
      titleSearch?: string,
      statusFilter?: string,
      sort?: string
    }>(),
    'Delete Event Failure': props<{ error: string }>()
  }
});
