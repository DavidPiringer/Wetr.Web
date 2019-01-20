import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, filter, catchError } from 'rxjs/operators';

import { SearchResult, Station } from '../../models/models';

import { Base } from './base.service';
import { ApiConfiguration } from './api-configuration';

@Injectable({
  providedIn: 'root',
})
export class SearchService extends Base {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  BySearchValue(searchValue: string): Observable<Array<SearchResult>> {
    let params = this.newParams();
    let headers = new HttpHeaders();

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/search/${searchValue}`,
      null,
      {
        headers: headers,
        params: params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(r => r instanceof HttpResponse),
      map((r) => {
        return r as HttpResponse<Array<SearchResult>>;
      })
    ).pipe(map(r => r.body as Array<SearchResult>),
    catchError(err => of([])));
  }

  BySearchResults(searchResults: Array<SearchResult>): Observable<Array<Station>> {
    let params = this.newParams();
    let headers = new HttpHeaders();
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/search`,
      searchResults,
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
}
