import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve tokens from localStorage. If both exist, you can choose a priority, here admin takes precedence.
    const adminToken = localStorage.getItem('admin_token');
    const participantToken = localStorage.getItem('participant_token');
    const token = adminToken ? adminToken : participantToken;

    // If there is a token, clone the request and add the Authorization header.
    if (token) {
      const authReq = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(authReq);
    }
    // If no token present, continue with the original request.
    return next.handle(request);
  }
}
