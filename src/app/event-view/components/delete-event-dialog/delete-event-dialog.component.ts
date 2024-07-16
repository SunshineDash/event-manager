import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { EventActions } from '../../../core/store/event.actions';
import { EventModel } from '../../../core/models/event.model';
import { EventState } from '../../../core/store/event.reducer';
import { RECORDS_PER_PAGE } from '../../../core/constants/records-per-page.const';

@Component({
  selector: 'app-delete-event-dialog',
  templateUrl: './delete-event-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteEventDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      event: EventModel,
      pageIndex: number,
      titleSearch: string,
      statusFilter: string,
      sort: string
    },
    private store: Store<EventState>
  ) { }

  onConfirm(): void {
    this.store.dispatch(EventActions.deleteEvent({
      id: this.data.event.id,
      pageIndex: this.data.pageIndex,
      recordsPerPage: RECORDS_PER_PAGE,
      titleSearch: this.data.titleSearch,
      statusFilter: this.data.statusFilter,
      sort: this.data.sort
    }));
  }
}
