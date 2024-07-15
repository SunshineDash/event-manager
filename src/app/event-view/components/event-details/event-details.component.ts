import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { EventActions } from '../../../core/store/event.actions';
import { EventModel } from '../../../core/models/event.model';
import { EventState } from '../../../core/store/event.reducer';
import { PriorityEnum } from '../../../core/enums/priority.enum';
import { selectEventById } from '../../../core/store/event.selector';
import { StatusEnum } from '../../../core/enums/status.enum';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDetailsComponent {
  readonly priorityValues = Object.values(PriorityEnum);

  readonly statusValues = Object.values(StatusEnum);

  event = new EventModel();

  isEditMode = false;

  formGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
    date: new FormControl(),
    priority: new FormControl(),
    status: new FormControl()
  });

  constructor(private route: ActivatedRoute, private store: Store<EventState>) {
    store.select(selectEventById(route.snapshot.paramMap.get('id') ?? ''))
      .pipe(takeUntilDestroyed()).subscribe(item => {
      if (!item) {
        return;
      }

      this.event = item;
      this.formGroup.controls.id.setValue(item.id);
      this.formGroup.controls.title.setValue(item.title);
      this.formGroup.controls.description.setValue(item.description);
      this.formGroup.controls.date.setValue(item.date);
      this.formGroup.controls.priority.setValue(item.priority);
      this.formGroup.controls.status.setValue(item.status);
    });
  }

  onSubmit(): void {
    this.store.dispatch(EventActions.updateEvent({ event: this.formGroup.value as EventModel }));
    this.formGroup.markAsPristine();
    this.switchMode();
  }

  switchMode(): void {
    this.isEditMode = !this.isEditMode;
  }
}
