import { Component, OnInit } from '@angular/core';
import { NearbyService } from './nearby.service';
import { Nearby } from '../models/nearby.model';
import { SafeHtml } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.css']
})
export class NearbyComponent implements OnInit {

  nearbyLocations: Nearby[] = [];
  htmlContent: Map<number, SafeHtml> = new Map<number, SafeHtml>();
  nearbyLocationForm: FormGroup;

  constructor(private nearbyService: NearbyService) { }

  ngOnInit(): void {
    this.initialNearbyLocationForm();
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

  initialNearbyLocationForm(): void {
    this.nearbyLocationForm = new FormGroup({
      latitude: new FormControl(null, [Validators.required, Validators.min(-90), Validators.max(90)]),
      longitude: new FormControl(null, [Validators.required, Validators.min(-180), Validators.max(180)]),
      radius: new FormControl(null, [Validators.required, Validators.min(0)])
    })
  }

  onSubmit(): void {
    this.nearbyService.getNearby(this.nearbyLocationForm.value.latitude, this.nearbyLocationForm.value.longitude, this.nearbyLocationForm.value.radius).subscribe(data => {
      this.nearbyLocations = data;
      this.nearbyLocations.map((nearby, index) => {
        nearby.likeRatings = Array.from({length: nearby.rating}, (_, i) => i + 1);
        nearby.unlikeRatings = Array.from({length: 5 - nearby.rating}, (_, i) => i + 1);
        this.parseHtmlContent(nearby, index);
      })
    })
  }

}
