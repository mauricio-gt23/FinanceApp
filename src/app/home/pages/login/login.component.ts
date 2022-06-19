import { Component, ContentChild, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
  })
  export class LoginComponent {
  
    showPassword: boolean = false;
    showMessage: boolean = false;
    @ViewChild('miFormulario') miFormulario!: NgForm;
    initForm = {
      correo: '',
      contra: ''
    }

    constructor( private router: Router) { }
  
    toggleShow() {
      this.showPassword = !this.showPassword;
    }

    valido(): boolean {
      let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(this.miFormulario?.value.correo) ? true : false;
    }

    iniciar(): void {
      if (this.valido()) {
        this.router.navigate(['./main']);
      } else {
        this.showMessage = true;
      }
    }

    registrarme(): void {
      this.router.navigate(['auth/signup']);
    }

  }