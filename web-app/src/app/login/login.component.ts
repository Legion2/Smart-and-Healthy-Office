import { Component, OnInit } from '@angular/core';
import { Room } from '../../../generated/api/models/room';
import { DataService } from '../shared/data.service';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../../../generated/api/services/api.service';
import { UserLocation } from '../../../generated/api/models/user-location';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  rooms = new BehaviorSubject<Array<Room>>([]);
  username: string;

  constructor(private dataService: DataService,
              private authService: AuthService,
              private apiService: ApiService) {
    /*this.dataService.rooms.subscribe((data) => {
      this.rooms.next(data);
    });*/
    this.rooms = this.dataService.rooms
  }

  onLogin(room: string) {
    this.authService.login(this.username);
    this.apiService.locationUserPost({ user: this.username, body: { location: room} });
  }
}
