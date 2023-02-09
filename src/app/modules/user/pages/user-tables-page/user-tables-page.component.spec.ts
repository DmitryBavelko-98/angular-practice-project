import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTablesPageComponent } from './user-tables-page.component';

describe('UserTablesPageComponent', () => {
  let component: UserTablesPageComponent;
  let fixture: ComponentFixture<UserTablesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTablesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTablesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
