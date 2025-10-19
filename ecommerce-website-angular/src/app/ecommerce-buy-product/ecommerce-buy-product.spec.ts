import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceBuyProduct } from './ecommerce-buy-product';

describe('EcommerceBuyProduct', () => {
  let component: EcommerceBuyProduct;
  let fixture: ComponentFixture<EcommerceBuyProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceBuyProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceBuyProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
