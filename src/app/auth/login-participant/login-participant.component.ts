import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthRequest } from '../auth.service';

@Component({
  selector: 'app-login-participant',
  standalone : false,
  templateUrl: './login-participant.component.html',
  styleUrls: ['./login-participant.component.scss']
})
export class LoginParticipantComponent {
  shId: string = '';   // For participants, this is the Student's sh_id
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    const credentials: AuthRequest = { username: this.shId, password: this.password };
    this.authService.participantLogin(credentials).subscribe({
      next: response => {
        if (response.jwt) {
          this.authService.loginSuccess(response.jwt, this.shId, 'participant');
          this.router.navigate(['/participant/dashboard']);
        } else {
          this.errorMessage = response.message || 'Unknown error';
        }
      },
      error: err => {
        this.errorMessage = 'Login failed: ' + err.error;
      }
    });
  }
}
