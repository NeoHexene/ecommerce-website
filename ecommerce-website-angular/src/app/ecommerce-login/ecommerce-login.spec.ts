import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceLogin } from './ecommerce-login';

describe('EcommerceLogin', () => {
  let component: EcommerceLogin;
  let fixture: ComponentFixture<EcommerceLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
