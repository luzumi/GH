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
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private baseUrl: string = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient, private router: Router) {
  }

  register(username: string, email: string, password: string) {
    console.log(`${this.baseUrl}/user/register`)
    return this.http.post(`${this.baseUrl}/user/register`, {username, email, password});  // username hinzugefügt
  }

  login(identifier: string, password: string): Observable<any> {
    console.log(`${this.baseUrl}/user/login`)
    return this.http.post(
      `${this.baseUrl}/user/login`,
      {identifier, password},
      {withCredentials: true}
    ).pipe(
      tap(response => {
        // Hier können Sie den Authentifizierungsstatus setzen, z.B.
        console.log('Login successful', response);
        this.isAuthenticated.next(true);
        this.setLoggedIn(true);
      }),
      catchError(err => {
        // Fehlerbehandlung
        console.error('Login failed', err);
        return throwError(() => {
          const error: any = new Error(`This is error auth.service.ts: ${err.status}`);
          error.timestamp = Date.now();
          return error
        });
      })
    );
  }


  setLoggedIn(status: boolean): void {
    this.isAuthenticated.next(status);
  }

  logout() {
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  checkInitialAuthentication() {
    this.http.get('/api/check-auth').subscribe(
      (response: any) => {
        this.isAuthenticated.next(response.isAuthenticated);
      },
      () => {
        this.isAuthenticated.next(false);
      }
    );
  }


  getAuthenticationStatus(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}
