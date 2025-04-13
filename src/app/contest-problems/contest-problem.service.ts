import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContestProblemResrep } from '../../app/models/contest-problem-resrep.model';


@Injectable({
  providedIn: 'root'
})
export class ContestProblemService {
  private baseUrl = `${environment.apiUrl}/api/contest-problems`;

  constructor(private http: HttpClient) { }

  // Fetch problems by contestId.
  // Adjust the endpoint if your backend uses a different URL (e.g. /by-contest/{contestId})
  getProblemsByContestId(contestId: number): Observable<ContestProblemResrep[]> {
    const url = `${this.baseUrl}/by-contest/${contestId}`;
    console.log('Fetching contest problems from: ', url);
    return this.http.get<ContestProblemResrep[]>(url);
  }
}
