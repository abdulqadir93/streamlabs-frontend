import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { filter, map, mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { AuthService } from "src/app/auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CodeGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(route.queryParams)
      .pipe(
        map((params: any) => params.code),
        mergeMap((code: string) => {
          if (!code) {
            return of(null);
          }
          return this.authService.fetchToken(code);
        }),
        map(res => {
          if (res !== null) {
            this.router.navigate(['/search']);
            return false;
          }
          return true;
        })
      );
  }
}