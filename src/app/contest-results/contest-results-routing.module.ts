import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateContestResultComponent } from './create-contest-result/create-contest-result.component';

const routes: Routes = [
  { path: 'create-contest-result', component: CreateContestResultComponent }
  // ... additional routes for contest results if needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestResultsRoutingModule { }
