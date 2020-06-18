/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ListRoom } from '../models/list-room';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation roomsGet
   */
  static readonly RoomsGetPath = '/rooms';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `roomsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  roomsGet$Response(params?: {

  }): Observable<StrictHttpResponse<ListRoom>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.RoomsGetPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ListRoom>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `roomsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  roomsGet(params?: {

  }): Observable<ListRoom> {

    return this.roomsGet$Response(params).pipe(
      map((r: StrictHttpResponse<ListRoom>) => r.body as ListRoom)
    );
  }

  /**
   * Path part for operation roomsIdGet
   */
  static readonly RoomsIdGetPath = '/rooms/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `roomsIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  roomsIdGet$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<Room>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.RoomsIdGetPath, 'get');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Room>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `roomsIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  roomsIdGet(params: {
    id: string;

  }): Observable<Room> {

    return this.roomsIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<Room>) => r.body as Room)
    );
  }

}
