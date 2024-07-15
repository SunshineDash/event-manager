import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { EventActions } from './core/store/event.actions';
import { EventState } from './core/store/event.reducer';
import { RECORDS_PER_PAGE } from './core/constants/records-per-page.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private store: Store<EventState>) {}

  ngOnInit(): void {
    this.store.dispatch(EventActions.getEventsPage({ pageIndex: 1, recordsPerPage: RECORDS_PER_PAGE }));
  }
}
