import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AdminService } from './services/admin.service';
import { NotificationService } from '../services/notification.service';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public modalRef: BsModalRef;
  public modalCommentRef: BsModalRef;

  public modelData: FormGroup;
  public modalCommentData: FormGroup;

  public posts: any;
  public users: any;
  public usersSelect: FormControl;

  public modalPost: any;
  public linkModalPost: any;
  public modalMode: string;

  public modalСomment: any;
  public linkModalComment: any;
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
        }
      });
      this.users = [{name: 'All', value: 0}, ...users];
      this.usersSelect.setValue(this.users[0].value);
      this.posts = data.adminConfig.posts;
    });

    this.usersSelect.valueChanges
      .subscribe(value => {
        console.log('v', value);
        this.loadPostByUserId(value);
      })

  }
  openModal(template: TemplateRef<any>, mode: string, post: any) {
    this.modalMode = mode || 'create';
    if (this.modalMode === 'create') {
      this.modelData.reset();
    }
    if (this.modalMode != 'create' && post) {
      this.linkModalPost = post;
      this.modalPost = Object.assign({}, post);
      this.modelData.get('title').setValue(this.modalPost.title);
      this.modelData.get('body').setValue(this.modalPost.body);
    }
    this.modalRef = this.modalService.show(template, {class: 'admin-model'});
  }
  openModalComment(template: TemplateRef<any>, mode: string, comment: any, postId: string) {
    this.modalCommentMode = mode || 'create';
    if (this.modalCommentMode === 'create') {
      this.modalCommentData.reset();
    }
    if (this.modalCommentMode != 'create' && comment && postId) {
      comment.PostId = postId;
      this.linkModalComment = comment;
      this.modalСomment = Object.assign({}, comment);
      this.modalCommentData.get('message').setValue(this.modalСomment.message);
    }
    this.modalCommentRef = this.modalService.show(template, {class: 'admin-model'});
  }
  onModelSubmit() {
    if (this.modelData.invalid) {
      this.notificationService.warning('Please check you form:)');
      return;
    }

    if (this.modalMode === 'create') {
      this.addPost();
    } else if (this.modalMode === 'update') {
      this.updatePost();
    }

  }
  onModelCommentSubmit(){
    if (this.modalCommentData.invalid) {
      this.notificationService.warning('Please check you form:)');
      return;
    }

    if (this.modalCommentMode === 'create') {
      this.addComment();
    } else if (this.modalCommentMode === 'update') {
      this.updateComment();
    }

  }
  loadPostByUserId(id) {
    this.adminService.getPostByUserId(id)
      .subscribe(
        (posts) => {
          console.log('post', posts);
          this.posts = posts
        },
        (err) => {
          this.notificationService.error('error load posts');
        }
      )
  } 
  addPost() {
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
      )
  }
  addComment() {
    console.log('linkModalComment', this.modalСomment);
    return;
  

    // this.adminService.addComment(Object.assign({}, this.linkModalComment, this.modalCommentData.value))
    //   .subscribe(
    //     (post) => {
    //       // this.posts.push(post);
    //       this.notificationService.success('Comment added');
    //       // this.modalRef.hide();
    //     }, (err) => {
    //       this.notificationService.error('error Add Comment');
    //       this.modalRef.hide();
    //     }
    //   )
  }
  updatePost() {
    const newPost = Object.assign({}, this.modalPost, this.modelData.value);
    this.adminService.updatePost(newPost)
      .subscribe(
        (post) => {
          this.posts[this.posts.indexOf(this.linkModalPost)] = Object.assign({}, this.linkModalPost, post);
          this.notificationService.success('Post updated');
          this.modalRef.hide();
        }, (err) => {
          this.notificationService.error('error Post upate');
          this.modalRef.hide();
        }
      )
  }
  updateComment(){

  }
  removePost(post) {
    this.adminService.removePost(post)
      .subscribe(
        () => {
          this.posts.splice(this.posts.indexOf(post), 1);
          this.notificationService.success('Post was deleted');
        }, (err) => {
          console.log('err', err);
          this.notificationService.error('error Delete Post upate');
        }
      )
  }
  removeComment(comment) {

  }
}
