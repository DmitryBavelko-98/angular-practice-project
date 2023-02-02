import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthedUserWrapperComponent } from './non-authed-user-wrapper.component';

describe('NonAuthedUserWrapperComponent', () => {
  let component: NonAuthedUserWrapperComponent;
  let fixture: ComponentFixture<NonAuthedUserWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAuthedUserWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonAuthedUserWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
