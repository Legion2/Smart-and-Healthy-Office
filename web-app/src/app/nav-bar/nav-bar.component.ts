import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RoomComponent } from '../room/room.component';
import { Room } from '../../../generated/api/models/room';
import { Router } from '@angular/router';
import { ApiService } from '../../../generated/api/services/api.service';

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
              private apiService: ApiService,
              private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
    // just a workaround
    this.createTabs();
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

    const meeting = {
      link: 'meeting-room',
      label: 'Meeting Room',
    };
    const office = {
      link: 'office',
      label: 'Office Room',
    };
    const kitchen = {
      link: 'kitchen',
      label: 'Kitchen',
    };
    const shared = {
      link: 'shared-room',
      label: 'Shared Room',
    };
    this.navLinks.push(meeting);
    this.navLinks.push(office);
    this.navLinks.push(kitchen);
    this.navLinks.push(shared);
    this.router.config.push({ path: meeting.link, component: RoomComponent });
    this.router.config.push({ path: office.link, component: RoomComponent });
    this.router.config.push({ path: kitchen.link, component: RoomComponent });
    this.router.config.push({ path: shared.link, component: RoomComponent });
  }
}
