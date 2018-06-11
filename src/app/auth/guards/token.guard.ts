import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    const code = this.authService.getToken();
    if (code) {
        this.router.navigate(['/search']);
        return false;
    }
    return true;
  }
}