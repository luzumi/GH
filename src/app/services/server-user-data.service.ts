import { Injectable } from '@angular/core';
import { UserDataService } from './user-data.service';
import { UserProfile } from 'src/app/models/UserProfile';
import { UserService } from 'src/app/services/features/user/user.service';  // Importieren Sie den UserService

@Injectable({
  providedIn: 'root'
})
export class ServerUserDataService implements UserDataService {

  constructor(private userService: UserService) { }  // Injizieren Sie den UserService

  async getUserProfile(id: string): Promise<UserProfile> {
    try {
      const data = await this.userService.fetchUserProfileById(id).toPromise();  // Verwenden Sie die fetchUserProfile Methode
      if (data) {
        // Hier können Sie weitere Verarbeitungen durchführen, falls notwendig
        return data;
      } else {
        throw new Error('Keine Daten vom Server erhalten.');
      }
    } catch (error) {
      console.error('Fehler beim Abrufen des Benutzerprofils:', error);
      throw error;
    }
  }
}
