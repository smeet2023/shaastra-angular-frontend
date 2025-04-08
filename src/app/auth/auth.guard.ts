// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) { }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     const expectedRole: 'admin' | 'participant' = route.data['expectedRole'];

//     if (!this.authService.isAuthenticatedForRole(expectedRole)) {
//       this.authService.logout(expectedRole);
//       return this.router.createUrlTree(
//         expectedRole === 'admin' ? ['/auth/admin/login'] : ['/auth/participant/login']
//       );
//     }
//     return true;
//   }
// }
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
    // expectedRole should be set in route data: 'admin' or 'participant'
    const expectedRole: 'admin' | 'participant' = route.data['expectedRole'];
    if (!this.authService.isAuthenticatedForRole(expectedRole)) {
      // Redirect accordingly if not authenticated for the expected role.
      return this.router.createUrlTree(
        expectedRole === 'admin' ? ['/auth/admin/login'] : ['/auth/participant/login']
      );
    }
    return true;
  }
}
