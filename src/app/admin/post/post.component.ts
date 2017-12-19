import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input('post') public post;
  @Output() public edit: EventEmitter<any> = new EventEmitter();
  @Output() public remove: EventEmitter<any> = new EventEmitter();
  @Output() public addComment: EventEmitter<any> = new EventEmitter();
  @Output() public OnRemoveComment: EventEmitter<any> = new EventEmitter();
  @Output() public OnEditComment: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  editPost() {
    this.edit.emit();
  }
  removePost() {
    this.remove.emit();
  }
  _addComment() {
    this.addComment.emit();
  }
  _removeComment(comment) {
    this.OnRemoveComment.emit(comment);
  }
  _editComment(comment) {
    this.OnEditComment.emit(comment);
  }
}
