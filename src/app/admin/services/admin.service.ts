import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/interfaces/auth.interface';

@Injectable()
export class AdminService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addPost(body) {
    const curentUser: User = this.authService.getUser();
    body.UserId = curentUser.id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http.post(`${environment.apiUrl}/post`, JSON.stringify(body), options);
  }
  addComment(body) {
    const curentUser: User = this.authService.getUser();
    body.UserId = curentUser.id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http.post(`${environment.apiUrl}/comment`, JSON.stringify(body), options);
  }


  getAdminConfig() {
    return this.http.get(`${environment.apiUrl}/admin`);
  }
  getPostByUserId(id) {
    return this.http.get(`${environment.apiUrl}/post/user/${id}`);
  }
  updatePost(newPost) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http.patch(`${environment.apiUrl}/post/${newPost.id}`, JSON.stringify(newPost), options)
  }
  removePost(post) {
    return this.http.delete(`${environment.apiUrl}/post/${post.id}`);
  }

}
