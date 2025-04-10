import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContestsRoutingModule } from './contests-routing.module';
import { ContestListComponent } from './contest-list/contest-list.component';
import { ContestDetailComponent } from './contest-detail/contest-detail.component';
import { ContestCreateComponent } from './contest-create/contest-create.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContestCreateComponent,
    ContestListComponent,
    ContestDetailComponent
  ],
  imports: [
    CommonModule,
    ContestsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ContestsModule { }
