import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import { DeleteEventDialogComponent } from './delete-event-dialog.component';
import { EventActions } from '../../../core/store/event.actions';
import { EventModel } from '../../../core/models/event.model';
import { EventState } from '../../../core/store/event.reducer';
import { RECORDS_PER_PAGE } from '../../../core/constants/records-per-page.const';

describe('ConformationDialogComponent', () => {
  let component: DeleteEventDialogComponent;
  let fixture: ComponentFixture<DeleteEventDialogComponent>;
  let store: MockStore<EventState>;

  const event = new EventModel({
    id: '1',
    title: 'Sample Event',
    description: 'test',
    date: '',
    status: 0,
    priority: 0
  } as Partial<EventModel>);

  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteEventDialogComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { event, pageIndex: 0, titleSearch: '', statusFilter: '', sort: '' } },
        { provide: MatDialogRef, useValue: {} },
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEventDialogComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store) as MockStore<EventState>;
    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct initial data', () => {
    expect(component.data).toBeTruthy();
    expect(component.data.event).toBe(event);
    expect(component.data.pageIndex).toBe(0);
    expect(component.data.titleSearch).toBe('');
    expect(component.data.statusFilter).toBe('');
    expect(component.data.sort).toBe('');
  });

  it('should dispatch deleteEvent action on confirm', () => {
    component.onConfirm();

    expect(store.dispatch).toHaveBeenCalledWith(EventActions.deleteEvent({
      id: event.id,
      pageIndex: 0,
      recordsPerPage: RECORDS_PER_PAGE,
      titleSearch: '',
      statusFilter: '',
      sort: ''
    }));
  });
});
