import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../common/service/data.service';
import { ResponseObject } from '../../common/model/response-object';
import { ResponseList } from '../../common/model/response-list';

import { WebResource } from '../model/web-resource';

@Injectable()
export class ProgramService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('http://localhost:8090/common/webresource', http, tokenExtractor);
  }

  getProgramList(params?: any): Observable<ResponseList<WebResource>> {
    const url = `${this.API_URI}`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<WebResource>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getProgram(id: string): Observable<ResponseObject<WebResource>> {
    const url = `${this.API_URI}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<WebResource>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getProgramDupCheck(id: string): Observable<ResponseObject<boolean>> {
    const url = `${this.API_URI}/${id}/check`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<boolean>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  registerProgram(program: WebResource): Observable<ResponseObject<WebResource>> {
    const url = `${this.API_URI}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<WebResource>>(url, program, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  deleteProgram(id: string): Observable<ResponseObject<WebResource>> {
    const url = `${this.API_URI}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<WebResource>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

}
