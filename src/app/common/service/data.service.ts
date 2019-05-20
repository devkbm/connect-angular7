import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class DataService {

    protected responseMap =  (res: Response) => res;
    
    constructor(protected API_URI: string, protected http: HttpClient, protected tokenExtractor: HttpXsrfTokenExtractor) { }

    /**
     * @description HttpHeaders를 가져온다.
     * @returnType {HttpHeaders}
     */
    protected getHttpHeaders(): HttpHeaders {
        const token = this.tokenExtractor.getToken() as string;
        
        return new HttpHeaders()
            //.set('X-XSRF-TOKEN', token)
            .set('Content-Type', 'application/json');
    }

    /**
     * @description 로그인 후 인증된 HttpHeaders를 가져온다.
     * @returnType {HttpHeaders}
     */
    protected getAuthorizedHttpHeaders(): HttpHeaders {
        const token = this.tokenExtractor.getToken() as string;
        console.log(token);
        return new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('X-Requested-With', 'XMLHttpRequest')
            //.set('X-XSRF-TOKEN', token)
            .set('Authorization', sessionStorage.getItem('token'))
            .set('x-auth-token', sessionStorage.getItem('token'));
    }

    protected getAuthorizedMultiPartHeaders(): HttpHeaders {
        const headers = new HttpHeaders()
        //.set('Content-Type', 'multipart/form-data')
        .set('Accept', 'application/json')
        .set('X-Auth-Token', sessionStorage.getItem('token'));

        headers.delete('Content-Type');

        return  headers;
    }

    protected getAuthorizedHeaders(): Headers {
        return new Headers({'X-Auth-Token': sessionStorage.getItem('token')});
    }

    /**
     * HTTP 요청이 실패한 경우를 처리합니다.
     * 애플리케이션 로직 흐름은 그대로 유지됩니다.
     * @param operation - 실패한 동작의 이름
     * @param result - 기본값으로 반환할 객체
     */
    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

        // TODO: 리모트 서버로 에러 메시지 보내기
        console.error(error); // 지금은 콘솔에 로그를 출력합니다.

        // TODO: 사용자가 이해할 수 있는 형태로 변환하기
        // this.log(`${operation} failed: ${error.message}`);

        // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
        return of(result as T);
        };
    }
}
