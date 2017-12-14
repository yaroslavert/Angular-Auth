import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class NotificationService {

  constructor(public toastr: ToastsManager) { }
  register(vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  success(message) {
    this.toastr.success(message);
  }
  warning(message) {
    this.toastr.warning(message);
  }
  error(message) {
    this.toastr.error(message);
  }

}
