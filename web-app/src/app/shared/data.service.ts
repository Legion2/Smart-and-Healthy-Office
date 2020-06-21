import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../../../generated/api/models/room';

@Injectable()
export class DataService {
  private rooms = new BehaviorSubject<Array<Room>>([]);
  private loggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn = this.loggedIn.asObservable();
  currentRooms = this.rooms.asObservable();

  constructor() { }

  updateRooms(rooms: Room[]) {
    this.rooms.next(rooms);
  }

  getRooms(){
    return this.currentRooms;
  }

  login() {
    this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
  }

}
