import { Injectable } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Injectable()
export class ResolveDashboardService {

  constructor(public dashboardService: DashboardService) { }

  resolve() {
    return this.dashboardService.getPostList();
  }

}
