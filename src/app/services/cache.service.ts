import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  // Speichert Daten im Cache (Local Storage)
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Ruft Daten aus dem Cache ab
  getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data) as T;
    }
    return null;
  }

  // Entfernt Daten aus dem Cache
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Löscht den gesamten Cache
  clearCache(): void {
    localStorage.clear();
  }
}
