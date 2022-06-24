import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bono } from '../interfaces/bono.interface';

@Injectable({
    providedIn: 'root'
  })
export class BonoService {
    
    private baseUrl: string = "https://finanzas-upc.herokuapp.com";
    
    constructor( private http: HttpClient ) { }

    obtenerBonos(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/bono`);
    }

    obtenerBonoPorId( id: any ): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/bono/${id}`)    
    }

    agregarBono( bono: Bono ): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/bono/create`, bono);
    }
}