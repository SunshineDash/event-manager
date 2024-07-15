import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { EventApiService } from '../services/event-api.service';
import { EventModel } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventResolverService implements Resolve<any> {
  constructor(private apiService: EventApiService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<EventModel>|boolean {
    return this.apiService.get(route.params['id']).pipe(
      catchError(() => {
          this.router.navigate(['']);

          return of(new EventModel());
      })
    );
  }
}
