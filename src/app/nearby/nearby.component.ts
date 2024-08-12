import { Component, OnInit } from '@angular/core';
import { NearbyService } from './nearby.service';
import { Nearby } from '../models/nearby.model';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.css']
})
export class NearbyComponent implements OnInit {

  nearbyLocations: Nearby[] = [];
  htmlContent: Map<number, SafeHtml> = new Map<number, SafeHtml>();

  constructor(private nearbyService: NearbyService) { }

  ngOnInit(): void {
    this.nearbyService.getNearby(1, 1, 1).subscribe(data => {
      this.nearbyLocations = data;
      this.nearbyLocations.map((nearby, index) => {
        nearby.likeRatings = Array.from({length: nearby.rating}, (_, i) => i + 1);
        nearby.unlikeRatings = Array.from({length: 5 - nearby.rating}, (_, i) => i + 1);
        this.parseHtmlContent(nearby, index);
      })
      console.log(this.nearbyLocations);
    })
  }

  goToLink(index: number): void {
    const url = this.htmlContent.get(index);
    window.open(`${url}`, '_blank');
  }

  parseHtmlContent(nearby: Nearby, index: number): void {
    nearby.photos.map(photo => {
      photo.htmlAttributions.map(html => {
        let url: string = "";
        const regex = /href="([^"]*)"/;
        const match = html.match(regex);
        match && match[1] ? url = match[1] : null;
        this.htmlContent.set(index, url);
      });
    })
  }

}
