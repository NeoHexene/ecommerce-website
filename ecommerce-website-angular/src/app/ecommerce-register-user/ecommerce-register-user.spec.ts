import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceRegisterUser } from './ecommerce-register-user';

describe('EcommerceRegisterUser', () => {
  let component: EcommerceRegisterUser;
  let fixture: ComponentFixture<EcommerceRegisterUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceRegisterUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceRegisterUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
