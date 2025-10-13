import { TestBed } from '@angular/core/testing';

import { EcommerceProductService } from './ecommerce-product-service';

describe('EcommerceProductService', () => {
  let service: EcommerceProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcommerceProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
