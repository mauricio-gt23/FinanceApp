import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario.interface';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  showMessage: boolean = false;
  hide: boolean = true;
  usuarioId: string = '';

  usuario: Usuario = {
    nombre: '',
    apellido: '',
    contrasena: '',
    dni: '',
    correo: ''
  };

  miFormulario: FormGroup = this.fb.group({
    nombre: [ this.usuario.nombre, [Validators.required]],
    apellido: [ this.usuario.apellido, [Validators.required] ],
    correo: [ this.usuario.correo, [Validators.required, Validators.email] ],
    dni: [ this.usuario.dni, [Validators.required] ],
    contrasena: [ this.usuario.contrasena, [Validators.required] ]
  });

  constructor(private router: Router, private fb: FormBuilder, private homeService: HomeService) { 

  }

  ngOnInit(): void {
  }

  registrar(): void {
    if (this.miFormulario.valid) {
      this.usuario = {
        nombre: this.miFormulario.controls['nombre'].value,
        apellido: this.miFormulario.controls['apellido'].value,
        correo: this.miFormulario.controls['correo'].value,
        dni: this.miFormulario.controls['dni'].value,
        contrasena: this.miFormulario.controls['contrasena'].value,
      }
      this.homeService.registro(this.usuario).subscribe( response => {
        this.usuarioId = response.data.id.toString();
        localStorage.setItem('usuarioId', this.usuarioId);
        this.router.navigate(['./main']);
      });
    } else {
      this.showMessage = true;
    }
  }

}