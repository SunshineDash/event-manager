import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EventModel } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventApiService {
  private apiUrl = 'http://localhost:3000/events';

  constructor(protected http: HttpClient) {  }

  getAll(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.apiUrl);
  }

  get(id: string): Observable<EventModel> {
    return this.http.get<EventModel>(`${this.apiUrl}/${id}`);
  }

  create(model: EventModel): Observable<EventModel> {
    return this.http.post<EventModel>(this.apiUrl, model);
  }

  update(model: EventModel): Observable<EventModel> {
    return this.http.put<EventModel>(`${this.apiUrl}/${model.id}`, model);
  }

  delete(id: string): Observable<EventModel> {
    return this.http.delete<EventModel>(`${this.apiUrl}/${id}`);
  }
}
