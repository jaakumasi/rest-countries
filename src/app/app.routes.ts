import { Routes } from '@angular/router';
import { CountriesComponent } from './components/countries/countries.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/countries', pathMatch: 'full' },
  { path: 'countries', component: CountriesComponent },
  { path: 'country-details/:country', component: CountryDetailsComponent },
];
