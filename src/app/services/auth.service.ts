import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TOKEN_KEY = 't';

  apiUrl = environment.apiUrl;

  private userToken: string;

  xClientInfoHeader = {
    appVersion : "1.0.0",
    os: "iOS",
    osVersion: "12.1",
    device: "iPhone 7",
    lang: 'sv'
  }

  httpOptions = {
    headers: new HttpHeaders({
      'X-ClientInfo': JSON.stringify(this.xClientInfoHeader)
    })
  };

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    const endpoint = this.apiUrl + '/user/auth/login';
    const httpParams = {
      name: username,
      password: password
    }

    return this.httpClient.post(endpoint, httpParams, this.httpOptions).pipe(
      map(token => {
        this.userToken = token.toString();
        this.storeToken();
      })
    )
  }

  logoutAndRedirect(router: Router) {
    this.logout();
    const url = '/login'
    router.navigate([url]);
  }

  logout() {
    this.userToken = undefined;
    this.clearToken();
  }

  getUserToken() {
    return this.userToken;
  }

  isLoggedIn() {
    return typeof this.userToken !== 'undefined';
  }

  storeToken() {
    sessionStorage.setItem(this.TOKEN_KEY, this.getUserToken());
  }

  clearToken() {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  hasStoredToken() {
    return sessionStorage.getItem(this.TOKEN_KEY) && sessionStorage.getItem(this.TOKEN_KEY).length > 0;
  }

}
