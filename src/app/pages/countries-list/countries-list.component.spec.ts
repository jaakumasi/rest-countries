import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountriesComponent } from './countries-list.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ERROR_MESSAGES, REST_COUNTRIES_API } from '../../shared/constants';

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountriesComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should show error message when search query returns error, show timeout message when request takes too long, show country list and hide details page when showSelectedCountryDetails is false, show country details and hide country list when showSelectedCountryDetails is true', () => {
    // Test that the error message is shown appropriately when the return of the search query returns an error
    const query = 'error';
    component.onSearchQueryChange(query);

    const req = httpMock.expectOne(
      `${REST_COUNTRIES_API}/name/${query}?fields=name,capital,currencies,languages,flag`
    );
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });

    fixture.detectChanges();

    expect(component.showErrorMsg).toBeTruthy();
    expect(component.errorMsg).toBe('Error');

    // Test that the timeout message is shown appropriately when a timeout occurs
    component.onRequestStart();

    setTimeout(() => {
      component.onRequestResolved([]);
      fixture.detectChanges();

      expect(component.showErrorMsg).toBeTruthy();
      expect(component.errorMsg).toBe(ERROR_MESSAGES.TIMEOUT);
    }, 5001);

    // Test that the country list is shown and the details page is hidden when showSelectedCountryDetails is false
    component.showSelectedCountryDetails.set(false);
    fixture.detectChanges();

    const countryListElement = fixture.nativeElement.querySelector(
      '.countries-list-container'
    );
    const countryDetailsElement =
      fixture.nativeElement.querySelector('.country-details');

    expect(countryListElement).toBeDefined();
    expect(countryDetailsElement).toBeNull();

    // Test that the details page is shown and the country list is hidden when showSelectedCountryDetails is true
    component.showSelectedCountryDetails.set(true);
    fixture.detectChanges();

    const countryListElement2 = fixture.nativeElement.querySelector(
      '.countries-list-container'
    );
    const countryDetailsElement2 =
      fixture.nativeElement.querySelector('.country-details');

    expect(countryListElement2).toBeNull();
    expect(countryDetailsElement2).toBeDefined();
  });
});
