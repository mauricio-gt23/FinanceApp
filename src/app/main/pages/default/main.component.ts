import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  currentRoute: string = '';

  constructor(private route: Router) {
    this.route.events.subscribe( event => {
      if(event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit(): void {
  }

  mostrar(): boolean {
    if (this.currentRoute == '/main') {
      return false;
    } else {
      return true;
    }
  }
}
