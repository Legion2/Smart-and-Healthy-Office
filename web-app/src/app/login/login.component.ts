import { Component, OnInit } from '@angular/core';
import { Room } from '../../../generated/api/models/room';
import { DataService } from '../shared/data.service';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../../../generated/api/services/api.service';
import { UserLocation } from '../../../generated/api/models/user-location';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  rooms: Subject<Array<Room>>;
  userLocation: UserLocation = {
    location: ''
  };

  username: string;

  constructor(private dataService: DataService,
              private authService: AuthService,
              private apiService: ApiService) {
    this.dataService.rooms.subscribe((data) => {
      this.rooms.next(data);
    });
  }

  ngOnInit(): void {

  }

  onLogin(room: string) {
    this.userLocation.location = room;
    this.authService.login();
    this.apiService.locationUserPost({ user: this.username, body: this.userLocation });
  }
}
