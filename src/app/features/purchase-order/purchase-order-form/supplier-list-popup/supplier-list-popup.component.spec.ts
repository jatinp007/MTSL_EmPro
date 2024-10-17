import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierListPopupComponent } from './supplier-list-popup.component';

describe('SupplierListPopupComponent', () => {
  let component: SupplierListPopupComponent;
  let fixture: ComponentFixture<SupplierListPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierListPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
