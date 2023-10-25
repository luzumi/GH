import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { CountriesComponent } from './countries/countries.component';
import { CountryDetailComponent } from "./countries/country-detail/country-detail.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from "./services/auth.guard";
import {LogoutComponent} from "./logout/logout.component";

const routes: Routes = [
  { path: '', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'countries', component: CountriesComponent, canActivate: [AuthGuard] },
  { path: 'countries/:letter', component: CountriesComponent, canActivate: [AuthGuard] },
  { path: 'countries/country=:countryKey', component: CountryDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent }

  // { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
