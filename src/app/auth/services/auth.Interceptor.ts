import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = localStorage.getItem('access_token');
      if (token && typeof token === 'string' && !req.headers.has('authorization')) {
        (<any>req).headers = <any>req.headers.append('Authorization', token);
      }
      return next.handle(req);
  }
}
