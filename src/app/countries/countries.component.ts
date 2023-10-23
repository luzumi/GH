import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Router importieren
import { CountriesService } from '../services/features/countries/countries.service';

interface Country {
  name: string;
  code: string;
  flag: string;
}

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  currentPage = 1;
  pageSize = 10;

  constructor(private router: Router, private countriesService: CountriesService) { }  // Router injizieren

  ngOnInit(): void {
    this.getAllCountries();
  }

  getAllCountries(): void {
    this.countriesService.fetchAllCountries().subscribe({
      next: (data) => {
        this.countries = data as Country[];
        this.filteredCountries = [...this.countries];
        this.currentPage = 1;
      },
      error: (err) => {
        console.error('Fehler beim Abrufen der Länder:', err);
      }
    });
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

  navigateToCountryDetail(country: Country) {
    this.router.navigate([`/countries/country=${country.code}`]);  // Navigation zur Detailseite
  }

  changePageSize(size: number): void {
    this.pageSize = size;
  }
}
