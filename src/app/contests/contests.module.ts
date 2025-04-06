import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContestsRoutingModule } from './contests-routing.module';
import { ContestListComponent } from './contest-list/contest-list.component';
import { ContestDetailComponent } from './contest-detail/contest-detail.component';


@NgModule({
  declarations: [
    ContestListComponent,
    ContestDetailComponent
  ],
  imports: [
    CommonModule,
    ContestsRoutingModule
  ]
})
export class ContestsModule { }
