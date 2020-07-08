import { Component, OnInit } from '@angular/core';
import { Room } from 'generated/api/models';
import { DataService } from '../shared/data.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State, selectUserRoom, selectUser } from '../reducers';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit {

  selectedRoomId: BehaviorSubject<string>;

  selectedRoom: Room;

  user: Observable<string>;

  rooms: Observable<Room[]>;

  constructor(private store: Store<State>,
              private dataService: DataService,
              private authService: AuthService) {
  }

  onSelectRoom(room: Room) {
    this.selectedRoomId.next(room.id);
  }

  async ngOnInit() {
    this.user = this.store.select(selectUser).pipe(take(1));
    this.rooms = this.dataService.rooms;
    this.selectedRoomId = new BehaviorSubject<string>(null);
    this.store.select(selectUserRoom).pipe(take(1)).toPromise().then(test => this.selectedRoomId.next(test));
    combineLatest(this.dataService.rooms, this.selectedRoomId.asObservable()).pipe(map(([list, selectedId]) => list.find(room => room.id === selectedId))).subscribe(room => this.selectedRoom = room);
  }

  onLogout(){
    this.authService.logout();
  }
}
