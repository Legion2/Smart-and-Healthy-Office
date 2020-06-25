import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../../../generated/api/models/room';
import { ApiService } from '../../../generated/api/services/api.service';

@Injectable()
export class DataService {
  rooms = new BehaviorSubject<Array<Room>>([]);
  constructor(private apiService: ApiService) {
    this.getRoomsByIntervall();
  }

  updateRooms(rooms: Room[]) {
    this.rooms.next(rooms);
  }

  private getRooms() {
    this.apiService.roomsGet().subscribe((data) => {
      this.rooms.next(data);
    });
  }

  private getRoomsByIntervall() {
    this.getRooms();
    setInterval(() => {
      this.apiService.roomsGet().subscribe((data) => {
        this.rooms.next(data);
      });
    }, 3000);
  }
}
