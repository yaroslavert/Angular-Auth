import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public notificationService: NotificationService,
    public router: Router
  ) { }

  ngOnInit() {
    this.user = this.fb.group({
      email: [],
      password: []
    });
  }
  onSubmit() {
    this.authService.login(this.user.value)
      .subscribe(
        (response) => {
          this.notificationService.success('success');
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          const message = err.error.message ? err.error.message : 'Error';
          this.notificationService.error(message);
        }
      );
  }
}
