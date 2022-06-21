import { Component, ContentChild, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario.interface';
import { HomeService } from '../../services/home.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
  })
  export class LoginComponent {
  
    hide = true;
    showMessage: boolean = false;
    usuarioId: string = '';
    usuarios: Usuario[] = [];

    @ViewChild('miFormulario') miFormulario!: NgForm;
    initForm = {
      correo: '',
      contra: ''
    }

    constructor( private router: Router, private homeService: HomeService) {
      this.homeService.login().subscribe( data => {
        this.usuarios = data.data;
      });
    }

    valido(): boolean {
      let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(this.miFormulario?.value.correo) ? true : false;
    }

    iniciar(): void {
      if (this.valido()) {
        if (this.filtro(this.initForm.correo, this.initForm.contra)) {
          localStorage.setItem('usuarioId', this.usuarioId);
          this.router.navigate(['./main']);
        } else {
          this.showMessage = true;
        }
      } else {
        this.showMessage = true;
      }
    }

    registrarme(): void {
      this.router.navigate(['auth/signup']);
    }

    filtro(correo: string, contrasena: string): boolean {
      for (let i = 0; i < this.usuarios.length; i++) {
        if (this.usuarios[i].correo === correo && this.usuarios[i].contrasena === contrasena) {
          this.usuarioId = this.usuarios[i].id!.toString();
          return true;
        }
      } return false;
    }

  }