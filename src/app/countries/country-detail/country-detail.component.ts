import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CountriesService} from 'src/app/services/features/countries/countries.service';
import {CountryResponse} from "../../models/country";


@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  countryDetail: CountryResponse | null = null;

  constructor(private route: ActivatedRoute, private countriesService: CountriesService) { }

  ngOnInit(): void {
    const countryName = this.route.snapshot.paramMap.get('name');
    console.log('countryName:', countryName)
    if (countryName) {
      // Backend-Call, um die Detaildaten zu holen.
      // Implementiere diese Methode im CountriesService.
      this.countriesService.fetchCountryDetail(countryName).subscribe({
        next: (data) => {
          this.countryDetail = data;
          console.log('Länderdetails erfolgreich abgerufen:', data);
        },
        error: (err) => {
          console.error('Fehler beim Abrufen der Länderdetails:', err);
        }
      });
    }
  }
}
