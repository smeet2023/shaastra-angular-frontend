import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ContestParticipantsRoutingModule } from './contest-participants-routing.module';
import { CreateParticipantComponent } from './create-participant/create-participant.component';
// Import other components as needed

@NgModule({
  declarations: [
    CreateParticipantComponent,
    // ParticipantListComponent, etc.
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContestParticipantsRoutingModule
  ]
})
export class ContestParticipantsModule { }
