import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/internal/operators/tap';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap(() => { }, (err: HttpErrorResponse) => {
          if (err.error && err.error.errors) {
            const first = Array.isArray(err.error.errors) ? err.error.errors[0] : { };
            this.toastr.error(first.message || 'Hey! this is crazy! console maybe?');
          }
          if (err.status === 401) {
            this.authService.removeToken();
            this.router.navigate(['/']);
          }
        })
      );
  }
}