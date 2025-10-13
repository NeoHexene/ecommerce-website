import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceAddNewProduct } from './ecommerce-add-new-product';

describe('EcommerceAddNewProduct', () => {
  let component: EcommerceAddNewProduct;
  let fixture: ComponentFixture<EcommerceAddNewProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceAddNewProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceAddNewProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
