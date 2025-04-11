import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContestResrep {
  contestId: number;
  contest_name: string;
  contest_date: string; // Adjust as needed
  // additional fields...
}

export interface ContestResultPostResRep {
  contest_id: number;
  participant_id: number;
  score: number;
  rank_in_this_contest: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContestService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Create a new contest
  createContest(contestData: any): Observable<any> {
    const url = `${this.apiUrl}/api/contests/create-contest`;
    return this.http.post(url, contestData);
  }

  // Retrieve completed contests (assuming your backend supports filtering by status)
  getCompletedContests(): Observable<ContestResrep[]> {
    return this.http.get<ContestResrep[]>(`${this.apiUrl}/api/contests?status=completed`);
  }

  // Create a ContestResult
  createContestResult(data: ContestResultPostResRep): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/contest-results/create-contest-result`, data);
  }

  // Retrieve the recent contest participation summary.
  getRecentParticipationSummary(): Observable<{ appeared: number, notAppeared: number }> {
    return this.http.get<{ appeared: number, notAppeared: number }>(`${this.apiUrl}/api/contests/recent/participants-summary`);
  }
}
