import { Injectable } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../../common/service/data.service';
import { ResponseObject } from '../../../common/model/response-object';
import { ResponseList } from '../../../common/model/response-list';
import { WorkGroup } from '../model/workgroup';



@Injectable()
export class WorkGroupService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
      super('http://localhost:8090/grw', http, tokenExtractor);
  }

  /**
   * @description 작업그룹명단을 조회한다.
   * @param params 조회 조건 객체
   */
  public getWorkGroupList(params?: any): Observable<ResponseList<WorkGroup>> {
    const url = `${this.API_URI}/workgroup`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http
      .get<ResponseList<WorkGroup>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseList<WorkGroup>>('getWorkGroupList', null))
      );
  }

  /**
   * @description 작업그룹을 조회한다.
   * @param id 작업그룹id
   */
  public getWorkGroup(id: number): Observable<ResponseObject<WorkGroup>> {
    const url = `${this.API_URI}/workgroup/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .get<ResponseObject<WorkGroup>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseObject<WorkGroup>>('getWorkGroup', null))
      );
  }

  /**
   * @description 작업그룹을 저장한다.
   * @param workGroup
   */
  public saveWorkGroup(workGroup: WorkGroup): Observable<ResponseObject<WorkGroup>> {
    const url = `${this.API_URI}/workgroup`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
    .post<ResponseObject<WorkGroup>>(url, workGroup, options)
    .pipe(
      catchError(this.handleError<ResponseObject<WorkGroup>>('saveWorkGroup', null))
    );

  }

  /**
   * @description 작업그룹을 삭제한다.
   * @param id 작업그룹 id
   */
  public deleteWorkGroup(id: number): Observable<ResponseObject<WorkGroup>> {
    const url = `${this.API_URI}/workgroup/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .delete<ResponseObject<WorkGroup>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseObject<WorkGroup>>('deleteWorkGroup', null))
      );
  }

  

}