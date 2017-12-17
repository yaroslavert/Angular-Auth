import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { BsModalService } from 'ngx-bootstrap';
import { AdminService } from './services/admin.service';
import { ResolveAdminService } from './services/resolve-admin.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  providers: [BsModalService, AdminService, ResolveAdminService],
  declarations: [AdminComponent]
})
export class AdminModule { }
