import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { EventActions } from '../../../core/store/event.actions';
import { EventDetailsComponent } from './event-details.component';
import { EventModel } from '../../../core/models/event.model';
import { EventState } from '../../../core/store/event.reducer';
import { selectDetailsEvent } from '../../../core/store/event.selector';

describe('EventDetailsComponent', () => {
  let component: EventDetailsComponent;
  let fixture: ComponentFixture<EventDetailsComponent>;
  let store: MockStore<EventState>;
  let cdr: ChangeDetectorRef;

  const mockEvent = new EventModel({
    id: '1',
    title: 'Sample Event',
    description: 'test',
    date: '',
    status: 0,
    priority: 0
  } as Partial<EventModel>);

  const initialState = {
    events: [],
    event: new EventModel(),
    pagesCount: 0,
    firstPageIndex: 0,
    lastPageIndex: 1,
    nextPageIndex: 1,
    prevPageIndex: 0
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventDetailsComponent],
      imports: [
        MatCardModule,
        MatChipsModule,
        MatIconModule,
        ReactiveFormsModule
      ],
      providers: [
        provideMockStore({ initialState }),
        ChangeDetectorRef
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store) as MockStore<EventState>;
    cdr = TestBed.inject(ChangeDetectorRef);
    store.overrideSelector(selectDetailsEvent, mockEvent);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct initial data', () => {
    component.ngOnInit();

    expect(component.event).toEqual(mockEvent);
    store.select(selectDetailsEvent).pipe().subscribe((event) => {
      expect(event).toEqual(
        mockEvent
      );
    });
    expect(component.formGroup.value).toEqual({
      id: mockEvent.id,
      title: mockEvent.title,
      description: mockEvent.description,
      date: mockEvent.date,
      priority: mockEvent.priority,
      status: mockEvent.status
    });
  });

  it('should update form controls when event data changes', () => {
    const newEvent: EventModel = { ...mockEvent, title: 'Updated Title' };
    store.overrideSelector(selectDetailsEvent, newEvent);
    store.refreshState();

    fixture.detectChanges();

    expect(component.formGroup.controls.title.value).toEqual('Updated Title');
  });

  it('should dispatch updateEvent action on form submit', () => {
    spyOn(store, 'dispatch').and.callThrough();

    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(EventActions.updateEvent({ event: component.formGroup.value as EventModel }));
  });

  it('should switch modes', () => {
    component.switchMode();

    expect(component.isEditMode).toBe(true);
  });

  it('should clean form correctly', () => {
    component.isEditMode = false;

    component.cleanForm();

    expect(component.formGroup.value).toEqual({
      id: mockEvent.id,
      title: mockEvent.title,
      description: mockEvent.description,
      date: mockEvent.date,
      priority: mockEvent.priority,
      status: mockEvent.status
    });
  });
});
