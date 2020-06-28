import { Component, Input } from '@angular/core';
import { Room } from '../../../generated/api/models/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {
  @Input('room') room :Room;
}
