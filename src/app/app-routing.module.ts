import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventDetailsComponent } from './event-view/components/event-details/event-details.component';
import { EventResolverService } from './core/resolvers/event.resolver';
import { EventsViewComponent } from './event-view/components/events-view/events-view.component';

const routes: Routes = [
  {
    path: '',
    component: EventsViewComponent
  },
  {
    path: 'events/:id',
    resolve: { events: EventResolverService },
    component: EventDetailsComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
