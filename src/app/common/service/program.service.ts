import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../common/service/data.service';
import { ResponseObject } from '../../common/model/response-object';
import { ResponseList } from '../../common/model/response-list';

import { Program } from '../model/Program';

@Injectable()
export class ProgramService extends DataService {

  constructor(http: HttpClient) {
    super('http://localhost:8090/program', http);
  }

  getProgramList(params?: any): Observable<ResponseList<Program>> {
    const url = `${this.API_URI}`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        params: params
     };

    return this.http.get<ResponseList<Program>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getProgram(id: string): Observable<ResponseObject<Program>> {
    const url = `${this.API_URI}/${id}`;
    return this.http.get<ResponseObject<Program>>(url, {headers: this.getAuthorizedHttpHeaders()}).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  registerProgram(program: Program): Observable<ResponseObject<Program>> {
    const url = `${this.API_URI}/${program.programCode}`;
    return this.http.post<ResponseObject<Program>>(url, program, {headers: this.getAuthorizedHttpHeaders()}).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  deleteProgram(id: string): Observable<ResponseObject<Program>> {
    const url = `${this.API_URI}/${id}`;
    return this.http
              .delete<ResponseObject<Program>>(url, {headers: this.getAuthorizedHttpHeaders()})
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

}
