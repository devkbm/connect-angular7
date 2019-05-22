import { Injectable } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../../common/service/data.service';
import { ResponseObject } from '../../../common/model/response-object';
import { ResponseList } from '../../../common/model/response-list';

import { Board } from '../model/board';
import { Article } from '../model/article';
import { BoardHierarchy } from '../model/board-hierarchy';

@Injectable()
export class BoardService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
      super('http://localhost:8090/grw', http, tokenExtractor);
  }

  getBoardTypeList(): Observable<ResponseList<any>> {
    const url = `${this.API_URI}/board/boardType`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .get<ResponseList<any>>(url, options)
      .pipe(
      catchError((err) => Observable.throw(err))
      );
  }

  getBoardList(): Observable<ResponseList<Board>> {
    const url = `${this.API_URI}/board`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true
      };

    return this.http
      .get<ResponseList<Board>>(url, options)
      .pipe(
          catchError((err) => Observable.throw(err))
      );
  }

  getBoard(id: string): Observable<ResponseObject<Board>> {
    const url = `${this.API_URI}/board/${id}`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true
      };

    return this.http
      .get<ResponseObject<Board>>(url, options)
      .pipe(
          catchError((err) => Observable.throw(err))
      );
  }

  getBoardHierarchy(): Observable<ResponseList<BoardHierarchy>> {
    const url = `${this.API_URI}/boardHierarchy`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .get<ResponseList<BoardHierarchy>>(url, options)
      .pipe(
          catchError(this.handleError)
      );
  }

  saveBoard(board: Board): Observable<ResponseObject<Board>> {
    const url = `${this.API_URI}/board`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
    .post<ResponseObject<Board>>(url, board, options)
    .pipe(
      catchError((err) => Observable.throw(err))
    );

  }

  deleteBoard(board: Board): Observable<ResponseObject<Board>> {
    const url = `${this.API_URI}/board/${board.pkBoard}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .delete<ResponseObject<Board>>(url, options)
      .pipe(
        catchError((err) => Observable.throw(err))
      );
  }

  getArticleList(fkBoard: string, title?: string, contents?: string): Observable<ResponseList<Article>> {
    let url = `${this.API_URI}/board/article?fkBoard=${fkBoard}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    if ( title !== undefined ) {
        url = url + '&title=' + title;
    }

    if ( contents !== undefined ) {
        url = url + '&contents=' + contents;
    }

    return this.http
      .get<ResponseList<Article>>(url, options)
      .pipe(
          catchError((err) => Observable.throw(err))
      );
  }

  getArticle(id: number): Observable<ResponseObject<Article>> {
    const url = `${this.API_URI}/board/article/${id}`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true
      };

    return this.http
      .get<ResponseObject<Article>>(url, options)
      .pipe(
          catchError((err) => Observable.throw(err))
      );
  }

  saveArticle(article: Article): Observable<ResponseObject<Article>> {
    const url = `${this.API_URI}/board/article`;
    const options = {
        headers: this.getAuthorizedMultiPartHeaders(),
        withCredentials: true
      };

    let formData = new FormData();

    formData.append('pkArticle',    String(article.pkArticle));
    formData.append('fkBoard',      String(article.fkBoard));
    // formData.append('ppkArticle',   article.ppkArticle.toString());
    formData.append('title',        article.title);
    formData.append('contents',     article.contents);
    formData.append('pwd',          article.pwd);
    formData.append('hitCnt',       article.hitCnt);
    formData.append('fromdDt',      article.fromDate);
    formData.append('toDt',         article.toDate);
    // formData.append('seq',          String(article.seq));
    // formData.append('depth',        String(article.depth));
    if ( article.file !== undefined ) {
        formData.append('file',         article.file, article.file.name);
    }

    return this.http
      .post<ResponseObject<Article>>(url, formData, options)
      .pipe(
          catchError((err) => Observable.throw(err))
      );
  }

  saveArticleJson(article: Article): Observable<ResponseObject<Article>> {
    const url = `${this.API_URI}/board/article`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .post<ResponseObject<Article>>(url, article, options)
      .pipe(
          catchError((err) => Observable.throw(err))
      );
  }

  deleteArticle(id): Observable<ResponseObject<Article>> {
    const url = `${this.API_URI}/board/article/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .delete<ResponseObject<Article>>(url, options)
      .pipe(
        catchError((err) => Observable.throw(err))
      );
  }

  downloadFile(fileId: string, fileName: string) {
    const url = `http://localhost:8090/file/${fileId}`;
    const options = {
      headers: this.getAuthorizedMultiPartHeaders(),
      responseType: 'blob',
      withCredentials: true
    };

    this.http.get(url, {headers: this.getAuthorizedMultiPartHeaders(), responseType: 'blob'})
    .subscribe(
        (model: Blob) => {

            // const blob = new Blob([model], { type: 'application/octet-stream' });

            // FileSaver.saveAs(blob, fileName);
          },
          (err) => {
            console.log(err);
          },
          () => {
            console.log('완료');
          }
        );
  }

}
