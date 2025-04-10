import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContestParticipantsResrep {
  sh_id: string;
  contestId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ContestParticipantsService {
  private baseUrl = `${environment.apiUrl}/api/contest-participants/register`;

  constructor(private http: HttpClient) { }

  // POST new participant
  createParticipant(data: ContestParticipantsResrep): Observable<ContestParticipantsResrep> {
    return this.http.post<ContestParticipantsResrep>(this.baseUrl, data);
  }
}
