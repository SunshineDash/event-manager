import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { EventActions } from '../../../core/store/event.actions';
import { EventModel } from '../../../core/models/event.model';
import { EventState } from '../../../core/store/event.reducer';
import { PriorityEnum } from '../../../core/enums/priority.enum';
import { selectDetailsEvent } from '../../../core/store/event.selector';
import { StatusEnum } from '../../../core/enums/status.enum';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDetailsComponent implements OnInit {
  readonly PriorityEnum = PriorityEnum;

  readonly StatusEnum = StatusEnum;

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

  constructor(
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
    private store: Store<EventState>
  ) { }

  ngOnInit(): void {
    this.store.select(selectDetailsEvent())
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
      if (!event) {
        return;
      }

      this.event = event;
      this.formGroup.controls.id.setValue(event.id);
      this.formGroup.controls.title.setValue(event.title);
      this.formGroup.controls.description.setValue(event.description);
      this.formGroup.controls.date.setValue(event.date);
      this.formGroup.controls.priority.setValue(event.priority);
      this.formGroup.controls.status.setValue(event.status);

      this.cdr.detectChanges();
    });
  }

  onSubmit(): void {
    this.store.dispatch(EventActions.updateEvent({ event: this.formGroup.value as EventModel }));
    this.formGroup.markAsPristine();
    this.switchMode();
  }

  switchMode(): void {
    this.isEditMode = !this.isEditMode;
    this.cleanForm();
  }

  cleanForm(): void {
    if (!this.isEditMode) {
      this.formGroup.controls.id.setValue(this.event.id);
      this.formGroup.controls.title.setValue(this.event.title);
      this.formGroup.controls.description.setValue(this.event.description);
      this.formGroup.controls.date.setValue(this.event.date);
      this.formGroup.controls.priority.setValue(this.event.priority);
      this.formGroup.controls.status.setValue(this.event.status);
    }
  }
}
