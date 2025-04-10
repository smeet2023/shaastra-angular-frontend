import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateParticipantComponent } from './create-participant/create-participant.component';
// import { ParticipantListComponent } from './participant-list/participant-list.component'; // if any

const routes: Routes = [
  { path: 'create', component: CreateParticipantComponent },
  
  // { path: '', component: ParticipantListComponent } // listing page, optional
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestParticipantsRoutingModule { }
