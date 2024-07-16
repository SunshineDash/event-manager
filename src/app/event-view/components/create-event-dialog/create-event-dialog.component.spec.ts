import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';

import { CreateEventDialogComponent } from './create-event-dialog.component';
import { PriorityEnum } from '../../../core/enums/priority.enum';

describe('CreateEventModalComponent', () => {
  let component: CreateEventDialogComponent;
  let fixture: ComponentFixture<CreateEventDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEventDialogComponent],
      imports: [
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatDialogContent,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { formGroup: new FormGroup({
              title: new FormControl(),
              description: new FormControl(),
              date: new FormControl(),
              priority: new FormControl(),
              status: new FormControl()
            }) } },
        { provide: MatDialogRef, useValue: {} },
        provideNativeDateAdapter()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct initial data', () => {
    expect(component.data).toBeTruthy();
    expect(component.data.formGroup).toBeDefined();
  });

  it('should have the PriorityEnum defined', () => {
    expect(component.PriorityEnum).toBe(PriorityEnum);
  });
});
