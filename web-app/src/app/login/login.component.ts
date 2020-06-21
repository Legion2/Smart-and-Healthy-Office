import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../generated/api/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {

  }
}
