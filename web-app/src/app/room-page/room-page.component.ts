import { Component, OnInit } from '@angular/core';
import { Room } from 'generated/api/models';
import { DataService } from '../shared/data.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State, selectUserRoom, selectUser } from '../reducers';


@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit {

  selectedRoomId: BehaviorSubject<string>;

  selectedRoom: Room;

  rooms: Observable<Room[]>;

  constructor(private store: Store<State>,
    private dataService: DataService) {
  }

  selectRoom(room: Room) {
    this.selectedRoomId.next(room.id);
  }

  async ngOnInit() {
    this.rooms = this.dataService.rooms;
    this.selectedRoomId = new BehaviorSubject<string>(null);
    this.store.select(selectUserRoom).pipe(take(1)).toPromise().then(test => this.selectedRoomId.next(test));
    combineLatest(this.dataService.rooms, this.selectedRoomId.asObservable()).pipe(map(([list, selectedId]) => list.find(room => room.id === selectedId))).subscribe(room => this.selectedRoom = room);
  }
}
