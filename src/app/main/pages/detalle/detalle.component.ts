import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Bono } from "../../interfaces/bono.interface";
import { BonoFecha } from "../../interfaces/bonofecha.interface";
import { Resultado } from "../../interfaces/resultado.interface";
import { ResultadoCuadro } from "../../interfaces/resultadocuadro.interface";
import { BonoService } from "../../services/bono.service";
import { ResultadoService } from "../../services/resultado.service";

@Component({
    selector: 'app-main',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.css'],
  })

export class DetalleComponent {
    bonoId: any = '';
    frecuencia: string = '';
    tipoTasaInteres: string = '';
    capitalizacion: string = '';
    resultados: Resultado[] = [];
    bonosFecha: BonoFecha[] = [];
    resultadoCuadro: ResultadoCuadro = {};
    resultado: Resultado = {
       frecuenciaCupon: 0,
       diasCapitalizacion: 0,
       numeroPeriodosAno: 0,
       numeroTotalPeriodos: 0,
       tasaEfectivaAnual: 0,
       tasaEfectivaPeriodo: 0,
       cok: 0,
       costesInicialesEmisor: 0,
       costesInicialesBonista: 0,
       bonoId: 0
    };
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
    bonoFecha: BonoFecha = {
      fechaProgramada: '',
      bono: 0,
      bonoIndexado: 0,
      cupon: 0,
      cuota: 0,
      amortizacion: 0,
      prima: 0,
      escudo: 0,
      flujoEmisor: 0,
      flujoEmisorEscudo: 0,
      flujoBonista: 0,
      flujoActivo: 0,
      faPlazo: 0,
      factorConvexidad: 0,
    };


    constructor( private resultadoService: ResultadoService, private bonoService: BonoService,
                 private activatedReoute: ActivatedRoute ) {
        // Obtener Id
        this.activatedReoute.params.subscribe( params => {
          this.bonoId = params['id'];
          this.bonoId = Number.parseInt(this.bonoId);
        });

        // Obtener Resultado
        this.resultadoService.obtenerResultados().subscribe( response => {
          this.resultados = response.data;
          this.listaFiltrada()
          // Obtener Bono
          this.bonoService.obtenerBonoPorId(this.resultado.bonoId).subscribe( response => {
            this.bono = response.data;
            this.tipoFrecuencia();
            this.tipoTasa();
            this.tipoCapitalizacion();
            // Lista
            this.calcularLista();
            // Resultado Cuadro
            this.calcularResultadoCuadro();
          });
        });
    }


