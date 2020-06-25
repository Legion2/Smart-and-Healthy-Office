import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Room } from '../../../generated/api/models/room';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  room = new Subject<Room>();
  constructor(private dataService: DataService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.dataService.rooms.subscribe((data) => {
      this.room.next(data.filter( room => room.id === this.route.url.replace('/', ''))[0]);
    });
  }

}
