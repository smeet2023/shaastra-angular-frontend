import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './auth/login-admin/login-admin.component';
import { LoginParticipantComponent } from './auth/login-participant/login-participant.component';

const routes: Routes = [
  { path: '', redirectTo: 'login/admin', pathMatch: 'full' },
  { path: 'login/admin', component: LoginAdminComponent },
  { path: 'login/participant', component: LoginParticipantComponent },
  // ...other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
