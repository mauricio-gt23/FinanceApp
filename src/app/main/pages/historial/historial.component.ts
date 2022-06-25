import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Bono } from '../../interfaces/bono.interface';
import { BonoService } from '../../services/bono.service';

@Component({
  selector: 'app-main',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {

  bonos: Bono[] = [];
  bonoFiltrado: Bono[] = [];
  usuarioId: any = '';

  constructor(private bonoService: BonoService, private route: Router, private snackBar: MatSnackBar) {
    this.usuarioId = localStorage.getItem('usuarioId');
    this.usuarioId = Number.parseInt(this.usuarioId);
    
    this.bonoService.obtenerBonos().subscribe( response => {
      this.bonos = response.data;
      this.filtrarLista();
    });
  }

  filtrarLista(): void {
    for (let i = 0; i < this.bonos.length; i++) {
      if (this.bonos[i].usuarioId === this.usuarioId) {
        this.bonoFiltrado.push(this.bonos[i]);
      } 
    }
  }

  visualizar( id: any ): void {
    this.route.navigate(['/main/detalle', id]);
  }

  eliminar( id: any, i: number ): void {      
    this.snackBar.open( 'Bono Eliminado!!!', 'Cerrar', {
      duration: 2700
    });
    this.bonoService.eliminarBono(id).subscribe( () => {
      this.bonoFiltrado.splice(i, 1);
    });
  }

}