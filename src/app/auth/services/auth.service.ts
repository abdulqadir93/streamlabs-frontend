import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  fetchToken(code: string): Observable<any> {
    return this.http.post('/oauth2/token', { code })
      .pipe(
        mergeMap((token: any) => {
          localStorage.setItem('auth', token.access_token);
          return this.http.get('/api/me');
        }),
        tap(user => {
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }

  getToken(): string {
    return localStorage.getItem('auth');
  }

  getUser(): any {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return userStr;
  }

  removeToken(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
  }

}
