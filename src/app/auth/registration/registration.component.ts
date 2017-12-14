import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public user: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public notificationService: NotificationService,
    public router: Router
  ) { }

  ngOnInit() {
    this.user = this.fb.group({
      firstName: [],
      lastName: [],
      email: [],
      password: []
    });
  }
  onSubmit() {
    this.authService.registration(this.user.value)
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
