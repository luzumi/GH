// app-routing.module.ts:
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';  // Ihr Profil-Komponentenpfad
import { CountriesComponent } from './countries/countries.component';
import {CountryDetailComponent} from "./countries/country-detail/country-detail.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'countries/:letter', component: CountriesComponent },
  { path: 'countries/country=:countryKey', component: CountryDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // weitere Routen können hier hinzugefügt werden
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
