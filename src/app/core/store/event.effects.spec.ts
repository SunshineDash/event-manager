import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';

import { EventActions } from './event.actions';
import { EventApiService } from '../services/event-api.service';
import { EventEffects } from './event.effects';
import { EventModel } from '../models/event.model';

describe('EventEffects', () => {
  let actions$: Observable<Action>;
  let effects: EventEffects;
  let eventApiService: jasmine.SpyObj<EventApiService>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj(
      'EventApiService',
      [
        'getPage',
        'get',
        'create',
        'update',
        'delete'
      ]
    );

    TestBed.configureTestingModule({
      providers: [
        EventEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: EventApiService, useValue: apiServiceSpy }
      ]
    });

    effects = TestBed.inject(EventEffects);
    eventApiService = TestBed.inject(EventApiService) as jasmine.SpyObj<EventApiService>;
  });

  describe('getEventsPage$', () => {
    it('should return getEventsPageSuccess on success', (done) => {
      const pageResponse = {
        data: [],
        pages: 1,
        first: 1,
        prev: 0,
        next: 2,
        last: 3,
        items: 5
      };
      const action = EventActions.getEventsPage({
        pageIndex: 1,
        recordsPerPage: 10,
        titleSearch: '',
        statusFilter: '',
        sort: ''
      });
      const outcome = EventActions.getEventsPageSuccess({ page: pageResponse });

      actions$ = of(action);
      eventApiService.getPage.and.returnValue(of(pageResponse));

      effects.getEventsPage$.subscribe(result => {
        expect(result).toEqual(outcome);
        done();
      });
    });

    it('should return getEventsPageFailure on error', (done) => {
      const action = EventActions.getEventsPage({
        pageIndex: 1,
        recordsPerPage: 10,
        titleSearch: '',
        statusFilter: '',
        sort: ''
      });
      const error = 'error';
      const outcome = EventActions.getEventsPageFailure({ error });

      actions$ = of(action);
      eventApiService.getPage.and.returnValue(throwError(() => {
        return { error };
      }));

      effects.getEventsPage$.subscribe(result => {
        expect(result).toEqual(outcome);
        done();
      });
    });
  });

  describe('getEvent$', () => {
    it('should return getEventSuccess on success', (done) => {
      const event = new EventModel();
      const action = EventActions.getEvent({ id: 1 });
      const outcome = EventActions.getEventSuccess({ event });

      actions$ = of(action);
      eventApiService.get.and.returnValue(of(event));

      effects.getEvent$.subscribe(result => {
        expect(result).toEqual(outcome);
        done();
      });
    });

    it('should return getEventFailure on error', (done) => {
      const action = EventActions.getEvent({ id: 1 });
      const error = 'error';
      const outcome = EventActions.getEventFailure({ error });

      actions$ = of(action);
      eventApiService.get.and.returnValue(throwError(() => {
        return { error };
      }));

      effects.getEvent$.subscribe(result => {
        expect(result).toEqual(outcome);
        done();
      });
    });
  });

  describe('createEvent$', () => {
    it('should return getEventsPage on success', (done) => {
      const event = new EventModel();
      const action = EventActions.createEvent({
        event, pageIndex: 1,
        recordsPerPage: 10,
        titleSearch: '',
        statusFilter: '',
        sort: ''
      });
      const outcome = EventActions.getEventsPage({
        pageIndex: 1,
        recordsPerPage: 10,
        titleSearch: '',
        statusFilter: '',
        sort: ''
      });

      actions$ = of(action);
      eventApiService.create.and.returnValue(of(event));

      effects.createEvent$.subscribe(result => {
        expect(result).toEqual(outcome);
        done();
      });
    });

    it('should return createEventFailure on error', (done) => {
      const event = new EventModel();
      const action = EventActions.createEvent({
        event,
        pageIndex: 1,
        recordsPerPage: 10,
        titleSearch: '',
        statusFilter: '',
        sort: ''
      });
      const error = 'error';
      const outcome = EventActions.createEventFailure({ error });

      actions$ = of(action);
      eventApiService.create.and.returnValue(throwError(() => {
        return { error };
      }));

      effects.createEvent$.subscribe(result => {
        expect(result).toEqual(outcome);
        done();
      });
    });
  });

  describe('updateEvent$', () => {
    it('should return updateEventSuccess on success', (done) => {
      const event = new EventModel();
      const action = EventActions.updateEvent({ event });
      const outcome = EventActions.updateEventSuccess({ event });

      actions$ = of(action);
      eventApiService.update.and.returnValue(of(event));

      effects.updateEvent$.subscribe(result => {
        expect(result).toEqual(outcome);
        done();
      });
    });

    it('should return updateEventFailure on error', (done) => {
      const event = new EventModel();
      const action = EventActions.updateEvent({ event });
      const error = 'error';
      const outcome = EventActions.updateEventFailure({ error });

      actions$ = of(action);
      eventApiService.update.and.returnValue(throwError(() => {
        return { error };
      }));

      effects.updateEvent$.subscribe(result => {
        expect(result).toEqual(outcome);
        done();
      });
    });
  });

  describe('deleteEvent$', () => {
    it('should return getEventsPage on success', (done) => {
      const action = EventActions.deleteEvent({
        id: '1',
        pageIndex: 1,
        recordsPerPage: 10,
        titleSearch: '',
        statusFilter: '',
        sort: ''
      });
      const outcome = EventActions.getEventsPage({
        pageIndex: 1,
        recordsPerPage: 10,
        titleSearch: '',
        statusFilter: '',
        sort: ''
      });

      actions$ = of(action);
      eventApiService.delete.and.returnValue(of(new EventModel()));

      effects.deleteEvent$.subscribe(result => {
        expect(result).toEqual(outcome);
        done();
      });
    });

    it('should return deleteEventFailure on error', (done) => {
      const action = EventActions.deleteEvent({
        id: '1',
        pageIndex: 1,
        recordsPerPage: 10,
        titleSearch: '',
        statusFilter: '',
        sort: ''
      });
      const error = 'error';
      const outcome = EventActions.deleteEventFailure({ error });

      actions$ = of(action);
      eventApiService.delete.and.returnValue(throwError(() => {
        return { error };
      }));

      effects.deleteEvent$.subscribe(result => {
        expect(result).toEqual(outcome);
        done();
      });
    });
  });
});
