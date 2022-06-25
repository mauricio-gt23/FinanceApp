import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/home/interfaces/usuario.interface';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-main',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  showEditar: boolean = true;
  showGuardar: boolean = false;
  showMensaje: boolean = false;
  disabled: boolean = true;
  usuarioId: any = '';

  usuario: Usuario = {
    nombre: '',
    apellido: '',
    dni: '',
    correo: ''
  };

  @ViewChild('miFormulario') miFormulario!: NgForm;

  constructor(private perfilService: PerfilService, private snackBar: MatSnackBar) {

    this.usuarioId = localStorage.getItem('usuarioId');
    this.usuarioId = Number.parseInt(this.usuarioId);
    
    this.perfilService.obtenerPerfil(this.usuarioId).subscribe( response => {
      this.usuario = response.data;
    });
  }

  editar(): void {
    this.showEditar = !this.showEditar;
    this.showGuardar = !this.showGuardar;
    this.disabled = !this.disabled;
  }

  guardar(): void {

    if (this.miFormulario.invalid) {
      this.showMensaje = true;
    } else {
      this.perfilService.editarPerfil(this.usuario).subscribe( response => {
        this.showGuardar = !this.showGuardar;
        this.showEditar = !this.showEditar;
        this.disabled = !this.disabled;
        this.showMensaje = false;
  
        this.snackBar.open('Usuario Actualizado!!!', 'Cerrar', {
          duration: 2800
        })
      });
    }


  }

}