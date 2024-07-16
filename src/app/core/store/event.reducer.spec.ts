import { EventActions } from './event.actions';
import { EventModel } from '../models/event.model';
import { eventReducer, defaultEventState, EventState } from './event.reducer';
import { PaginationResponseInterface } from '../interfaces/pagination-response.interface';

describe('EventReducer', () => {
  const initialState: EventState = defaultEventState;

  it('should return the default state', () => {
    const action = {} as any;

    const state = eventReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  describe('getEventsPageSuccess action', () => {
    it('getEventsPageSuccess should update the state with the new page data', () => {
      const pageData: PaginationResponseInterface<EventModel[]> = {
        data: [new EventModel(), new EventModel()],
        pages: 5,
        first: 0,
        prev: 0,
        next: 1,
        last: 4,
        items: 5
      };
      const action = EventActions.getEventsPageSuccess({ page: pageData });

      const state = eventReducer(initialState, action);

      expect(state.events).toEqual(pageData.data);
      expect(state.pagesCount).toBe(pageData.pages);
      expect(state.firstPageIndex).toBe(pageData.first);
      expect(state.prevPageIndex).toBe(pageData.prev);
      expect(state.nextPageIndex).toBe(pageData.next);
      expect(state.lastPageIndex).toBe(pageData.last);
    });
  });

  describe('getEventSuccess action', () => {
    it('should update the state with the new event', () => {
      const event = new EventModel();
      event.id = '1';
      event.title = 'Test Event';
      const action = EventActions.getEventSuccess({ event });

      const state = eventReducer(initialState, action);

      expect(state.event).toEqual(event);
    });
  });

  describe('updateEventSuccess action', () => {
    it('should update the state with the updated event', () => {
      const updatedEvent = new EventModel();
      updatedEvent.id = '1';
      updatedEvent.title = 'Updated Event';
      const action = EventActions.updateEventSuccess({ event: updatedEvent });

      const state = eventReducer(initialState, action);

      expect(state.event).toEqual(updatedEvent);
    });
  });
});
