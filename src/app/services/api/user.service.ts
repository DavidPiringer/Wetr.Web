import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Base } from './base.service';
import { ApiConfiguration } from './api-configuration';

@Injectable({
  providedIn: 'root',
})
export class UserService extends Base {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  Login(username:string, password:string): Observable<boolean> {
    let params = this.newParams();
    let headers = new HttpHeaders();
    let body: any = null;
    params = params.set('username', username);
    params = params.set('password', password);
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/users`,
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
    ).pipe(map(r => r.ok));
  }
}
