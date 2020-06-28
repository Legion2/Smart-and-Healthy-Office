import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RoomComponent } from '../room/room.component';
import { Room } from '../../../generated/api/models/room';
import { Router } from '@angular/router';
import { ApiService } from '../../../generated/api/services/api.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() currentRoom: Room;
  @Output() selectRoom = new EventEmitter<Room>();

  rooms: Observable<Room[]>;
  isLoggedIn: Observable<boolean>;
  navLinks: any[] = [];
  activeLinkIndex = -1;

  constructor(private authService: AuthService,
              private dataService: DataService,
              private router: Router) {

    this.rooms = this.dataService.rooms;
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
    });
  }

  onLogout() {
    this.authService.logout();
  }

  onSelect(room: Room) {
    this.selectRoom.emit(room);
  }
}
