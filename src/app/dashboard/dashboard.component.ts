import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from './services/dashboard.service';
import { AuthService } from '../auth/services/auth.service';
import { NotificationService } from './../services/notification.service';
import { User } from '../auth/interfaces/auth.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public posts: any[];
  public commentData: FormGroup;

  constructor(
    public route: ActivatedRoute,
    public fb: FormBuilder,
    public dashboardService: DashboardService,
    public authService: AuthService,
    public notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.posts = data.posts;
      this.commentData = this.fb.group({
        message: ['', [Validators.required]]
      });
    });
  }

  onSubmit(post) {
    const user: User = this.authService.getUser();
    const message = this.commentData.value.message;

    const commentBody = {
      PostId: post.id,
      UserId: user.id,
      message
    };

    this.dashboardService.addCommentToPost(commentBody)
      .subscribe(
        (comment) => {
          post.Comments.push(comment);
          this.commentData.reset();
          this.notificationService.success('Comment was added');
        }, (err) => {
          this.notificationService.error('Error');
          console.log('error', err);
        }
      );

  }

}
