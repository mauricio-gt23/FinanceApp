import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './operaciones.component.html',
    styleUrls: ['./operaciones.component.css'],
  })

export class OperacionesComponent implements OnInit {
  
    constructor(private route: Router) { }
  
    ngOnInit(): void {
    }
  
    bono(): void {
      this.route.navigate(['main/bono']);
    }

    historial(): void {
      this.route.navigate(['main/historial'])
    }
}
  