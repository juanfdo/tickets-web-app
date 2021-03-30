import { TestBed } from '@angular/core/testing';

import { ApiBuyersService } from './api-buyers.service';

describe('ApiBuyersService', () => {
  let service: ApiBuyersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBuyersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
