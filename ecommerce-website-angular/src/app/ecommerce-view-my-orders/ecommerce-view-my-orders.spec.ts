import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceViewMyOrders } from './ecommerce-view-my-orders';

describe('EcommerceViewMyOrders', () => {
  let component: EcommerceViewMyOrders;
  let fixture: ComponentFixture<EcommerceViewMyOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceViewMyOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceViewMyOrders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
