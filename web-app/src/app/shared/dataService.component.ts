import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../../../generated/api/models/room';

@Injectable()
export class DataService {
  private rooms = new BehaviorSubject<Array<Room>>([]);
  currentRooms = this.rooms.asObservable();

  constructor() { }

  updateRooms(rooms: Room[]) {
    this.rooms.next(rooms);
  }

}
