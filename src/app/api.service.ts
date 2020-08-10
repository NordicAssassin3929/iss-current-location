import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ISS} from './model/ISS';
import {environment} from '../environments/environment';
import {Geo} from './model/Geo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = environment.apiUrl;
  GEO_API_URL = environment.geoApiUrl;
  API_KEY = environment.apiKey;

  constructor(private http: HttpClient) {
  }

  getISSInformation(): Observable<ISS> {
    return this.http.get<ISS>(this.API_URL);
  }

  getLocation(longitude, latitude): Observable<Geo> {
    return this.http.get<Geo>(`${this.GEO_API_URL}reverse?access_key=${this.API_KEY}&query=${longitude},${latitude}`
    );
  }
}
