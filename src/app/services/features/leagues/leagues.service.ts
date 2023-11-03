// leagues.service.ts:

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {LeagueResponse} from 'src/app/models/league';

@Injectable({
  providedIn: 'root'
})

export class LeaguesService {
  private baseUrl: string = `${environment.apiBaseUrl}/leagues`;


  constructor(private httpClient: HttpClient) { }

  // Methode, um alle Ligen zu erhalten
  fetchAllLeagues(): Observable<LeagueResponse[]> {
    return this.httpClient.get<LeagueResponse[]>(`${this.baseUrl}`);
  }

  // Methode, um Ligen basierend auf der Country ID zu erhalten
  // Angenommen, es gibt eine solche Filterung auf der API-Seite
  fetchLeaguesByCountryId(countryId: string): Observable<LeagueResponse[]> {
    console.log(`${this.baseUrl}/${countryId}`)
    // return this.httpClient.get<LeagueResponse[]>(`${this.baseUrl}/${countryId}`);
    return this.httpClient.get<LeagueResponse[]>(`${this.baseUrl}/${countryId}`).pipe(
      tap((data: any) => console.log('Leagues data received:', data)),
      catchError((error: any) => {
        console.error('Error fetching leagues:', error);
        return throwError(() => new Error('Error fetching leagues'));
      })
    );
  }

  fetchLeaguesByCountryName(countryName: string): Observable<LeagueResponse> {
    console.log(`${this.baseUrl}/${countryName}`)
    // return this.httpClient.get<LeagueResponse[]>(`${this.baseUrl}/${countryId}`);
    return this.httpClient.get<LeagueResponse>(`${this.baseUrl}/${countryName}`).pipe(
      tap((data: any) => console.log('Leagues data received:', data)),
      catchError((error: any) => {
        console.error('Error fetching leagues:', error);
        return throwError(() => new Error('Error fetching leagues'));
      })
    );
  }

  fetchLeaguesByLeagueName(leagueName: number): Observable<LeagueResponse> {
    // return this.httpClient.get<LeagueResponse[]>(`${this.baseUrl}/${countryId}`);
    return this.httpClient.get<LeagueResponse>(`${this.baseUrl}/league/${leagueName}`).pipe(
      tap((data: any) => console.log('Leagues data received:', data)),
      catchError((error: any) => {
        console.error('Error fetching leagues:', error);
        return throwError(() => new Error('Error fetching leagues'));
      })
    );
  }
}

