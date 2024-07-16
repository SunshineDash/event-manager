import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { DestroyRef, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { EventActions } from '../store/event.actions';
import { EventApiService } from '../services/event-api.service';
import { EventModel } from '../models/event.model';
import { EventState } from '../store/event.reducer';

@Injectable({
  providedIn: 'root'
})
export class EventResolverService implements Resolve<any> {
  constructor(
    private apiService: EventApiService,
    private destroyRef: DestroyRef,
    private router: Router,
    private store: Store<EventState>
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<EventModel>|boolean {
    return this.apiService.get(route.params['id']).pipe(
      map(() => {
        this.store.dispatch(EventActions.getEvent({
          id: route.params['id']
        }));

        return new EventModel();
      }),
      catchError(() => {
        this.router.navigate(['']);

        return of(new EventModel());
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }
}
