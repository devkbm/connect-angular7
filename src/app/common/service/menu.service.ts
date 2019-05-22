import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../service/data.service';

import { ResponseObject } from '../model/response-object';
import { ResponseList } from '../model/response-list';
import { MenuGroup } from '../model/menu-group';
import { Menu } from '../model/menu';
import { MenuHierarchy } from '../model/menu-hierarchy';

@Injectable()
export class MenuService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('http://localhost:8090/common', http, tokenExtractor);
  }

  getMenuGroupList(params?: any): Observable<ResponseList<MenuGroup>> {
    const url = `${this.API_URI}/menugroup`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http
              .get<ResponseList<MenuGroup>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  getMenuGroup(menuGroupCode: string): Observable<ResponseObject<MenuGroup>> {
    const url = `${this.API_URI}/menugroup/${menuGroupCode}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
              .get<ResponseObject<MenuGroup>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  getValidDupMenuGroup(menuGroupCode: string): Observable<ResponseObject<boolean>> {
    const url = `${this.API_URI}/menugroup/${menuGroupCode}/check`;
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

  registerMenuGroup(menuGroup: MenuGroup): Observable<ResponseObject<MenuGroup>> {
    const url = `${this.API_URI}/menugroup/${menuGroup.menuGroupCode}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
              .post<ResponseObject<MenuGroup>>(url, menuGroup, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  deleteMenuGroup(menuGroupCode: string): Observable<ResponseObject<MenuGroup>> {
    const url = `${this.API_URI}/menugroup/${menuGroupCode}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
              .delete<ResponseObject<MenuGroup>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  getMenu(menuCode: string): Observable<ResponseObject<Menu>> {
    const url = `${this.API_URI}/menu/${menuCode}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
              .get<ResponseObject<Menu>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  getValidDupMenu(menuCode: string): Observable<ResponseObject<boolean>> {
    const url = `${this.API_URI}/menu/${menuCode}/check`;
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

  getMenuList(params?: any): Observable<ResponseList<Menu>> {
    const url = `${this.API_URI}/menu`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http
              .get<ResponseList<Menu>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  getMenuTypeList(): Observable<ResponseObject<any>> {
    const url = `${this.API_URI}/menu/menutype`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
              .get<ResponseObject<any>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  registerMenu(menu: Menu): Observable<ResponseObject<Menu>> {
    const url = `${this.API_URI}/menu/${menu.menuCode}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
              .post<ResponseObject<Menu>>(url, menu, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  deleteMenu(menu: Menu): Observable<ResponseObject<Menu>> {
    const url = `${this.API_URI}/menu/${menu.menuCode}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
              .delete<ResponseObject<Menu>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  getMenuHierarchy(menuGroupCode: String): Observable<ResponseList<MenuHierarchy>> {
    const url = `http://localhost:8090/common/menuhierarchy/${menuGroupCode}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
              .get<ResponseList<MenuHierarchy>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

}
