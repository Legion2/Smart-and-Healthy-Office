import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Room } from 'generated/api/models';
import { DataService } from '../shared/data.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, pairwise, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State, selectUserRoom, selectUser } from '../reducers';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  showSettings = false;

  selectedRoomId: BehaviorSubject<string>;

  selectedRoom: Room;

  user: Observable<string>;

  rooms: Observable<Room[]>;

  private _mobileQueryListener: () => void;

  roomTendencies: RoomTendencies = {
    humidity: {
      value: 0,
      indicator: '',
    },
    temperature: {
      value: 0,
      indicator: '',
    },
    loudness: {
      value: 0,
      indicator: '',
    },
    brightness: {
      value: 0,
      indicator: '',
    },
};

  constructor(private store: Store<State>,
              private dataService: DataService,
              private authService: AuthService,
              changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  onSelectRoom(room: Room) {
    this.selectedRoomId.next(room.id);
    this.showSettings = false;
  }

  async ngOnInit() {
    this.user = this.store.select(selectUser);
    this.rooms = this.dataService.rooms;
    this.selectedRoomId = new BehaviorSubject<string>(null);
    this.store.select(selectUserRoom).pipe(take(1)).toPromise().then(test => this.selectedRoomId.next(test));
    combineLatest(this.dataService.rooms, this.selectedRoomId.asObservable()).pipe(map(([list, selectedId]) => list.find(room => room.id === selectedId)), pairwise()).subscribe(room => {
      this.selectedRoom = room[1];
      if (room[0] != null) {
        this.roomTendencies.humidity.value = this.calculateValueTendency(room[0].humidity, room[1].humidity);
        this.roomTendencies.humidity.indicator = this.setIndicator(this.roomTendencies.humidity.value );
        this.roomTendencies.temperature.value = this.calculateValueTendency(room[0].temperature, room[1].temperature);
        this.roomTendencies.temperature.indicator = this.setIndicator(this.roomTendencies.temperature.value );
        this.roomTendencies.brightness.value = this.calculateValueTendency(room[0].brightness, room[1].brightness);
        this.roomTendencies.brightness.indicator = this.setIndicator(this.roomTendencies.brightness.value );
      }
    });

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onLogout(){
    this.authService.logout();
  }

  calculateValueTendency(previousValue: number, latestValue: number): number {

    if (previousValue !== null) {
      const tmp = latestValue - previousValue;
      const diff = (tmp / latestValue) * 100;
      return diff;
    }
    return 0;
  }

  // Sets the icon name as indicator
  setIndicator(value: number): string {
   if (value > 0){
     return 'arrow-up';
   }
   else if (value < 0){
     return 'arrow-down';
   }
   else {
     return '';
   }
  }
}

export class RoomTendencies {
  humidity: {
    value: number,
    indicator: string,
  };
  temperature: {
    value: number,
    indicator: string,
  };
  loudness: {
    value: number,
    indicator: string,
  };
  brightness: {
    value: number,
    indicator: string,
  };
}

