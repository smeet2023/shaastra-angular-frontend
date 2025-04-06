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
            localStorage.setItem('admin_token', response.jwt);
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
            localStorage.setItem('participant_token', response.jwt);
          }
        })
      );
  }
  // Utility methods to get token
  getAdminToken(): string | null {
    return localStorage.getItem('admin_token');
  }

  getParticipantToken(): string | null {
    return localStorage.getItem('participant_token');
  }

  // Log out method
  logout(): void {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('participant_token');
  }
  // Example methods in AuthService
  
  isAuthenticated(): boolean {
    // Return true if an admin or participant token is present in localStorage
    return !!(localStorage.getItem('admin_token') || localStorage.getItem('participant_token'));
  }
  
  hasRole(role: string): boolean {
    // Implement your role checking logic.
    // For example, you might decode the JWT token and check the role,
    // or you could store the role in localStorage after login.
    const token = localStorage.getItem(role === 'ADMIN' ? 'admin_token' : 'participant_token');
    // If token exists, assume the role is correct for this simple example.
    return !!token;
  }
}

