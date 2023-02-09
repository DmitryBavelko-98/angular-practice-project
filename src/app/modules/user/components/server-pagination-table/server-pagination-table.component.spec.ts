import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerPaginationTableComponent } from './server-pagination-table.component';

describe('ServerPaginationTableComponent', () => {
  let component: ServerPaginationTableComponent;
  let fixture: ComponentFixture<ServerPaginationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerPaginationTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerPaginationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
