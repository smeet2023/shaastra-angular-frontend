import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
export interface ContestParticipantsResrep {
  sh_id: string;
  contestId: number;
  // additional fields if needed…
}
@Injectable({
  providedIn: 'root'
})
export class ContestParticipantsService {
  private baseUrl = `${environment.apiUrl}/api/contest-participants`;
  constructor(private http: HttpClient) {}
  // POST new contest participant
  createParticipant(data: ContestParticipantsResrep): Observable<ContestParticipantsResrep> {
    return this.http.post<ContestParticipantsResrep>(`${this.baseUrl}/register`, data);
  }
  
  // Example: Fetch participants for a given contest if needed
  getParticipantsByContestId(contestId: number): Observable<ContestParticipantsResrep[]> {
    return this.http.get<ContestParticipantsResrep[]>(`${this.baseUrl}/by-contest/${contestId}`);
  }
}