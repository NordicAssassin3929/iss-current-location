import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ISS, ISSPosition} from './model/ISS';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getInformation(): Observable<ISS> {
    return this.http.get<ISS>(this.API_URL);
  }
}
