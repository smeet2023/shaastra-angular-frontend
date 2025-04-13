import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
export interface ContestResultPostResRep {
  contest_id: number;
  participant_id: string;
  score: number;
  rank_in_this_contest: number;
  status: string;
}
@Injectable({
  providedIn: 'root'
})
export class ContestResultService {
  private baseUrl = `${environment.apiUrl}/api/contest-results`;
  constructor(private http: HttpClient) { }
  // Create a new contest result
  createContestResult(payload: ContestResultPostResRep): Observable<any> {
    const url = `${this.baseUrl}`;
    console.log('Creating contest result at: ', url, payload);
    return this.http.post(url, payload);
  }
}