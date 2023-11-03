import {Component, Input, OnInit} from '@angular/core';
import {CountriesService} from 'src/app/services/features/countries/countries.service';
import {CountryResponse} from "../../models/country";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})

export class CountryDetailComponent implements OnInit {
  countryDetail: CountryResponse | null = null;
  @Input() leagueName: string | undefined;

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
          console.log('Länderdetails erfolgreich abgerufen:', this.countryDetail.name);
        },
        error: (err) => {
          console.error('Fehler beim Abrufen der Länderdetails:', err);
        }
      });
    }
  }

  protected readonly JSON = JSON;
}
