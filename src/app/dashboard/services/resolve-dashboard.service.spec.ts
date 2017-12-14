import { TestBed, inject } from '@angular/core/testing';

import { ResolveDashboardService } from './resolve-dashboard.service';

describe('ResolveDashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveDashboardService]
    });
  });

  it('should be created', inject([ResolveDashboardService], (service: ResolveDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
