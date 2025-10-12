import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceAdmin } from './ecommerce-admin';

describe('EcommerceAdmin', () => {
  let component: EcommerceAdmin;
  let fixture: ComponentFixture<EcommerceAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
