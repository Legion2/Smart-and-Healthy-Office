import { Component, OnInit } from '@angular/core';
import { Room } from '../../../generated/api/models/room';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  rooms: Room[] = [];

  ngOnInit(): void {

  }

  constructor(
    private swPush: SwPush
  ) {
  }

  subscribeToNotifications(): void {
    this.swPush.requestSubscription({
      serverPublicKey: ''// load VAPID key from server /api/subscriptions/key
    })
      .then(sub => null) // send sub to backend /api/subscriptions with the user
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
}
