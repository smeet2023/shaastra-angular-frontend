import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ContestService } from '../contests/contests.service';  // Ensure this service is implemented
@Component({
  selector: 'app-admin-dashboard',standalone:false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  adminName = '';
  isCollapsed = false;
  showConfirmDialog = false;
  // Pie chart data will be set once we fetch from the backend
  pieChartData: any[] = [];
  // A proper Color object based on ngx-charts requirements
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#4CAF50', '#F44336']  // For example: green for "Appeared", red for "Not Appeared"
  };
  constructor(
    private authService: AuthService, 
    private router: Router,
    private contestService: ContestService
  ) {
    this.adminName = this.authService.getAdminUsername(); // Retrieves admin's username from storage
  }
  ngOnInit(): void {
    this.fetchChartData();
  }
  // Fetch chart data from the backend
  fetchChartData(): void {
    this.contestService.getRecentParticipationSummary().subscribe({
      next: (data: {appeared: number, notAppeared: number}) => {
        this.pieChartData = [
          { name: 'Appeared', value: data.appeared },
          { name: 'Not Appeared', value: data.notAppeared }
        ];
      },
      error: (err) => {
        console.error('Error fetching participation summary:', err);
      }
    });
  }
  // Navigation method for the dashboard create buttons
  navigateTo(path: string): void {
    console.log("@@@@ " + path);
    switch (path) {
      case 'contests':
        this.router.navigateByUrl('/admin/contests/create-contest');
        break;
      case 'participants': // or 'contest-participants'
        this.router.navigateByUrl('/admin/contest-participants/create');
        break;
      case 'contestresults':
        this.router.navigateByUrl('/admin/contest-results/create-contest-result');
        break;
      default:
        this.router.navigateByUrl(`/admin/${path}/create`);
    }
  }
  
  openConfirm(): void {
    this.showConfirmDialog = true;
  }
  handleConfirm(confirmed: boolean): void {
    this.showConfirmDialog = false;
    if (confirmed) {
      this.authService.logout('admin');
      this.router.navigate(['/auth/admin/login']);
    }
  }
  logout(): void {
    this.authService.logout('admin');
    this.router.navigate(['/auth/admin/login']);
  }
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}