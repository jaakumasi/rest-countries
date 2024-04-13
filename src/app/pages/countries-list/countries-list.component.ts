import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedState } from '../../shared/store/store.state';
import { Observable } from 'rxjs';
import { CountryComponent } from './components/country/country.component';
import { CountryDetailsComponent } from '../country-details/country-details.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, CountryComponent, CountryDetailsComponent],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss',
})
export class CountriesComponent {
  store = inject(Store);
  state$: Observable<SharedState> = this.store.select('toggleThemeReducer');
  showfilterByRegionOptions = signal<boolean>(false);
  showSelectedCountryDetails = signal<boolean>(false);
  filterByRegionOptions = signal<string[]>([
    'Africa',
    'America',
    'Asia',
    'Europe',
    'Oceania',
  ]);

  onShowfilterByRegionOptions() {
    this.showfilterByRegionOptions()
      ? this.showfilterByRegionOptions.set(false)
      : this.showfilterByRegionOptions.set(true);
  }

  onFilterOption(filterOption: string) {}

  onCountryClick(countryIndex: number) {
    console.log(countryIndex);
  }
}
