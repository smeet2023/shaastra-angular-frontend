import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SolvedProblemsPostResRep {
  contest_participant_id: string;
  contest_id: number;
  contest_problem_id: number;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class SolvedProblemService {
  private baseUrl = `${environment.apiUrl}/api/solved-problems`;

  constructor(private http: HttpClient) {}

  // Bulk creation of solved problems data
  submitSolvedProblems(payload: SolvedProblemsPostResRep[]): Observable<any> {
    const url = `${this.baseUrl}/bulk`;
    console.log('Submitting solved problems to: ', url, payload);
    return this.http.post(url, payload);
  }
}
