import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ResolveDashboardService } from './services/resolve-dashboard.service';
import { CanActivateUserService } from './../auth/services/can-activate-user.service';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: {
      posts: ResolveDashboardService
    },
    canActivate: [CanActivateUserService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
