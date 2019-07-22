import { Component, OnInit, Input } from "@angular/core";
import { Add } from "src/app/models/add";
import { AdsService } from "src/app/services/ads.service";
import { AuthService } from "src/app/services/auth.service";
import { all } from "q";

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

  moveUp(add: Add) {
    let found = this.ads.find(function(element) {
      return element.order === add.order;
    });
    let foundNext = this.ads.find(function(element) {
      return element.order === add.order - 1;
    });
    if (foundNext) {
      // var b = this.ads[found.order];
      // this.ads[found.order] = this.ads[foundNext.order];
      // this.ads[foundNext.order] = b;
      this.ads[found.order].order = found.order - 1;
      this.ads[foundNext.order].order = foundNext.order + 1;

      this.adsService.saveAdds(this.ads).subscribe(
        data => {
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

  moveDown(add: Add) {
    let found = this.ads.find(function(element) {
      return element.order === add.order;
    });
    let foundPrev = this.ads.find(function(element) {
      return element.order === add.order + 1;
    });
    if (foundPrev) {
      // var b = this.ads[found.order];
      // this.ads[found.order] = this.ads[foundPrev.order];
      // this.ads[foundPrev.order] = b;
      this.ads[found.order].order = found.order + 1;
      this.ads[foundPrev.order].order = foundPrev.order - 1;
      this.adsService.saveAdds(this.ads).subscribe(
        data => {
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
}
