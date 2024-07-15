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
import { selectEvents } from '../../../core/store/event.selector';
import { StatusEnum } from '../../../core/enums/status.enum';

@Component({
  selector: 'app-events-view',
  templateUrl: './events-view.component.html',
  styleUrl: './events-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsViewComponent implements OnInit {
  readonly priorityValues = Object.values(PriorityEnum);

  readonly sortValues = {
    Index: 'Index',
    Priority: 'Priority',
    Date: 'Date'
  };

  readonly statusValues = Object.values(StatusEnum);

  readonly statusAll = 'Any Status';

  events = new Array<EventModel>();

  eventList = new Array<EventModel>();

  searchString = '';

  selectedSort = this.sortValues.Index;

  selectedStatus = this.statusAll;

  constructor(
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
    private matDialog: MatDialog,
    private store: Store<EventState>
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(selectEvents), takeUntilDestroyed(this.destroyRef)).subscribe(
      (events) => {
        this.events = events;
        this.filter();
        this.sort(true);
        this.cdr.detectChanges();
      }
    );
  }

  search(value: string): void {
    this.searchString = value.toLowerCase();
    this.filter();
    this.sort(true);
  }

  filterByStatus(value: string): void {
    this.selectedStatus = value;
    this.filter();
    this.sort(true);
  }

  filter(): void {
    this.eventList = this.events.filter(event =>
      event.title.toLowerCase().includes(this.searchString) && (this.selectedStatus === this.statusAll || event.status === this.selectedStatus)
    );
  }

  onSortValueChange(value: string): void {
    this.selectedSort = value;
    this.sort();
  }

  sort(isAfterFilter = false): void {
    if (this.selectedSort === this.sortValues.Priority) {
      this.sortByPriority();

      return;
    }

    if (this.selectedSort === this.sortValues.Date) {
      this.sortByDate();

      return;
    }

    if (isAfterFilter) {
      return;
    }

    this.filter();
  }

  sortByPriority(): void {
    this.eventList = [...this.eventList].sort((a: EventModel, b: EventModel) =>
      (this.priorityValues.indexOf(b.priority) - this.priorityValues.indexOf(a.priority))
    );
  }

  sortByDate(): void {
    this.eventList = [...this.eventList].sort(
      (a: EventModel, b: EventModel) => Date.parse(b.date) - Date.parse(a.date)
    );
  }

  createEvent(): void {
    const formGroup = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      date: new FormControl(''),
      priority: new FormControl(),
      status: new FormControl(StatusEnum.INPROGRESS)
    });

    const modalDialog = this.matDialog.open(CreateEventDialogComponent, {
      data: { formGroup: formGroup},
    });

    modalDialog.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
      if (result) {
        this.store.dispatch(EventActions.createEvent({event: result as EventModel}));
      }
    });
  }

  openConformationDialog(event: EventModel): void {
    this.matDialog.open(DeleteEventDialogComponent, {
      data: { event: event },
    });
  }
}
