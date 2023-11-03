import { InjectionToken } from '@angular/core';
import {UserProfile} from 'src/app/models/UserProfile';

export interface UserDataService {
  getUserProfile(id:string): Promise<UserProfile>;
  // Weitere Methoden können hier hinzugefügt werden
}

export const USER_DATA_SERVICE = new InjectionToken<UserDataService>('UserDataService');
