import { Component, OnInit } from '@angular/core';
import { Room } from '../../../generated/api/models/room';
import { SwPush } from '@angular/service-worker';
import { ApiService } from 'generated/api/services';
import { Observable } from 'rxjs';
import { Subscription } from 'generated/api/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  serverKey: Promise<string>;
  changingSubscription = false;
  subscribed = false;
  successMessage = '';
  errorMessage = '';
  subscriptionId = '';

  ngOnInit(): void {
    this.serverKey = this.apiService.subscriptionsKeyGet().toPromise()
  }

  constructor(
    private swPush: SwPush,
    private apiService: ApiService
  ) {
    this.swPush.subscription.forEach(sub => {
      this.subscribed = sub != null;
    });
  }

  onSubscribe() {
    this.changingSubscription = true;
    this.subscribeToNotifications().then(() => {
      this.successMessage = 'Push Notifications enabled';
    }).catch(() => {
      this.errorMessage = 'Push Notifications could not be enabled';
    }).finally(() => {
      this.changingSubscription = false;
    });
  }

  onUnsubscribe() {
    this.changingSubscription = true;
    Promise.all([this.swPush.unsubscribe(), this.apiService.subscriptionsIdDelete({ id: this.subscriptionId }).toPromise()]).then(() => {
      this.successMessage = 'Push Notifications disabled';
    }).catch(() => {
      this.errorMessage = 'Push Notifications could not be disabled';
    }).finally(() => {
      this.changingSubscription = false;
    });
  }

  async subscribeToNotifications() {
    try {
      const pushSubscription = await this.swPush.requestSubscription({
        serverPublicKey: await this.serverKey
      });
      const subscriptionBody: Subscription =
      {
        user: 'user1', subscription: pushSubscription.toJSON() as any
      };
      try {
        this.subscriptionId = await this.apiService.subscriptionsPost({ body: subscriptionBody }).toPromise();
      } catch (err) {
        await this.swPush.unsubscribe();
        throw err
      }
    } catch (err) {
      console.error('Could not subscribe to notifications', err)
      throw err
    }
  }
}
