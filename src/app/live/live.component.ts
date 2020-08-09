import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {ISS} from '../model/ISS';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.sass']
})
export class LiveComponent implements OnInit {

  coordinates: ISS;
  time: string;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.refreshData();
    setInterval(() => {
      this.refreshData();
    }, 5000);
  }

  refreshData() {
    this.apiService.getInformation().subscribe(
      (data: any) => {
        this.coordinates = data;
        this.time = this.getTime(data);
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
