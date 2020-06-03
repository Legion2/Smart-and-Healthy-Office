import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  title = 'web-app';

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Temperature',
        link: './temperature',
        index: 0,
      }
    ];
  }
}
