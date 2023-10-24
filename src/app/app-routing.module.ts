// app-routing.module.ts:
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';  // Ihr Profil-Komponentenpfad
import { CountriesComponent } from './countries/countries.component';
import { CountryDetailComponent } from "./countries/country-detail/country-detail.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from "./services/auth.guard";


const routes: Routes = [
  // Wenn Benutzer nicht eingeloggt ist, wird er zu /login umgeleitet (durch canActivate)
  // Wenn Benutzer eingeloggt ist, wird er auf diese Route zugreifen können
  { path: '', component: ProfileComponent, canActivate: [AuthGuard] },

  // Andere Routen
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'countries/:letter', component: CountriesComponent },
  { path: 'countries/country=:countryKey', component: CountryDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Fallback, wenn keine obigen Routen passen
  { path: '**', redirectTo: '/login' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
