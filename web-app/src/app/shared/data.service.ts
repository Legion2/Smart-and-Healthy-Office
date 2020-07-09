import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from '../../../generated/api/services/api.service';
import { selectRooms, State } from '../reducers';
import { setRooms } from '../reducers/room.actions';

@Injectable()
export class DataService {

  get rooms() {
    return this.store.select(selectRooms);
  }
  constructor(private apiService: ApiService,
    private store: Store<State>) {
    this.getRoomsByIntervall();
  }

  private getRooms() {
    this.apiService.roomsGet().subscribe((data) => {
      this.store.dispatch(setRooms({ rooms: data }))
    });
  }

  private getRoomsByIntervall() {
    this.getRooms();
    setInterval(() => {
      this.getRooms();
    }, 3000);
  }
}
