// countries.service.ts:

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountryResponse } from 'src/app/models/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private baseUrl: string = `${environment.apiBaseUrl}`;

  constructor(private httpClient: HttpClient) { }

  fetchCountriesByLetter(letter: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/countries/${letter}`);
  }

  fetchAllCountries(letter: string) {
    return this.httpClient.get(`${this.baseUrl}/countries/${letter}`);
  }

  fetchCountryDetail(countryKey: string): Observable<CountryResponse> {
    return this.httpClient.get<CountryResponse>(`${this.baseUrl}/countries/${countryKey}`);
  }
}
