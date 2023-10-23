// app-routing.module.ts:
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';  // Ihr Profil-Komponentenpfad
import { CountriesComponent } from './countries/countries.component';
import {CountryDetailComponent} from "./countries/country-detail/country-detail.component";  // Ihr Profil-Komponentenpfad

const routes: Routes = [
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'countries/:letter', component: CountriesComponent },
  { path: 'countries/country=:countryKey', component: CountryDetailComponent }

  // weitere Routen können hier hinzugefügt werden
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
