// services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = `${environment.apiBaseUrl}`;
  public isAuthenticated: boolean = false;

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/register`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/login`, userData);
  }

  checkAuthentication(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/profile`);
  }
}
