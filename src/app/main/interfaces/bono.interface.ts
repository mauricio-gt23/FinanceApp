export interface Bono {
    id?: number;
    valorNominal: number;
    valorComercial: number;
    numAnos: number;
    frecuenciaCupon: number;
    diasAno: number;
    tipoTasaInteres: number;
    capitalizacion: number;
    tasaInteres: number;
    tasaAnualDescuento: number;
    impuestoRenta: number;
    fechaEmision: string;
    porcentajePrima: number;
    porcentajeEstructuracion: number;
    porcentajeColocacion: number;
    porcentajeFlotacion: number;
    porcentajeCavali: number;
    usuarioId: number;
}