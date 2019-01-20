import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable as __Observable, Observable } from 'rxjs';
import { map as __map, map, filter as __filter, filter } from 'rxjs/operators';

import { Base } from './base.service';
import { Measurement, FilterSettings, Station } from '../../models/models';
import { IntervalType, AccumulationType } from '../../enums/enums';
import { ApiConfiguration } from './api-configuration';

@Injectable({
  providedIn: 'root',
})
export class MeasurementService extends Base {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  private getIntervalAsNumber(interval:IntervalType): number{
    switch(interval){
      case IntervalType.Day: return 1;
      case IntervalType.Week: return 2;
      case IntervalType.Month: return 3;
      case IntervalType.Year: return 4;
    }
  }

  private getAccumulationAsNumber(accumulation:AccumulationType): number{
    switch(accumulation){
      case AccumulationType.Min: return 1;
      case AccumulationType.Max: return 2;
      case AccumulationType.Avg: return 3;
    }
  }

  ByFilter(filterSettings:FilterSettings):Observable<Array<Measurement>> {
    let params = this.newParams();
    let headers = new HttpHeaders();
    params = params.set('from', new Date(filterSettings.from).toISOString());
    params = params.set('to', new Date(filterSettings.to).toISOString());
    params = params.set('intervalType', "" + this.getIntervalAsNumber(filterSettings.interval));
    params = params.set('accumulationType', "" + this.getAccumulationAsNumber(filterSettings.accumulation));
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/measurements/accumulation`,
      filterSettings.stations,
      {
        headers: headers,
        params: params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(r => r instanceof HttpResponse),
      map((r) => {
        return r as HttpResponse<Array<Measurement>>;
      })
    ).pipe(map(r => r.body as Array<Measurement>));
  }

  ByStations(stations:Array<Station>, from:Date, to:Date):Observable<Array<Measurement>> {
    let params = this.newParams();
    let headers = new HttpHeaders();
    params = params.set('from', new Date(from).toISOString());
    params = params.set('to', new Date(to).toISOString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/measurements/simple`,
      stations,
      {
        headers: headers,
        params: params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(r => r instanceof HttpResponse),
      map((r) => {
        return r as HttpResponse<Array<Measurement>>;
      })
    ).pipe(map(r => r.body as Array<Measurement>));
  }

  GetMeasurementsByStationId(stationId:number, from:Date, to:Date):Observable<Array<Measurement>> {
    let params = this.newParams();
    let headers = new HttpHeaders();
    let body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/measurements/${stationId}/from=${from}to=${to}`,
      body,
      {
        headers: headers,
        params: params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(r => r instanceof HttpResponse),
      map((r) => {
        return r as HttpResponse<Array<Measurement>>;
      })
    ).pipe(map(r => r.body as Array<Measurement>));
  }

  Insert(m: Measurement): Observable<null> {
    let params = this.newParams();
    let headers = new HttpHeaders();
    let body: any = null;
    body = m;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/measurements`,
      body,
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
