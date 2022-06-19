import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  currentRoute: string = '';

  constructor() {}

  ngOnInit(): void {
  }

}