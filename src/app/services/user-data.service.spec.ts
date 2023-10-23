import { TestBed } from '@angular/core/testing';
import { UserDataService } from './user-data.service';
import {JsonUserDataService} from "./json-user-data.service";


describe('UserDataService', () => {
  let service: UserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonUserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
