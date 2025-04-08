// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth/auth.service';

// @Component({
//   selector: 'app-admin-dashboard',standalone:false,
//   templateUrl: './admin-dashboard.component.html',
//   styleUrls: ['./admin-dashboard.component.scss']
// })
// export class AdminDashboardComponent implements OnInit {
//   username: string = '';
//   userrole: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   ngOnInit(): void {
//     this.username = this.authService.getAdminUsername();
//     this.userrole = localStorage.getItem('role') || 'admin';

//   }

//   logout(): void {
//     this.authService.logout('admin');
//     this.router.navigate(['/']);
//   }
// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

// import { ConfirmationDialogComponent } from  
@Component({
  selector: 'app-admin-dashboard',standalone:false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  adminName = '';
  isCollapsed = false;
  showConfirmDialog = false;

  constructor(private authService: AuthService, private router: Router) {
    this.adminName = this.authService.getAdminUsername(); // Adjust if needed
  }
  handleConfirm(confirmed: boolean): void {
    // Hide the dialog first
    this.showConfirmDialog = false;
    if (confirmed) {
      // Log out only if confirmed
      this.authService.logout('admin');
      this.router.navigate(['/auth/admin/login']);
    }
  }
  openConfirm(): void {
    this.showConfirmDialog = true;
  }
  logout(): void {
    this.authService.logout('admin');
    this.router.navigate(['/auth/admin/login']);
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
