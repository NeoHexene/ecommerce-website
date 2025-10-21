import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceCartDetails } from './ecommerce-cart-details';

describe('EcommerceCartDetails', () => {
  let component: EcommerceCartDetails;
  let fixture: ComponentFixture<EcommerceCartDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceCartDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceCartDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
