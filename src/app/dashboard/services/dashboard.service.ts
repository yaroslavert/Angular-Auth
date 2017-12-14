import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  getPostList() {
    return this.http.get(`${environment.apiUrl}/post`);
  }
  addCommentToPost(body) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http.post(`${environment.apiUrl}/comment`, JSON.stringify(body), options);
  }

}
