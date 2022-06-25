import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bono } from '../../interfaces/bono.interface';
import { BonoService } from '../../services/bono.service';

interface Frecuencia {
  value: number,
  viewValue: string
}

interface Capitalizaciones {
  value: number,
  viewValue: string
}

interface DiaAnio {
  value: number,
  viewValue: string
} 

@Component({
    selector: 'app-main',
    templateUrl: './bono.component.html',
    styleUrls: ['./bono.component.css']
  })
  export class BonoComponent implements OnInit {
  
    usuarioId: any = '';
    showMessage: boolean = false;

    bono: Bono = {
      valorNominal: 0,
      valorComercial: 0,
      numAnos: 0,
      frecuenciaCupon: 0,
      diasAno: 0,
      tipoTasaInteres: 0,
      capitalizacion: 0,
      tasaInteres: 0,
      tasaAnualDescuento: 0,
      impuestoRenta: 0,
      fechaEmision: '',
      porcentajePrima: 0,
      porcentajeEstructuracion: 0,
      porcentajeColocacion: 0,
      porcentajeFlotacion: 0,
      porcentajeCavali: 0,
      usuarioId: 0
    };

    frecuencias: Frecuencia[] = [
      {value: 0, viewValue: ''},
      {value: 1, viewValue: 'Mensual'},
      {value: 2, viewValue: 'Bimestral'},
      {value: 3, viewValue: 'Trimestral'},
      {value: 4, viewValue: 'Cuatrimestral'},
      {value: 5, viewValue: 'Semestral'},
      {value: 6, viewValue: 'Anual'}
    ];

    capitalizaciones: Capitalizaciones[] = [
      {value: 0, viewValue: ''},
      {value: 1, viewValue: 'Diaria'},
      {value: 2, viewValue: 'Quincenal'},
      {value: 3, viewValue: 'Mensual'},
      {value: 4, viewValue: 'Bimestral'},
      {value: 5, viewValue: 'Trimestral'},
      {value: 6, viewValue: 'Cuatrimestral'},
      {value: 7, viewValue: 'Semestral'},
      {value: 8, viewValue: 'Anual'}
    ];

    diasanio: DiaAnio[] =[
      {value: 360, viewValue: '360'},
      {value: 365, viewValue: '365'},
    ];

    frecuenciaControl = new FormControl(this.frecuencias[0].value);
    capitalizacionControl = new FormControl(this.capitalizaciones[0].value);
    diasanioControl = new FormControl(this.diasanio[0].value);

    miFormulario: FormGroup = this.fb.group({
      valornominal: [0.0, [Validators.required]],
      valorcomercial: [0.0, [Validators.required]],
      fechaemision: ['', [Validators.required]],
      frecuencia: this.frecuenciaControl,
      capitalizacion: this.capitalizacionControl,
      numeroanos: [0.0, [Validators.required]],
      diasanio: this.diasanioControl,
      tasainteres: [0.0, [Validators.required]],
      tasaanual: [0.0, [Validators.required]],
      impuesto: [0.0, [Validators.required]],
      prima: [0.0, [Validators.required]],
      estructuracion: [0.0, [Validators.required]],
      colocacion: [0.0, [Validators.required]],
      flotacion: [0.0, [Validators.required]],
      cavali: [0.0, [Validators.required]]
    })



    constructor( private fb: FormBuilder, private bonoService: BonoService, private route: Router ) {
      this.usuarioId = localStorage.getItem('usuarioId');
      this.usuarioId = Number.parseInt(this.usuarioId);
    }
  
    ngOnInit(): void {}

    registrarBono(): void {
      if (this.miFormulario.valid) {
        this.asignarValores();
        this.bonoService.agregarBono(this.bono).subscribe( () => {
          this.route.navigate(['./main']);
        });
      } else {
        this.showMessage = true;
      }
    }

  asignarValores(): void {
    let fechaString = this.miFormulario.controls['fechaemision'].value;
    let fechaDate = new Date(fechaString);
    if (this.miFormulario.controls['capitalizacion'].value !== 0) {
      this.bono = {
        valorNominal:  this.miFormulario.controls['valornominal'].value,
        valorComercial:  this.miFormulario.controls['valorcomercial'].value,
        numAnos:  this.miFormulario.controls['numeroanos'].value,
        frecuenciaCupon:  this.miFormulario.controls['frecuencia'].value,
        diasAno:  this.miFormulario.controls['diasanio'].value,
        tipoTasaInteres: 1,
        capitalizacion: this.miFormulario.controls['capitalizacion'].value,
        tasaInteres: this.miFormulario.controls['tasainteres'].value,
        tasaAnualDescuento: this.miFormulario.controls['tasaanual'].value,
        impuestoRenta: this.miFormulario.controls['impuesto'].value,
        fechaEmision: fechaDate.toUTCString(),
        porcentajePrima: this.miFormulario.controls['prima'].value,
        porcentajeEstructuracion: this.miFormulario.controls['estructuracion'].value,
        porcentajeColocacion: this.miFormulario.controls['colocacion'].value,
        porcentajeFlotacion: this.miFormulario.controls['flotacion'].value,
        porcentajeCavali: this.miFormulario.controls['cavali'].value,
        usuarioId: this.usuarioId
      }
    } else {
      this.bono = {
        valorNominal:  this.miFormulario.controls['valornominal'].value,
        valorComercial:  this.miFormulario.controls['valorcomercial'].value,
        numAnos:  this.miFormulario.controls['numeroanos'].value,
        frecuenciaCupon:  this.miFormulario.controls['frecuencia'].value,
        diasAno:  this.miFormulario.controls['diasanio'].value,
        tipoTasaInteres: 2,
        capitalizacion: this.miFormulario.controls['capitalizacion'].value,
        tasaInteres: this.miFormulario.controls['tasainteres'].value,
        tasaAnualDescuento: this.miFormulario.controls['tasaanual'].value,
        impuestoRenta: this.miFormulario.controls['impuesto'].value,
        fechaEmision: fechaDate.toUTCString(),
        porcentajePrima: this.miFormulario.controls['prima'].value,
        porcentajeEstructuracion: this.miFormulario.controls['estructuracion'].value,
        porcentajeColocacion: this.miFormulario.controls['colocacion'].value,
        porcentajeFlotacion: this.miFormulario.controls['flotacion'].value,
        porcentajeCavali: this.miFormulario.controls['cavali'].value,
        usuarioId: this.usuarioId
      }
    }
  }
  
}
  