import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesChargesDetailsComponent } from './taxes-charges-details.component';

describe('TaxesChargesDetailsComponent', () => {
  let component: TaxesChargesDetailsComponent;
  let fixture: ComponentFixture<TaxesChargesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxesChargesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxesChargesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
