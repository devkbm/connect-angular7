import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../service/data.service';

import { ResponseObject } from '../model/response-object';
import { ResponseList } from '../model/response-list';
import { UserNotFoundError } from '../error/user-not-found-error';

import { User } from '../model/user-info';
import { Authority } from '../model/authority';
import { MenuGroup } from '../model/menu-group';

@Injectable()
export class UserService extends DataService {

  private AUTHORITY_API_URI = 'http://localhost:8090/authority';

  private MENU_GROUP_API_URI = 'http://localhost:8090/menugroup';

  constructor(http: HttpClient) {
    super('http://localhost:8090/user', http);
  }

  checkUser(id: string): Observable<ResponseObject<User>> {
    const url = `${this.API_URI}/${id}/check`;
    return this.http
      .get<ResponseObject<User>>(url, {headers: this.getAuthorizedHttpHeaders()}).pipe(
        catchError((err) => Observable.throw(new UserNotFoundError(err))));
  }

  getUser(id: string): Observable<ResponseObject<User>> {
    const url = `${this.API_URI}/${id}`;
    return this.http
      .get<ResponseObject<User>>(url, {headers: this.getAuthorizedHttpHeaders()}).pipe(
        catchError((err) => Observable.throw(err)));
  }

  getUserList(params?: any): Observable<ResponseList<User>> {
    const url = `${this.API_URI}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      params: params
    };

    return this.http
      .get<ResponseList<User>>(url, options).pipe(
        catchError((err) => Observable.throw(err)));
  }

  registerUser(user: User): Observable<ResponseObject<User>> {
    return this.http
      .post<ResponseObject<User>>(this.API_URI + '/' + user.userId, user, {headers: this.getAuthorizedHttpHeaders()}).pipe(
        catchError((err) => Observable.throw(err)));
  }

  deleteUser(user: User): Observable<ResponseObject<User>> {
    return this.http
      .delete<ResponseObject<User>>(this.API_URI + '/' + user.userId, {headers: this.getAuthorizedHttpHeaders()}).pipe(
        catchError((err) => Observable.throw(err)));
  }

  initializePassword(user: User): Observable<ResponseObject<String>> {
    return this.http
      .post<ResponseObject<String>>(this.API_URI + '/' + user.userId + '/initPassword', user, {headers: this.getAuthorizedHttpHeaders()})
      .pipe(
        catchError((err) => Observable.throw(err))
      );
  }

  getAuthorityList(params?: any): Observable<ResponseList<Authority>> {
    const url = `${this.AUTHORITY_API_URI}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      params: params
    };

    return this.http
      .get<ResponseList<Authority>>(url, options)
      .pipe(
        catchError((err) => Observable.throw(err))
      );
  }

  getAuthority(id: string): Observable<ResponseObject<Authority>> {
    const url = `${this.AUTHORITY_API_URI}/${id}`;
    return this.http
      .get<ResponseObject<Authority>>(url, {headers: this.getAuthorizedHttpHeaders()})
      .pipe(
        catchError((err) => Observable.throw(err))
      );
  }

  registerAuthority(authority: Authority): Observable<ResponseObject<Authority>> {
    return this.http
      .post<ResponseObject<Authority>>(this.AUTHORITY_API_URI, authority, {headers: this.getAuthorizedHttpHeaders()})
      .pipe(
        catchError((err) => Observable.throw(err))
      );
  }

  deleteAuthority(id: string): Observable<ResponseObject<Authority>> {
    const url = `${this.AUTHORITY_API_URI}/${id}`;

    return this.http
      .delete<ResponseObject<Authority>>(url, {headers: this.getAuthorizedHttpHeaders()})
      .pipe(
        catchError((err) => Observable.throw(err))
      );
  }

  getMenuGroupList(): Observable<ResponseList<MenuGroup>> {
    const url = `${this.MENU_GROUP_API_URI}`;
    return this.http
      .get<ResponseList<MenuGroup>>(url, {headers: this.getAuthorizedHttpHeaders()})
      .pipe(
        catchError((err) => Observable.throw(err))
      );
  }
}
