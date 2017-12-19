import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input('comment') public comment;
  @Output() public removeComment: EventEmitter<any> = new EventEmitter();
  @Output() public editComment: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  _removeComment() {
    this.removeComment.emit();
  }
  _editComment() {
    this.editComment.emit();
  }
}
