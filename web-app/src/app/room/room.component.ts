import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../../generated/api/models/room';
import { DataService } from '../shared/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  room: Room;
  constructor(private dataService: DataService,
              private activeRoute: ActivatedRoute,
              private route: Router) {
  }

  ngOnInit(): void {
    console.log(this.route.url.replace('/', ''));
    this.dataService.currentRooms.subscribe((data) => {
      this.room = data.filter( room => room.id === this.route.url.replace('/', ''))[0];
    });
  }

}
