import { TestBed } from '@angular/core/testing';

import { ContestProblemService } from './contest-problem.service';

describe('ContestProblemService', () => {
  let service: ContestProblemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestProblemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
