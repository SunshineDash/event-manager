import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { EventApiService } from '../services/event-api.service';
import { EventModel } from '../models/event.model';
import { EventActions } from './event.actions';

@Injectable()
export class EventEffects {
  constructor(private actions$: Actions, private eventApiService: EventApiService) {}

  getEventsPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.getEventsPage),
      exhaustMap(action =>
        this.eventApiService.getPage(action.pageIndex, action.recordsPerPage, action.titleSearch, action.statusFilter, action.sort).pipe(
          map(page => EventActions.getEventsPageSuccess({ page })),
          catchError(error => {
            console.log(error);
            return of(EventActions.getEventsPageFailure(error));
          })
        )
      )
    )
  );

  getEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.getEvent),
      exhaustMap(action =>
        this.eventApiService.get(action.id).pipe(
          map(event => EventActions.getEventSuccess({ event })),
          catchError(error => {
            console.log(error);
            return of(EventActions.getEventFailure(error));
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
          map(() => EventActions.getEventsPage({
            pageIndex: action.pageIndex,
            recordsPerPage: action.recordsPerPage,
            titleSearch: action.titleSearch,
            statusFilter: action.statusFilter,
            sort: action.sort
          })),
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
          map(() => EventActions.getEventsPage({
            pageIndex: action.pageIndex,
            recordsPerPage: action.recordsPerPage,
            titleSearch: action.titleSearch,
            statusFilter: action.statusFilter,
            sort: action.sort
          })),
          catchError(error => {
            console.log(error);
            return of(EventActions.deleteEventFailure(error));
          })
        )
      )
    )
  );
}
