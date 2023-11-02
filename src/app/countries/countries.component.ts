import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CountriesService} from '../services/features/countries/countries.service';
import {CountryResponse} from '../models/country';
import {ImageCachingService} from 'src/app/services/image-caching.service';
import {DelayService} from "../services/delay.service";

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

  constructor(
    private router: Router,
    private countriesService: CountriesService,
    private imageCachingService: ImageCachingService,
    private delayService: DelayService
  ) {
  }

  get paginatedCountries(): CountryResponse[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredCountries.slice(startIndex, startIndex + this.pageSize);
  }

  ngOnInit(): void {
    this.fetchAndCacheAllCountries();
  }

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

  navigateToCountryDetail(country: CountryResponse): void {
    console.log('Navigiere zu Länderdetails:', country)
    this.router.navigate([`/countries/detail/${country.name}`]);
  }

  private cacheCountryFlags(): Promise<void[]> {
    const flagPromises = this.countries.map(country => this.cacheFlag(country.flag));
    return Promise.all(flagPromises);
  }

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

  changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
  }

  protected readonly JSON = JSON;
}
