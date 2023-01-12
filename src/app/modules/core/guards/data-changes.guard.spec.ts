import { TestBed } from '@angular/core/testing';

import { DataChangesGuard } from './data-changes.guard';

describe('DataChangesGuard', () => {
  let guard: DataChangesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DataChangesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
