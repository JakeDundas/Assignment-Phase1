import { TestBed } from '@angular/core/testing';

import { NavbarUpdaterService } from './navbar-updater.service';

describe('NavbarUpdaterService', () => {
  let service: NavbarUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
