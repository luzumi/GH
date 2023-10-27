import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';  // Router importieren
import {CountriesService} from '../services/features/countries/countries.service';
import {CountryResponse} from '../models/country';
import {ImageCachingService} from 'src/app/services/image-caching.service';
import {DelayService} from "../services/delay.service";  // 1. Importiere den ImageCachingService

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

  constructor(
    private router: Router,
    private countriesService: CountriesService,
    private imageCachingService: ImageCachingService,
    private delayService: DelayService
  ) {
  } // Router injizieren

  ngOnInit(): void {
    this.getAllCountries();
  }

  isLoading = true;

  getAllCountries(): void {
    this.countriesService.fetchAllCountries('=').subscribe({
      next: (data) => {
        this.countries = data as CountryResponse[];
        this.filteredCountries = [...this.countries];
        this.isLoading = false;
        this.cacheCountryFlags(this.countries).then(() => {
          console.log('Alle Flaggen sind im Cache.');
        });
      },
      error: (err) => {
        console.error('Fehler beim Abrufen der Länder:', err);
        this.isLoading = false;
      }
    });
  }


  async cacheCountryFlags(countries: CountryResponse[]): Promise<void> {
    const flagPromises = countries.map(country => {
      return new Promise<void>((resolve) => {
        if (!this.imageCachingService.isImageCached(country.flag)) {
          // Angenommen, loadImageAsBase64 ist eine asynchrone Methode, die ein Base64-Bild zurückgibt
          this.loadImageAsBase64(country.flag).then(base64 => {
            this.imageCachingService.cacheImage(country.flag, base64);
            resolve();
          }).catch(() => {
            resolve(); // Fange mögliche Fehler auf und resolve das Promise, um weiterzumachen
          });
        } else {
          resolve(); // Wenn das Bild bereits im Cache ist, resolve das Promise sofort
        }
      });
    });

    await Promise.allSettled(flagPromises); // Warte, bis alle Flaggen geladen und gecached sind
  }

  // 3. Verwende den Cache in der HTML-Datei oder wo auch immer du das Bild anzeigst.
  getImageUrl(url: string): string {
    const cachedImage = this.imageCachingService.getCachedImage(url);
    return cachedImage !== null ? cachedImage : url;
  }

  onImageError(event: any): void {
    event.target.src = '../../../assets/img/worldIcon.png'; // Setze den Pfad zum alternativen Bild
  }

  async loadImageAsBase64(url: string): Promise<string> {
    return '';
  }


  filterCountries() {
    if (this.searchTerm) {
      this.filteredCountries = this.countries.filter(country =>
        country.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCountries = [...this.countries];
    }
    // Aktualisiere die Paginierung
    this.currentPage = 1;
  }

  public get paginatedCountries(): CountryResponse[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredCountries.slice(startIndex, startIndex + this.pageSize);
  }

  getCountriesByLetter(letter: string): void {
    this.countriesService.fetchCountriesByLetter(letter).subscribe({
      next: (data) => {
        this.countries = data;
        this.filteredCountries = [...this.countries];
        this.currentPage = 1;
      },
      error: (err) => {
        console.error('Fehler beim Abrufen der Länder:', err);
      }
    });
  }

  navigateToCountryDetail(country: CountryResponse) {
    this.router.navigate([`/countries/country=${country.code}`]);  // Navigation zur Detailseite
  }

  changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
  }

  protected readonly JSON = JSON;
}
