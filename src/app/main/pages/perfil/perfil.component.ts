import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  currentRoute: string = '';

  constructor() {}

  ngOnInit(): void {
  }

}