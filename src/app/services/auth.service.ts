import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
// import {UrlService} from './url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;

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

    return this.httpClient.post(endpoint, httpParams, this.httpOptions)
  }
}
