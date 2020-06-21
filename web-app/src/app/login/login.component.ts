import { Component, OnInit } from '@angular/core';
import { Room } from '../../../generated/api/models/room';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  rooms: Observable<Array<Room>>;

  constructor(private dataService: DataService,
              private router: Router) {
   this.rooms = dataService.getRooms();
  }

  ngOnInit(): void {

    this.dataService.isLoggedIn.subscribe(loggedIn => {
      if (loggedIn === false) {
        this.router.navigate(['/login']);
      }
    });
  }

}
