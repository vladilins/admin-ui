import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Add } from "../models/add";
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: "root"
})
export class AdsService {

  private apiUrl = environment.apiUrl

  private xClientInfoHeader = {
    appVersion: "1.0.0",
    os: "iOS",
    osVersion: "12.1",
    device: "iPhone 7",
    lang: "sv"
  };

  private httpOptions = {
    headers: new HttpHeaders()
        .append("X-ClientInfo", JSON.stringify(this.xClientInfoHeader))
        .append('Authorization', 'Bearer ' + this.getAccessToken()),
  };

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  loadAds(): Observable<any>{
    const endpoint = this.apiUrl + '/advertisements';
    
    return this.httpClient.get<Add[]>(endpoint, this.httpOptions);
  }

  newAdd(add: Add) {
    const endpoint = this.apiUrl + '/advertisements';

    return this.httpClient.post(endpoint, add, this.httpOptions)
  }

  getAccessToken(){
    return sessionStorage.getItem(this.authService.TOKEN_KEY)
  }
}
