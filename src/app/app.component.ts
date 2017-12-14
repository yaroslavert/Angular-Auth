import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    public vrc: ViewContainerRef,
    public notificationService: NotificationService
  ) {

  }
  ngOnInit() {
    this.notificationService.register(this.vrc);
  }

}
