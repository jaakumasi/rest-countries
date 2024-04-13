import { TestBed } from '@angular/core/testing';

import { FetchCountriesListService } from './fetch-countries-list.service';

describe('FetchInitialCountriesListService', () => {
  let service: FetchCountriesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchCountriesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
