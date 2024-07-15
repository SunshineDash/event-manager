import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { EventActions } from '../../../core/store/event.actions';
import { EventModel } from '../../../core/models/event.model';
import { EventState } from '../../../core/store/event.reducer';

@Component({
  selector: 'app-delete-event-dialog',
  templateUrl: './delete-event-dialog.component.html',
  styleUrl: './delete-event-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteEventDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { event: EventModel }, private store: Store<EventState>) { }

  onConfirm(): void {
    this.store.dispatch(EventActions.deleteEvent({ id: this.data.event.id }));
  }
}
