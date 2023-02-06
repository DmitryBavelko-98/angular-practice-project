import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompanyInfoComponent } from './user-company-info.component';

describe('UserCompanyInfoComponent', () => {
  let component: UserCompanyInfoComponent;
  let fixture: ComponentFixture<UserCompanyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCompanyInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCompanyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
