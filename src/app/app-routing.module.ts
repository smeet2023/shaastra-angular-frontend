import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './auth/login-admin/login-admin.component';
import { LoginParticipantComponent } from './auth/login-participant/login-participant.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ParticipantDashboardComponent } from './participant-dashboard/participant-dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/admin/login', component: LoginAdminComponent },
  { path: 'auth/participant/login', component: LoginParticipantComponent },
  { 
    path: 'admin/dashboard', 
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' }
  },
  { 
    path: 'participant/dashboard', 
    component: ParticipantDashboardComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'participant' }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }