import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ResolveAdminService } from './services/resolve-admin.service';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    resolve: {
      adminConfig: ResolveAdminService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
