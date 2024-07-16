import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { EventApiService } from './event-api.service';
import { EventModel } from '../models/event.model';
import { PaginationResponseInterface } from '../interfaces/pagination-response.interface';

describe('EventApiService', () => {
  let service: EventApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        EventApiService,
        provideHttpClient(),
        provideHttpClientTesting() ]
    });

    service = TestBed.inject(EventApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPage', () => {
    it('should return paginated events', () => {
      const mockResponse: PaginationResponseInterface<EventModel[]> = {
        data: [],
        pages: 0,
        first: 0,
        prev: 0,
        next: 0,
        last: 0,
        items: 0,
      };

      service.getPage(
        1,
        10,
        'search',
        'filter',
        'sort').subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('http://localhost:3000/events?_page=1&_per_page=10&title=search&status=filter&_sort=sort');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('get', () => {
    it('should return an event by id', () => {
      const mockEvent = new EventModel({
        id: '1',
        title: 'Test Event',
        description: 'Description',
        date: '2024-07-15',
        priority: 0,
        status: 0
      } as Partial<EventModel>);

      service.get(1).subscribe(event => {
        expect(event).toEqual(mockEvent);
      });

      const req = httpMock.expectOne('http://localhost:3000/events/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockEvent);
    });
  });

  describe('create', () => {
    it('should create a new event', () => {
      const newEvent = new EventModel({
        id: '0',
        title: 'New Event',
        description: 'Description',
        date: '2024-07-15',
        priority: 0,
        status: 0
      } as Partial<EventModel>);
      const mockResponse: EventModel = { ...newEvent, id: '1' };

      service.create(newEvent).subscribe(event => {
        expect(event).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('http://localhost:3000/events');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  describe('update', () => {
    it('should update an event', () => {
      const updatedEvent =
        new EventModel({
          id: '1',
          title: 'Updated Event',
          description: 'Description',
          date: '2024-07-15',
          priority: 0,
          status: 0
        } as Partial<EventModel>);

      service.update(updatedEvent).subscribe(event => {
        expect(event).toEqual(updatedEvent);
      });

      const req = httpMock.expectOne('http://localhost:3000/events/1');
      expect(req.request.method).toBe('PUT');
      req.flush(updatedEvent);
    });
  });

  describe('delete', () => {
    it('should delete an event by id', () => {
      const mockEvent = new EventModel({
        id: '1',
        title: 'Test Event',
        description: 'Description',
        date: '2024-07-15',
        priority: 0,
        status: 0
      } as Partial<EventModel>);

      service.delete('1').subscribe(event => {
        expect(event).toEqual(mockEvent);
      });

      const req = httpMock.expectOne('http://localhost:3000/events/1');
      expect(req.request.method).toBe('DELETE');
      req.flush(mockEvent);
    });
  });
});
