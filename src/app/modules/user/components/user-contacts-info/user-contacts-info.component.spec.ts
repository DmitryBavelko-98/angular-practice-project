import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContactsInfoComponent } from './user-contacts-info.component';

describe('UserContactsInfoComponent', () => {
  let component: UserContactsInfoComponent;
  let fixture: ComponentFixture<UserContactsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserContactsInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserContactsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
