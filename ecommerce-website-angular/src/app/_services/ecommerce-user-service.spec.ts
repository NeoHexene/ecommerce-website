import { TestBed } from '@angular/core/testing';

import { EcommerceUserService } from './ecommerce-user-service';

describe('EcommerceUserService', () => {
  let service: EcommerceUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcommerceUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
