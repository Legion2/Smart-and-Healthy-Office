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
import { Subscription } from '../models/subscription';
import { UserLocation } from '../models/user-location';

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
   * Path part for operation demoResetActionHistoryPost
   */
  static readonly DemoResetActionHistoryPostPath = '/demo/reset-action-history';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `demoResetActionHistoryPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  demoResetActionHistoryPost$Response(params?: {

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DemoResetActionHistoryPostPath, 'post');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `demoResetActionHistoryPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  demoResetActionHistoryPost(params?: {

  }): Observable<void> {

    return this.demoResetActionHistoryPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation demoSendNotificationUserPost
   */
  static readonly DemoSendNotificationUserPostPath = '/demo/send-notification/{user}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `demoSendNotificationUserPost()` instead.
   *
   * This method sends `text/plain` and handles request body of type `text/plain`.
   */
  demoSendNotificationUserPost$Response(params: {
    user: string;
      body?: string
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DemoSendNotificationUserPostPath, 'post');
    if (params) {

      rb.path('user', params.user, {});

      rb.body(params.body, 'text/plain');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `demoSendNotificationUserPost$Response()` instead.
   *
   * This method sends `text/plain` and handles request body of type `text/plain`.
   */
  demoSendNotificationUserPost(params: {
    user: string;
      body?: string
  }): Observable<void> {

    return this.demoSendNotificationUserPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation locationUserGet
   */
  static readonly LocationUserGetPath = '/location/{user}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `locationUserGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  locationUserGet$Response(params: {
    user: string;

  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.LocationUserGetPath, 'get');
    if (params) {

      rb.path('user', params.user, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `locationUserGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  locationUserGet(params: {
    user: string;

  }): Observable<string> {

    return this.locationUserGet$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation locationUserPost
   */
  static readonly LocationUserPostPath = '/location/{user}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `locationUserPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  locationUserPost$Response(params: {
    user: string;
      body?: UserLocation
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.LocationUserPostPath, 'post');
    if (params) {

      rb.path('user', params.user, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `locationUserPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  locationUserPost(params: {
    user: string;
      body?: UserLocation
  }): Observable<void> {

    return this.locationUserPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
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

  /**
   * Path part for operation subscriptionsPost
   */
  static readonly SubscriptionsPostPath = '/subscriptions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `subscriptionsPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  subscriptionsPost$Response(params?: {
      body?: Subscription
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.SubscriptionsPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `subscriptionsPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  subscriptionsPost(params?: {
      body?: Subscription
  }): Observable<string> {

    return this.subscriptionsPost$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation subscriptionsKeyGet
   */
  static readonly SubscriptionsKeyGetPath = '/subscriptions/key';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `subscriptionsKeyGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  subscriptionsKeyGet$Response(params?: {

  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.SubscriptionsKeyGetPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `subscriptionsKeyGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  subscriptionsKeyGet(params?: {

  }): Observable<string> {

    return this.subscriptionsKeyGet$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation subscriptionsIdDelete
   */
  static readonly SubscriptionsIdDeletePath = '/subscriptions/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `subscriptionsIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  subscriptionsIdDelete$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.SubscriptionsIdDeletePath, 'delete');
    if (params) {

      rb.path('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `subscriptionsIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  subscriptionsIdDelete(params: {
    id: string;

  }): Observable<void> {

    return this.subscriptionsIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
