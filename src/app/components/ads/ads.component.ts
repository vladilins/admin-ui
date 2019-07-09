import { Component, OnInit, Input } from "@angular/core";
import { Add } from "src/app/models/add";
import { AdsService } from "src/app/services/ads.service";

@Component({
  selector: "app-ads",
  templateUrl: "./ads.component.html",
  styleUrls: ["./ads.component.scss"]
})
export class AdsComponent implements OnInit {
  // ads: Add;
  ads = [
    {
      id: 1,
      title: "rallyshop.se",
      text: "25% rabbat på drifting däck",
      link: "www.com",
      image: "https://blog.hubspot.com/hubfs/subliminal-advertising.jpg",
      place: 1
    },
    {
      id: 1,
      title: "rallyshop.se",
      text: "25% rabbat på drifting däck",
      link: "www.com",
      image: "https://blog.hubspot.com/hubfs/subliminal-advertising.jpg",
      place: 1
    },
    {
      id: 1,
      title: "rallyshop.se",
      text: "25% rabbat på drifting däck",
      link: "www.com",
      image: "https://blog.hubspot.com/hubfs/subliminal-advertising.jpg",
      place: 1
    },
    {
      id: 1,
      title: "rallyshop.se",
      text: "25% rabbat på drifting däck",
      link: "www.com",
      image: "https://blog.hubspot.com/hubfs/subliminal-advertising.jpg",
      place: 1
    },
    {
      id: 1,
      title: "rallyshop.se",
      text: "25% rabbat på drifting däck",
      link: "www.com",
      image: "https://blog.hubspot.com/hubfs/subliminal-advertising.jpg",
      place: 1
    }
  ];

  constructor(private adsService: AdsService) {}

  ngOnInit() {
    // this.adsService.currentAds.subscribe(add => (this.ads = add));
  }
}
