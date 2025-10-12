import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceHome } from './ecommerce-home';

describe('EcommerceHome', () => {
  let component: EcommerceHome;
  let fixture: ComponentFixture<EcommerceHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
