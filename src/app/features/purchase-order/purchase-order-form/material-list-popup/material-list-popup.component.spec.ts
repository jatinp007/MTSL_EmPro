import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialListPopupComponent } from './material-list-popup.component';

describe('MaterialListPopupComponent', () => {
  let component: MaterialListPopupComponent;
  let fixture: ComponentFixture<MaterialListPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialListPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
