import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule, DOCUMENT} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {HeaderComponent} from './header/header.component';
import {ContentComponent} from './content/content.component';
import {ProfileComponent} from './profile/profile.component';
import {USER_DATA_SERVICE} from './services/user-data.service';  // Importieren Sie den InjectionToken
import {AppRoutingModule} from './app-routing.module';
import {CountriesComponent} from './countries/countries.component';
import {CountriesService} from './services/features/countries/countries.service';
import {CountryDetailComponent} from './countries/country-detail/country-detail.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthService} from "./auth.service";
import {ServerUserDataService} from "./services/server-user-data.service";
import {LogoutComponent} from "./logout/logout.component";
import { CountriesTableComponent } from './countries/countries-table/countries-table.component';


@NgModule({
    declarations: [
        ContentComponent,
        HeaderComponent,
        AppComponent,
        MenuComponent,
        ProfileComponent,
        CountriesComponent,
        CountryDetailComponent,
        LoginComponent,
        RegisterComponent,
        LogoutComponent,
        CountriesTableComponent,

    ],
    imports: [
        NgbModule,
        BrowserModule,
        CommonModule,
        NgbModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        {provide: DOCUMENT, useValue: document},
        {provide: USER_DATA_SERVICE, useClass: ServerUserDataService},  // Verwenden Sie den InjectionToken
        CountriesService,
        [AuthService],

    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
