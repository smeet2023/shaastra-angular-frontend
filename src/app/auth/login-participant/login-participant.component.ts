import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthRequest } from '../auth.service';

@Component({
  selector: 'app-login-participant',
  templateUrl: './login-participant.component.html',
  styleUrls: ['./login-participant.component.scss']
})
export class LoginParticipantComponent {
  shId: string = '';   // for participants, username is the sh_id from Student entity
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    const credentials: AuthRequest = { username: this.shId, password: this.password };
    this.authService.participantLogin(credentials).subscribe({
      next: response => {
        if (response.jwt) {
          // Navigate to participant dashboard or home page after login
          this.router.navigate(['/student/dashboard']);
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
