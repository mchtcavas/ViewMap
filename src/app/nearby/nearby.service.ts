import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nearby } from '../models/nearby.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NearbyService {
  private BASE_URL: string = "https://mocki.io/v1/e2f504be-c5b6-475a-8d1e-7ade2ff8aca3";

  constructor(private httpClient: HttpClient) { }

  getNearby(latitude: number, longitude: number, radius: number): Observable<Nearby[]> {
    return this.httpClient.get<Nearby[]>(this.BASE_URL);
  }
}
