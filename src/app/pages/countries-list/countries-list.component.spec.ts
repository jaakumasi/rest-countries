import {
  TestBed,
  fakeAsync,
  flush,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import {
  MockBuilder,
  MockProvider,
  MockRender,
  MockService,
  MockedComponentFixture,
  ngMocks,
} from 'ng-mocks';
import { of, throwError } from 'rxjs';
import { FetchCountriesListService } from '../../shared/services/fetch-countries-list/fetch-countries-list.service';
import { CountriesComponent } from './countries-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ERROR_MESSAGES } from '../../shared/constants';

describe('CountriesComponent', () => {
  let fixture: MockedComponentFixture<CountriesComponent>;
  let component: CountriesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesComponent, HttpClientTestingModule],
      providers: [
        MockProvider(FetchCountriesListService, {
          getCountryQueryList: () => throwError(() => new Error()),
          getInitialCountriesList: () => of([]),
        }),
        MockProvider(Store, {
          select: () => of({ isDarkMode: 'dark' }),
        }),
      ],
    }).compileComponents();

    fixture = MockRender(CountriesComponent);
    component = fixture.componentInstance;
    TestBed.inject(Store);
    TestBed.inject(FetchCountriesListService);
    fixture.detectChanges();
  });

  it('SHOULD create the COUNTRIES COMPONENT', () => {
    expect(component).toBeDefined();
  });

  it('SHOULD show error message when the search query observable throws an error', waitForAsync(async () => {
    component.searchField.nativeElement.value = 'gibberish';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.errorMsg()).toEqual(ERROR_MESSAGES.NOT_FOUND);
  }));
});
