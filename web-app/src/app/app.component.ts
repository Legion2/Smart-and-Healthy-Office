import { Component, Input, OnInit } from '@angular/core';
import { DataService } from './shared/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../generated/api/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private dataService: DataService,
              private router: Router,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms() {
    this.apiService.roomsGet().subscribe((data) => {
      this.dataService.updateRooms(data);
    });
  }
}
