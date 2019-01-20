import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Base } from './base.service';
import { Station, StationType, Community } from '../../models/models';
import { ApiConfiguration } from './api-configuration';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root',
})
export class StationService extends Base {
  constructor(
    config: ApiConfiguration,
    http: HttpClient,
    private auth:AuthenticationService
  ) {
    super(config, http);
  }

  GetAll(): Observable<Array<Station>> {
    let params = this.newParams();
    let headers = new HttpHeaders();
    let body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/stations`,
      body,
      {
        headers: headers,
        params: params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(r => r instanceof HttpResponse),
      map((r) => {
        return r as HttpResponse<Array<Station>>;
      })
    ).pipe(map(r => r.body as Array<Station>));
  }

  GetByUserName(userName: string): Observable<Array<Station>> {
    let params = this.newParams();
    let headers = new HttpHeaders();
    let body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/stations/userName=${userName}`,
      body,
      {
        headers: headers,
        params: params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(r => r instanceof HttpResponse),
      map((r) => {
        return r as HttpResponse<Array<Station>>;
      })
    ).pipe(map(r => r.body as Array<Station>));
  }

  GetById(id: number): Observable<Station> {
    let params = this.newParams();
    let headers = new HttpHeaders();
    let body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/stations/${id}`,
      body,
      {
        headers: headers,
        params: params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(r => r instanceof HttpResponse),
      map((r) => {
        return r as HttpResponse<Station>;
      })
    ).pipe(map(r => r.body as Station));
  }

  GetAllStationTypes(): Observable<Array<StationType>> {
    let params = this.newParams();
    let headers = new HttpHeaders();
    let body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/stations/getStationTypes`,
      body,
      {
        headers: headers,
        params: params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(r => r instanceof HttpResponse),
      map((r) => {
        return r as HttpResponse<Array<Station>>;
      })
    ).pipe(map(r => r.body as Array<Station>));
  }

  GetAllCommunities(): Observable<Array<Community>> {
    let params = this.newParams();
    let headers = new HttpHeaders();
    let body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/stations/getCommunities`,
      body,
      {
        headers: headers,
        params: params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(r => r instanceof HttpResponse),
      map((r) => {
        return r as HttpResponse<Array<Community>>;
      })
    ).pipe(map(r => r.body as Array<Community>));
  }

  UpdateStation(s: Station): Observable<null> {
    let params = this.newParams();
    let headers = new HttpHeaders();
    params = params.set('username', this.auth.getCurrentUser());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/stations`,
      s,
      {
        headers: headers,
        params: params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(r => r instanceof HttpResponse),
      map((r) => {
        return r as HttpResponse<null>;
      })
    ).pipe(map(r => r.body as null));
  }

  InsertStation(s: Station): Observable<null> {
    let params = this.newParams();
    let headers = new HttpHeaders();

    params = params.set('username', this.auth.getCurrentUser());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/stations`,
      s,
      {
        headers: headers,
        params: params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      filter(r => r instanceof HttpResponse),
      map((r) => {
        return r as HttpResponse<null>;
      })
    ).pipe(map(r => r.body as null));
  }

  DeleteStation(s: Station): Observable<null> {
    let params = this.newParams();
    let headers = new HttpHeaders();
    params = params.set('username', this.auth.getCurrentUser());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/stations`,
      s,
      {
        headers: headers,
        params: params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(r => r instanceof HttpResponse),
      map((r) => {
        return r as HttpResponse<null>;
      })
    ).pipe(map(r => r.body as null));
  }
}
