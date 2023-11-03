import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {UserProfile} from 'src/app/models/UserProfile';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = `${environment.apiBaseUrl}`;

  constructor(private httpClient: HttpClient) { }

  // Methode, um ein einzelnes User-Profil anhand der ID abzurufen
  fetchUserProfileById(id: string): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(`${this.baseUrl}/user/profil/${id}`);
  }

  // Weitere Methoden können hier hinzugefügt werden, z.B. zum Aktualisieren des Profils,
  // zum Abrufen einer Liste von Usern, usw.
}
