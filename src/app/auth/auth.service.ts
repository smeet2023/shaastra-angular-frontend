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
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Admin login: store admin-specific keys
  adminLogin(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/admin/login`, credentials)
      .pipe(
        tap(response => {
          if (response.jwt) {
            localStorage.setItem('admin_token', response.jwt);
            localStorage.setItem('admin_username', credentials.username);
            localStorage.setItem('admin_role', 'admin');
          }
        })
      );
  }

  // Participant login: store participant-specific keys
  participantLogin(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/participant/login`, credentials)
      .pipe(
        tap(response => {
          if (response.jwt) {
            localStorage.setItem('participant_token', response.jwt);
            localStorage.setItem('participant_username', credentials.username);
            localStorage.setItem('participant_role', 'participant');
          }
        })
      );
  }

  // Role-specific token getters
  getAdminToken(): string | null {
    return localStorage.getItem('admin_token');
  }
  getParticipantToken(): string | null {
    return localStorage.getItem('participant_token');
  }

  // Role-specific username getters
  getAdminUsername(): string {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('admin_username') || '';
    }
    return '';
  }
  
  getParticipantUsername(): string {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('participant_username') || '';
    }
    return '';
  }
  

  // Check if authenticated for a given role
  isAuthenticatedForRole(role: 'admin' | 'participant'): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (role === 'admin') {
        return !!localStorage.getItem('admin_token');
      } else {
        return !!localStorage.getItem('participant_token');
      }
    }
    return false;
  }
  

  // Logout for specified role; remove only that role's keys
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
  // Global authentication check if needed (optional)
  isAuthenticated(): boolean {
    return !!(localStorage.getItem('admin_token') || localStorage.getItem('participant_token'));
  }

  // Check role based on stored data
  hasRole(role: string): boolean {
    if (role.toLowerCase() === 'admin') {
      return !!localStorage.getItem('admin_token');
    } else {
      return !!localStorage.getItem('participant_token');
    }
  }
}
