import { Component, Input } from '@angular/core';
import { Room } from '../../../generated/api/models/room';
import { RoomTendencies } from '../room-page/room-page.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {
  @Input('room') room: Room;
  @Input('roomTendencies') roomTendencies: RoomTendencies;
  get freeDesks() {
    return Math.max(this.room.desks - this.room.presence, 0);
  }
}
