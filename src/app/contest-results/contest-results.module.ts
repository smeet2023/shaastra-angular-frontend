import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContestResultsRoutingModule } from './contest-results-routing.module';
import { CreateContestResultComponent } from './create-contest-result/create-contest-result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateContestResultComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ContestResultsRoutingModule
  ]
})
export class ContestResultsModule { }
