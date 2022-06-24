import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class ResultadoService {
    
    private baseUrl: string = "https://finanzas-upc.herokuapp.com";
    
    constructor( private http: HttpClient ) { }

    obtenerResultados(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/resultado`);
    }
}