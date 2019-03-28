import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { DataService } from '../service/data.service';

import { UserToken } from '../model/user-token';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoginService extends DataService {

  constructor(http: HttpClient) {
    super('http://localhost:8090/common/user/login', http);
  }

  /**
   * @description 로그인 한다.
   * @paramTag 아이디
   * @paramTag 비밀번호
   * @returnType {UserToken} Token 정보
   */
  doLogin(id: string, pwd: string): Observable<UserToken> {
    const body = {username: id, password: pwd};
    const options = {
      headers: this.getHttpHeaders()
    };

    return this.http
      .post<UserToken>(this.API_URI, body, options).pipe(
        // tap((userToken: UserToken) => console.log(userToken.token) ),
        // catchError((err) => Observable.throw(err))
      );
  }

}
