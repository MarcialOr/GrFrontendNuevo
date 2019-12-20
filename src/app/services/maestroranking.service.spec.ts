import { TestBed } from '@angular/core/testing';

import { MaestrorankingService } from './maestroranking.service';

describe('MaestrorankingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaestrorankingService = TestBed.get(MaestrorankingService);
    expect(service).toBeTruthy();
  });
});
