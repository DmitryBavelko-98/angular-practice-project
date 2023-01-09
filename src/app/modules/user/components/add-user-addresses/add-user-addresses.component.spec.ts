import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserAddressesComponent } from './add-user-addresses.component';

describe('AddUserAddressesComponent', () => {
  let component: AddUserAddressesComponent;
  let fixture: ComponentFixture<AddUserAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserAddressesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
