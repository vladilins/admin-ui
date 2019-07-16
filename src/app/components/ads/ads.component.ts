import { Component, OnInit, Input } from "@angular/core";
import { Add } from "src/app/models/add";
import { AdsService } from "src/app/services/ads.service";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-ads",
  templateUrl: "./ads.component.html",
  styleUrls: ["./ads.component.scss"]
})
export class AdsComponent implements OnInit {
  ads: Add[];

  constructor(private adsService: AdsService, private authService: AuthService) {}

  ngOnInit() {
    this.loadAds()
  }

  private loadAds() {
    this.adsService.loadAds().subscribe(
      ads => {
        this.ads = ads.advertisements;
      },
      error => {
        console.log(error);
        if (error.status === 401) {
          this.authService.logoutAndRedirect()
        }
      }
    );
  }
}
