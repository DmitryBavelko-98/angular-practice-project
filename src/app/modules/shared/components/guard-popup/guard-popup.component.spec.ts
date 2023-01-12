import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardPopupComponent } from './guard-popup.component';

describe('GuardPopupComponent', () => {
  let component: GuardPopupComponent;
  let fixture: ComponentFixture<GuardPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
