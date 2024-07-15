import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { EventApiService } from '../services/event-api.service';
import { EventModel } from '../models/event.model';
import { EventActions } from './event.actions';

@Injectable()
export class EventEffects {
  constructor(private actions$: Actions, private eventApiService: EventApiService) {}

  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.getEvents),
      exhaustMap(() =>
        this.eventApiService.getAll().pipe(
          map(events => EventActions.getEventsSuccess({events})),
          catchError(error => {
            console.log(error);
            return of(EventActions.getEventsFailure(error));
          })
        )
      )
    )
  );

  createEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.createEvent),
      exhaustMap(action =>
        this.eventApiService.create(action.event).pipe(
          map((event: EventModel) => EventActions.createEventSuccess({event})),
          catchError(error => {
            console.log(error);
            return of(EventActions.createEventFailure(error));
          })
        )
      )
    )
  );

  updateEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.updateEvent),
      exhaustMap(action =>
        this.eventApiService.update(action.event).pipe(
          map((event: EventModel) => EventActions.updateEventSuccess({event})),
          catchError(error => {
            console.log(error);
            return of(EventActions.updateEventFailure(error));
          })
        )
      )
    )
  );

  deleteEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.deleteEvent),
      exhaustMap(action =>
        this.eventApiService.delete(action.id).pipe(
          map((event: EventModel) => EventActions.deleteEventSuccess({event})),
          catchError(error => {
            console.log(error);
            return of(EventActions.deleteEventFailure(error));
          })
        )
      )
    )
  );
}
