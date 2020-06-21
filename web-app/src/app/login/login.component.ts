import { Component, OnInit } from '@angular/core';
import { Room } from '../../../generated/api/models/room';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  rooms: Room[] = [];
  constructor(private dataService: DataService,
              private router: Router, ) {
  }

  ngOnInit(): void {
    this.dataService.currentRooms.subscribe(rooms => {
      this.rooms = rooms;
    });
    this.dataService.isLoggedIn.subscribe(loggedIn => {
      if (loggedIn === false) {
        console.log('login');
        this.router.navigate(['/login']);
      }
    });
  }
}
