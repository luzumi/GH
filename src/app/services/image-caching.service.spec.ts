import { TestBed } from '@angular/core/testing';

import { ImageCachingService } from './image-caching.service';

describe('ImageCachingService', () => {
  let service: ImageCachingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageCachingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
