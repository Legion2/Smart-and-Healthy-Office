import { Component, OnInit } from '@angular/core';
import { Room } from '../../../generated/api/models/room';
import { DataService } from '../shared/data.service';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../../../generated/api/services/api.service';
import { UserLocation } from '../../../generated/api/models/user-location';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  rooms: Observable<Room[]>;
  username: string;

  constructor(private dataService: DataService,
              private authService: AuthService,
              private apiService: ApiService) {
    this.rooms = this.dataService.rooms
  }

  onLogin(room: Room) {
    this.authService.login(this.username);
    this.dataService.setUserRoom(room);
    this.apiService.locationUserPost({ user: this.username, body: { location: room.id} });
  }
}
