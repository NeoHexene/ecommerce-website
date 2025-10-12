import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceHeader } from './ecommerce-header';

describe('EcommerceHeader', () => {
  let component: EcommerceHeader;
  let fixture: ComponentFixture<EcommerceHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
