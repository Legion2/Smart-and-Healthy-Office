import { Component, OnInit } from '@angular/core';
import { Room } from 'generated/api/models';
import { DataService } from '../shared/data.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit {

  selectedRoomId: BehaviorSubject<string>;

  selectedRoom: Room;

  constructor(private dataService: DataService) {

  }

  selectRoom(room: Room) {
    this.selectedRoomId.next(room.id);
  }

  ngOnInit(): void {
    this.selectedRoomId = new BehaviorSubject<string>(this.dataService.getUserRoom().id);
    combineLatest(this.dataService.rooms, this.selectedRoomId.asObservable()).pipe(map(([list, selectedId]) => list.find(room => room.id === selectedId))).subscribe(room => this.selectedRoom = room);
  }

}
