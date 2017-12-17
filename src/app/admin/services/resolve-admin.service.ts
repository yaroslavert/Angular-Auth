import { Injectable } from '@angular/core';
import { AdminService } from './admin.service';

@Injectable()
export class ResolveAdminService {

  constructor(public adminService: AdminService) { }

  resolve() {
    return this.adminService.getAdminConfig();
  }

}
