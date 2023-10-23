import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DOCUMENT } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { ProfileComponent } from './profile/profile.component';
import { JsonUserDataService } from './services/json-user-data.service';
import { USER_DATA_SERVICE } from './services/user-data.service';  // Importieren Sie den InjectionToken
import { AppRoutingModule } from './app-routing.module';
import { CountriesComponent } from './countries/countries.component';
import { CountriesService } from './services/features/countries/countries.service';
import { CountryDetailComponent } from './countries/country-detail/country-detail.component';



@NgModule({
  declarations: [
    ContentComponent,
    HeaderComponent,
    AppComponent,
    MenuComponent,
    ProfileComponent,
    CountriesComponent,
    CountryDetailComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    CommonModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    { provide: DOCUMENT, useValue: document },
    { provide: USER_DATA_SERVICE, useClass: JsonUserDataService },  // Verwenden Sie den InjectionToken
    CountriesService,

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