    calcularLista(): void {
      // Lista
      for (let i = 0; i <= this.resultado.numeroTotalPeriodos; i++) {
        if (i === 0) {
          let fechaDate = new Date(this.bono.fechaEmision); 
          this.bonoFecha.fechaProgramada = fechaDate.toString();
          this.bonoFecha.flujoEmisor = this.bono.valorComercial - this.resultado.costesInicialesEmisor;
          this.bonoFecha.flujoEmisorEscudo = this.bonoFecha.flujoEmisor;
          this.bonoFecha.flujoBonista = this.bono.valorComercial + this.resultado.costesInicialesBonista; 
          this.bonosFecha.push(this.bonoFecha);
        } else {
          // Fecha
          let fechaString = this.bonosFecha[i-1].fechaProgramada;
          let fechaDate = new Date(fechaString!);
          let diasEnMilisegundos = 1000 * 60 * 60 * 24 * this.resultado.frecuenciaCupon!;
          let suma = fechaDate.getTime() + diasEnMilisegundos;
          let fechaPeriodo = new Date(suma);
          this.bonoFecha.fechaProgramada = fechaPeriodo.toString();
          // Bono
          if (i === 1) {
            this.bonoFecha.bono = this.bono.valorNominal;
          } else {
            this.bonoFecha.bono = this.bonosFecha[i-1].bonoIndexado! - this.bonosFecha[i-1].amortizacion!;
          }
          // Bono Indexado
          this.bonoFecha.bonoIndexado = this.bonoFecha.bono;
          // Cupon
          this.bonoFecha.cupon = this.bonoFecha.bonoIndexado! * (this.resultado.tasaEfectivaPeriodo/100);
          // Cuota
          let fecha = this.resultado.numeroTotalPeriodos - i + 1;
          this.bonoFecha.cuota = this.pago(this.resultado.tasaEfectivaPeriodo, fecha, this.bonoFecha.bonoIndexado);
          // Amortizacion
          this.bonoFecha.amortizacion = this.bonoFecha.cuota - this.bonoFecha.cupon;
          // Prima
          if (i === this.resultado.numeroTotalPeriodos) {
            this.bonoFecha.prima = (this.bono.porcentajePrima/100) * this.bono.valorNominal;
          } else {
            this.bonoFecha.prima = 0;
          }
          // Escudo
          this.bonoFecha.escudo = (this.bono.impuestoRenta/100) * this.bonoFecha.cupon;
          // Flujo Emisor
          this.bonoFecha.flujoEmisor = this.bonoFecha.cuota + this.bonoFecha.prima;
          // Flujo Emisor Escudo
          this.bonoFecha.flujoEmisorEscudo = this.bonoFecha.flujoEmisor - this.bonoFecha.escudo;
          // Flujo Bonista
          this.bonoFecha.flujoBonista = this.bonoFecha.flujoEmisor;
          // Flujo Activo
          this.bonoFecha.flujoActivo = this.bonoFecha.flujoBonista / (1+ (this.resultado.cok /100)) ** i;
          // FA PLAZO
          this.bonoFecha.faPlazo = (this.bonoFecha.flujoActivo * i * this.resultado.frecuenciaCupon!)/ this.bono.diasAno;
          // FA Convexidad
          this.bonoFecha.factorConvexidad = this.bonoFecha.flujoActivo * i *(1 + i);
          
          this.bonosFecha.push(this.bonoFecha);
        }
        this.bonoFecha = {
          fechaProgramada: '',
          bono: 0,
          bonoIndexado: 0,
          cupon: 0,
          amortizacion: 0,
          prima: 0,
          escudo: 0,
          flujoEmisor: 0,
          flujoEmisorEscudo: 0,
          flujoBonista: 0,
          flujoActivo: 0,
          faPlazo: 0,
          factorConvexidad: 0 };
      }
    }

    calcularResultadoCuadro(): void {
      // Precio Actual
      let res = 0;
      for (let i = 1; i <= this.resultado.numeroTotalPeriodos; i++) {
        res = res + this.bonosFecha[i].flujoBonista! / ((1 + (this.resultado.cok/100)) ** i);
      }
      this.resultadoCuadro.precioActual = res;
      // Utilidad Perdida
      this.resultadoCuadro.utilidadPerdida = this.resultadoCuadro.precioActual - this.bonosFecha[0].flujoBonista!;
      // Duracion
      let suma1 = 0;
      let suma2 = 0;
      let suma3 = 0
      for (let i = 0; i < this.bonosFecha.length; i++) {
        suma1 = suma1 + this.bonosFecha[i].faPlazo!;
        suma2 = suma2 + this.bonosFecha[i].flujoActivo!;
        suma3 = suma3 + this.bonosFecha[i].factorConvexidad!;
      }
      this.resultadoCuadro.duracion = suma1 / suma2;
      // Convexidad
      this.resultadoCuadro.convexidad = suma3/((1+this.resultado.cok/100) ** 2 * suma2 * (this.bono.diasAno/this.resultado.frecuenciaCupon!) ** 2);
      // Total
      this.resultadoCuadro.total = this.resultadoCuadro.duracion + this.resultadoCuadro.convexidad;
      // Duracion Modificada
      this.resultadoCuadro.duracionModificada = this.resultadoCuadro.duracion / (1 + this.resultado.cok/100);
      // TCEA Emisor
      let tirEmisor = this.tirEmisor();
      this.resultadoCuadro.tceaEmisor = ((tirEmisor/100 + 1) ** (this.bono.diasAno/this.resultado.frecuenciaCupon!) - 1) * 100;
      // TCEA Emiso/Escudo
      let tirEmisorEscudo = this.tirEmisorEscudo();
      this.resultadoCuadro.tceaEmisorEscudo = ((tirEmisorEscudo/100 + 1) ** (this.bono.diasAno/this.resultado.frecuenciaCupon!) - 1) * 100;
      // TREA Bonista
      let tirBonista = this.tirBonista();
      this.resultadoCuadro.treaBonista = ((tirBonista/100 + 1) ** (this.bono.diasAno/this.resultado.frecuenciaCupon!) - 1) * 100;
    }

