import { TestBed } from '@angular/core/testing';

import { HistoricotrabajoService } from './historicotrabajo.service';

describe('HistoricotrabajoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistoricotrabajoService = TestBed.get(HistoricotrabajoService);
    expect(service).toBeTruthy();
  });
});
