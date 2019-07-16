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

   apiUrl = environment.apiUrl

   xClientInfoHeader = {
    appVersion: "1.0.0",
    os: "iOS",
    osVersion: "12.1",
    device: "iPhone 7",
    lang: "sv"
  };

   httpOptions = {
    // headers: new HttpHeaders({
    //   "X-ClientInfo": JSON.stringify(this.xClientInfoHeader),
    //   "Authorization" : this.getAccessToken()
    // })
    headers: new HttpHeaders()
        .append("X-ClientInfo", JSON.stringify(this.xClientInfoHeader))
        .append('Authorization', 'Bearer ' + this.getAccessToken()),
  };

  private ads: Add;
  private adsSource = new BehaviorSubject(this.ads);
  currentAds = this.adsSource.asObservable();

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  loadAds(): Observable<any>{
    const endpoint = this.apiUrl + '/advertisements';
    console.log(this.httpOptions);
    
    return this.httpClient.get<Add[]>(endpoint, this.httpOptions);
  }

  newAdd(add: Add) {
    this.adsSource.next(add);
  }

  getAccessToken(){
    return sessionStorage.getItem(this.authService.TOKEN_KEY)
  }


}
