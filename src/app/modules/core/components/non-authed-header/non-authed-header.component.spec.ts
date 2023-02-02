import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthedHeaderComponent } from './non-authed-header.component';

describe('NonAuthedHeaderComponent', () => {
  let component: NonAuthedHeaderComponent;
  let fixture: ComponentFixture<NonAuthedHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAuthedHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonAuthedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
