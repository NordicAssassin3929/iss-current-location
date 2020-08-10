import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {ISS} from '../model/ISS';
import {Geo} from '../model/Geo';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.sass']
})
export class LiveComponent implements OnInit {

  coordinates: ISS;
  time: string;
  location: Geo;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.retrievePosition();
    setInterval(() => {
      this.retrievePosition();
      this.getLocationOnEarth(
        this.coordinates.iss_position.longitude,
        this.coordinates.iss_position.latitude
      );
    }, 10000);
  }

  retrievePosition() {
    this.apiService.getISSInformation().subscribe(
      (data: any) => {
        this.coordinates = data;
        this.getLocationOnEarth(
          data.iss_position.longitude,
          data.iss_position.latitude
        );
        this.time = this.getTime(data);
      }
    );
  }

  getLocationOnEarth(longitude, latitude) {
    this.apiService.getLocation(
      longitude,
      latitude)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.location = data;
        }
      );
  }

  getTime(data: ISS): string {
    const date = new Date(data.timestamp * 1000);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    const seconds = '0' + date.getSeconds();
    const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  }
}
