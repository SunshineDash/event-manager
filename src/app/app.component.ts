import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { EventState } from './core/store/event.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private store: Store<EventState>) {}

  ngOnInit(): void {
    this.store.dispatch({ type: '[Event] Get Events' });
  }
}
