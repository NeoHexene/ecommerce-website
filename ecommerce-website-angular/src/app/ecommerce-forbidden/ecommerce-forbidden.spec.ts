import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceForbidden } from './ecommerce-forbidden';

describe('EcommerceForbidden', () => {
  let component: EcommerceForbidden;
  let fixture: ComponentFixture<EcommerceForbidden>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceForbidden]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceForbidden);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
