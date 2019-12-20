import { TestBed } from '@angular/core/testing';

import { MenuSideBarService } from './menu-side-bar.service';

describe('MenuSideBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuSideBarService = TestBed.get(MenuSideBarService);
    expect(service).toBeTruthy();
  });
});
