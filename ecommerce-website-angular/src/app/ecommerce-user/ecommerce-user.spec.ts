import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceUser } from './ecommerce-user';

describe('EcommerceUser', () => {
  let component: EcommerceUser;
  let fixture: ComponentFixture<EcommerceUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
