import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';

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

  private AUTHORITY_API_URI = 'http://localhost:8090/common/authority';

  private MENU_GROUP_API_URI = 'http://localhost:8090/common/menugroup';

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('http://localhost:8090/common/user', http, tokenExtractor);
  }

  checkUser(id: string): Observable<ResponseObject<boolean>> {
    const url = `${this.API_URI}/${id}/check`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .get<ResponseObject<boolean>>(url, options).pipe(
        catchError((err) => Observable.throw(new UserNotFoundError(err))));
  }

  getUser(id: string): Observable<ResponseObject<User>> {
    const url = `${this.API_URI}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .get<ResponseObject<User>>(url, options).pipe(
        catchError((err) => Observable.throw(err)));
  }

  getUserList(params?: any): Observable<ResponseList<User>> {
    const url = `${this.API_URI}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http
      .get<ResponseList<User>>(url, options).pipe(
        catchError((err) => Observable.throw(err)));
  }

  registerUser(user: User): Observable<ResponseObject<User>> {
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .post<ResponseObject<User>>(this.API_URI, user, options).pipe(
        catchError((err) => Observable.throw(err)));
  }

  deleteUser(userId: string): Observable<ResponseObject<User>> {
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .delete<ResponseObject<User>>(this.API_URI + '/' + userId, options).pipe(
        catchError((err) => Observable.throw(err)));
  }

  initializePassword(user: User): Observable<ResponseObject<string>> {
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .post<ResponseObject<string>>(this.API_URI + '/' + user.userId + '/initPassword', user, options)
      .pipe(
        catchError((err) => Observable.throw(err))
      );
  }

  getAuthorityList(params?: any): Observable<ResponseList<Authority>> {
    const url = `${this.AUTHORITY_API_URI}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
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
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .get<ResponseObject<Authority>>(url, options)
      .pipe(
        catchError((err) => Observable.throw(err))
      );
  }

  getAuthorityDupCheck(id: string): Observable<ResponseObject<boolean>> {
    const url = `${this.AUTHORITY_API_URI}/${id}/check`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .get<ResponseObject<boolean>>(url, options)
      .pipe(
        catchError((err) => Observable.throw(err))
      );
  }

  registerAuthority(authority: Authority): Observable<ResponseObject<Authority>> {
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .post<ResponseObject<Authority>>(this.AUTHORITY_API_URI, authority, options)
      .pipe(
        catchError((err) => Observable.throw(err))
      );
  }

  deleteAuthority(id: string): Observable<ResponseObject<Authority>> {
    const url = `${this.AUTHORITY_API_URI}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .delete<ResponseObject<Authority>>(url, options)
      .pipe(
        catchError((err) => Observable.throw(err))
      );
  }

  getMenuGroupList(): Observable<ResponseList<MenuGroup>> {
    const url = `${this.MENU_GROUP_API_URI}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .get<ResponseList<MenuGroup>>(url, options)
      .pipe(
        catchError((err) => Observable.throw(err))
      );
  }
}
