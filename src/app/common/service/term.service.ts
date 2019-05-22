import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from './data.service';
import { ResponseObject } from '../model/response-object';
import { ResponseList } from '../model/response-list';

import { Term } from '../model/term';

@Injectable()
export class TermService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('http://localhost:8090/common/terms', http, tokenExtractor);
  }

  getTermList(params?: any): Observable<ResponseList<Term>> {
    const url = `${this.API_URI}`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<Term>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getTerm(id: string): Observable<ResponseObject<Term>> {
    const url = `${this.API_URI}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
   };

    return this.http.get<ResponseObject<Term>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  registerTerm(term: Term): Observable<ResponseObject<Term>> {
    const url = `${this.API_URI}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.post<ResponseObject<Term>>(url, term, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  deleteTerm(id: string): Observable<ResponseObject<Term>> {
    const url = `${this.API_URI}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
              .delete<ResponseObject<Term>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

}
