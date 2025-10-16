import { TestBed } from '@angular/core/testing';

import { EcommerceImageProcessingService } from './ecommerce-image-processing-service';

describe('EcommerceImageProcessingService', () => {
  let service: EcommerceImageProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcommerceImageProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
