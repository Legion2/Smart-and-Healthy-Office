import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../../../generated/api/models/room';
import { ApiService } from '../../../generated/api/services/api.service';

@Injectable()
export class DataService {
  private _rooms = new BehaviorSubject<Array<Room>>([]);
  private userRoom: Room | null

  get rooms() {
    return this._rooms.asObservable();
  }
  constructor(private apiService: ApiService) {
    this.getRoomsByIntervall();
  }

  setUserRoom(userRoom: Room) {
    this.userRoom = userRoom;
  }

  getUserRoom(): Room {
    return this.userRoom;
  }

  private getRooms() {
    this.apiService.roomsGet().subscribe((data) => {
      this._rooms.next(data);
    });
  }

  private getRoomsByIntervall() {
    this.getRooms();
    setInterval(() => {
      this.getRooms();
    }, 3000);
  }
}
