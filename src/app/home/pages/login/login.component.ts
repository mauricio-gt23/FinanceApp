import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
  })
  export class LoginComponent {
  
    constructor( private router: Router) { }
  
    iniciar(): void {
      this.router.navigate(['./main']);
    }

    registrarme(): void {
      this.router.navigate(['auth/signup'])
    }

  }