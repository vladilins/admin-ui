import { Component, OnInit, Input } from "@angular/core";
import { Add } from "src/app/models/add";
import { AdsService } from "src/app/services/ads.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-ads",
  templateUrl: "./ads.component.html",
  styleUrls: ["./ads.component.scss"]
})
export class AdsComponent implements OnInit {
  ads: Add[];
  newAdd: boolean;

  constructor(
    private adsService: AdsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadAds();
    this.adsService.currentAdd.subscribe(add => {
      this.newAdd = add;
      if (this.newAdd) {
        this.loadAds();
      }
    });
  }

  private loadAds() {
    this.adsService.loadAds().subscribe(
      ads => {
        this.ads = ads.advertisements;
      },
      error => {
        console.log(error);
        if (error.status === 401) {
          this.authService.logoutAndRedirect();
        }
      }
    );
  }

  deleteAdd(id: number) {
    this.adsService.deleteAdd(id).subscribe(
      data => {
        console.log("deleted item:", id);
        this.loadAds();
      },
      error => {
        console.log(error);
        if (error.status === 401) {
          this.authService.logoutAndRedirect();
        }
      }
    );
  }
}
