import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceViewAllOrders } from './ecommerce-view-all-orders';

describe('EcommerceViewAllOrders', () => {
  let component: EcommerceViewAllOrders;
  let fixture: ComponentFixture<EcommerceViewAllOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceViewAllOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceViewAllOrders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
