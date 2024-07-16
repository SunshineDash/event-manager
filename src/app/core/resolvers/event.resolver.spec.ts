import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';

import { EventActions } from '../store/event.actions';
import { EventApiService } from '../services/event-api.service';
import { EventModel } from '../models/event.model';
import { EventResolverService } from './event.resolver';
import { EventState } from '../store/event.reducer';

describe('EventResolverService', () => {
  let resolver: EventResolverService;
  let apiService: jasmine.SpyObj<EventApiService>;
  let router: jasmine.SpyObj<Router>;
  let store: MockStore<EventState>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('EventApiService', ['get']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        EventResolverService,
        { provide: EventApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        provideMockStore()
      ]
    });

    resolver = TestBed.inject(EventResolverService);
    apiService = TestBed.inject(EventApiService) as jasmine.SpyObj<EventApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    store = TestBed.inject(Store) as MockStore<EventState>;
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve data and dispatch getEvent action', (done) => {
    const route = new ActivatedRouteSnapshot();
    route.params = { id: 123 };
    apiService.get.and.returnValue(of(new EventModel()));

    const test = resolver.resolve(route) as Observable<EventModel>;

    test.subscribe(result => {
      expect(store.dispatch).toHaveBeenCalledWith(EventActions.getEvent({ id: 123 }));
      expect(result).toEqual(new EventModel());
      done();
    });
  });

  it('should navigate to root on error', (done) => {
    const route = new ActivatedRouteSnapshot();
    route.params = { id: 123 };
    apiService.get.and.returnValue(throwError(() => 'error'));

    const test = resolver.resolve(route) as Observable<EventModel>;

    test.subscribe(result => {
      expect(router.navigate).toHaveBeenCalledWith(['']);
      expect(result).toEqual(new EventModel());
      done();
    });
  });
});
