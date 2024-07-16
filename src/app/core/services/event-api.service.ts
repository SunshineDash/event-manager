import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EventModel } from '../models/event.model';
import { PaginationResponseInterface } from '../interfaces/pagination-response.interface';

@Injectable({
  providedIn: 'root'
})
export class EventApiService {
  private apiUrl = 'http://localhost:3000/events';

  constructor(protected http: HttpClient) {  }

  getPage(
    pageIndex: number,
    recordsPerPage: number,
    titleSearch = '',
    statusFilter = '',
    sort = ''
  ): Observable<PaginationResponseInterface<EventModel[]>> {
    const searchParams= new URLSearchParams();

    if (pageIndex) {
      searchParams.append('_page', pageIndex.toString());
    }

    if (recordsPerPage) {
      searchParams.append('_per_page', recordsPerPage.toString());
    }

    if (titleSearch) {
      searchParams.append('title', titleSearch);
    }

    if (statusFilter) {
      searchParams.append('status', statusFilter);
    }

    if (sort) {
      searchParams.append('_sort', sort);
    }

    const baseUrl = new URL(this.apiUrl);
    baseUrl.search = searchParams.toString();

    return this.http.get<PaginationResponseInterface<EventModel[]>>(baseUrl.toString());
  }

  get(id: number): Observable<EventModel> {
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
