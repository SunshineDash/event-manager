import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PriorityEnum } from '../../../core/enums/priority.enum';

@Component({
  selector: 'app-create-event-dialog',
  templateUrl: './create-event-dialog.component.html',
  styleUrl: './create-event-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEventDialogComponent {
  readonly PriorityEnum = PriorityEnum;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { formGroup: FormGroup }) { }
}
