import { Component, OnInit } from '@angular/core';
import { Room } from '../../../generated/api/models/room';
import { Router } from '@angular/router';
import { ApiService } from '../../../generated/api/services/api.service';
import { DataService } from '../shared/data.service';
import { SwPush } from '@angular/service-worker';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  rooms: Room[] = [];
  navLinks: any[] = [];
  activeLinkIndex = -1;
  loggedIn: boolean;

  ngOnInit(): void {
    this.dataService.isLoggedIn.subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
    });

    this.createTabs();

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
    private dataService: DataService,
    private swPush: SwPush
  ) {}


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
      serverPublicKey: ''// load VAPID key from server /api/subscriptions/key
    })
      .then(sub => null) // send sub to backend /api/subscriptions with the user
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
}
