import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppComponent } from './app.component';
import { EventActions } from './core/store/event.actions';
import { EventState } from './core/store/event.reducer';
import { RECORDS_PER_PAGE } from './core/constants/records-per-page.const';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore<EventState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterModule.forRoot([])
      ],
      providers: [provideMockStore()]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store) as MockStore<EventState>;
    spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getEventsPage action on ngOnInit', () => {
    const expectedAction = EventActions.getEventsPage({ pageIndex: 1, recordsPerPage: RECORDS_PER_PAGE });

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
