import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  navLinks: any[] = [];
  activeLinkIndex = -1;

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
    });
  }

  constructor(private router: Router,
    private swPush: SwPush) {
    this.navLinks = [
      {
        label: 'Room',
        link: './room',
        index: 0,
      }
    ];
  }

  subscribeToNotifications(): void {
    this.swPush.requestSubscription({
      serverPublicKey: ""// load VAPID key from server /api/subscriptions/key
    })
      .then(sub => null)//send sub to backend /api/subscriptions with the user
      .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
