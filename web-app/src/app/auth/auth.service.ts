import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login() {
      this.loggedIn.next(true);
      this.router.navigate(['']);
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
