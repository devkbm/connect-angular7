import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../common/service/data.service';
import { ResponseObject } from '../../common/model/response-object';
import { ResponseList } from '../../common/model/response-list';

import { WebResource } from '../model/web-resource';

@Injectable()
export class ProgramService extends DataService {

  constructor(http: HttpClient) {
    super('http://localhost:8090/common/webresource', http);
  }

  getProgramList(params?: any): Observable<ResponseList<WebResource>> {
    const url = `${this.API_URI}`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        params: params
     };

    return this.http.get<ResponseList<WebResource>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getProgram(id: string): Observable<ResponseObject<WebResource>> {
    const url = `${this.API_URI}/${id}`;
    return this.http.get<ResponseObject<WebResource>>(url, {headers: this.getAuthorizedHttpHeaders()}).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  registerProgram(program: WebResource): Observable<ResponseObject<WebResource>> {
    const url = `${this.API_URI}`;
    return this.http.post<ResponseObject<WebResource>>(url, program, {headers: this.getAuthorizedHttpHeaders()}).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  deleteProgram(id: string): Observable<ResponseObject<WebResource>> {
    const url = `${this.API_URI}/${id}`;
    return this.http
              .delete<ResponseObject<WebResource>>(url, {headers: this.getAuthorizedHttpHeaders()})
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

}
