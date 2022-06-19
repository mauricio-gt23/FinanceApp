import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';
import { BonoComponent } from './pages/bono/bono.component';
import { MainComponent } from './pages/default/main.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { OperacionesComponent } from './pages/operaciones/operaciones.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: OperacionesComponent
            },
            {
                path: 'bono',
                component: BonoComponent
            },
            {
                path: 'historial',
                component: HistorialComponent
            },
            {
                path: 'perfil',
                component: PerfilComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }