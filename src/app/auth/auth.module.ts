import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginParticipantComponent } from './login-participant/login-participant.component';

@NgModule({
  declarations: [
    LoginAdminComponent,
    LoginParticipantComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
