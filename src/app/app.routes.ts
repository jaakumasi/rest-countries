import { Routes } from '@angular/router';
import { CountriesComponent } from './components/countries/countries-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/countries', pathMatch: 'full' },
  { path: 'countries', component: CountriesComponent },
];
