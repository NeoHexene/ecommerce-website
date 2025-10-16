import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceDisplayProductImages } from './ecommerce-display-product-images';

describe('EcommerceDisplayProductImages', () => {
  let component: EcommerceDisplayProductImages;
  let fixture: ComponentFixture<EcommerceDisplayProductImages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceDisplayProductImages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceDisplayProductImages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
