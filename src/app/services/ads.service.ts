import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Add } from "../models/add";

@Injectable({
  providedIn: "root"
})
export class AdsService {
  private ads: Add;
  private adsSource = new BehaviorSubject(this.ads);
  currentAds = this.adsSource.asObservable();

  constructor() {}

  newAdd(add: Add) {
    this.adsSource.next(add);
  }
}
