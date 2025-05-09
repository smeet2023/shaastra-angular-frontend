import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './auth/login-admin/login-admin.component';
import { LoginParticipantComponent } from './auth/login-participant/login-participant.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ParticipantDashboardComponent } from './participant-dashboard/participant-dashboard.component';
import { HomeComponent } from './home/home.component';
import { CreateContestResultComponent } from './contest-results/create-contest-result/create-contest-result.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/admin/login', component: LoginAdminComponent },
  { path: 'auth/participant/login', component: LoginParticipantComponent },
  { path: 'create-contest-result', component: CreateContestResultComponent },
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
  // Lazy-load the contests module under /admin/contests
  { path: 'admin/contest-results', 
    loadChildren: () => import('./contest-results/contest-results.module').then(m => m.ContestResultsModule) ,
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' }
  },
  { 
    path: 'admin/contests', 
    loadChildren: () => import('./contests/contests.module').then(m => m.ContestsModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' }
  },
  { 
    path: 'admin/contest-participants', 
    loadChildren: () => import('./contest-participants/contest-participants.module').then(m => m.ContestParticipantsModule),
    canActivate : [AuthGuard],
    data : {expectedRole : 'admin'}
    // Optionally, you can add a guard here if needed.
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }