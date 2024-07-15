import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule} from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { StoreModule} from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EventEffects } from './core/store/event.effects';
import { EventModule } from './event-view/event.module';
import { eventReducer } from './core/store/event.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    EventModule,
    StoreModule.forRoot({events: eventReducer}),
    EffectsModule.forRoot([EventEffects])
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
