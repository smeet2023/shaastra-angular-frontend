import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-participant-dashboard',standalone:false,
  templateUrl: './participant-dashboard.component.html',
  styleUrls: ['./participant-dashboard.component.scss']
})
export class ParticipantDashboardComponent implements OnInit {
  username: string = '';
  userrole: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.authService.getParticipantUsername();
    this.userrole = localStorage.getItem('role') || 'participant';

  }

  logout(): void {
    this.authService.logout('participant');
    this.router.navigate(['/']);
  }
}
