import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',standalone:false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  username: string = '';
  userrole: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.authService.getAdminUsername();
    this.userrole = localStorage.getItem('role') || 'admin';

  }

  logout(): void {
    this.authService.logout('admin');
    this.router.navigate(['/']);
  }
}
