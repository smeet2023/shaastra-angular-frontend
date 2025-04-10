import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContestListComponent } from './contest-list/contest-list.component';
import { ContestDetailComponent } from './contest-detail/contest-detail.component';
import { ContestCreateComponent } from './contest-create/contest-create.component';

const routes: Routes = [
  { path: '', component: ContestListComponent },
  { path: 'create-contest', component: ContestCreateComponent },
  { path: ':id', component: ContestDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestsRoutingModule { }
