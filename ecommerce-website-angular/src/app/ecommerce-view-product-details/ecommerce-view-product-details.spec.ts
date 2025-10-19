import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceViewProductDetails } from './ecommerce-view-product-details';

describe('EcommerceViewProductDetails', () => {
  let component: EcommerceViewProductDetails;
  let fixture: ComponentFixture<EcommerceViewProductDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceViewProductDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceViewProductDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
