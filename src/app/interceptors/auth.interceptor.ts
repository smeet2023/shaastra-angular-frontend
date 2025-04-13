import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
interface JwtPayload {
  exp: number; // expiration time in seconds (UNIX timestamp)
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const adminToken = localStorage.getItem('admin_token');
    const participantToken = localStorage.getItem('participant_token');
    const token = adminToken ? adminToken : participantToken;

    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
        const expirationTime = decoded.exp * 1000; // convert to milliseconds
        if (expirationTime < Date.now()) {
          // Token expired; clear them from localStorage
          localStorage.removeItem('admin_token');
          localStorage.removeItem('participant_token');
          console.warn('JWT expired; clearing token(s).');
          // Optionally, you might want to redirect the user to login page here.
          // For now, let the request proceed without a token.
          return next.handle(request);
        } else {
          // Token is valid; clone the request and add the Authorization header.
          const authReq = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
          return next.handle(authReq);
        }
      } catch (e) {
        console.error('Error decoding token', e);
      }
    }
    return next.handle(request);
  }
}
