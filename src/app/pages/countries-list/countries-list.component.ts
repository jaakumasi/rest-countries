import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, fromEvent } from 'rxjs';
import { ERROR_MESSAGES } from '../../shared/constants';
import { Country } from '../../shared/interfaces';
import { FetchCountriesListService } from '../../shared/services/fetch-countries-list/fetch-countries-list.service';
import { SharedState } from '../../shared/store/store.state';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { CountryComponent } from './components/country/country.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [
    CommonModule,
    CountryComponent,
    CountryDetailsComponent,
    HttpClientModule,
  ],
  templateUrl: './countries-list.component.html',
  styleUrl: './countries-list.component.scss',
  providers: [FetchCountriesListService],
})
export class CountriesComponent implements OnInit, AfterViewInit {
  @ViewChild('searchField') searchField!: ElementRef;

  store = inject(Store);
  fetchCountries = inject(FetchCountriesListService);

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
  isLoading = signal<boolean>(true);
  isTimedOut = signal<boolean>(false);
  showErrorMsg = signal<boolean>(false);
  errorMsg = signal<string>(''); // timeout or empty list msg
  countries: Country[] = [];

  requestTimeout = () =>
    setTimeout(() => {
      if (this.countries.length === 0) {
        this.isLoading.set(false);
        this.isTimedOut.set(true);
      }
    }, 15000);

  ngOnInit(): void {
    this.onRequestStart();

    this.fetchCountries.getInitialCountriesList().subscribe({
      next: (list) => {
        this.onRequestResolved(list);
      },
      error: (error: Error) => console.log(error.message),
    });
  }

  ngAfterViewInit(): void {
    /* subscribel to search query input changes */
    fromEvent(this.searchField.nativeElement, 'input')
      .pipe(
        // filter(() => this.searchField.nativeElement.value !== ''),
        debounceTime(1000)
      )
      .subscribe(() => {
        this.onRequestStart();

        const query = this.searchField.nativeElement.value;
        if (query === '') {
          this.fetchCountries
            .getInitialCountriesList()
            .subscribe((list) => this.onRequestResolved(list));
        } else {
          this.fetchCountries
            .getCountryQueryList(query)
            .subscribe((matches) => this.onRequestResolved(matches));
        }
      });
  }

  onShowfilterByRegionOptions() {
    this.showfilterByRegionOptions()
      ? this.showfilterByRegionOptions.set(false)
      : this.showfilterByRegionOptions.set(true);
  }

  onFilterOption(filterOption: string) {
    this.onRequestStart();

    this.fetchCountries
      .getFilteredByRegionCountriesList(filterOption)
      .subscribe({
        next: (list) => {
          this.onRequestResolved(list);
        },
      });
  }

  /* handles switching to selected country details mode */
  onCountryClick(countryIndex: number) {
    console.log(countryIndex);
  }

  onRequestStart() {
    this.isTimedOut.set(false);
    this.isLoading.set(true);
    this.requestTimeout();
  }

  onRequestResolved(list: Country[]) {
    clearTimeout(this.requestTimeout());
    if (list.length !== 0) this.countries = list;
    else {
      this.errorMsg.set(ERROR_MESSAGES.EMPTY_LIST);
      this.showErrorMsg.set(true);
    }
    this.isLoading.set(false);
  }
}
