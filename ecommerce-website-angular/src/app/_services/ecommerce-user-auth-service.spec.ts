import { TestBed } from '@angular/core/testing';

import { EcommerceUserAuthService } from './ecommerce-user-auth-service';

describe('EcommerceUserAuthService', () => {
  let service: EcommerceUserAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcommerceUserAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
