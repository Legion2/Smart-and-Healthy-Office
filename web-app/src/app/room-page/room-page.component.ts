import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Room } from 'generated/api/models';
import { DataService } from '../shared/data.service';
import { Observable, BehaviorSubject, combineLatest, pipe } from 'rxjs';
import { map, pairwise, startWith, take } from 'rxjs/operators';
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
    humidity: 0,
    loudness: 0,
    temperature: 0,
    brightness: 0
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
        this.roomTendencies.humidity = this.calculateValueTendency(room[0].humidity, room[1].humidity);
        this.roomTendencies.temperature = this.calculateValueTendency(room[0].temperature, room[1].temperature);
        this.roomTendencies.brightness = this.calculateValueTendency(room[0].brightness, room[1].brightness);
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
}

export class RoomTendencies {
  humidity: number;
  temperature: number;
  loudness: number;
  brightness: number;
}

