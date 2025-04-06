import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './auth/login-admin/login-admin.component';
import { LoginParticipantComponent } from './auth/login-participant/login-participant.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'auth/admin/login', component: LoginAdminComponent },
  { path: 'auth/participant/login', component: LoginParticipantComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard', component: DashboardComponent },
  // ...other routes
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
