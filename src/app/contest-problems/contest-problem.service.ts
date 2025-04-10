import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContestProblemResrep {
  contest_problem_id: number;  // Unique identifier for the problem
  problem_title: string;
  problem_description: string;
  problem_solution: string;
  problem_difficulty: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContestProblemService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Fetch all contest problems available for selection
  getAllContestProblems(): Observable<ContestProblemResrep[]> {
    const url = `${environment.apiUrl}/api/contest-problems`;
    console.log('URL being fetched: ', url);
    return this.http.get<ContestProblemResrep[]>(`${this.apiUrl}/api/contest-problems`);
  }
}
