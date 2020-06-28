import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { State, selectAuth } from '../reducers';
import { login, logout } from '../reducers/auth.actions';
@Injectable()
export class AuthService {
  private loggedIn: Observable<boolean>;

  get isLoggedIn() {
    return this.loggedIn;
  }

  constructor(
    private router: Router,
    private store: Store<State>
  ) {
    this.loggedIn = this.store.select(selectAuth).pipe(select('isLoggedIn'));
  }

  login(user: string, room: string) {
    this.store.dispatch(login({ user: user, room: room }));
    this.router.navigate(['']);
  }

  logout() {
    this.store.dispatch(logout())
    this.router.navigate(['/login']);
  }
}
