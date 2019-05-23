import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from './data.service';
import { ResponseObject } from '../model/response-object';
import { ResponseList } from '../model/response-list';

import { CommonCode } from '../model/common-code';
import { CommonCodeHierarchy } from '../model/common-code-hierarchy';


@Injectable()
export class CommonCodeService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('http://localhost:8090/common/code', http, tokenExtractor);
  }

  getCommonCodeList(params?: any): Observable<ResponseList<CommonCode>> {
    const url = `${this.API_URI}`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<CommonCode>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getCommonCode(id: string): Observable<ResponseObject<CommonCode>> {
    const url = `${this.API_URI}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<CommonCode>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getCommonCodeHierarchy(params?: any): Observable<ResponseList<CommonCodeHierarchy>> {
    const url = `http://localhost:8090/common/codetree`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<CommonCodeHierarchy>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getCommonCodeListByParentId(parentId: string): Observable<ResponseList<CommonCode>> {
    const url = `${this.API_URI}`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: {
          parentId : parentId
        }
     };

    return this.http.get<ResponseList<CommonCode>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  registerCommonCode(program: CommonCode): Observable<ResponseObject<CommonCode>> {
    const url = `${this.API_URI}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.post<ResponseObject<CommonCode>>(url, program, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  deleteCommonCode(id: string): Observable<ResponseObject<CommonCode>> {
    const url = `${this.API_URI}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.delete<ResponseObject<CommonCode>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

}
