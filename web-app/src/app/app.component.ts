import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { ApiService } from '../../generated/api/services/api.service';
import { Room } from '../../generated/api/models/room';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  rooms: Room[] = [];
  navLinks: any[] = [];
  activeLinkIndex = -1;
  private _roomCount = 0 ;

  ngOnInit(): void {
    this.getRooms();
    this.createRoomTabs();
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
    });
  }


  constructor(
    private router: Router,
    private apiService: ApiService,
    private swPush: SwPush,
  ) {
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  logout(): void {
    this.router.navigate(['login']);
  }

  createRoomTabs(): void {
    for (let i = 0; i < this._roomCount; i++) {
      const link = {
        label: 'Room ' + i.toString(),
        link: './room' + i.toString(),
        index: i,
      };
      this.navLinks.push(link);
    }
  }

  subscribeToNotifications(): void {
    this.swPush.requestSubscription({
      serverPublicKey: ""// load VAPID key from server /api/subscriptions/key
    })
      .then(sub => null) //send sub to backend /api/subscriptions with the user
      .catch(err => console.error("Could not subscribe to notifications", err));
  }

  getRooms(): void {
    this.apiService.roomsGet().subscribe((data) => {
      this.rooms = data;
      console.log(data);
      this._roomCount = data.length;
    });
  }

  get roomCount(): number {
    return this._roomCount;

  }
}
