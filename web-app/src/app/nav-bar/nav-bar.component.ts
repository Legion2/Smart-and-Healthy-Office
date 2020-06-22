import { Component, OnInit } from '@angular/core';
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

  rooms: Room[] = [];
  isLoggedIn: Observable<boolean>;
  navLinks: any[] = [];
  activeLinkIndex = -1;

  constructor(private authService: AuthService,
              private router: Router,
              private apiService: ApiService,
              private dataService: DataService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.dataService.currentRooms.subscribe((rooms) => {
      this.rooms = rooms;
      this.createTabs();
    });
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
    });
  }

  onLogout() {
    this.authService.logout();
  }

  createTabs() {
    for (let i = 0; i < this.rooms.length; i++) {
      const link = {
        link: this.rooms[i].id.trim(),
        label: this.rooms[i].name,
      };
      this.navLinks.push(link);
      this.router.config.push({ path: this.rooms[i].id.trim(), component: RoomComponent });
    }
  }

}
