import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from './data.service';
import { ResponseObject } from '../model/response-object';
import { ResponseList } from '../model/response-list';

import { Dept } from '../model/dept';
import { DeptHierarchy } from '../model/dept-hierarchy';

@Injectable()
export class DeptService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('http://localhost:8090/common/dept', http, tokenExtractor);
  }

  getDeptList(params?: any): Observable<ResponseList<Dept>> {
    const url = `${this.API_URI}`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<Dept>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getDeptHierarchyList(params?: any): Observable<ResponseList<DeptHierarchy>> {
    const url = 'http://localhost:8090/common/depttree';
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<DeptHierarchy>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getDept(id: string): Observable<ResponseObject<Dept>> {
    const url = `${this.API_URI}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<Dept>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  /*getProgramDupCheck(id: string): Observable<ResponseObject<boolean>> {
    const url = `${this.API_URI}/${id}/check`;
    const options = {
      headers: this.getAuthorizedHttpHeaders()
    };

    return this.http.get<ResponseObject<boolean>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }*/

  saveDept(dept: Dept): Observable<ResponseObject<Dept>> {
    const url = `${this.API_URI}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<Dept>>(url, dept, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  deleteDept(id: string): Observable<ResponseObject<Dept>> {
    const url = `${this.API_URI}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<Dept>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

}