    tipoFrecuencia(): void {
      if (this.bono.frecuenciaCupon === 1) {
        this.frecuencia = 'Mensual';
      } else if (this.bono.frecuenciaCupon === 2) {
        this.frecuencia = 'Bimestral';
      } else if (this.bono.frecuenciaCupon === 3) {
        this.frecuencia = 'Trimestral';
      } else if (this.bono.frecuenciaCupon === 4) {
        this.frecuencia = 'Cuatrimestral';
      } else if (this.bono.frecuenciaCupon === 5) {
        this.frecuencia = 'Semestral';
      } else if (this.bono.frecuenciaCupon === 6) {
        this.frecuencia = 'Anual';
      }
    }

    tipoTasa(): void {
      if (this.bono.tipoTasaInteres == 1)  { 
        this.tipoTasaInteres= 'Nominal';
      } else {
        this.tipoTasaInteres = 'Efectiva';
      }
    }

    tipoCapitalizacion(): void {
      if (this.bono.capitalizacion === 1) {
        this.capitalizacion = 'Diaria';
      } else if (this.bono.capitalizacion === 2) {
        this.capitalizacion = 'Quincenal';
      } else if (this.bono.capitalizacion === 3) {
        this.capitalizacion = 'Mensual';
      } else if (this.bono.capitalizacion === 4) {
        this.capitalizacion = 'Bimestral';
      } else if (this.bono.capitalizacion === 5) {
        this.capitalizacion = 'Trimestral';
      } else if (this.bono.capitalizacion === 6) {
        this.capitalizacion = 'Cuatrimestral';
      } else if (this.bono.capitalizacion === 7) {
        this.capitalizacion = 'Semestral';
      } else if (this.bono.capitalizacion === 8) {
        this.capitalizacion = 'Anual';
      }
    }

    listaFiltrada(): void {
      for (let i = 0; i < this.resultados.length; i++) {
        if (this.resultados[i].bonoId === this.bonoId) {
          this.resultado = this.resultados[i];
          break;
        }
      }
    }

    pago(tasa: number, nperiodos: number, capital: number): number {
      return (capital * tasa/100)/(1-(1+tasa/100) ** -nperiodos);
    }

    tirEmisor(): number {
      let tir = 0;
      let aux = 0
      do {
        aux = this.bonosFecha[0].flujoEmisor! * -1.0;
        tir = tir + 0.01
        for (let i = 1; i < this.bonosFecha.length; i++) {
          aux = aux + this.bonosFecha[i].flujoEmisor!/((1 + tir/100) ** i)
        }
      } while (aux > 0);
      return tir;
    }

    tirEmisorEscudo(): number {
      let tir = 0;
      let aux = 0
      do {
        aux = this.bonosFecha[0].flujoEmisorEscudo! * -1.0;
        tir = tir + 0.01
        for (let i = 1; i < this.bonosFecha.length; i++) {
          aux = aux + this.bonosFecha[i].flujoEmisorEscudo!/((1 + tir/100) ** i)
        }
      } while (aux > 0);
      return tir;
    }

    tirBonista(): number {
      let tir = 0;
      let aux = 0
      do {
        aux = this.bonosFecha[0].flujoBonista! * -1.0;
        tir = tir + 0.01
        for (let i = 1; i < this.bonosFecha.length; i++) {
          aux = aux + this.bonosFecha[i].flujoBonista!/((1 + tir/100) ** i)
        }
      } while (aux > 0);
      return tir;
    }


  
}