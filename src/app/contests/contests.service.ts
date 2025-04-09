import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContestService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Calls the backend endpoint to retrieve the recent contest participation summary.
  getRecentParticipationSummary(): Observable<{ appeared: number, notAppeared: number }> {
    return this.http.get<{ appeared: number, notAppeared: number }>(`${this.apiUrl}/api/contests/recent/participants-summary`);
  }
}
