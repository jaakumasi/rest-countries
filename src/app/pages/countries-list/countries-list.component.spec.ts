import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountriesComponent } from './countries-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './components/country/country.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { FetchCountriesListService } from '../../shared/services/fetch-countries-list/fetch-countries-list.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
  let fetchCountriesListServiceMock: any;
  let storeMock: any;

  beforeEach(async () => {
    fetchCountriesListServiceMock = {
      getInitialCountriesList: jest.fn(),
      getCountryQueryList: jest.fn(),
      getFilteredByRegionCountriesList: jest.fn(),
    };

    storeMock = {
      select: jest.fn(() => of({ isDarkTheme: 'false' })),
    };

    await TestBed.configureTestingModule({
      imports: [
        CountriesComponent,
        CountryComponent,
        CountryDetailsComponent,
        CommonModule,
        HttpClientModule,
      ],
      providers: [
        {
          provide: FetchCountriesListService,
          useValue: fetchCountriesListServiceMock,
        },
        { provide: Store, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle initial country list fetch', () => {
    const mockCountries = [{ name: 'Germany' }, { name: 'France' }];
    fetchCountriesListServiceMock.getInitialCountriesList.mockReturnValue(
      of(mockCountries)
    );
    // component.ngOnInit();
    fixture.detectChanges()
    expect(
      fetchCountriesListServiceMock.getInitialCountriesList
    ).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.countries).toEqual(mockCountries);
  });

});

// import {
//   TestBed,
//   fakeAsync,
//   flush,
//   tick,
//   waitForAsync,
// } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { Store } from '@ngrx/store';
// import {
//   MockBuilder,
//   MockProvider,
//   MockRender,
//   MockService,
//   MockedComponentFixture,
//   ngMocks,
// } from 'ng-mocks';
// import { of, throwError } from 'rxjs';
// import { FetchCountriesListService } from '../../shared/services/fetch-countries-list/fetch-countries-list.service';
// import { CountriesComponent } from './countries-list.component';
// import { HttpClientModule } from '@angular/common/http';
// import { ERROR_MESSAGES } from '../../shared/constants';

// describe('CountriesComponent', () => {
//   let fixture: MockedComponentFixture<CountriesComponent>;
//   let component: CountriesComponent;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [CountriesComponent, HttpClientTestingModule],
//       providers: [
//         MockProvider(FetchCountriesListService, {
//           getCountryQueryList: () => throwError(() => new Error()),
//           getInitialCountriesList: () => of([]),
//         }),
//         MockProvider(Store, {
//           select: () => of({ isDarkMode: 'dark' }),
//         }),
//       ],
//     }).compileComponents();

//     fixture = MockRender(CountriesComponent);
//     component = fixture.componentInstance;
//     TestBed.inject(Store);
//     TestBed.inject(FetchCountriesListService);
//     fixture.detectChanges();
//   });

//   it('SHOULD create the COUNTRIES COMPONENT', () => {
//     expect(component).toBeDefined();
//   });

//   it('SHOULD show error message when the search query observable throws an error', waitForAsync(async () => {
//     component.searchField.nativeElement.value = 'gibberish';
//     fixture.detectChanges();
//     await fixture.whenStable();
//     fixture.detectChanges();

//     console.log(component.errorMsg())

//     expect(component.errorMsg()).toBe(ERROR_MESSAGES.TIMEOUT);
//   }));
// });
