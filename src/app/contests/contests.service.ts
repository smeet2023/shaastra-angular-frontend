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
 // Create a new contest based on the provided payload
 createContest(contestData: any): Observable<any> {
  const url = `${environment.apiUrl}/api/contests/create-contest`;
  console.log('URL being fetched: ', url);
    return this.http.post(`${this.apiUrl}/api/contests/create-contest`, contestData);
  }
  // Calls the backend endpoint to retrieve the recent contest participation summary.
  getRecentParticipationSummary(): Observable<{ appeared: number, notAppeared: number }> {
    const url = `${environment.apiUrl}/api/contests/recent/participants-summary`;
    console.log('Fetching participation summary from: ', url);
    return this.http.get<{ appeared: number, notAppeared: number }>(`${this.apiUrl}/api/contests/recent/participants-summary`);
  }
}