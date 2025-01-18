import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedRequest = request;
    const accessToken = this.authService.getAccessToken();
    const refreshToken = this.authService.getRefreshToken();

    // Exclude login and register requests from adding Authorization header
    if (!this.isExcludedRequest(request.url)) {
      if (accessToken) {
        clonedRequest = clonedRequest.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      }
    }

    // Add CSRF token for protected requests
    if (this.isProtectedRequest(request.url)) {
      const csrfToken = this.authService.getCsrfToken();
      if (csrfToken) {
        clonedRequest = clonedRequest.clone({
          setHeaders: {
            'X-CSRFToken': csrfToken
          },
          withCredentials: true
        });
      }
    }

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.isRefreshRequest(request.url)) {
          if (refreshToken) {
            return this.authService.refreshToken().pipe(
              switchMap(() => {
                const newAccessToken = this.authService.getAccessToken();
                const newRequest = clonedRequest.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newAccessToken}`
                  }
                });
                return next.handle(newRequest);
              }),
              catchError(err => {
                this.authService.logout();
                return throwError(() => err);
              })
            );
          } else {
            this.authService.logout();
          }
        }
        return throwError(() => error);
      })
    );
  }

  private isExcludedRequest(url: string): boolean {
    return url.includes('login') || url.includes('register');
  }

  private isRefreshRequest(url: string): boolean {
    return url.includes('token/refresh');
  }

  private isProtectedRequest(url: string): boolean {
    const protectedPaths = [
      'password-reset/',
      'password-reset/done/',
      'password-reset/confirm/',
      'password-reset/complete/',
      'password-change/',
      'password-change/done/',
    ];
    return protectedPaths.some(path => url.includes(path));
  }
}
