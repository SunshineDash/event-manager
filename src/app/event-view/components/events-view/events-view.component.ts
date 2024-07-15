import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { DeleteEventDialogComponent } from '../delete-event-dialog/delete-event-dialog.component';
import { CreateEventDialogComponent } from '../create-event-dialog/create-event-dialog.component';
import { EventActions } from '../../../core/store/event.actions';
import { EventModel } from '../../../core/models/event.model';
import { EventState } from '../../../core/store/event.reducer';
import { PriorityEnum } from '../../../core/enums/priority.enum';
import { RECORDS_PER_PAGE } from '../../../core/constants/records-per-page.const';
import { selectState } from '../../../core/store/event.selector';
import { StatusEnum } from '../../../core/enums/status.enum';

@Component({
  selector: 'app-events-view',
  templateUrl: './events-view.component.html',
  styleUrl: './events-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsViewComponent implements OnInit {
  readonly PriorityEnum = PriorityEnum;

  readonly StatusEnum = StatusEnum;

  readonly sortValues = {
    Id: 'id',
    Index: 'Index',
    Priority: 'Priority',
    Date: 'Date'
  };

  readonly statusAll = 'Any Status';

  asc = false;

  currentPageIndex = 0;

  events = new Array<EventModel>();

  firstPageIndex = 0;

  lastPageIndex = 0;

  nextPageIndex = 0;

  prevPageIndex = 0;

  searchString = '';

  selectedSort = this.sortValues.Id;

  selectedStatus = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
    private matDialog: MatDialog,
    private store: Store<EventState>
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(selectState), takeUntilDestroyed(this.destroyRef)).subscribe(
      (state) => {
        if (!state) {
          return;
        }

        this.events = state.events;
        this.firstPageIndex = state.firstPageIndex ?? 0;
        this.lastPageIndex = state.lastPageIndex ? state.lastPageIndex : 1;
        this.nextPageIndex = state.nextPageIndex ?? 0;
        this.prevPageIndex = state.prevPageIndex ?? 0;
        this.currentPageIndex = (state.prevPageIndex ?? 0) + this.firstPageIndex;

        this.cdr.detectChanges();
      }
    );
  }

  search(value: string): void {
    this.searchString = value;
    this.getPage(this.currentPageIndex);
  }

  filter(value: string): void {
    this.selectedStatus = value;
    this.getPage(this.currentPageIndex);
  }

  sort(value: string): void {
    this.selectedSort = value.toLowerCase();
    this.getPage(this.currentPageIndex);
  }

  changeSortOrder(): void {
    this.asc = !this.asc;
    this.getPage(this.currentPageIndex);
  }

  create(): void {
    const formGroup = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      date: new FormControl(''),
      priority: new FormControl(),
      status: new FormControl(StatusEnum.Unfinished)
    });

    const modalDialog = this.matDialog.open(CreateEventDialogComponent, {
      data: { formGroup: formGroup},
    });

    modalDialog.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
      if (result) {
        this.store.dispatch(EventActions.createEvent({
          event: result as EventModel,
          pageIndex: this.currentPageIndex,
          recordsPerPage: RECORDS_PER_PAGE,
          titleSearch: this.searchString,
          statusFilter: this.selectedStatus,
          sort: this.selectedSort
        }));
      }
    });
  }

  openConformationDialog(event: EventModel): void {
    this.matDialog.open(DeleteEventDialogComponent, {
      data: {
        event: event,
        pageIndex: this.currentPageIndex,
        recordsPerPage: RECORDS_PER_PAGE,
        titleSearch: this.searchString,
        statusFilter: this.selectedStatus,
        sort: this.selectedSort
      },
    });
  }

  getPage(pageIndex: number): void {
    this.store.dispatch(EventActions.getEventsPage({
      pageIndex: pageIndex,
      recordsPerPage: RECORDS_PER_PAGE,
      titleSearch: this.searchString,
      statusFilter: this.selectedStatus,
      sort: this.asc ? this.selectedSort : `-${this.selectedSort}`
    }));
  }
}
