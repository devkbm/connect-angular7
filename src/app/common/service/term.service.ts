import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from './data.service';
import { ResponseObject } from '../model/response-object';
import { ResponseList } from '../model/response-list';

import { Term } from '../model/term';

@Injectable()
export class TermService extends DataService {

  constructor(http: HttpClient) {
    super('http://localhost:8090/common/terms', http);
  }

  getTermList(params?: any): Observable<ResponseList<Term>> {
    const url = `${this.API_URI}`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        params: params
     };

    return this.http.get<ResponseList<Term>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getTerm(id: string): Observable<ResponseObject<Term>> {
    const url = `${this.API_URI}/${id}`;
    return this.http.get<ResponseObject<Term>>(url, {headers: this.getAuthorizedHttpHeaders()}).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  registerTerm(term: Term): Observable<ResponseObject<Term>> {
    const url = `${this.API_URI}`;
    return this.http.post<ResponseObject<Term>>(url, term, {headers: this.getAuthorizedHttpHeaders()}).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  deleteTerm(id: string): Observable<ResponseObject<Term>> {
    const url = `${this.API_URI}/${id}`;
    return this.http
              .delete<ResponseObject<Term>>(url, {headers: this.getAuthorizedHttpHeaders()})
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

}
