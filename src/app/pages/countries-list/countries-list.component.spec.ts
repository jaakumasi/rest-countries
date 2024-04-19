import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MockProvider, MockRender, MockedComponentFixture } from 'ng-mocks';
import { of, throwError } from 'rxjs';
import { FetchCountriesListService } from '../../shared/services/fetch-countries-list/fetch-countries-list.service';
import { CountriesComponent } from './countries-list.component';

const MockFetchCountriesListService = MockProvider(FetchCountriesListService, {
  getCountryQueryList: () => throwError(() => new Error()),
});

const MockStore = MockProvider(Store, {
  select: () => of({ isDarkMode: 'dark' }),
});

describe('CountriesComponent', () => {
  let fixture: MockedComponentFixture<CountriesComponent>;
  let component: CountriesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesComponent],
      providers: [MockFetchCountriesListService, MockStore],
    }).compileComponents();

    fixture = MockRender(CountriesComponent);
    component = fixture.point.componentInstance;
  });

  it('SHOULD create the COUNTRIES COMPONENT', () => {
    expect(component).toBeDefined();
  });

  it('SHOULD show error message when the search query observable fails (throws error)', async () => {
    const searchField_input = fixture.debugElement.query(By.css('input'));
    // const spy = jest.spyOn(component, 'onSearchQueryChange');
    searchField_input.triggerEventHandler('input', {
      target: component.searchField//searchField_input.nativeElement,
    });
    searchField_input.nativeElement.value = 'gibberish';

    // expect(spy).toHaveBeenCalledTimes(1);

    // console.log(searchField_input);

    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.showErrorMsg()).toBe(true);
  });
});
