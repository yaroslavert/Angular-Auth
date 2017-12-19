import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  public submited: Boolean = false;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public notificationService: NotificationService,
    public router: Router
  ) { }

  ngOnInit() {
    this.user = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit() {
    this.submited = true;

    if (this.user.invalid) {
      this.notificationService.warning('please check you form');
      return;
    }

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
