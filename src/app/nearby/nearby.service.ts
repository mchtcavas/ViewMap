import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nearby } from '../models/nearby.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NearbyService {
  private BASE_URL: string = "http://localhost:8070/api/nearby";

  constructor(private httpClient: HttpClient) { }

  getNearby(latitude: number, longitude: number, radius: number): Observable<Nearby[]> {
    const params = new HttpParams()
      .set('latitude', latitude.toString())
      .set('longitude', longitude.toString())
      .set('radius', radius.toString());

    return this.httpClient.get<Nearby[]>(this.BASE_URL, { params });
  }
}
