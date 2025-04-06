import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginParticipantComponent } from './login-participant/login-participant.component';

const routes: Routes = [
  { path: 'admin/login', component: LoginAdminComponent },
  { path: 'participant/login', component: LoginParticipantComponent },
  // You can add more auth-related routes (e.g., logout) if needed.
  { path: '', redirectTo: 'participant/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
