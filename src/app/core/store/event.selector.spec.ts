import { EventModel } from '../models/event.model';
import { EventState } from './event.reducer';
import { selectEventsState, selectState, selectDetailsEvent } from './event.selector';

describe('Event Selectors', () => {
  const initialState: EventState = {
    events: [new EventModel(), new EventModel()],
    event: new EventModel(),
    pagesCount: 0,
    firstPageIndex: 0,
    prevPageIndex: 0,
    nextPageIndex: 0,
    lastPageIndex: 0
  };

  describe('selectEventsState', () => {
    it('should select the events state', () => {
      const result = selectEventsState.projector(initialState);

      expect(result).toBe(initialState);
    });
  });

  describe('selectState', () => {
    it('should select the entire state', () => {
      const result = selectState.projector(initialState);

      expect(result).toEqual(initialState);
    });
  });

  describe('selectDetailsEvent', () => {
    it('should select the event details from the state', () => {
      const event = new EventModel();
      event.id = '1';
      event.title = 'Test Event';
      const stateWithEvent = { ...initialState, event };

      const result = selectDetailsEvent.projector(stateWithEvent);

      expect(result).toEqual(event);
    });
  });
});
