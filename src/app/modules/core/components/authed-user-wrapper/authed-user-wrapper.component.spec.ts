import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthedUserWrapperComponent } from './authed-user-wrapper.component';

describe('AuthedUserWrapperComponent', () => {
  let component: AuthedUserWrapperComponent;
  let fixture: ComponentFixture<AuthedUserWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthedUserWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthedUserWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
