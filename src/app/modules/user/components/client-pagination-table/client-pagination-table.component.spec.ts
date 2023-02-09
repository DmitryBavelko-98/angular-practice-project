import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPaginationTableComponent } from './client-pagination-table.component';

describe('ClientPaginationTableComponent', () => {
  let component: ClientPaginationTableComponent;
  let fixture: ComponentFixture<ClientPaginationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPaginationTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientPaginationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
