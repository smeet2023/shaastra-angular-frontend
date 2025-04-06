import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthRequest } from '../auth.service';

@Component({
  selector: 'app-login-admin',
  standalone: false,
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    const credentials: AuthRequest = { username: this.username, password: this.password };
    this.authService.adminLogin(credentials).subscribe({
      next: response => {
        if (response.jwt) {
          // Navigate to admin dashboard or home page after login
          this.router.navigate(['/admin/dashboard']);
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
