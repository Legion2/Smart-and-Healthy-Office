import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { ApiService } from '../../generated/api/services/api.service';
import { Room } from '../../generated/api/models/room';
import { RoomComponent } from './room/room.component';
import { DataService } from './shared/dataService.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  rooms: Room[] = [];
  navLinks: any[] = [];
  activeLinkIndex = -1;
  loggedIn = true;

  ngOnInit(): void {
    this.getRooms().then(() => {
      this.createTabs();
    });
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
    });
  }


  logout(): void {
    this.router.navigate(['/login']);
  }

  constructor(
    private router: Router,
    private apiService: ApiService,
    private roomService: DataService,
    private swPush: SwPush
  ) {
  }

  getRooms() {
    return new Promise((resolve, reject) =>
      this.apiService.roomsGet().subscribe((data) => {
        this.rooms = data;
        this.roomService.updateRooms(data);
        resolve();
      }));
  }

  createTabs() {
    for (let i = 0; i < this.rooms.length; i++) {
      const link = {
        link: this.rooms[i].name.toString().trim(),
        label: this.rooms[i].name.toString().trim(),
      };
      this.navLinks.push(link);
      this.router.config.push({ path: this.rooms[i].name.trim(), component: RoomComponent });
    }
  }

  subscribeToNotifications(): void {
    this.swPush.requestSubscription({
      serverPublicKey: ""// load VAPID key from server /api/subscriptions/key
    })
      .then(sub => null) //send sub to backend /api/subscriptions with the user
      .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
