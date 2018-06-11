import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  fetchToken(code: string): Observable<any> {
    return this.http.post('/oauth2/token', { code })
      .pipe(
        tap((res: any) => localStorage.setItem('auth', res.access_token))
      );
  }

  getToken(): string {
    return localStorage.getItem('auth');
  }

  removeToken(): void {
    return localStorage.removeItem('auth');
  }

}
