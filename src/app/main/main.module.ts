import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/default/main.component';
import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from '../material/material.module';
import { BonoComponent } from './pages/bono/bono.component';
import { OperacionesComponent } from './pages/operaciones/operaciones.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { PerfilComponent } from './pages/perfil/perfil.component';



@NgModule({
  declarations: [
    MainComponent,
    BonoComponent,
    OperacionesComponent,
    HistorialComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule
  ]
})
export class MainModule { }
