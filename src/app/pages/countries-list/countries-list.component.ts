import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subscription,
  TimeoutInfo,
  debounceTime,
  fromEvent,
} from 'rxjs';
import { ERROR_MESSAGES, LOCAL_STORAGE_KEY } from '../../shared/constants';
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
export class CountriesComponent implements OnInit, AfterViewChecked {
  @ViewChild('searchField') searchField!: ElementRef;
  searchFieldSubscription?: Subscription;

  state$: Observable<SharedState> = inject(Store).select('toggleThemeReducer');
  fetchCountries = inject(FetchCountriesListService);

  showfilterByRegionOptions = signal<boolean>(false);
  showSelectedCountryDetails = signal<boolean>(false);
  filterByRegionOptions = signal<string[]>([
    'Africa',
    'America',
    'Asia',
    'Europe',
    'Oceania',
  ]);
  isLoading = signal<boolean>(false);
  showErrorMsg = signal<boolean>(false);
  errorMsg = signal<string>(''); // timeout or empty list msg
  countries: Country[] = [];
  selectedCountryIndex = signal<number>(0);
  selectedCountryDetails = signal<Country | undefined>(undefined);

  requestTimeout = () =>
    setTimeout(() => {
      if (this.countries.length === 0) {
        this.isLoading.set(false);
        this.errorMsg.set(ERROR_MESSAGES.TIMEOUT);
        this.showErrorMsg.set(true);
      }
    }, 15000);

  ngOnInit(): void {
    this.loadSession();
    // console.log(this.countries)
    if (this.countries.length === 0) {
      this.onRequestStart();

      this.fetchCountries.getInitialCountriesList().subscribe({
        next: (list) => {
          console.log(list);
          this.onRequestResolved(list);
        },
      });
    }
  }

  ngAfterViewChecked(): void {
    // console.log('changed')
    // console.log('sub: ', this.searchFieldSubscription);
    // if (!this.searchFieldSubscription) {
    // this.searchFieldSubscription = fromEvent(
    //   this.searchField?.nativeElement,
    //   'input'
    // )
    //   .pipe(debounceTime(1000))
    //   .subscribe(() => {
    //     this.onRequestStart();
    //     const query = this.searchField.nativeElement.value;
    //     /* fetch initial countries list if the query is empty */
    //     if (query === '') {
    //       this.fetchCountries
    //         .getInitialCountriesList()
    //         .subscribe((list) => this.onRequestResolved(list));
    //     } else {
    //       this.fetchCountries.getCountryQueryList(query).subscribe({
    //         next: (matches) => this.onRequestResolved(matches as Country[]),
    //         error: () => this.onRequestResolved([], ERROR_MESSAGES.NOT_FOUND),
    //       });
    //     }
    //   });
    // }
  }

  debounceTimeoutId: any;
  handleInput(event: Event) {
    clearTimeout(this.debounceTimeoutId);

    this.debounceTimeoutId = setTimeout(() => {
      this.onRequestStart();
      const query = this.searchField.nativeElement.value;
      /* fetch initial countries list if the query is empty */
      if (query === '') {
        this.fetchCountries
          .getInitialCountriesList()
          .subscribe((list) => this.onRequestResolved(list));
      } else {
        this.fetchCountries.getCountryQueryList(query).subscribe({
          next: (matches) => this.onRequestResolved(matches as Country[]),
          error: () => this.onRequestResolved([], ERROR_MESSAGES.NOT_FOUND),
        });
      }
    }, 1000);
  }

  // ngOnDestroy(): void {
  //   this.searchFieldSubscription?.unsubscribe();
  // }

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
          this.onRequestResolved(list as Country[]);
        },
      });
  }

  /* handles switching to selected country details view */
  onCountryClick(countryIndex: number) {
    this.selectedCountryIndex.set(countryIndex);
    this.selectedCountryDetails.set(
      this.countries[this.selectedCountryIndex()]
    );
    this.showSelectedCountryDetails.set(true);
    this.saveSession(false, true, true);
  }

  onCloseDetailsView() {
    this.showSelectedCountryDetails.set(false);
    this.saveSession(false, true, false);
  }

  onUpdateSelectedCountryDetails(selectedCountry: Country) {
    this.selectedCountryDetails.set(selectedCountry);
    this.saveSession(false, false, true);
  }

  onRequestStart() {
    this.showErrorMsg.set(false);
    this.isLoading.set(true);
    this.requestTimeout();
  }

  /* when called with a message means there's an error*/
  onRequestResolved(list: Country[], msg?: string) {
    clearTimeout(this.requestTimeout());
    this.isLoading.set(false);

    if (msg) {
      this.errorMsg.set(msg);
      this.showErrorMsg.set(true);
      return;
    }
    this.showErrorMsg.set(false);
    this.countries = list;

    this.saveSession(list, false, false);
  }

  loadSession() {
    const sessionList = localStorage.getItem(LOCAL_STORAGE_KEY.LIST);
    const showDetails = localStorage.getItem(LOCAL_STORAGE_KEY.SHOW_DETAILS);
    const selectedCountryDetails = localStorage.getItem(
      LOCAL_STORAGE_KEY.SELECTED_COUNTRY_DETAILS
    );

    if (sessionList) {
      this.countries = JSON.parse(sessionList);
      this.isLoading.set(false);
    }
    if (selectedCountryDetails)
      this.selectedCountryDetails.set(JSON.parse(selectedCountryDetails));
    if (showDetails && selectedCountryDetails)
      this.showSelectedCountryDetails.set(JSON.parse(showDetails));
  }

  /* 
    handles all session saves:
        - countries list | details view state | selected country details.
    which session data gets saved depends on the boolean vals passed
  */
  saveSession(
    list: Country[] | boolean,
    showDetails: boolean,
    selectedCountryDetails: boolean
  ) {
    if (list && this.searchField.nativeElement.value === '')
      localStorage.setItem(LOCAL_STORAGE_KEY.LIST, JSON.stringify(list));
    if (showDetails)
      localStorage.setItem(
        LOCAL_STORAGE_KEY.SHOW_DETAILS,
        JSON.stringify(this.showSelectedCountryDetails())
      );
    if (selectedCountryDetails) {
      console.log('selected details: ', this.selectedCountryDetails());
      localStorage.setItem(
        LOCAL_STORAGE_KEY.SELECTED_COUNTRY_DETAILS,
        JSON.stringify(this.selectedCountryDetails())
      );
    }
    // if (typeof selectedCountryIndex === 'boolean')
    //   localStorage.setItem(
    //     LOCAL_STORAGE_KEY.SELECTED_COUNTRY_INDEX,
    //     JSON.stringify(this.selectedCountryIndex())
    //   );
  }
}
