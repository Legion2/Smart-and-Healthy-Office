import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../../../generated/api/models/room';
import { ApiService } from '../../../generated/api/services/api.service';

@Injectable()
export class DataService {
  private _rooms = new BehaviorSubject<Array<Room>>([]);

  get rooms() {
    return this._rooms.asObservable();
  }
  constructor(private apiService: ApiService) {
    this.getRoomsByIntervall();
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
