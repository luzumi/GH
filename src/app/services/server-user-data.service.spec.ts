import { TestBed } from '@angular/core/testing';


import {ServerUserDataService} from "./server-user-data.service";
import {JsonUserDataService} from "./json-user-data.service";

describe('ServerUserDataService', () => {
  let service: ServerUserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerUserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
