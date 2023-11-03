import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CountriesService} from '../services/features/countries/countries.service';
import {CountryResponse} from '../models/country';
import {ImageCachingService} from 'src/app/services/image-caching.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries: CountryResponse[] = [];
  filteredCountries: CountryResponse[] = [];
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  currentPage = 1;
  pageSize = 10;
  searchTerm: string = '';
  isLoading = true;

  // Konstruktor, der Abhängigkeiten wie Router und Services injiziert
  constructor(
    private router: Router,
    private countriesService: CountriesService,
    private imageCachingService: ImageCachingService,
  ) {
  }

  // Getter-Methode, die die Länder für die aktuelle Seite berechnet
  get paginatedCountries(): CountryResponse[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredCountries.slice(startIndex, startIndex + this.pageSize);
  }

  // OnInit-Lebenszyklushaken, der beim Initialisieren der Komponente aufgerufen wird
  ngOnInit(): void {
    this.fetchAndCacheAllCountries();
  }

  // Methode zum Abrufen und Zwischenspeichern aller Länder
  fetchAndCacheAllCountries(): void {
    this.countriesService.fetchAllCountries('=')
      .toPromise()
      .then(data => {
        this.countries = data as CountryResponse[];
        this.filteredCountries = [...this.countries];
        this.isLoading = false;
        return this.cacheCountryFlags();
      })
      .catch(err => {
        console.error('Fehler beim Abrufen der Länder:', err);
        this.isLoading = false;
      });
  }

  getImageUrl(url: string): string {
    return this.imageCachingService.getCachedImage(url) || url;
  }

  onImageError(event: any): void {
    event.target.src = 'assets/img/worldIcon.png';
  }

  // Methode zum Laden eines Bildes als Base64-String (Platzhalterimplementierung)
  loadImageAsBase64(url: string): Promise<string> {
    // Deine Implementierung zum Laden des Base64-Bildes
    return Promise.resolve('');  // Dummy-Implementierung
  }

  filterCountries(): void {
    this.filteredCountries = this.searchTerm ?
      this.countries.filter(country => country.name.toLowerCase().includes(this.searchTerm.toLowerCase())) :
      [...this.countries];
    this.currentPage = 1;
  }

  // Methode zum Abrufen von Ländern nach Anfangsbuchstaben
  getCountriesByLetter(letter: string): void {
    this.countriesService.fetchCountriesByLetter(letter)
      .toPromise()
      .then(data => {
        this.countries = data;
        this.filteredCountries = [...this.countries];
        this.currentPage = 1;
      })
      .catch(err => {
        console.error('Fehler beim Abrufen der Länder:', err);
      });
  }

  // Methode zum Navigieren zu den Details eines Landes
  navigateToCountryDetail(country: CountryResponse): void {
    console.log('Navigiere zu Länderdetails:', country)
    this.router.navigate([`/countries/detail/${country.name}`]);
  }

  // Private Methode zum Zwischenspeichern von Länderflaggen
  private cacheCountryFlags(): Promise<void[]> {
    const flagPromises = this.countries.map(country => this.cacheFlag(country.flag));
    return Promise.all(flagPromises);
  }

  // Private Hilfsmethode zum Zwischenspeichern einer einzelnen Flagge
  private cacheFlag(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.imageCachingService.isImageCached(url)) {
        this.loadImageAsBase64(url)
          .then(base64 => {
            this.imageCachingService.cacheImage(url, base64);
            resolve();
          })
          .catch(reject);
      } else {
        resolve();
      }
    });
  }

  // Methode zum Ändern der Seitengröße der Paginierung
  changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
  }

  protected readonly JSON = JSON;
}
