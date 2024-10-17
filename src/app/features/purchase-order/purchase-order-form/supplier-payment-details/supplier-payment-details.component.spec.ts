import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPaymentDetailsComponent } from './supplier-payment-details.component';

describe('SupplierPaymentDetailsComponent', () => {
  let component: SupplierPaymentDetailsComponent;
  let fixture: ComponentFixture<SupplierPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierPaymentDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
