import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceShowProductDetails } from './ecommerce-show-product-details';

describe('EcommerceShowProductDetails', () => {
  let component: EcommerceShowProductDetails;
  let fixture: ComponentFixture<EcommerceShowProductDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceShowProductDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceShowProductDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
