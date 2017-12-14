import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './services/dashboard.service';
import { ResolveDashboardService } from './services/resolve-dashboard.service';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
  providers: [ResolveDashboardService, DashboardService],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
