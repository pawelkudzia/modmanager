import { TestBed } from '@angular/core/testing';

import { ModService } from './mod.service';

describe('ModService', () => {
  let service: ModService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
