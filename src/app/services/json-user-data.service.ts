import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from './user-data.service';
import { UserProfile } from './userData.interface';

@Injectable({
  providedIn: 'root'
})
export class JsonUserDataService implements UserDataService {

  constructor(private http: HttpClient) { }

  async getUserProfile(): Promise<UserProfile> {
    const data = await this.http.get<UserProfile>('/assets/user.json').toPromise();
    if (data) {
      return data;
    } else {
      throw new Error('Data could not be fetched');
    }
  }
}
