import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  jwt?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // e.g., 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  // Admin login
  adminLogin(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/admin/login`, credentials)
      .pipe(
        tap(response => {
          if (response.jwt) {
            // Store admin token and details in separate keys
            this.loginSuccess(response.jwt, credentials.username, 'admin');
          }
        })
      );
  }

  // Contest Participant login
  participantLogin(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/participant/login`, credentials)
      .pipe(
        tap(response => {
          if (response.jwt) {
            // Store participant token and details in separate keys
            this.loginSuccess(response.jwt, credentials.username, 'participant');
          }
        })
      );
  }

  // Store login data separately based on role
  loginSuccess(token: string, username: string, role: string): void {
    if (role === 'admin') {
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_username', username);
      localStorage.setItem('admin_role', role);
    } else if (role === 'participant') {
      localStorage.setItem('participant_token', token);
      localStorage.setItem('participant_username', username);
      localStorage.setItem('participant_role', role);
    }
  }

  // Getters for admin/participant usernames
  getAdminUsername(): string {
    return localStorage.getItem('admin_username') || '';
  }
  getParticipantUsername(): string {
    return localStorage.getItem('participant_username') || '';
  }

  // Separate authentication check for each role
  isAuthenticatedForRole(role: 'admin' | 'participant'): boolean {
    if (role === 'admin') {
      return !!localStorage.getItem('admin_token');
    } else if (role === 'participant') {
      return !!localStorage.getItem('participant_token');
    }
    return false;
  }

  // Logout only for the specified role
  logout(role: 'admin' | 'participant'): void {
    if (role === 'admin') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_username');
      localStorage.removeItem('admin_role');
    } else if (role === 'participant') {
      localStorage.removeItem('participant_token');
      localStorage.removeItem('participant_username');
      localStorage.removeItem('participant_role');
    }
  }

  // Global authentication (if needed)
  isAuthenticated(): boolean {
    return !!(localStorage.getItem('admin_token') || localStorage.getItem('participant_token'));
  }

  // Role check (if needed)
  hasRole(role: string): boolean {
    if (role.toLowerCase() === 'admin') {
      return !!localStorage.getItem('admin_token');
    } else {
      return !!localStorage.getItem('participant_token');
    }
  }
}
