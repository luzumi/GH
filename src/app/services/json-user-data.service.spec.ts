import { TestBed } from '@angular/core/testing';

import { JsonUserDataService } from './json-user-data.service';

describe('JsonUserDataService', () => {
  let service: JsonUserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonUserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
