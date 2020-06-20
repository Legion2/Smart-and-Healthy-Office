import { Component, OnInit } from '@angular/core';
import { Room } from '../../../generated/api/models/room';
import { DataService } from '../shared/dataService.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  rooms: Room[] = [];
  constructor(private roomService: DataService) {
  }

  ngOnInit(): void {
    this.roomService.currentRooms.subscribe(rooms => {
      this.rooms = rooms;
    });
  }
}
