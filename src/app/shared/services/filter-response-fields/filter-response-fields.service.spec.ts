import { TestBed } from '@angular/core/testing';

import { FilterResponseFieldsService } from './filter-response-fields.service';

describe('FilterResponseFieldsService', () => {
  let service: FilterResponseFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterResponseFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
