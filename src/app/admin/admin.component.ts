import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AdminService } from './services/admin.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public modalRef: BsModalRef;
  public modalCommentRef: BsModalRef;

  @ViewChild('modalTemplate') public modalTemplate: TemplateRef<any>;
  @ViewChild('modalTemplateComment') public modalTemplateComment: TemplateRef<any>;

  public modelData: FormGroup;
  public modalCommentData: FormGroup;
  public modalSubmited: Boolean = false;
  public modalCommentSubmited: Boolean = false;

  public posts: any;
  public users: any;
  public usersSelect: FormControl;

  public modalPost: any;
  public modalMode: string;

  public modalСommentPost: any;
  public modalСomment: any;
  public modalCommentMode: string;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private adminService: AdminService,
    private notificationService: NotificationService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.usersSelect = new FormControl();
    this.modelData = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]]
    });
    this.modalCommentData = this.fb.group({
      message: ['', [Validators.required]]
    });

    this.route.data.subscribe((data) => {
      const users = data.adminConfig.users.map(item => {
        return {
          name: `${item.firstName} ${item.lastName}`,
          value: item.id
        };
      });
      this.users = [{name: 'All', value: 0}, ...users];
      this.usersSelect.setValue(this.users[0].value);
      this.posts = data.adminConfig.posts;
    });

    this.usersSelect.valueChanges
      .subscribe(value => {
        this.loadPostByUserId(value);
      });

    this.modalService.onHidden
      .subscribe(() => {
        this.modalSubmited = false;
        this.modalCommentSubmited = false;
      });
  }

  addPost() {
    this.modelData.reset();
    this.modalMode = 'create';
    this.modalRef = this.modalService.show(this.modalTemplate, {class: 'admin-model'});
  }

  _addPost() {
    this.adminService.addPost(this.modelData.value)
      .subscribe(
        (post) => {
          this.posts.push(post);
          this.notificationService.success('Post added');
          this.modalRef.hide();
        }, (err) => {
          this.notificationService.error('error Add Post');
          this.modalRef.hide();
        }
      );
  }
  editPost(post) {
    this.modalMode = 'update';
    this.modalPost = post;
    this.modelData.patchValue(this.modalPost);
    this.modalRef = this.modalService.show(this.modalTemplate, {class: 'admin-model'});
  }
  _editPost() {
    const newPost = Object.assign({}, this.modalPost, this.modelData.value);
    this.adminService.updatePost(newPost)
      .subscribe(
        () => {
          this.posts[this.posts.indexOf(this.modalPost)] = newPost;
          this.notificationService.success('Post updated');
          this.modalRef.hide();
        }, (err) => {
          this.notificationService.error('error Post upate');
          this.modalRef.hide();
       }
    );
  }
  removePost(post) {
    this.adminService.removePost(post)
      .subscribe(
        () => {
          this.posts.splice(this.posts.indexOf(post), 1);
          this.notificationService.success('Post was deleted');
        }, (err) => {
          console.log('err', err);
          this.notificationService.error('error');
        }
      );
  }
  addComment(post) {
    this.modalCommentData.reset();
    this.modalСommentPost = post;
    this.modalCommentMode = 'create';
    this.modalCommentRef = this.modalService.show(this.modalTemplateComment, {class: 'admin-model'});
  }
  _addComment() {
    const postId = this.modalСommentPost.id;
    this.adminService.addComment(Object.assign({}, this.modalCommentData.value, { PostId: postId}))
      .subscribe(
        (comment) => {
          this.modalСommentPost.Comments.push(comment);
          this.notificationService.success('Comment added');
          this.modalCommentRef.hide();
        }, (err) => {
          this.notificationService.error('error');
          this.modalCommentRef.hide();
        }
      );
  }
  editComment(comment, post) {
    this.modalCommentMode = 'update';
    this.modalСommentPost = post;
    this.modalСomment = comment;
    this.modalCommentData.patchValue(this.modalСomment);
    this.modalCommentRef = this.modalService.show(this.modalTemplateComment, {class: 'admin-model'});
  }
  _editComment() {
    const newComment = Object.assign({}, this.modalСomment, this.modalCommentData.value);
    this.adminService.updateComment(newComment)
      .subscribe(
        () => {
          this.modalСommentPost.Comments[this.modalСommentPost.Comments.indexOf(this.modalСomment)] = newComment;
          this.notificationService.success('Comment updated');
          this.modalCommentRef.hide();
        }, (err) => {
          this.notificationService.error('error');
          this.modalCommentRef.hide();
       }
    );
  }
  removeComment(comment, post) {
    this.adminService.removeComment(comment)
      .subscribe(
        () => {
          post.Comments.splice(post.Comments.indexOf(comment), 1);
          this.notificationService.success('Comments was deleted');
        }, (err) => {
          console.log('err', err);
          this.notificationService.error('error');
        }
      );
  }

  onModelSubmit() {
    this.modalSubmited = true;
    if (this.modelData.invalid) {
      this.notificationService.warning('Please check you form:)');
      return;
    }

    if (this.modalMode === 'create') {
      this._addPost();
    } else if (this.modalMode === 'update') {
      this._editPost();
    }

  }
  onModelCommentSubmit() {
    this.modalCommentSubmited = true;
    if (this.modalCommentData.invalid) {
      this.notificationService.warning('Please check you form:)');
      return;
    }

    if (this.modalCommentMode === 'create') {
      this._addComment();
    } else if (this.modalCommentMode === 'update') {
      this._editComment();
    }

  }
  loadPostByUserId(id) {
    this.adminService.getPostByUserId(id)
      .subscribe(
        (posts) => {
          this.posts = posts;
        },
        (err) => {
          this.notificationService.error('error load posts');
        }
      );
  }
}
