// Auth Service

import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from "../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    (localStorage.getItem('isLoggedIn') === 'true')
  );
  userId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  static counter=0;
  private baseUrl: string = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient, private router: Router) {
    AuthService.isLoggedIn = new BehaviorSubject<boolean>(localStorage.getItem('isLoggedIn') === 'true');
  }

  register(username: string, email: string, password: string) {
    console.log(`${this.baseUrl}/user/register`)
    return this.http.post(`${this.baseUrl}/user/register`, {username, email, password});  // username hinzugefügt
  }

  login(identifier: string, password: string): Observable<any> {
    console.log(`${this.baseUrl}/user/login`, AuthService.isLoggedIn.value)
    return this.http.post(
      `${this.baseUrl}/user/login`,
      {identifier, password},
      {withCredentials: true}
    ).pipe(
      tap((response: any)  => {
        // Hier können Sie den Authentifizierungsstatus setzen, z.B.
        localStorage.setItem('isLoggedIn', 'true');
        this.userId.next(response.user._id);
        AuthService.isLoggedIn.next(true);
      }),
      catchError(err => {
        // Fehlerbehandlung
        console.error('Login failed', err);
        localStorage.setItem('isLoggedIn', 'false');
        return throwError(() => {
          const error: any = new Error(`This is error auth.service.ts: ${err.status}`);
          error.timestamp = Date.now();
          return error
        });
      })
    );
  }

  logout() {
    AuthService.isLoggedIn.next(false);
    localStorage.removeItem('isLoggedIn');
    this.userId.next('');
    this.router.navigate(['/login']);
  }
}
