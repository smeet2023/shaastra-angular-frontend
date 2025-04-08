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
    const expectedRole: 'admin' | 'participant' = route.data['expectedRole'];
    
    if (expectedRole) {
      if (!this.authService.isAuthenticatedForRole(expectedRole)) {
        // If not authenticated for this role, log out (clear tokens) and redirect appropriately
        this.authService.logout(expectedRole);
        if (expectedRole === 'admin') {
          return this.router.createUrlTree(['/auth/admin/login']);
        } else {
          return this.router.createUrlTree(['/auth/participant/login']);
        }
      }
    } else if (!this.authService.isAuthenticated()) {
      // If no expected role is defined and not authenticated
      return this.router.createUrlTree(['/auth/participant/login']);
    }
    return true;
  }
}
