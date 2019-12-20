import { TestBed } from '@angular/core/testing';

import { ChatdetalleService } from './chatdetalle.service';

describe('ChatdetalleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatdetalleService = TestBed.get(ChatdetalleService);
    expect(service).toBeTruthy();
  });
});
