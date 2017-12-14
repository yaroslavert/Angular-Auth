import { AuthService } from './../auth/services/auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from './../redux/redux.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isAuthenticated = false;

  constructor(
    public router: Router,
    public authService: AuthService,
    @Inject(AppStore) public store
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();

    this.store.subscribe(() => {
      this.isAuthenticated = this.authService.isAuthenticated();
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
