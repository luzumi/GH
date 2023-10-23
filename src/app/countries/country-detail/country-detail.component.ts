import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from 'src/app/services/features/countries/countries.service';

interface CountryDetail {
  name: string;
  code: string;
  flag: string;
}

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  countryDetail: CountryDetail | null = null;

  constructor(private route: ActivatedRoute, private countriesService: CountriesService) { }

  ngOnInit(): void {
    const countryKey = this.route.snapshot.paramMap.get('countryKey');
    if (countryKey) {
      // Backend-Call, um die Detaildaten zu holen.
      // Implementiere diese Methode im CountriesService.
      this.countriesService.fetchCountryDetail(countryKey).subscribe({
        next: (data) => {
          this.countryDetail = data;
        },
        error: (err) => {
          console.error('Fehler beim Abrufen der Länderdetails:', err);
        }
      });
    }
  }
}
