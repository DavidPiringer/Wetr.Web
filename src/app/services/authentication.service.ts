import { Injectable } from '@angular/core';
import { UserService } from './api/user.service';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
//import { createVerify } from 'crypto';
//var jwt = require('jsonwebtoken');

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private userService: UserService) { }

  public login(username:string, password:string): Observable<boolean> {
    return this.userService.Login(username, password).pipe(
      map(x => {
        if(x) localStorage.setItem('currentUser',username);
        return x;
      })
    );
  }

  public getCurrentUser(): string {
    return localStorage.getItem('currentUser');
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') != null;
  }

  public logout(){
    localStorage.removeItem('currentUser');
  }
}
