import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ads",
  templateUrl: "./ads.component.html",
  styleUrls: ["./ads.component.scss"]
})
export class AdsComponent implements OnInit {
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

  constructor() {}

  ngOnInit() {}
}
