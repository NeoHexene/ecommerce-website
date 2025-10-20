import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceOrderConfirmation } from './ecommerce-order-confirmation';

describe('EcommerceOrderConfirmation', () => {
  let component: EcommerceOrderConfirmation;
  let fixture: ComponentFixture<EcommerceOrderConfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceOrderConfirmation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceOrderConfirmation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
