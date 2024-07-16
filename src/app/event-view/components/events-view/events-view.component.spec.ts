import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { CreateEventDialogComponent } from '../create-event-dialog/create-event-dialog.component';
import { DeleteEventDialogComponent } from '../delete-event-dialog/delete-event-dialog.component';
import { EventActions } from '../../../core/store/event.actions';
import { EventModel } from '../../../core/models/event.model';
import { EventState } from '../../../core/store/event.reducer';
import { EventsViewComponent } from './events-view.component';
import { RECORDS_PER_PAGE } from '../../../core/constants/records-per-page.const';
import { selectState } from '../../../core/store/event.selector';

describe('EventsViewComponent', () => {
  let component: EventsViewComponent;
  let fixture: ComponentFixture<EventsViewComponent>;
  let store: MockStore<EventState>;
  let dialog: MatDialog;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  const initialState = {
    events: [],
    event: new EventModel(),
    pagesCount: 0,
    firstPageIndex: 0,
    lastPageIndex: 1,
    nextPageIndex: 1,
    prevPageIndex: 0
  };

  const mockEvent = new EventModel({
    id: '1',
    title: 'Sample Event',
    description: 'test',
    date: '',
    status: 0,
    priority: 0
  } as Partial<EventModel>);

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [EventsViewComponent],
      imports: [
        MatDialogModule,
        MatCardModule,
        MatChipsModule,
        MatIconModule,
        ReactiveFormsModule,
        RouterModule.forRoot([])
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: MatDialog, useValue: mockDialog }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsViewComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store) as MockStore<EventState>;
    dialog = TestBed.inject(MatDialog);
    store.overrideSelector(selectState, initialState);
    spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct state', () => {
    expect(component.events).toEqual([]);
    expect(component.firstPageIndex).toBe(0);
    expect(component.lastPageIndex).toBe(1);
    expect(component.nextPageIndex).toBe(1);
    expect(component.prevPageIndex).toBe(0);
    expect(component.currentPageIndex).toBe(0);
  });

  it('should update component state when store state changes', () => {
    const newState = {
      events: [mockEvent],
      event: new EventModel(),
      pagesCount: 0,
      firstPageIndex: 0,
      lastPageIndex: 1,
      nextPageIndex: 1,
      prevPageIndex: 0
    };
    store.overrideSelector(selectState, newState);
    store.refreshState();

    fixture.detectChanges();

    expect(component.events).toEqual([mockEvent]);
  });

  it('should dispatch getEventsPage action on getPage call', () => {
    component.getPage(1);

    expect(store.dispatch).toHaveBeenCalledWith(EventActions.getEventsPage({
      pageIndex: 1,
      recordsPerPage: RECORDS_PER_PAGE,
      titleSearch: '',
      statusFilter: '',
      sort: '-id'
    }));
  });

  it('should open CreateEventDialogComponent on create call', () => {
    const dialogRef = {
      afterClosed: () => of(mockEvent)
    } as MatDialogRef<CreateEventDialogComponent, any>;
    mockDialog.open.and.returnValue(dialogRef);

    component.create();

    expect(dialog.open).toHaveBeenCalledWith(CreateEventDialogComponent, {
      data: jasmine.any(Object)
    });

    dialogRef.afterClosed().subscribe((result: EventModel) => {
      expect(store.dispatch).toHaveBeenCalledWith(EventActions.createEvent({
        event: mockEvent,
        pageIndex: 0,
        recordsPerPage: RECORDS_PER_PAGE,
        titleSearch: '',
        statusFilter: '',
        sort: 'id'
      }));
    });
  });

  it('should open DeleteEventDialogComponent on openConformationDialog call', () => {
    component.openConformationDialog(mockEvent);

    expect(dialog.open).toHaveBeenCalledWith(DeleteEventDialogComponent, {
      data: {
        event: mockEvent,
        pageIndex: 0,
        recordsPerPage: RECORDS_PER_PAGE,
        titleSearch: '',
        statusFilter: '',
        sort: 'id'
      }
    });
  });

  it('should update search string and call getPage on search', () => {
    spyOn(component, 'getPage');

    component.search('test search');

    expect(component.searchString).toBe('test search');
    expect(component.getPage).toHaveBeenCalledWith(component.currentPageIndex);
  });

  it('should update selectedStatus and call getPage on filter', () => {
    spyOn(component, 'getPage');

    component.filter('Finished');

    expect(component.selectedStatus).toBe('Finished');
    expect(component.getPage).toHaveBeenCalledWith(component.currentPageIndex);
  });

  it('should update selectedSort and call getPage on sort', () => {
    spyOn(component, 'getPage');

    component.sort('Priority');

    expect(component.selectedSort).toBe('priority');
    expect(component.getPage).toHaveBeenCalledWith(component.currentPageIndex);
  });

  it('should toggle asc and call getPage on changeSortOrder', () => {
    spyOn(component, 'getPage');
    component.asc = false;

    component.changeSortOrder();

    expect(component.asc).toBe(true);
    expect(component.getPage).toHaveBeenCalledWith(component.currentPageIndex);
  });
});
