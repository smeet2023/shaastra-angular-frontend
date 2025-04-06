import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if the user is authenticated
    if (!this.authService.isAuthenticated()) {
      // Not authenticated, clear any tokens and redirect to the appropriate login page.
      this.authService.logout();

      // Check if the route has an expectedRole defined (e.g., 'ADMIN' or 'PARTICIPANT')
      const expectedRole = route.data['expectedRole'];
      if (expectedRole === 'ADMIN') {
        return this.router.createUrlTree(['/auth/admin/login']);
      } else if (expectedRole === 'PARTICIPANT') {
        return this.router.createUrlTree(['/auth/participant/login']);
      } else {
        // Default fallback login page
        return this.router.createUrlTree(['/auth/participant/login']);
      }
    }

    // If an expected role is specified, check if the current user has that role.
    const expectedRole = route.data['expectedRole'];
    if (expectedRole && !this.authService.hasRole(expectedRole)) {
      // The user is authenticated but does not have the required role.
      // Optionally, log them out and redirect to the login page.
      this.authService.logout();
      return this.router.createUrlTree(['/auth/participant/login']);
    }

    // User is authenticated and has the expected role, allow access.
    return true;
  }
}
