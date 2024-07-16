import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RouterModule } from '@angular/router';

import { DeleteEventDialogComponent } from './components/delete-event-dialog/delete-event-dialog.component';
import { CreateEventDialogComponent } from './components/create-event-dialog/create-event-dialog.component';
import { EventsViewComponent } from './components/events-view/events-view.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';

@NgModule({
  declarations: [
    EventsViewComponent,
    CreateEventDialogComponent,
    DeleteEventDialogComponent,
    EventDetailsComponent
  ],
  exports: [
    EventsViewComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatButton,
    MatCardModule,
    MatChip,
    MatChipSet,
    MatDatepickerModule,
    MatDialogModule,
    MatIconButton,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    provideNativeDateAdapter()
  ]
})
export class EventModule { }
