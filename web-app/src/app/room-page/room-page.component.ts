import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Room } from 'generated/api/models';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { selectUser, selectUserRoom, State } from '../reducers';
import { DataService } from '../shared/data.service';


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
    combineLatest(this.dataService.rooms, this.selectedRoomId.asObservable()).pipe(map(([list, selectedId]) => list.find(room => room.id === selectedId))).subscribe(room => this.selectedRoom = room);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onLogout(){
    this.authService.logout();
  }
}
