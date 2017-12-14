import { RegistationData } from './../interfaces/auth.interface';
import { Injectable, Inject } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { LoginData, ResponceAuth, User } from '../interfaces/auth.interface';
import { AppStore, ActionList } from './../../redux/redux.config';

import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(AppStore) public store,
  ) { }

  public isAuthenticated( ) {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return false;
    }
    return true;
  }
  public getUser() {
    return this.store.getState().user;
  }

  private updateUser(newUser: User) {
    this.store.dispatch({ type: ActionList.updateUser, user: newUser });
  }

  public logout() {
    localStorage.removeItem('access_token');
    this.store.dispatch({ type: ActionList.updateUser, user: null });
  }

  public loadUser(): Promise<any> {
    const token = localStorage.getItem('access_token');

    if (!token) {
      return (<any>Promise).resolve(null);
    }
    const headers = new HttpHeaders({ 'Authorization': token});
    const options = { headers: headers };

    this.http.get(`${environment.apiUrl}/user`, options)
      .toPromise().then((user: User) => {
        this.updateUser(user);
      }).catch((err) => {
        localStorage.removeItem('access_token');
      });
  }
  public login(data: LoginData): Observable<any> {
    const body = JSON.stringify(data);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };

   return this.http.post(`${environment.apiUrl}/user/login`, body, options)
    .do((res: ResponceAuth) => {
      localStorage.setItem('access_token', res.token);
      this.updateUser(res.user);
    });
  }
  public registration(data: RegistationData): Observable<any> {
    const body = JSON.stringify(data);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };

    return this.http.post(`${environment.apiUrl}/user/reg`, body, options)
    .do((res: ResponceAuth) => {
      localStorage.setItem('access_token', res.token);
      this.updateUser(res.user);
    });
  }
}
